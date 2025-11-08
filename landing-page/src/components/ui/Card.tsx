import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AnimatedCard } from '../animations/AnimatedCard';

interface CardProps {
  children: ReactNode;
  variant?: 'glass' | 'solid' | 'gradient-border';
  hover3d?: boolean;
  glow?: boolean;
  glowColor?: 'purple' | 'blue' | 'pink';
  className?: string;
}

/**
 * Glassmorphic card with optional 3D tilt effect
 */
export const Card = ({
  children,
  variant = 'glass',
  hover3d = false,
  glow = false,
  glowColor = 'purple',
  className = '',
}: CardProps) => {
  const variantStyles = {
    glass: 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50',
    solid: 'bg-gray-800 border border-gray-700',
    'gradient-border': 'bg-gray-800/90 backdrop-blur-sm border border-transparent bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/20',
  };

  const glowStyles = glow
    ? {
        purple: 'shadow-[0_0_60px_rgba(168,85,247,0.3)] hover:shadow-[0_0_80px_rgba(168,85,247,0.4)]',
        blue: 'shadow-[0_0_60px_rgba(59,130,246,0.3)] hover:shadow-[0_0_80px_rgba(59,130,246,0.4)]',
        pink: 'shadow-[0_0_60px_rgba(236,72,153,0.3)] hover:shadow-[0_0_80px_rgba(236,72,153,0.4)]',
      }[glowColor]
    : '';

  const cardContent = (
    <div
      className={`rounded-2xl p-8 ${variantStyles[variant]} ${glowStyles} ${className} transition-all duration-300 hover:border-gray-600/70`}
    >
      {children}
    </div>
  );

  if (hover3d) {
    return <AnimatedCard>{cardContent}</AnimatedCard>;
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {cardContent}
    </motion.div>
  );
};
