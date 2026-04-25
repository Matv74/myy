import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeartCanvas from './components/HeartCanvas';
import Hero from './components/Hero';
import PhotoGallery from './components/PhotoGallery';
import Footer from './components/Footer';

// Loading screen
function LoadingScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2200);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#0f0509',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        style={{ textAlign: 'center' }}
      >
        <div
          style={{
            fontSize: '56px',
            marginBottom: '204px',
            animation: 'pulse-glow 1.5s ease-in-out infinite',
          }}
        >
          ♥
        </div>
        <p
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: '42px',
            background: 'linear-gradient(135deg, #e8b4b8, #c97b8a, #7b2d42)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Наша історія
        </p>
        <p
          style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: '12px',
            letterSpacing: '0.3em',
            color: '#c97b8a',
            opacity: 0.5,
            marginTop: '16px',
            textTransform: 'uppercase',
          }}
        >
          Loading memories...
        </p>

        {/* Loading bar */}
        <div
          style={{
            marginTop: '24px',
            width: '160px',
            height: '2px',
            background: 'rgba(201, 123, 138, 0.2)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ delay: 0.3, duration: 1.5, ease: 'easeInOut' }}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #7b2d42, #c97b8a)',
              borderRadius: '2px',
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

// Quote section between hero and gallery
function QuoteSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    const el = document.getElementById('quote-section');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="quote-section"
      style={{
        position: 'relative',
        zIndex: 2,
        padding: '60px 24px',
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(201, 123, 138, 0.2)',
          borderRadius: '24px',
          padding: '48px 40px',
          boxShadow: '0 8px 40px rgba(123, 45, 66, 0.2), inset 0 1px 0 rgba(255,255,255,0.08)',
        }}
      >
        {/* <span style={{ fontSize: '40px', color: '#c97b8a', opacity: 0.5, lineHeight: 1 }}>"</span> */}
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(18px, 3.5vw, 28px)',
            fontStyle: 'italic',
            color: '#f5e6d8',
            lineHeight: 1.7,
            margin: '8px 0 16px',
            opacity: 0.9,
          }}
        >
          З тобою я відчуваю себе вдома, де б ми не були
        </p>
        {/* <span style={{ fontSize: '40px', color: '#c97b8a', opacity: 0.5, lineHeight: 1 }}>"</span> */}
        <p
          style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: '13px',
            letterSpacing: '0.2em',
            color: '#c97b8a',
            textTransform: 'uppercase',
            marginTop: '16px',
            opacity: 0.7,
          }}
        >
          Моя кохана Мартуся
        </p>
      </motion.div>
    </section>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0f0509 0%, #150710 30%, #1a0a0e 60%, #120508 100%)',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {/* Loading screen */}
      <AnimatePresence>
        {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Background particle hearts */}
      <HeartCanvas />

      {/* Subtle noise texture */}
      <div className="noise-overlay" />

      {/* Radial vignette */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'radial-gradient(ellipse 120% 100% at 50% 0%, transparent 60%, rgba(10, 3, 6, 0.6) 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Main content */}
      {!loading && (
        <>
          <Hero />
          <QuoteSection />
          <PhotoGallery />
          <Footer />
        </>
      )}
    </div>
  );
}
