import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Clock, MapPin } from 'lucide-react';
import { TravelPackage } from '@/data/packages';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Link to={`/package/${pkg.id}`}>
        <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-card">
          <div className="relative overflow-hidden aspect-[4/3]">
            <img
              src={pkg.image}
              alt={pkg.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {discountPercent > 0 && (
              <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground font-semibold">
                {discountPercent}% OFF
              </Badge>
            )}

            <div className="absolute bottom-3 left-3 right-3">
              <h3 className="font-display text-xl font-bold text-white mb-1">
                {pkg.name}
              </h3>
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <MapPin className="h-3 w-3" />
                <span>{pkg.destination}</span>
              </div>
            </div>
          </div>

          <CardContent className="p-4">
            <div className="flex flex-wrap gap-1.5 mb-3">
              {pkg.highlights.slice(0, 3).map((highlight) => (
                <span 
                  key={highlight} 
                  className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground"
                >
                  {highlight}
                </span>
              ))}
            </div>

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

            <div className="mt-3 pt-3 border-t border-border flex items-baseline justify-between">
              <div>
                <span className="text-2xl font-bold text-primary">
                  ₹{pkg.price.toLocaleString('en-IN')}
                </span>
                {pkg.originalPrice && (
                  <span className="ml-2 text-sm text-muted-foreground line-through">
                    ₹{pkg.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              <span className="text-xs text-muted-foreground">per person</span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};
