import { useEffect, useRef, useState } from "react";
import { supabase, TeamMember } from "../lib/supabase";
import {
  Github,
  Linkedin,
  Globe,
  MessageCircle,
  ExternalLink,
  RefreshCw,
  X,
} from "lucide-react";

/**
 * Hook to handle scroll-in animations
 */
function useScrollReveal(threshold = 0.1) {
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

type MemberCardProps = {
  member: TeamMember;
  onInfo: (m: TeamMember) => void;
};

/**
 * Card component with mobile-friendly touch toggle for candid images
 */
function MemberCard({ member, onInfo }: MemberCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="group relative bg-gray-900/40 border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/40 transition-all duration-500 hover:-translate-y-2 shadow-xl"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={
            member.headshot_url ||
            "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"
          }
          alt={member.name}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
            isFlipped ? "opacity-0 scale-110" : "opacity-100 scale-100"
          }`}
        />
        <img
          src={
            member.candid_url ||
            member.headshot_url ||
            "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=400"
          }
          alt={`${member.name} candid`}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
            isFlipped ? "opacity-100 scale-100" : "opacity-0 scale-110"
          }`}
        />

        <div className="absolute top-3 right-3 md:hidden bg-black/40 backdrop-blur-md p-2 rounded-full text-white/70">
          <RefreshCw
            size={14}
            className={`${isFlipped ? "rotate-180" : ""} transition-transform duration-500`}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-80" />
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="text-white font-bold text-base sm:text-lg truncate">
          {member.name}
        </h3>
        <p className="text-cyan-400 text-xs sm:text-sm font-medium mb-4 truncate uppercase tracking-wider">
          {member.role}
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onInfo(member);
          }}
          className="w-full py-2.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold rounded-xl hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all active:scale-95 shadow-lg shadow-cyan-500/5"
        >
          View Full Profile
        </button>
      </div>
    </div>
  );
}

type MemberModalProps = {
  member: TeamMember;
  onClose: () => void;
};

function MemberModal({ member, onClose }: MemberModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="relative bg-gray-900 border-t sm:border border-white/10 rounded-t-[2.5rem] sm:rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom sm:zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-20 flex justify-end p-4 sm:absolute sm:top-6 sm:right-6">
          <button
            onClick={onClose}
            className="w-10 h-10 bg-gray-800/90 text-white rounded-full flex items-center justify-center hover:bg-cyan-500 transition-all shadow-xl border border-white/5"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6 pb-12 pt-2 sm:p-10">
          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start mb-8 text-center sm:text-left">
            <div className="w-32 h-32 sm:w-40 sm:h-40 shrink-0 rounded-[2rem] overflow-hidden border-2 border-cyan-500/20 shadow-2xl shadow-cyan-500/10">
              <img
                src={member.headshot_url}
                className="w-full h-full object-cover"
                alt={member.name}
              />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-black text-white mb-1 tracking-tight">
                {member.name}
              </h2>
              <p className="text-cyan-400 text-lg font-semibold mb-5">
                {member.role}
              </p>

              <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                {member.github_url && (
                  <a
                    href={member.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all"
                  >
                    <Github size={18} />
                  </a>
                )}
                {member.linkedin_url && (
                  <a
                    href={member.linkedin_url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 bg-[#0077b5]/10 hover:bg-[#0077b5]/20 rounded-xl text-[#0077b5] transition-all"
                  >
                    <Linkedin size={18} />
                  </a>
                )}
                {member.whatsapp && (
                  <a
                    href={`https://wa.me/${member.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 bg-green-500/10 hover:bg-green-500/20 rounded-xl text-green-500 transition-all"
                  >
                    <MessageCircle size={18} />
                  </a>
                )}
                {member.website_url && (
                  <a
                    href={member.website_url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 bg-cyan-500/10 hover:bg-cyan-500/20 rounded-xl text-cyan-400 transition-all"
                  >
                    <Globe size={18} />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-cyan-500/20 rounded-full hidden sm:block" />
              <h4 className="text-white font-bold uppercase tracking-[0.2em] text-xs mb-4 opacity-40">
                Professional Biography
              </h4>
              <p className="text-gray-300 leading-relaxed text-base">
                {member.bio || "No biography provided."}
              </p>
            </div>

            {member.repo_url && (
              <a
                href={member.repo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl group transition-all hover:border-cyan-500/50"
              >
                <div className="flex items-center gap-3">
                  <ExternalLink size={20} className="text-cyan-400" />
                  <span className="text-white font-bold text-sm">
                    View Portfolio / Major Repository
                  </span>
                </div>
                <RefreshCw
                  size={16}
                  className="text-cyan-400 group-hover:rotate-180 transition-transform duration-700"
                />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioSection() {
  // FIXED: State initialization was missing in previous response
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [selected, setSelected] = useState<TeamMember | null>(null);

  const titleRef = useScrollReveal();
  const gridRef = useScrollReveal();

  useEffect(() => {
    async function fetchMembers() {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) {
        console.error("Error fetching team members:", error);
      } else if (data) {
        setMembers(data);
      }
    }
    fetchMembers();
  }, []);

  return (
    <section
      id="portfolio"
      className="py-24 bg-gray-950 relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={titleRef} className="scroll-reveal text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-cyan-500/10 rounded-full text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 border border-cyan-500/20">
            Meet the Core
          </span>
          <h2 className="text-4xl sm:text-6xl font-black text-white leading-tight">
            The{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Family
            </span>
          </h2>
          <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Collaborating with expert minds to turn complex challenges into
            seamless digital realities. Every pixel and line of code is driven
            by our shared passion.
          </p>
        </div>

        <div
          ref={gridRef}
          className="scroll-reveal grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8"
        >
          {members.map((member, i) => (
            <div
              key={member.id}
              style={{ transitionDelay: `${i * 100}ms` }}
              className="w-full"
            >
              <MemberCard member={member} onInfo={setSelected} />
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <MemberModal member={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
