import React from 'react';
import { Hero } from '../components/Hero';
import { InvestmentMetrics } from '../components/InvestmentMetrics';
import { FeaturedProperties } from '../components/FeaturedProperties';
import { HowItWorks } from '../components/HowItWorks';
import { Testimonials } from '../components/Testimonials';
export const HomePage = () => {
  return <>
      <Hero />
      <InvestmentMetrics />
      <FeaturedProperties />
      <HowItWorks />
      <Testimonials />
    </>;
};