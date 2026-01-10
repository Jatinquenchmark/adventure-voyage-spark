import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { packages, destinations } from '@/data/packages';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PackageCard } from '@/components/PackageCard';
import { Button } from '@/components/ui/button';

const destinationImages: Record<string, string> = {
  goa: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1600&q=80',
  maldives: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1600&q=80',
  thailand: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=1600&q=80',
  dubai: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=80',
  kashmir: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=1600&q=80',
  ladakh: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1600&q=80',
  singapore: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1600&q=80',
  kerala: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1600&q=80',
  europe: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1600&q=80',
  turkey: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1600&q=80',
  bali: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600&q=80',
  paris: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&q=80',
  switzerland: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1600&q=80',
};

const DestinationPage = () => {
  const { id } = useParams<{ id: string }>();
  
  const destination = destinations.find(d => d.id === id);
  const destinationPackages = packages.filter(
    pkg => pkg.destination.toLowerCase().includes(id || '') || 
           pkg.id.includes(id || '')
  );

  const heroImage = destinationImages[id || ''] || 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1600&q=80';

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img
          src={heroImage}
          alt={destination?.name || id}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        
        <div className="absolute top-24 left-4 md:left-8">
          <Link to="/">
            <Button variant="secondary" size="sm" className="glass">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back Home
            </Button>
          </Link>
        </div>

        <div className="absolute bottom-8 left-0 right-0 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-6xl mb-4 block">{destination?.emoji || '🌍'}</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
              {destination?.name || id?.charAt(0).toUpperCase() + id?.slice(1)}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Packages */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">
            {destinationPackages.length > 0 
              ? `${destinationPackages.length} Packages Available`
              : 'No packages available yet'
            }
          </h2>

          {destinationPackages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {destinationPackages.map((pkg, index) => (
                <PackageCard key={pkg.id} pkg={pkg} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-6">
                We're working on adding amazing packages for this destination!
              </p>
              <Link to="/">
                <Button>Explore Other Destinations</Button>
              </Link>
            </div>
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default DestinationPage;
