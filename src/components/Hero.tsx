import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(
      indow.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const parallaxY = scrollY * 0.4;

  return (
    <section
      style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        zIndex: 2,
      }}
    >
      {/* Radial gradient background glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 80% 60% at 50% 50%, rgba(123, 45, 66, 0.25) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 20% 80%, rgba(201, 123, 138, 0.15) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 80% 20%, rgba(180, 80, 100, 0.12) 0%, transparent 60%)
          `,
          transform: `translateY(${parallaxY * 0.3}px)`,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        style={{
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
          transform: `translateY(${-parallaxY * 0.2}px)`,
          padding: '0 24px',
        }}
      >
        {/* Superscript */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: 'clamp(28px, 5vw, 52px)',
            color: '#c97b8a',
            marginBottom: '8px',
            opacity: 0.9,
          }}
        >
          Історія кохання
        </motion.p>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 1.2, ease: 'easeOut' }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(52px, 12vw, 130px)',
            fontWeight: 700,
            lineHeight: 1,
            background: 'linear-gradient(135deg, #f5e6d8 0%, #e8b4b8 30%, #c97b8a 55%, #7b2d42 80%, #c97b8a 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'shimmer 5s linear infinite',
            textShadow: 'none',
            marginBottom: '12px',
            letterSpacing: '-0.02em',
          }}
        >
          Together
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1, ease: 'easeOut' }}
          style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: 'clamp(14px, 2.5vw, 18px)',
            fontWeight: 300,
            letterSpacing: '0.3em',
            color: '#e8b4b8',
            textTransform: 'uppercase',
            opacity: 0.8,
            marginBottom: '48px',
          }}
        >
          Наша історія · Наші спогади · Наш світ
        </motion.p>

        {/* Ornate divider with heart */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.1, duration: 1, ease: 'easeOut' }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            margin: '0 auto 48px',
            maxWidth: '280px',
          }}
        >
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, #c97b8a)' }} />
          <span
            style={{
              color: '#c97b8a',
              fontSize: '24px',
              animation: 'pulse-glow 3s ease-in-out infinite',
            }}
          >
            ♥
          </span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, #c97b8a, transparent)' }} />
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8, ease: 'easeOut' }}
        >
          <a
            href="#gallery"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 36px',
              background: 'linear-gradient(135deg, rgba(123, 45, 66, 0.6), rgba(201, 123, 138, 0.4))',
              border: '1px solid rgba(201, 123, 138, 0.4)',
              borderRadius: '100px',
              color: '#f5e6d8',
              fontFamily: "'Lato', sans-serif",
              fontSize: '14px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 4px 24px rgba(123, 45, 66, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              // fontSize: 'px',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = 'linear-gradient(135deg, rgba(123, 45, 66, 0.8), rgba(201, 123, 138, 0.6))';
              el.style.boxShadow = '0 8px 32px rgba(123, 45, 66, 0.5), inset 0 1px 0 rgba(255,255,255,0.15)';
              el.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = 'linear-gradient(135deg, rgba(123, 45, 66, 0.6), rgba(201, 123, 138, 0.4))';
              el.style.boxShadow = '0 4px 24px rgba(123, 45, 66, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)';
              el.style.transform = 'translateY(0)';
            }}
          >
            <span>Мии</span>
            <span style={{ fontSize: '18px' }}>♥</span>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          color: '#c97b8a',
          opacity: 0.6,
        }}
      >
        <span
          style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: '11px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
          }}
        >
          scroll
        </span>
        <div className="scroll-indicator" style={{ fontSize: '20px' }}>↓</div>
      </motion.div>

      {/* Decorative floating elements */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            fontSize: `${12 + i * 6}px`,
            color: '#c97b8a',
            opacity: 0.08 + i * 0.03,
            top: `${15 + i * 15}%`,
            left: i % 2 === 0 ? `${5 + i * 3}%` : `${75 + i * 3}%`,
            animation: `float ${3 + i * 0.8}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
            pointerEvents: 'none',
          }}
        >
          ♥
        </div>
      ))}
    </section>
  );
}
