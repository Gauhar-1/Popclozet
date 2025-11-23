import { useEffect, useRef } from "react";
import { Sparkles, Clock, Leaf, Shirt, ArrowRight, Zap } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Custom Vector Illustrations (SVGs)
const HangerVector = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full opacity-5 group-hover:opacity-15 transition-opacity duration-500 text-[#8B1A3D] fill-current">
    <path d="M100 20 C100 10 110 10 110 20 C110 30 100 40 100 50 L150 80 L50 80 L100 50 Z" />
    <path d="M50 80 L20 200 L180 200 L150 80 Z" fill="none" stroke="currentColor" strokeWidth="2" />
    <circle cx="100" cy="15" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
  </svg>
);

const BenefitGrid = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Optimize animations with will-change and GPU acceleration
      const headerElements = document.querySelectorAll(".benefit-header-anim");
      const cardElements = document.querySelectorAll(".bento-card");
      
      headerElements.forEach((el) => {
        gsap.set(el, { willChange: "transform, opacity" });
      });
      cardElements.forEach((el) => {
        gsap.set(el, { willChange: "transform, opacity" });
      });

      // 1. Header Animation (Fade Up & Reveal)
      gsap.fromTo(
        ".benefit-header-anim",
        { 
          y: 50, 
          opacity: 0,
          force3D: true
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15, // Delay between eyebrow and title
          clearProps: "willChange",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 2. Bento Grid Cards Animation (Staggered Pop)
      gsap.fromTo(
        ".bento-card",
        { 
          y: 80, 
          opacity: 0, 
          scale: 0.9,
          force3D: true
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15, // Cards appear one after another
          ease: "back.out(1.5)", // Satisfying bounce effect
          clearProps: "willChange",
          scrollTrigger: {
            trigger: ".bento-grid-container",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="benefits" 
      className="relative min-h-screen md:h-screen w-full flex flex-col justify-center items-center overflow-hidden px-4 py-12 md:py-0 bg-[#d4a2b1]/10"
    >
      
      {/* Subtle Background Blur for Depth */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#8B1A3D]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-pink-200/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto relative z-10 max-w-5xl flex flex-col h-full justify-center">
        
        {/* Editorial Header */}
        <div className="flex flex-col items-center text-center mb-8 relative z-10 shrink-0">
          {/* 1. The Eyebrow */}
          <div className="benefit-header-anim mb-2 opacity-0">
             <span className="text-[#8B1A3D] font-sans text-[10px] md:text-xs font-extrabold uppercase tracking-[0.3em] bg-white/50 px-4 py-1 rounded-full backdrop-blur-sm border border-[#8B1A3D]/10">
               The Popclozet Promise
             </span>
          </div>

          {/* 2. The Main Headline */}
          <h2 className="benefit-header-anim font-serif text-gray-400 flex flex-col items-center justify-center opacity-0">
            <span className="text-2xl md:text-3xl font-medium tracking-tight leading-none text-gray-600">
              We finally cured
            </span>
            <span className="relative text-4xl md:text-6xl font-black italic text-[#8B1A3D] mt-1 leading-tight drop-shadow-sm">
              "Nothing to wear."
            </span>
          </h2>
        </div>

        {/* COMPACT BENTO GRID */}
        <div className="bento-grid-container grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 md:h-[450px] lg:h-[500px] w-full shrink-0">
          
          {/* CARD 1: The Rack (Tall) */}
          <div className="bento-card opacity-0 group relative md:col-span-1 md:row-span-2 bg-white rounded-[16px] md:rounded-[24px] p-4 md:p-6 flex flex-col justify-between overflow-hidden border border-white/60 shadow-sm min-h-[250px] md:min-h-0
            hover:border-[#8B1A3D]/30 hover:bg-gradient-to-b hover:from-white hover:to-pink-50 
            transition-all duration-500 ease-out hover:shadow-[0_20px_40px_-15px_rgba(139,26,61,0.15)] hover:scale-[1.02] will-change-transform">
            
            <div className="absolute right-[-60px] top-[-20px] w-64 h-64 rotate-12 group-hover:rotate-6 transition-transform duration-700">
               <HangerVector />
            </div>
            
            {/* Big Number */}
            <span className="absolute top-2 left-4 text-[5rem] md:text-[8rem] font-serif font-black text-gray-100 group-hover:text-[#8B1A3D]/5 leading-none -z-0 select-none transition-colors duration-500">01</span>

            <div className="relative z-10 mt-auto">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm mb-4 border border-gray-100 group-hover:border-[#8B1A3D]/20 transition-colors">
                <Shirt className="w-5 h-5 text-[#8B1A3D]" />
              </div>
              <h3 className="text-xl md:text-2xl font-serif font-medium text-gray-900 mb-2 group-hover:text-[#8B1A3D] transition-colors">
                The <span className="italic">Mix & Match</span>
              </h3>
              <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-4 font-medium max-w-full md:max-w-[200px]">
                Just need a new top? Browse thousands of individual pieces to complete the look you already have. Total creative freedom.
              </p>
              <div className="flex items-center text-[#8B1A3D] font-bold text-xs group-hover:translate-x-2 transition-transform cursor-pointer uppercase tracking-wider">
                Explore Rack <ArrowRight className="w-3 h-3 ml-2" />
              </div>
            </div>
          </div>

          {/* CARD 2: Event Ready (Wide) */}
          <div className="bento-card opacity-0 group relative md:col-span-2 bg-[#8B1A3D] rounded-[16px] md:rounded-[24px] p-4 md:p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between overflow-hidden text-white min-h-[200px] md:min-h-0
            hover:bg-gradient-to-r hover:from-[#8B1A3D] hover:to-[#6d1430]
            transition-all duration-500 ease-out shadow-lg hover:shadow-[0_20px_40px_-15px_rgba(139,26,61,0.4)] hover:scale-[1.02] will-change-transform">
            
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[60px] transform translate-x-1/2 -translate-y-1/2 group-hover:bg-white/20 transition-colors duration-500" />
            <span className="absolute bottom-[-20px] right-[10%] text-[6rem] md:text-[10rem] font-serif font-black text-white/5 leading-none select-none group-hover:text-white/10 transition-colors">02</span>
            
            <div className="relative z-10 max-w-full md:max-w-sm">
              <div className="flex items-center gap-2 mb-3 opacity-80">
                 <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"/>
                 <span className="text-[10px] uppercase tracking-widest font-semibold">Trending Now</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-medium mb-2 text-white">
                Event-Ready Looks
              </h3>
              <p className="text-white/80 text-xs md:text-sm leading-relaxed font-light">
                Got a date, party, or fest? Rent a complete, stylist-approved outfit with one tap. Your 'go-to' look for any event.
              </p>
            </div>
            
            <div className="relative z-10 mt-4 md:mt-0 md:ml-4">
               <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                 <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-white" />
               </div>
            </div>
          </div>

          {/* CARD 3: Speed (Small) */}
          <div className="bento-card opacity-0 group relative bg-[#FFF5F7] rounded-[16px] md:rounded-[24px] p-4 md:p-6 border border-pink-100/50 flex flex-col justify-between overflow-hidden min-h-[180px] md:min-h-0
            hover:bg-gradient-to-br hover:from-[#FFF0F5] hover:to-[#FFD1DC] hover:border-[#8B1A3D]/20
            transition-all duration-500 ease-out hover:shadow-lg hover:scale-[1.02] will-change-transform">
             
             <span className="absolute -right-4 -top-4 text-[4rem] md:text-[6rem] font-serif font-black text-[#8B1A3D]/5 group-hover:text-[#8B1A3D]/10 leading-none select-none transition-colors">03</span>
             
             <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-2 shadow-sm text-[#8B1A3D] group-hover:scale-110 transition-transform duration-500">
                 <Clock className="w-5 h-5" />
             </div>
             
             <div className="relative z-10">
                <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base md:text-lg font-serif font-medium text-gray-900 group-hover:text-[#8B1A3D] transition-colors">Rent It ASAP</h3>
                    <Zap className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                </div>
                <p className="text-gray-600 text-xs leading-relaxed">
                   Your plans are spontaneous, so we are too. Fresh, clean & ready in <span className="hidden md:inline"><br/></span> <span className="font-bold text-[#8B1A3D]">60 minutes flat.</span>
                </p>
             </div>
          </div>

          {/* CARD 4: Sustainability (Small) */}
          <div className="bento-card opacity-0 group relative bg-[#F0FDF4] rounded-[16px] md:rounded-[24px] p-4 md:p-6 border border-green-100/50 flex flex-col justify-between overflow-hidden min-h-[180px] md:min-h-0
             hover:bg-gradient-to-br hover:from-[#F0FDF4] hover:to-[#BBF7D0] hover:border-green-400/30
             transition-all duration-500 ease-out hover:shadow-lg hover:scale-[1.02] will-change-transform">
             
             <span className="absolute -right-4 -top-4 text-[4rem] md:text-[6rem] font-serif font-black text-green-900/5 group-hover:text-green-900/10 leading-none select-none transition-colors">04</span>
             
             <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-2 shadow-sm text-green-600 group-hover:scale-110 transition-transform duration-500">
                 <Leaf className="w-5 h-5" />
             </div>
             
             <div className="relative z-10">
                <h3 className="text-base md:text-lg font-serif font-medium text-gray-900 mb-1 group-hover:text-green-800 transition-colors">Sustainable</h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                   Look amazing for  <span className="font-bold text-green-700">10-15% of retail price. </span>
                   When you're done, just use the free return bag. We handle all the dry cleaning.
                </p>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BenefitGrid;