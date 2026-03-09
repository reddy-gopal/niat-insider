import { motion } from 'framer-motion';
import { Target, Users, Unlock, Play } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

export function HowItWorks() {
  return (
    <section className="section-padding" id="how" style={{ background: 'var(--bg-2)' }}>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={item} style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="section-label">How It Works</span>
          <h2 style={{ maxWidth: '800px', margin: '0 auto' }}>
            No mentors. No counsellors.<br />
            <span style={{ color: 'var(--primary)', fontStyle: 'italic', fontWeight: 400 }}>Just you and the senior.</span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', marginBottom: '80px', maxWidth: '1100px', margin: '0 auto 80px auto' }}>
          {[
            { icon: <Target className="gradient-text" size={32} />, title: "Honest Answers", desc: "No filtered corporate advice. Your senior says it as it is." },
            { icon: <Users className="gradient-text" size={32} />, title: "1-on-1 Sessions", desc: "Book a private slot and talk freely about anything." },
            { icon: <Unlock className="gradient-text" size={32} />, title: "Zero Judgement", desc: "Ask what you're too scared to Google. We've all been there." }
          ].map((card, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ y: -8, boxShadow: '0 20px 40px -15px rgba(0,0,0,0.1)' }}
              className="glass-panel"
              style={{ padding: '40px 32px', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'linear-gradient(to bottom, var(--primary), var(--accent-2))' }} />
              <div style={{ width: '64px', height: '64px', borderRadius: '20px', background: 'rgba(153, 27, 27, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                {card.icon}
              </div>
              <h3 style={{ fontSize: '22px', marginBottom: '12px', fontWeight: 700 }}>{card.title}</h3>
              <p style={{ color: 'var(--text-2)', fontSize: '16px', lineHeight: 1.6 }}>{card.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div variants={item} style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="how-video glass-panel"
            style={{
              aspectRatio: '16/8',
              borderRadius: '32px',
              background: 'url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80") center/cover',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexDirection: 'column',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)'
            }}
          >
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(153, 27, 27, 0.4))' }} />

            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.4)' }}
              >
                <Play fill="white" size={32} style={{ marginLeft: '4px' }} />
              </motion.div>
              <h3 className="playfair" style={{ marginTop: '24px', fontSize: '24px', fontWeight: 700, letterSpacing: '0.5px' }}>
                Watch: What happens in an AMA session?
              </h3>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
