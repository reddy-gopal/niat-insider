import { motion, useScroll, useMotionValueEvent, useTransform } from 'framer-motion';
import { ClipboardList, Filter, Radio, Zap } from 'lucide-react';
import { useRef, useState } from 'react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.3 } }
};
const item = {
  hidden: { opacity: 0, y: 48 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
};

const steps = [
  {
    title: "Register Your Interest",
    shortDesc: "Step 01",
    desc: "Fill out the official AMA Session interest form. It's the first step to getting your unfiltered doubts cleared by someone who's been exactly where you are.",
    icon: <ClipboardList size={34} strokeWidth={1.4} />,
    backBg: 'linear-gradient(145deg, #3d0e0d 0%, #6b1414 100%)'
  },
  {
    title: "Live AMA Session",
    shortDesc: "Step 02",
    desc: "Join live with NIAT seniors. Real talk, real answers. The kind of advice you won't find on Google or any college brochure.",
    icon: <Radio size={34} strokeWidth={1.4} />,
    backBg: 'linear-gradient(145deg, #3d0e0d 0%, #7f1d1d 100%)'
  },
  {
    title: "Question Collection",
    shortDesc: "Step 03",
    desc: "We gather and categorize every question submitted — so nothing gets skipped. Your doubt, no matter how small, is on the list.",
    icon: <Filter size={34} strokeWidth={1.4} />,
    backBg: 'linear-gradient(145deg, #450a0a 0%, #7f1d1d 100%)'
  },
  {
    title: "Solved & Connected",
    shortDesc: "Step 04",
    desc: "Walk away with your doubts resolved, the Prep Kit in hand, and a senior connection on LinkedIn that lasts beyond college.",
    icon: <Zap size={34} strokeWidth={1.4} />,
    backBg: 'linear-gradient(145deg, #5a1010 0%, #991b1b 100%)'
  }
];

export function HowItWorks() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  });

  const [activatedSteps, setActivatedSteps] = useState([false, false, false, false]);
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const thresholds = [0, 0.33, 0.66, 0.95];

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const updated = [...activatedSteps];
    let changed = false;
    thresholds.forEach((t, i) => {
      if (latest >= t && !updated[i]) { updated[i] = true; changed = true; }
    });
    if (changed) setActivatedSteps(updated);
  });

  const isBadgeLit = (i) => i === 0 || hoveredIndex >= i || activatedSteps[i];

  const connectorFills = [
    useTransform(scrollYProgress, [0, 0.33], ['0%', '100%']),
    useTransform(scrollYProgress, [0.33, 0.66], ['0%', '100%']),
    useTransform(scrollYProgress, [0.66, 0.95], ['0%', '100%']),
  ];

  return (
    <section
      id="how"
      style={{
        background: 'var(--bg-2)',
        position: 'relative',
        padding: 'clamp(80px, 10vw, 130px) clamp(20px, 5vw, 80px)',
        overflow: 'hidden'
      }}
    >
      {/* Dot texture */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle at 1px 1px, #991b1b 1px, transparent 0)',
        backgroundSize: '36px 36px'
      }} />

      {/* Top divider */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--border), transparent)'
      }} />

      {/* Ambient glows */}
      <div style={{
        position: 'absolute', top: '-8%', left: '-6%', width: '440px', height: '440px',
        background: 'radial-gradient(circle, rgba(153,27,27,0.06) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: '-5%', right: '-4%', width: '360px', height: '360px',
        background: 'radial-gradient(circle, rgba(153,27,27,0.04) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}
      >
        <motion.div variants={item} style={{ textAlign: 'center', marginBottom: 'clamp(50px, 7vw, 80px)' }}>
          <span className="section-label" style={{
            background: 'rgba(153,27,27,0.08)', color: 'var(--primary)',
            display: 'inline-block', marginBottom: '20px'
          }}>How It Works</span>
          <h2 style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 800,
            lineHeight: 1.1,
            color: 'var(--text-1)',
            margin: '0 auto 12px',
            letterSpacing: '-0.02em'
          }}>
            No mentors. No counsellors.
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(18px, 2.2vw, 22px)',
            color: 'var(--text-2)',
            fontStyle: 'italic',
            fontWeight: 400,
            margin: 0,
            letterSpacing: '-0.01em'
          }}>
            Just you and <span style={{ color: 'var(--primary)', fontStyle: 'normal', fontWeight: 600 }}>the senior.</span>
          </p>
        </motion.div>

        <div ref={containerRef}>
          <div
            className="how-cards-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
              gap: '22px',
              alignItems: 'start'
            }}
          >
            {steps.map((step, i) => (
              <div key={i} className="how-step-wrapper">
                <FlipCard
                  step={step}
                  index={i}
                  isHovered={hoveredIndex === i}
                  isLit={isBadgeLit(i)}
                  onHover={() => setHoveredIndex(i)}
                  onLeave={() => setHoveredIndex(-1)}
                />

                {i < steps.length - 1 && (
                  <div className="how-connector-under">
                    <div className="how-connector-track">
                      <motion.div
                        className="how-connector-fill"
                        style={{ height: connectorFills[i] }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <style>{`
        .step-tag { font-family: 'Inter', sans-serif; }

        /* ── Desktop: wrappers are transparent pass-throughs ── */
        .how-step-wrapper { display: contents; }
        .how-connector-under { display: none; }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .how-cards-grid {
            display: flex;
            flex-direction: column;
            gap: 0;
          }

          .how-step-wrapper {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            width: 100%;
          }

          .how-step-wrapper > div {
            width: 100%;
          }

          .flip-inner {
            height: auto !important;
            min-height: 280px;
          }

          .how-connector-under {
            display: flex;
            justify-content: center;
            width: 100%;
          }

          .how-connector-track {
            width: 2px;
            height: 40px;
            background: rgba(153, 27, 27, 0.15);
            border-radius: 1px;
            position: relative;
            overflow: hidden;
          }

          .how-connector-fill {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            border-radius: 1px;
            background: linear-gradient(180deg, #991b1b, #b91c1c);
          }
        }
      `}</style>
    </section>
  );
}

function FlipCard({ step, index, isHovered, isLit, onHover, onLeave }) {
  return (
    <motion.div
      variants={item}
      style={{ perspective: '1100px', cursor: 'pointer' }}
      onHoverStart={onHover}
      onHoverEnd={onLeave}
      onTapStart={() => isHovered ? onLeave() : onHover()}
    >
      <motion.div
        animate={{ rotateY: isHovered ? 180 : 0 }}
        transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
        className="flip-inner"
        style={{ transformStyle: 'preserve-3d', position: 'relative', height: '280px' }}
      >

        {/* FRONT */}
        <motion.div
          animate={{
            boxShadow: isHovered
              ? '0 24px 56px -12px rgba(153,27,27,0.22), 0 4px 16px rgba(0,0,0,0.06)'
              : isLit
                ? '0 8px 32px -8px rgba(153,27,27,0.12), 0 2px 8px rgba(0,0,0,0.04)'
                : '0 4px 24px rgba(0,0,0,0.05)',
            y: isHovered ? -6 : 0,
            borderColor: isHovered
              ? 'rgba(153,27,27,0.4)'
              : isLit
                ? 'rgba(153,27,27,0.2)'
                : 'var(--border)'
          }}
          transition={{ duration: 0.28 }}
          style={{
            backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
            position: 'absolute', inset: 0, borderRadius: '20px',
            background: isHovered
              ? 'linear-gradient(160deg, #ffffff 0%, #fff4f4 100%)'
              : '#ffffff',
            border: '1.5px solid var(--border)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '16px',
          }}
        >
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
              animate={{ opacity: isHovered ? 1 : isLit ? 0.6 : 0.35 }}
              transition={{ duration: 0.28 }}
              style={{
                position: 'absolute', width: '80px', height: '80px', borderRadius: '50%',
                background: 'rgba(153,27,27,0.1)', filter: 'blur(14px)',
              }}
            />
            <motion.div
              animate={{
                background: isHovered || isLit
                  ? 'linear-gradient(145deg, #7f1d1d, #991b1b)'
                  : 'linear-gradient(145deg, #f0f0f0, #e8e8e8)',
                color: isHovered || isLit ? '#fff' : '#991b1b',
                boxShadow: isHovered
                  ? '0 12px 28px rgba(153,27,27,0.38)'
                  : isLit
                    ? '0 6px 18px rgba(153,27,27,0.2)'
                    : 'none',
                scale: isHovered ? 1.08 : 1
              }}
              transition={{ duration: 0.28 }}
              style={{
                width: '68px', height: '68px', borderRadius: '16px',
                border: '1px solid rgba(0,0,0,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', zIndex: 1,
              }}
            >
              {step.icon}
            </motion.div>
          </div>

          <div style={{ textAlign: 'center', padding: '0 18px' }}>
            <p style={{
              color: '#991b1b', fontSize: '10px', fontWeight: 600,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              marginBottom: '6px', fontFamily: "'Inter', sans-serif"
            }}>{step.shortDesc}</p>
            <h3 style={{
              color: 'var(--text-1)',
              fontSize: 'clamp(16px, 1.8vw, 20px)',
              fontWeight: 700, margin: 0, lineHeight: 1.25,
              fontFamily: "'Inter', sans-serif"
            }}>{step.title}</h3>
          </div>
        </motion.div>

        {/* BACK */}
        <div style={{
          backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          position: 'absolute', inset: 0, borderRadius: '20px',
          background: step.backBg,
          border: '1.5px solid rgba(255,255,255,0.08)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'flex-start', justifyContent: 'center',
          padding: '30px 26px', gap: '12px',
          boxShadow: '0 24px 56px -12px rgba(153,27,27,0.35)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '28px', height: '3px', background: '#fff8eb', borderRadius: '2px', opacity: 0.5 }} />
            <span style={{
              color: 'rgba(254,240,195,0.5)', fontSize: '10px', fontWeight: 600,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              fontFamily: "'Inter', sans-serif"
            }}>{step.shortDesc}</span>
          </div>

          <h3 style={{
            color: 'rgba(254,240,195,0.95)',
            fontSize: 'clamp(15px, 1.6vw, 18px)',
            fontWeight: 700, margin: 0, lineHeight: 1.2,
            fontFamily: "'Inter', sans-serif"
          }}>{step.title}</h3>

          <p style={{
            color: 'rgba(254,240,195,0.82)',
            fontSize: '14px', lineHeight: 1.75,
            margin: 0, fontFamily: "'Inter', sans-serif"
          }}>{step.desc}</p>

          <div style={{
            marginTop: 'auto', color: 'rgba(254,240,195,0.25)',
            fontSize: '11px', fontFamily: "'Inter', sans-serif", letterSpacing: '0.12em'
          }}>NIAT AMA ✦</div>
        </div>

      </motion.div>
    </motion.div>
  );
}