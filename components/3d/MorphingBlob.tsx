"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

interface MorphingBlobProps {
  mousePosition: { x: number; y: number };
}

export default function MorphingBlob({ mousePosition }: MorphingBlobProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  // Create gradient colors for the blob (Crimson/Ruby palette)
  const colors = useMemo(() => ({
    color1: new THREE.Color('#a0141e'), // Deep crimson red
    color2: new THREE.Color('#7a0c1a'), // Dark blood red
    emissive: new THREE.Color('#c41e3a'), // Vibrant crimson glow
  }), []);

  // Animate the blob - lava lamp style organic morphing
  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;

    // Lava lamp style rotation (slower, more organic)
    meshRef.current.rotation.x = Math.sin(time * 0.08) * 0.3 + time * 0.05;
    meshRef.current.rotation.y = Math.cos(time * 0.12) * 0.3 + time * 0.08;
    meshRef.current.rotation.z = Math.sin(time * 0.06) * 0.2;

    // Complex morphing with multiple frequencies
    const morph1 = Math.sin(time * 0.3) * 0.15;
    const morph2 = Math.cos(time * 0.17) * 0.1;
    const morph3 = Math.sin(time * 0.23) * 0.08;
    const scale = 1 + morph1 + morph2 + morph3;

    // Non-uniform scaling for organic stretch/squish
    meshRef.current.scale.set(
      scale * (1 + Math.sin(time * 0.13) * 0.05),
      scale * (1 + Math.cos(time * 0.19) * 0.05),
      scale * (1 + Math.sin(time * 0.11) * 0.05)
    );

    // Dynamic distortion (lava lamp viscosity)
    if (materialRef.current) {
      const baseDistortion = 0.5;
      const wave1 = Math.sin(time * 0.3) * 0.2;
      const wave2 = Math.cos(time * 0.17) * 0.15;
      materialRef.current.distort = baseDistortion + wave1 + wave2;
    }

    // Mouse interaction with smoothing
    if (mousePosition.x !== 0 || mousePosition.y !== 0) {
      meshRef.current.rotation.x += mousePosition.y * 0.03;
      meshRef.current.rotation.y += mousePosition.x * 0.03;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      {/* Icosahedron for smooth organic shape */}
      <icosahedronGeometry args={[2.5, 64]} />

      {/* Distortion material with gradient effect - enhanced for lava lamp */}
      <MeshDistortMaterial
        ref={materialRef}
        color={colors.color1}
        emissive={colors.emissive}
        emissiveIntensity={0.4}
        distort={0.5}
        speed={1.5}
        roughness={0.15}
        metalness={0.85}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}
