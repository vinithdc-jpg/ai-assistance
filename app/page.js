import React from 'react'
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Infrastructure from "@/components/Infrastructure";
import DeploymentSteps from "@/components/DeploymentSteps";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

const page = () => {
  return (
    <main>
      <Header />
      <Hero />
      <Infrastructure />
      <DeploymentSteps />
      <Pricing />
      <FAQ />
      <CTABanner />
      <Footer />
    </main>
  )
}

export default page
