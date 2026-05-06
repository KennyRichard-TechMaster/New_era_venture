import { useEffect, useState } from "react";

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [displayedText, setDisplayedText] = useState("");
  const [fade, setFade] = useState(false);

  const motto = "TECH PARTNERS | ACADEMY";

  useEffect(() => {
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex < motto.length) {
        setDisplayedText(motto.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setFade(true);
          setTimeout(onDone, 600);
        }, 1500);
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gray-950 transition-opacity duration-600 ${
        fade ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4 tracking-wide">
          NEW ERA VENTURES
        </h1>

        <div className="text-xl text-gray-400 tracking-widest font-semibold">
          {displayedText}
          {displayedText.length < motto.length && (
            <span className="inline-block w-0.5 h-6 ml-1 bg-cyan-500 animate-pulse" />
          )}
        </div>
      </div>
    </div>
  );
}
