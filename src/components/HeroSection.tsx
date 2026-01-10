import { motion } from 'framer-motion';
import { FloatingDestination } from './FloatingDestination';
import { Button } from '@/components/ui/button';
import { Plane, Shield, Headphones, RefreshCw, ChevronDown } from 'lucide-react';

const floatingDestinations = [
  { id: 'paris', name: 'Paris', emoji: '🗼', position: { x: '5%', y: '15%' }, size: 'lg' as const, delay: 0.2 },
  { id: 'maldives', name: 'Maldives', emoji: '🏝️', position: { x: '80%', y: '10%' }, size: 'lg' as const, tag: 'Hot Deal', delay: 0.4 },
  { id: 'dubai', name: 'Dubai', emoji: '🏙️', position: { x: '15%', y: '55%' }, size: 'md' as const, delay: 0.6 },
  { id: 'bali', name: 'Bali', emoji: '🌺', position: { x: '85%', y: '45%' }, size: 'md' as const, delay: 0.8 },
  { id: 'goa', name: 'Goa', emoji: '🏖️', position: { x: '2%', y: '75%' }, size: 'sm' as const, tag: 'Trending', delay: 1.0 },
  { id: 'switzerland', name: 'Swiss', emoji: '🏔️', position: { x: '75%', y: '75%' }, size: 'md' as const, delay: 1.2 },
  { id: 'thailand', name: 'Thailand', emoji: '🛕', position: { x: '92%', y: '30%' }, size: 'sm' as const, delay: 0.5 },
  { id: 'kashmir', name: 'Kashmir', emoji: '❄️', position: { x: '10%', y: '35%' }, size: 'sm' as const, delay: 0.7 },
];

export const HeroSection = () => {
  const scrollToPackages = () => {
    document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl"
          animate={{ 
            rotate: [0, 360],
          }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Floating Destinations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="relative w-full h-full pointer-events-auto">
          {floatingDestinations.map((dest) => (
            <FloatingDestination key={dest.id} {...dest} />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 pt-32 pb-20 min-h-screen flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="mb-6"
          >
            <span className="text-6xl">✈️</span>
          </motion.div>

          <motion.h1 
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-gradient">Discover Your</span>
            <br />
            <span className="text-foreground">Next Adventure</span>
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Explore the world's most breathtaking destinations with Tripsoul. 
            Curated experiences, unbeatable prices, and memories that last forever.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-glow"
              onClick={scrollToPackages}
            >
              <Plane className="mr-2 h-5 w-5" />
              Explore Packages
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 py-6 text-lg rounded-full border-2 hover:bg-primary/5"
            >
              Contact Us
            </Button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span>Best Price Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Headphones className="h-5 w-5 text-primary" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-primary" />
              <span>Easy Refunds</span>
            </div>
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
            className="p-2 rounded-full glass hover:bg-primary/10 transition-colors"
          >
            <ChevronDown className="h-6 w-6 text-primary" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
