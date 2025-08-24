import React from 'react';
import { motion } from 'framer-motion';

interface GlowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const GlowButton: React.FC<GlowButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = ''
}) => {
  const baseClasses = 'relative overflow-hidden rounded-lg font-semibold transition-all duration-300 transform hover:scale-105';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40',
    secondary: 'border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/40'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 opacity-0 hover:opacity-100 transition-opacity duration-300"
        initial={false}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};