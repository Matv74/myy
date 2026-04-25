import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={ref}
      style={{
        position: 'relative',
        zIndex: 2,
        padding: '80px 24px 60px',
        textAlign: 'center',
        borderTop: '1px solid rgba(201, 123, 138, 0.15)',
        background: 'linear-gradient(to bottom, transparent, rgba(123, 45, 66, 0.1))',
      }}
    >
      {/* Ornament top */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          marginBottom: '40px',
          maxWidth: '400px',
          margin: '0 auto 40px',
        }}
      >
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, #c97b8a)' }} />
        <span style={{ color: '#c97b8a', fontSize: '28px' }}>♥</span>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, #c97b8a, transparent)' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <p
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: 'clamp(36px, 6vw, 64px)',
            background: 'linear-gradient(135deg, #e8b4b8, #c97b8a, #7b2d42)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '16px',
          }}
        >
          Forever
          <br />
          Дякую за те, що ти в мене є
        </p>

        <p
          style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: '13px',
            letterSpacing: '0.25em',
            color: '#c97b8a',
            textTransform: 'uppercase',
            opacity: 0.6,
          }}
        >
        </p>
      </motion.div>

      {/* Animated hearts row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ delay: 0.4, duration: 1 }}
        style={{
          marginTop: '48px',
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
          flexWrap: 'wrap',
        }}
      >
        {['♥', '♡', '♥', '♡', '♥', '♡', '♥'].map((h, i) => (
          <span
            key={i}
            style={{
              color: i % 2 === 0 ? '#c97b8a' : '#7b2d42',
              fontSize: `${14 + i % 3 * 6}px`,
              opacity: 0.3 + (i % 3) * 0.2,
              animation: `float ${2.5 + i * 0.3}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          >
            {h}
          </span>
        ))}
      </motion.div>
    </footer>
  );
}
