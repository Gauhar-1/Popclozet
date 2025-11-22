import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { gsap } from "gsap";
import { supabase } from "@/integrations/supabase/client";

interface HeroProps {
  heroImage: string;
}

const Hero = ({ heroImage }: HeroProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const centerColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (containerRef.current) {
      // Adjusted animations for a tighter feel
      tl.fromTo(
        centerColRef.current,
        { scale: 0.9, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 1.2 }
      )
        .fromTo(
          leftColRef.current?.children || [],
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.8 },
          "-=0.9"
        )
        .fromTo(
          rightColRef.current?.children || [],
          { x: 20, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.1, duration: 0.8 },
          "-=0.7"
        );
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('email_signups')
        .insert({ email, source: 'hero_magazine' });
      
      if (error) throw error;
      
      toast.success("Access Granted! 🔓", {
        description: "You've unlocked the future of your closet.",
      });
      setEmail("");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#FAFAFA] overflow-hidden flex items-center py-8 md:py-12 lg:py-16 min-h-[fit-content]"
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-6 items-center">
          
          {/* --- LEFT COLUMN (Title & Intro) --- */}
          <div ref={leftColRef} className="lg:col-span-3 flex flex-col justify-center order-1 text-center lg:text-left items-center lg:items-start">
            
            {/* Arrow Badge (Hidden on mobile to save space, visible on md+) */}
            <div className="hidden md:block mb-4">
              <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#8B1A3D] hover:border-[#8B1A3D] hover:text-white transition-colors cursor-pointer group">
                <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-serif font-bold text-gray-900 leading-[1.1] mb-4">
              Welcome To <br />
              The Future Of <br />
              <span className="italic text-[#8B1A3D]">Fashion</span>
            </h1>

            {/* Floating Profile Card (Stylist) - Simplified for mobile */}
            <div className="bg-white p-3 rounded-2xl shadow-xl border border-gray-100 w-full max-w-[260px] mb-6 transform hover:-translate-y-1 transition-transform duration-300 hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B1A3D] to-pink-600 flex items-center justify-center text-white font-bold text-xs">
                  PC
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-gray-800">Pop Stylist</p>
                  <p className="text-xs text-gray-500">Curated looks for you</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="hidden lg:block mt-2">
              <span className="block text-3xl font-bold text-gray-900">10k+</span>
              <p className="text-sm text-gray-500 leading-tight mt-1">
                Styles where classic <br /> ends, modern begins.
              </p>
            </div>
          </div>

          {/* --- CENTER COLUMN (The Big Image/Shape) --- */}
          {/* Adjusted height for responsiveness: smaller on mobile, tall on desktop */}
          <div ref={centerColRef} className="lg:col-span-5 relative order-2 h-[350px] sm:h-[500px] lg:h-[700px] flex items-center justify-center my-4 lg:my-0">
            {/* The Maroon Organic Shape */}
            <div className="relative w-full h-full">
               {/* Background Shape */}
              <div className="absolute inset-0 bg-[#8B1A3D] rounded-[30px] md:rounded-[60px] lg:rounded-[80px] overflow-hidden transform rotate-0 lg:rotate-[-2deg] transition-all hover:rotate-0 duration-500 shadow-2xl">
                {/* Decorative text inside shape */}
                <div className="absolute top-6 left-6 text-white/90 z-20">
                    <p className="text-[10px] sm:text-xs uppercase tracking-widest mb-1">Unlock the power</p>
                    <p className="font-serif text-lg sm:text-xl">Of unlimited wardrobe</p>
                </div>
                
                <div className="absolute top-6 right-6 text-white/50 z-20 font-mono text-[10px] sm:text-xs">
                    40.3M OPTIONS
                </div>

                {/* Main Hero Image */}
                <img 
                  src={heroImage} 
                  alt="Fashion Model" 
                  className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-normal hover:scale-105 transition-transform duration-1000 ease-out"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#8B1A3D]/90 via-transparent to-transparent z-10"></div>
              </div>

              {/* Floating "Next Frontier" Text - Hidden on mobile, visible on desktop */}
              <div className="absolute bottom-12 -right-12 bg-white p-5 rounded-[24px] shadow-2xl max-w-xs z-30 hidden lg:block">
                 <p className="text-xs text-gray-500 mb-2">Popclozet Platform</p>
                 <p className="text-sm font-medium leading-relaxed">
                    A cutting-edge platform exploring the next frontier of style.
                 </p>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN (Secondary Text & Form) --- */}
          <div ref={rightColRef} className="lg:col-span-4 flex flex-col justify-center items-center lg:items-start pl-0 lg:pl-12 order-3 text-center lg:text-left">
             {/* Secondary Headline */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 leading-tight mb-4 lg:mb-6">
              Where Ownership <br />
              Ends, Rental <br />
              <span className="text-[#8B1A3D]">Begins.</span>
            </h2>

            {/* Secondary Image - Hidden on mobile to reduce scroll */}
            <div className="relative mb-6 group cursor-pointer hidden lg:block">
                <div className="absolute -inset-2 bg-gray-100 rounded-full filter blur-lg opacity-70 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-48 h-28 rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm p-1.5">
                     <div className="w-full h-full bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden">
                         <img 
                            src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop" 
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                            alt="Accessory"
                         />
                     </div>
                </div>
            </div>

            {/* Description */}
            <p className="text-gray-500 text-base md:text-lg mb-6 max-w-sm">
                New outfit everyday, delivered in 60 minutes. Unlock the closet now.
            </p>

            {/* Email Capture Form - Replaces CTA */}
            <div className="w-full max-w-md">
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 relative">
                    <Input 
                        type="email" 
                        placeholder="Enter your email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-white border-gray-200 h-12 text-base shadow-sm focus:border-[#8B1A3D] focus:ring-[#8B1A3D]"
                    />
                    <Button 
                        type="submit"
                        disabled={isLoading}
                        className="h-12 px-8 bg-[#1a1a1a] hover:bg-[#8B1A3D] text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 sm:w-auto w-full"
                    >
                        {isLoading ? "Unlocking..." : "Unlock"}
                    </Button>
                </form>
                <p className="text-xs text-muted-foreground mt-2 lg:ml-1">
                    Join 10k+ early adopters waiting for access.
                </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;