import React, { createContext, useContext, useRef, useState, useEffect } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  playMusic: () => void;
  pauseMusic: () => void;
  toggleMusic: () => void;
  playBell: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const bellRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Nadaswaram placeholder music
    bgMusicRef.current = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
    bgMusicRef.current.loop = true;
    bgMusicRef.current.volume = 0.4;

    // Soft temple bell sound
    bellRef.current = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");
    bellRef.current.volume = 0.8;

    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current = null;
      }
    };
  }, []);

  const playMusic = () => {
    if (bgMusicRef.current) {
      bgMusicRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  };

  const pauseMusic = () => {
    if (bgMusicRef.current) {
      bgMusicRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  const playBell = () => {
    if (bellRef.current) {
      bellRef.current.currentTime = 0;
      bellRef.current.play().catch(console.error);
    }
  };

  return (
    <AudioContext.Provider value={{ isPlaying, playMusic, pauseMusic, toggleMusic, playBell }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useGlobalAudio() {
  const context = useContext(AudioContext);
  if (!context) throw new Error("useGlobalAudio must be used within AudioProvider");
  return context;
}
