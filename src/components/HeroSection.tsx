import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown, Zap, Flame, Percent, Check } from 'lucide-react';
import { Globe3D } from './Globe3D';
import { Suspense } from 'react';
const destinationImages = [
  // Left side images
  { 
    src: 'https://images.unsplash.com/photo-1549693578-d683be217e58?w=400&q=80', 
    alt: 'Tokyo Tower',
    position: 'left',
    style: { top: '8%', left: '2%' },
    size: 'sm'
  },
  { 
    src: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=400&q=80', 
    alt: 'European Castle',
    position: 'left',
    style: { top: '5%', left: '8%' },
    size: 'xs'
  },
  { 
    src: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=80', 
    alt: 'Taj Mahal',
    position: 'left',
    style: { top: '2%', left: '15%' },
    size: 'xs'
  },
  { 
    src: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80', 
    alt: 'Japan Temple',
    position: 'left',
    style: { top: '18%', left: '0%' },
    size: 'md'
  },
  { 
    src: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=400&q=80', 
    alt: 'Tokyo',
    position: 'left',
    style: { top: '15%', left: '10%' },
    size: 'lg'
  },
  // Right side images
  { 
    src: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&q=80', 
    alt: 'Rome Colosseum',
    position: 'right',
    style: { top: '5%', right: '15%' },
    size: 'sm'
  },
  { 
    src: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80', 
    alt: 'Paris',
    position: 'right',
    style: { top: '2%', right: '8%' },
    size: 'xs'
  },
  { 
    src: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=400&q=80', 
    alt: 'Australia',
    position: 'right',
    style: { top: '8%', right: '0%' },
    size: 'sm'
  },
  { 
    src: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=80', 
    alt: 'India Gate',
    position: 'right',
    style: { top: '18%', right: '8%' },
    size: 'lg'
  },
  { 
    src: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&q=80', 
    alt: 'Taj Mahal Sunset',
    position: 'right',
    style: { top: '15%', right: '0%' },
    size: 'md'
  },
];

const sizeClasses = {
  xs: 'w-16 h-16 md:w-20 md:h-20',
  sm: 'w-20 h-20 md:w-24 md:h-24',
  md: 'w-28 h-28 md:w-36 md:h-36',
  lg: 'w-36 h-36 md:w-44 md:h-44',
};

export const HeroSection = () => {
  const scrollToPackages = () => {
    document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#0a1628] via-[#0d1f3c] to-[#1a365d]">
      {/* 3D Globe - Centered and prominent */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full max-w-[900px] mx-auto">
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/20 to-green-500/20 animate-pulse" />
            </div>
          }>
            <Globe3D />
          </Suspense>
        </div>
      </div>

      {/* Gradient overlays for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-[#0a1628]/50 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/60 via-transparent to-[#0a1628]/60 pointer-events-none" />

      {/* Floating Destination Images - Left Side */}
      <div className="hidden lg:block absolute left-0 top-0 w-1/4 h-full pointer-events-none">
        {destinationImages.filter(img => img.position === 'left').map((img, index) => (
          <motion.div
            key={`left-${index}`}
            className={`absolute ${sizeClasses[img.size as keyof typeof sizeClasses]} rounded-xl overflow-hidden shadow-2xl border-4 border-white/20`}
            style={img.style}
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotate: index % 2 === 0 ? -3 : 3,
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.15,
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }
            }}
          >
            <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </div>

      {/* Floating Destination Images - Right Side */}
      <div className="hidden lg:block absolute right-0 top-0 w-1/4 h-full pointer-events-none">
        {destinationImages.filter(img => img.position === 'right').map((img, index) => (
          <motion.div
            key={`right-${index}`}
            className={`absolute ${sizeClasses[img.size as keyof typeof sizeClasses]} rounded-xl overflow-hidden shadow-2xl border-4 border-white/20`}
            style={img.style}
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotate: index % 2 === 0 ? 3 : -3,
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.15 + 0.5,
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 + 0.5 }
            }}
          >
            <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 pt-32 pb-20 min-h-screen flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl"
        >
          <motion.h1 
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400 italic">
              Discover Your
            </span>
            <br />
            <span className="text-white">Next Adventure</span>
          </motion.h1>

          {/* Trust Badges */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-2 text-white/90">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                <Check className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm md:text-base">Best Price Guarantee</span>
            </div>
            <span className="text-white/50 hidden md:inline">•</span>
            <div className="flex items-center gap-2 text-white/90">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                <Check className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm md:text-base">24/7 Support</span>
            </div>
            <span className="text-white/50 hidden md:inline">•</span>
            <div className="flex items-center gap-2 text-white/90">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                <Check className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm md:text-base">Easy Refunds</span>
            </div>
          </motion.div>

          {/* Offer Pills */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <motion.div 
              className="flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
            >
              <Zap className="h-4 w-4 text-yellow-400" />
              <span className="font-medium">Trending: Goa</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
            >
              <Flame className="h-4 w-4 text-orange-400" />
              <span className="font-medium">Hot Deals: Maldives</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
            >
              <Percent className="h-4 w-4 text-green-400" />
              <span className="font-medium">Up to 40% Off</span>
            </motion.div>
          </motion.div>

          {/* CTA Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-7 text-lg rounded-full shadow-2xl hover:shadow-primary/30 transition-all duration-300"
              onClick={scrollToPackages}
            >
              Explore Packages
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <button 
            onClick={scrollToPackages}
            className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
          >
            <ChevronDown className="h-6 w-6 text-white" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
