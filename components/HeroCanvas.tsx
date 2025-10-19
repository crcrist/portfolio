"use client";
import React from "react";
import dynamic from "next/dynamic";

// Dynamically import the Rubik’s Cube canvas (prevents SSR hydration errors)
const HeroRubiksCube = dynamic(() => import("./HeroRubiksCube"), { ssr: false });

export default function HeroCanvas() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Canvas Layer */}
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          inset: 0,
          zIndex: 1, // cube layer
        }}
      >
        <HeroRubiksCube />
      </div>

      {/* Overlay Text */}
      <div
        style={{
          position: "absolute",
          top: "5%",
          left: "5%",
          color: "#b2f5ea",
          fontFamily: "Inter, sans-serif",
          zIndex: 2,
          pointerEvents: "none", // 👈 allows you to drag cube through the text
        }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: 600 }}>Connor Crist</h1>
        <p style={{ fontSize: "1rem", opacity: 0.8 }}>
          Portfolio | Data + Engineering
        </p>
      </div>
    </div>
  );
}
