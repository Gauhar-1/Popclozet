import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote, PenTool } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const FounderNote = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // 1. Fade in container elements
      tl.fromTo(
        ".founder-anim",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );

      // 2. Draw the highlight
      if (highlightRef.current) {
        tl.fromTo(
          highlightRef.current,
          { backgroundSize: "0% 100%" },
          { backgroundSize: "100% 100%", duration: 1, ease: "power2.inOut" },
          "-=0.4"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden bg-[#590d22] text-white"
    >
      {/* Background Texture - Subtle pattern to add depth */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}
      />

      <div ref={containerRef} className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: The Intro & "Why" */}
          <div className="lg:col-span-5 text-center lg:text-left founder-anim">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
              <PenTool className="w-3 h-3 text-pink-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-pink-100">From the Desk of</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight mb-6">
              We Built This to <br />
              <span className="text-pink-200 italic">Fix a Panic.</span>
            </h2>
            
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              Fashion shouldn't feel like a burden. We wanted to create a world where wearing something new doesn't mean buying something new.
            </p>

            {/* Founder Signatures (Visual Representation) */}
            <div className="hidden lg:block">
              <div className="h-px w-24 bg-white/20 mb-4" />
              <p className="font-handwriting text-3xl text-white/90 -rotate-2 transform origin-left">
                Viraj & Vraj
              </p>
              <p className="text-xs text-white/40 uppercase tracking-widest mt-2">Co-Founders</p>
            </div>
          </div>

          {/* RIGHT: The Quote Card */}
          <div className="lg:col-span-7 founder-anim">
            <div className="relative bg-white text-[#1a1a1a] p-8 md:p-12 rounded-[2rem] md:rounded-tr-[5rem] shadow-2xl border-4 border-pink-100/10">
              
              {/* Giant Quote Mark */}
              <div className="absolute -top-6 -left-4 bg-[#8B1A3D] text-white p-4 rounded-2xl shadow-lg transform -rotate-6">
                <Quote className="w-8 h-8 fill-current" />
              </div>

              <div className="space-y-6 relative z-10">
                <p className="text-xl md:text-2xl font-serif leading-relaxed">
                  "I started Popclozet from a simple, recurring panic: 
                  <br className="mb-4 block"/>
                  <span 
                    ref={highlightRef}
                    className="bg-gradient-to-r from-yellow-200/80 to-yellow-200/80 bg-no-repeat bg-bottom pb-1 px-1 text-[#1a1a1a] font-medium inline"
                    style={{ backgroundSize: "0% 100%", transition: "background-size 1s ease-in-out" }}
                  >
                    'I have a closet full of clothes, but nothing to wear.'
                  </span>
                </p>
                
                <p className="text-lg text-gray-600 font-light leading-relaxed">
                  I was tired of spending money on trendy outfits I'd wear once. Popclozet is the solution I always wanted—an endless, sustainable closet that gives you the freedom to wear a new outfit for every new plan. Why limit your style?"
                </p>
              </div>

              {/* Mobile Signature (Visible only on small screens) */}
              <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6 lg:hidden">
                 <div>
                    <p className="font-serif font-bold text-lg">Viraj & Vraj</p>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Founders</p>
                 </div>
                 <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="font-serif font-bold text-[#8B1A3D]">P</span>
                 </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FounderNote;