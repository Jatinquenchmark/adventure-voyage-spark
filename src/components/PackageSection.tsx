import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { TravelPackage } from '@/data/packages';
import { PackageCard } from './PackageCard';
import { Button } from '@/components/ui/button';

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
  return (
    <section id={id} className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10"
        >
          <div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
              {title}
            </h2>
            <p className="text-muted-foreground text-lg">
              {subtitle}
            </p>
          </div>
          {viewAllLink && (
            <Link to={viewAllLink}>
              <Button variant="ghost" className="mt-4 md:mt-0 group">
                View All
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          )}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {packages.map((pkg, index) => (
            <PackageCard key={pkg.id} pkg={pkg} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
