import React, { createContext, useContext, useRef, useState, useEffect } from "react";

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
    // Background Music
    bgMusicRef.current = new Audio("/audio/inkam.mpeg");
    bgMusicRef.current.loop = true;
    bgMusicRef.current.volume = 0.1;

    // Bell Sound
    bellRef.current = new Audio("/audio/bell.mpeg");
    bellRef.current.volume = 0.2;
    bellRef.current.preload = "auto";

    // Cleanup
    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current = null;
      }
      if (bellRef.current) {
        bellRef.current.pause();
        bellRef.current = null;
      }
    };
  }, []);

  const playMusic = () => {
    if (!bgMusicRef.current) return;

    bgMusicRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(console.error);
  };

  const pauseMusic = () => {
    if (!bgMusicRef.current) return;

    bgMusicRef.current.pause();
    setIsPlaying(false);
  };

  const toggleMusic = () => {
    isPlaying ? pauseMusic() : playMusic();
  };

  const playBell = () => {
    if (!bellRef.current) return;

    const bell = bellRef.current;

    // Reset
    bell.pause();
    bell.currentTime = 0.3; // Skip noisy beginning
    bell.volume = 0.2;

    bell.play().catch(console.error);

    // Fade out last 1 second to prevent popping
    const fadeOut = setInterval(() => {
      if (!bell.duration) return;

      const timeLeft = bell.duration - bell.currentTime;

      if (timeLeft <= 1) {
        bell.volume = Math.max(0, timeLeft * 0.2);
      }

      if (timeLeft <= 0) {
        clearInterval(fadeOut);
        bell.pause();
      }
    }, 100);
  };

  return (
    <AudioContext.Provider
      value={{ isPlaying, playMusic, pauseMusic, toggleMusic, playBell }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useGlobalAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useGlobalAudio must be used within AudioProvider");
  }
  return context;
}