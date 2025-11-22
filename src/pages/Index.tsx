import Navigation from "@/components/Navigation";
import SyntheticHero from "@/components/ui/synthetic-hero";
import CircularHowItWorks from "@/components/CircularHowItWorks";
import BenefitGrid from "@/components/BenefitGrid";
import { Carousel, TestimonialCard } from "@/components/ui/retro-testimonial";
import { iTestimonial } from "@/components/ui/retro-testimonial";
import FAQ from "@/components/FAQ";
import FounderNote from "@/components/FounderNote";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import heroImage from "@/assets/trendy-outfits.webp";
import { toast } from "sonner";
import Hero from "@/components/Hero";

type TestimonialDetails = {
  [key: string]: iTestimonial & { id: string };
};

const testimonialData = {
  ids: [
    "testimonial-1",
    "testimonial-2",
    "testimonial-3",
    "testimonial-4",
    "testimonial-5",
  ],
  details: {
    "testimonial-1": {
      id: "testimonial-1",
      rating: 5,
      headline: "Perfect for my last-minute date!",
      description:
        "Popclozet is a game-changer! I had a last-minute date and got the perfect dress delivered before my cab even arrived. 10/10.",
      profileImage:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      name: "Riya S.",
      designation: "Verified Early Tester • Juhu",
    },
    "testimonial-2": {
      id: "testimonial-2",
      rating: 4.5,
      headline: "I'm obsessed... without going broke.",
      description:
        "I'm obsessed. I get to wear new, trendy clothes for my college fests every week without going broke or cluttering my wardrobe.",
      profileImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      name: "Aman K.",
      designation: "Verified Early Tester • Bandra",
    },
    "testimonial-3": {
      id: "testimonial-3",
      rating: 5,
      headline: "Finally used my favorite jeans again.",
      description:
        "I just wanted a new top to go with jeans I already own. Rented a super trendy one from the 'Mix & Match' closet. It was so easy and saved me from buying another thing I'd barely wear.",
      profileImage:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      name: "Pooja G.",
      designation: "Verified Early Tester • Andheri",
    },
    "testimonial-4": {
      id: "testimonial-4",
      rating: 4,
      headline: "The return process is so simple.",
      description:
        "Used Popclozet for a friend's birthday brunch. Got a really stylish shirt. The best part? The return was just a simple pickup. No washing, no hassle. Feels much smarter than buying.",
      profileImage:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      name: "Karan V.",
      designation: "Verified Early Tester • Powai",
    },
    "testimonial-5": {
      id: "testimonial-5",
      rating: 4.5,
      headline: "Was skeptical, but I'm converted.",
      description:
        "I was a bit skeptical about renting, but I'm converted. The outfit arrived sealed in a bag, was perfectly clean, and felt brand new. Really impressed with the quality.",
      profileImage:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
      name: "Sneha M.",
      designation: "Verified Early Tester • Lower Parel",
    },
  },
};

const Index = () => {
  const cards = testimonialData.ids.map((cardId: string, index: number) => {
    const details = testimonialData.details as TestimonialDetails;
    return (
      <TestimonialCard
        key={cardId}
        testimonial={details[cardId]}
        index={index}
      />
    );
  });

  const handleEmailSubmit = (email: string) => {
    toast.success("Welcome to Popclozet! 🎉", {
      description: "You're on the early bird list. We'll be in touch soon!",
    });
    console.log("Email submitted:", email);
  };

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <Navigation />


      <Hero heroImage={heroImage}></Hero>

      {/* Benefit Grid */}
      <BenefitGrid />

      {/* Testimonials */}
      <section id="testimonials" className="py-16 md:py-24 px-4 bg-accent/20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-headline text-center mb-4 md:mb-6">
            Why Our Users Love Popclozet
          </h2>
          <p className="text-muted-foreground text-center mb-12 md:mb-16 text-base md:text-lg lg:text-xl">
            Real stories from our early testers
          </p>
          <Carousel items={cards} />
        </div>
      </section>

      {/* How It Works - Circular Design */}
      <CircularHowItWorks />

      {/* FAQ */}
      <FAQ />

      {/* Founder's Note */}
      <FounderNote />

      {/* Final CTA */}
      <FinalCTA />

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default Index;
