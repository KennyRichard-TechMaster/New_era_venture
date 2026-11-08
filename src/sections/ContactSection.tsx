import { useRef, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Mail, MapPin, Phone, Send, MessageSquare } from "lucide-react";
import { useSiteSettings } from "../context/SiteContext";

function useScrollReveal<T extends HTMLElement>(threshold = 0.1) {
  const ref = useRef<T | null>(null);
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

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const titleRef = useScrollReveal<HTMLDivElement>();
  const formRef = useScrollReveal<HTMLFormElement>();
  const infoRef = useScrollReveal<HTMLDivElement>();
  const { settings } = useSiteSettings();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const { error } = await supabase
        .from("contact_messages")
        .insert([formData]);
      if (error) throw error;
      setStatus("success");
      setMessage("Message sent! We will get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setMessage("Error sending message. Please try again.");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 bg-gray-950 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        <div className="absolute -top-40 left-0 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-blue-600/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="scroll-reveal text-center mb-16">
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">
            Get in Touch
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-black text-white">
            Let's{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Connect
            </span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Have a project in mind? Want to learn to code? Just want to say hi?
            Drop us a message and we will respond within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {/* Contact info */}
          <div ref={infoRef} className="scroll-reveal space-y-6">
            {[
              {
                icon: Mail,
                label: "Email",
                value: settings.contact_email || "hello@neweraventures.com",
                href: `mailto:${settings.contact_email || "hello@neweraventures.com"}`,
              },
              {
                icon: Phone,
                label: "Phone",
                value: settings.contact_phone || "+1 (555) 000-0000",
                href: `tel:${settings.contact_phone || "+1 (555) 000-0000"}`,
              },
              {
                icon: MapPin,
                label: "Location",
                value:
                  settings.contact_address ||
                  "123 Innovation Drive, Tech City, TC 00000",
                href: "#",
              },
            ].map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all group"
              >
                <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-cyan-500/20 transition-colors">
                  <Icon size={18} className="text-cyan-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">
                    {label}
                  </p>
                  <p className="text-white font-medium">{value}</p>
                </div>
              </a>
            ))}

            {/* Social links */}
            <div className="pt-4">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">
                Follow Us
              </p>
              <div className="flex gap-2">
                {[
                  { label: "Twitter", url: settings.social_twitter },
                  { label: "LinkedIn", url: settings.social_linkedin },
                  { label: "GitHub", url: settings.social_github },
                  { label: "Instagram", url: settings.social_instagram },
                ].map(
                  ({ label, url }) =>
                    url && (
                      <a
                        key={label}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all"
                        title={label}
                      >
                        {label[0]}
                      </a>
                    ),
                )}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <form
            ref={formRef}
            className="scroll-reveal lg:col-span-2 p-8 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-3xl"
            onSubmit={handleSubmit}
          >
            <div className="grid sm:grid-cols-2 gap-5 mb-5">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/40 focus:bg-cyan-500/5 transition-all"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/40 focus:bg-cyan-500/5 transition-all"
              />
            </div>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/40 focus:bg-cyan-500/5 transition-all mb-5"
            />
            <textarea
              name="message"
              placeholder="Your message..."
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/40 focus:bg-cyan-500/5 transition-all resize-none mb-5"
            />

            {message && (
              <div
                className={`p-3 rounded-lg text-sm mb-5 ${
                  status === "success"
                    ? "bg-green-500/10 border border-green-500/30 text-green-400"
                    : "bg-red-500/10 border border-red-500/30 text-red-400"
                }`}
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>

        {/* FAQ */}
        <div className="mt-20 grid sm:grid-cols-2 gap-6">
          {[
            {
              q: "How long does a typical project take?",
              a: "Project timelines vary. Web projects typically take 4-8 weeks, while custom apps may take 3-6 months. We provide detailed timelines during consultation.",
            },
            {
              q: "Do you offer ongoing support?",
              a: "Yes! We offer maintenance, support, and enhancement packages to ensure your product stays secure and up-to-date.",
            },
            {
              q: "Can I join your code programs?",
              a: "Absolutely. We enroll students year-round with cohorts starting monthly. Limited spots per cohort to ensure quality mentorship.",
            },
            {
              q: "What is your pricing?",
              a: "Pricing depends on project scope and complexity. We provide free initial consultations and transparent quotes with no hidden fees.",
            },
          ].map(({ q, a }) => (
            <div
              key={q}
              className="p-5 bg-white/5 border border-white/10 rounded-xl hover:border-cyan-500/40 transition-all"
            >
              <div className="flex gap-3 mb-3">
                <MessageSquare
                  size={18}
                  className="text-cyan-400 shrink-0 mt-0.5"
                />
                <h4 className="text-white font-bold">{q}</h4>
              </div>
              <p className="text-gray-400 text-sm ml-9">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
