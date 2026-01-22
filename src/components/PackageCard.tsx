import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Clock, MapPin, ArrowRight } from 'lucide-react';
import { TravelPackage } from '@/data/packages';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface PackageCardProps {
  pkg: TravelPackage;
  index?: number;
}

export const PackageCard = ({ pkg, index = 0 }: PackageCardProps) => {
  const discountPercent = pkg.originalPrice 
    ? Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <Link to={`/package/${pkg.id}`}>
        <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-card h-full">
          <div className="relative overflow-hidden aspect-[4/3]">
            <motion.img
              src={pkg.image}
              alt={pkg.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            {discountPercent > 0 && (
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground font-semibold px-3 py-1">
                  {discountPercent}% OFF
                </Badge>
              </motion.div>
            )}

            {/* Hover overlay */}
            <motion.div 
              className="absolute inset-0 bg-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-full p-3 shadow-xl"
              >
                <ArrowRight className="h-6 w-6 text-primary" />
              </motion.div>
            </motion.div>

            <div className="absolute bottom-3 left-3 right-3">
              <motion.h3 
                className="font-display text-xl font-bold text-white mb-1"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                viewport={{ once: true }}
              >
                {pkg.name}
              </motion.h3>
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <MapPin className="h-3 w-3" />
                <span>{pkg.destination}</span>
              </div>
            </div>
          </div>

          <CardContent className="p-4">
            <motion.div 
              className="flex flex-wrap gap-1.5 mb-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              viewport={{ once: true }}
            >
              {pkg.highlights.slice(0, 3).map((highlight, i) => (
                <motion.span 
                  key={highlight} 
                  className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 + i * 0.05 }}
                  viewport={{ once: true }}
                >
                  {highlight}
                </motion.span>
              ))}
            </motion.div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-secondary text-secondary" />
                <span className="font-medium">{pkg.rating}</span>
                <span className="text-muted-foreground text-sm">
                  ({pkg.reviews} reviews)
                </span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                <Clock className="h-3 w-3" />
                <span>{pkg.duration}</span>
              </div>
            </div>

            <motion.div 
              className="mt-3 pt-3 border-t border-border flex items-center justify-between"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.4 }}
              viewport={{ once: true }}
            >
              <div>
                <span className="text-2xl font-bold text-primary">
                  ₹{pkg.price.toLocaleString('en-IN')}
                </span>
                {pkg.originalPrice && (
                  <span className="ml-2 text-sm text-muted-foreground line-through">
                    ₹{pkg.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="block text-xs text-muted-foreground">per person</span>
              </div>
              <Button size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                View
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};
