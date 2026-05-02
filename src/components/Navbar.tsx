import { useState, useEffect } from "react";
import { X, Menu, ChevronDown, Sparkles } from "lucide-react";
import { useSiteSettings } from "../context/SiteContext";

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  {
    label: "About",
    href: "#about",
    children: [
      { label: "Our Story", href: "#about" },
      { label: "Our Team", href: "#portfolio" },
      { label: "Mission & Vision", href: "#about" },
    ],
  },
  {
    label: "Services",
    href: "#services",
    children: [
      { label: "Web Development", href: "#services" },
      { label: "Mobile Apps", href: "#services" },
      { label: "UI/UX Design", href: "#services" },
      { label: "Graphic Design", href: "#services" },
      { label: "SEO & Marketing", href: "#services" },
    ],
  },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Products", href: "#products" },
  { label: "Learn to Code", href: "#learn" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    setOpenDropdown(null);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  /**
   * Professional Typography-based Logo
   * Replaces the Zap icon and basic text with a premium brand mark
   */
  const BrandLogo = () => (
    <div className="flex items-center gap-3 group cursor-pointer">
      <div className="relative flex flex-col items-center justify-center">
        <span className="text-2xl font-black tracking-tighter italic leading-none text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 group-hover:from-cyan-300 group-hover:to-blue-400 transition-all duration-500">
          NEV
        </span>
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mt-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </div>
      <div className="hidden sm:flex flex-col border-l border-white/10 pl-3 leading-none">
        <span className="text-[10px] font-bold tracking-[0.3em] text-white uppercase opacity-90">
          New Era
        </span>
        <span className="text-[10px] font-medium tracking-[0.3em] text-cyan-500 uppercase mt-1">
          Ventures
        </span>
      </div>
    </div>
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-gray-950/80 backdrop-blur-xl border-b border-white/5 py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden p-2 text-gray-400 hover:text-cyan-400 hover:bg-white/5 rounded-xl transition-all"
          >
            <Menu size={26} />
          </button>

          {/* Logo Section */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#home");
            }}
          >
            <BrandLogo />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center bg-white/5 border border-white/5 rounded-full px-2 py-1 backdrop-blur-md">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  item.children && setOpenDropdown(item.label)
                }
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  onClick={() => !item.children && handleNavClick(item.href)}
                  className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                    openDropdown === item.label
                      ? "text-cyan-400"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      size={12}
                      className={`transition-transform duration-300 ${openDropdown === item.label ? "rotate-180" : ""}`}
                    />
                  )}
                </button>

                {/* Desktop Dropdown */}
                {item.children && openDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-gray-900/95 border border-white/10 backdrop-blur-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-2">
                      {item.children.map((child) => (
                        <button
                          key={child.label}
                          onClick={() => handleNavClick(child.href)}
                          className="w-full text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-400 hover:text-white hover:bg-cyan-500/10 rounded-xl transition-all"
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Action Button */}
          <button
            onClick={() => handleNavClick("#contact")}
            className="hidden lg:flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white text-xs font-black uppercase tracking-[0.15em] rounded-full shadow-lg shadow-cyan-900/20 transition-all hover:-translate-y-0.5 active:scale-95"
          >
            <Sparkles size={14} />
            Let's Talk
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar Navigation */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-500 ${menuOpen ? "visible" : "invisible"}`}
      >
        <div
          className={`absolute inset-0 bg-gray-950/90 backdrop-blur-md transition-opacity duration-500 ${menuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMenuOpen(false)}
        />

        <div
          className={`absolute top-0 left-0 h-full w-[300px] bg-gray-900 border-r border-white/5 flex flex-col transition-transform duration-500 ease-out ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="p-8 border-b border-white/5 flex items-center justify-between">
            <BrandLogo />
            <button
              onClick={() => setMenuOpen(false)}
              className="text-gray-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-2">
            {navItems.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => !item.children && handleNavClick(item.href)}
                    className="flex-1 text-left py-4 text-sm font-bold uppercase tracking-widest text-gray-300 hover:text-cyan-400 transition-colors"
                  >
                    {item.label}
                  </button>
                  {item.children && (
                    <button
                      onClick={() =>
                        setMobileExpanded(
                          mobileExpanded === item.label ? null : item.label,
                        )
                      }
                      className="p-4 text-gray-500"
                    >
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-300 ${mobileExpanded === item.label ? "rotate-180 text-cyan-400" : ""}`}
                      />
                    </button>
                  )}
                </div>
                {item.children && mobileExpanded === item.label && (
                  <div className="ml-4 border-l border-white/10 pl-4 space-y-1 animate-in slide-in-from-left duration-300">
                    {item.children.map((child) => (
                      <button
                        key={child.label}
                        onClick={() => handleNavClick(child.href)}
                        className="w-full text-left py-3 text-xs font-medium text-gray-500 hover:text-white transition-colors"
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-8 border-t border-white/5">
            <button
              onClick={() => handleNavClick("#contact")}
              className="w-full py-4 bg-white text-gray-950 text-xs font-black uppercase tracking-widest rounded-2xl transition-all active:scale-95"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
