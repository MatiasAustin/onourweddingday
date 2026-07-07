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

  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const section4Ref = useRef<HTMLDivElement>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    const scrollOffset = scroll.offset; // 0 to 1
    
    // INTRO ANIMATION LOGIC:
    // state.clock.elapsedTime tells us how many seconds have passed since mount.
    // If we are in the first 2 seconds, animate from Z = -50 to Z = 0
    // After that, blend into the scroll-based targetZ.
    const time = state.clock.elapsedTime;
    
    let targetZ = scrollOffset * 40;
    
    if (time < 3) {
      // Intro phase: start at -50, smoothly glide to 0
      // We'll use an easing function so it slows down as it reaches 0
      const progress = Math.min(time / 2.5, 1);
      // Easing function (easeOutExpo)
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      const introZ = THREE.MathUtils.lerp(-50, 0, ease);
      // If user starts scrolling during intro, add the scroll target
      targetZ = introZ + (scrollOffset * 40);
      
      // Fast damp during intro so it perfectly follows the ease curve
      groupRef.current.position.z = targetZ;
    } else {
      // Normal scroll behavior
      groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, targetZ, 4, delta);
    }
    
    // Dynamic Opacity based on world Z position
    // Camera is at Z=5. If an object's world Z > 4 (meaning it's passing the camera), it should fade out.
    // We can calculate world Z of each section:
    const currentZ = groupRef.current.position.z;
    
    const updateOpacity = (ref: React.RefObject<HTMLDivElement | null>, zPos: number) => {
      if (ref.current) {
        const worldZ = currentZ + zPos;
        // Fade in when worldZ > -20, full opaque between -15 and 2, fade out abruptly after 3
        let opacity = 0;
        if (worldZ > -25 && worldZ < 4) {
          opacity = THREE.MathUtils.mapLinear(worldZ, -25, -10, 0, 1);
          if (opacity > 1) opacity = 1;
        }
        if (worldZ >= 4) {
          opacity = THREE.MathUtils.mapLinear(worldZ, 4, 6, 1, 0);
          if (opacity < 0) opacity = 0;
        }
        ref.current.style.opacity = opacity.toString();
      }
    };

    updateOpacity(section2Ref, 0);
    updateOpacity(section3Ref, -20);
    updateOpacity(section4Ref, -40);
  });

  return (
    <group ref={groupRef}>
      {/* Lights */}
      <ambientLight intensity={0.8} color="#fff1f2" />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffe4e6" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#fecdd3" />
      
      {/* Floating Particles/Petals */}
      {Array.from({ length: 50 }).map((_, i) => (
        <mesh 
          key={i} 
          position={[
            (Math.random() - 0.5) * 30, 
            (Math.random() - 0.5) * 30, 
            -Math.random() * 80
          ]}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
        >
          <planeGeometry args={[0.3, 0.3]} />
          <meshStandardMaterial color="#881337" side={THREE.DoubleSide} opacity={0.4} transparent />
        </mesh>
      ))}

      {/* SECTION 2: Names (Z = 0) */}
      <group position={[0, -1, 0]}>
        <Html center transform distanceFactor={5}>
          <div ref={section2Ref} className="w-[800px] text-center bg-white/40 backdrop-blur-md p-16 rounded-[40px] border border-white/50 shadow-2xl transition-opacity duration-75">
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

      {/* SECTION 3: Date (Z = -20) */}
      <group position={[0, 0, -20]}>
        <Html center transform distanceFactor={5}>
          <div ref={section3Ref} className="w-[600px] text-center transition-opacity duration-75">
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
      
      {/* SECTION 4: Location & Gift (Z = -40) */}
      <group position={[0, 0, -40]}>
        <Html center transform distanceFactor={5}>
          <div ref={section4Ref} className="w-[800px] flex gap-8 transition-opacity duration-75">
            <div className="flex-1 bg-[#500000] text-white p-12 rounded-[40px] shadow-2xl">
              <h3 className="font-script text-5xl mb-6">Cerimônia</h3>
              <p className="font-serif leading-relaxed opacity-90 whitespace-pre-wrap">
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
