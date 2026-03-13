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
        
        .nav-brand-niat {
          font-weight: 700;
          color: #991b1b;
          font-size: 20px;
          letter-spacing: -0.02em;
        }
        .nav-brand-insider {
          font-weight: 500;
          color: var(--text-1);
          font-size: 18px;
        }
        .nav-brand-wrap {
          display: inline-flex;
          align-items: baseline;
          gap: 4px;
        }
        
        .nav-btn {
          padding: 10px 24px;
          font-size: 15px;
        }

        @media (max-width: 768px) {
          .nav-brand-niat { font-size: 18px; }
          .nav-brand-insider { font-size: 16px; }
          .nav-btn {
            padding: 8px 20px;
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .nav-container {
            padding: 0 20px !important;
          }
          .nav-brand-insider {
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
          <img src="https://niat-ama.vercel.app/niat.png" alt="NIAT" style={{ height: '40px', width: 'auto', display: 'block' }} />
          <span className="nav-brand-wrap">
            <span className="nav-brand-niat">NIAT</span>
            <span className="nav-brand-insider">Insider</span>
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
