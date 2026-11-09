import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { navItems } from "../data/siteContent";
import { contactDetails } from "../data/contactDetails";
import logoImage from "../../logo.png";

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const isCurrent = (href: string) => location.pathname === href;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-orange-200 bg-[#fff7ed]/95 shadow-[0_8px_30px_rgba(154,52,18,0.08)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 rounded-2xl bg-white px-3 py-2 shadow-sm">
          <img src={logoImage} alt="New Era Ventures" className="h-9 w-auto" />
          <div className="leading-none">
            <div className="text-base font-black uppercase tracking-[0.15em] text-slate-900">
              New Era
            </div>
            <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.35em] text-slate-500">
              Ventures
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition ${
                isCurrent(item.href)
                  ? "bg-orange-500 text-white shadow-md shadow-orange-500/25"
                  : "text-slate-700 hover:bg-orange-100 hover:text-orange-900"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center lg:flex">
          <a
            href={contactDetails.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] shadow-md shadow-green-500/20 transition hover:-translate-y-0.5 hover:bg-[#1fbd59]"
            aria-label="Chat with us on WhatsApp"
            title="Chat with us on WhatsApp"
          >
            <img
              src="https://cdn.simpleicons.org/whatsapp/ffffff"
              alt=""
              className="h-5 w-5"
            />
          </a>
        </div>

        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white shadow-md shadow-orange-500/25 lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-orange-200 bg-[#fff7ed] lg:hidden">
          <div className="mx-auto max-w-7xl space-y-2 px-4 py-4 sm:px-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`block rounded-xl px-4 py-3 text-base font-medium ${
                  isCurrent(item.href)
                    ? "bg-orange-500 text-white"
                    : "text-slate-700 hover:bg-orange-100"
                }`}
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-4">
              <a
                href={contactDetails.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-center text-sm font-semibold text-white"
              >
                <img
                  src="https://cdn.simpleicons.org/whatsapp/ffffff"
                  alt=""
                  className="h-5 w-5"
                />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
