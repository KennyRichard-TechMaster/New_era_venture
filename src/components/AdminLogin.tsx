import React, { useState } from "react";
import { Lock, User, ShieldCheck, Zap } from "lucide-react";
import { useSiteSettings } from "../context/SiteContext";

export default function AdminLogin({
  setIsAdmin,
}: {
  setIsAdmin: (val: boolean) => void;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { settings } = useSiteSettings();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Your dual-credential logic
    if (
      (username === "Newerateam" && password === "55019") ||
      (username === "kenny" && password === "1234richard")
    ) {
      localStorage.setItem("nev_admin_auth", "true");
      setIsAdmin(true);
      setError("");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-gray-950 px-4">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />

      <div className="w-full max-w-md relative">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          {settings.logo_url ? (
            <img
              src={settings.logo_url}
              alt="Logo"
              className="h-16 w-auto mb-4"
            />
          ) : (
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-cyan-500/20 mb-4">
              <Zap size={32} className="text-white" />
            </div>
          )}
          <h2 className="text-2xl font-black text-white tracking-tight uppercase text-center">
            {settings.company_name || "NEW ERA VENTURES"}
          </h2>
          <p className="text-gray-400 text-sm mt-1">Admin Access Control</p>
        </div>

        {/* Login Card */}
        <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 ml-1">
                Username
              </label>
              <div className="relative group">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-500 transition-colors"
                  size={18}
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-gray-800/50 border border-white/5 text-white pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 ml-1">
                Password
              </label>
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-500 transition-colors"
                  size={18}
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-800/50 border border-white/5 text-white pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20 animate-shake">
                <ShieldCheck size={16} />
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all active:scale-[0.98] mt-2 flex items-center justify-center gap-2"
            >
              Sign In to Dashboard
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-gray-500 text-xs tracking-widest uppercase">
          &copy; {new Date().getFullYear()} New Era Ventures. Secure
          Environment.
        </p>
      </div>
    </div>
  );
}
