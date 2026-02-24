import { Nav } from '@/components/home/Nav';
import { Hero } from '@/components/home/Hero';
import { Marquee } from '@/components/home/Marquee';
import { Stats } from '@/components/home/Stats';
import { Expertise } from '@/components/home/Expertise';
import { CaseStudiesSection } from '@/components/home/CaseStudiesSection';
import { Testimonials } from '@/components/home/Testimonials';
import { Contact } from '@/components/home/Contact';
import { Footer } from '@/components/home/Footer';

export default function HomePage() {
  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <Stats />
      <Expertise />
      <CaseStudiesSection />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
