import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { BOOK_SLOT_URL } from '../data/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'var(--text-1)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        color: 'white',
        padding: 'clamp(32px, 5vw, 48px) clamp(20px, 5vw, 48px)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Subtle gradient accent */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(153, 27, 27, 0.4), transparent)',
          pointerEvents: 'none'
        }}
      />

      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(28px, 4vw, 40px)',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Top row: Brand + CTA */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '24px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(22px, 3vw, 28px)',
                letterSpacing: '-0.02em'
              }}
            >
              NIAT
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 'clamp(16px, 2vw, 20px)',
                color: 'rgba(255,255,255,0.85)',
                letterSpacing: '-0.01em'
              }}
            >
              AMA Session
            </span>
          </div>

          <motion.a
            href={BOOK_SLOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, boxShadow: '0 8px 24px rgba(153, 27, 27, 0.4)' }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 28px',
              borderRadius: '999px',
              fontWeight: 600,
              fontSize: '15px',
              textDecoration: 'none',
              color: 'white',
              background: 'linear-gradient(135deg, #991b1b, #b91c1c)',
              boxShadow: '0 4px 16px rgba(153, 27, 27, 0.3)',
              border: '1px solid rgba(255,255,255,0.1)',
              transition: 'box-shadow 0.3s ease'
            }}
          >
            Book a Session
            <ArrowRight size={18} style={{ flexShrink: 0 }} />
          </motion.a>
        </div>

        {/* Links row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '20px 32px',
            fontSize: '14px'
          }}
        >
          <a
            href="#how"
            style={{
              color: 'rgba(255,255,255,0.7)',
              textDecoration: 'none',
              transition: 'color 0.2s'
            }}
            onMouseEnter={e => { e.target.style.color = 'white'; }}
            onMouseLeave={e => { e.target.style.color = 'rgba(255,255,255,0.7)'; }}
          >
            How it works
          </a>
          <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '12px' }}>·</span>
          <a
            href="#"
            style={{
              color: 'rgba(255,255,255,0.7)',
              textDecoration: 'none',
              transition: 'color 0.2s'
            }}
            onMouseEnter={e => { e.target.style.color = 'white'; }}
            onMouseLeave={e => { e.target.style.color = 'rgba(255,255,255,0.7)'; }}
          >
            Privacy
          </a>
          <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '12px' }}>·</span>
          <a
            href="#"
            style={{
              color: 'rgba(255,255,255,0.7)',
              textDecoration: 'none',
              transition: 'color 0.2s'
            }}
            onMouseEnter={e => { e.target.style.color = 'white'; }}
            onMouseLeave={e => { e.target.style.color = 'rgba(255,255,255,0.7)'; }}
          >
            Terms
          </a>
        </div>

        {/* Copyright */}
        <div
          style={{
            color: 'rgba(255,255,255,0.45)',
            fontSize: '13px',
            paddingTop: '8px',
            borderTop: '1px solid rgba(255,255,255,0.06)'
          }}
        >
          © {currentYear} NIAT. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
