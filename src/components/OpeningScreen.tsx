import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface OpeningScreenProps {
  onEnter: () => void;
}

export function OpeningScreen({ onEnter }: OpeningScreenProps) {
  const [isRevealing, setIsRevealing] = useState(false);

  const handleTap = () => {
    // Play bell sound
    const bell = new Audio("https://cdn.freesound.org/preview/411/411088_5121236-lq.mp3");
    bell.volume = 0.5;
    bell.play().catch(() => {});
    
    setIsRevealing(true);
    setTimeout(() => {
      onEnter();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {!isRevealing && (
        <motion.div
          key="opening"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1A0B0B] text-accent overflow-hidden"
        >
          {/* Subtle animated background elements */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent"></div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl"
          >
            {/* Traditional Lamp (Nilavilakku) */}
            <div className="relative mb-12">
              <motion.div 
                animate={{ 
                  boxShadow: ["0 0 20px 5px rgba(212,175,55,0.2)", "0 0 40px 15px rgba(212,175,55,0.5)", "0 0 20px 5px rgba(212,175,55,0.2)"] 
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-accent/20 blur-xl"
              ></motion.div>
              {/* traditional brass lamp placeholder */}
              <img 
                src="https://pixabay.com/get/gc2d50a04530fe096cfd01a92f7e54bde39ea50a41bea4bf87d346676f0c21b38077409c6eafb431904a0d85d9ab98a7ebe016b66c6b3a1249240402207ba475d_1280.jpg" 
                alt="Sacred Lamp" 
                className="w-32 h-48 object-cover object-center rounded-t-full shadow-2xl relative z-10 border-4 border-accent border-b-0"
                style={{ objectPosition: "50% 80%" }}
              />
            </div>

            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl mb-6 text-glow-gold tracking-wider uppercase">
              With Divine Blessings
            </h1>
            
            <p className="font-body text-lg md:text-xl text-accent/80 mb-12 italic max-w-md">
              We joyfully invite you to grace the auspicious occasion of our wedding ceremony.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleTap}
              className="px-8 py-4 bg-gradient-to-r from-accent/80 via-accent to-accent/80 text-primary font-display font-bold text-lg md:text-xl rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] border border-accent-foreground/20 hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all uppercase tracking-widest relative overflow-hidden group"
            >
              <span className="relative z-10">Tap to Reveal Invitation</span>
              <div className="absolute inset-0 h-full w-full bg-white/20 translate-x-[-100%] skew-x-[-15deg] group-hover:animate-[shine_1.5s_ease-in-out_infinite]"></div>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
