import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { seniorsData, BOOK_SLOT_URL } from '../data/constants';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export function MeetSeniors() {
  return (
    <section className="section-padding" style={{ background: 'var(--bg-1)', position: 'relative' }}>

      {/* Decorative gradient spot */}
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', width: '80vw', height: '400px', background: 'radial-gradient(ellipse, rgba(118, 120, 237, 0.08) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }} />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}
      >
        <motion.div variants={item} style={{ textAlign: 'center', marginBottom: 'clamp(40px, 5vw, 60px)' }}>
          <span className="section-label" style={{ background: 'rgba(118, 120, 237, 0.1)', color: 'var(--secondary)' }}>Meet Your Seniors</span>
          <h2 style={{ maxWidth: '800px', margin: '0 auto', fontSize: 'clamp(32px, 4vw, 44px)', lineHeight: 1.15 }}>
            Real students. Real stories.<br />
            <span style={{ color: 'var(--secondary)', fontStyle: 'italic', fontWeight: 400 }}>Real advice.</span>
          </h2>
        </motion.div>

        {/* Masonry-style grid for a bit of cascading feel */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px 32px' }}>
          {seniorsData.map((senior, idx) => (
            <motion.div
              key={idx}
              variants={item}
              whileHover={{ y: -8 }}
              style={{
                padding: '36px 32px',
                borderRadius: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(118, 120, 237, 0.15)',
                boxShadow: '0 20px 40px -20px rgba(118, 120, 237, 0.15)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{
                  width: '68px', height: '68px', borderRadius: '50%',
                  background: `linear-gradient(135deg, ${senior.bgGradient})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontWeight: 800, fontSize: '26px',
                  boxShadow: `0 12px 24px -8px ${senior.accent}`,
                  border: '2px solid white'
                }}>
                  {senior.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '22px', letterSpacing: '-0.03em' }}>{senior.name}</div>
                  <div style={{ color: senior.accent, fontSize: '13px', background: `${senior.accent}15`, padding: '4px 12px', borderRadius: '50px', display: 'inline-block', fontWeight: 700, marginTop: '6px' }}>
                    {senior.year}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {senior.traits.map((trait, i) => (
                  <span key={i} style={{ background: 'var(--bg-1)', color: 'var(--text-1)', fontSize: '12px', padding: '6px 14px', borderRadius: '50px', border: '1px solid rgba(0,0,0,0.06)', fontWeight: 600 }}>
                    {trait}
                  </span>
                ))}
              </div>

              {/* Chat-bubble style quote block */}
              <div style={{
                position: 'relative',
                marginTop: '12px',
                padding: '24px',
                background: `linear-gradient(to right bottom, ${senior.accent}0a, transparent)`,
                borderRadius: '24px 24px 24px 8px', /* Chat bubble tail effect */
                border: `1px solid ${senior.accent}20`,
                flex: 1
              }}>
                <Quote size={24} color={senior.accent} style={{ opacity: 0.3, marginBottom: '12px' }} />
                <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '18px', color: 'var(--text-1)', lineHeight: 1.6, margin: 0 }}>
                  "{senior.quote}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={item} style={{ textAlign: 'center', marginTop: 'clamp(40px, 6vw, 60px)' }}>
          <p style={{ color: 'var(--text-2)', fontSize: 'clamp(16px, 2vw, 18px)', marginBottom: '24px', maxWidth: '420px', margin: '0 auto 24px auto' }}>
            Ready when you are. Reserve a spot for the next session.
          </p>
          <motion.a
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(153, 27, 27, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            href={BOOK_SLOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              padding: '16px 36px', borderRadius: '99px', fontWeight: 600, fontSize: '16px',
              textDecoration: 'none', color: 'white',
              background: 'linear-gradient(135deg, var(--hero-from), var(--primary))',
              boxShadow: '0 8px 24px rgba(153, 27, 27, 0.25)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            Book Your Slot
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
