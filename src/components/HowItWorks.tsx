import { useEffect, useRef } from "react";
import { Shirt, Clock, RotateCcw, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Optimize with will-change
      const headerElements = document.querySelectorAll(".header-anim");
      const cardElements = document.querySelectorAll(".step-card");
      
      headerElements.forEach((el) => {
        gsap.set(el, { willChange: "transform, opacity" });
      });
      cardElements.forEach((el) => {
        gsap.set(el, { willChange: "transform, opacity" });
      });

      // 1. Header Animation - Using fromTo for stability
      gsap.fromTo(
        ".header-anim",
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
          clearProps: "willChange",
          scrollTrigger: {
            trigger: ".header-anim",
            start: "top 85%", // Starts when top of element hits 85% of viewport height
            toggleActions: "play none none reverse", // Plays on enter, reverses on leave
          },
        }
      );

      // 2. Card Stagger Animation
      gsap.fromTo(
        ".step-card",
        { 
          y: 100, 
          opacity: 0, 
          scale: 0.8,
          force3D: true
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2, // Delay between each card
          ease: "back.out(1.7)", // Bouncy effect
          clearProps: "willChange",
          scrollTrigger: {
            trigger: ".steps-container",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef); // Scope to section

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  const steps = [
    {
      icon: Shirt,
      title: "Pick Your Look",
      description: "Browse 5000+ styles. Filter by occasion, mood, or celebrity trends.",
      badge: "Step 01",
    },
    {
      icon: Clock,
      title: "Get it in 60 Mins",
      description: "Instant gratification. Your outfit arrives freshly dry-cleaned & ready.",
      badge: "Step 02",
    },
    {
      icon: RotateCcw,
      title: "Flaunt & Return",
      description: "Steal the show. When done, just pop it in the return bag. We handle the rest.",
      badge: "Step 03",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative py-12 sm:py-16 md:py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-[#d4a2b1]/20 via-white to-[#d4a2b1]/10"
    >
      {/* Decorative Background Blur */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#d4a2b1] rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#8B1A3D] rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-pulse delay-1000" />

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        
        {/* Editorial Header */}
        <div className="header-anim text-center mb-8 sm:mb-12 md:mb-16 lg:mb-24 opacity-0 translate-y-[50px]"> 
          {/* Added initial opacity-0 class to prevent flash before animation */}
          <span className="text-[#8B1A3D] font-bold tracking-[0.2em] text-xs uppercase mb-3 block">
            Effortless Style
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 leading-tight">
            Three Steps to <br />
            <span className="italic text-[#8B1A3D] relative inline-block px-2">
              Infinite Outfits.
            </span>
          </h2>
        </div>

        {/* The Connection Line (Desktop Only) */}
        <div className="header-anim hidden md:block absolute top-[55%] left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-[#8B1A3D]/20 -z-10 opacity-0" />

        {/* Steps Grid */}
        <div className="steps-container grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                // Added opacity-0 to prevent flash of unstyled content
                className="step-card opacity-0 group relative bg-white rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 ring-1 ring-[#d4a2b1]/20"
              >
                {/* Step Badge Pill */}
                <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 bg-[#8B1A3D] text-white px-3 sm:px-4 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-md group-hover:bg-[#1a1a1a] transition-colors">
                  {step.badge}
                </div>

                {/* Icon Container */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-[#d4a2b1]/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 ease-out relative overflow-hidden">
                   <div className="absolute inset-0 bg-[#8B1A3D] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                   <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#8B1A3D] relative z-10 group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-[#8B1A3D] transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm md:text-base leading-relaxed">
                  {step.description}
                </p>

                {/* Mobile Connector Arrow */}
                {index !== steps.length - 1 && (
                  <div className="md:hidden flex justify-center mt-8 text-[#d4a2b1]">
                    <ArrowRight className="w-6 h-6 rotate-90" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;