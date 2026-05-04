import { useEffect, useState } from 'react';

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [colorIndex, setColorIndex] = useState(0);
  const [fade, setFade] = useState(false);

  const colors = [
    '#e63946',
    '#f4a261',
    '#2ec4b6',
    '#0077b6',
    '#06d6a0',
  ];

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setColorIndex((prev) => (prev + 1) % colors.length);
      if (count >= 5) {
        clearInterval(interval);
        setTimeout(() => {
          setFade(true);
          setTimeout(onDone, 600);
        }, 400);
      }
    }, 700);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gray-950 transition-opacity duration-600 ${
        fade ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="text-center">
        <span
          className="font-black tracking-widest transition-colors duration-500 select-none"
          style={{
            fontSize: 'clamp(4rem, 15vw, 10rem)',
            color: colors[colorIndex],
            textShadow: `0 0 60px ${colors[colorIndex]}88`,
            letterSpacing: '0.15em',
          }}
        >
          NEV
        </span>
        <div className="mt-4 flex gap-2 justify-center">
          {colors.map((c, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: i <= colorIndex ? colors[colorIndex] : '#374151',
                transform: i === colorIndex ? 'scale(1.5)' : 'scale(1)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
