"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import QuickSearch from "@/components/QuickSearch";
// import Stats from "@/components/sections/Stats";
import CeoMessage from "@/components/sections/CeoMessage";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Expertise from "@/components/sections/Expertise";
import FeaturedUnits from "@/components/sections/Projects";
import Achievements from "@/components/sections/Achievements";
import Materials from "@/components/sections/Materials";
import Vision from "@/components/sections/Vision";
import Partners from "@/components/sections/Partners";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <QuickSearch />
      {/* <Stats /> */}
      <About />
      <Services />
      <Expertise />
      <Achievements />
      <FeaturedUnits />
      <CeoMessage />
      <Materials />
      <Vision />
      <Partners />
      <Contact />
      <Footer />
    </>
  );
}
