// Screen 1: Landing / Home Page
// Components: HeroSection, FeaturedCrops, HowItWorks, Testimonials, Footer CTA

import HeroSection     from '../../components/home/HeroSection';
import FeaturedCrops   from '../../components/home/FeaturedCrops';
import HowItWorks      from '../../components/home/HowItWorks';
import Testimonials    from '../../components/home/Testimonials';

const HomePage = () => {
  return (
    <main>
      {/* Screen 1.1 — Hero: Heading, Search, Stats */}
      <HeroSection />

      {/* Screen 1.2 — Featured Crops Grid */}
      <FeaturedCrops />

      {/* Screen 1.3 — How It Works (4 steps) */}
      <HowItWorks />

      {/* Screen 1.4 — Farmer Testimonials */}
      <Testimonials />

      {/* Note: Footer CTA is inside Footer.jsx — shown on all pages */}
    </main>
  );
};

export default HomePage;
