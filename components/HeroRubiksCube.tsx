// components/HeroRubiksCube.tsx
"use client";
import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { RubiksEngine } from "./RubiksEngine";

function RubiksHost() {
  const host = useRef<THREE.Group>(null!);
  const engine = useMemo(() => new RubiksEngine(), []);
  const { camera, size } = useThree();

  useEffect(() => {
    host.current.add(engine.root);
  }, [engine]);

  // Animation loop
  useFrame((_, delta) => {
    engine.update(delta);
  });

  const onPointerDown = (e: any) => {
    // stop orbit when clicking a face
    e.stopPropagation();
    engine.click(e.clientX, e.clientY, camera, { width: size.width, height: size.height });
  };

  return <group ref={host} onPointerDown={onPointerDown} />;
}

export default function HeroRubiksCube() {
  return (
    <Canvas
      camera={{ position: [6, 6, 6], fov: 45 }}
      style={{ width: "100%", height: "100%", cursor: "pointer" }}
      shadows
    >
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 10]} intensity={1.25} color="#fff4e5" castShadow />
      <pointLight position={[-6, -6, -6]} intensity={0.4} />

      {/* Engine host */}
      <RubiksHost />

      {/* View control (no pan/zoom for a hero) */}
      <OrbitControls enablePan={false} enableZoom={false} enableDamping dampingFactor={0.12} />
    </Canvas>
  );
}
