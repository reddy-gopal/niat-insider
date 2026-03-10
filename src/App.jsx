import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlobalStyles } from './styles/GlobalStyles';
import {
  Navbar,
  Hero,
  HowItWorks,
  MeetSeniors,
  DiscoverLife,
  FAQ,
  CTA,
  Footer
} from './components';

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      <div style={{ background: 'var(--bg-1)', minHeight: '100vh', overflowX: 'hidden' }}>
        <GlobalStyles />
        <Navbar scrolled={scrolled} />

        <Hero />
        <div className="gradient-divider" />
        <HowItWorks />
        <div className="gradient-divider-alt" />
        <MeetSeniors />
        <div className="gradient-divider" />
        <DiscoverLife />
        <div className="gradient-divider-alt" style={{ background: 'linear-gradient(to bottom, var(--bg-2) 0%, #1e293b 100%)' }} />
        <FAQ />
        <CTA />
        <Footer />
      </div>
    </AnimatePresence>
  );
}