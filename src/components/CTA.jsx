import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { BOOK_SLOT_URL } from '../data/constants';

const container = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export function CTA() {
  return (
    <section id="book" className="section-padding" style={{ background: 'var(--text-1)', position: 'relative', overflow: 'hidden' }}>

      {/* Dynamic Background Gradients */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.6 }}>
        <div style={{ position: 'absolute', width: '80vw', height: '80vw', background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)', top: '-40%', left: '-20%', filter: 'blur(100px)', mixBlendMode: 'screen', opacity: 0.5 }} />
        <div style={{ position: 'absolute', width: '70vw', height: '70vw', background: 'radial-gradient(circle, var(--accent-2) 0%, transparent 70%)', bottom: '-30%', right: '-20%', filter: 'blur(100px)', mixBlendMode: 'screen', opacity: 0.4 }} />
      </div>

      {/* Noise Overlay */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.15, mixBlendMode: 'overlay', backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        style={{
          maxWidth: '960px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1,
          padding: 'clamp(40px, 6vw, 60px) 40px', borderRadius: '48px', background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 40px 80px -20px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.05)',
          backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)'
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', padding: '6px 18px', borderRadius: '100px', marginBottom: '32px', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}>
          <Sparkles size={14} color="#f9a826" />
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.1em' }}>
            LIMITED SLOTS AVAILABLE
          </span>
        </div>

        <h2 className="playfair" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, marginBottom: '24px', color: 'white', lineHeight: 1.1, textShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
          Ready to Have a Chat?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(1.1rem, 2vw, 1.25rem)', marginBottom: '48px', maxWidth: '640px', margin: '0 auto 48px auto', lineHeight: 1.6 }}>
          One exclusive session. Zero judgement. All your doubts cleared by real students who have been exactly where you are.
        </p>

        <motion.a
          whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(255,255,255,0.15), 0 0 0 4px rgba(255,255,255,0.1)' }}
          whileTap={{ scale: 0.95 }}
          href={BOOK_SLOT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shimmer"
          style={{
            background: 'white', color: '#000000', fontWeight: 800, padding: '20px 48px', fontSize: '18px',
            borderRadius: '999px', display: 'inline-flex', alignItems: 'center', gap: '12px',
            textDecoration: 'none', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <span>Book Your Free Slot Now</span>
          <ArrowRight size={20} />
        </motion.a>

        <div style={{ marginTop: '40px', display: 'flex', gap: '32px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {['Free to join', 'No mentors', 'Just seniors'].map((text, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.5)', fontSize: '15px', fontWeight: 600 }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }} />
              {text}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
