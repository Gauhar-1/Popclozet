import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FounderNote = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current && sectionRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-[#fafafa] to-white">
      <div className="container mx-auto max-w-4xl">
        <div ref={contentRef} className="space-y-4 md:space-y-6 lg:space-y-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-headline">
            A Note from Our Founders
          </h2>
          <div className="bg-white rounded-2xl p-6 md:p-8 lg:p-12 shadow-lg border border-border/50">
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground italic leading-relaxed px-2 md:px-4">
              "I started Popclozet from a simple, recurring panic: 'I have a closet full of clothes, but nothing to wear.' I was tired of spending money on trendy outfits I'd wear once... Popclozet is the solution I always wanted—an endless, sustainable closet that gives you the freedom to wear a new outfit for every new plan. Why limit your style?"
            </p>
          </div>
          <p className="text-sm md:text-base lg:text-lg font-semibold text-headline">
            — Viraj Pondkule & Vraj Shah, Founders of Popclozet
          </p>
        </div>
      </div>
    </section>
  );
};

export default FounderNote;
