import { useEffect, useRef, useState } from "react";
import { ArrowRight, Play } from "lucide-react";

const HERO_WORDS = [
  "INNOVATIVE",
  "VISIONARY",
  "DIGITAL",
  "TRANSFORMATIVE",
  "FUTURE-DRIVEN",
];

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % HERO_WORDS.length);
        setVisible(true);
      }, 400);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!imageRef.current) return;
      const rect = imageRef.current.getBoundingClientRect();
      const progress = 1 - rect.top / window.innerHeight;
      const y = progress * 60;
      imageRef.current.style.transform = `translateY(${y}px) scale(1.08)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-gray-950"
    >
      {/* Parallax background image */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={imageRef}
          className="absolute inset-0 transition-none will-change-transform"
        >
          <img
            src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Team collaborating"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/90 to-gray-950/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-cyan-500/20 animate-pulse"
            style={{
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 4 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* Content - Shifted to the left */}
      <div className="relative z-10 w-full ml-0 px-8 sm:px-12 lg:px-16 pt-20 pb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            NIGERIA - UK & many more · Building the Digital Future
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-4">
            <span className="block">NEW ERA</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              VENTURES
            </span>
          </h1>

          <div className="h-14 flex items-center mb-6">
            <span className="text-2xl sm:text-3xl font-bold text-gray-300">
              WE ARE A{" "}
              <span
                className={`text-cyan-400 inline-block transition-all duration-400 ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-3"
                }`}
              >
                {HERO_WORDS[wordIndex]}
              </span>
            </span>
          </div>

          <p className="text-lg text-gray-400 leading-relaxed mb-10 max-w-xl">
            Tech company shaping the digital landscape with world-class web
            development, mobile apps, graphic design, and code education. We do
            not just build products — we build legacies.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => scrollTo("#services")}
              className="group flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 hover:-translate-y-1"
            >
              Explore Our Work
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <button
              onClick={() => scrollTo("#learn")}
              className="group flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
            >
              <Play size={18} className="text-cyan-400" />
              Learn to Code
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 flex flex-wrap gap-8">
            {[
              { value: "200+", label: "Students Trained" },
              { value: "50+", label: "Projects Shipped" },
              { value: "5+", label: "Years Experience" },
              { value: "98%", label: "Client Satisfaction" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-black text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-gray-600 to-transparent animate-bounce" />
      </div>
    </section>
  );
}
