import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Lightbox from './Lightbox';

interface Photo {
  src: string;
  alt: string;
  caption: string;
  rotation: number;
  aspectClass: string;
}

const photos: Photo[] = [
  {
    src: '/фото1.jpg',
    alt: 'фото1',
    caption: 'З цього все почалось',
    rotation: -2.5,
    aspectClass: 'tall',
  },
  {
    src: '/фото2.jpg',
    alt: 'фото2',
    caption: 'Мілашкі',
    rotation: 1.8,
    aspectClass: 'tall',
  },
  {
    src: '/3.jpg',
    alt: 'фото3',
    caption: 'Гарнюні',
    rotation: -1.2,
    aspectClass: 'tall',
  },
  {
    src: '/4.jpg',
    alt: 'фото4',
    caption: 'Манік',
    rotation: 2.1,
    aspectClass: 'tall',
  },
  {
    src: '/5.jpg',
    alt: 'фото5',
    caption: 'Обнімашкі🤗',
    rotation: -1.8,
    aspectClass: 'tall',
  },
  {
    src: '/фото6.jpg',
    alt: 'фото6',
    caption: 'Чорти',
    rotation: 1.5,
    aspectClass: 'tall',
  },
  {
    src: '/фото7.jpg',
    alt: 'фото7',
    caption: 'Злата в шокє',
    rotation: -2.2,
    aspectClass: 'wide',
  },
  {
    src: '/фото8.jpg',
    alt: 'фото8',
    caption: 'Днюшка в моєї крихітки',
    rotation: 1.2,
    aspectClass: 'wide',
  },
  {
    src: '/фото9.jpg',
    alt: 'фото9',
    caption: 'Котак',
    rotation: -1.5,
    aspectClass: 'wide',
  },
  {
    src: '/фото10.jpg',
    alt: 'фото10',
    caption: 'Я кохаю тебе більше за самого себе',
    rotation: 2.0,
    aspectClass: 'tall',
  },
  {
    src: '/піся.jpg',
    alt: 'фото11',
    caption: 'Бандіти',
    rotation: -2.8,
    aspectClass: 'tall',
  },
  {
    src: '/фото19.jpg',
    alt: 'фото11',
    caption: 'Жопа',
    rotation: -2.8,
    aspectClass: 'tall',
  },
  {
    src: '/фото11.jpg',
    alt: 'фото11',
    caption: 'Крихітки',
    rotation: -2.8,
    aspectClass: 'tall',
  },
  {
    src: '/фото12.jpg',
    alt: 'фото12',
    caption: 'Forever & always',
    rotation: -2.8,
    aspectClass: 'tall',
  },
  {
    src: '/13.jpg',
    alt: 'фото13',
    caption: 'Forever & always',
    rotation: -2.8,
    aspectClass: 'tall',
  },
  {
    src: '/фото14.jpg',
    alt: 'фото14',
    caption: 'Forever & always',
    rotation: -2.8,
    aspectClass: 'tall',
  },
  {
    src: '/фото15.jpg',
    alt: 'фото15',
    caption: 'Forever & always',
    rotation: -2.8,
    aspectClass: 'tall',
  },
  {
    src: '/фото16.jpg',
    alt: 'фото16',
    caption: 'Forever & always',
    rotation: -2.8,
    aspectClass: 'tall',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.92,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: 'easeOut' as const,
    },
  },
};

export default function PhotoGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [cols, setCols] = useState(3);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateCols = () => {
      if (window.innerWidth < 560) setCols(1);
      else if (window.innerWidth < 900) setCols(2);
      else setCols(3);
    };
    updateCols();
    window.addEventListener('resize', updateCols);
    return () => window.removeEventListener('resize', updateCols);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () => setLightboxIndex((i) => (i !== null ? (i - 1 + photos.length) % photos.length : 0));
  const nextPhoto = () => setLightboxIndex((i) => (i !== null ? (i + 1) % photos.length : 0));

  // Split into columns for masonry (responsive)
  const col1 = photos.filter((_, i) => i % cols === 0);
  const col2 = cols >= 2 ? photos.filter((_, i) => i % cols === 1) : [];
  const col3 = cols >= 3 ? photos.filter((_, i) => i % cols === 2) : [];

  const renderCard = (photo: Photo, globalIndex: number) => (
    <motion.div
      key={photo.src}
      variants={cardVariants}
      className="masonry-item"
      style={{ marginBottom: '28px' }}
    >
      <div
        className="polaroid"
        style={{ transform: `rotate(${photo.rotation}deg)`, cursor: 'pointer' }}
        onClick={() => openLightbox(globalIndex)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && openLightbox(globalIndex)}
      >
        <div
          style={{
            overflow: 'hidden',
            position: 'relative',
            background: 'linear-gradient(135deg, #1a0a0e, #2a1018)',
            minHeight: photo.aspectClass === 'tall' ? '315px' : '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={photo.src}
            alt={photo.alt}
            style={{
              transform: 'scale(1.15)',
              width: '100%',
              height: photo.aspectClass === 'tall' ? '280px' : '200px',
              objectFit: 'cover',
              display: 'block',
              transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)';
            }}
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement;
              img.style.display = 'none';
              const placeholder = img.nextElementSibling as HTMLElement;
              if (placeholder) placeholder.style.display = 'flex';
            }}
          />
          {/* Placeholder shown if image fails */}
          <div
            style={{
              display: 'none',
              position: 'absolute',
              inset: 0,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #1a0a0e 0%, #2d0f1a 50%, #1a0a0e 100%)',
              minHeight: photo.aspectClass === 'tall' ? '280px' : '200px',
            }}
          >
            <span style={{ fontSize: '40px', color: '#c97b8a', opacity: 0.4 }}>♥</span>
            <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: '20px', color: '#c97b8a', opacity: 0.5, marginTop: '8px' }}>
              {photo.alt}
            </span>
          </div>
          {/* Soft vignette */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.2) 100%)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Caption area */}
        <div
          style={{
            paddingTop: '10px',
            textAlign: 'center',
            fontFamily: "'Great Vibes', cursive",
            fontSize: '25px',
            color: '#7b2d42',
            letterSpacing: '0.02em',
          }}
        >
          {photo.caption}
        </div>

        {/* Heart accent */}
        <div
          style={{
            textAlign: 'center',
            // marginTop: '4px',
            fontSize: '30px',
            color: '#c97b8a',
            opacity: 0.7,
          }}
        >
          ♥
        </div>
      </div>
    </motion.div>
  );

  return (
    <section
      id="gallery"
      ref={ref}
      style={{
        position: 'relative',
        zIndex: 2,
        padding: '80px 24px 100px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
        style={{ textAlign: 'center', marginBottom: '64px' }}
      >
        <p
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: 'clamp(28px, 5vw, 48px)',
            color: '#c97b8a',
            marginBottom: '12px',
            opacity: 0.9,
          }}
        >
          Наші моменти
        </p>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(32px, 6vw, 56px)',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #e8b4b8, #c97b8a, #7b2d42)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '24px',
            lineHeight: 1.2,
          }}
        >
          Разом
        </h2>

        {/* Ornate divider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            margin: '0 auto',
            maxWidth: '300px',
          }}
        >
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, #c97b8a)' }} />
          <span style={{ color: '#c97b8a', fontSize: '20px' }}>♥</span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, #c97b8a, transparent)' }} />
        </div>
      </motion.div>

      {/* Masonry grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: '28px',
          alignItems: 'start',
        }}
      >
        {/* Column 1 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {col1.map((photo) => {
            const globalIndex = photos.findIndex((p) => p.src === photo.src);
            return renderCard(photo, globalIndex);
          })}
        </div>

        {/* Column 2 — offset (only when cols >= 2) */}
        {cols >= 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', marginTop: cols === 3 ? '48px' : '0' }}>
            {col2.map((photo) => {
              const globalIndex = photos.findIndex((p) => p.src === photo.src);
              return renderCard(photo, globalIndex);
            })}
          </div>
        )}

        {/* Column 3 (only when cols >= 3) */}
        {cols >= 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', marginTop: '20px' }}>
            {col3.map((photo) => {
              const globalIndex = photos.findIndex((p) => p.src === photo.src);
              return renderCard(photo, globalIndex);
            })}
          </div>
        )}
      </motion.div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          src={photos[lightboxIndex].src}
          alt={photos[lightboxIndex].alt}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}
    </section>
  );
}
