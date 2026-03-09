import { motion } from 'framer-motion';
import { BOOK_SLOT_URL } from '../data/constants';

export function Navbar({ scrolled }) {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: '72px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 5%',
        zIndex: 100,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        background: scrolled ? 'var(--glass-bg)' : 'transparent',
        backdropFilter: scrolled ? 'var(--blur)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        boxShadow: scrolled ? '0 10px 40px -10px rgba(0,0,0,0.05)' : 'none'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span className="playfair" style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '24px', letterSpacing: '-0.03em' }}>
          NIAT
        </span>
        <span style={{ fontStyle: 'italic', color: 'var(--text-1)', fontWeight: 500 }}>
          Senior Connect
        </span>
      </div>
      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href={BOOK_SLOT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary shimmer"
        style={{ padding: '10px 24px', fontSize: '15px' }}
      >
        Book Your Slot
      </motion.a>
    </motion.nav>
  );
}
