import { useEffect, useRef } from 'react';

interface Heart {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  drift: number;
  phase: number;
  rotation: number;
  rotSpeed: number;
  color: string;
}

const COLORS = [
  'rgba(201, 123, 138,',
  'rgba(232, 180, 184,',
  'rgba(123, 45, 66,',
  'rgba(180, 80, 100,',
  'rgba(245, 200, 210,',
];



export default function HeartCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heartsRef = useRef<Heart[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize hearts
    const count = Math.min(60, Math.floor(window.innerWidth / 20));
    heartsRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight + window.innerHeight,
      size: 6 + Math.random() * 22,
      opacity: 0.05 + Math.random() * 0.25,
      speed: 0.2 + Math.random() * 0.6,
      drift: (Math.random() - 0.5) * 0.5,
      phase: Math.random() * Math.PI * 2,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.01,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    let tick = 0;

    const animate = () => {
      tick += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      heartsRef.current.forEach((heart) => {
        // Move upward with gentle sway
        heart.y -= heart.speed;
        heart.x += Math.sin(tick + heart.phase) * heart.drift;
        heart.rotation += heart.rotSpeed;

        // Reset when off-screen
        if (heart.y < -50) {
          heart.y = canvas.height + 50;
          heart.x = Math.random() * canvas.width;
          heart.opacity = 0.05 + Math.random() * 0.25;
        }

        // Fade in/out based on position
        const fadeZone = 100;
        let alpha = heart.opacity;
        if (heart.y > canvas.height - fadeZone) {
          alpha *= (canvas.height - heart.y) / fadeZone;
        }
        if (heart.y < fadeZone) {
          alpha *= heart.y / fadeZone;
        }

        ctx.save();
        ctx.translate(heart.x, heart.y);
        ctx.rotate(heart.rotation);
        ctx.scale(1, 1);
        ctx.fillStyle = `${heart.color}${Math.max(0, alpha)})`;

        ctx.beginPath();
        const s = heart.size / 10;
        ctx.moveTo(0, -3 * s);
        ctx.bezierCurveTo(5 * s, -8 * s, 10 * s, -2 * s, 0, 5 * s);
        ctx.bezierCurveTo(-10 * s, -2 * s, -5 * s, -8 * s, 0, -3 * s);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="heart-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
