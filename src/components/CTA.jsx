import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { BOOK_SLOT_URL } from '../data/constants';

const container = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

export function CTA() {
  return (
    <section id="book" className="section-padding" style={{ background: 'var(--text-1)', position: 'relative', overflow: 'hidden' }}>

      {/* Dynamic Background */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.4 }}>
        <div className="blob-bg" style={{ width: '80vw', height: '80vw', background: 'var(--primary)', top: '-40%', left: '-20%' }} />
        <div className="blob-bg" style={{ width: '70vw', height: '70vw', background: 'var(--secondary)', bottom: '-30%', right: '-20%', animationDelay: '-3s' }} />
      </div>

      {/* Noise Overlay */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.4, mixBlendMode: 'overlay', backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="glass-panel"
        style={{
          maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1,
          padding: '80px 40px', borderRadius: '40px', background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 30px 60px -15px rgba(0,0,0,0.5)',
          backdropFilter: 'blur(32px)'
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', padding: '8px 20px', borderRadius: '100px', marginBottom: '24px' }}>
          <Sparkles size={16} color="white" />
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'white', letterSpacing: '0.5px' }}>
            LIMITED SLOTS AVAILABLE
          </span>
        </div>

        <h2 className="playfair" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, marginBottom: '24px', color: 'white', lineHeight: 1.1 }}>
          Ready to Have a Chat?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 'clamp(1.1rem, 2vw, 1.25rem)', marginBottom: '48px', maxWidth: '600px', margin: '0 auto 48px auto' }}>
          One exclusive session. Zero judgement. All your doubts cleared by real students who have been exactly where you are.
        </p>

        <motion.a
          whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255,255,255,0.3)' }}
          whileTap={{ scale: 0.95 }}
          href={BOOK_SLOT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shimmer"
          style={{
            background: 'white', color: 'var(--text-1)', fontWeight: 800, padding: '20px 48px', fontSize: '18px',
            borderRadius: '999px', display: 'inline-flex', alignItems: 'center', gap: '12px',
            textDecoration: 'none', transition: 'all 0.3s'
          }}
        >
          <span>Book Your Free Slot Now</span>
          <ArrowRight size={20} />
        </motion.a>

        <div style={{ marginTop: '32px', display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {['Free to join', 'No mentors', 'Just seniors'].map((text, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.6)', fontSize: '15px', fontWeight: 500 }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)' }} />
              {text}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
