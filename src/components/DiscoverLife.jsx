import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

const videos = [
   { id: "-xyBuOufsuU", title: "NIAT Experience 2", subtitle: "Student Stories" },
    { id: "4iMrTAm7a7g", title: "NIAT Experience 3", subtitle: "Daily Moments" },
    { id: "q9w44EDpDzc", title: "NIAT Experience 1", subtitle: "Campus Life" }
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

function VideoThumbnail({ vid }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        paddingTop: '56.25%',
        borderRadius: '16px',
        overflow: 'hidden',
        background: '#0a0a0a',
      }}
    >
      {!playing && (
        <div
          onClick={() => setPlaying(true)}
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(https://img.youtube.com/vi/${vid.id}/maxresdefault.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
        >
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.05) 60%, transparent 100%)'
          }} />
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            style={{
              position: 'relative', zIndex: 2,
              background: 'white',
              borderRadius: '50%',
              width: '28px',
              height: '20px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <FontAwesomeIcon
              icon={faYoutube}
              style={{ color: 'rgb(231, 15, 15)', fontSize: '64px', position: 'absolute' }}
            />
          </motion.div>
        </div>
      )}

      {playing && (
        <iframe
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
          src={`https://www.youtube.com/embed/${vid.id}?rel=0&modestbranding=1&autoplay=1`}
          title={vid.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
}

export function DiscoverLife() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const SWIPE_THRESHOLD = 50;

  const nextVideo = () => setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  const prevVideo = () => setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const onTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) >= SWIPE_THRESHOLD) {
      diff > 0 ? nextVideo() : prevVideo();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      className="section-padding"
      id="discover"
      style={{ background: 'var(--bg-2)', overflow: 'hidden', position: 'relative' }}
    >
      <style>{`
        .discover-carousel-wrapper {
          position: relative;
          padding: 0 30px;
        }
        .discover-nav-btn {
          display: flex;
        }
        @media (max-width: 767px) {
          .discover-carousel-wrapper {
            padding: 0;
            margin: 0 -16px;
          }
          .discover-nav-btn {
            display: none !important;
          }
        }
      `}</style>

      <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '40vw', height: '40vw', background: 'var(--accent-1)', filter: 'blur(150px)', opacity: 0.08, borderRadius: '50%' }} />
      <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '40vw', height: '40vw', background: 'var(--accent-2)', filter: 'blur(150px)', opacity: 0.08, borderRadius: '50%' }} />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}
      >
        {/* Header */}
        <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span className="section-label" style={{ background: 'rgba(231, 15, 15, 0.1)', color: 'var(--accent-3)' }}>Life at NIAT</span>
          <h2 style={{ marginBottom: '16px', fontSize: 'clamp(32px, 5vw, 48px)', letterSpacing: '-0.03em' }}>
            See it before you live it.
          </h2>
          <p style={{ color: 'var(--text-2)', fontSize: 'clamp(16px, 2vw, 20px)', maxWidth: '600px', margin: '0 auto' }}>
            Watch real campus experiences straight from the students who live it every day.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div variants={itemVariants} className="discover-carousel-wrapper">

          {/* Touch area */}
          <div
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            style={{ overflow: 'hidden', borderRadius: '16px', touchAction: 'pan-y' }}
          >
            <motion.div
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 220, damping: 28 }}
              style={{ display: 'flex' }}
            >
              {videos.map((vid, idx) => (
                <div key={idx} style={{ flex: '0 0 100%' }}>
                  <VideoThumbnail vid={vid} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Desktop arrows */}
          {['prev', 'next'].map((dir) => (
            <motion.button
              key={dir}
              className="discover-nav-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={dir === 'prev' ? prevVideo : nextVideo}
              style={{
                position: 'absolute',
                top: '45%',
                [dir === 'prev' ? 'left' : 'right']: '0px',
                transform: 'translateY(-50%)',
                width: '40px', height: '40px',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(15,15,15,0.7)',
                backdropFilter: 'blur(8px)',
                alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                color: 'rgba(255,255,255,0.8)',
                zIndex: 10,
              }}
            >
              {dir === 'prev' ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </motion.button>
          ))}

          {/* Dots + counter */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '24px', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {videos.map((_, idx) => (
                <motion.button
                  key={idx}
                  animate={{
                    width: currentIndex === idx ? '28px' : '8px',
                    background: currentIndex === idx ? 'rgb(231, 15, 15)' : 'rgba(128,128,128,0.4)'
                  }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setCurrentIndex(idx)}
                  style={{ height: '8px', borderRadius: '4px', border: 'none', cursor: 'pointer', padding: 0 }}
                  aria-label={`Go to video ${idx + 1}`}
                />
              ))}
            </div>
            <span style={{ color: 'var(--text-3)', fontSize: '13px' }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentIndex}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  style={{ display: 'inline-block' }}
                >
                  {currentIndex + 1}
                </motion.span>
              </AnimatePresence>
              {' / '}{videos.length}
            </span>
          </div>

        </motion.div>
      </motion.div>
    </section>
  );
}