"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { EffectComposer, DepthOfField, Bloom } from "@react-three/postprocessing";
import { useRef, useState, useEffect, useMemo } from "react";
import * as THREE from "three";

/* ---------------- Floating Orbs ---------------- */
function FloatingOrbs({ count = 8 }) {
  const group = useRef<THREE.Group>(null!);
  const orbs = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        position: [
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 4,
          -Math.random() * 4 - 1,
        ],
        scale: Math.random() * 0.6 + 0.2,
        color: ["#7EE3B5", "#88C999", "#A0F2D8"][Math.floor(Math.random() * 3)],
        speed: Math.random() * 0.3 + 0.1,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.children.forEach((child, i) => {
      const { speed, phase } = orbs[i];
      child.position.y = Math.sin(t * speed + phase) * 0.5;
    });
  });

  return (
    <group ref={group}>
      {orbs.map((orb, i) => (
        <Sphere key={i} args={[0.5, 32, 32]} position={orb.position} scale={orb.scale}>
          <meshStandardMaterial
            color={orb.color}
            emissive={orb.color}
            emissiveIntensity={0.7}
            transparent
            opacity={0.22}
            roughness={0.3}
            metalness={0.1}
          />
        </Sphere>
      ))}
    </group>
  );
}

/* ---------------- Interactive Core Sphere ---------------- */
function InteractiveSphere() {
  const sphereRef = useRef<THREE.Mesh>(null!);
  const lightRef = useRef<THREE.PointLight>(null!);
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
    sphereRef.current.rotation.y += delta * 0.3;
    sphereRef.current.rotation.x += delta * 0.15;

    sphereRef.current.position.x = THREE.MathUtils.lerp(
      sphereRef.current.position.x,
      mouse.x * 0.3,
      0.05
    );
    sphereRef.current.position.y = THREE.MathUtils.lerp(
      sphereRef.current.position.y,
      mouse.y * 0.3,
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
      <pointLight ref={lightRef} intensity={1.5} color="#aaffcc" />
      <Sphere ref={sphereRef} args={[1.2, 64, 64]}>
        <meshStandardMaterial
          color="#88c999"
          emissive="#1a3f2c"
          emissiveIntensity={1.1}
          roughness={0.25}
          metalness={0.3}
        />
      </Sphere>
    </>
  );
}

/* ---------------- Fog & Post-Processing ---------------- */
function SceneEffects() {
  const { scene } = useThree();
  scene.fog = new THREE.Fog("#0a1f1a", 2, 10); // color, near, far
  return (
    <EffectComposer>
      <DepthOfField
        focusDistance={0.02}
        focalLength={0.015}
        bokehScale={1.5}
        height={480}
      />
      <Bloom
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        intensity={0.8}
      />
    </EffectComposer>
  );
}

/* ---------------------------  Canvas Wrapper -------------------------- */
function CameraController() {
  const { camera } = useThree();
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      // normalize scroll progress (0 → 1 across one viewport height)
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

    // gentle idle drift (like breathing)
    const driftX = Math.sin(t * 0.15) * 0.15;
    const driftY = Math.cos(t * 0.1) * 0.08;

    // scroll-based dolly/zoom (moves closer as you scroll)
    const targetZ = 5 - scrollFactor * 2.2;

    // smooth interpolation
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, driftX, 0.03);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, driftY, 0.03);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
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
      }}
      camera={{ position: [0, 0, 5], fov: 60 }}
    >
      <ambientLight intensity={0.3} />
      <FloatingOrbs count={8} />
      <InteractiveSphere />
      <SceneEffects />
      <CameraController />
    </Canvas>
  );
}
