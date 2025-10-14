import { motion, useAnimationFrame } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";

interface InfiniteCarouselProps {
  speed?: number;
  itemWidth: number;
  children: React.ReactNode;
}

export function InfiniteCarousel({
  speed = 1,
  itemWidth,
  children,
}: InfiniteCarouselProps) {
  const childArray = React.Children.toArray(children);
  const [positions, setPositions] = useState<number[]>([]);
  const totalItems = childArray.length;
  const totalWidth = totalItems * itemWidth;

  // Inicializa as posições de cada item
  useEffect(() => {
    setPositions(childArray.map((_, i) => i * itemWidth));
  }, [children]);

  useAnimationFrame(() => {
    setPositions((prev) =>
      prev.map((pos) => {
        const newPos = pos - speed;
        // se o item saiu completamente da esquerda, reposiciona no fim
        return newPos <= -itemWidth ? newPos + totalWidth : newPos;
      })
    );
  });

  return (
    <div className="w-full relative">
      {childArray.map((item, idx) => (
        <motion.div
          key={idx}
          className="absolute top-0"
          style={{
            x: positions[idx] ?? 0,
            width: itemWidth,
            willChange: "transform",
          }}
        >
          {item}
        </motion.div>
      ))}
    </div>
  );
}
