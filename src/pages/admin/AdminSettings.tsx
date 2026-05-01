import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

export default function AdminSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const settingKeys = [
    { key: 'company_name', label: 'Company Name', icon: Globe },
    { key: 'company_tagline', label: 'Tagline', icon: Globe },
    { key: 'contact_email', label: 'Contact Email', icon: Mail },
    { key: 'contact_phone', label: 'Contact Phone', icon: Phone },
    { key: 'contact_address', label: 'Contact Address', icon: MapPin },
    { key: 'logo_url', label: 'Logo URL', icon: Globe },
    { key: 'social_twitter', label: 'Twitter URL', icon: Globe },
    { key: 'social_linkedin', label: 'LinkedIn URL', icon: Globe },
    { key: 'social_github', label: 'GitHub URL', icon: Globe },
    { key: 'social_instagram', label: 'Instagram URL', icon: Globe },
  ];

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data } = await supabase.from('site_settings').select('key, value');
    if (data) {
      const map: Record<string, string> = {};
      data.forEach((row) => { map[row.key] = row.value ?? ''; });
      setSettings(map);
    }
  };

  const handleChange = (key: string, value: string) => {
    setSettings((p) => ({ ...p, [key]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      for (const [key, value] of Object.entries(settings)) {
        await supabase
          .from('site_settings')
          .update({ value })
          .eq('key', key);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-8">Site Settings</h2>

      {saved && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg">
          ✓ Settings saved successfully
        </div>
      )}

      <div className="max-w-2xl space-y-6">
        <div className="p-6 bg-gray-900 border border-white/10 rounded-2xl">
          <h3 className="text-lg font-bold mb-4">Company Information</h3>
          <div className="space-y-4">
            {settingKeys.slice(0, 3).map(({ key, label }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
                <input
                  type="text"
                  value={settings[key] || ''}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/40"
                />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Logo URL</label>
              <input
                type="url"
                value={settings.logo_url || ''}
                onChange={(e) => handleChange('logo_url', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/40"
                placeholder="Leave empty for default logo"
              />
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-900 border border-white/10 rounded-2xl">
          <h3 className="text-lg font-bold mb-4">Contact Information</h3>
          <div className="space-y-4">
            {settingKeys.slice(3, 6).map(({ key, label }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
                <input
                  type="text"
                  value={settings[key] || ''}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/40"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-gray-900 border border-white/10 rounded-2xl">
          <h3 className="text-lg font-bold mb-4">Social Media Links</h3>
          <div className="space-y-4">
            {settingKeys.slice(6).map(({ key, label }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
                <input
                  type="url"
                  value={settings[key] || ''}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/40"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 disabled:opacity-50 transition-all"
        >
          {loading ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}
