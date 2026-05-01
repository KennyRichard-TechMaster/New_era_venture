import { useEffect, useRef, useState } from 'react';
import { supabase, TeamMember } from '../lib/supabase';
import { Github, Linkedin, Globe, MessageCircle, Twitter, ExternalLink } from 'lucide-react';

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

type MemberCardProps = {
  member: TeamMember;
  onInfo: (m: TeamMember) => void;
};

function MemberCard({ member, onInfo }: MemberCardProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="group relative bg-gray-800/50 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-2"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image container */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={member.headshot_url || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'}
          alt={member.name}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
            hovered ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
          }`}
        />
        <img
          src={member.candid_url || member.headshot_url || 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=400'}
          alt={`${member.name} in action`}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
            hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="text-white font-bold text-lg">{member.name}</h3>
        <p className="text-cyan-400 text-sm font-medium mb-4">{member.role}</p>

        <button
          onClick={() => onInfo(member)}
          className="w-full py-2.5 border border-cyan-500/40 text-cyan-400 text-sm font-semibold rounded-xl hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/30"
        >
          Info
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
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-gray-900 border border-white/10 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header image */}
        <div className="relative h-56 overflow-hidden rounded-t-3xl">
          <img
            src={member.headshot_url || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'}
            alt={member.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-gray-900/80 text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
          >
            ×
          </button>
        </div>

        <div className="p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-black text-white">{member.name}</h2>
            <p className="text-cyan-400 font-medium">{member.role}</p>
          </div>

          {member.bio && (
            <p className="text-gray-300 leading-relaxed mb-6">{member.bio}</p>
          )}

          {/* Links */}
          <div className="flex flex-wrap gap-3">
            {member.github_url && (
              <a
                href={member.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white rounded-xl text-sm transition-colors"
              >
                <Github size={16} /> GitHub
              </a>
            )}
            {member.linkedin_url && (
              <a
                href={member.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 hover:text-white rounded-xl text-sm transition-colors"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
            )}
            {member.website_url && (
              <a
                href={member.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-teal-600/20 hover:bg-teal-600/40 text-teal-400 hover:text-white rounded-xl text-sm transition-colors"
              >
                <Globe size={16} /> Website
              </a>
            )}
            {member.twitter_url && (
              <a
                href={member.twitter_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-sky-600/20 hover:bg-sky-600/40 text-sky-400 hover:text-white rounded-xl text-sm transition-colors"
              >
                <Twitter size={16} /> Twitter
              </a>
            )}
            {member.whatsapp && (
              <a
                href={`https://wa.me/${member.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-green-600/20 hover:bg-green-600/40 text-green-400 hover:text-white rounded-xl text-sm transition-colors"
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
            )}
            {member.repo_url && (
              <a
                href={member.repo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-cyan-600/20 hover:bg-cyan-600/40 text-cyan-400 hover:text-white rounded-xl text-sm transition-colors"
              >
                <ExternalLink size={16} /> Portfolio / Repo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioSection() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [selected, setSelected] = useState<TeamMember | null>(null);
  const titleRef = useScrollReveal();
  const gridRef = useScrollReveal();

  useEffect(() => {
    supabase
      .from('team_members')
      .select('*')
      .order('display_order')
      .then(({ data }) => { if (data) setMembers(data); });
  }, []);

  return (
    <section id="portfolio" className="py-24 bg-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="scroll-reveal text-center mb-4">
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">
            Meet the Team
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-black text-white">
            The{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Family
            </span>
          </h2>
        </div>

        {/* Dynamic animated subtitle */}
        <div className="text-center mb-14">
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Five specialists. One unified vision. We are not just colleagues — we are a
            family that builds together, learns together, and wins together.
          </p>
        </div>

        <div ref={gridRef} className="scroll-reveal grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {members.map((member, i) => (
            <div
              key={member.id}
              style={{ transitionDelay: `${i * 80}ms` }}
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
