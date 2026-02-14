import { Hero } from '@/components/home/Hero';
import { About } from '@/components/home/About';
import { FeaturedCaseStudies } from '@/components/home/FeaturedCaseStudies';
import { CTA } from '@/components/home/CTA';
import { Footer } from '@/components/home/Footer';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <FeaturedCaseStudies />
      <CTA />
      <Footer />
    </>
  );
}
