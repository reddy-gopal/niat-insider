import { motion } from 'framer-motion';
import { Target, Users, Unlock, Play } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export function HowItWorks() {
  const cards = [
    {
      icon: <Target color="#f35b04" size={28} />,
      bg: "rgba(243, 91, 4, 0.1)",
      border: "rgba(243, 91, 4, 0.3)",
      title: "Honest Answers",
      desc: "No filtered corporate advice. Your senior says it as it is."
    },
    {
      icon: <Users color="#7678ed" size={28} />,
      bg: "rgba(118, 120, 237, 0.1)",
      border: "rgba(118, 120, 237, 0.3)",
      title: "One-to-Many Sessions",
      desc: "One or two seniors host each session — you and other students ask questions together."
    },
    {
      icon: <Unlock color="#991b1b" size={28} />,
      bg: "rgba(153, 27, 27, 0.1)",
      border: "rgba(153, 27, 27, 0.3)",
      title: "Zero Judgement",
      desc: "Ask what you're too scared to Google. We've all been there."
    }
  ];

  return (
    <section className="section-padding" id="how" style={{ background: 'var(--bg-2)', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, var(--border), transparent)' }} />
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <motion.div variants={item} style={{ textAlign: 'center', marginBottom: '70px' }}>
          <span className="section-label" style={{ background: 'rgba(153, 27, 27, 0.08)', color: 'var(--primary)' }}>How It Works</span>
          <h2 style={{ maxWidth: '800px', margin: '0 auto', fontSize: 'clamp(32px, 4vw, 44px)', lineHeight: 1.15 }}>
            No mentors. No counsellors.<br />
            <span style={{ color: 'var(--text-2)', fontStyle: 'italic', fontWeight: 400 }}>Just you and the senior.</span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', marginBottom: '80px', maxWidth: '1100px', margin: '0 auto 80px auto' }}>
          {cards.map((card, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ y: -8, scale: 1.02, boxShadow: `0 20px 40px -15px ${card.bg.replace('0.1', '0.4')}` }}
              className="glass-panel"
              style={{ padding: '40px 32px', borderRadius: '32px', position: 'relative', overflow: 'hidden', background: 'rgba(255, 255, 255, 0.6)', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)', border: '1px solid rgba(255,255,255,0.4)', backdropFilter: 'blur(16px)' }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: card.bg.replace('0.1', '1') }} />

              <div style={{
                width: '64px', height: '64px', borderRadius: '20px',
                background: card.bg, border: `1px solid ${card.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '24px',
                boxShadow: `0 8px 24px -8px ${card.bg.replace('0.1', '0.5')}`
              }}>
                {card.icon}
              </div>
              <h3 style={{ fontSize: '22px', marginBottom: '12px', fontWeight: 700, letterSpacing: '-0.02em' }}>{card.title}</h3>
              <p style={{ color: 'var(--text-2)', fontSize: '16px', lineHeight: 1.6 }}>{card.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div variants={item} style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.div
            whileHover={{ scale: 1.02, boxShadow: '0 30px 60px -12px rgba(0,0,0,0.2)' }}
            className="how-video"
            style={{
              aspectRatio: '16/8',
              borderRadius: '32px',
              background: 'url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80") center/cover',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexDirection: 'column',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)',
              border: '1px solid rgba(255,255,255,0.1)',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85), rgba(153, 27, 27, 0.5))', mixBlendMode: 'multiply' }} />

            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <motion.div
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.3)' }}
                whileTap={{ scale: 0.9 }}
                style={{
                  width: '88px', height: '88px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                }}
              >
                <Play fill="white" size={36} style={{ marginLeft: '6px' }} />
              </motion.div>
              <h3 className="playfair" style={{ marginTop: '32px', fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 700, letterSpacing: '0.5px' }}>
                Watch: What happens in an AMA session?
              </h3>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
