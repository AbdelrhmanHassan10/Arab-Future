"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesBar from "@/components/FeaturesBar";
import PremiumProperties from "@/components/PremiumProperties";
import WhyChooseUs from "@/components/WhyChooseUs";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import PropertyTypes from "@/components/PropertyTypes";
import Testimonials from "@/components/Testimonials";
import BlogSection from "@/components/BlogSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesBar />
        <PremiumProperties />
        <WhyChooseUs />
        <ServicesSection />
        <ProcessSection />
        <PropertyTypes />
        <Testimonials />
        <BlogSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
