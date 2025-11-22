import { useState, useEffect, useRef } from "react";
import { Star, Quote, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: 1,
    name: "Ananya S.",
    role: "Marketing Student",
    event: "College Farewell",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
    rentedItem: "Zara Sequined Evening Gown",
    priceSaved: "Saved ₹4,500",
    quote: "I didn't want to spend 6k on a dress I'd wear once for farewell. Popclozet sent this in 60 mins. It smelled fresh, fit perfectly, and I felt like a celebrity without the bankruptcy.",
  },
  {
    id: 2,
    name: "Rahul M.",
    role: "Tech Lead",
    event: "Investor Pitch",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop",
    rentedItem: "Raymond Structured Blazer Set",
    priceSaved: "Saved ₹8,200",
    quote: "Had a surprise pitch meeting and my wardrobe was a mess. The 'Instant Delivery' saved my life. The suit was crisp, professional, and gave me the confidence to nail the presentation.",
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Fashion Bloggers",
    event: "Music Festival",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
    rentedItem: "Boho Chic Co-ord Sets",
    priceSaved: "Saved ₹3,000 each",
    quote: "We need new content daily, and buying is impossible. Popclozet is our infinite closet now. We mix, match, shoot, and return. It's the smartest hack for anyone in fashion.",
  },
  {
    id: 4,
    name: "Arjun K.",
    role: "Architect",
    event: "Best Friend's Sangeet",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
    rentedItem: "Manyavar Indo-Western Set",
    priceSaved: "Saved ₹15,000",
    quote: "Buying a heavy sherwani for one night creates so much closet guilt. I rented this designer piece instead. It looked absolutely brand new, and the return pickup was seamless. Smartest decision ever.",
  },
  {
    id: 5,
    name: "Sanya D.",
    role: "Freelance Designer",
    event: "Goa Vacation",
    image: "https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?q=80&w=1000&auto=format&fit=crop",
    rentedItem: "Resort Wear Collection",
    priceSaved: "Saved ₹6,200",
    quote: "I wanted 'aesthetic' fits for my trip but didn't want to buy clothes I'd never wear in the city. Popclozet let me rent 3 premium beach looks for the price of one top. My travel photos looked insane!",
  },
  {
    id: 6,
    name: "Meera T.",
    role: "HR Manager",
    event: "Anniversary Dinner",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop",
    rentedItem: "Urbanic Satin Midi Dress",
    priceSaved: "Saved ₹2,800",
    quote: "Realized at 4 PM I had nothing nice for our anniversary dinner. Ordered this satin dress, and it arrived at my office by 5:30. Saved the date, saved my wallet, and I felt amazing.",
  },
];

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Refs for animation targets
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  // Auto-play logic
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000); // Change every 6 seconds
    return () => clearInterval(interval);
  }, [active]);

  const animateSlide = (direction: "next" | "prev", nextIndex: number) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setActive(nextIndex);
        setIsAnimating(false);
        
        // Animate In
        gsap.fromTo([imageRef.current, quoteRef.current, detailsRef.current], 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" }
        );
      }
    });

    // Animate Out
    tl.to([quoteRef.current, detailsRef.current], {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: "power2.in",
    }).to(imageRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.4,
      ease: "power2.in",
    }, "<"); // Run simultaneously
  };

  const handleNext = () => {
    const nextIndex = active === testimonials.length - 1 ? 0 : active + 1;
    animateSlide("next", nextIndex);
  };

  const handlePrev = () => {
    const nextIndex = active === 0 ? testimonials.length - 1 : active - 1;
    animateSlide("prev", nextIndex);
  };

  const current = testimonials[active];

  return (
    <section id="testimonials" className="py-20 md:py-32 bg-[#FAFAFA] relative overflow-hidden">
      {/* Background Decor - Big Quote Mark */}
      <div className="absolute top-20 right-[5%] text-[#8B1A3D]/5 font-serif text-[20rem] leading-none select-none pointer-events-none font-black">
        ”
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#8B1A3D] font-bold tracking-widest text-xs uppercase mb-2 block">
            Real Stories, Real Style
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900">
            Loved by the <span className="italic text-gray-400">Early Adopters</span>
          </h2>
        </div>

        {/* --- MAIN TESTIMONIAL COMPONENT --- */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          
          {/* LEFT: User Image (The Proof) */}
          <div className="w-full lg:w-1/2 relative" ref={imageRef}>
            <div className="relative z-20 aspect-[4/5] md:aspect-[4/3] lg:aspect-square rounded-[32px] overflow-hidden shadow-2xl">
              <img 
                src={current.image} 
                alt={current.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* "What I Rented" Tag - Authenticity Booster */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/20 transform transition-transform hover:scale-105 duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase text-gray-500 font-bold tracking-wider mb-1">She Rented</p>
                    <p className="text-sm font-serif font-bold text-gray-900">{current.rentedItem}</p>
                  </div>
                  <div className="text-right">
                     <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg">
                       {current.priceSaved}
                     </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decoration Circles */}
            <div className="absolute -top-4 -left-4 w-48 z-10 h-48 bg-[#8B1A3D] rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse" />
            <div className="absolute -bottom-4 -right-4 w-48 z-10 h-48 bg-pink-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse" />
          </div>

          {/* RIGHT: The Story */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center" ref={contentRef}>
            
            {/* Quote Icon */}
            <div className="mb-6">
               <div className="w-12 h-12 bg-[#8B1A3D]/10 rounded-full flex items-center justify-center text-[#8B1A3D]">
                 <Quote className="w-5 h-5 fill-current" />
               </div>
            </div>

            {/* The Quote */}
            <div ref={quoteRef} className="min-h-[160px] md:min-h-[140px]">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium leading-tight text-gray-900 mb-6">
                "{current.quote}"
              </h3>
            </div>

            {/* User Details */}
            <div ref={detailsRef} className="flex flex-col gap-6">
               <div className="flex items-center gap-4">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      {current.name}
                      <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-50" />
                    </h4>
                    <p className="text-gray-500 text-sm">{current.role} • <span className="text-[#8B1A3D] font-medium">{current.event}</span></p>
                  </div>
                  
                  {/* Rating */}
                  <div className="ml-auto flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
               </div>

               {/* Navigation Controls */}
               <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  <div className="flex gap-2">
                    <button 
                      onClick={handlePrev}
                      className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#8B1A3D] hover:border-[#8B1A3D] hover:text-white transition-all duration-300"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={handleNext}
                      className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#8B1A3D] hover:border-[#8B1A3D] hover:text-white transition-all duration-300"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {/* Progress Indicators */}
                  <div className="flex gap-2 ml-4">
                    {testimonials.map((_, idx) => (
                      <div 
                        key={idx}
                        className={cn(
                          "h-1.5 rounded-full transition-all duration-500",
                          active === idx ? "w-8 bg-[#8B1A3D]" : "w-2 bg-gray-200"
                        )}
                      />
                    ))}
                  </div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;