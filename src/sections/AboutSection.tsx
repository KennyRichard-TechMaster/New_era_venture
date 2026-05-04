import { useEffect, useRef } from "react";
import { Target, Eye, Heart, Award } from "lucide-react";

function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

export default function AboutSection() {
  const titleRef = useScrollReveal();
  const col1Ref = useScrollReveal();
  const col2Ref = useScrollReveal();
  const valuesRef = useScrollReveal();

  return (
    <section id="about" className="relative">
      {/* Sticky background transition block */}
      <div
        className="min-h-screen flex items-center py-24 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0f172a 0%, #0c1a2e 50%, #0f172a 100%)",
        }}
      >
        {/* Background detail */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(6,182,212,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(6,182,212,0.5) 1px,transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div ref={titleRef} className="scroll-reveal text-center mb-16">
            <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">
              Who We Are
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-black text-white">
              Built Different.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Built to Last.
              </span>
            </h2>
          </div>

          {/* Two-column */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div ref={col1Ref} className="scroll-reveal">
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                New Era Ventures is a full-service technology company
                headquartered in Lagos Nigeria, built on the belief that
                Africa's digital future starts now. We are a team of developers,
                designers, educators, and strategists who are deeply passionate
                about building things that matter.
              </p>
              <p className="text-gray-400 leading-relaxed mb-6">
                Since our founding, we have partnered with startups,
                enterprises, NGOs, and entrepreneurs across Africa and beyond —
                delivering websites, mobile applications, brand identities, and
                digital marketing solutions that drive real results.
              </p>
              <p className="text-gray-400 leading-relaxed">
                But we do not stop at building for others. We also build the
                next generation of tech talent. Our code education programs have
                trained over 200 students, many of whom now work in leading tech
                companies or run their own ventures.
              </p>
            </div>

            <div ref={col2Ref} className="scroll-reveal grid grid-cols-2 gap-4">
              {[
                {
                  icon: Target,
                  title: "Our Mission",
                  text: "To make world-class technology accessible to African businesses and to grow the next generation of African tech builders.",
                  color: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/20",
                },
                {
                  icon: Eye,
                  title: "Our Vision",
                  text: "To be the most trusted technology partner on the continent — known for quality, integrity, and transformative impact.",
                  color: "from-blue-500/20 to-blue-500/5 border-blue-500/20",
                },
                {
                  icon: Heart,
                  title: "Our Values",
                  text: "Excellence, transparency, community, and continuous learning. We hold ourselves to the highest standards in everything we ship.",
                  color: "from-teal-500/20 to-teal-500/5 border-teal-500/20",
                },
                {
                  icon: Award,
                  title: "Our Promise",
                  text: "Every project we take on is treated like it is our own. We do not ship mediocre work. Period.",
                  color: "from-sky-500/20 to-sky-500/5 border-sky-500/20",
                },
              ].map(({ icon: Icon, title, text, color }) => (
                <div
                  key={title}
                  className={`p-5 rounded-2xl bg-gradient-to-br border ${color} hover:-translate-y-1 transition-transform duration-300`}
                >
                  <Icon size={22} className="text-cyan-400 mb-3" />
                  <h3 className="text-white font-bold text-sm mb-2">{title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Values strip */}
          <div ref={valuesRef} className="scroll-reveal">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Web Development", icon: "🌐" },
                { label: "Mobile Apps", icon: "📱" },
                { label: "Graphic Design", icon: "🎨" },
                { label: "Code Education", icon: "👨‍💻" },
                { label: "SEO & Marketing", icon: "📈" },
                { label: "Cloud Engineering", icon: "☁️" }, // Updated from Cloud & DevOps
                { label: "UI & UX Design", icon: "✏️" },
                { label: "Brand Strategy", icon: "💡" },
                { label: "Cybersecurity", icon: "🛡️" },
                { label: "Virtual Assistant", icon: "👩‍💼" },
                { label: "Project Management", icon: "📋" },
                { label: "Program Management", icon: "🏗️" },
                { label: "IT Support", icon: "🛠️" },
                { label: "AI Automation", icon: "🤖" },
                { label: "Data Analysis", icon: "📊" },
                { label: "Ghostwriting", icon: "✍️" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all duration-200"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-gray-300 text-sm font-medium">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
