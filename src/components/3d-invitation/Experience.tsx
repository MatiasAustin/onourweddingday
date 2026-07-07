"use client";

import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { Suspense, useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface ExperienceProps {
  data: any;
}

function CinematicScene({ data }: { data: any }) {
  const groupRef = useRef<THREE.Group>(null);
  const section2Ref = useRef<HTMLDivElement>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Intro phase: start at -40, smoothly glide to -15
    const time = state.clock.elapsedTime;
    const progress = Math.min(time / 2.5, 1);
    // Easing function (easeOutExpo)
    const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    
    // Stop at -15 so the text doesn't become overwhelmingly huge
    const introZ = THREE.MathUtils.lerp(-40, -15, ease);
    groupRef.current.position.z = introZ;
    
    // Fade in text
    if (section2Ref.current) {
      section2Ref.current.style.opacity = ease.toString();
    }
  });

  return (
    <group ref={groupRef}>
      {/* Lights */}
      <ambientLight intensity={0.8} color="#fff1f2" />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffe4e6" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#fecdd3" />
      
      {/* Floating Particles/Petals */}
      {Array.from({ length: 40 }).map((_, i) => (
        <mesh 
          key={i} 
          position={[
            (Math.random() - 0.5) * 30, 
            (Math.random() - 0.5) * 30, 
            (Math.random() - 0.5) * 20
          ]}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
        >
          <planeGeometry args={[0.3, 0.3]} />
          <meshStandardMaterial color="#881337" side={THREE.DoubleSide} opacity={0.4} transparent />
        </mesh>
      ))}

      {/* SECTION: Names (Z = 0) */}
      <group position={[0, 0, 0]}>
        <Html center transform distanceFactor={25}>
          <div ref={section2Ref} className="w-[800px] text-center bg-white/40 backdrop-blur-md p-16 rounded-[40px] border border-white/50 shadow-2xl opacity-0">
            <h2 className="font-script text-7xl text-[#500000]">
              {data.brideName || "Liliane"}
            </h2>
            <p className="font-serif text-3xl italic text-[#500000]/60 my-4">e</p>
            <h2 className="font-script text-7xl text-[#500000]">
              {data.groomName || "Fernando"}
            </h2>
            <p className="mt-8 font-serif tracking-widest text-[#500000]/80 uppercase text-sm">
              Convidam para cerimônia de seu casamento
            </p>
          </div>
        </Html>
      </group>
    </group>
  );
}

interface ExperienceProps {
  data: any;
  children?: React.ReactNode;
}

export default function Experience({ data, children }: ExperienceProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full min-h-screen font-sans bg-transparent">
      
      {/* 3D Hero Background */}
      <div className="fixed inset-0 w-full h-full -z-10 bg-[#fff1f2]">
        {mounted && (
          <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            gl={{ antialias: true, alpha: false }}
          >
            <color attach="background" args={["#fff1f2"]} />
            <Suspense fallback={<Html center><div className="font-serif text-[#500000]">Memuat...</div></Html>}>
              <CinematicScene data={data} />
            </Suspense>
          </Canvas>
        )}
      </div>

      {/* Transparent Spacer to show 3D Canvas */}
      <div className="w-full h-screen pointer-events-none"></div>

      {/* Regular HTML Content Below */}
      <div className="relative z-10 bg-[#fff1f2] min-h-screen flex flex-col border-t border-[#C8A24C]/20 shadow-[0_-10px_40px_rgba(139,30,36,0.1)]">
        
        {/* Scroll Indicator */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce opacity-70">
          <span className="text-[#500000] text-sm font-medium mb-2 tracking-widest uppercase">Scroll</span>
          <div className="w-5 h-8 border-2 border-[#500000] rounded-full flex justify-center p-1">
             <div className="w-1 h-2 bg-[#500000] rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Date Section */}
        <div className="max-w-4xl w-full mx-auto text-center mb-32">
          <div className="font-serif text-9xl text-[#500000] drop-shadow-sm">
            {data.weddingDate ? new Date(data.weddingDate).getDate() : "15"}
          </div>
          <div className="font-script text-6xl text-[#500000]/80 -mt-6 mb-4">
            {data.weddingDate ? new Date(data.weddingDate).toLocaleString('pt-BR', { month: 'long' }) : "Junho"}
          </div>
          <div className="font-serif tracking-widest text-[#500000] text-2xl uppercase">
            {data.weddingDate ? new Date(data.weddingDate).getFullYear() : "2024"}
          </div>
        </div>

        {/* Location & Gift Section */}
        <div className="max-w-4xl w-full mx-auto flex flex-col md:flex-row gap-8 mb-16">
          <div className="flex-1 bg-[#500000] text-white p-12 rounded-[40px] shadow-2xl transition-transform hover:-translate-y-2 duration-500">
            <h3 className="font-script text-5xl mb-6">Cerimônia</h3>
            <p className="font-serif leading-relaxed opacity-90 whitespace-pre-wrap text-lg">
              {data.ceremonyLocation || "Paróquia Cristo Profeta\nR. Antônio José de Oliveira, 467\nBarra Funda, Apucarana - PR"}
            </p>
          </div>
          
          <div className="flex-1 bg-white/80 backdrop-blur-md p-12 rounded-[40px] shadow-2xl border border-white transition-transform hover:-translate-y-2 duration-500">
            <h3 className="font-script text-5xl text-[#500000] mb-6">Presentes</h3>
            <p className="font-serif text-lg leading-relaxed text-[#500000]/80 mb-6">
              Caso queira nos presentear, sugerimos contribuir através do PIX:
            </p>
            <div className="font-mono text-xl text-center bg-[#fff1f2] p-4 rounded-xl text-[#500000] border border-[#500000]/20 select-all">
              {data.pixKey || "41 998798618"}
            </div>
          </div>
        </div>

        {/* CMS Sections go here */}
        {children}

      </div>
    </div>
  );
}
