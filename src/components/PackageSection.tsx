import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { TravelPackage } from '@/data/packages';
import { PackageCard } from './PackageCard';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';

interface PackageSectionProps {
  id: string;
  title: string;
  subtitle: string;
  packages: TravelPackage[];
  viewAllLink?: string;
}

export const PackageSection = ({ 
  id, 
  title, 
  subtitle, 
  packages, 
  viewAllLink 
}: PackageSectionProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id={id} ref={containerRef} className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
        >
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-primary text-sm mb-3"
            >
              <Sparkles className="h-3 w-3" />
              <span>Featured Collection</span>
            </motion.div>
            <motion.h2 
              className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {title}
            </motion.h2>
            <motion.p 
              className="text-muted-foreground text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {subtitle}
            </motion.p>
          </div>
          {viewAllLink && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link to={viewAllLink}>
                <Button variant="ghost" className="mt-4 md:mt-0 group text-primary">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
              </Link>
            </motion.div>
          )}
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          style={{ y }}
        >
          {packages.map((pkg, index) => (
            <PackageCard key={pkg.id} pkg={pkg} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
