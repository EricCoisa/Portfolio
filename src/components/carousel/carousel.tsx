import React, { useState, useEffect, useRef, type ReactNode, type MouseEvent } from 'react';
import { CarouselContainer, CarouselTrack, PrevButton, NextButton } from './carousel.styles';

interface CarouselProps {
  items?: ReactNode[];
  children?: ReactNode;
  controllers?: boolean;
  auto?: boolean;
  time?: number; // ms
  velocity?: number; // px/ms
  infinity?: boolean
}

export function Carousel({ items, children, controllers = true, auto = false, time = 3000, velocity = 400, infinity = false }: CarouselProps) {
  const content = items || React.Children.toArray(children);
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const length = content.length;
  const extendedContent = infinity ? [...content, content[0]] : content;

  useEffect(function setupAutoPlay() {
    if (auto) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setCurrent((prev) => prev + 1);
      }, time);
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }
    return undefined;
  }, [current, auto, time, length, infinity]);

  useEffect(() => {
    if (infinity && current === length) {
      // Espera a transição terminar, depois reseta para o primeiro sem animação
      const timer = setTimeout(() => {
        setCurrent(0);
      }, velocity);
      return () => clearTimeout(timer);
    }
  }, [current, infinity, length, velocity]);

  function goTo(event: MouseEvent<HTMLButtonElement>) {
    const target = event.currentTarget as HTMLElement;
    const idx = Number(target.dataset.current);
    setCurrent((idx + extendedContent.length) % extendedContent.length);
  }

  return (
    <CarouselContainer>
      <CarouselTrack translateX={-current * 100} velocity={velocity}>
        {extendedContent.map((item, idx) => (
          <div key={idx} style={{ minWidth: '100%', flexShrink: 0 }}>
            {item}
          </div>
        ))}
      </CarouselTrack>
      {controllers && (
        <>
          <PrevButton data-current={current - 1 < 0 ? (infinity ? length - 1 : 0) : current - 1} onClick={goTo} aria-label="Anterior">&#8592;</PrevButton>
          <NextButton data-current={current + 1} onClick={goTo} aria-label="Próximo">&#8594;</NextButton>
        </>
      )}
    </CarouselContainer>
  );
};

export default Carousel;
