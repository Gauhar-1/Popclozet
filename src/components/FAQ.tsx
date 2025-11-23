import { useState, useRef, useEffect, useCallback, memo } from "react";
import { Plus, ArrowUpRight, MessageCircle } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "How does the 60-minute delivery work?",
    answer:
      "Once you place your order, our team picks, quality-checks, and packs your outfit from our local micro-warehouse. We partner with reliable delivery services to ensure your outfit arrives within 60 minutes. You'll get real-time tracking so you know exactly when it's arriving!",
  },
  {
    question: "What about hygiene and cleaning?",
    answer:
      "Every single outfit is professionally dry-cleaned and sanitized after each rental. We use eco-friendly cleaning methods and seal each item in a protective bag. Your outfit will arrive fresh, clean, and ready to wear - it's like getting brand new clothes every time.",
  },
  {
    question: "What if I spill something or damage an item?",
    answer:
      "Life happens! Minor wear and tear is completely covered. For accidental stains, we have a simple damage protection fee. Just let us know what happened when you return it, and we'll take care of the rest.",
  },
  {
    question: "How long is a standard rental?",
    answer:
      "Our standard rental is 48 hours. Need it longer? You can easily extend your rental through the app. We'll arrange a convenient pickup time when you're done - no washing required!",
  },
  {
    question: "Is this sustainable?",
    answer:
      "Absolutely! By sharing clothes, we dramatically reduce fashion waste. One outfit can be worn by dozens of people instead of sitting in a closet. Plus, our eco-friendly cleaning process and local delivery minimize environmental impact.",
  },
  {
    question: "What happens if my outfit doesn't fit?",
    answer:
      "We understand fit is everything. If it doesn't fit, request an instant exchange within 10 minutes of delivery, and we'll rush a size swap to you immediately.",
  },
];

const FAQItem = memo(({ item, index, isOpen, onClick }: { item: any, index: number, isOpen: boolean, onClick: () => void }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Animate Content Height
    if (isOpen) {
      gsap.to(contentRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(arrowRef.current, {
        rotation: 45,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
      });
      gsap.to(arrowRef.current, {
        rotation: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [isOpen]);

  return (
    <div 
      onClick={onClick}
      className="group border-b border-gray-200 cursor-pointer py-4 sm:py-6 md:py-8 transition-colors duration-500 hover:border-[#8B1A3D]"
    >
      {/* Header Row */}
      <div className="flex items-start justify-between gap-3 sm:gap-4 md:gap-6">
        
        <div className="flex items-baseline gap-3 sm:gap-4 md:gap-6 lg:gap-12 flex-1 min-w-0">
          {/* Index Number */}
          <span className={`font-mono text-xs sm:text-sm md:text-base transition-colors duration-300 shrink-0 ${isOpen ? "text-[#8B1A3D] font-bold" : "text-gray-300 group-hover:text-[#8B1A3D]"}`}>
            0{index + 1}
          </span>
          
          {/* Question */}
          <h3 className={`text-base sm:text-lg md:text-xl lg:text-3xl font-serif font-medium leading-tight transition-colors duration-300 ${isOpen ? "text-[#8B1A3D]" : "text-gray-900 group-hover:text-[#8B1A3D]"}`}>
            {item.question}
          </h3>
        </div>

        {/* Icon */}
        <div ref={arrowRef} className={`shrink-0 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border border-gray-200 flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-[#8B1A3D] border-[#8B1A3D]" : "bg-transparent group-hover:border-[#8B1A3D]"}`}>
           {isOpen ? (
             <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-white rotate-45" /> 
           ) : (
             <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-[#8B1A3D]" />
           )}
        </div>
      </div>

      {/* Answer Content (Animated) */}
      <div 
        ref={contentRef} 
        className="h-0 overflow-hidden opacity-0"
      >
        <div className="pt-4 sm:pt-6 pl-0 sm:pl-8 md:pl-[4.5rem] max-w-2xl">
          <p className="text-gray-500 text-sm sm:text-base md:text-lg leading-relaxed font-light">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
});

FAQItem.displayName = "FAQItem";

const FAQ = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Optimize with will-change
      const faqItems = document.querySelectorAll(".faq-item-anim");
      faqItems.forEach((el) => {
        gsap.set(el, { willChange: "transform, opacity" });
      });

      // Staggered entrance for the list items
      gsap.from(".faq-item-anim", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        force3D: true,
        clearProps: "willChange",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleToggle = useCallback((index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  }, [openIndex]);

  return (
    <section ref={containerRef} id="faq" className="relative py-12 sm:py-16 md:py-24 lg:py-32 bg-white overflow-hidden">
      
      {/* Background Decor: Big '?' Watermark */}
      <div className="absolute top-0 right-[5%] text-[15rem] sm:text-[25rem] md:text-[35rem] lg:text-[40rem] font-serif font-black text-gray-50 leading-none pointer-events-none select-none -z-10 opacity-60">
        ?
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        
        {/* Editorial Header - Redesigned */}
<div className="flex flex-col items-center text-center mb-8 sm:mb-12 md:mb-16 lg:mb-24 relative">
  
  {/* Subtext acting as the "Eyebrow" */}
  <span className="text-[#8B1A3D] font-bold tracking-[0.2em] text-[10px] sm:text-xs md:text-sm uppercase mb-3 sm:mb-4 md:mb-6 block relative z-10 px-4">
    Everything you need to know about Popclozet
  </span>

  {/* Main Headline */}
  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-medium text-gray-900 leading-[1.1] relative z-10 px-4">
    Got Questions? <br className="hidden sm:block" />
    <span className="relative inline-block mt-1 md:mt-2">
      We've Got <span className="font-black italic text-[#8B1A3D]">Answers.</span>
      
      {/* Decorative Vector Underline for "Answers" */}
      <svg 
        className="absolute w-[110%] h-4 sm:h-5 md:h-6 -bottom-1 sm:-bottom-2 md:-bottom-4 left-1/2 -translate-x-1/2 text-[#8B1A3D]/20 -z-10" 
        viewBox="0 0 100 10" 
        preserveAspectRatio="none"
      >
        <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
      </svg>
    </span>
  </h2>

  {/* Background blur for depth (Optional polish) */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-[#8B1A3D]/5 rounded-full blur-[80px] -z-0 pointer-events-none" />
</div>

        {/* The List */}
        <div className="border-t border-gray-200">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item-anim">
              <FAQItem 
                item={faq} 
                index={index} 
                isOpen={openIndex === index} 
                onClick={() => handleToggle(index)} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;