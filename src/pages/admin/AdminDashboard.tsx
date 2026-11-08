import { useEffect, useMemo, useState } from "react";
import { getInquiries } from "../../lib/siteStorage";

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState(getInquiries());

  useEffect(() => {
    const sync = () => setInquiries(getInquiries());
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const stats = useMemo(() => {
    return {
      total: inquiries.length,
      newCount: inquiries.filter((item) => item.status === "new").length,
      readCount: inquiries.filter((item) => item.status === "read").length,
      repliedCount: inquiries.filter((item) => item.status === "replied")
        .length,
    };
  }, [inquiries]);

  const cards = [
    { label: "Total enquiries", value: stats.total, icon: "💬" },
    { label: "New", value: stats.newCount, icon: "✦" },
    { label: "Read", value: stats.readCount, icon: "👀" },
    { label: "Replied", value: stats.repliedCount, icon: "✅" },
  ];

  return (
    <div>
      <h2 className="mb-8 text-3xl font-black text-white">Dashboard</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ label, value, icon }) => (
          <div
            key={label}
            className="rounded-2xl border border-white/10 bg-gray-900 p-6 transition-all hover:border-cyan-500/30"
          >
            <div className="mb-2 text-3xl">{icon}</div>
            <p className="text-sm text-gray-400">{label}</p>
            <p className="mt-2 text-3xl font-bold text-white">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 p-6">
        <h3 className="mb-3 text-xl font-bold text-white">Quick overview</h3>
        <ul className="space-y-2 text-sm text-gray-300">
          <li>
            ✓ Local storage is active and secure for this client dashboard.
          </li>
          <li>
            ✓ Each inquiry includes full client details, timestamp, and service
            info.
          </li>
          <li>
            ✓ Admin can mark messages as read or replied without external
            dependencies.
          </li>
          <li>
            ✓ The public site and admin panel remain fully functional for client
            requests.
          </li>
        </ul>
      </div>
    </div>
  );
}
