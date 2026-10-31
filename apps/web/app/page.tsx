import { Nav } from '@/components/home/Nav';
import { Hero } from '@/components/home/Hero';
import { CaseStudiesSection } from '@/components/home/CaseStudiesSection';
import { Architecture } from '@/components/home/Architecture';
import { About } from '@/components/home/About';
import { Testimonials } from '@/components/home/Testimonials';
import { FAQ } from '@/components/home/FAQ';
import { Contact } from '@/components/home/Contact';
import { Footer } from '@/components/home/Footer';
import { ScrollHandler } from '@/components/ScrollHandler';

export default function HomePage() {
  return (
    <>
      <ScrollHandler />
      <Nav />
      <main>
        <Hero />
        <CaseStudiesSection />
        <Architecture />
        <About />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
