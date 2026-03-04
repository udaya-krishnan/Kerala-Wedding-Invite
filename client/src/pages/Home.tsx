import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, Calendar, Clock, Volume2, VolumeX, Play } from "lucide-react";
import { useGlobalAudio } from "@/components/AudioContext";
import ScratchCard from "@/components/ScratchCard";
import FallingPetals from "@/components/FallingPetals";
import CountdownTimer from "@/components/CountdownTimer";
import { useCreateRsvp } from "@/hooks/use-rsvp";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@shared/routes";
import { z } from "zod";

export default function Home() {
  const { isPlaying, toggleMusic } = useGlobalAudio();
  const [showPetals, setShowPetals] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { mutate: submitRsvp, isPending } = useCreateRsvp();
  
  const form = useForm<z.infer<typeof api.rsvps.create.input>>({
    resolver: zodResolver(api.rsvps.create.input),
    defaultValues: {
      name: "",
      email: "",
      attending: true,
      guestCount: 1,
      message: ""
    }
  });

  const onRsvpSubmit = (data: z.infer<typeof api.rsvps.create.input>) => {
    submitRsvp(data, {
      onSuccess: () => {
        alert("Thank you! Your RSVP has been received.");
        form.reset();
      }
    });
  };

  const galleryImages = [
    "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800", // couple placeholder
    "https://images.unsplash.com/photo-1605367171493-27eb84f938d8?auto=format&fit=crop&q=80&w=800", // lamp
    "https://images.unsplash.com/photo-1550005809-91ad75fb315f?auto=format&fit=crop&q=80&w=800", // decoration
    "https://images.unsplash.com/photo-1610173826622-540134bc2eb8?auto=format&fit=crop&q=80&w=800", // rituals
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="min-h-screen pb-20 relative"
    >
      {/* Global Petal Animation layer */}
      <FallingPetals active={showPetals} />

      {/* Floating Audio Toggle */}
      <button 
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-primary text-primary-foreground shadow-xl hover:scale-110 transition-transform"
        aria-label="Toggle Music"
      >
        {isPlaying ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
      </button>

      {/* 1. Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
        {/* Background Mandala/Texture placeholder */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #D4AF37 2px, transparent 2px)', backgroundSize: '40px 40px' }} />
        
        <div className="w-full max-w-4xl mx-auto border-gradient-gold border-[12px] md:border-[20px] p-6 md:p-16 relative bg-background/90 backdrop-blur-sm rounded-sm">
          {/* Corner ornaments */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary -translate-x-2 -translate-y-2" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary translate-x-2 -translate-y-2" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary -translate-x-2 translate-y-2" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary translate-x-2 translate-y-2" />

          <div className="text-center space-y-6 md:space-y-10">
            <h3 className="text-primary font-bold tracking-[0.3em] uppercase text-sm md:text-base">Together with their families</h3>
            
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-foreground my-8 leading-none">
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

      {/* 2. Scratch to Reveal Section */}
      <section className="py-20 px-4 text-center relative">
        <h2 className="text-3xl md:text-5xl font-display text-foreground mb-8">Save the Date</h2>
        
        <ScratchCard onComplete={() => setShowPetals(true)}>
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground">Sunday</h3>
            <p className="text-4xl md:text-5xl font-display text-primary font-bold my-2">31 . 12 . 2025</p>
            <p className="text-sm font-sans tracking-widest uppercase text-muted-foreground">Muhurtham: 9:30 AM to 10:15 AM</p>
          </div>
        </ScratchCard>
      </section>

      {/* 3. Wedding Events */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-display text-center text-foreground mb-16">Ceremonies</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Event Card */}
            {[
              { title: "Mehendi & Sangeet", date: "Dec 29, 2025", time: "6:00 PM Onwards", venue: "The Royal Gardens", map: "#" },
              { title: "Engagement", date: "Dec 30, 2025", time: "7:00 PM Onwards", venue: "Taj Hotel, Kochi", map: "#" },
              { title: "Muhurtham", date: "Dec 31, 2025", time: "9:30 AM - 10:15 AM", venue: "Guruvayur Temple", map: "#" },
              { title: "Reception", date: "Dec 31, 2025", time: "7:00 PM Onwards", venue: "Grand Hyatt, Kochi", map: "#" }
            ].map((event, i) => (
              <div key={i} className="glass-card p-8 rounded-2xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <h3 className="text-3xl font-display text-foreground mb-6">{event.title}</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Clock className="w-5 h-5 text-primary" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>{event.venue}</span>
                  </div>
                </div>

                <a 
                  href={event.map} 
                  className="inline-flex items-center gap-2 text-primary font-medium hover:text-foreground transition-colors border-b border-primary pb-1"
                >
                  View on Map <MapPin className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Video Message */}
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-display text-center text-foreground mb-12">Our Journey</h2>
        <div className="relative aspect-video rounded-2xl overflow-hidden border-[8px] border-primary/20 shadow-2xl bg-black flex items-center justify-center group cursor-pointer">
           {/* video placeholder background */}
          <img src={galleryImages[0]} alt="Video Thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
          <div className="relative z-10 w-20 h-20 bg-primary/90 text-primary-foreground rounded-full flex items-center justify-center scale-100 group-hover:scale-110 transition-transform">
            <Play className="w-8 h-8 ml-1" />
          </div>
        </div>
      </section>

      {/* 5. Gallery */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-display text-center text-foreground mb-12">Moments</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((src, i) => (
              <div 
                key={i} 
                className="aspect-square rounded-xl overflow-hidden cursor-pointer relative group"
                onClick={() => setSelectedImage(src)}
              >
                <img 
                  src={src} 
                  alt={`Gallery ${i+1}`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <img src={selectedImage} alt="Fullscreen" className="max-w-full max-h-[90vh] object-contain rounded-lg" />
          <button 
            className="absolute top-6 right-6 text-white bg-white/20 hover:bg-white/40 p-2 rounded-full backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <VolumeX className="w-6 h-6 rotate-45" /> {/* Close Icon visually */}
          </button>
        </div>
      )}

      {/* 6. RSVP Section */}
      <section className="py-20 px-4 max-w-2xl mx-auto">
        <div className="glass-card p-8 md:p-12 rounded-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-display text-foreground mb-2">RSVP</h2>
          <p className="text-muted-foreground mb-8">Please let us know if you can make it</p>

          <form onSubmit={form.handleSubmit(onRsvpSubmit)} className="space-y-6 text-left">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
              <input 
                {...form.register("name")} 
                className="w-full px-4 py-3 rounded-xl bg-background border border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                placeholder="Enter your name"
              />
              {form.formState.errors.name && <p className="text-destructive text-sm mt-1">{form.formState.errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
              <input 
                {...form.register("email")} 
                type="email"
                className="w-full px-4 py-3 rounded-xl bg-background border border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                placeholder="Enter your email"
              />
              {form.formState.errors.email && <p className="text-destructive text-sm mt-1">{form.formState.errors.email.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Will you attend?</label>
                <select 
                  {...form.register("attending", { setValueAs: v => v === 'true' })} 
                  className="w-full px-4 py-3 rounded-xl bg-background border border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                >
                  <option value="true">Joyfully Accept</option>
                  <option value="false">Regretfully Decline</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Number of Guests</label>
                <input 
                  {...form.register("guestCount", { valueAsNumber: true })} 
                  type="number" 
                  min="1" 
                  max="10"
                  className="w-full px-4 py-3 rounded-xl bg-background border border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Message for the couple (Optional)</label>
              <textarea 
                {...form.register("message")} 
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-background border border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                placeholder="Leave a wish..."
              />
            </div>

            <button 
              type="submit" 
              disabled={isPending}
              className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Submitting..." : "Send RSVP"}
            </button>
          </form>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="py-12 px-4 bg-[#2A0800] text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #D4AF37 2px, transparent 2px)', backgroundSize: '20px 20px' }} />
        
        <div className="relative z-10 space-y-6">
          <h2 className="font-display text-4xl text-gradient-gold">Thank You</h2>
          <p className="text-[#E8DCC4] max-w-md mx-auto font-light">
            We eagerly await the joy of your presence on our special day.
          </p>
          <div className="w-16 h-[1px] bg-primary/50 mx-auto mt-8" />
          <p className="text-primary/50 text-sm tracking-widest mt-8 font-sans">
            ADITHYA & ANJALI
          </p>
        </div>
      </footer>

    </motion.div>
  );
}
