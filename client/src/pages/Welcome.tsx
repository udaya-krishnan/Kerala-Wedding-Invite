import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useGlobalAudio } from "@/components/AudioContext";
import { Bell } from "lucide-react";

export default function Welcome() {
  const [, setLocation] = useLocation();
  const { playMusic, playBell } = useGlobalAudio();

  const handleReveal = () => {
    playBell();
    playMusic();
    
    // Slight delay to let the bell ring before unmounting
    setTimeout(() => {
      setLocation("/invite");
    }, 800);
  };

  return (
    <motion.div 
      className="min-h-screen bg-[#2A0800] flex flex-col items-center justify-center relative overflow-hidden px-4"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] bg-yellow-600/10 rounded-full blur-[100px] animate-pulse" />
      </div>

      <motion.div 
        className="z-10 flex flex-col items-center text-center space-y-12"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        {/* Lamp placeholder using Unsplash heavily styled */}
        <div className="relative w-48 h-64 md:w-64 md:h-80 mb-4">
          {/* opening screen nilavilakku lamp */}
          <img 
            src="https://pixabay.com/get/g2a41b7ba1a7aef23c2db88ebaaf302cb794529ffb144ea436da9abd2436916d6ffce2b3c1196496c67177fc45416b48e879fcbb21d9f18471efcef7d870695fc_1280.jpg" 
            alt="Traditional Nilavilakku" 
            className="w-full h-full object-cover object-center rounded-t-[100px] shadow-2xl opacity-80"
            style={{ maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)' }}
          />
          {/* Virtual Flame */}
          <motion.div 
            className="absolute top-[15%] left-1/2 -translate-x-1/2 w-4 h-6 bg-yellow-400 rounded-full blur-[2px]"
            animate={{ 
              scale: [1, 1.2, 0.9, 1.1, 1],
              opacity: [0.8, 1, 0.7, 1, 0.8]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="space-y-4 max-w-md">
          <h1 className="text-3xl md:text-5xl font-display text-gradient-gold">
            With Divine Blessings
          </h1>
          <p className="text-[#E8DCC4] text-lg font-sans font-light tracking-wide">
            We invite you to join us in celebrating our union
          </p>
        </div>

        <motion.button
          onClick={handleReveal}
          className="group relative px-8 py-4 bg-gradient-gold text-[#2A0800] rounded-full font-display font-bold text-xl md:text-2xl shadow-[0_0_40px_rgba(212,175,55,0.3)] hover:shadow-[0_0_60px_rgba(212,175,55,0.5)] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10 flex items-center gap-2">
            Tap to Reveal Invitation
            <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        </motion.button>
      </motion.div>

    </motion.div>
  );
}
