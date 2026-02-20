"use client";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionValueEvent } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
const amenities = [
  { id: 1, title: "Forge Weight Room", color: "bg-zinc-900" },
  { id: 2, title: "The Sharp Edge Cardio", color: "bg-zinc-800" },
  { id: 3, title: "Blade Recovery Lab", color: "bg-zinc-900" },
  { id: 4, title: "Combat Turf Zone", color: "bg-zinc-800" },
];

// --- 1. AMENITY CARD COMPONENT ---
function AmenityCard({ item }: { item: any }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
  
  const textX = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const bgX = useTransform(scrollYProgress, [0, 1], [-150, 150]);

  return (
    <div ref={cardRef} className="amenity-card relative h-[500px] w-[400px] md:w-[600px] shrink-0 rounded-3xl border border-white/5 overflow-hidden bg-zinc-900">
      <motion.div style={{ x: bgX }} className="absolute inset-0 flex items-center justify-center opacity-[0.03] font-black text-[15rem] italic select-none pointer-events-none text-white">
        BLADE
      </motion.div>
      <div className="absolute inset-0 flex flex-col justify-end p-12 bg-gradient-to-t from-black via-transparent to-transparent">
        <span className="text-red-600 font-bold tracking-[0.3em] mb-4">0{item.id}</span>
        <motion.h3 style={{ x: textX }} className="text-5xl md:text-7xl font-black uppercase leading-tight italic text-white">
          {item.title.split(" ").map((word: string, i: number) => (
            <span key={i} className={i === 0 ? "text-white" : "text-red-600"}>{(word)}{" "}</span>
          ))}
        </motion.h3>
        <div className="mt-6 h-1 w-24 bg-red-600" />
      </div>
    </div>
  );
}

// --- 2. PULSING BACKGROUND COMPONENT ---
function BackgroundDesign({ isJoinHovered }: { isJoinHovered: boolean }) {
  const { scrollYProgress } = useScroll();
  const lineMove = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Pulsing Grid Pattern - Speed increases on hover */}
      <motion.div 
        animate={{ 
          opacity: isJoinHovered ? [0.3, 0.7, 0.3] : [0.05, 0.15, 0.05],
          scale: isJoinHovered ? [1, 1.02, 1] : 1
        }}
        transition={{ 
          duration: isJoinHovered ? 0.6 : 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute inset-0" 
        style={{ 
          backgroundImage: `radial-gradient(circle, #ef4444 1px, transparent 1px)`, 
          backgroundSize: '40px 40px' 
        }} 
      />
      
      {/* Parallax Blade Lines */}
      <motion.div style={{ y: lineMove }} className="absolute inset-0 opacity-10">
        <div className="absolute top-[-20%] left-[-10%] w-[140%] h-[1px] bg-red-600 rotate-[35deg]" />
        <div className="absolute top-[80%] left-[-10%] w-[140%] h-[1px] bg-red-600 rotate-[35deg]" />
      </motion.div>
    </div>
  );
}

// --- 3. MAIN LANDING PAGE ---
export default function BladeLandingPage() {
  const [isJoinHovered, setIsJoinHovered] = useState(false);
  const containerRef = useRef(null);
  const parallaxRef = useRef(null);
  
  const { scrollYProgress: heroScroll } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const { scrollYProgress: amenScroll } = useScroll({ target: parallaxRef });

  const scale = useTransform(heroScroll, [0, 1], [1, 0.85]);
  const opacity = useTransform(heroScroll, [0, 0.6], [1, 0]);
  const x = useTransform(amenScroll, [0, 1], ["0%", "-70%"]);

  return (
    <main className="bg-black text-white relative">
      <BackgroundDesign isJoinHovered={isJoinHovered} />

      {/* Navbar with Hover State Bridge */}
      <nav className="fixed top-0 w-full z-50 px-10 py-6 flex justify-between items-center bg-black/40 backdrop-blur-md border-b border-white/5">
  <div className="text-xl font-black uppercase italic tracking-tighter">
    Blade <span className="text-red-600">Gym</span>
  </div>
  
  <div className="flex items-center gap-8">
    {/* About Us Link with animated underline */}
    <a 
      href="/about" 
      className="group relative text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
    >
      About Us
      <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-red-600 transition-all duration-300 group-hover:w-full" />
    </a>

    {/* Join Now Button */}
    <Link href="/signup">
  <button 
    onMouseEnter={() => setIsJoinHovered(true)}
    onMouseLeave={() => setIsJoinHovered(false)}
    className="bg-red-600 cursor-pointer px-6 py-2 font-bold uppercase text-xs skew-x-[-10deg] hover:bg-white hover:text-red-600 transition-all duration-300"
  >
    <span className="inline-block skew-x-[10deg]">Join Now</span>
  </button>
</Link>

  </div>
</nav>


      {/* HERO SECTION */}
      <div ref={containerRef} className="relative h-[150vh]">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
          <motion.div style={{ scale, opacity }} className="text-center z-10 px-4">
            <h1 className="text-[14vw] font-black leading-none uppercase tracking-tighter italic drop-shadow-2xl">
              Blade <span className="text-red-600">Gym</span>
            </h1>
            <p className="text-zinc-500 uppercase tracking-[1em] mt-4 text-xs md:text-base">Sharpen Your Edge</p>
          </motion.div>
        </div>
      </div>

      <section className="relative z-10 bg-zinc-950 border-y border-white/5 py-32">
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-5xl md:text-7xl font-black uppercase mb-16 italic"> The Cut List</h2>
    
    <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
      
      {/* CARD 1: HIGH PERFORMANCE TURF */}
      <div className="group relative aspect-video bg-zinc-900 rounded-3xl border border-white/10 overflow-hidden transition-all hover:border-red-600/50">
        {/* 1. IMAGE: Always visible, scales on hover */}
        <img 
          src="/turf.jpg" 
          alt="Turf" 
          className="absolute inset-0 w-full h-full object-cover opacity-50 transition-all duration-700 group-hover:scale-110 group-hover:opacity-80" 
        />
        
        {/* 2. OVERLAY: Static red tint that deepens on hover */}
        <div className="absolute inset-0 bg-red-600/10 transition-colors duration-500 group-hover:bg-red-600/25 backdrop-blur-[1px]" />
        
        {/* 3. TEXT: Always centered and visible */}
        <div className="relative z-10 flex items-center justify-center h-full w-full font-black uppercase italic tracking-widest text-white text-2xl md:text-3xl drop-shadow-2xl">
          High Performance Turf
        </div>
      </div>

      {/* CARD 2: BLADE RECOVERY SUITE */}
      <div className="group relative aspect-video bg-zinc-900 rounded-3xl border border-white/10 overflow-hidden transition-all hover:border-red-600/50">
        {/* 1. IMAGE: Always visible */}
        <img 
          src="/recovery.png" 
          alt="Recovery Suite" 
          className="absolute inset-0 w-full h-full object-cover opacity-50 transition-all duration-700 group-hover:scale-110 group-hover:opacity-80" 
        />

        {/* 2. OVERLAY: Static red tint */}
        <div className="absolute inset-0 bg-red-600/10 transition-colors duration-500 group-hover:bg-red-600/25 backdrop-blur-[1px]" />

        {/* 3. TEXT: Always visible */}
        <div className="relative z-10 flex items-center justify-center h-full w-full font-black uppercase italic tracking-widest text-white text-2xl md:text-3xl drop-shadow-2xl">
          Blade Recovery Suite
        </div>
      </div>

    </div>
  </div>
</section>

      {/* HORIZONTAL PARALLAX GALLERY */}
      <section ref={parallaxRef} className="relative h-[300vh] bg-black">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-12 px-[10vw]">
            {amenities.map((item) => (
              <AmenityCard key={item.id} item={item} />
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
