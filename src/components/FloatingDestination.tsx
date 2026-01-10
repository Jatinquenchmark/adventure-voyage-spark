import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface FloatingDestinationProps {
  name: string;
  emoji: string;
  id: string;
  delay?: number;
  position: { x: string; y: string };
  size?: 'sm' | 'md' | 'lg';
  tag?: string;
}

export const FloatingDestination = ({ 
  name, 
  emoji, 
  id,
  delay = 0, 
  position, 
  size = 'md',
  tag 
}: FloatingDestinationProps) => {
  const sizeClasses = {
    sm: 'w-20 h-20 text-2xl',
    md: 'w-24 h-24 text-3xl',
    lg: 'w-28 h-28 text-4xl',
  };

  const textSizes = {
    sm: 'text-[10px]',
    md: 'text-xs',
    lg: 'text-sm',
  };

  return (
    <motion.div
      className="absolute z-10"
      style={{ left: position.x, top: position.y }}
      initial={{ opacity: 0, scale: 0, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        delay: delay,
        duration: 0.6,
        type: "spring",
        stiffness: 100 
      }}
    >
      <motion.div
        animate={{ 
          y: [0, -15, 0],
          rotate: [-2, 2, -2],
        }}
        transition={{ 
          duration: 4 + Math.random() * 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay 
        }}
      >
        <Link to={`/destination/${id}`}>
          <motion.div 
            className={`${sizeClasses[size]} glass rounded-2xl flex flex-col items-center justify-center cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300 group relative`}
            whileHover={{ scale: 1.15, y: -10 }}
            whileTap={{ scale: 0.95 }}
          >
            {tag && (
              <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-secondary text-secondary-foreground text-[9px] font-semibold rounded-full shadow-lg">
                {tag}
              </span>
            )}
            <span className="mb-1 group-hover:scale-125 transition-transform duration-300">
              {emoji}
            </span>
            <span className={`${textSizes[size]} font-medium text-foreground/80 group-hover:text-primary transition-colors`}>
              {name}
            </span>
          </motion.div>
        </Link>
      </motion.div>
    </motion.div>
  );
};
