import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, Calendar, Clock, Volume2, VolumeX, Play } from "lucide-react";
import { useGlobalAudio } from "@/components/AudioContext";
import ScratchCard from "@/components/ScratchCard";
import FallingPetals from "@/components/FallingPetals";
import CountdownTimer from "@/components/CountdownTimer";

export default function Home() {
  const { isPlaying, toggleMusic } = useGlobalAudio();
  const [showPetals, setShowPetals] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
      "wedding1.jpg",
      "wedding2.jpg",
      "wedding3.jpg",
      "wedding4.jpg",
      "wedding5.jpg",
      "wedding2.jpg",
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="min-h-screen pb-20 relative"
    >
      {/* Global Petal Animation */}
      <FallingPetals active={showPetals} />

      {/* Audio Toggle */}
      <button 
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-primary text-primary-foreground shadow-xl hover:scale-110 transition-transform"
        aria-label="Toggle Music"
      >
        {isPlaying ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
      </button>

      {/* 1. Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #D4AF37 2px, transparent 2px)',
            backgroundSize: '40px 40px'
          }}
        />

        <div className="w-full max-w-4xl mx-auto border-gradient-gold border-[12px] md:border-[20px] p-6 md:p-16 relative bg-background/90 backdrop-blur-sm rounded-sm">
          
          {/* Corner Decorations */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary -translate-x-2 -translate-y-2" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary translate-x-2 -translate-y-2" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary -translate-x-2 translate-y-2" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary translate-x-2 translate-y-2" />

          <div className="text-center space-y-6 md:space-y-10">
            <h3 className="text-primary font-bold tracking-[0.3em] uppercase text-sm md:text-base">
              Together with their families
            </h3>

            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-foreground leading-none">
              Adithya
              <span className="block text-4xl md:text-6xl text-primary my-4">&amp;</span>
              Anjali
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground italic max-w-lg mx-auto">
              Request the honor of your presence to celebrate their union in marriage.
            </p>

            <CountdownTimer targetDate="2025-12-31T09:30:00" />
          </div>
        </div>
      </section>

      {/* 2. Scratch Section */}
      <section className="py-20 px-4 text-center relative">
        <h2 className="text-3xl md:text-5xl font-display text-foreground mb-8">
          Save the Date
        </h2>

        <ScratchCard onComplete={() => setShowPetals(true)}>
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              Sunday
            </h3>
            <p className="text-4xl md:text-5xl font-display text-primary font-bold my-2">
              31 . 12 . 2025
            </p>
            <p className="text-sm tracking-widest uppercase text-muted-foreground">
              Muhurtham: 9:30 AM to 10:15 AM
            </p>
          </div>
        </ScratchCard>
      </section>

      {/* 3. Ceremonies */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-display text-center mb-16">
            Ceremonies
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {[
              { title: "Mehendi & Sangeet", date: "Dec 29, 2025", time: "6:00 PM", venue: "The Royal Gardens" },
              { title: "Engagement", date: "Dec 30, 2025", time: "7:00 PM", venue: "Taj Hotel, Kochi" },
              { title: "Muhurtham", date: "Dec 31, 2025", time: "9:30 AM", venue: "Guruvayur Temple" },
              { title: "Reception", date: "Dec 31, 2025", time: "7:00 PM", venue: "Grand Hyatt, Kochi" }
            ].map((event, i) => (
              <div key={i} className="glass-card p-8 rounded-2xl">
                <h3 className="text-3xl font-display mb-6">{event.title}</h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>{event.venue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Gallery */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-display text-center mb-12">
            Moments
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((src, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden">
                <img
                  src={src}
                  alt={`Gallery ${i+1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Footer */}
      <footer className="py-12 px-4 bg-[#2A0800] text-center">
        <h2 className="font-display text-4xl text-primary">
          Thank You
        </h2>
        <p className="text-[#E8DCC4] mt-4">
          We eagerly await the joy of your presence on our special day.
        </p>
        <p className="text-primary/50 text-sm tracking-widest mt-8">
          ADITHYA & ANJALI
        </p>
      </footer>

    </motion.div>
  );
}