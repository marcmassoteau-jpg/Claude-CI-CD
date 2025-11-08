import { useScroll } from 'framer-motion';
import { useRef, RefObject } from 'react';

type ScrollOffset = [string, string];

/**
 * Tracks scroll progress (0-1) for an element
 * Used for scroll-linked animations
 *
 * @param offset - Scroll offset ['start end', 'end start'] format
 * @returns ref and scrollYProgress value
 */
export const useScrollProgress = (offset: ScrollOffset = ['start end', 'end start']) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref as RefObject<HTMLElement>,
    offset: offset as any,
  });

  return { ref, scrollYProgress };
};
