import { useEffect, useRef } from "react";
import { Instagram, Linkedin, Facebook, Twitter, ArrowUp, Send } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const bigTextRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax/Reveal effect for the big text
      gsap.fromTo(
        bigTextRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const linkGroups = [
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
  ];

  return (
    <footer ref={footerRef} className="bg-white pt-20 pb-8 border-t border-gray-100 overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        
        {/* Top Section: Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          
          {/* Brand & Socials (Col 1-4) */}
          <div className="md:col-span-4 space-y-8">
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
          <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            {linkGroups.map((group, idx) => (
              <div key={idx} className="space-y-6">
                <h4 className="font-serif font-bold text-lg text-gray-900">{group.title}</h4>
                <ul className="space-y-4">
                  {group.links.map((link, i) => (
                    <li key={i}>
                      <a href="#" className="text-gray-500 hover:text-[#8B1A3D] transition-colors duration-300 text-sm md:text-base flex items-center group">
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
        <div className="border-t border-gray-100 pt-16 pb-8 text-center relative">
          <h1 
            ref={bigTextRef}
            className="text-[13vw] md:text-[15vw] leading-[0.8] font-serif font-black text-[#1a1a1a] tracking-tighter select-none mix-blend-difference opacity-90"
          >
            POPCLOZET
          </h1>
        </div>

        {/* Bottom Section: Copyright & Utility */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-gray-100">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
            © 2025 Popclozet Inc. • Crafted with Style.
          </p>
          
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8B1A3D] hover:text-[#1a1a1a] transition-colors"
          >
            Back to Top
            <span className="w-8 h-8 rounded-full border border-[#8B1A3D]/20 flex items-center justify-center group-hover:bg-[#8B1A3D] group-hover:text-white transition-all duration-300">
              <ArrowUp className="w-4 h-4" />
            </span>
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;