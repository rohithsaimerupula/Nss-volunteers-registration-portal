"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Environment } from "@react-three/drei";

function Splash3D() {
  return (
    <div className="absolute inset-0 z-0 opacity-40">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={1} />
        <directionalLight position={[2, 5, 2]} intensity={2} />
        <Float speed={3} rotationIntensity={2} floatIntensity={3}>
          <Sphere args={[1.5, 64, 64]} scale={1.2}>
            <MeshDistortMaterial
              color="#15803d"
              attach="material"
              distort={0.5}
              speed={2}
              roughness={0.2}
              metalness={0.8}
            />
          </Sphere>
        </Float>
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState<"nss" | "bharat" | "done">("nss");

  useEffect(() => {
    // Stage 1: NSS Logo for 2.5s
    const timer1 = setTimeout(() => {
      setStage("bharat");
    }, 2500);

    // Stage 2: My Bharat for 2.5s
    const timer2 = setTimeout(() => {
      setStage("done");
      setTimeout(onComplete, 800); // Wait for fade out
    }, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage !== "done" && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white overflow-hidden"
        >
          <Splash3D />

          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
            <AnimatePresence mode="wait">
              {stage === "nss" && (
                <motion.div
                  key="nss"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.2, filter: "blur(5px)" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="flex flex-col items-center gap-6"
                >
                  {/* CSS representation of NSS Logo */}
                  <div className="relative w-40 h-40 rounded-full border-[8px] border-[#1a237e] flex items-center justify-center bg-white shadow-2xl">
                    <div className="w-32 h-32 rounded-full border-[4px] border-[#d32f2f] flex items-center justify-center relative overflow-hidden">
                      {/* Sun spokes illusion */}
                      {[...Array(24)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-0.5 h-full bg-[#1a237e]"
                          style={{ transform: `rotate(${i * 15}deg)` }}
                        />
                      ))}
                      <div className="w-12 h-12 bg-white rounded-full z-10 flex items-center justify-center">
                        <div className="w-8 h-8 bg-[#1a237e] rounded-full" />
                      </div>
                    </div>
                  </div>
                  <h1 className="text-3xl md:text-5xl font-black text-[#1a237e] tracking-tight">
                    NATIONAL SERVICE SCHEME
                  </h1>
                  <p className="text-[#d32f2f] font-bold tracking-widest uppercase">
                    NOT ME BUT YOU
                  </p>
                </motion.div>
              )}

              {stage === "bharat" && (
                <motion.div
                  key="bharat"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.2, filter: "blur(5px)" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="flex items-center justify-center w-32 h-32 mb-4">
                    {/* Abstract representation of MY BHARAT */}
                    <div className="relative w-full h-full flex items-center justify-center">
                      <div className="absolute w-full h-full rounded-full border-t-8 border-l-8 border-[#FF9933] rounded-bl-none rotate-45" />
                      <div className="absolute w-full h-full rounded-full border-b-8 border-r-8 border-[#138808] rounded-tr-none rotate-45" />
                      <div className="absolute w-8 h-8 rounded-full bg-[#000080]" />
                    </div>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] via-black to-[#138808] tracking-tight">
                    MERA YUVA BHARAT
                  </h1>
                  <p className="text-xl font-bold text-gray-800 tracking-wider">
                    Youth for the Nation
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
