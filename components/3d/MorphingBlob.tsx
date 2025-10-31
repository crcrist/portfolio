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

  // Create gradient colors for the blob (PRD colors)
  const colors = useMemo(() => ({
    color1: new THREE.Color('#e17c6b'), // Primary rose coral
    color2: new THREE.Color('#d4615e'), // Deeper coral
  }), []);

  // Animate the blob
  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;

    // Gentle rotation
    meshRef.current.rotation.x = time * 0.1;
    meshRef.current.rotation.y = time * 0.15;

    // Mouse interaction - subtle parallax
    meshRef.current.rotation.x += mousePosition.y * 0.05;
    meshRef.current.rotation.y += mousePosition.x * 0.05;

    // Pulsing scale
    const scale = 1 + Math.sin(time * 0.5) * 0.05;
    meshRef.current.scale.set(scale, scale, scale);

    // Animate material distortion
    if (materialRef.current) {
      materialRef.current.distort = 0.4 + Math.sin(time * 0.3) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      {/* Icosahedron for smooth organic shape */}
      <icosahedronGeometry args={[2.5, 64]} />

      {/* Distortion material with gradient effect */}
      <MeshDistortMaterial
        ref={materialRef}
        color={colors.color1}
        emissive={colors.color2}
        emissiveIntensity={0.3}
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}
