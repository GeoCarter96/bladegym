"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";

// Reuse your background logic for brand consistency
function SignupBackground({ isHovered }: { isHovered: boolean }) {
  const { scrollYProgress } = useScroll();
  const lineMove = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
      <motion.div 
        animate={{ opacity: isHovered ? 0.4 : 0.1, scale: isHovered ? 1.1 : 1 }}
        className="absolute inset-0 transition-all duration-700" 
        style={{ backgroundImage: `radial-gradient(circle, #ef4444 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
      />
      <motion.div style={{ y: lineMove }} className="absolute inset-0 opacity-20">
        <div className="absolute top-[-20%] left-[-10%] w-[140%] h-[1px] bg-red-600 rotate-[15deg]" />
      </motion.div>
    </div>
  );
}

export default function SignupPage() {
  const [isFormHovered, setIsFormHovered] = useState(false);
  const [tier, setTier] = useState("standard");
  const containerRef = useRef(null);

  // Parallax for the heading
  const { scrollYProgress } = useScroll({ target: containerRef });
  const textSkew = useTransform(scrollYProgress, [0, 1], [-12, 0]);

  return (
    <main ref={containerRef} className="bg-black text-white min-h-screen relative font-sans overflow-x-hidden selection:bg-red-600">
      <SignupBackground isHovered={isFormHovered} />

      {/* Back Button */}
      <Link href="/" className="fixed top-8 left-8 z-[100] group">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-2 skew-x-[-15deg] group-hover:bg-red-600 transition-all duration-300">
          <div className="skew-x-[15deg] text-xs font-black uppercase tracking-widest">← </div>
        </div>
      </Link>

      <section className="relative z-10 pt-32 pb-20 px-6 flex flex-col items-center">
        <motion.div style={{ skewX: textSkew }} className="text-center mb-16">
          <h1 className="text-[12vw] md:text-[8vw] font-black uppercase italic leading-none tracking-tighter">
            Join the <span className="text-red-600">Elite</span>
          </h1>
          <p className="text-zinc-500 uppercase tracking-[1em] text-[10px] mt-4">Forging the hammer since 2015</p>
        </motion.div>

        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* LEFT: FORM LOGIC */}
          <motion.div 
            onMouseEnter={() => setIsFormHovered(true)}
            onMouseLeave={() => setIsFormHovered(false)}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-zinc-900/50 backdrop-blur-2xl border border-white/5 p-8 md:p-12 rounded-2xl relative"
          >
            <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-zinc-700">REGISTRATION_01.EXE</div>
            
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black tracking-widest text-zinc-500">First Name</label>
                  <input type="text" className="w-full bg-black border border-white/10 p-4 focus:border-red-600 outline-none transition-colors skew-x-[-5deg]" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black tracking-widest text-zinc-500">Last Name</label>
                  <input type="text" className="w-full bg-black border border-white/10 p-4 focus:border-red-600 outline-none transition-colors skew-x-[-5deg]" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-zinc-500">Email Address</label>
                <input type="email" placeholder="warrior@bladegym.com" className="w-full bg-black border border-white/10 p-4 focus:border-red-600 outline-none transition-colors" />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] uppercase font-black tracking-widest text-zinc-500">Select Intensity</label>
                <div className="grid grid-cols-3  gap-2">
                  {['standard', 'elite', 'pro'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTier(t)}
                      className={`py-3 text-[10px] cursor-pointer font-black uppercase tracking-widest border transition-all ${tier === t ? 'bg-red-600 border-red-600 text-white' : 'bg-black border-white/10 text-zinc-500 hover:border-white/30'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <button className="w-full cursor-none bg-white text-black py-5 font-black uppercase tracking-[0.2em] skew-x-[-10deg] hover:bg-red-600 hover:text-white transition-all duration-500 mt-8">
                <span className="inline-block skew-x-[10deg]">Finalize Contract</span>
              </button>
            </form>
          </motion.div>

          {/* RIGHT: PARALLAX STATUS (TeamMember Logic Adaption) */}
          <div className="hidden lg:block sticky top-32 space-y-8">
            <div className="bg-zinc-950 p-12 border-l-4 border-red-600 relative overflow-hidden">
               <motion.div 
                animate={{ rotate: [0, 5, 0] }} 
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -right-20 -top-20 text-[200px] font-black text-white/[0.02] italic pointer-events-none"
              >
                BLADE
              </motion.div>
              
              <h3 className="text-4xl font-black uppercase italic mb-6">Manifesto <br/>Acknowledgment</h3>
              <ul className="space-y-4 text-sm text-zinc-400 font-medium">
                <li className="flex gap-4"><span className="text-red-600 font-bold">01</span> I accept that friction creates heat.</li>
                <li className="flex gap-4"><span className="text-red-600 font-bold">02</span> I will not settle for maintenance.</li>
                <li className="flex gap-4"><span className="text-red-600 font-bold">03</span> I am either the hammer or the anvil.</li>
              </ul>
              
              <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Monthly Commitment</p>
                  <p className="text-3xl font-black italic">{tier === 'pro' ? '$199' : tier === 'elite' ? '$129' : '$89'}</p>
                </div>
                <div className="h-12 w-12 rounded-full border-2 border-red-600 flex items-center justify-center animate-pulse">
                   <div className="h-2 w-2 bg-red-600 rounded-full" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
