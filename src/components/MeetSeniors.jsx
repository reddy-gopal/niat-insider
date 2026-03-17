import { motion, useAnimationControls, AnimatePresence } from 'framer-motion';
import { Quote, X, Zap, Star, Briefcase, MessageCircle } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { seniorsData, BOOK_SLOT_URL } from '../data/constants';
import { useState, useEffect, useCallback } from 'react';

// ─── Animation Variants ────────────────────────────────────────────────────────

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
  }
};

const cardHover = {
  rest: { y: 0, scale: 1, boxShadow: '0 20px 40px -20px rgba(118, 120, 237, 0.15)' },
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: '0 32px 64px -24px rgba(118, 120, 237, 0.30)',
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
  }
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.88, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    y: 20,
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] }
  }
};

// ─── Section Label Badge ──────────────────────────────────────────────────────

const SectionLabel = ({ children }) => (
  <span
    className="section-label"
    style={{ background: 'rgba(118, 120, 237, 0.1)', color: 'var(--secondary)' }}
  >
    {children}
  </span>
);

// ─── Tag Pill ─────────────────────────────────────────────────────────────────

const Tag = ({ children, accent, filled }) => (
  <span
    style={{
      background: filled ? `${accent}22` : 'var(--bg-1)',
      color: filled ? accent : 'var(--text-1)',
      fontSize: '12px',
      padding: '5px 13px',
      borderRadius: '50px',
      border: filled ? `1px solid ${accent}40` : '1px solid rgba(0,0,0,0.06)',
      fontWeight: 600,
      display: 'inline-block',
      lineHeight: 1.4
    }}
  >
    {children}
  </span>
);

// ─── Avatar ───────────────────────────────────────────────────────────────────

const Avatar = ({ senior, size = 68, fontSize = 26 }) => (
  <div
    style={{
      position: 'relative',
      width: size,
      height: size,
      borderRadius: '50%',
      background: senior.profilePicture
        ? 'var(--bg-1)'
        : `linear-gradient(135deg, ${senior.bgGradient})`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 800,
      fontSize,
      boxShadow: `0 12px 28px -8px ${senior.accent}`,
      border: '3px solid white',
      overflow: 'hidden',
      flexShrink: 0
    }}
  >
    {senior.profilePicture ? (
      <>
        <img
          src={senior.profilePicture}
          alt={senior.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => {
            e.target.style.display = 'none';
            const fallback = e.target.nextElementSibling;
            if (fallback) fallback.style.display = 'flex';
          }}
        />
        <span
          style={{
            display: 'none',
            position: 'absolute',
            inset: 0,
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 800,
            fontSize,
            background: `linear-gradient(135deg, ${senior.bgGradient})`
          }}
        >
          {senior.name.charAt(0)}
        </span>
      </>
    ) : (
      <span>{senior.name.charAt(0)}</span>
    )}
  </div>
);

// ─── Spotlight Modal ──────────────────────────────────────────────────────────

function SpotlightModal({ senior, onClose }) {
  const allTags = [...(senior.expertise || []), ...(senior.traits || [])];

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}
      >
        {/* Modal Panel */}
        <motion.div
          key="modal"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '620px',
            maxHeight: '90vh',
            overflowY: 'auto',
            borderRadius: '32px',
            background: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: `0 40px 100px -20px rgba(0,0,0,0.3), 0 0 0 1px ${senior.accent}30`,
            scrollbarWidth: 'none'
          }}
        >
          {/* Accent bar at top */}
          <div style={{
            height: '5px',
            borderRadius: '32px 32px 0 0',
            background: `linear-gradient(90deg, ${senior.bgGradient})`
          }} />

          {/* Close button */}
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: 'none',
              background: 'rgba(0,0,0,0.07)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
              transition: 'background 0.2s'
            }}
          >
            <X size={18} color="var(--text-1)" />
          </motion.button>

          <div style={{ padding: '32px 36px 36px' }}>

            {/* ── Header: Avatar + Name + Year + LinkedIn ── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
              <Avatar senior={senior} size={84} fontSize={32} />
              <div>
                <h3 style={{
                  margin: 0,
                  fontSize: 'clamp(20px, 3vw, 26px)',
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  lineHeight: 1.1,
                  color: 'var(--text-1)'
                }}>
                  {senior.name}
                </h3>
                <div style={{
                  marginTop: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  flexWrap: 'wrap'
                }}>
                  <span style={{
                    color: senior.accent,
                    fontSize: '13px',
                    background: `${senior.accent}18`,
                    padding: '4px 14px',
                    borderRadius: '50px',
                    fontWeight: 700
                  }}>
                    {senior.year}
                  </span>
                  {senior.linkedIn && (
                    <motion.a
                      href={senior.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      title="View LinkedIn profile"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        color: 'rgb(52, 101, 216)',
                        textDecoration: 'none',
                        padding: '6px',
                        borderRadius: '50%'
                      }}
                    >
                      <FontAwesomeIcon icon={faLinkedin} />
                    </motion.a>
                  )}
                </div>
              </div>
            </div>

            {/* ── Divider ── */}
            <div style={{ height: '1px', background: 'rgba(0,0,0,0.06)', margin: '0 0 24px' }} />

            {/* ── Quote ── */}
            <div style={{
              padding: '20px 24px',
              background: `linear-gradient(135deg, ${senior.accent}0d, ${senior.accent}05)`,
              borderRadius: '20px',
              border: `1px solid ${senior.accent}20`,
              marginBottom: '24px'
            }}>
              <Quote size={18} color={senior.accent} style={{ opacity: 0.4, marginBottom: '10px' }} />
              <p style={{
                margin: 0,
                fontStyle: 'italic',
                fontSize: '17px',
                lineHeight: 1.65,
                color: 'var(--text-1)',
                fontWeight: 500
              }}>
                "{senior.quote}"
              </p>
            </div>

            {/* ── About ── */}
            {senior.about && (
              <div style={{ marginBottom: '24px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '12px'
                }}>
                  <MessageCircle size={15} color={senior.accent} />
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: senior.accent
                  }}>
                    About
                  </span>
                </div>
                <p style={{
                  margin: 0,
                  fontSize: '15px',
                  lineHeight: 1.75,
                  color: 'var(--text-2)',
                  fontWeight: 400
                }}>
                  {senior.about}
                </p>
              </div>
            )}

            {/* ── Expertise Tags ── */}
            {senior.expertise && senior.expertise.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '12px'
                }}>
                  <Briefcase size={15} color={senior.accent} />
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: senior.accent
                  }}>
                    Expertise
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {senior.expertise.map((e, i) => (
                    <Tag key={i} accent={senior.accent} filled>{e}</Tag>
                  ))}
                </div>
              </div>
            )}

            {/* ── Traits / Fun Facts ── */}
            {senior.traits && senior.traits.length > 0 && (
              <div style={{ marginBottom: '28px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '12px'
                }}>
                  <Star size={15} color={senior.accent} />
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: senior.accent
                  }}>
                    Vibes
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {senior.traits.map((t, i) => (
                    <Tag key={i} accent={senior.accent}>{t}</Tag>
                  ))}
                </div>
              </div>
            )}

            {/* ── CTA: Connect on LinkedIn ── */}
            {senior.linkedIn && (
              <motion.a
                href={senior.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.03,
                  boxShadow: `0 16px 40px -8px ${senior.accent}55`
                }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '16px',
                  borderRadius: '16px',
                  background: 'rgb(52, 101, 216)',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '16px',
                  textDecoration: 'none',
                  letterSpacing: '-0.01em',
                  boxShadow: '0 8px 24px -8px rgba(52, 101, 216, 0.5)'
                }}
              >
                <FontAwesomeIcon icon={faLinkedin} style={{ fontSize: '18px' }} />
                Let's connect on LinkedIn
              </motion.a>
            )}

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Senior Card ──────────────────────────────────────────────────────────────

function SeniorCard({ senior, onClick }) {
  const tags = [...(senior.expertise || []), ...(senior.traits || [])];

  return (
    <div style={{ width: '360px', flexShrink: 0 }}>
      <motion.div
        variants={cardHover}
        initial="rest"
        whileHover="hover"
        onClick={onClick}
        style={{
          padding: '36px 32px',
          borderRadius: '32px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          background: 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(118, 120, 237, 0.15)',
          boxShadow: '0 20px 40px -20px rgba(118, 120, 237, 0.15)',
          cursor: 'pointer',
          userSelect: 'none'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Avatar senior={senior} size={68} fontSize={26} />
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: '20px', letterSpacing: '-0.03em', lineHeight: 1.2 }}>
              {senior.name}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
              <div style={{
                color: senior.accent,
                fontSize: '13px',
                background: `${senior.accent}15`,
                padding: '4px 12px',
                borderRadius: '50px',
                display: 'inline-block',
                fontWeight: 700,
              }}>
                {senior.year}
              </div>
              {senior.linkedIn && (
                <motion.a
                  href={senior.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  title="View LinkedIn profile"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: 'rgba(52,101,216,0.1)',
                    border: '1px solid rgba(52,101,216,0.18)',
                    textDecoration: 'none',
                    flexShrink: 0
                  }}
                >
                  <FontAwesomeIcon icon={faLinkedin} style={{ color: 'rgb(52, 101, 216)', fontSize: '14px' }} />
                </motion.a>
              )}
            </div>
          </div>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {tags.slice(0, 4).map((trait, i) => (
            <Tag key={i} accent={senior.accent}>{trait}</Tag>
          ))}
        </div>

        {/* Quote */}
        <div style={{
          position: 'relative',
          marginTop: 'auto',
          padding: '24px',
          background: `linear-gradient(to right bottom, ${senior.accent}0a, transparent)`,
          borderRadius: '24px 24px 24px 8px',
          border: `1px solid ${senior.accent}20`
        }}>
          <Quote size={20} color={senior.accent} style={{ opacity: 0.3, marginBottom: '12px' }} />
          <p style={{
            fontStyle: 'italic',
            fontSize: '15px',
            color: 'var(--text-1)',
            lineHeight: 1.6,
            margin: 0
          }}>
            "{senior.quote}"
          </p>
          {/* "Tap to learn more" hint */}
          <div style={{
            marginTop: '14px',
            fontSize: '12px',
            fontWeight: 600,
            color: senior.accent,
            opacity: 0.7,
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <Zap size={11} />
            Tap to learn more
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export function MeetSeniors() {
  const [isPaused, setIsPaused] = useState(false);
  const [activeSenior, setActiveSenior] = useState(null);
  const controls = useAnimationControls();

  const extendedSeniors = [...seniorsData, ...seniorsData, ...seniorsData];

  useEffect(() => {
    if (!isPaused) {
      controls.start({
        x: `calc(-33.33% - 10.66px)`,
        transition: {
          duration: 30,
          ease: 'linear',
          repeat: Infinity
        }
      });
    } else {
      controls.stop();
    }
  }, [isPaused, controls]);

  const openModal = useCallback((senior) => {
    setActiveSenior(senior);
    setIsPaused(true);
  }, []);

  const closeModal = useCallback(() => {
    setActiveSenior(null);
    setIsPaused(false);
  }, []);

  return (
    <>
      {/* ── Spotlight Modal ── */}
      <AnimatePresence>
        {activeSenior && (
          <SpotlightModal key="modal" senior={activeSenior} onClose={closeModal} />
        )}
      </AnimatePresence>

      <section
        id="meet"
        className="section-padding"
        style={{ background: 'var(--bg-1)', position: 'relative', overflow: 'hidden' }}
      >
        {/* Decorative gradient spot */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80vw',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(118,120,237,0.08) 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none'
        }} />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          style={{ margin: '0 auto', position: 'relative', zIndex: 1 }}
        >
          {/* Heading */}
          <motion.div
            variants={item}
            style={{ textAlign: 'center', marginBottom: 'clamp(40px, 5vw, 60px)', padding: '0 5%' }}
          >
            <SectionLabel>Meet Your Seniors</SectionLabel>
            <h2 style={{
              maxWidth: '800px',
              margin: '0 auto',
              fontSize: 'clamp(32px, 4vw, 44px)',
              lineHeight: 1.15
            }}>
              Real students. Real stories.<br />
              <span style={{ color: 'var(--secondary)', fontStyle: 'italic', fontWeight: 400 }}>
                Real advice.
              </span>
            </h2>
          </motion.div>

          {/* Marquee Carousel */}
          <div
            style={{
              position: 'relative',
              width: '100vw',
              left: '50%',
              right: '50%',
              marginLeft: '-50vw',
              marginRight: '-50vw',
              overflow: 'hidden',
              padding: '20px 0 60px 0'
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => !activeSenior && setIsPaused(false)}
          >
            {/* Fading edge mask */}
            <div style={{
              position: 'absolute',
              inset: 0,
              zIndex: 2,
              pointerEvents: 'none',
              background: 'linear-gradient(to right, var(--bg-1) 0%, transparent 15%, transparent 85%, var(--bg-1) 100%)'
            }} />

            <motion.div
              style={{
                display: 'flex',
                gap: '32px',
                width: 'max-content',
                padding: '0 16px'
              }}
              animate={controls}
              initial={{ x: 0 }}
            >
              {extendedSeniors.map((senior, idx) => (
                <SeniorCard
                  key={idx}
                  senior={senior}
                  onClick={() => openModal(senior)}
                />
              ))}
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            variants={item}
            style={{
              textAlign: 'center',
              marginTop: 'clamp(40px, 6vw, 60px)',
              padding: '0 5%'
            }}
          >
            <p style={{
              color: 'var(--text-2)',
              fontSize: 'clamp(16px, 2vw, 18px)',
              marginBottom: '24px',
              maxWidth: '420px',
              margin: '0 auto 24px auto'
            }}>
              Ready when you are. Reserve a spot for the next session.
            </p>
            <motion.a
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(153, 27, 27, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              href={BOOK_SLOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px 36px',
                borderRadius: '99px',
                fontWeight: 600,
                fontSize: '16px',
                textDecoration: 'none',
                color: 'white',
                background: 'linear-gradient(135deg, var(--hero-from), var(--primary))',
                boxShadow: '0 8px 24px rgba(153, 27, 27, 0.25)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              Book a Session
            </motion.a>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}