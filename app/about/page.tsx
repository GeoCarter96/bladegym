"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
// --- 1. SHARED DESIGN COMPONENTS ---
function AboutBackground({ isHovered }: { isHovered: boolean }) {
  const { scrollYProgress } = useScroll();
  const lineMove = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
      <motion.div 
        animate={{ opacity: isHovered ? 0.4 : 0.1, scale: isHovered ? 1.05 : 1 }}
        className="absolute inset-0" 
        style={{ backgroundImage: `radial-gradient(circle, #ef4444 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
      />
      <motion.div style={{ y: lineMove }} className="absolute inset-0 opacity-20">
        <div className="absolute top-[-10%] right-[-5%] w-[120%] h-[2px] bg-red-600 -rotate-[25deg]" />
      </motion.div>
    </div>
  );
}

function TeamMember({ name, role, id, imageUrl }: { name: string, role: string, id: number, imageUrl: string }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
  
  const x = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]); // Image parallax

  return (
    <div ref={cardRef} className="relative group overflow-hidden bg-zinc-900 aspect-[3/4] rounded-2xl border border-white/5">
      {/* 1. THE IMAGE (Actually using the imageUrl prop now) */}
      <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%]">
        <img 
          src={imageUrl} 
          alt={name}
          className="w-full h-full object-cover opacity-60 grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-100"
        />
      </motion.div>

      {/* 2. THE OVERLAY (Keeps text readable) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-8 flex flex-col justify-end">
        <span className="text-red-600 font-mono text-sm mb-2 z-10">PRO_TRAINER_{id}</span>
        <motion.h4 style={{ x }} className="text-3xl font-black uppercase italic text-white leading-none z-10">
          {name}
        </motion.h4>
        <p className="text-zinc-500 uppercase tracking-widest text-xs mt-2 z-10">{role}</p>
      </div>
    </div>
  );
}


// --- 3. MAIN ABOUT PAGE ---
export default function AboutPage() {
  const [isCtaHovered, setIsCtaHovered] = useState(false);
  const heroRef = useRef(null);
  
  const { scrollYProgress: scrollY } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  
  const heroScale = useTransform(scrollY, [0, 1], [1, 1.2]);
  const heroOpacity = useTransform(scrollY, [0, 0.8], [1, 0]);
  const textX = useTransform(scrollY, [0, 1], [0, 200]);

  return (
    <main className="bg-black text-white relative font-sans overflow-x-hidden">
      <AboutBackground isHovered={isCtaHovered} />

  <Link href="/" className="fixed top-8 left-8 z-[100] group">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2 skew-x-[-15deg] group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-300">
          <div className="skew-x-[15deg] flex items-center gap-2">
             <span className="text-xs font-black uppercase tracking-widest text-white group-hover:text-black transition-colors">
               ← 
             </span>
          </div>
        </div>
      </Link>
      {/* STICKY HERO SECTION */}
      <section ref={heroRef} className="relative h-[120vh] flex items-center justify-center">
        <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img 
            src="/gym.png" 
            className="w-full h-full object-cover" 
            alt="Gym"
          />
        </motion.div>

        <div className="relative z-20 text-center">
          <motion.h1 style={{ x: textX }} className="text-[10vw] font-black uppercase italic tracking-tighter leading-none">
            Our <span className="text-red-600 underline decoration-white/10">Legacy</span>
          </motion.h1>
          <p className="text-zinc-400 tracking-[1.5em] uppercase text-sm mt-8">Sharpening since 2015</p>
        </div>
      </section>

      {/* MANIFESTO SECTION (Scroll-Triggered Text) */}
      <section className="relative z-10 py-40 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-red-600 font-black uppercase tracking-widest text-sm mb-12 flex items-center gap-4">
            <span className="h-[1px] w-12 bg-red-600" /> The Blade Philosophy
          </h2>
          <p className="text-4xl md:text-6xl font-bold leading-tight uppercase italic">
            We don't believe in maintenance. We believe in <span className="text-zinc-600">friction</span>. Friction creates heat. Heat creates <span className="text-red-600">change</span>.
          </p>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 text-zinc-400 text-lg">
            <p>Every piece of equipment in Blade Gym is selected for maximum mechanical advantage. We cut out the fluff and focus on raw, elite performance.</p>
            <p>Our community is a collective of athletes who refuse to settle. At Blade, you are either the hammer or the anvil. We choose hammer.</p>
          </div>
        </div>
      </section>


<section className="relative z-10 py-32 px-6 bg-zinc-950">
  <div className="max-w-7xl mx-auto">
    <h3 className="text-6xl font-black uppercase italic mb-16">
      The <span className="text-red-600">Cutters</span>
    </h3>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <TeamMember 
        id={1} 
        name="Marcus Vane" 
        role="Head of Strength" 
        imageUrl="/trainer1.png" 
      />
      
      <TeamMember 
        id={2} 
        name="Sarah Blade" 
        role="Conditioning Lead" 
        imageUrl="/trainer2.png"
      />
      
      <TeamMember 
        id={3} 
        name="Jaxson Reed" 
        role="Recovery Specialist" 
        imageUrl="/trainer3.png" 
      />
    </div>
  </div>
</section>



      {/* CTA SECTION */}
      <section className="relative py-60 flex flex-col items-center justify-center text-center">
        <h2 className="text-5xl md:text-8xl font-black uppercase italic mb-12">
          Ready to be <br /> <span className="text-red-600">Transformed?</span>
        </h2>
       <Link href="/signup">
  <button 
    onMouseEnter={() => setIsCtaHovered(true)}
    onMouseLeave={() => setIsCtaHovered(false)}
    className="group cursor-pointer relative bg-white text-black px-12 py-5 font-black uppercase tracking-widest skew-x-[-12deg] transition-all hover:bg-red-600 hover:text-white"
  >
    <span className="inline-block skew-x-[12deg]">Start Your Journey</span>
  </button>
</Link>

      </section>
    </main>
  );
}
