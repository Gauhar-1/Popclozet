import { useState, useEffect, useCallback, useMemo } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register GSAP Plugin
gsap.registerPlugin(ScrollToPlugin);

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll detection for navbar styling - optimized with throttling
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = useMemo(() => [
    { label: "Benefits", href: "#benefits" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "FAQ", href: "#faq" },
  ], []);

  // GSAP Smooth Scroll Function - optimized with useCallback
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLButtonElement>, href: string) => {
    e.preventDefault();
    
    // Close mobile menu if open
    setIsOpen(false);

    const targetElem = document.querySelector(href);

    if (targetElem) {
      // Animate scroll to the target section
      gsap.to(window, {
        duration: 1.5,
        scrollTo: {
          y: targetElem,
          offsetY: 80, // Offset for the fixed header height
        },
        ease: "power4.inOut", // Smooth 'luxury' feel easing
      });
    }
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b",
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-gray-200 py-2 shadow-sm"
          : "bg-transparent border-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Area */}
          <div className="flex items-center gap-2 z-50">
            <div className="w-10 h-10 rounded-full bg-[#8B1A3D] flex items-center justify-center text-white shadow-lg">
                <span className="font-serif font-bold text-lg">P</span>
            </div>
            <span className={cn(
                "font-serif font-bold text-2xl tracking-tight transition-colors duration-300",
                isScrolled ? "text-gray-900" : "text-gray-900" 
            )}>
              Popclozet
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-8">
            <div className="flex items-center gap-3 lg:gap-6 bg-white/50 backdrop-blur-sm px-3 lg:px-6 py-2 rounded-full border border-gray-100/50 shadow-sm">
                {navLinks.map((link) => (
                <button
                    key={link.label}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="relative group text-xs lg:text-sm font-medium text-gray-600 hover:text-[#8B1A3D] transition-colors whitespace-nowrap"
                >
                    {link.label}
                    {/* Hover Underline Animation */}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#8B1A3D] transition-all duration-300 group-hover:w-full" />
                </button>
                ))}
            </div>

            <Button
              size="lg"
              className="bg-[#1a1a1a] hover:bg-[#8B1A3D] text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-4 lg:px-6 text-xs lg:text-base"
              onClick={(e) => handleNavClick(e, "#cta")}
            >
              <ShoppingBag className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
              <span className="hidden lg:inline">Unlock Closet</span>
              <span className="lg:hidden">Unlock</span>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-50 p-2 text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-40 md:hidden flex flex-col pt-24 px-6 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]",
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        )}
      >
        <div className="flex bg-white flex-col gap-6">
          {navLinks.map((link, index) => (
            <button
              key={link.label}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-3xl font-serif font-medium text-gray-900 text-left hover:text-[#8B1A3D] transition-colors border-b border-gray-100 pb-4"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {link.label}
            </button>
          ))}
          <Button
            size="lg"
            className="w-full bg-[#8B1A3D] text-white font-bold h-14 text-lg rounded-xl mt-4 shadow-xl"
            onClick={(e) => handleNavClick(e, "#cta")}
          >
            Unlock My Closet
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;