import { useTransform, MotionValue } from 'framer-motion';

/**
 * Creates parallax effect based on scroll
 *
 * @param scrollYProgress - Motion value from useScroll
 * @param distance - Distance to travel (positive or negative)
 * @returns Transformed motion value
 */
export const useParallax = (scrollYProgress: MotionValue<number>, distance: number) => {
  return useTransform(scrollYProgress, [0, 1], [-distance, distance]);
};
