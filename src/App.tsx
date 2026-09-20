import { useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import {
  About,
  EnergyFlow,
  Solutions,
  Process,
  Projects,
  Statistics,
  WhyRoyalSolar,
  CTA,
} from "./components/Sections";
import Contact from "./components/Contact";
import GoodWe from "./components/GoodWe";
import Footer from "./components/Footer";
import { useGsapReveal } from "./hooks/useGsapReveal";
export default function App() {
  const root = useRef<HTMLDivElement>(null);
  useGsapReveal(root);
  return (
    <div ref={root}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <EnergyFlow />
        <Solutions />
        <GoodWe />
        <Process />
        <Projects />
        <Statistics />
        <WhyRoyalSolar />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
