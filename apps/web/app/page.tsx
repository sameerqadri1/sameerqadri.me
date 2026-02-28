import { Nav } from '@/components/home/Nav';
import { Hero } from '@/components/home/Hero';
import { Stats } from '@/components/home/Stats';
import { Marquee } from '@/components/home/Marquee';
import { About } from '@/components/home/About';
import { Expertise } from '@/components/home/Expertise';
import { Process } from '@/components/home/Process';
import { CaseStudiesSection } from '@/components/home/CaseStudiesSection';
import { Testimonials } from '@/components/home/Testimonials';
import { FAQ } from '@/components/home/FAQ';
import { Contact } from '@/components/home/Contact';
import { Footer } from '@/components/home/Footer';

export default function HomePage() {
  return (
    <>
      <Nav />
      <Hero />
      <Stats />
      <Marquee />
      <About />
      <Expertise />
      <Process />
      <CaseStudiesSection />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </>
  );
}
