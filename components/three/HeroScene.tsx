"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";

const mouseNDC = new THREE.Vector2(9999, 9999);
const mouseSmooth = new THREE.Vector2(9999, 9999);
const tempVec3 = new THREE.Vector3();
const tempVec2 = new THREE.Vector2();

function MouseTracker({ children }: { children: React.ReactNode }) {
  const { camera } = useThree();
  const camTarget = useRef({ x: 0, y: 0 });

  const onPointerMove = useCallback((e: { clientX: number; clientY: number }) => {
    const nx = (e.clientX / window.innerWidth - 0.5) * 2;
    const ny = -(e.clientY / window.innerHeight - 0.5) * 2;
    mouseNDC.set(nx, ny);
    camTarget.current.x = nx;
    camTarget.current.y = ny;
  }, []);

  const onPointerLeave = useCallback(() => {
    mouseNDC.set(9999, 9999);
    mouseSmooth.set(9999, 9999);
  }, []);

  useFrame(() => {
    if (mouseNDC.x < 100) {
      mouseSmooth.x += (mouseNDC.x - mouseSmooth.x) * 0.12;
      mouseSmooth.y += (mouseNDC.y - mouseSmooth.y) * 0.12;
    }

    const cx = camera.position.x;
    const cy = camera.position.y;
    camera.position.x = cx + (camTarget.current.x * 0.6 - cx) * 0.04;
    camera.position.y = cy + (camTarget.current.y * 0.4 - cy) * 0.04;
    camera.lookAt(0, 0, 0);
  });

  return (
    <group
      onPointerMove={onPointerMove as unknown as React.PointerEventHandler<THREE.Object3D>}
      onPointerLeave={onPointerLeave as unknown as React.PointerEventHandler<THREE.Object3D>}
    >
      <mesh visible={false}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      {children}
    </group>
  );
}

function projectToScreen(
  x: number, y: number, z: number,
  camera: THREE.Camera
): THREE.Vector2 {
  tempVec3.set(x, y, z).project(camera);
  tempVec2.set(tempVec3.x, tempVec3.y);
  return tempVec2;
}

function NeuralCore({ isMobile }: { isMobile: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x = t * 0.12;
    meshRef.current.rotation.y = t * 0.18;
    const pulse = 1 + Math.sin(t * 2) * 0.03;
    meshRef.current.scale.setScalar((isMobile ? 1.6 : 2.2) * pulse);
    if (glowRef.current) {
      glowRef.current.scale.setScalar((isMobile ? 2.0 : 2.8) * pulse);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.04 + Math.sin(t * 1.5) * 0.02;
    }
  });

  return (
    <group>
      <mesh ref={glowRef}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.05} side={THREE.BackSide} />
      </mesh>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, isMobile ? 2 : 4]} />
        {isMobile ? (
          <meshStandardMaterial color="#7c3aed" wireframe transparent opacity={0.35} />
        ) : (
          <MeshDistortMaterial
            color="#7c3aed" transparent opacity={0.55}
            distort={0.25} speed={1.8}
            roughness={0.15} metalness={0.9}
          />
        )}
      </mesh>
    </group>
  );
}

function ParticleField({
  count,
  repulse,
  spread,
  color,
  size,
  baseSpeed,
}: {
  count: number;
  repulse: boolean;
  spread: number;
  color: string;
  size: number;
  baseSpeed: number;
}) {
  const ref = useRef<THREE.Points>(null);
  const { camera } = useThree();

  const { positions, velocities, homeAngles } = useMemo(() => {
    const p = new Float32Array(count * 3);
    const v = new Float32Array(count * 3);
    const ha = new Float32Array(count * 2);
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 1.5 + Math.random() * spread;
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi) * 0.6;
      ha[i * 2] = theta;
      ha[i * 2 + 1] = r;
    }
    return { positions: p, velocities: v, homeAngles: ha };
  }, [count, spread]);

  useFrame((state) => {
    if (!ref.current) return;
    const posAttr = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    const t = state.clock.elapsedTime;
    const vel = velocities;

    const repulseScreenRadius = 0.25;
    const repulseForce = 0.35;
    const friction = 0.92;
    const returnStrength = 0.008;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      const angle = homeAngles[i * 2] + t * baseSpeed * (0.5 + (i % 5) * 0.1);
      const r = homeAngles[i * 2 + 1];
      const phi = Math.acos(2 * ((i / count + t * 0.01) % 1) - 1);

      const homeX = r * Math.sin(phi) * Math.cos(angle);
      const homeY = r * Math.sin(phi) * Math.sin(angle);
      const homeZ = r * Math.cos(phi) * 0.6;

      vel[i3] += (homeX - arr[i3]) * returnStrength;
      vel[i3 + 1] += (homeY - arr[i3 + 1]) * returnStrength;
      vel[i3 + 2] += (homeZ - arr[i3 + 2]) * returnStrength;

      if (repulse && mouseSmooth.x < 100) {
        const screen = projectToScreen(arr[i3], arr[i3 + 1], arr[i3 + 2], camera);
        const dx = screen.x - mouseSmooth.x;
        const dy = screen.y - mouseSmooth.y;
        const screenDist = Math.sqrt(dx * dx + dy * dy);

        if (screenDist < repulseScreenRadius) {
          const strength = (1 - screenDist / repulseScreenRadius);
          const force = strength * strength * repulseForce;
          const wx = arr[i3] - mouseSmooth.x * 4;
          const wy = arr[i3 + 1] - mouseSmooth.y * 4;
          const wLen = Math.sqrt(wx * wx + wy * wy) || 1;
          vel[i3] += (wx / wLen) * force;
          vel[i3 + 1] += (wy / wLen) * force;
          vel[i3 + 2] += (Math.random() - 0.5) * force * 0.3;
        }
      }

      vel[i3] *= friction;
      vel[i3 + 1] *= friction;
      vel[i3 + 2] *= friction;

      arr[i3] += vel[i3];
      arr[i3 + 1] += vel[i3 + 1];
      arr[i3 + 2] += vel[i3 + 2];
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={size} color={color} transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

function ConnectionLines({
  nodeCount,
  maxConnections,
  repulse,
}: {
  nodeCount: number;
  maxConnections: number;
  repulse: boolean;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { camera } = useThree();

  const { homePositions, currentPositions, vel, connections } = useMemo(() => {
    const home = new Float32Array(nodeCount * 3);
    const current = new Float32Array(nodeCount * 3);
    const v = new Float32Array(nodeCount * 3);
    const vecs: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 2.5 + Math.random() * 2;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi) * 0.5;
      home[i * 3] = x; home[i * 3 + 1] = y; home[i * 3 + 2] = z;
      current[i * 3] = x; current[i * 3 + 1] = y; current[i * 3 + 2] = z;
      vecs.push(new THREE.Vector3(x, y, z));
    }
    const conns: [number, number][] = [];
    for (let i = 0; i < nodeCount && conns.length < maxConnections; i++) {
      for (let j = i + 1; j < nodeCount && conns.length < maxConnections; j++) {
        if (vecs[i].distanceTo(vecs[j]) < 2.8) conns.push([i, j]);
      }
    }
    return { homePositions: home, currentPositions: current, vel: v, connections: conns };
  }, [nodeCount, maxConnections]);

  const linePositions = useMemo(() => new Float32Array(connections.length * 6), [connections]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const pos = currentPositions;

    const repulseScreenRadius = 0.28;
    const repulseForce = 0.4;
    const friction = 0.9;
    const returnStrength = 0.015;

    for (let i = 0; i < nodeCount; i++) {
      const i3 = i * 3;

      vel[i3] += (homePositions[i3] - pos[i3]) * returnStrength;
      vel[i3 + 1] += (homePositions[i3 + 1] - pos[i3 + 1]) * returnStrength;
      vel[i3 + 2] += (homePositions[i3 + 2] - pos[i3 + 2]) * returnStrength;

      if (repulse && mouseSmooth.x < 100) {
        const screen = projectToScreen(pos[i3], pos[i3 + 1], pos[i3 + 2], camera);
        const dx = screen.x - mouseSmooth.x;
        const dy = screen.y - mouseSmooth.y;
        const screenDist = Math.sqrt(dx * dx + dy * dy);

        if (screenDist < repulseScreenRadius) {
          const strength = (1 - screenDist / repulseScreenRadius);
          const force = strength * strength * repulseForce;
          const wx = pos[i3] - mouseSmooth.x * 4;
          const wy = pos[i3 + 1] - mouseSmooth.y * 4;
          const wLen = Math.sqrt(wx * wx + wy * wy) || 1;
          vel[i3] += (wx / wLen) * force;
          vel[i3 + 1] += (wy / wLen) * force;
        }
      }

      vel[i3] *= friction;
      vel[i3 + 1] *= friction;
      vel[i3 + 2] *= friction;

      pos[i3] += vel[i3];
      pos[i3 + 1] += vel[i3 + 1];
      pos[i3 + 2] += vel[i3 + 2];
    }

    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    (posAttr.array as Float32Array).set(pos);
    posAttr.needsUpdate = true;

    for (let c = 0; c < connections.length; c++) {
      const [a, b] = connections[c];
      linePositions[c * 6] = pos[a * 3];
      linePositions[c * 6 + 1] = pos[a * 3 + 1];
      linePositions[c * 6 + 2] = pos[a * 3 + 2];
      linePositions[c * 6 + 3] = pos[b * 3];
      linePositions[c * 6 + 4] = pos[b * 3 + 1];
      linePositions[c * 6 + 5] = pos[b * 3 + 2];
    }

    if (linesRef.current) {
      const lAttr = linesRef.current.geometry.attributes.position as THREE.BufferAttribute;
      (lAttr.array as Float32Array).set(linePositions);
      lAttr.needsUpdate = true;
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[currentPositions.slice(), 3]} count={nodeCount} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.06} color="#a78bfa" transparent opacity={0.9} sizeAttenuation />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[new Float32Array(connections.length * 6), 3]} count={connections.length * 2} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#7c3aed" transparent opacity={0.12} />
      </lineSegments>
    </group>
  );
}

function FloatingRings() {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1.current) { ring1.current.rotation.x = t * 0.25; ring1.current.rotation.z = t * 0.08; }
    if (ring2.current) { ring2.current.rotation.y = t * 0.2; ring2.current.rotation.z = t * -0.12; }
    if (ring3.current) { ring3.current.rotation.x = t * -0.15; ring3.current.rotation.y = t * 0.1; }
  });

  return (
    <>
      <mesh ref={ring1}><torusGeometry args={[3.2, 0.012, 16, 100]} /><meshStandardMaterial color="#7c3aed" transparent opacity={0.2} /></mesh>
      <mesh ref={ring2}><torusGeometry args={[3.8, 0.01, 16, 100]} /><meshStandardMaterial color="#3b82f6" transparent opacity={0.15} /></mesh>
      <mesh ref={ring3}><torusGeometry args={[4.3, 0.008, 16, 100]} /><meshStandardMaterial color="#818cf8" transparent opacity={0.1} /></mesh>
    </>
  );
}

export default function HeroScene() {
  const { isMobile, isLowEndDevice } = useDeviceDetection();

  const nodeCount = isMobile ? 25 : isLowEndDevice ? 50 : 100;
  const connectionCount = isMobile ? 20 : isLowEndDevice ? 50 : 120;
  const fieldCount = isMobile ? 60 : isLowEndDevice ? 120 : 250;

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      dpr={isMobile ? 1 : [1, 2]}
      gl={{
        antialias: !isMobile,
        powerPreference: isLowEndDevice ? "low-power" : "high-performance",
        alpha: true,
      }}
      style={{ pointerEvents: isMobile ? "none" : "auto" }}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} color="#7c3aed" intensity={1.2} />
      <pointLight position={[-5, -3, 5]} color="#3b82f6" intensity={0.8} />
      <pointLight position={[0, 5, -5]} color="#818cf8" intensity={0.5} />

      {isMobile ? (
        <group>
          <NeuralCore isMobile />
          <ParticleField count={fieldCount} repulse={false} spread={4} color="#3b82f6" size={0.025} baseSpeed={0.08} />
          <ConnectionLines nodeCount={nodeCount} maxConnections={connectionCount} repulse={false} />
          <Stars radius={50} depth={50} count={500} factor={2} saturation={0} fade speed={0.3} />
        </group>
      ) : (
        <MouseTracker>
          <NeuralCore isMobile={false} />
          <ParticleField count={fieldCount} repulse spread={4.5} color="#3b82f6" size={0.03} baseSpeed={0.06} />
          <ParticleField count={Math.floor(fieldCount * 0.5)} repulse spread={3} color="#818cf8" size={0.025} baseSpeed={0.04} />
          <ConnectionLines nodeCount={nodeCount} maxConnections={connectionCount} repulse />
          {!isLowEndDevice && <FloatingRings />}
          <Stars radius={50} depth={50} count={1500} factor={2} saturation={0} fade speed={0.3} />
        </MouseTracker>
      )}
    </Canvas>
  );
}
