import { useState, useEffect } from "react";
import { X, Menu, ChevronDown } from "lucide-react";

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
      { label: "Cloud & DevOps", href: "#services" },
    ],
  },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Products", href: "#products" },
  {
    label: "Blog",
    href: "#blog",
    children: [
      { label: "All Posts", href: "#blog" },
      { label: "Engineering", href: "#blog" },
      { label: "Design", href: "#blog" },
      { label: "Business", href: "#blog" },
    ],
  },
  { label: "Learn to Code", href: "#learn" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
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
   * Replicated Brand Mark from image_a2a1ff.png
   */
  const BrandMark = () => (
    <div className="flex items-center gap-3 group">
      <span className="font-black tracking-tighter text-2xl italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600">
        NEV
      </span>
      <div className="h-8 w-[1px] bg-white/20" />
      <div className="flex flex-col leading-none">
        <span className="text-[10px] font-black tracking-[0.25em] text-white uppercase">
          NEW ERA
        </span>
        <span className="text-[10px] font-bold tracking-[0.25em] text-cyan-500 uppercase mt-0.5">
          VENTURES
        </span>
      </div>
    </div>
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-gray-950/95 backdrop-blur-md shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            {/* Menu Toggle Button (Restored) */}
            <button
              onClick={() => setMenuOpen(true)}
              className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>

            {/* Brand Logo/Name */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#home");
              }}
              className="flex items-center"
            >
              <BrandMark />
            </a>
          </div>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() =>
                  item.children && setOpenDropdown(item.label)
                }
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  onClick={() => handleNavClick(item.href)}
                  className="flex items-center gap-1 px-3 py-2 text-gray-300 hover:text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-all"
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      size={14}
                      className="transition-transform group-hover:rotate-180"
                    />
                  )}
                </button>
                {item.children && openDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1 w-52 bg-gray-900/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                    {item.children.map((child) => (
                      <button
                        key={child.label}
                        onClick={() => handleNavClick(child.href)}
                        className="block w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#contact");
            }}
            className="hidden lg:flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all hover:-translate-y-0.5"
          >
            Get Started
          </a>
        </div>
      </nav>

      {/* Slide-out drawer */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-300 ${
          menuOpen ? "visible" : "invisible"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
        />

        <div
          className={`absolute top-0 left-0 h-full w-80 max-w-[90vw] bg-gray-950 border-r border-white/10 shadow-2xl flex flex-col transition-transform duration-400 ease-in-out ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <BrandMark />
            <button
              onClick={() => setMenuOpen(false)}
              className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-3">
            {navItems.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      if (!item.children) handleNavClick(item.href);
                    }}
                    className="flex-1 text-left px-3 py-3 text-gray-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors font-medium"
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
                      className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          mobileExpanded === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>
                {item.children && mobileExpanded === item.label && (
                  <div className="ml-4 mb-1 border-l border-white/10 pl-3">
                    {item.children.map((child) => (
                      <button
                        key={child.label}
                        onClick={() => handleNavClick(child.href)}
                        className="block w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-white/10">
            <button
              onClick={() => handleNavClick("#contact")}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
