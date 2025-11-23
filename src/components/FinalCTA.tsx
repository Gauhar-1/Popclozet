import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Sparkles, Lock } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FinalCTA = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Optimize with will-change
      if (cardRef.current) {
        gsap.set(cardRef.current, { willChange: "transform, opacity" });
      }
      const textElements = document.querySelectorAll(".cta-text-anim");
      textElements.forEach((el) => {
        gsap.set(el, { willChange: "transform, opacity" });
      });

      // 1. Scale Up Animation for the Card
      gsap.fromTo(
        cardRef.current,
        { scale: 0.95, opacity: 0, y: 50, force3D: true },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          clearProps: "willChange",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
          },
        }
      );

      // 2. Text Reveal
      gsap.fromTo(
        ".cta-text-anim",
        { y: 30, opacity: 0, force3D: true },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          delay: 0.3,
          ease: "power2.out",
          clearProps: "willChange",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isLoading) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('email_signups')
        .insert({ email, source: 'final_cta' });
      
      if (error) throw error;
      
      toast.success("Welcome to the Inner Circle. 🥂", {
        description: "Your 50% off code is reserved.",
      });
      setEmail("");
    } catch (error) {
      toast.error("Something went wrong.", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [email, isLoading]);

  return (
    <section id="cta" className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 bg-white">
      {/* The Floating Monolith Card */}
      <div 
        ref={cardRef}
        className="container mx-auto max-w-5xl relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] bg-[#8B1A3D] shadow-2xl shadow-[#8B1A3D]/30"
      >
        {/* Background Gradients for Depth */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-[#b32252] to-transparent rounded-full blur-[100px] opacity-40 pointer-events-none -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-t from-black/40 to-transparent rounded-full blur-[80px] opacity-60 pointer-events-none translate-y-1/2 -translate-x-1/2" />
        
        {/* Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

        <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-16 py-12 sm:py-16 md:py-20 lg:py-24 flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-10 md:gap-12">
          
          {/* Left Content */}
          <div ref={textRef} className="max-w-xl text-center md:text-left">
            <div className="cta-text-anim inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-1.5 rounded-full border border-white/10 mb-4 sm:mb-6">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-200" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white">Priority Access</span>
            </div>

            <h2 className="cta-text-anim text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-white leading-[1.1] mb-4 sm:mb-6">
              The Closet of Your <br/>
              <span className="italic text-white/90">Dreams is Waiting.</span>
            </h2>
            
            <p className="cta-text-anim text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-md">
              Be the first to know when we launch and secure <strong className="text-white font-medium">50% OFF</strong> your first rental.
            </p>
          </div>

          {/* Right Form */}
          <div className="cta-text-anim w-full max-w-md">
             <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-2 rounded-[1rem] sm:rounded-[1.5rem] shadow-2xl">
                <form onSubmit={handleSubmit} className="relative" noValidate>
                   <div className="relative flex items-center">
                      <Input
                        type="email"
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full h-12 sm:h-14 md:h-16 bg-transparent border-none text-white placeholder:text-white/40 px-4 sm:px-6 text-sm sm:text-base md:text-lg focus-visible:ring-0 rounded-[0.8rem] sm:rounded-[1.2rem] pr-12 sm:pr-16"
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2">
                        <Button
                          type="submit"
                          disabled={isLoading}
                          size="icon"
                          className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl bg-white text-[#8B1A3D] hover:bg-gray-100 hover:scale-105 transition-all shadow-lg"
                        >
                          {isLoading ? (
                            <div className="h-3 w-3 sm:h-4 sm:w-4 border-2 border-[#8B1A3D] border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                          )}
                        </Button>
                      </div>
                   </div>
                </form>
             </div>
             
             {/* Trust Indicator */}
             <div className="cta-text-anim mt-3 sm:mt-4 flex items-center justify-center md:justify-start gap-2 text-white/40 text-[10px] sm:text-xs">
                <Lock className="w-3 h-3" />
                <span>No spam. Unsubscribe anytime.</span>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FinalCTA;