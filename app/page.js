import React from 'react'
import Navbar from '@/components/Navbar';
import Hero from "@/components/Hero";
import Infrastructure from '@/components/Infrastructure';
import DeploymentSteps from "@/components/deployementSetup";
import Pricing from '@/components/pricing';
import FAQ from "@/components/FAQ";
import CTA from '@/components/CTA';
import Footer from "@/components/Footer";

const page = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Infrastructure />
      <DeploymentSteps />
      <Pricing />
      <FAQ />
      <CTA/>
      <Footer />
    </main>
  )
}

export default page
