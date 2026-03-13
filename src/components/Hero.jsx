import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { BOOK_SLOT_URL } from '../data/constants';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

// ── Video — autoplays muted on mount, full width ─────────────
function VideoBlock() {
  const VIDEO_ID = 'ONe4bhW0ISs';

  return (
    <motion.div
      variants={item}
      style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}
    >
      {/* Label */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: '8px', marginBottom: '16px'
      }}>
        <div style={{ height: '1px', width: '40px', background: 'rgba(153,27,27,0.2)' }} />
        <span style={{
          fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em',
          textTransform: 'uppercase', color: 'var(--primary)',
          fontFamily: "'DM Mono', monospace", opacity: 0.7
        }}>Watch what happens in a session</span>
        <div style={{ height: '1px', width: '40px', background: 'rgba(153,27,27,0.2)' }} />
      </div>

      {/* Video card — autoplay + muted so browsers allow it */}
      <motion.div
        whileHover={{ boxShadow: '0 32px 64px -16px rgba(153,27,27,0.25)' }}
        style={{
          position: 'relative',
          aspectRatio: '16 / 9',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 20px 48px -12px rgba(153,27,27,0.18), 0 4px 16px rgba(0,0,0,0.06)',
          border: '1.5px solid rgba(153,27,27,0.14)',
          background: '#1a0505',
          transition: 'box-shadow 0.4s ease'
        }}
      >
        <iframe
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
          src={`https://www.youtube.com/embed/${VIDEO_ID}?rel=0&modestbranding=1&autoplay=1&mute=1&playsinline=1`}
          title="What happens in an AMA session?"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '80px',
        paddingBottom: '80px',
        position: 'relative',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at top, var(--bg-1) 0%, var(--bg-2) 100%)'
      }}
    >
      {/* Ambient floating background elements */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <motion.div
          animate={{ transform: ['translate(0px,0px) scale(1)', 'translate(40px,-50px) scale(1.1)', 'translate(0px,0px) scale(1)'] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', width: '60vw', height: '60vw', maxWidth: '800px', maxHeight: '800px',
            background: 'var(--primary)', filter: 'blur(120px)', opacity: 0.08, borderRadius: '50%',
            top: '-20%', left: '-10%', mixBlendMode: 'multiply'
          }}
        />
        <motion.div
          animate={{ transform: ['translate(0px,0px) scale(1)', 'translate(-40px,50px) scale(1.1)', 'translate(0px,0px) scale(1)'] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{
            position: 'absolute', width: '50vw', height: '50vw', maxWidth: '700px', maxHeight: '700px',
            background: 'var(--accent-2)', filter: 'blur(100px)', opacity: 0.06, borderRadius: '50%',
            bottom: '-10%', right: '-10%', mixBlendMode: 'multiply'
          }}
        />
      </div>

      {/* Main content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          textAlign: 'center',
          zIndex: 1,
          padding: '0 5%',
          position: 'relative',
          width: '100%'
        }}
      >
        {/* Eyebrow badge */}
        <motion.div variants={item}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'linear-gradient(135deg, rgba(153,27,27,0.08) 0%, rgba(243,91,4,0.05) 100%)',
            border: '1px solid rgba(153,27,27,0.15)',
            padding: '6px 16px', borderRadius: '100px',
            marginBottom: '32px', boxShadow: '0 4px 12px rgba(153,27,27,0.05)'
          }}>
            <Sparkles size={14} color="var(--primary)" />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Exclusively for 12th Class Students
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div variants={item}>
          <h1 className="hero-headline" style={{ marginBottom: '24px', position: 'relative' }}>
            <span style={{ display: 'block', color: 'var(--text-1)' }}>Ask NIAT Seniors</span>
            <span style={{ display: 'block', color: 'var(--text-1)', marginBottom: '8px' }}>Anything.</span>
            <span className="gradient-text" style={{ display: 'inline-block', fontWeight: 800, position: 'relative' }}>
              Get Honest Answers.
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
                style={{
                  position: 'absolute', bottom: '4px', left: 0, right: 0, height: '8px',
                  background: 'rgba(243,91,4,0.2)', transformOrigin: 'left', zIndex: -1, borderRadius: '4px'
                }}
              />
            </span>
          </h1>
        </motion.div>

        {/* Lead */}
        <motion.p
          variants={item}
          className="body-lead"
          style={{ maxWidth: '600px', margin: '0 auto 48px auto', fontSize: 'clamp(16px, 2vw, 20px)', lineHeight: 1.6, color: 'var(--text-2)' }}
        >
          One-to-many sessions with seniors. No mentors, no counsellors —
          just one or two seniors clearing all your doubts, unfiltered.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', marginBottom: '32px' }}>
          <motion.a
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(153,27,27,0.5)' }}
            whileTap={{ scale: 0.95 }}
            href={BOOK_SLOT_URL} target="_blank" rel="noopener noreferrer"
            className="btn-primary shimmer"
            style={{ padding: '16px 36px', gap: '10px', fontSize: '16px' }}
          >
            <span>Book Your Slot</span>
            <ArrowRight size={18} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(30,41,59,0.05)', borderColor: 'rgba(30,41,59,0.2)' }}
            whileTap={{ scale: 0.95 }}
            href="#how"
            style={{
              padding: '16px 36px', fontFamily: "'DM Sans', sans-serif",
              fontSize: '16px', fontWeight: 600, color: 'var(--text-1)',
              border: '1px solid rgba(30,41,59,0.12)', borderRadius: '999px',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              textDecoration: 'none', transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)', background: 'white'
            }}
          >
            How it works
          </motion.a>
        </motion.div>

        {/* Social proof */}
        <motion.div
          variants={item}
          style={{ marginBottom: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', opacity: 0.8 }}
        >
          <div style={{ display: 'flex', marginLeft: '10px' }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={{
                width: '32px', height: '32px', borderRadius: '50%',
                border: '2px solid var(--bg-1)',
                background: `url("https://i.pravatar.cc/100?img=${i + 10}") center/cover`,
                marginLeft: '-10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
              }} />
            ))}
          </div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-2)' }}>
            Joined by <span style={{ color: 'var(--primary)' }}>500+</span> students this week.
          </div>
        </motion.div>

        {/* ── Video — autoplay muted, full width ── */}
        <VideoBlock />
      </motion.div>
    </section>
  );
}