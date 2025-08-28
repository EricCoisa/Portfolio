import React, { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { BannerContainer } from './banner.styles';


interface BannerProps {
  items?: ReactNode[];
  children?: ReactNode;
  velocity?: number; // px/s
  itemMinWidth?: number; // px
}



export function Banner({ items, children, velocity = 60, itemMinWidth = 200 }: BannerProps) {
  const content = items || React.Children.toArray(children);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [trackWidth, setTrackWidth] = useState(0);

  // Duplicar os itens para loop visual
  const extendedContent = [...content, ...content];

  useEffect(() => {
    function updateTrackWidth() {
      if (trackRef.current && containerRef.current) {
        // Calcule apenas a largura dos itens originais
        const items = Array.from(trackRef.current.children).slice(0, content.length);
        const width = items.reduce((acc, el) => acc + (el as HTMLElement).offsetWidth, 0);
        setTrackWidth(width);
      }
    }
    updateTrackWidth();
    window.addEventListener('resize', updateTrackWidth);
    return () => window.removeEventListener('resize', updateTrackWidth);
  }, [content.length, itemMinWidth]);

  useEffect(() => {
    if (!trackRef.current || trackWidth === 0) return;
    const duration = trackWidth / velocity;
    controls.set({ x: 0 }); // Reset posição
    controls.start({
      x: -trackWidth,
      transition: {
        duration,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop',
      },
    });
  }, [trackWidth, velocity, controls]);

  return (
    <BannerContainer ref={containerRef} style={{ width: '100%', overflow: 'hidden', position: 'relative' }}>
      <motion.div
        ref={trackRef}
        animate={controls}
        style={{ display: 'flex', width: 'max-content' }}
      >
        {extendedContent.map((item, idx) => (
          <div key={idx} style={{ minWidth: itemMinWidth, flexShrink: 0 }}>
            {item}
          </div>
        ))}
      </motion.div>
    </BannerContainer>
  );
}

export default Banner;
