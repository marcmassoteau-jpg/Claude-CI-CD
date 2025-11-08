import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import type { ReactNode } from 'react';
import { motion as motionTokens } from '../../config/design-tokens';

type RevealMode = 'fade' | 'slide' | 'scale' | 'slideUp' | 'slideDown';

interface ScrollRevealProps {
  children: ReactNode;
  mode?: RevealMode;
  delay?: number;
  className?: string;
}

/**
 * Advanced scroll-triggered reveal component
 * Animates content as it enters the viewport with various effects
 */
export const ScrollReveal = ({
  children,
  mode = 'fade',
  delay = 0,
  className = ''
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.5'], // Triggers when element is 85% down viewport
  });

  // Different reveal transformations
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const yUp = useTransform(scrollYProgress, [0, 1], [-50, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  const modeStyles = {
    fade: { opacity },
    slide: { opacity, y },
    slideUp: { opacity, y: yUp },
    slideDown: { opacity, y },
    scale: { opacity, scale },
  };

  return (
    <motion.div
      ref={ref}
      style={modeStyles[mode]}
      transition={{
        delay,
        duration: motionTokens.duration.slow / 1000,
        ease: motionTokens.easing.apple as any
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
