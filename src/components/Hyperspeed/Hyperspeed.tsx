// src/components/reactbits/backgrounds/Hyperspeed.tsx
import { useRef, useEffect } from 'react';

export function Hyperspeed({
  hue = 270,
  className = '',
}: {
  hue?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let frameId: number;
    const TAU = Math.PI * 2;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const stars = Array.from({ length: 300 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * canvas.width,
    }));

    const render = () => {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const speed = 5;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const star of stars) {
        star.z -= speed;
        if (star.z <= 0) {
          star.x = Math.random() * canvas.width;
          star.y = Math.random() * canvas.height;
          star.z = canvas.width;
        }

        const k = 128.0 / star.z;
        const x = (star.x - cx) * k + cx;
        const y = (star.y - cy) * k + cy;

        if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) {
          continue;
        }

        const size = (1 - star.z / canvas.width) * 3;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
        gradient.addColorStop(0, `hsl(${hue}, 100%, 80%)`);
        gradient.addColorStop(1, `hsla(${hue}, 100%, 80%, 0)`);

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(x, y, size, 0, TAU);
        ctx.fill();
      }

      frameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
    };
  }, [hue]);

  return (
    <canvas
      ref={ref}
      className={`fixed inset-0 w-full h-full -z-10 ${className}`}
    />
  );
}
