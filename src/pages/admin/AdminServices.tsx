import { useState, useEffect } from 'react';
import { supabase, Service } from '../../lib/supabase';
import { X, Plus, CreditCard as Edit2, Trash2 } from 'lucide-react';

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [editing, setEditing] = useState<Service | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: '',
    description: '',
    icon: '',
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data } = await supabase.from('services').select('*').order('display_order');
    if (data) setServices(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editing) {
        await supabase.from('services').update(form).eq('id', editing.id);
      } else {
        await supabase.from('services').insert([form]);
      }
      await fetchServices();
      setShowForm(false);
      setEditing(null);
      setForm({ title: '', description: '', icon: '' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this service?')) {
      await supabase.from('services').delete().eq('id', id);
      await fetchServices();
    }
  };

  const handleEdit = (service: Service) => {
    setEditing(service);
    setForm({
      title: service.title,
      description: service.description,
      icon: service.icon,
    });
    setShowForm(true);
  };

  const lucideIcons = [
    'Globe', 'Smartphone', 'Palette', 'Layers', 'BookOpen', 'TrendingUp', 'Cloud', 'Code2',
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black">Services</h2>
        <button
          onClick={() => {
            setEditing(null);
            setForm({ title: '', description: '', icon: '' });
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
        >
          <Plus size={18} />
          Add Service
        </button>
      </div>

      {showForm && (
        <div className="mb-8 p-6 bg-gray-900 border border-white/10 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">{editing ? 'Edit Service' : 'Add Service'}</h3>
            <button onClick={() => setShowForm(false)} className="p-1 hover:bg-white/10 rounded">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Service Title"
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              required
              className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/40"
            />

            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              rows={4}
              className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/40 resize-none"
            />

            <div>
              <label className="block text-sm text-gray-400 mb-2">Icon (Lucide React)</label>
              <select
                value={form.icon}
                onChange={(e) => setForm((p) => ({ ...p, icon: e.target.value }))}
                className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/40"
              >
                <option value="">Select an icon</option>
                {lucideIcons.map((icon) => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
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
        {services.map((service) => (
          <div key={service.id} className="p-4 bg-gray-900 border border-white/10 rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-bold mb-1">{service.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2">{service.description}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(service)}
                  className="p-2 hover:bg-white/10 rounded transition-colors"
                >
                  <Edit2 size={18} className="text-cyan-400" />
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="p-2 hover:bg-white/10 rounded transition-colors"
                >
                  <Trash2 size={18} className="text-red-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
