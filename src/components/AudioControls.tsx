import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

interface AudioControlsProps {
  play: boolean;
}

export function AudioControls({ play }: AudioControlsProps) {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4;
    }

    if (play && !isMuted) {
      audioRef.current.play().catch(e => console.log("Audio autoplay prevented:", e));
    } else if (!play || isMuted) {
      audioRef.current.pause();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [play, isMuted]);

  if (!play) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-primary text-accent shadow-lg shadow-black/30 border-2 border-accent hover:bg-primary/90 transition-all hover:scale-110 active:scale-95"
      onClick={() => setIsMuted(!isMuted)}
      aria-label={isMuted ? "Unmute Music" : "Mute Music"}
    >
      {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
    </motion.button>
  );
}
