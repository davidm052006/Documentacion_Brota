import { useRef, useState, useCallback } from 'react';

// Posición destino = donde está el logo en LoginNavbar (px-10 py-6)
const LOGO_TARGET = { top: 20, left: 36, size: 48 };

export default function IntroAnimation({ onComplete }) {
  const [visible, setVisible] = useState(true);
  const videoRef = useRef(null);
  const overlayRef = useRef(null);

  const finish = useCallback(() => {
    setVisible(false);
    onComplete?.();
  }, [onComplete]);

  const handleVideoEnd = useCallback(() => {
    const video = videoRef.current;
    const overlay = overlayRef.current;
    if (!video || !overlay) return;

    overlay.style.transition = 'opacity 0.85s ease-out';
    overlay.style.opacity = '0';

    const easing = 'cubic-bezier(0.4, 0, 0.2, 1)';
    video.style.transition = [
      `top 0.85s ${easing}`,
      `left 0.85s ${easing}`,
      `width 0.85s ${easing}`,
      `height 0.85s ${easing}`,
      `border-radius 0.85s ${easing}`,
    ].join(', ');

    requestAnimationFrame(() => {
      video.style.top = `${LOGO_TARGET.top}px`;
      video.style.left = `${LOGO_TARGET.left}px`;
      video.style.width = `${LOGO_TARGET.size}px`;
      video.style.height = `${LOGO_TARGET.size}px`;
      video.style.borderRadius = '10px';
    });

    setTimeout(finish, 950);
  }, [finish]);

  if (!visible) return null;

  return (
    <>
      <div
        ref={overlayRef}
        style={{ position: 'fixed', inset: 0, background: '#000', zIndex: 9998 }}
      />
      <video
        ref={videoRef}
        src="/animacion-brota-calidad.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'contain',
          background: '#000',
          zIndex: 9999,
        }}
      />
      <button
        onClick={finish}
        style={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          zIndex: 10000,
          background: 'rgba(255,255,255,0.12)',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.25)',
          borderRadius: 8,
          padding: '8px 20px',
          cursor: 'pointer',
          fontSize: 13,
          backdropFilter: 'blur(6px)',
          letterSpacing: '0.03em',
        }}
      >
        Saltar →
      </button>
    </>
  );
}
