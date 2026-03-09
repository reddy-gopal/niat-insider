import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { seniorsData, BOOK_SLOT_URL } from '../data/constants';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

export function MeetSeniors() {
  return (
    <section className="section-padding" style={{ background: 'var(--bg-1)' }}>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        style={{ maxWidth: '1200px', margin: '0 auto' }}
      >
        <motion.div variants={item} style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="section-label" style={{ background: 'rgba(118, 120, 237, 0.1)', color: 'var(--secondary)' }}>Meet Your Seniors</span>
          <h2 style={{ maxWidth: '800px', margin: '0 auto' }}>
            Real students. Real stories.<br />
            <span style={{ color: 'var(--secondary)', fontStyle: 'italic', fontWeight: 400 }}>Real advice.</span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          {seniorsData.map((senior, idx) => (
            <motion.div
              key={idx}
              variants={item}
              whileHover={{ y: -8, scale: 1.01 }}
              className="glass-panel"
              style={{ padding: '32px', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '24px', background: 'white' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: `linear-gradient(135deg, ${senior.bgGradient})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '24px', boxShadow: `0 8px 20px -8px ${senior.accent}` }}>
                  {senior.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '22px', letterSpacing: '-0.02em' }}>{senior.name}</div>
                  <div style={{ color: senior.accent, fontSize: '13px', background: `${senior.accent}15`, padding: '4px 12px', borderRadius: '50px', display: 'inline-block', fontWeight: 700, marginTop: '6px' }}>
                    {senior.year}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {senior.traits.map((trait, i) => (
                  <span key={i} style={{ background: 'var(--bg-1)', color: 'var(--text-2)', fontSize: '13px', padding: '6px 14px', borderRadius: '50px', border: '1px solid var(--border)', fontWeight: 500 }}>
                    {trait}
                  </span>
                ))}
              </div>

              <div style={{ position: 'relative', marginTop: '12px', padding: '20px', background: 'var(--bg-2)', borderRadius: '16px', flex: 1 }}>
                <Quote size={24} color={senior.accent} style={{ opacity: 0.3, marginBottom: '8px' }} />
                <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '18px', color: 'var(--text-1)', lineHeight: 1.6, margin: 0 }}>
                  "{senior.quote}"
                </p>
              </div>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={BOOK_SLOT_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '100%', padding: '16px', borderRadius: '12px', fontWeight: 600, cursor: 'pointer',
                  background: senior.accent, color: 'white', textDecoration: 'none', textAlign: 'center', display: 'block', fontSize: '15px', boxShadow: `0 10px 20px -10px ${senior.accent}`
                }}
              >
                Book Session with {senior.name}
              </motion.a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
