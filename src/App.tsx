import { useState, useEffect } from "react";
import { isAdminLoggedIn } from "./lib/auth";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import ServicesSection from "./sections/ServicesSection";
import PortfolioSection from "./sections/PortfolioSection";
import ProductsSection from "./sections/ProductsSection";
import BlogSection from "./sections/BlogSection";
import LearnSection from "./sections/LearnSection";
import ContactSection from "./sections/ContactSection";
import AdminPanel from "./pages/AdminPanel";
import AdminLogin from "./components/AdminLogin"; // Import the new design

export default function App() {
  const [showLoading, setShowLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(isAdminLoggedIn());
  const [showLoginModal, setShowLoginModal] = useState(false); // Controls the login UI

  useEffect(() => {
    const checkAdmin = () => setIsAdmin(isAdminLoggedIn());
    window.addEventListener("storage", checkAdmin);
    return () => window.removeEventListener("storage", checkAdmin);
  }, []);

  // 1. If successfully logged in, show the Admin Dashboard
  if (isAdmin) {
    return <AdminPanel onLogout={() => setIsAdmin(false)} />;
  }

  return (
    <>
      {showLoading && <LoadingScreen onDone={() => setShowLoading(false)} />}

      {/* 2. Show the professional Login Page if requested */}
      {showLoginModal && (
        <AdminLogin
          setIsAdmin={(val) => {
            setIsAdmin(val);
            setShowLoginModal(false);
          }}
        />
      )}

      <div className="bg-gray-950 text-white overflow-hidden">
        <style>{`
          .scroll-reveal {
            opacity: 0;
            transform: translateY(30px);
            animation: reveal 0.8s ease-out forwards;
          }
          @keyframes reveal {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>

        <Navbar />

        <main className="pt-16">
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <PortfolioSection />
          <ProductsSection />
          <BlogSection />
          <LearnSection />
          <ContactSection />
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-gray-950 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-4 gap-8 mb-8">
              <div>
                <p className="text-white font-bold mb-3">New Era Ventures</p>
                <p className="text-gray-500 text-sm">
                  Building the digital future, one line at a time.
                </p>
              </div>

              <div>
                <p className="text-white text-sm font-semibold mb-3">
                  Quick Links
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  {["Services", "Portfolio", "Blog", "Learn"].map((link) => (
                    <li key={link}>
                      <button
                        onClick={() =>
                          document
                            .querySelector(`#${link.toLowerCase()}`)
                            ?.scrollIntoView({ behavior: "smooth" })
                        }
                        className="hover:text-cyan-400 transition-colors"
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-white text-sm font-semibold mb-3">Company</p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>
                    <button
                      onClick={() =>
                        document
                          .querySelector("#about")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                      className="hover:text-cyan-400 transition-colors"
                    >
                      About
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() =>
                        document
                          .querySelector("#contact")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                      className="hover:text-cyan-400 transition-colors"
                    >
                      Contact
                    </button>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-cyan-400 transition-colors"
                    >
                      Privacy
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-white text-sm font-semibold mb-3">Admin</p>
                {/* 3. Footer button now triggers the new Login Modal instead of prompt */}
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  Admin Login
                </button>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 text-center text-sm text-gray-500">
              <p>&copy; 2026 New Era Ventures. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
