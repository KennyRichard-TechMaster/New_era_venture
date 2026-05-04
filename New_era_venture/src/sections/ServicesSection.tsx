import { useEffect, useState } from "react";
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

const serviceDetails: Record<
  string,
  { summary: string; features: string[]; image: string }
> = {
  "Web Development": {
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072",
    summary:
      "We engineer high-performance web architectures using React, Django, and PostgreSQL. Our systems are built for 99.9% uptime and sub-second latency.",
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
      "From iOS to Android, we build native-feel mobile experiences. Our focus is on smooth animations, intuitive gestures, and robust offline capabilities.",
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
      "As an Audit-led firm, we perform forensic security checks on your infrastructure to identify vulnerabilities before they are exploited.",
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
      "Integrate intelligence into your workflow. We build custom AI models that automate repetitive tasks and provide deep data insights.",
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
      "Future-proof your infrastructure with scalable cloud solutions. We automate your deployment cycle with CI/CD pipelines.",
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
      "We bridge the gap between aesthetics and utility. Our user-centric design approach focuses on high conversion rates.",
    features: [
      "Visual Identity Systems",
      "Interactive Prototypes",
      "Conversion Rate Optimization",
      "Accessibility-First Design",
    ],
  },
  "API Integration & Backend": {
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=2070",
    summary:
      "The backbone of any modern app is its data flow. We build secure, RESTful and GraphQL APIs that connect your front-end seamlessly.",
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
      "Streamline your entire business operations with custom Enterprise Resource Planning software integrating finance and HR.",
    features: [
      "Automated Financial Reporting",
      "Inventory Management Systems",
      "Multi-department Synergy",
      "Real-time Audit Trails",
    ],
  },
};

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedService]);

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
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            World-Class <span className="text-cyan-400">Digital Solutions</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-lg">
            Engineering excellence for global teams. We build the architecture
            that drives innovation.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Globe;
            return (
              <div
                key={service.id}
                onClick={() => setSelectedService(service)}
                className="group p-6 bg-gray-900 border border-white/5 rounded-2xl hover:border-cyan-500/40 transition-all cursor-pointer flex flex-col h-full"
              >
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon size={22} className="text-cyan-400" />
                </div>
                <h3 className="text-white font-bold mb-2">{service.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-grow">
                  {service.description}
                </p>
                <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                  Learn More <ArrowRight size={14} />
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- RESPONSIVE MODAL SYSTEM --- */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
            onClick={() => setSelectedService(null)}
          />

          <div className="relative w-full max-w-4xl max-h-[90vh] bg-gray-900 border border-white/10 rounded-2xl sm:rounded-[2rem] overflow-y-auto shadow-2xl animate-in zoom-in duration-300 scrollbar-hide">
            {/* Close Button */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 z-30 bg-black/50 p-2.5 rounded-full text-white hover:bg-cyan-500 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="grid md:grid-cols-2 h-full">
              {/* Image Section */}
              <div className="relative aspect-video md:aspect-auto md:h-full overflow-hidden border-b md:border-b-0 md:border-r border-white/10">
                <img
                  src={
                    serviceDetails[selectedService.title]?.image ||
                    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b"
                  }
                  alt={selectedService.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-gray-900/10" />
              </div>

              {/* Content Section */}
              <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-cyan-500/20 rounded-xl hidden sm:block">
                    {(() => {
                      const Icon = iconMap[selectedService.icon] || Globe;
                      return <Icon size={24} className="text-cyan-400" />;
                    })()}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                    {selectedService.title}
                  </h3>
                </div>

                <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8">
                  {serviceDetails[selectedService.title]?.summary ||
                    selectedService.description}
                </p>

                <div className="space-y-3 mb-8">
                  {(serviceDetails[selectedService.title]?.features || []).map(
                    (feature, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 text-white"
                      >
                        <CheckCircle2
                          size={18}
                          className="text-cyan-400 shrink-0 mt-0.5"
                        />
                        <span className="text-sm font-medium text-gray-200">
                          {feature}
                        </span>
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
                  className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-black rounded-xl transition-all uppercase tracking-widest text-xs shadow-lg shadow-cyan-500/20"
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
