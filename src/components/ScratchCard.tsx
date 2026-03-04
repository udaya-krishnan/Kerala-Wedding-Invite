import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ScratchCardProps {
  onComplete: () => void;
  children: React.ReactNode;
}

export default function ScratchCard({ onComplete, children }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isRevealed, setIsRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showCalendarButton, setShowCalendarButton] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      ctx.globalCompositeOperation = "source-over";

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "#BF953F");
      gradient.addColorStop(0.5, "#FCF6BA");
      gradient.addColorStop(1, "#B38728");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.font = "20px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Scratch to Reveal Date", canvas.width / 2, canvas.height / 2);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  const getPosition = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();

    if (e.touches) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fill();
  };

  const handleStart = (e: any) => {
    if (isRevealed) return;
    e.preventDefault();
    setIsDrawing(true);
    const { x, y } = getPosition(e);
    scratch(x, y);
  };

  const handleMove = (e: any) => {
    if (!isDrawing || isRevealed) return;
    e.preventDefault();
    const { x, y } = getPosition(e);
    scratch(x, y);
    checkCompletion();
  };

  const handleEnd = () => {
    setIsDrawing(false);
  };

  const checkCompletion = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    let cleared = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) cleared++;
    }

    const total = pixels.length / 4;
    const percent = (cleared / total) * 100;

    if (percent > 60 && !isRevealed) {
      setIsRevealed(true);
      setShowCalendarButton(true);
      onComplete();
    }
  };

  // ✅ GOOGLE CALENDAR DIRECT OPEN (No Download)
  const addToCalendar = () => {
    const startDate = "20260715T090000Z";
    const endDate = "20260715T120000Z";

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE
      &text=Wedding Ceremony
      &dates=${startDate}/${endDate}
      &details=Join us for the wedding celebration!
      &location=Kerala, India`;

    window.open(url.replace(/\s/g, ""), "_blank");
  };

  return (
    <div className="flex flex-col items-center">
      <div
        ref={containerRef}
        className="relative w-full max-w-sm mx-auto h-32 rounded-xl overflow-hidden shadow-lg border-2 border-primary/50"
        style={{ touchAction: "none" }}
      >
        <div className="absolute inset-0 flex items-center justify-center bg-white p-4 text-center z-0">
          {children}
        </div>

        <motion.canvas
          ref={canvasRef}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
          className="absolute inset-0 z-10 cursor-pointer"
          animate={{ opacity: isRevealed ? 0 : 1 }}
          transition={{ duration: 0.8 }}
        />
      </div>

      {showCalendarButton && (
        <motion.button
          onClick={addToCalendar}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6 px-6 py-3 rounded-xl bg-primary text-white font-semibold shadow-lg"
        >
          Add to Calendar
        </motion.button>
      )}
    </div>
  );
}