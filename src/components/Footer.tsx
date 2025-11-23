import { useEffect, useRef, useCallback, useMemo, memo } from "react";
import { Instagram, Linkedin, Facebook, Twitter, ArrowUp, Send } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const bigTextRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Optimize with will-change
      if (bigTextRef.current) {
        gsap.set(bigTextRef.current, { willChange: "transform, opacity" });
      }

      // Parallax/Reveal effect for the big text
      gsap.fromTo(
        bigTextRef.current,
        { y: 100, opacity: 0, force3D: true },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          clearProps: "willChange",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const linkGroups = useMemo(() => [
    {
      title: "Explore",
      links: ["New Arrivals", "Trending Now", "Occasion Wear", "Designer Edits", "Gift Cards"],
    },
    {
      title: "Company",
      links: ["Our Story", "Sustainability", "Careers", "Press", "Terms of Service"],
    },
    {
      title: "Support",
      links: ["Help Center", "Return Policy", "Fitting Guide", "Contact Us", "Privacy Policy"],
    },
  ], []);

  return (
    <footer ref={footerRef} className="bg-white pt-12 sm:pt-16 md:pt-20 pb-6 sm:pb-8 border-t border-gray-100 overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        
        {/* Top Section: Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 md:gap-12 mb-12 sm:mb-16 md:mb-20">
          
          {/* Brand & Socials (Col 1-4) */}
          <div className="md:col-span-4 space-y-6 sm:space-y-8">
            <div className="space-y-4">
               <div className="inline-flex items-center gap-2 bg-[#8B1A3D]/5 border border-[#8B1A3D]/10 rounded-full px-3 py-1">
                  <span className="w-2 h-2 rounded-full bg-[#8B1A3D] animate-pulse"/>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#8B1A3D]">Live in Mumbai</span>
               </div>
               <p className="text-gray-500 leading-relaxed max-w-xs">
                  Redefining ownership for the modern wardrobe. Wear the trend, return the rest.
               </p>
            </div>
            
            <div className="flex gap-4">
              {[Instagram, Facebook, Linkedin, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#8B1A3D] hover:text-white hover:border-[#8B1A3D] transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links (Col 5-12) */}
          <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {linkGroups.map((group, idx) => (
              <div key={idx} className="space-y-4 sm:space-y-6">
                <h4 className="font-serif font-bold text-base sm:text-lg text-gray-900">{group.title}</h4>
                <ul className="space-y-3 sm:space-y-4">
                  {group.links.map((link, i) => (
                    <li key={i}>
                      <a href="#" className="text-gray-500 hover:text-[#8B1A3D] transition-colors duration-300 text-xs sm:text-sm md:text-base flex items-center group">
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                           {link}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Middle Section: The Big Brand Statement */}
        <div className="border-t border-gray-100 pt-8 sm:pt-12 md:pt-16 pb-6 sm:pb-8 text-center relative">
          <h1 
            ref={bigTextRef}
            className="text-[12vw] sm:text-[13vw] md:text-[14vw] lg:text-[15vw] leading-[0.8] font-serif font-black text-[#1a1a1a] tracking-tighter select-none mix-blend-difference opacity-90"
          >
            POPCLOZET
          </h1>
        </div>

        {/* Bottom Section: Copyright & Utility */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 sm:pt-8 border-t border-gray-100">
          <p className="text-[10px] sm:text-xs text-gray-400 font-medium uppercase tracking-wider text-center md:text-left">
            © 2025 Popclozet Inc. • Crafted with Style.
          </p>
          
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#8B1A3D] hover:text-[#1a1a1a] transition-colors"
          >
            Back to Top
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#8B1A3D]/20 flex items-center justify-center group-hover:bg-[#8B1A3D] group-hover:text-white transition-all duration-300">
              <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4" />
            </span>
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;