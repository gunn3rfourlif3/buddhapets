import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Rituals } from "@/components/sections/Rituals";
import { RitualBuilder } from "@/components/sections/RitualBuilder";
import { Products } from "@/components/sections/Products";
import { QuizBand } from "@/components/sections/QuizBand";
import { Reviews } from "@/components/sections/Reviews";
import { Faq } from "@/components/sections/Faq";
import { Journal } from "@/components/sections/Journal";
import { Footer } from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Rituals />
        <RitualBuilder />
        <Products />
        <QuizBand />
        <Reviews />
        <Faq />
        <Journal />
      </main>
      <Footer />
    </>
  );
}
