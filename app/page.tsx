"use client";

import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
// import Stats from "@/components/sections/Stats";
import CeoMessage from "@/components/sections/CeoMessage";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import Achievements from "@/components/sections/Achievements";
import Materials from "@/components/sections/Materials";
import Vision from "@/components/sections/Vision";
import Partners from "@/components/sections/Partners";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <Hero />
      {/* <Stats /> */}
      <About />
      <Services />
      <Achievements />
      <Projects />
      <CeoMessage />
      <Materials />
      <Vision />
      <Partners />
      <Contact />
      <Footer />
    </SmoothScroll>
  );
}
