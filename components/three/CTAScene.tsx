"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";

function ConnectedParticles({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const positionsRef = useRef<Float32Array>(null!);
  const velocitiesRef = useRef<Float32Array>(null!);

  const { positions, velocities } = useMemo(() => {
    const p = new Float32Array(count * 3);
    const v = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 16;
      p[i * 3 + 1] = (Math.random() - 0.5) * 10;
      p[i * 3 + 2] = (Math.random() - 0.5) * 8;
      v[i * 3] = (Math.random() - 0.5) * 0.005;
      v[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      v[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    }
    positionsRef.current = p;
    velocitiesRef.current = v;
    return { positions: p, velocities: v };
  }, [count]);

  const lineGeom = useMemo(() => new THREE.BufferGeometry(), []);
  const maxLines = count * 3;
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const pos = positionsRef.current;
    const vel = velocitiesRef.current;

    for (let i = 0; i < count; i++) {
      pos[i * 3] += vel[i * 3];
      pos[i * 3 + 1] += vel[i * 3 + 1];
      pos[i * 3 + 2] += vel[i * 3 + 2];
      if (Math.abs(pos[i * 3]) > 8) vel[i * 3] *= -1;
      if (Math.abs(pos[i * 3 + 1]) > 5) vel[i * 3 + 1] *= -1;
      if (Math.abs(pos[i * 3 + 2]) > 4) vel[i * 3 + 2] *= -1;
    }
    (pointsRef.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;

    let lineIdx = 0;
    for (let i = 0; i < count && lineIdx < maxLines; i++) {
      for (let j = i + 1; j < count && lineIdx < maxLines; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 2.5) {
          linePositions[lineIdx * 6] = pos[i * 3];
          linePositions[lineIdx * 6 + 1] = pos[i * 3 + 1];
          linePositions[lineIdx * 6 + 2] = pos[i * 3 + 2];
          linePositions[lineIdx * 6 + 3] = pos[j * 3];
          linePositions[lineIdx * 6 + 4] = pos[j * 3 + 1];
          linePositions[lineIdx * 6 + 5] = pos[j * 3 + 2];
          lineIdx++;
        }
      }
    }
    for (let i = lineIdx * 6; i < linePositions.length; i++) linePositions[i] = 0;

    lineGeom.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeom.setDrawRange(0, lineIdx * 2);
    if (linesRef.current) linesRef.current.geometry = lineGeom;
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.03} color="#a78bfa" transparent opacity={0.6} sizeAttenuation />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial color="#7c3aed" transparent opacity={0.06} />
      </lineSegments>
    </group>
  );
}

function PulsingLight({ position, color, intensity }: { position: [number, number, number]; color: string; intensity: number }) {
  const ref = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.intensity = intensity + Math.sin(state.clock.elapsedTime * 1.5) * intensity * 0.3;
  });

  return <pointLight ref={ref} position={position} color={color} intensity={intensity} distance={15} />;
}

export default function CTAScene() {
  const { isMobile, isLowEndDevice } = useDeviceDetection();
  const particleCount = isMobile ? 30 : isLowEndDevice ? 50 : 100;

  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 45 }}
      dpr={isMobile ? 1 : [1, 2]}
      gl={{
        antialias: !isMobile,
        powerPreference: isLowEndDevice ? "low-power" : "high-performance",
        alpha: true,
      }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.15} />
      <PulsingLight position={[5, 3, 5]} color="#7c3aed" intensity={0.8} />
      <PulsingLight position={[-5, -2, 5]} color="#3b82f6" intensity={0.6} />
      <PulsingLight position={[0, 5, -3]} color="#818cf8" intensity={0.4} />

      <ConnectedParticles count={particleCount} />
      <Stars radius={30} depth={30} count={isMobile ? 300 : 800} factor={2} saturation={0} fade speed={0.2} />
      {!isMobile && <Sparkles count={20} scale={12} size={1.2} speed={0.2} color="#a78bfa" />}
    </Canvas>
  );
}
