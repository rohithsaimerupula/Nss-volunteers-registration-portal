"use client";

import { Canvas } from "@react-three/fiber";
import { ParticleNetwork } from "./ParticleNetwork";
import { useEffect, useState } from "react";

export default function Background3D() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <fog attach="fog" args={['#F5F3EC', 5, 15]} />
        <ambientLight intensity={0.5} />
        <ParticleNetwork />
      </Canvas>
    </div>
  );
}
