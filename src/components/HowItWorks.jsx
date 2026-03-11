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

  const bullets = [
    {
      icon: <Target color="#f35b04" size={24} />,
      bg: "rgba(243, 91, 4, 0.1)",
      border: "rgba(243, 91, 4, 0.3)",
      title: "Honest Answers",
      desc: "No filtered corporate advice. Your senior says it as it is."
    },
    {
      icon: <Users color="#7678ed" size={24} />,
      bg: "rgba(118, 120, 237, 0.1)",
      border: "rgba(118, 120, 237, 0.3)",
      title: "One-to-Many Sessions",
      desc: "One or two seniors host each session, you and other students ask questions together."
    },
    {
      icon: <Unlock color="#991b1b" size={24} />,
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

        {/* Video Block First */}
        <motion.div variants={item} style={{ maxWidth: '1000px', margin: '0 auto clamp(60px, 8vw, 100px) auto' }}>
          <motion.div
            whileHover={{ scale: 1.02, boxShadow: '0 30px 60px -12px rgba(0,0,0,0.2)' }}
            className="how-video"
            style={{
              aspectRatio: '16/8',
              borderRadius: '32px',
              background: '#000',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexDirection: 'column',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)',
              border: '1px solid rgba(255,255,255,0.1)',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <iframe
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
              src="https://www.youtube.com/embed/ONe4bhW0ISs?rel=0&modestbranding=1&autoplay=1&mute=1"
              title="What happens in an AMA session?"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </motion.div>
        </motion.div>

        {/* Section Header */}
        <motion.div variants={item} style={{ textAlign: 'center', marginBottom: 'clamp(40px, 5vw, 60px)' }}>
          <span className="section-label" style={{ background: 'rgba(153, 27, 27, 0.08)', color: 'var(--primary)' }}>How It Works</span>
          <h2 style={{ maxWidth: '800px', margin: '0 auto', fontSize: 'clamp(32px, 4vw, 44px)', lineHeight: 1.15 }}>
            No mentors. No counsellors.<br />
            <span style={{ color: 'var(--text-2)', fontStyle: 'italic', fontWeight: 400 }}>Just you and the senior.</span>
          </h2>
        </motion.div>

        {/* Bullet Points and Image Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center', maxWidth: '1100px', margin: '0 auto' }}>

          {/* Left Side: Explanatory Image */}
          <motion.div
            variants={item}
            whileHover={{ scale: 1.02 }}
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '1/1',
              borderRadius: '32px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)',
              transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <img
              src="/ama_indian_students.png"
              alt="AMA Sessions Explanation - Indian Students Discussing"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
            />
            {/* Soft inner shadow/border overlay */}
            <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(0,0,0,0.08)', borderRadius: '32px', pointerEvents: 'none', background: 'linear-gradient(to top, rgba(0,0,0,0.1) 0%, transparent 50%)' }} />
          </motion.div>

          {/* Right Side: Bullet Points */}
          <motion.div variants={item} style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
            {bullets.map((bullet, i) => (
              <div key={i} style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '16px',
                  background: bullet.bg, border: `1px solid ${bullet.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: `0 8px 16px -4px ${bullet.bg.replace('0.1', '0.4')}`
                }}>
                  {bullet.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: '20px', marginBottom: '8px', fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--text-1)' }}>{bullet.title}</h3>
                  <p style={{ color: 'var(--text-2)', fontSize: '16px', lineHeight: 1.6, margin: 0 }}>{bullet.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

        </div>

      </motion.div>
    </section>
  );
}
