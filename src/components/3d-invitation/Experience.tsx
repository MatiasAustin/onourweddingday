"use client";

import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll, useScroll, Html } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface ExperienceProps {
  data: any;
}

function CinematicScene({ data }: { data: any }) {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // Smooth cinematic camera movement along Z axis based on scroll progress
    const scrollOffset = scroll.offset; // 0 to 1
    
    // Move the entire scene towards the camera to simulate flying through
    // Start at z=0, move to z = 40
    const targetZ = scrollOffset * 40;
    groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, targetZ, 4, delta);
  });

  return (
    <group ref={groupRef}>
      {/* Lights */}
      <ambientLight intensity={0.8} color="#fff1f2" />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffe4e6" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#fecdd3" />
      
      {/* Floating Particles/Petals (Mockup) */}
      {Array.from({ length: 30 }).map((_, i) => (
        <mesh 
          key={i} 
          position={[
            (Math.random() - 0.5) * 20, 
            (Math.random() - 0.5) * 20, 
            -Math.random() * 40
          ]}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
        >
          <planeGeometry args={[0.2, 0.2]} />
          <meshStandardMaterial color="#881337" side={THREE.DoubleSide} opacity={0.6} transparent />
        </mesh>
      ))}

      {/* SECTION 1: Cover (Z = -2) */}
      <group position={[0, 0, -2]}>
        <Html center transform distanceFactor={10}>
          <div className="w-[800px] text-center pointer-events-none select-none">
            <h3 className="text-xl tracking-[0.3em] text-foreground/70 uppercase mb-4">Convite</h3>
            <h1 className="font-script text-8xl md:text-9xl text-[#500000] drop-shadow-lg">
              Digital Elegance
            </h1>
          </div>
        </Html>
      </group>

      {/* SECTION 2: Names (Z = -12) */}
      <group position={[0, -1, -12]}>
        <Html center transform distanceFactor={10}>
          <div className="w-[800px] text-center bg-white/40 backdrop-blur-md p-16 rounded-[40px] border border-white/50 shadow-2xl">
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

      {/* SECTION 3: Date (Z = -22) */}
      <group position={[0, 0, -22]}>
        <Html center transform distanceFactor={10}>
          <div className="w-[600px] text-center">
            <div className="font-serif text-9xl text-[#500000]">
              {data.weddingDate ? new Date(data.weddingDate).getDate() : "15"}
            </div>
            <div className="font-script text-6xl text-[#500000]/80 -mt-6 mb-4">
              {data.weddingDate ? new Date(data.weddingDate).toLocaleString('pt-BR', { month: 'long' }) : "Junho"}
            </div>
            <div className="font-serif tracking-widest text-[#500000] text-2xl uppercase">
              {data.weddingDate ? new Date(data.weddingDate).getFullYear() : "2024"}
            </div>
          </div>
        </Html>
      </group>
      
      {/* SECTION 4: Location & Gift (Z = -32) */}
      <group position={[0, 0, -32]}>
        <Html center transform distanceFactor={10}>
          <div className="w-[800px] flex gap-8">
            <div className="flex-1 bg-[#500000] text-white p-12 rounded-[40px] shadow-2xl">
              <h3 className="font-script text-5xl mb-6">Cerimônia</h3>
              <p className="font-serif leading-relaxed opacity-90">
                {data.ceremonyLocation || "Paróquia Cristo Profeta\nR. Antônio José de Oliveira, 467\nBarra Funda, Apucarana - PR"}
              </p>
            </div>
            <div className="flex-1 bg-white/80 backdrop-blur-md p-12 rounded-[40px] shadow-2xl border border-white">
              <h3 className="font-script text-5xl text-[#500000] mb-6">Presentes</h3>
              <p className="font-serif text-sm leading-relaxed text-[#500000]/80 mb-6">
                Caso queira nos presentear, sugerimos contribuir através do PIX:
              </p>
              <div className="font-mono text-lg text-center bg-gray-100 p-4 rounded-xl text-gray-800">
                {data.pixKey || "41 998798618"}
              </div>
            </div>
          </div>
        </Html>
      </group>

    </group>
  );
}

export default function Experience({ data }: { data: any }) {
  return (
    <div className="w-full h-screen bg-[#fff1f2] overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={["#fff1f2"]} />
        <Suspense fallback={<Html center><div className="font-serif text-[#500000]">Loading Experience...</div></Html>}>
          <ScrollControls pages={6} damping={0.15}>
            <CinematicScene data={data} />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
