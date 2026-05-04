import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { adminLogout } from "../lib/auth";
import { LogOut, Menu, X } from "lucide-react";
import AdminDashboard from "./admin/AdminDashboard";
import AdminTeam from "./admin/AdminTeam";
import AdminBlog from "./admin/AdminBlog";
import AdminProducts from "./admin/AdminProducts";
import AdminServices from "./admin/AdminServices";
import AdminSettings from "./admin/AdminSettings";

type AdminTab =
  | "dashboard"
  | "team"
  | "blog"
  | "products"
  | "services"
  | "settings";

export default function AdminPanel({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    adminLogout();
    onLogout();
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "team", label: "Team Members", icon: "👥" },
    { id: "blog", label: "Blog Posts", icon: "📝" },
    { id: "products", label: "Products", icon: "📦" },
    { id: "services", label: "Services", icon: "⚙️" },
    { id: "settings", label: "Settings", icon: "⚡" },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-gray-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-xl font-black">NEV Admin</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold hover:bg-white/10 rounded-lg transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static top-16 left-0 h-[calc(100vh-64px)] w-64 bg-gray-900/95 border-r border-white/10 overflow-y-auto transition-all duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <nav className="p-4 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as AdminTab);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? "bg-cyan-500/20 border border-cyan-500/40 text-cyan-400"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 sm:p-8 overflow-auto">
          {activeTab === "dashboard" && <AdminDashboard />}
          {activeTab === "team" && <AdminTeam />}
          {activeTab === "blog" && <AdminBlog />}
          {activeTab === "products" && <AdminProducts />}
          {activeTab === "services" && <AdminServices />}
          {activeTab === "settings" && <AdminSettings />}
        </main>
      </div>
    </div>
  );
}
