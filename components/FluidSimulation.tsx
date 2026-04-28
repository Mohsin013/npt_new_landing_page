"use client";

import { useEffect, useRef, useState } from "react";

const VERTEX = `#version 300 es
precision highp float;
out vec2 vUv;
void main() {
  float x = float((gl_VertexID & 1) << 2) - 1.0;
  float y = float((gl_VertexID & 2) << 1) - 1.0;
  vUv = vec2(x, y) * 0.5 + 0.5;
  gl_Position = vec4(x, y, 0.0, 1.0);
}`;

const SPLAT_FRAG = `#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uTarget;
uniform float aspectRatio;
uniform vec3 color;
uniform vec2 point;
uniform float radius;
out vec4 fragColor;
void main() {
  vec2 p = vUv - point;
  p.x *= aspectRatio;
  vec3 splat = exp(-dot(p, p) / radius) * color;
  vec3 base = texture(uTarget, vUv).xyz;
  fragColor = vec4(base + splat, 1.0);
}`;

const ADVECTION_FRAG = `#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 texelSize;
uniform float dt;
uniform float dissipation;
out vec4 fragColor;
void main() {
  vec2 coord = vUv - dt * texture(uVelocity, vUv).xy * texelSize;
  fragColor = dissipation * texture(uSource, coord);
  fragColor.a = 1.0;
}`;

const CURL_FRAG = `#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uVelocity;
uniform vec2 texelSize;
out vec4 fragColor;
void main() {
  float L = texture(uVelocity, vUv - vec2(texelSize.x, 0.0)).y;
  float R = texture(uVelocity, vUv + vec2(texelSize.x, 0.0)).y;
  float T = texture(uVelocity, vUv + vec2(0.0, texelSize.y)).x;
  float B = texture(uVelocity, vUv - vec2(0.0, texelSize.y)).x;
  fragColor = vec4(R - L - T + B, 0.0, 0.0, 1.0);
}`;

const VORTICITY_FRAG = `#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uVelocity;
uniform sampler2D uCurl;
uniform vec2 texelSize;
uniform float curl;
uniform float dt;
out vec4 fragColor;
void main() {
  float L = texture(uCurl, vUv - vec2(texelSize.x, 0.0)).x;
  float R = texture(uCurl, vUv + vec2(texelSize.x, 0.0)).x;
  float T = texture(uCurl, vUv + vec2(0.0, texelSize.y)).x;
  float B = texture(uCurl, vUv - vec2(0.0, texelSize.y)).x;
  float C = texture(uCurl, vUv).x;
  vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
  force /= length(force) + 0.0001;
  force *= curl * C;
  force.y *= -1.0;
  vec2 velocity = texture(uVelocity, vUv).xy;
  velocity += force * dt;
  fragColor = vec4(velocity, 0.0, 1.0);
}`;

const DIVERGENCE_FRAG = `#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uVelocity;
uniform vec2 texelSize;
out vec4 fragColor;
void main() {
  float L = texture(uVelocity, vUv - vec2(texelSize.x, 0.0)).x;
  float R = texture(uVelocity, vUv + vec2(texelSize.x, 0.0)).x;
  float T = texture(uVelocity, vUv + vec2(0.0, texelSize.y)).y;
  float B = texture(uVelocity, vUv - vec2(0.0, texelSize.y)).y;
  fragColor = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
}`;

const PRESSURE_FRAG = `#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uPressure;
uniform sampler2D uDivergence;
uniform vec2 texelSize;
out vec4 fragColor;
void main() {
  float L = texture(uPressure, vUv - vec2(texelSize.x, 0.0)).x;
  float R = texture(uPressure, vUv + vec2(texelSize.x, 0.0)).x;
  float T = texture(uPressure, vUv + vec2(0.0, texelSize.y)).x;
  float B = texture(uPressure, vUv - vec2(0.0, texelSize.y)).x;
  float C = texture(uDivergence, vUv).x;
  fragColor = vec4((L + R + T + B - C) * 0.25, 0.0, 0.0, 1.0);
}`;

const GRADIENT_FRAG = `#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uPressure;
uniform sampler2D uVelocity;
uniform vec2 texelSize;
out vec4 fragColor;
void main() {
  float L = texture(uPressure, vUv - vec2(texelSize.x, 0.0)).x;
  float R = texture(uPressure, vUv + vec2(texelSize.x, 0.0)).x;
  float T = texture(uPressure, vUv + vec2(0.0, texelSize.y)).x;
  float B = texture(uPressure, vUv - vec2(0.0, texelSize.y)).x;
  vec2 velocity = texture(uVelocity, vUv).xy;
  velocity -= vec2(R - L, T - B);
  fragColor = vec4(velocity, 0.0, 1.0);
}`;

const CLEAR_FRAG = `#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uTexture;
uniform float value;
out vec4 fragColor;
void main() {
  fragColor = value * texture(uTexture, vUv);
}`;

const DISPLAY_FRAG = `#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uTexture;
out vec4 fragColor;
void main() {
  vec3 c = texture(uTexture, vUv).rgb;
  c = pow(c, vec3(0.75)) * 1.4;
  c = min(c, 1.0);
  fragColor = vec4(c, 1.0);
}`;

const BRAND_COLORS = [
  [0.35, 0.12, 0.75],
  [0.12, 0.35, 0.78],
  [0.02, 0.55, 0.65],
  [0.35, 0.38, 0.78],
  [0.45, 0.16, 0.82],
];

interface FBO {
  texture: WebGLTexture;
  fbo: WebGLFramebuffer;
  width: number;
  height: number;
  texelSizeX: number;
  texelSizeY: number;
}

interface DoubleFBO {
  width: number;
  height: number;
  texelSizeX: number;
  texelSizeY: number;
  read: FBO;
  write: FBO;
  swap(): void;
}

interface Program {
  program: WebGLProgram;
  uniforms: Record<string, WebGLUniformLocation | null>;
}

export default function FluidSimulation({ onComplete }: { onComplete?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gl = canvas.getContext("webgl2", {
      alpha: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
      antialias: false,
    });
    if (!gl) return;

    const floatExt = gl.getExtension("EXT_color_buffer_float");
    if (!floatExt) return;
    gl.getExtension("OES_texture_float_linear");

    const isMobile = window.innerWidth < 768;
    const SIM_RES = isMobile ? 64 : 128;
    const DYE_RES = isMobile ? 256 : 1024;
    const PRESSURE_ITERS = isMobile ? 12 : 20;
    const CURL = 30;
    const SPLAT_RADIUS = 0.0025;
    const SPLAT_FORCE = 6000;
    const VELOCITY_DISSIPATION = 0.98;
    const DENSITY_DISSIPATION = 0.97;
    const PRESSURE_DISSIPATION = 0.8;

    function compileShader(type: number, source: string): WebGLShader | null {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    }

    function createProg(vertSrc: string, fragSrc: string): Program | null {
      const vs = compileShader(gl!.VERTEX_SHADER, vertSrc);
      const fs = compileShader(gl!.FRAGMENT_SHADER, fragSrc);
      if (!vs || !fs) return null;
      const prog = gl!.createProgram()!;
      gl!.attachShader(prog, vs);
      gl!.attachShader(prog, fs);
      gl!.linkProgram(prog);
      if (!gl!.getProgramParameter(prog, gl!.LINK_STATUS)) {
        gl!.deleteProgram(prog);
        return null;
      }
      const uniforms: Record<string, WebGLUniformLocation | null> = {};
      const count = gl!.getProgramParameter(prog, gl!.ACTIVE_UNIFORMS) as number;
      for (let i = 0; i < count; i++) {
        const info = gl!.getActiveUniform(prog, i);
        if (info) uniforms[info.name] = gl!.getUniformLocation(prog, info.name);
      }
      return { program: prog, uniforms };
    }

    function getResolution(resolution: number) {
      let aspectRatio = gl!.canvas.width / gl!.canvas.height;
      if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;
      const min = Math.round(resolution);
      const max = Math.round(resolution * aspectRatio);
      return gl!.canvas.width > gl!.canvas.height
        ? { width: max, height: min }
        : { width: min, height: max };
    }

    function createFBO(w: number, h: number): FBO {
      gl!.activeTexture(gl!.TEXTURE0);
      const texture = gl!.createTexture()!;
      gl!.bindTexture(gl!.TEXTURE_2D, texture);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
      gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA16F, w, h, 0, gl!.RGBA, gl!.HALF_FLOAT, null);
      const fbo = gl!.createFramebuffer()!;
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, fbo);
      gl!.framebufferTexture2D(gl!.FRAMEBUFFER, gl!.COLOR_ATTACHMENT0, gl!.TEXTURE_2D, texture, 0);
      gl!.viewport(0, 0, w, h);
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      return { texture, fbo, width: w, height: h, texelSizeX: 1.0 / w, texelSizeY: 1.0 / h };
    }

    function createDoubleFBO(w: number, h: number): DoubleFBO {
      let fbo1 = createFBO(w, h);
      let fbo2 = createFBO(w, h);
      return {
        width: w, height: h,
        texelSizeX: 1.0 / w, texelSizeY: 1.0 / h,
        get read() { return fbo1; },
        get write() { return fbo2; },
        swap() { const tmp = fbo1; fbo1 = fbo2; fbo2 = tmp; },
      };
    }

    const splatProg = createProg(VERTEX, SPLAT_FRAG);
    const advectionProg = createProg(VERTEX, ADVECTION_FRAG);
    const curlProg = createProg(VERTEX, CURL_FRAG);
    const vorticityProg = createProg(VERTEX, VORTICITY_FRAG);
    const divergenceProg = createProg(VERTEX, DIVERGENCE_FRAG);
    const pressureProg = createProg(VERTEX, PRESSURE_FRAG);
    const gradientProg = createProg(VERTEX, GRADIENT_FRAG);
    const clearProg = createProg(VERTEX, CLEAR_FRAG);
    const displayProg = createProg(VERTEX, DISPLAY_FRAG);

    if (!splatProg || !advectionProg || !curlProg || !vorticityProg ||
        !divergenceProg || !pressureProg || !gradientProg || !clearProg || !displayProg) {
      return;
    }

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    let simRes = getResolution(SIM_RES);
    let dyeRes = getResolution(DYE_RES);
    let velocity = createDoubleFBO(simRes.width, simRes.height);
    let pressure = createDoubleFBO(simRes.width, simRes.height);
    let curlFBO = createFBO(simRes.width, simRes.height);
    let divergenceFBO = createFBO(simRes.width, simRes.height);
    let dye = createDoubleFBO(dyeRes.width, dyeRes.height);

    function blit(target: WebGLFramebuffer | null) {
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, target);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    }

    let textureUnit = 0;
    function bindTexture(tex: WebGLTexture): number {
      gl!.activeTexture(gl!.TEXTURE0 + textureUnit);
      gl!.bindTexture(gl!.TEXTURE_2D, tex);
      return textureUnit++;
    }

    function splat(x: number, y: number, dx: number, dy: number, color: number[]) {
      gl!.useProgram(splatProg!.program);
      textureUnit = 0;
      gl!.uniform1i(splatProg!.uniforms["uTarget"], bindTexture(velocity.read.texture));
      gl!.uniform1f(splatProg!.uniforms["aspectRatio"], canvas!.width / canvas!.height);
      gl!.uniform2f(splatProg!.uniforms["point"], x, y);
      gl!.uniform3f(splatProg!.uniforms["color"], dx, dy, 0.0);
      gl!.uniform1f(splatProg!.uniforms["radius"], SPLAT_RADIUS);
      gl!.viewport(0, 0, velocity.width, velocity.height);
      blit(velocity.write.fbo);
      velocity.swap();

      textureUnit = 0;
      gl!.uniform1i(splatProg!.uniforms["uTarget"], bindTexture(dye.read.texture));
      gl!.uniform3f(splatProg!.uniforms["color"], color[0], color[1], color[2]);
      gl!.viewport(0, 0, dye.width, dye.height);
      blit(dye.write.fbo);
      dye.swap();
    }

    const pointer = {
      x: 0, y: 0, prevX: 0, prevY: 0,
      moved: false, down: false,
      color: BRAND_COLORS[0],
    };

    function onPointerMove(e: MouseEvent | Touch) {
      const rect = canvas!.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      pointer.prevX = pointer.x;
      pointer.prevY = pointer.y;
      pointer.x = x;
      pointer.y = y;
      pointer.moved = true;
      pointer.color = BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)];
    }

    function onMouseMove(e: MouseEvent) { onPointerMove(e); }
    function onMouseDown() { pointer.down = true; }
    function onMouseUp() { pointer.down = false; }
    function onTouchMove(e: TouchEvent) {
      e.preventDefault();
      if (e.touches[0]) onPointerMove(e.touches[0]);
    }
    function onTouchStart(e: TouchEvent) {
      pointer.down = true;
      if (e.touches[0]) {
        const rect = canvas!.getBoundingClientRect();
        pointer.x = (e.touches[0].clientX - rect.left) / rect.width;
        pointer.y = 1.0 - (e.touches[0].clientY - rect.top) / rect.height;
        pointer.prevX = pointer.x;
        pointer.prevY = pointer.y;
      }
    }
    function onTouchEnd() { pointer.down = false; }

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchend", onTouchEnd);

    const wanderers = Array.from({ length: isMobile ? 2 : 3 }, (_, i) => ({
      x: 0.3 + Math.random() * 0.4,
      y: 0.3 + Math.random() * 0.4,
      speedX: 0.15 + Math.random() * 0.25,
      speedY: 0.1 + Math.random() * 0.2,
      phaseX: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
      colorIdx: i % BRAND_COLORS.length,
    }));

    function step(dt: number) {
      gl!.disable(gl!.BLEND);

      gl!.useProgram(curlProg!.program);
      textureUnit = 0;
      gl!.uniform2f(curlProg!.uniforms["texelSize"], velocity.texelSizeX, velocity.texelSizeY);
      gl!.uniform1i(curlProg!.uniforms["uVelocity"], bindTexture(velocity.read.texture));
      gl!.viewport(0, 0, simRes.width, simRes.height);
      blit(curlFBO.fbo);

      gl!.useProgram(vorticityProg!.program);
      textureUnit = 0;
      gl!.uniform2f(vorticityProg!.uniforms["texelSize"], velocity.texelSizeX, velocity.texelSizeY);
      gl!.uniform1i(vorticityProg!.uniforms["uVelocity"], bindTexture(velocity.read.texture));
      gl!.uniform1i(vorticityProg!.uniforms["uCurl"], bindTexture(curlFBO.texture));
      gl!.uniform1f(vorticityProg!.uniforms["curl"], CURL);
      gl!.uniform1f(vorticityProg!.uniforms["dt"], dt);
      gl!.viewport(0, 0, simRes.width, simRes.height);
      blit(velocity.write.fbo);
      velocity.swap();

      gl!.useProgram(advectionProg!.program);
      textureUnit = 0;
      gl!.uniform2f(advectionProg!.uniforms["texelSize"], velocity.texelSizeX, velocity.texelSizeY);
      gl!.uniform1i(advectionProg!.uniforms["uVelocity"], bindTexture(velocity.read.texture));
      gl!.uniform1i(advectionProg!.uniforms["uSource"], bindTexture(velocity.read.texture));
      gl!.uniform1f(advectionProg!.uniforms["dt"], dt);
      gl!.uniform1f(advectionProg!.uniforms["dissipation"], VELOCITY_DISSIPATION);
      gl!.viewport(0, 0, simRes.width, simRes.height);
      blit(velocity.write.fbo);
      velocity.swap();

      gl!.useProgram(advectionProg!.program);
      textureUnit = 0;
      gl!.uniform2f(advectionProg!.uniforms["texelSize"], velocity.texelSizeX, velocity.texelSizeY);
      gl!.uniform1i(advectionProg!.uniforms["uVelocity"], bindTexture(velocity.read.texture));
      gl!.uniform1i(advectionProg!.uniforms["uSource"], bindTexture(dye.read.texture));
      gl!.uniform1f(advectionProg!.uniforms["dissipation"], DENSITY_DISSIPATION);
      gl!.viewport(0, 0, dyeRes.width, dyeRes.height);
      blit(dye.write.fbo);
      dye.swap();

      gl!.useProgram(divergenceProg!.program);
      textureUnit = 0;
      gl!.uniform2f(divergenceProg!.uniforms["texelSize"], velocity.texelSizeX, velocity.texelSizeY);
      gl!.uniform1i(divergenceProg!.uniforms["uVelocity"], bindTexture(velocity.read.texture));
      gl!.viewport(0, 0, simRes.width, simRes.height);
      blit(divergenceFBO.fbo);

      gl!.useProgram(clearProg!.program);
      textureUnit = 0;
      gl!.uniform1i(clearProg!.uniforms["uTexture"], bindTexture(pressure.read.texture));
      gl!.uniform1f(clearProg!.uniforms["value"], PRESSURE_DISSIPATION);
      gl!.viewport(0, 0, simRes.width, simRes.height);
      blit(pressure.write.fbo);
      pressure.swap();

      gl!.useProgram(pressureProg!.program);
      gl!.uniform2f(pressureProg!.uniforms["texelSize"], velocity.texelSizeX, velocity.texelSizeY);
      for (let i = 0; i < PRESSURE_ITERS; i++) {
        textureUnit = 0;
        gl!.uniform1i(pressureProg!.uniforms["uPressure"], bindTexture(pressure.read.texture));
        gl!.uniform1i(pressureProg!.uniforms["uDivergence"], bindTexture(divergenceFBO.texture));
        gl!.viewport(0, 0, simRes.width, simRes.height);
        blit(pressure.write.fbo);
        pressure.swap();
      }

      gl!.useProgram(gradientProg!.program);
      textureUnit = 0;
      gl!.uniform2f(gradientProg!.uniforms["texelSize"], velocity.texelSizeX, velocity.texelSizeY);
      gl!.uniform1i(gradientProg!.uniforms["uPressure"], bindTexture(pressure.read.texture));
      gl!.uniform1i(gradientProg!.uniforms["uVelocity"], bindTexture(velocity.read.texture));
      gl!.viewport(0, 0, simRes.width, simRes.height);
      blit(velocity.write.fbo);
      velocity.swap();
    }

    function render() {
      gl!.useProgram(displayProg!.program);
      textureUnit = 0;
      gl!.uniform1i(displayProg!.uniforms["uTexture"], bindTexture(dye.read.texture));
      gl!.viewport(0, 0, gl!.canvas.width, gl!.canvas.height);
      blit(null);
    }

    function resize() {
      const w = canvas!.clientWidth;
      const h = canvas!.clientHeight;
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
        simRes = getResolution(SIM_RES);
        dyeRes = getResolution(DYE_RES);
        velocity = createDoubleFBO(simRes.width, simRes.height);
        pressure = createDoubleFBO(simRes.width, simRes.height);
        curlFBO = createFBO(simRes.width, simRes.height);
        divergenceFBO = createFBO(simRes.width, simRes.height);
        dye = createDoubleFBO(dyeRes.width, dyeRes.height);
      }
    }

    resize();

    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const r = 0.15;
      const cx = 0.5 + Math.cos(angle) * r;
      const cy = 0.5 + Math.sin(angle) * r;
      const dx = Math.cos(angle) * SPLAT_FORCE * 0.3;
      const dy = Math.sin(angle) * SPLAT_FORCE * 0.3;
      splat(cx, cy, dx, dy, BRAND_COLORS[i % BRAND_COLORS.length]);
    }

    let lastTime = performance.now();
    let animFrame = 0;
    let elapsed = 0;
    let completeFired = false;
    const INTRO_DURATION = 3.0;
    const FADE_SIGNAL = 3.5;

    function loop() {
      const now = performance.now();
      let dt = (now - lastTime) / 1000;
      dt = Math.min(dt, 1 / 30);
      lastTime = now;
      elapsed += dt;

      resize();

      if (elapsed < INTRO_DURATION) {
        if (pointer.moved) {
          pointer.moved = false;
          const dx = (pointer.x - pointer.prevX) * SPLAT_FORCE;
          const dy = (pointer.y - pointer.prevY) * SPLAT_FORCE;
          if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
            splat(pointer.x, pointer.y, dx, dy, pointer.color);
          }
        }

        for (const w of wanderers) {
          const newX = 0.5 + 0.35 * Math.sin(elapsed * w.speedX + w.phaseX);
          const newY = 0.5 + 0.3 * Math.cos(elapsed * w.speedY + w.phaseY);
          const dx = (newX - w.x) * 600;
          const dy = (newY - w.y) * 600;
          w.x = newX;
          w.y = newY;
          const color = BRAND_COLORS[w.colorIdx];
          splat(w.x, w.y, dx, dy, [color[0] * 0.7, color[1] * 0.7, color[2] * 0.7]);
        }
      }

      if (!completeFired && elapsed >= FADE_SIGNAL) {
        completeFired = true;
        onComplete?.();
      }

      step(dt);
      render();

      if (elapsed < FADE_SIGNAL + 2) {
        animFrame = requestAnimationFrame(loop);
      }
    }

    const resizeHandler = () => resize();
    window.addEventListener("resize", resizeHandler);
    animFrame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resizeHandler);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
