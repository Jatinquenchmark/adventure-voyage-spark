import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, X, Sparkles } from 'lucide-react';

interface AnimatedListItemProps {
  item: string;
  index: number;
  type: 'inclusion' | 'exclusion';
}

export const AnimatedListItem = ({ item, index, type }: AnimatedListItemProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  
  const isInclusion = type === 'inclusion';
  const Icon = isInclusion ? Check : X;
  
  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, x: isInclusion ? -30 : 30, scale: 0.9 }}
      animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: isInclusion ? -30 : 30, scale: 0.9 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      className="relative group"
    >
      <motion.div 
        className={`
          flex items-start gap-4 p-4 rounded-xl border transition-all duration-300
          ${isInclusion 
            ? 'bg-gradient-to-r from-green-500/5 to-transparent border-green-500/20 hover:border-green-500/40 hover:bg-green-500/10' 
            : 'bg-gradient-to-r from-red-500/5 to-transparent border-red-500/20 hover:border-red-500/40 hover:bg-red-500/10'
          }
        `}
        whileHover={{ x: 5, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Animated icon container */}
        <motion.div 
          className={`
            relative flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
            ${isInclusion 
              ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
              : 'bg-gradient-to-br from-red-500 to-rose-600'
            }
          `}
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
          transition={{ 
            delay: index * 0.1 + 0.2, 
            type: "spring", 
            stiffness: 200,
            damping: 15
          }}
        >
          <Icon className="h-4 w-4 text-white" />
          
          {/* Pulse effect */}
          <motion.div
            className={`absolute inset-0 rounded-full ${isInclusion ? 'bg-green-500' : 'bg-red-500'}`}
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{ 
              duration: 1, 
              delay: index * 0.1 + 0.3,
              repeat: 0
            }}
          />
        </motion.div>

        {/* Text content */}
        <motion.div 
          className="flex-1"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          <span className="text-foreground font-medium leading-relaxed">
            {item}
          </span>
        </motion.div>

        {/* Decorative sparkle for inclusions */}
        {isInclusion && (
          <motion.div
            className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="h-4 w-4 text-green-500/50" />
          </motion.div>
        )}

        {/* Progress bar at bottom */}
        <motion.div
          className={`absolute bottom-0 left-0 h-0.5 rounded-full ${isInclusion ? 'bg-green-500' : 'bg-red-500'}`}
          initial={{ width: 0 }}
          animate={isInView ? { width: "100%" } : { width: 0 }}
          transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
        />
      </motion.div>
    </motion.li>
  );
};

interface AnimatedListProps {
  items: string[];
  type: 'inclusion' | 'exclusion';
}

export const AnimatedList = ({ items, type }: AnimatedListProps) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });
  
  const isInclusion = type === 'inclusion';
  
  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div 
        className="flex items-center gap-3 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ delay: 0.1 }}
      >
        <div className={`h-1 flex-1 rounded-full ${isInclusion ? 'bg-gradient-to-r from-green-500/50 to-transparent' : 'bg-gradient-to-r from-red-500/50 to-transparent'}`} />
        <span className={`text-sm font-medium px-4 py-2 rounded-full ${isInclusion ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}>
          {isInclusion ? '✨ What\'s Included' : '⚠️ Not Included'}
        </span>
        <div className={`h-1 flex-1 rounded-full ${isInclusion ? 'bg-gradient-to-l from-green-500/50 to-transparent' : 'bg-gradient-to-l from-red-500/50 to-transparent'}`} />
      </motion.div>

      {/* List */}
      <ul className="space-y-3">
        {items.map((item, index) => (
          <AnimatedListItem key={item} item={item} index={index} type={type} />
        ))}
      </ul>

      {/* Footer summary */}
      <motion.div 
        className="mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: items.length * 0.1 + 0.5 }}
      >
        <span className={`text-sm ${isInclusion ? 'text-green-600' : 'text-muted-foreground'}`}>
          {isInclusion 
            ? `🎉 ${items.length} amazing inclusions for your trip!` 
            : `📋 ${items.length} items to plan separately`
          }
        </span>
      </motion.div>
    </motion.div>
  );
};
