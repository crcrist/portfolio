// pages/rubiks.tsx
"use client";
import dynamic from "next/dynamic";
const HeroRubiksCube = dynamic(() => import("../components/HeroRubiksCube"), { ssr: false });

export default function RubiksPage() {
  return (
    <div style={{ height: "100vh" }}>
      <HeroRubiksCube />
    </div>
  );
}
