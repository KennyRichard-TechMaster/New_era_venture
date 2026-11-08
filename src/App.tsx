import { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import { isAdminLoggedIn } from "./lib/auth";
import logoImage from "../logo.png";
import Navbar from "./components/Navbar";
import AIAssistant from "./components/AIAssistant";
import AdminLogin from "./components/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import {
  AboutPage,
  BlogPage,
  ContactPage,
  HomePage,
  LearnPage,
  PortfolioPage,
  ProductsPage,
  ServicesPage,
} from "./pages/WebsitePages";

export default function App() {
  const [isAdmin, setIsAdmin] = useState(isAdminLoggedIn());
  const location = useLocation();

  useEffect(() => {
    const checkAdmin = () => setIsAdmin(isAdminLoggedIn());
    window.addEventListener("storage", checkAdmin);
    return () => window.removeEventListener("storage", checkAdmin);
  }, []);

  if (location.pathname === "/admin") {
    return isAdmin ? (
      <AdminPanel onLogout={() => setIsAdmin(false)} />
    ) : (
      <AdminLogin setIsAdmin={setIsAdmin} />
    );
  }

  return (
    <>
      <div className="min-h-screen bg-white text-slate-900">
        <Navbar />

        <main className="pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        <footer className="bg-[#8f2d0b] py-12 text-orange-100">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <img
                  src={logoImage}
                  alt="New Era Ventures"
                  className="h-10 w-auto rounded-xl bg-white p-1.5"
                />
                <div>
                  <div className="text-sm font-black uppercase tracking-[0.14em] text-white">
                    New Era
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.26em] text-orange-200">
                    Ventures
                  </div>
                </div>
              </div>
              <p className="max-w-xs text-sm leading-6 text-orange-100/85">
                Strategic digital solutions for businesses ready to scale with
                clarity and confidence.
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-white">
                Quick links
              </h3>
              <ul className="space-y-2 text-sm">
                {(
                  [
                    ["Home", "/"],
                    ["About", "/about"],
                    ["Services", "/services"],
                    ["Portfolio", "/portfolio"],
                  ] as [string, string][]
                ).map(([label, href]) => (
                  <li key={label}>
                    <Link
                      to={href}
                      className="text-orange-100/85 transition hover:text-white"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-white">
                Company
              </h3>
              <ul className="space-y-2 text-sm">
                {(
                  [
                    ["Products", "/products"],
                    ["Blog", "/blog"],
                    ["Learn", "/learn"],
                    ["Contact", "/contact"],
                  ] as [string, string][]
                ).map(([label, href]) => (
                  <li key={label}>
                    <Link
                      to={href}
                      className="text-orange-100/85 transition hover:text-white"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-white">
                Contact
              </h3>
              <div className="space-y-3 text-sm text-orange-100/90">
                <a href="mailto:hello@neweraventures.com" className="flex items-center gap-2 transition hover:text-white">
                  <Mail size={16} /> hello@neweraventures.com
                </a>
                <a href="tel:+2348000000000" className="flex items-center gap-2 transition hover:text-white">
                  <Phone size={16} /> +234 800 000 0000
                </a>
                <div className="flex items-center gap-3 pt-2">
                  <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25" aria-label="Instagram">
                    <img src="https://cdn.simpleicons.org/instagram/ffffff" alt="" className="h-4 w-4" />
                  </a>
                  <a href="https://www.tiktok.com/" target="_blank" rel="noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25" aria-label="TikTok">
                    <img src="https://cdn.simpleicons.org/tiktok/ffffff" alt="" className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/20 pt-6 text-center text-sm text-orange-100/70">
            © {new Date().getFullYear()} New Era Ventures. All rights reserved.
          </div>
        </footer>
        <AIAssistant />
      </div>
    </>
  );
}
