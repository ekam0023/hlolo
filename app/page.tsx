import Nav from "@/components/Nav";
import ExplodeHero from "@/components/ExplodeHero";
import MarqueeStrip from "@/components/MarqueeStrip";
import Specs from "@/components/Specs";
import Features from "@/components/Features";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <ExplodeHero />
      <MarqueeStrip />
      <Specs />
      <Features />
      <CTA />
      <Footer />
    </main>
  );
}
