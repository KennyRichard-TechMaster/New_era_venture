import { useEffect, useRef, useState } from "react";
import { supabase, Service } from "../lib/supabase";
import {
  Globe,
  Smartphone,
  Palette,
  Layers,
  BookOpen,
  TrendingUp,
  Cloud,
  Code2,
  ArrowRight,
  X,
  ShieldCheck,
  Cpu,
  Database,
  Briefcase,
  CheckCircle2,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Smartphone,
  Palette,
  Layers,
  BookOpen,
  TrendingUp,
  Cloud,
  Code2,
  ShieldCheck,
  Cpu,
  Database,
  Briefcase,
};

// Expanded professional details with 4K Image URLs
const serviceDetails: Record<
  string,
  { summary: string; features: string[]; image: string }
> = {
  "Web Development": {
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072",
    summary:
      "We engineer high-performance web architectures using React, Django, and PostgreSQL. Our systems are built for 99.9% uptime and sub-second latency, ensuring your digital presence is as fast as it is beautiful.",
    features: [
      "Custom Enterprise CRM Systems",
      "Progressive Web Apps (PWA)",
      "High-Performance API Integration",
      "SEO-Optimized Architectures",
    ],
  },
  "Mobile App Development": {
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=2070",
    summary:
      "From iOS to Android, we build native-feel mobile experiences. Our focus is on smooth animations, intuitive gestures, and robust offline capabilities to keep your users engaged anywhere.",
    features: [
      "React Native Cross-Platform power",
      "Biometric Security Integration",
      "Real-time Push Architecture",
      "In-App Commerce Solutions",
    ],
  },
  "Cybersecurity Audits": {
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070",
    summary:
      "As an Audit-led firm, we perform forensic security checks on your infrastructure. We identify vulnerabilities before they are exploited, ensuring your intellectual property remains impenetrable.",
    features: [
      "Penetration Testing",
      "End-to-End Encryption Protocols",
      "Compliance & Risk Management",
      "Vulnerability Assessments",
    ],
  },
  "AI & Machine Learning": {
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2070",
    summary:
      "Integrate intelligence into your workflow. We build custom AI models that automate repetitive tasks, predict market trends, and provide deep data insights for smarter decision making.",
    features: [
      "Predictive Analytics Models",
      "Natural Language Processing (NLP)",
      "Automated Process Discovery",
      "Computer Vision Systems",
    ],
  },
  "Cloud & DevOps": {
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072",
    summary:
      "Future-proof your infrastructure with scalable cloud solutions. We automate your deployment cycle with CI/CD pipelines, reducing manual errors and increasing release velocity.",
    features: [
      "Docker & Kubernetes Management",
      "AWS/Azure Optimization",
      "Automated Disaster Recovery",
      "Microservices Architecture",
    ],
  },
  "UI/UX Design": {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF0HmNHNZrZYMwA2gU_UgmQe9hgQHBsVuIzg&s",
    summary:
      "We bridge the gap between aesthetics and utility. Our user-centric design approach focuses on high conversion rates and zero cognitive friction for your customers.",
    features: [
      "Visual Identity Systems",
      "Interactive Prototypes",
      "Conversion Rate Optimization",
      "Accessibility-First Design",
    ],
  },
  "API Integration & Backend": {
    image:
      "data:image/jpeg;base64,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",
    summary:
      "The backbone of any modern app is its data flow. We build secure, RESTful and GraphQL APIs that connect your front-end seamlessly to your complex back-end logic.",
    features: [
      "Scalable Database Design",
      "Third-Party API Hooking",
      "High-Speed Data Processing",
      "JWT & OAuth Authentication",
    ],
  },
  "Enterprise ERP Solutions": {
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2015",
    summary:
      "Streamline your entire business operations with custom Enterprise Resource Planning software. We integrate finance, HR, and supply chain into one unified dashboard.",
    features: [
      "Automated Financial Reporting",
      "Inventory Management Systems",
      "Multi-department Synergy",
      "Real-time Audit Trails",
    ],
  },
};

// ... keep useScrollReveal hook ...

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    supabase
      .from("services")
      .select("*")
      .order("display_order")
      .then(({ data }) => {
        if (data) setServices(data);
      });
  }, []);

  return (
    <section id="services" className="py-24 bg-gray-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            World-Class <span className="text-cyan-400">Digital Solutions</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-lg">
            Engineering excellence for global teams. We build the architecture
            that drives innovation.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 scroll-reveal">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Globe;
            return (
              <div
                key={service.id}
                onClick={() => setSelectedService(service)}
                className="group p-6 bg-gray-900 border border-white/5 rounded-2xl hover:border-cyan-500/40 transition-all cursor-pointer"
              >
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={22} className="text-cyan-400" />
                </div>
                <h3 className="text-white font-bold mb-2">{service.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                  {service.description}
                </p>
                <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  Learn More <ArrowRight size={14} />
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- ADVANCED MODAL SYSTEM --- */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedService(null)}
          />

          <div className="relative w-full max-w-4xl bg-gray-900 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl animate-in zoom-in duration-300">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-6 right-6 z-20 bg-black/50 p-2 rounded-full text-white hover:bg-cyan-500 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="grid md:grid-cols-2">
              {/* Left Side: Professional Imagery */}
              <div className="relative h-64 md:h-full overflow-hidden">
                <img
                  src={
                    serviceDetails[selectedService.title]?.image ||
                    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b"
                  }
                  alt={selectedService.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
              </div>

              {/* Right Side: Detailed Content */}
              <div className="p-8 md:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-cyan-500/20 rounded-xl">
                    {(() => {
                      const Icon = iconMap[selectedService.icon] || Globe;
                      return <Icon size={24} className="text-cyan-400" />;
                    })()}
                  </div>
                  <h3 className="text-3xl font-black text-white">
                    {selectedService.title}
                  </h3>
                </div>

                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  {serviceDetails[selectedService.title]?.summary ||
                    selectedService.description}
                </p>

                <div className="space-y-4 mb-8">
                  {(serviceDetails[selectedService.title]?.features || []).map(
                    (feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 text-white"
                      >
                        <CheckCircle2
                          size={18}
                          className="text-cyan-400 shrink-0"
                        />
                        <span className="text-sm font-medium">{feature}</span>
                      </div>
                    ),
                  )}
                </div>

                <button
                  onClick={() => {
                    setSelectedService(null);
                    document
                      .querySelector("#contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-black rounded-xl transition-all uppercase tracking-widest text-xs"
                >
                  Book Professional Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
