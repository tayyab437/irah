import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "motion/react";
import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { 
  Heart, Music, Play, Pause, ChevronDown, MessageCircle, 
  Star, Sparkles, Send, ShieldCheck, Eye, BookOpen, 
  Compass, Lock, Unlock, Moon, Sun, Cloud, Wind
} from "lucide-react";
import confetti from "canvas-confetti";

// --- Custom Components for new features ---

const EchoName = () => {
  const [echoes, setEchoes] = useState<{ id: number; x: number; y: number }[]>([]);

  const addEcho = useCallback((e: MouseEvent) => {
    const newEcho = { id: Date.now(), x: e.clientX, y: e.clientY };
    setEchoes((prev) => [...prev, newEcho]);
    setTimeout(() => {
      setEchoes((prev) => prev.filter((item) => item.id !== newEcho.id));
    }, 2000);
  }, []);

  useEffect(() => {
    window.addEventListener("mousedown", addEcho);
    return () => window.removeEventListener("mousedown", addEcho);
  }, [addEcho]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      <AnimatePresence>
        {echoes.map((echo) => (
          <motion.div
            key={echo.id}
            initial={{ opacity: 0.8, scale: 0.5 }}
            animate={{ opacity: 0, scale: 2.5 }}
            exit={{ opacity: 0 }}
            className="absolute font-serif text-white/20 pointer-events-none select-none text-2xl"
            style={{ left: echo.x, top: echo.y }}
          >
            Irah
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const ConstellationOfValues = () => {
  const values = [
    { name: "Resilience", text: "Even in challenging times, your strength remains steady." },
    { name: "Integrity", text: "You stay true to your principles without compromise." },
    { name: "Clarity", text: "Your perspective brings order to the complex." },
    { name: "Wisdom", text: "You possess a depth of understanding that is rare." },
    { name: "Grace", text: "In every situation, you carry yourself with dignity." },
    { name: "Courage", text: "Your bravery to be yourself is truly inspiring." },
  ];

  const [activeValue, setActiveValue] = useState<number | null>(null);

  return (
    <section className="relative py-48 px-6 z-10 overflow-hidden min-h-[80vh] flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full">
        <div className="small-label mb-12 text-center">Constellation of Values</div>
        <div className="relative h-[400px] w-full border border-white/5 rounded-full flex items-center justify-center">
            {/* Background stars */}
            {Array.from({ length: 50 }).map((_, i) => (
              <div 
                key={i} 
                className="star breathing-glow" 
                style={{ 
                  left: `${Math.random() * 100}%`, 
                  top: `${Math.random() * 100}%`, 
                  width: `${Math.random() * 2 + 1}px`, 
                  height: `${Math.random() * 2 + 1}px`,
                  animationDelay: `${Math.random() * 5}s`
                } as any} 
              />
            ))}

            {/* Value Stars */}
            {values.map((v, i) => {
              const angle = (i / values.length) * Math.PI * 2;
              const x = Math.cos(angle) * 150;
              const y = Math.sin(angle) * 150;
              
              return (
                <motion.div
                  key={i}
                  className="absolute cursor-pointer group"
                  style={{ x, y }}
                  onMouseEnter={() => setActiveValue(i)}
                  onMouseLeave={() => setActiveValue(null)}
                >
                  <div className="relative pointer-events-none">
                    <Star 
                      size={activeValue === i ? 32 : 16} 
                      className={`text-accent-pink transition-all duration-500 ${activeValue === i ? 'fill-accent-pink drop-shadow-[0_0_15px_rgba(255,183,197,1)]' : 'opacity-40'}`}
                    />
                    <motion.span 
                       animate={{ opacity: activeValue === i ? 1 : 0 }}
                       className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs tracking-widest uppercase text-accent-pink font-semibold"
                    >
                      {v.name}
                    </motion.span>
                  </div>
                </motion.div>
              );
            })}

            <div className="text-center max-w-sm px-6">
                <AnimatePresence mode="wait">
                  {activeValue !== null ? (
                    <motion.p
                      key={activeValue}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-text-dim italic text-lg leading-relaxed"
                    >
                      {values[activeValue].text}
                    </motion.p>
                  ) : (
                    <motion.p 
                      key="default"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-text-dim/40 italic"
                    >
                      Hover over the points of light to reveal the character I admire.
                    </motion.p>
                  )}
                </AnimatePresence>
            </div>
        </div>
      </div>
    </section>
  );
};

const DigitalKeepsake = ({ onReveal }: { onReveal: () => void }) => {
    const [isUnlocked, setIsUnlocked] = useState(false);

    const handleUnlock = () => {
        setIsUnlocked(true);
        setTimeout(onReveal, 1000);
    };

    return (
        <section className="relative py-48 px-6 z-10 flex flex-col items-center justify-center">
            <div className="max-w-md w-full glass p-12 rounded-[24px] text-center space-y-12">
                <div className="small-label">A Private Archive</div>
                <div className="relative py-12 flex justify-center">
                    <AnimatePresence mode="wait">
                        {!isUnlocked ? (
                            <motion.button
                                key="locked"
                                initial={{ opacity: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onClick={handleUnlock}
                                className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center group hover:border-accent-pink transition-colors relative"
                            >
                                <Lock className="text-white/40 group-hover:text-accent-pink transition-colors" size={32} />
                                <div className="absolute inset-0 rounded-full border border-accent-pink animate-ping opacity-20"></div>
                            </motion.button>
                        ) : (
                            <motion.div
                                key="unlocked"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-accent-pink"
                            >
                                <Unlock size={48} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <p className="text-text-dim italic">A final recognition of what is true.</p>
            </div>
        </section>
    );
};

// Background Particles
const FloatingHeart = ({ id }: { id: number, key?: any }) => {
    const size = useMemo(() => Math.random() * 20 + 10, []);
    const left = useMemo(() => Math.random() * 100, []);
    const duration = useMemo(() => Math.random() * 10 + 10, []);
    const delay = useMemo(() => Math.random() * 5, []);
  
    return (
      <motion.div
        initial={{ y: "110%", opacity: 0, scale: 0 }}
        animate={{
          y: "-10%",
          opacity: [0, 0.4, 0.4, 0],
          scale: [0.5, 1, 1, 0.5],
          x: [0, (Math.random() - 0.5) * 50, 0],
        }}
        transition={{
          duration,
          repeat: Infinity,
          delay,
          ease: "easeInOut",
        }}
        className="absolute pointer-events-none text-accent-pink/10"
        style={{ left: `${left}%`, width: size, height: size }}
      >
        <Heart fill="currentColor" size={size} />
      </motion.div>
    );
  };

// --- Main App Component ---

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [accepted, setAccepted] = useState(false);
  const [noButtonStyle, setNoButtonStyle] = useState<React.CSSProperties>({});
  const [noButtonCount, setNoButtonCount] = useState(0);
  const [keepsakeRevealed, setKeepsakeRevealed] = useState(false);

  // Time of Day Logic
  const currentHour = new Date().getHours();
  const theme = useMemo(() => {
    if (currentHour >= 22 || currentHour < 5) return { bg: "#050510", accent: "#A5B4FC", icon: <Moon /> };
    if (currentHour >= 5 && currentHour < 12) return { bg: "#100505", accent: "#FCA5A5", icon: <Sun /> };
    if (currentHour >= 12 && currentHour < 18) return { bg: "#0D0B14", accent: "#FFB7C5", icon: <Sun /> };
    return { bg: "#100A1A", accent: "#D8B4FE", icon: <Wind /> };
  }, [currentHour]);

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  // Parallax Values
  const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const parallaxX1 = useTransform(springScroll, [0, 1], [0, 200]);
  const parallaxX2 = useTransform(springScroll, [0, 1], [0, -200]);

  const hearts = useMemo(() => Array.from({ length: 25 }, (_, i) => i), []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleForgive = () => {
    setAccepted(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffb6c1', '#ffffff', theme.accent]
    });
  };

  const moveNoButton = () => {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    setNoButtonStyle({ transform: `translate(${x}px, ${y}px)` });
    setNoButtonCount(prev => prev + 1);
  };

  const noButtonTexts = [
    "Are you sure?",
    "Really?",
    "Think again...",
    "Pretty please?",
    "Irah, don't...",
    "You're breaking my heart 💔",
    "One more chance?",
    "Don't do this to me!"
  ];

  return (
    <div 
      className="relative min-h-screen transition-colors duration-2000 font-serif selection:bg-accent-pink/30"
      style={{ backgroundColor: theme.bg, '--accent-pink': theme.accent } as any}
    >
      <EchoName />

      {/* Breathing UI Global Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 breathing-glow bg-accent-pink/[0.02]" />

      {/* Background Music */}
      <audio 
        ref={audioRef}
        loop
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
      />

      {/* Background Decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-10">
        <div className="absolute inset-0 atmosphere opacity-40"></div>
        {hearts.map((h) => (
          <FloatingHeart key={h} id={h} />
        ))}
      </div>

      {/* Parallax Narrative Elements */}
      <motion.div style={{ x: parallaxX1 }} className="fixed top-80 -left-20 z-0 font-serif text-[18vh] text-white/[0.02] whitespace-nowrap pointer-events-none uppercase tracking-[1em]">
        Integrity Integrity Integrity
      </motion.div>
      <motion.div style={{ x: parallaxX2 }} className="fixed bottom-40 -right-20 z-0 font-serif text-[15vh] text-white/[0.01] whitespace-nowrap pointer-events-none uppercase tracking-[1em]">
        Wisdom Wisdom Wisdom Wisdom
      </motion.div>

      {/* Floating Music Player: Bottom Left */}
      <div className="fixed bottom-8 left-8 z-50 flex items-center gap-4 glass px-5 py-3 rounded-full shadow-2xl shadow-black/50">
        <button 
          onClick={toggleMusic}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-accent-pink text-bg-dark hover:scale-110 active:scale-95 transition-all"
        >
          {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
        </button>
        <div className="hidden sm:flex flex-col gap-0.5">
           <div className="flex items-center gap-2">
                <span className="text-[10px] font-sans uppercase tracking-widest text-accent-pink font-semibold">Ambient Message</span>
                <span className="text-white/20">{theme.icon}</span>
           </div>
           <div className="flex items-end gap-[3px] h-3">
              {[0.4, 0.8, 0.5, 0.9, 0.6, 0.3, 0.7].map((h, i) => (
                <motion.div 
                  key={i}
                  animate={isPlaying ? { height: ["20%", "100%", "20%"] } : { height: `${h * 100}%` }}
                  transition={{ repeat: Infinity, duration: 0.5 + Math.random(), ease: "easeInOut" }}
                  className="w-[2px] bg-text-dim rounded-full"
                />
              ))}
           </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 z-20 overflow-hidden">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <span className="small-label mb-6 inline-block">Personal Message</span>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-[82px] mb-8 leading-[1.1] text-glow">
              I'm Sorry, <br/>
              <span className="italic text-accent-pink">Irah.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.5 }}
            className="text-lg md:text-xl text-text-dim max-w-[400px] mx-auto leading-relaxed"
          >
            I recognize the value of your insight and the clarity you bring. This space is dedicated to the restoration of our understanding.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="flex justify-center"
          >
            <div className="w-16 h-16 border-l border-b border-white/20 rotate-[-45deg] animate-bounce mt-10"></div>
          </motion.div>
        </motion.div>
      </section>

      {/* New Feature: Constellation of Values */}
      <ConstellationOfValues />

      {/* Memory Strip Section */}
      <section className="relative py-32 px-6 z-20 max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
            hidden: {}
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            "Your kindness that lights up the darkest rooms.",
            "The way you notice the little things no one else does.",
            "The pure heart that makes everyone around you better."
          ].map((text, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="glass h-[120px] rounded-[12px] p-6 flex items-center justify-center text-center text-sm text-text-dim border-white/5"
            >
              <p className="italic">{text}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Letter Section */}
      <section className="relative py-32 px-6 z-20">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="letter-gradient p-10 md:p-14 rounded-[24px] shadow-2xl relative overflow-hidden"
          >
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="border-l border-accent-pink pl-10"
            >
                <div className="font-serif text-lg leading-[1.8] space-y-6 italic">
                    <p>
                        \"Irah, you possess an integrity and a rare perspective that I truly value. There is an unmistakable strength in your character—a quality of grace and wisdom that I failed to properly represent.\"
                    </p>
                    <p>
                        I recognize that my choices caused a rift in our understanding, and it weighs on me heavily. You are an exceptional person, Irah. Your presence has a way of bringing clarity to those around you, and I am deeply sorry for losing sight of that significance for even a fleeting moment.
                    </p>
                    <p>
                        I take complete responsibility for my lapse. You deserve nothing but consistency and the highest level of respect.
                    </p>
                    <p>
                        Irah, you are a pillar of importance to me. I feel a great void without our connection.
                    </p>
                </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* New Feature: Digital Keepsake */}
      {!keepsakeRevealed && <DigitalKeepsake onReveal={() => setKeepsakeRevealed(true)} />}

      <AnimatePresence>
        {(keepsakeRevealed || accepted) && (
            <motion.section 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="relative py-48 px-6 z-20 flex flex-col items-center justify-center text-center"
            >
                {!accepted ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="max-w-xl"
                >
                    <Sparkles className="mx-auto mb-8 text-accent-pink animate-pulse" size={48} />
                    <h2 className="font-serif text-4xl md:text-5xl mb-12">Irah, will you forgive me?</h2>
                    <div className="flex flex-wrap items-center justify-center gap-6 relative min-h-[100px]">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleForgive}
                        className="px-10 py-4 bg-accent-pink text-bg-dark rounded-full font-sans font-semibold uppercase tracking-wider shadow-lg shadow-accent-pink/20 transition-colors"
                    >
                        Forgive me?
                    </motion.button>
                    <motion.button
                        style={noButtonStyle}
                        onMouseEnter={moveNoButton}
                        onClick={moveNoButton}
                        className="px-10 py-4 bg-transparent text-text-main rounded-full font-sans font-medium border border-white/20 hover:bg-white/5 transition-all duration-75"
                    >
                        {noButtonCount === 0 ? "No" : noButtonTexts[Math.min(noButtonCount - 1, noButtonTexts.length - 1)]}
                    </motion.button>
                    </div>
                </motion.div>
                ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <div className="mb-8 w-24 h-24 bg-accent-pink rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-accent-pink/50">
                        <Compass fill="currentColor" size={48} className="text-bg-dark" />
                    </div>
                    <h2 className="font-serif text-5xl md:text-7xl mb-6 text-glow">I Value You, Irah</h2>
                    <p className="text-xl text-text-dim mb-12">Thank you for your immense patience and for being an incredible person.</p>
                    <motion.div 
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="inline-block p-6 glass rounded-2xl"
                    >
                        <div className="flex items-center gap-3 text-accent-pink">
                            <Send size={20} />
                            <span>My thoughts are finally at peace.</span>
                        </div>
                    </motion.div>
                </motion.div>
                )}
            </motion.section>
        )}
      </AnimatePresence>

      {/* Footer / Final Message */}
      <footer className="relative py-32 px-6 z-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-accent-pink/20"></div>
            <div className="w-2 h-2 rounded-full bg-accent-pink/40"></div>
            <div className="h-[1px] w-12 bg-accent-pink/20"></div>
          </div>

          <p className="font-serif text-2xl md:text-3xl text-text-main/80 italic leading-relaxed max-w-2xl mx-auto">
            \"True character is not defined by the lapses we have, but by the respect we choose to restore. Your standard remains my constant guide.\"
          </p>
          
          <div className="space-y-4 pt-4">
            <div className="font-sans text-[10px] uppercase tracking-[0.6em] text-accent-pink font-semibold">
              Dedicated to the integrity of
            </div>
            <div className="font-serif text-5xl md:text-6xl text-glow text-white/90">
              Irah
            </div>
          </div>
          
          <div className="pt-12 font-sans text-[9px] uppercase tracking-[0.2em] text-text-dim">
            Establishing a new standard &copy; 2026
          </div>
        </div>
      </footer>
    </div>
  );
}
