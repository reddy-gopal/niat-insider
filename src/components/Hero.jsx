import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { BOOK_SLOT_URL } from '../data/constants';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

export function Hero() {
  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '72px', position: 'relative', overflow: 'hidden' }}>

      {/* Background blobs */}
      <div className="blob-bg" style={{ width: '60vw', height: '60vw', background: 'var(--primary)', top: '-20%', left: '-10%', opacity: 0.08 }} />
      <div className="blob-bg" style={{ width: '50vw', height: '50vw', background: 'var(--accent-2)', bottom: '-10%', right: '-10%', opacity: 0.06, animationDelay: '-5s' }} />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', zIndex: 1, padding: '0 5%' }}
      >
        <motion.div variants={item}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(153, 27, 27, 0.06)', border: '1px solid rgba(153, 27, 27, 0.15)', padding: '8px 20px', borderRadius: '100px', marginBottom: '24px' }}>
            <Sparkles size={16} color="var(--primary)" />
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)', letterSpacing: '0.5px' }}>
              EXCLUSIVELY FOR 12TH CLASS STUDENTS
            </span>
          </div>
        </motion.div>

        <motion.h1 variants={item} style={{ marginBottom: '20px' }}>
          Ask NIAT Seniors Anything.<br />
          <span className="gradient-text">Get Honest Answers.</span>
        </motion.h1>

        <motion.p variants={item} style={{ fontSize: 'clamp(1.1rem, 2vw, 1.25rem)', color: 'var(--text-2)', lineHeight: 1.6, marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px auto' }}>
          Interactive sessions with seniors. No mentors, no counsellors. Just you and the senior. Book a private slot to clear all your doubts.
        </motion.p>

        <motion.div variants={item} style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={BOOK_SLOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary shimmer"
            style={{ padding: '16px 36px', fontSize: '16px', gap: '10px' }}
          >
            <span>Book Your Slot</span>
            <ArrowRight size={18} />
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(30, 41, 59, 0.05)' }}
            whileTap={{ scale: 0.95 }}
            href="#how"
            style={{ padding: '16px 36px', fontSize: '16px', fontWeight: 600, color: 'var(--text-1)', border: '1px solid var(--border)', borderRadius: '999px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'all 0.3s' }}
          >
            How it works
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
