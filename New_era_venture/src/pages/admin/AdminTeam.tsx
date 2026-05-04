import { useState, useEffect } from 'react';
import { supabase, TeamMember } from '../../lib/supabase';
import { X, Plus, CreditCard as Edit2, Trash2 } from 'lucide-react';

export default function AdminTeam() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    role: '',
    bio: '',
    headshot_url: '',
    candid_url: '',
    github_url: '',
    linkedin_url: '',
    website_url: '',
    whatsapp: '',
    twitter_url: '',
    repo_url: '',
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const { data } = await supabase.from('team_members').select('*').order('display_order');
    if (data) setMembers(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editing) {
        await supabase.from('team_members').update(form).eq('id', editing.id);
      } else {
        await supabase.from('team_members').insert([form]);
      }
      await fetchMembers();
      setShowForm(false);
      setEditing(null);
      setForm({
        name: '',
        role: '',
        bio: '',
        headshot_url: '',
        candid_url: '',
        github_url: '',
        linkedin_url: '',
        website_url: '',
        whatsapp: '',
        twitter_url: '',
        repo_url: '',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this team member?')) {
      await supabase.from('team_members').delete().eq('id', id);
      await fetchMembers();
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditing(member);
    setForm({
      name: member.name,
      role: member.role,
      bio: member.bio,
      headshot_url: member.headshot_url,
      candid_url: member.candid_url,
      github_url: member.github_url,
      linkedin_url: member.linkedin_url,
      website_url: member.website_url,
      whatsapp: member.whatsapp,
      twitter_url: member.twitter_url,
      repo_url: member.repo_url,
    });
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black">Team Members</h2>
        <button
          onClick={() => {
            setEditing(null);
            setForm({
              name: '',
              role: '',
              bio: '',
              headshot_url: '',
              candid_url: '',
              github_url: '',
              linkedin_url: '',
              website_url: '',
              whatsapp: '',
              twitter_url: '',
              repo_url: '',
            });
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
        >
          <Plus size={18} />
          Add Member
        </button>
      </div>

      {showForm && (
        <div className="mb-8 p-6 bg-gray-900 border border-white/10 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">{editing ? 'Edit Member' : 'Add Member'}</h3>
            <button onClick={() => setShowForm(false)} className="p-1 hover:bg-white/10 rounded">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                required
                className="px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/40"
              />
              <input
                type="text"
                placeholder="Role"
                value={form.role}
                onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
                required
                className="px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/40"
              />
            </div>

            <textarea
              placeholder="Bio"
              value={form.bio}
              onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/40 resize-none"
            />

            <div className="text-xs font-semibold text-gray-400 mb-2">Image URLs (Pexels recommended)</div>
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="url"
                placeholder="Headshot URL"
                value={form.headshot_url}
                onChange={(e) => setForm((p) => ({ ...p, headshot_url: e.target.value }))}
                className="px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/40"
              />
              <input
                type="url"
                placeholder="Candid/Action URL"
                value={form.candid_url}
                onChange={(e) => setForm((p) => ({ ...p, candid_url: e.target.value }))}
                className="px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/40"
              />
            </div>

            <div className="text-xs font-semibold text-gray-400 mb-2">Social Links</div>
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="url"
                placeholder="GitHub URL"
                value={form.github_url}
                onChange={(e) => setForm((p) => ({ ...p, github_url: e.target.value }))}
                className="px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/40"
              />
              <input
                type="url"
                placeholder="LinkedIn URL"
                value={form.linkedin_url}
                onChange={(e) => setForm((p) => ({ ...p, linkedin_url: e.target.value }))}
                className="px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/40"
              />
              <input
                type="url"
                placeholder="Website URL"
                value={form.website_url}
                onChange={(e) => setForm((p) => ({ ...p, website_url: e.target.value }))}
                className="px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/40"
              />
              <input
                type="text"
                placeholder="WhatsApp (e.g., 1234567890)"
                value={form.whatsapp}
                onChange={(e) => setForm((p) => ({ ...p, whatsapp: e.target.value }))}
                className="px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/40"
              />
              <input
                type="url"
                placeholder="Twitter URL"
                value={form.twitter_url}
                onChange={(e) => setForm((p) => ({ ...p, twitter_url: e.target.value }))}
                className="px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/40"
              />
              <input
                type="url"
                placeholder="Portfolio/Repo URL"
                value={form.repo_url}
                onChange={(e) => setForm((p) => ({ ...p, repo_url: e.target.value }))}
                className="px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/40"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {members.map((member) => (
          <div key={member.id} className="p-4 bg-gray-900 border border-white/10 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-4">
              {member.headshot_url && (
                <img
                  src={member.headshot_url}
                  alt={member.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
              )}
              <div>
                <p className="font-bold">{member.name}</p>
                <p className="text-sm text-gray-400">{member.role}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(member)}
                className="p-2 hover:bg-white/10 rounded transition-colors"
              >
                <Edit2 size={18} className="text-cyan-400" />
              </button>
              <button
                onClick={() => handleDelete(member.id)}
                className="p-2 hover:bg-white/10 rounded transition-colors"
              >
                <Trash2 size={18} className="text-red-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
