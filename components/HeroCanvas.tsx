"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { EffectComposer, DepthOfField, Bloom } from "@react-three/postprocessing";
import { useRef, useState, useEffect, useMemo } from "react";
import * as THREE from "three";

/* Floating Orbs with cyberpunk colors */
function FloatingOrbs({ count = 15 }) {
  const group = useRef<THREE.Group>(null!);
  const orbs = useMemo(() => {
    const colors = ["#06b6d4", "#d946ef", "#f59e0b", "#22d3ee", "#c026d3"];
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        position: [
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8,
          -Math.random() * 6 - 1,
        ],
        scale: Math.random() * 0.9 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 0.25 + 0.1,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.children.forEach((child, i) => {
      const { speed, phase } = orbs[i];
      child.position.y += Math.sin(t * speed + phase) * 0.003;
      child.position.x += Math.cos(t * speed * 0.8 + phase) * 0.002;
    });
  });

  return (
    <group ref={group}>
      {orbs.map((orb, i) => (
        <Sphere key={i} args={[0.5, 32, 32]} position={orb.position} scale={orb.scale}>
          <meshStandardMaterial
            color={orb.color}
            emissive={orb.color}
            emissiveIntensity={0.6}
            transparent
            opacity={0.35}
            roughness={0.2}
            metalness={0.2}
          />
        </Sphere>
      ))}
    </group>
  );
}

/* Interactive Core Sphere */
function InteractiveSphere() {
  const sphereRef = useRef<THREE.Mesh>(null!);
  const lightRef = useRef<THREE.PointLight>(null!);
  const light2Ref = useRef<THREE.PointLight>(null!);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    sphereRef.current.rotation.y += delta * 0.25;
    sphereRef.current.rotation.x += delta * 0.12;

    sphereRef.current.position.x = THREE.MathUtils.lerp(
      sphereRef.current.position.x,
      mouse.x * 0.5,
      0.05
    );
    sphereRef.current.position.y = THREE.MathUtils.lerp(
      sphereRef.current.position.y,
      mouse.y * 0.5,
      0.05
    );

    if (lightRef.current) {
      lightRef.current.position.x = THREE.MathUtils.lerp(
        lightRef.current.position.x,
        mouse.x * 3,
        0.1
      );
      lightRef.current.position.y = THREE.MathUtils.lerp(
        lightRef.current.position.y,
        mouse.y * 2,
        0.1
      );
    }
  });

  return (
    <>
      <pointLight ref={lightRef} intensity={2.5} color="#06b6d4" distance={10} />
      <pointLight ref={light2Ref} position={[-4, 3, -3]} intensity={2} color="#d946ef" distance={8} />
      <pointLight position={[4, -2, -2]} intensity={1.5} color="#f59e0b" distance={6} />
      
      <Sphere ref={sphereRef} args={[1.5, 64, 64]}>
        <meshPhysicalMaterial
          color="#06b6d4"
          emissive="#d946ef"
          emissiveIntensity={0.9}
          roughness={0.1}
          metalness={0.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={0.15}
          thickness={0.6}
        />
      </Sphere>
    </>
  );
}

/* Scene Effects */
function SceneEffects() {
  const { scene } = useThree();
  scene.fog = new THREE.Fog("#0a1a2a", 3, 14);
  return (
    <EffectComposer>
      <DepthOfField
        focusDistance={0.01}
        focalLength={0.02}
        bokehScale={2.5}
        height={480}
      />
      <Bloom
        luminanceThreshold={0.1}
        luminanceSmoothing={0.9}
        intensity={1.5}
      />
    </EffectComposer>
  );
}

/* Camera Controller */
function CameraController() {
  const { camera } = useThree();
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const progress = Math.min(scrollTop / windowHeight, 1);
      scrollRef.current = progress;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const scrollFactor = scrollRef.current;

    const driftX = Math.sin(t * 0.1) * 0.25;
    const driftY = Math.cos(t * 0.07) * 0.15;
    const targetZ = 6 - scrollFactor * 2.8;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, driftX, 0.02);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, driftY, 0.02);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.04);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function HeroCanvas() {
  return (
    <Canvas
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
      camera={{ position: [0, 0, 6], fov: 55 }}
    >
      <ambientLight intensity={0.5} />
      <FloatingOrbs count={15} />
      <InteractiveSphere />
      <SceneEffects />
      <CameraController />
    </Canvas>
  );
}
