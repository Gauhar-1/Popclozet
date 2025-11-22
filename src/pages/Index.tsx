import Navigation from "@/components/Navigation";
import BenefitGrid from "@/components/BenefitGrid";
import FAQ from "@/components/FAQ";
import FounderNote from "@/components/FounderNote";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import heroImage from "@/assets/trendy-outfits.webp";
import { toast } from "sonner";
import Hero from "@/components/Hero";
import Testimonials from "@/components/testimonials";
import HowItWorks from "@/components/HowItWorks";


const Index = () => {

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

      
      <Testimonials />
      {/* How It Works - Circular Design */}
      <HowItWorks />

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
