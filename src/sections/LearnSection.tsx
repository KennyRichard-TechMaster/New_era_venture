import { useEffect, useRef } from 'react';
import { BookOpen, Code2, Monitor, Smartphone, Server, Database, ArrowRight, CheckCircle } from 'lucide-react';

function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { el.classList.add('revealed'); obs.disconnect(); }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

const tracks = [
  {
    icon: Monitor,
    title: 'Frontend Development',
    duration: '12 weeks',
    level: 'Beginner → Intermediate',
    description: 'Master HTML, CSS, JavaScript, and React. Build beautiful, responsive web interfaces from scratch.',
    topics: ['HTML5 & CSS3', 'JavaScript ES6+', 'React & Hooks', 'Tailwind CSS', 'Version Control (Git)', 'Deployment'],
    color: 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/20',
    badge: 'Most Popular',
  },
  {
    icon: Server,
    title: 'Backend Development',
    duration: '14 weeks',
    level: 'Intermediate → Advanced',
    description: 'Learn Python, Node.js, REST APIs, databases, and server architecture to power real applications.',
    topics: ['Python & Node.js', 'REST & GraphQL APIs', 'PostgreSQL', 'Authentication & Security', 'Cloud Deployment', 'Docker Basics'],
    color: 'from-blue-500/20 to-blue-500/5 border-blue-500/20',
    badge: null,
  },
  {
    icon: Smartphone,
    title: 'Mobile App Dev',
    duration: '10 weeks',
    level: 'Intermediate',
    description: 'Build cross-platform iOS and Android applications with React Native and modern tooling.',
    topics: ['React Native', 'Expo Framework', 'Navigation', 'State Management', 'Native APIs', 'App Store Publishing'],
    color: 'from-teal-500/20 to-teal-500/5 border-teal-500/20',
    badge: null,
  },
  {
    icon: Code2,
    title: 'Full Stack Bootcamp',
    duration: '20 weeks',
    level: 'Beginner → Advanced',
    description: 'The complete journey — from your first HTML tag to deploying full-stack applications. Intensive and career-focused.',
    topics: ['All Frontend tracks', 'All Backend tracks', 'Database design', 'DevOps & CI/CD', 'Portfolio projects', 'Job placement support'],
    color: 'from-sky-500/20 to-sky-500/5 border-sky-500/20',
    badge: 'Complete Package',
  },
];

export default function LearnSection() {
  const titleRef = useScrollReveal();
  const gridRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  return (
    <section id="learn" className="py-24 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        <div className="absolute -bottom-20 right-0 w-96 h-96 rounded-full bg-blue-600/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="scroll-reveal text-center mb-16">
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">
            Code Education
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-black text-white">
            Learn to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Code
            </span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-lg">
            Our structured programs take you from zero to job-ready. Whether you want to
            build apps, land a tech job, or launch your own startup — we will get you there.
          </p>
        </div>

        {/* Why learn with us */}
        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          {[
            { icon: BookOpen, title: 'Structured Curriculum', text: 'Carefully designed learning paths with projects at every stage.' },
            { icon: CheckCircle, title: 'Mentorship Included', text: 'One-on-one sessions with experienced developers, not just pre-recorded videos.' },
            { icon: ArrowRight, title: 'Career Support', text: 'Portfolio reviews, interview prep, and connections to real job opportunities.' },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl">
              <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center shrink-0">
                <Icon size={18} className="text-cyan-400" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm mb-1">{title}</h4>
                <p className="text-gray-400 text-sm">{text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Course tracks */}
        <div ref={gridRef} className="scroll-reveal grid sm:grid-cols-2 gap-6 mb-14">
          {tracks.map((track, i) => {
            const Icon = track.icon;
            return (
              <div
                key={track.title}
                className={`relative p-6 bg-gradient-to-br border rounded-2xl hover:-translate-y-1 transition-all duration-300 ${track.color}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {track.badge && (
                  <span className="absolute top-4 right-4 px-2.5 py-0.5 bg-cyan-500 text-white text-xs font-bold rounded-full">
                    {track.badge}
                  </span>
                )}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <Icon size={22} className="text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{track.title}</h3>
                    <div className="flex gap-3 text-xs text-gray-400 mt-1">
                      <span>{track.duration}</span>
                      <span>·</span>
                      <span>{track.level}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4">{track.description}</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {track.topics.map((topic) => (
                    <div key={topic} className="flex items-center gap-1.5 text-xs text-gray-400">
                      <CheckCircle size={11} className="text-cyan-400 shrink-0" />
                      {topic}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="scroll-reveal text-center">
          <div className="inline-block p-8 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-3xl">
            <Database size={36} className="text-cyan-400 mx-auto mb-4" />
            <h3 className="text-2xl font-black text-white mb-2">Ready to Start?</h3>
            <p className="text-gray-400 mb-6 max-w-sm mx-auto">
              Applications are open for our next cohort. Limited spots available.
            </p>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-cyan-500/30 transition-all hover:-translate-y-1"
            >
              Apply Now <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
