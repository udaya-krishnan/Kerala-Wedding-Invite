import { useEffect, useState } from 'react';

interface Petal {
  id: number;
  left: string;
  animationDuration: string;
  animationDelay: string;
  size: number;
}

export default function FallingPetals({ active }: { active: boolean }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    if (!active) return;

    // Create 30 jasmine-like petals
    const newPetals = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      animationDuration: `${Math.random() * 3 + 3}s`,
      animationDelay: `${Math.random() * 2}s`,
      size: Math.random() * 15 + 10,
    }));

    setPetals(newPetals);

    // Stop adding after 6 seconds
    const timeout = setTimeout(() => setPetals([]), 6000);
    return () => clearTimeout(timeout);
  }, [active]);

  if (!active || petals.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal absolute bg-white rounded-full opacity-80"
          style={{
            left: petal.left,
            width: `${petal.size}px`,
            height: `${petal.size * 1.5}px`,
            borderBottomRightRadius: '50%',
            borderTopLeftRadius: '50%',
            boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.1)',
            animationDuration: petal.animationDuration,
            animationDelay: petal.animationDelay,
          }}
        />
      ))}
    </div>
  );
}
