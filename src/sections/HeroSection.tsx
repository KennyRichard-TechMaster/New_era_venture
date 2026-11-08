import { useEffect, useState } from "react";
import {
  ArrowRight,
  Globe,
  Smartphone,
  Palette,
  Code2,
  TrendingUp,
  Cloud,
} from "lucide-react";
import logoImage from "../../logo.png";

const FONT_LINK_ID = "hero-font-link";
const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Fraunces:opsz,wght@9..144,500;9..144,600&display=swap";

const HERO_WORDS = [
  "INNOVATIVE",
  "VISIONARY",
  "DIGITAL",
  "TRANSFORMATIVE",
  "FUTURE-DRIVEN",
];

const SERVICES = [
  { icon: Globe, label: "Web Development", status: "Active" },
  { icon: Smartphone, label: "Mobile Apps", status: "Active" },
  { icon: Palette, label: "UI/UX & Design", status: "Active" },
  { icon: Code2, label: "Code Education", status: "Enrolling" },
  { icon: TrendingUp, label: "SEO & Marketing", status: "Active" },
  { icon: Cloud, label: "Cloud & DevOps", status: "Active" },
];

const STATS = [
  { value: "200+", label: "Students trained" },
  { value: "50+", label: "Projects shipped" },
  { value: "5+", label: "Years active" },
  { value: "98%", label: "Satisfaction" },
];

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    setMounted(true);
    if (!document.getElementById(FONT_LINK_ID)) {
      const link = document.createElement("link");
      link.id = FONT_LINK_ID;
      link.rel = "stylesheet";
      link.href = FONT_HREF;
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % HERO_WORDS.length);
        setWordVisible(true);
      }, 350);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(
      () => setActiveService((i) => (i + 1) % SERVICES.length),
      2200,
    );
    return () => clearInterval(id);
  }, []);

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="hero">
      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          font-family: 'Manrope','Helvetica Neue',Arial,sans-serif;
          background: #fafafa;
          padding: 110px 24px 56px;
        }

        .hero__field {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
        }
        .hero__field::before {
          content: "";
          position: absolute;
          top: -10%;
          right: -8%;
          width: 760px;
          height: 760px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, rgba(37,99,235,0.10), rgba(37,99,235,0) 70%);
        }
        .hero__grid-lines {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(15,23,42,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15,23,42,0.035) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: linear-gradient(115deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.35) 55%, transparent 85%);
        }

        .hero__inner {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1320px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          gap: 48px;
          align-items: center;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .hero__inner.mounted {
          opacity: 1;
          transform: translateY(0);
        }

        /* ---------- Left column ---------- */
        .hero__brand {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 40px;
        }
        .hero__logo-box {
          background: #ffffff;
          border-radius: 12px;
          padding: 6px;
          border: 1px solid rgba(15,23,42,0.08);
          flex-shrink: 0;
        }
        .hero__logo-box img {
          height: 38px;
          width: auto;
          display: block;
        }
        .hero__brand-text {
          display: flex;
          flex-direction: column;
          line-height: 1;
        }
        .hero__brand-name {
          font-size: 0.92rem;
          font-weight: 700;
          color: #0f172a;
          letter-spacing: 0.32em;
          text-transform: uppercase;
        }
        .hero__brand-rule {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, #2563eb 0%, rgba(37,99,235,0.15) 100%);
          margin-top: 8px;
        }

        .hero__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 22px;
          font-size: 0.78rem;
          letter-spacing: 0.05em;
        }
        .hero__eyebrow-static {
          color: #475569;
          font-weight: 500;
        }
        .hero__eyebrow-word {
          color: #2563eb;
          font-weight: 800;
          letter-spacing: 0.08em;
          display: inline-block;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .hero__eyebrow-word.hidden {
          opacity: 0;
          transform: translateY(-4px);
        }

        .hero__headline {
          font-size: clamp(2.4rem, 4.6vw, 3.7rem);
          font-weight: 700;
          color: #0f172a;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin: 0 0 24px;
          max-width: 580px;
        }
        .hero__headline em {
          font-family: 'Fraunces', 'Georgia', serif;
          font-style: italic;
          font-weight: 600;
          color: #2563eb;
        }

        .hero__body {
          color: #475569;
          font-size: 1.05rem;
          line-height: 1.75;
          max-width: 460px;
          margin: 0 0 36px;
        }

        .hero__ctas {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 44px;
        }
        .hero__btn-primary,
        .hero__btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 26px;
          font-weight: 700;
          font-size: 0.85rem;
          letter-spacing: 0.02em;
          border-radius: 8px;
          cursor: pointer;
          font-family: inherit;
          transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
        }
        .hero__btn-primary {
          background: #2563eb;
          color: #fff;
          border: none;
          box-shadow: 0 10px 24px rgba(37,99,235,0.28);
        }
        .hero__btn-primary:hover {
          background: #1d4ed8;
          transform: translateY(-2px);
        }
        .hero__btn-secondary {
          background: transparent;
          color: #0f172a;
          border: 1.5px solid rgba(15,23,42,0.18);
        }
        .hero__btn-secondary:hover {
          border-color: rgba(15,23,42,0.4);
          background: rgba(15,23,42,0.03);
          transform: translateY(-2px);
        }

        .hero__stats {
          display: flex;
          gap: 36px;
          flex-wrap: wrap;
          border-top: 1px solid rgba(15,23,42,0.08);
          padding-top: 28px;
        }
        .hero__stat-value {
          font-size: 1.5rem;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.02em;
          line-height: 1;
        }
        .hero__stat-label {
          font-size: 0.66rem;
          color: #64748b;
          margin-top: 5px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        /* ---------- Right column: visual composition ---------- */
        .hero__visual {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 480px;
        }

        .hero__figure-glow {
          position: absolute;
        }

        /* Robot overlay tweaks */
        .hero__figure {
          width: 320px;
          height: 320px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(37,99,235,0.18) 0%, rgba(37,99,235,0.06) 55%, transparent 75%);
          top: 2%;
          left: 14%;
          pointer-events: none;
        }

        .hero__composition {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
        }

        .hero__figure {
          position: relative;
          z-index: 5;
          width: 320px;
          flex-shrink: 0;
          margin-right: -66px;
          margin-top: 8px;
        }
        .hero__figure img {
          width: 100%;
          display: block;
          height: auto;
          transform: translateY(-10px) scale(1.08);
          transform-origin: bottom center;
          filter: drop-shadow(6px 20px 28px rgba(15,23,42,0.22));
          -webkit-mask-image: linear-gradient(to bottom, black 92%, transparent 100%);
          mask-image: linear-gradient(to bottom, black 92%, transparent 100%);
        }

        .hero__panel-wrap {
          position: relative;
          z-index: 2;
          width: 420px;
          flex-shrink: 0;
        }

        .hero__panel {
          background: #ffffff;
          border: 1px solid rgba(15,23,42,0.08);
          border-radius: 16px;
          box-shadow: 0 30px 70px rgba(15,23,42,0.10);
          padding: 28px;
        }
        .hero__panel-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .hero__panel-eyebrow {
          font-size: 0.66rem;
          color: #94a3b8;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 4px;
          font-weight: 600;
        }
        .hero__panel-title {
          font-size: 1.05rem;
          font-weight: 800;
          color: #0f172a;
        }
        .hero__panel-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px 11px;
          background: rgba(37,99,235,0.08);
          border-radius: 100px;
        }
        .hero__panel-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #2563eb;
        }
        .hero__panel-badge-text {
          font-size: 0.66rem;
          color: #2563eb;
          font-weight: 700;
          letter-spacing: 0.04em;
        }

        .hero__service-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 20px;
        }
        .hero__service-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 12px;
          border-radius: 10px;
          background: rgba(15,23,42,0.025);
          border: 1px solid transparent;
          transition: background 0.35s ease, border-color 0.35s ease;
        }
        .hero__service-row.active {
          background: rgba(37,99,235,0.07);
          border-color: rgba(37,99,235,0.22);
        }
        .hero__service-icon {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(15,23,42,0.05);
          transition: background 0.35s ease;
        }
        .hero__service-row.active .hero__service-icon {
          background: rgba(37,99,235,0.14);
        }
        .hero__service-label {
          flex: 1;
          font-size: 0.82rem;
          font-weight: 600;
          color: #334155;
        }
        .hero__service-row.active .hero__service-label {
          color: #0f172a;
        }
        .hero__service-status {
          font-size: 0.64rem;
          color: #94a3b8;
          font-weight: 500;
        }

        .hero__panel-divider {
          height: 1px;
          background: rgba(15,23,42,0.07);
          margin-bottom: 18px;
        }

        .hero__panel-stats {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .hero__panel-stat-value {
          font-size: 1.1rem;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.02em;
          text-align: center;
        }
        .hero__panel-stat-label {
          font-size: 0.6rem;
          color: #94a3b8;
          margin-top: 3px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          text-align: center;
        }

        .hero__panel-cta {
          width: 100%;
          padding: 13px;
          background: #2563eb;
          color: #fff;
          font-weight: 700;
          font-size: 0.82rem;
          letter-spacing: 0.02em;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-family: inherit;
          transition: background 0.2s ease;
        }
        .hero__panel-cta:hover {
          background: #1d4ed8;
        }

        /* ---------- Mobile ---------- */
        @media (max-width: 860px) {
          .hero {
            padding: 96px 20px 56px;
            min-height: auto;
          }
          .hero__inner {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .hero__visual {
            min-height: 0;
            display: block;
          }
          .hero__figure-glow {
            display: none;
          }
          .hero__composition {
            display: block;
          }
          .hero__figure {
            width: 220px;
            margin: 0 auto -26px;
          }
          .hero__panel-wrap {
            width: 100%;
            margin-left: 0;
          }
          .hero__panel {
            padding: 22px;
          }
          .hero__brand {
            margin-bottom: 28px;
          }
          .hero__headline {
            font-size: clamp(1.9rem, 8vw, 2.6rem);
            max-width: none;
          }
          .hero__body {
            font-size: 0.96rem;
            max-width: none;
            margin-bottom: 28px;
          }
          .hero__ctas {
            margin-bottom: 40px;
          }
          .hero__btn-primary,
          .hero__btn-secondary {
            flex: 1 1 auto;
            justify-content: center;
          }
          .hero__stats {
            gap: 24px;
            justify-content: space-between;
          }
          .hero__stat-value {
            font-size: 1.25rem;
          }
        }

        @media (max-width: 420px) {
          .hero__stats {
            row-gap: 18px;
          }
        }
      `}</style>

      <div className="hero__field">
        <div className="hero__grid-lines" />
      </div>

      <div className={`hero__inner ${mounted ? "mounted" : ""}`}>
        {/* Left column */}
        <div>
          <div className="hero__brand">
            <div className="hero__logo-box">
              <img src={logoImage} alt="New Era Ventures" />
            </div>
            <div className="hero__brand-text">
              <span className="hero__brand-name">
                New&nbsp;Era&nbsp;Ventures
              </span>
              <span className="hero__brand-rule" />
            </div>
          </div>

          <div className="hero__eyebrow">
            <span className="hero__eyebrow-static">WE ARE</span>
            <span
              className={`hero__eyebrow-word ${wordVisible ? "" : "hidden"}`}
            >
              {HERO_WORDS[wordIndex]}
            </span>
          </div>

          <h1 className="hero__headline">
            Building the <em>digital future</em>, one product at a time
          </h1>

          <p className="hero__body">
            A technology company shaping the digital landscape through
            world-class web development, mobile apps, design, and code education
            — across Nigeria, the UK, and beyond.
          </p>

          <div className="hero__ctas">
            <button
              className="hero__btn-primary"
              onClick={() => scrollTo("#services")}
            >
              Our Services <ArrowRight size={14} strokeWidth={2.5} />
            </button>
            <button
              className="hero__btn-secondary"
              onClick={() => scrollTo("#contact")}
            >
              Get In Touch
            </button>
          </div>

          <div className="hero__stats">
            {STATS.map((s, i) => (
              <div key={i}>
                <div className="hero__stat-value">{s.value}</div>
                <div className="hero__stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: signature visual + services panel */}
        <div className="hero__visual">
          <div className="hero__figure-glow" />

          <div className="hero__composition">
            <div className="hero__figure">
              <img
                src="/yesgirl-removebg-preview.png"
                alt="Woman celebrating success"
              />
            </div>

            <div className="hero__panel-wrap">
              <div className="hero__panel">
                <div className="hero__panel-head">
                  <div>
                    <div className="hero__panel-eyebrow">What we do</div>
                    <div className="hero__panel-title">Our Services</div>
                  </div>
                  <div className="hero__panel-badge">
                    <span className="hero__panel-dot" />
                    <span className="hero__panel-badge-text">6 ACTIVE</span>
                  </div>
                </div>

                <div className="hero__service-list">
                  {SERVICES.map((s, i) => {
                    const Icon = s.icon;
                    const isActive = i === activeService;
                    return (
                      <div
                        key={i}
                        className={`hero__service-row ${isActive ? "active" : ""}`}
                      >
                        <div className="hero__service-icon">
                          <Icon
                            size={14}
                            color={isActive ? "#2563eb" : "#94a3b8"}
                          />
                        </div>
                        <div className="hero__service-label">{s.label}</div>
                        <div className="hero__service-status">{s.status}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="hero__panel-divider" />

                <div className="hero__panel-stats">
                  {[
                    { value: "50+", label: "Projects" },
                    { value: "200+", label: "Students" },
                    { value: "98%", label: "Happy" },
                  ].map((s, i) => (
                    <div key={i}>
                      <div className="hero__panel-stat-value">{s.value}</div>
                      <div className="hero__panel-stat-label">{s.label}</div>
                    </div>
                  ))}
                </div>

                <button
                  className="hero__panel-cta"
                  onClick={() => scrollTo("#contact")}
                >
                  Start a Project →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
