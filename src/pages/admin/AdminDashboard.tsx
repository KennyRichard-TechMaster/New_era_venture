import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    team: 0,
    blog: 0,
    products: 0,
    messages: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [team, blog, products, messages] = await Promise.all([
        supabase.from('team_members').select('id', { count: 'exact' }),
        supabase.from('blog_posts').select('id', { count: 'exact' }),
        supabase.from('products').select('id', { count: 'exact' }),
        supabase.from('contact_messages').select('id', { count: 'exact' }),
      ]);
      setStats({
        team: team.count || 0,
        blog: blog.count || 0,
        products: products.count || 0,
        messages: messages.count || 0,
      });
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-black mb-8">Dashboard</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Team Members', value: stats.team, icon: '👥' },
          { label: 'Blog Posts', value: stats.blog, icon: '📝' },
          { label: 'Products', value: stats.products, icon: '📦' },
          { label: 'Messages', value: stats.messages, icon: '💬' },
        ].map(({ label, value, icon }) => (
          <div
            key={label}
            className="p-6 bg-gray-900 border border-white/10 rounded-2xl hover:border-cyan-500/30 transition-all"
          >
            <div className="text-3xl mb-2">{icon}</div>
            <p className="text-gray-400 text-sm">{label}</p>
            <p className="text-3xl font-bold text-white mt-2">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-2xl">
        <h3 className="text-xl font-bold mb-3">Quick Stats</h3>
        <ul className="space-y-2 text-sm text-gray-300">
          <li>✓ Website is live and fully functional</li>
          <li>✓ All sections are managed from this admin panel</li>
          <li>✓ Changes are reflected in real-time across the site</li>
          <li>✓ Database is PostgreSQL via Supabase</li>
          <li>✓ Contact form submissions tracked in database</li>
        </ul>
      </div>
    </div>
  );
}
