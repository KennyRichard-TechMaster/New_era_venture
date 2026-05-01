import { useEffect, useRef, useState } from 'react';
import { supabase, Service } from '../lib/supabase';
import {
  Globe, Smartphone, Palette, Layers, BookOpen, TrendingUp, Cloud, Code2, ArrowRight,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Globe, Smartphone, Palette, Layers, BookOpen, TrendingUp, Cloud, Code2,
};

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

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);
  const titleRef = useScrollReveal();
  const gridRef = useScrollReveal();

  useEffect(() => {
    supabase
      .from('services')
      .select('*')
      .order('display_order')
      .then(({ data }) => { if (data) setServices(data); });
  }, []);

  return (
    <section id="services" className="py-24 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="scroll-reveal text-center mb-16">
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">
            What We Do
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-black text-white">
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Services
            </span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-lg">
            From concept to launch, we offer end-to-end digital services that help businesses
            grow, innovate, and lead.
          </p>
        </div>

        <div ref={gridRef} className="scroll-reveal grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Globe;
            return (
              <div
                key={service.id}
                className="group relative p-6 bg-gray-800/50 border border-white/10 rounded-2xl hover:border-cyan-500/40 hover:bg-gray-800 transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-600/0 group-hover:from-cyan-500/5 group-hover:to-blue-600/5 transition-all duration-300 rounded-2xl" />
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:from-cyan-500/30 group-hover:to-blue-600/30 transition-all">
                    <Icon size={22} className="text-cyan-400" />
                  </div>
                  <h3 className="text-white font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-cyan-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-cyan-500/30 transition-all hover:-translate-y-1"
          >
            Start a Project <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
