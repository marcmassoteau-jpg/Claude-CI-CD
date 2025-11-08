import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { MagneticButton } from '../animations/MagneticButton';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'glass';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  magnetic?: boolean;
  href?: string;
  onClick?: () => void;
  className?: string;
}

/**
 * Premium button component with multiple variants and magnetic effect
 */
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  magnetic = false,
  href,
  onClick,
  className = '',
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 relative group';

  const variantStyles = {
    primary: 'bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white shadow-lg shadow-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105',
    secondary: 'bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 hover:border-white/40 hover:scale-105',
    ghost: 'text-gray-300 hover:text-white hover:bg-white/5',
    glass: 'bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 hover:border-white/20 hover:shadow-lg',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm gap-2',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-3',
  };

  const styles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  const ButtonContent = () => (
    <>
      {children}
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl"
          style={{ zIndex: -1 }}
        />
      )}
    </>
  );

  if (href) {
    const LinkContent = (
      <a href={href} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
        <ButtonContent />
      </a>
    );

    return magnetic ? (
      <MagneticButton className={styles}>
        {LinkContent}
      </MagneticButton>
    ) : (
      <div className={styles}>
        {LinkContent}
      </div>
    );
  }

  return magnetic ? (
    <MagneticButton className={styles} onClick={onClick}>
      <ButtonContent />
    </MagneticButton>
  ) : (
    <button onClick={onClick} className={styles}>
      <ButtonContent />
    </button>
  );
};
