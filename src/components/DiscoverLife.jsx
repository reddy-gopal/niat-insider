import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { storiesData } from '../data/constants';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

export function DiscoverLife() {
  return (
    <section className="section-padding" style={{ background: 'var(--bg-2)', overflow: 'hidden' }}>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        style={{ maxWidth: '1200px', margin: '0 auto' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="section-label" style={{ background: 'rgba(243, 91, 4, 0.1)', color: 'var(--accent-3)' }}>Life at NIAT</span>
          <h2 style={{ marginBottom: '16px' }}>See it before you live it.</h2>
          <p style={{ color: 'var(--text-2)', fontSize: '18px' }}>Real campus experiences from current students.</p>
        </div>

        <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', padding: '20px 20px 40px', margin: '0 -20px', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
          {storiesData.map((story, idx) => (
            <motion.div
              key={idx}
              variants={item}
              whileHover={{ y: -10, scale: 1.02, boxShadow: `0 20px 40px -15px ${story.color}40` }}
              style={{
                minWidth: '220px',
                aspectRatio: '9/16',
                borderRadius: '24px',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '24px',
                color: 'white', cursor: 'pointer',
                background: `linear-gradient(180deg, ${story.color}cc 0%, rgba(30, 41, 59, 0.95) 100%)`
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'url("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80") center/cover', opacity: 0.4, mixBlendMode: 'overlay' }} />

              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  style={{ width: '56px', height: '56px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.4)', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}
                >
                  <Play fill="white" size={24} style={{ marginLeft: '4px' }} />
                </motion.div>
              </div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: '20px', letterSpacing: '-0.02em', marginBottom: '4px' }}>{story.name}</div>
                <div style={{ fontSize: '13px', opacity: 0.8, fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{story.year}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={item} style={{ textAlign: 'center', marginTop: '20px', fontStyle: 'italic', color: 'var(--text-2)', fontSize: '15px' }}>
          More stories coming soon ✦
        </motion.div>
      </motion.div>
    </section>
  );
}
