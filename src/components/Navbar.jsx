import { motion } from 'framer-motion';
import { BOOK_SLOT_URL } from '../data/constants';

export function Navbar({ scrolled }) {
  return (
    <>
      <style>{`
        .nav-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 72px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 5%;
          z-index: 100;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .nav-brand-text {
          font-weight: 700;
          color: var(--text-1);
          font-size: 20px;
          letter-spacing: -0.02em;
        }
        
        .nav-btn {
          padding: 10px 24px;
          font-size: 15px;
        }

        @media (max-width: 768px) {
          .nav-brand-text {
            font-size: 18px;
          }
          .nav-btn {
            padding: 8px 20px;
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .nav-container {
            padding: 0 20px !important;
          }
          .nav-brand-text {
            display: none;
          }
          .nav-btn {
            padding: 8px 16px;
            font-size: 13px;
          }
        }
      `}</style>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="nav-container"
        style={{
          background: scrolled ? 'var(--glass-bg)' : 'transparent',
          backdropFilter: scrolled ? 'var(--blur)' : 'none',
          WebkitBackdropFilter: scrolled ? 'var(--blur)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          boxShadow: scrolled ? '0 10px 40px -10px rgba(0,0,0,0.05)' : 'none'
        }}
      >
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <img src="/niat.png" alt="NIAT" style={{ height: '40px', width: 'auto', display: 'block' }} />
          <span className="playfair nav-brand-text">
            Ask Me Anything
          </span>
        </a>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={BOOK_SLOT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary shimmer nav-btn"
        >
          Book Your Slot
        </motion.a>
      </motion.nav>
    </>
  );
}
