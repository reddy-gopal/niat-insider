import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
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

const BRAND = '#7f1d1d'; // maroon — default/always-on for step 1
const HOVER = '#991b1b'; // crimson — hover highlight

const steps = [
  {
    title: "Register Your Interest",
    shortDesc: "Step 01",
    desc: "Fill out the official AMA Session interest form. It's the first step to getting your unfiltered doubts cleared by someone who's been exactly where you are.",
    icon: <ClipboardList size={34} strokeWidth={1.4} />,
    backBg: 'linear-gradient(145deg, #3d0e0d 0%, #6b1414 100%)'
  },
  {
    title: "Question Collection",
    shortDesc: "Step 02",
    desc: "We gather and categorize every question submitted — so nothing gets skipped. Your doubt, no matter how small, is on the list.",
    icon: <Filter size={34} strokeWidth={1.4} />,
    backBg: 'linear-gradient(145deg, #450a0a 0%, #7f1d1d 100%)'
  },
  {
    title: "Live AMA Session",
    shortDesc: "Step 03",
    desc: "Join live with NIAT seniors. Real talk, real answers. The kind of advice you won't find on Google or any college brochure.",
    icon: <Radio size={34} strokeWidth={1.4} />,
    backBg: 'linear-gradient(145deg, #3d0e0d 0%, #7f1d1d 100%)'
  },
  {
    title: "Solved & Connected",
    shortDesc: "Step 04",
    desc: "Walk away with your doubts resolved, the Prep Kit in hand, and a senior connection on LinkedIn that lasts beyond college.",
    icon: <Zap size={34} strokeWidth={1.4} />,
    backBg: 'linear-gradient(145deg, #5a1010 0%, #991b1b 100%)'
  }
];

// ─── Parent manages hoveredIndex so all badges/lines can react ───
export function HowItWorks() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  });

  const [activatedSteps, setActivatedSteps] = useState([false, false, false, false]);
  // hoveredIndex: which card is currently hovered (-1 = none)
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

  // A badge is "lit" if:
  //   - it's step 0 always (default maroon)
  //   - hoveredIndex >= its index (cascade highlight)
  //   - scroll has activated it
  const isBadgeLit = (i) => i === 0 || hoveredIndex >= i || activatedSteps[i];

  // A connector line between step i and i+1 is lit if hoveredIndex >= i
  const isLineLit = (i) => hoveredIndex >= i || (activatedSteps[i] && activatedSteps[i + 1]);

  // Badge colour:
  //   step 0 default → maroon (#7f1d1d)
  //   hovered step   → crimson (#991b1b)
  //   cascade lit    → maroon
  const badgeColor = (i) => {
    if (hoveredIndex === i) return HOVER;
    if (isBadgeLit(i)) return BRAND;
    return 'transparent';
  };

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
            fontFamily: "'Fraunces', serif",
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
            fontFamily: "'DM Sans', sans-serif",
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

        {/* ── Cards grid — badges/lines rendered inside each card but driven by parent state ── */}
        <div
          ref={containerRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: '22px', alignItems: 'start'
          }}
        >
          {steps.map((step, i) => (
            <FlipCard
              key={i}
              step={step}
              index={i}
              isHovered={hoveredIndex === i}
              isLit={isBadgeLit(i)}
              isLineLit={isLineLit(i)}
              badgeColor={badgeColor(i)}
              onHover={() => setHoveredIndex(i)}
              onLeave={() => setHoveredIndex(-1)}
            />
          ))}
        </div>

        {/* Bottom hint */}
        <motion.div variants={item} style={{ textAlign: 'center', marginTop: 'clamp(44px, 5vw, 64px)' }}>
          <p style={{
            color: 'rgba(153,27,27,0.3)', fontSize: '12px',
            fontFamily: "'DM Mono', monospace", letterSpacing: '0.12em'
          }}>✦ hover each card to read more ✦</p>
        </motion.div>
      </motion.div>

      <style>{`
        /* Global override for specific interactive elements in this section */
        .step-tag {
          font-family: 'DM Mono', monospace;
        }
      `}</style>
    </section>
  );
}

// ─── FlipCard receives all highlight state from parent ────────
function FlipCard({ step, index, isHovered, isLit, isLineLit, badgeColor, onHover, onLeave }) {
  return (
    <motion.div
      variants={item}
      style={{ perspective: '1100px', cursor: 'pointer' }}
      onHoverStart={onHover}
      onHoverEnd={onLeave}
      onTapStart={() => isHovered ? onLeave() : onHover()}
    >
      {/* ── Badge row + connector ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        marginBottom: '16px', paddingLeft: '2px'
      }}>

        {/* Badge */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <motion.div
            animate={{
              background: badgeColor,
              borderColor: isLit ? badgeColor : 'rgba(153,27,27,0.2)',
              color: isLit ? '#fff' : 'rgba(153,27,27,0.4)',
              boxShadow: isHovered
                ? '0 0 22px rgba(153,27,27,0.5), 0 0 8px rgba(153,27,27,0.25)'
                : isLit
                  ? '0 0 12px rgba(127,29,29,0.25)'
                  : 'none',
              scale: isHovered ? 1.18 : 1
            }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            style={{
              width: '36px', height: '36px', borderRadius: '50%',
              border: '2px solid rgba(153,27,27,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '12px', fontWeight: 700,
              fontFamily: "'DM Mono', monospace"
            }}
          >
            {index + 1}
          </motion.div>

          {/* Hover ripple */}
          {isHovered && (
            <motion.div
              key={`ripple-${index}`}
              initial={{ scale: 1, opacity: 0.55 }}
              animate={{ scale: 2.4, opacity: 0 }}
              transition={{ duration: 0.75, ease: 'easeOut' }}
              style={{
                position: 'absolute', inset: 0, borderRadius: '50%',
                border: '2px solid #991b1b', pointerEvents: 'none'
              }}
            />
          )}
        </div>

        {/* Connector line — lit when this step and next are in the cascade */}
        {index < 3 && (
          <motion.div
            animate={{
              background: isLineLit
                ? `linear-gradient(90deg, #991b1b, #b91c1c)`
                : 'rgba(153,27,27,0.1)',
              opacity: isLineLit ? 1 : 0.4,
              scaleX: isLineLit ? 1 : 0.95
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              flex: 1, height: '2px', borderRadius: '1px',
              marginRight: '-22px',
              transformOrigin: 'left'
            }}
          />
        )}
      </div>

      {/* ── Flip card ── */}
      <motion.div
        animate={{ rotateY: isHovered ? 180 : 0 }}
        transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
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
          {/* Icon */}
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
              marginBottom: '6px', fontFamily: "'DM Mono', monospace"
            }}>{step.shortDesc}</p>
            <h3 style={{
              color: 'var(--text-1)',
              fontSize: 'clamp(16px, 1.8vw, 20px)',
              fontWeight: 700, margin: 0, lineHeight: 1.25,
              fontFamily: "'Playfair Display', serif"
            }}>{step.title}</h3>
          </div>

          <motion.p
            animate={{ opacity: isHovered ? 0 : 0.35 }}
            transition={{ duration: 0.15 }}
            style={{
              color: 'var(--text-2)', fontSize: '11px', margin: 0,
              letterSpacing: '0.1em', fontFamily: "'DM Mono', monospace"
            }}
          >hover to reveal →</motion.p>
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
              fontFamily: "'DM Mono', monospace"
            }}>{step.shortDesc}</span>
          </div>

          <h3 style={{
            color: 'rgba(254,240,195,0.95)',
            fontSize: 'clamp(15px, 1.6vw, 18px)',
            fontWeight: 700, margin: 0, lineHeight: 1.2,
            fontFamily: "'Playfair Display', serif"
          }}>{step.title}</h3>

          <p style={{
            color: 'rgba(254,240,195,0.82)',
            fontSize: '14px', lineHeight: 1.75,
            margin: 0, fontFamily: "'Lora', serif"
          }}>{step.desc}</p>

          <div style={{
            marginTop: 'auto', color: 'rgba(254,240,195,0.25)',
            fontSize: '11px', fontFamily: "'DM Mono', monospace", letterSpacing: '0.12em'
          }}>NIAT AMA ✦</div>
        </div>

      </motion.div>
    </motion.div>
  );
}