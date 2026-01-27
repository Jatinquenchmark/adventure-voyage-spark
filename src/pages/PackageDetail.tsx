import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  ArrowLeft, 
  Star, 
  Clock, 
  MapPin, 
  Calendar,
  Users,
  Shield,
  Phone,
  MessageCircle,
  Sunrise,
  Sunset,
  Sun,
  Moon,
  Plane,
  Camera,
  Utensils,
  Mountain
} from 'lucide-react';
import { getPackageById } from '@/data/packages';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnimatedList } from '@/components/AnimatedListItem';

// Animated itinerary day component
const ItineraryDay = ({ day, index, total }: { day: { day: number; title: string; description: string }; index: number; total: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const dayIcons = [Plane, Sunrise, Camera, Mountain, Utensils, Sun, Sunset, Moon];
  const DayIcon = dayIcons[index % dayIcons.length];
  
  const isLast = index === total - 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -50, scale: 0.9 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      className="relative"
    >
      {/* Timeline connector */}
      <div className="absolute left-6 top-0 bottom-0 flex flex-col items-center">
        {/* Animated circle */}
        <motion.div 
          className="relative z-10"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: index * 0.15 + 0.2, type: "spring", stiffness: 200 }}
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
            <DayIcon className="h-5 w-5 text-white" />
          </div>
          {/* Pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
          />
        </motion.div>
        
        {/* Vertical line */}
        {!isLast && (
          <motion.div 
            className="w-0.5 flex-1 bg-gradient-to-b from-primary via-primary/50 to-primary/20"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
            style={{ originY: 0 }}
          />
        )}
      </div>

      {/* Content card */}
      <motion.div 
        className="ml-20 mb-6"
        whileHover={{ scale: 1.02, x: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.div 
          className="relative overflow-hidden bg-gradient-to-br from-card to-muted/30 rounded-2xl p-5 shadow-lg border border-border/50 hover:shadow-xl transition-shadow duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: index * 0.15 + 0.1 }}
        >
          {/* Decorative gradient */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />
          
          {/* Day badge */}
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -10 }}
            transition={{ delay: index * 0.15 + 0.3, type: "spring" }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold mb-3"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Day {day.day}
          </motion.div>

          <h4 className="font-display text-xl font-bold text-foreground mb-2 relative z-10">
            {day.title}
          </h4>
          
          <motion.p 
            className="text-muted-foreground leading-relaxed relative z-10"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: index * 0.15 + 0.4 }}
          >
            {day.description}
          </motion.p>

          {/* Hover indicator */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-accent"
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const PackageDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const pkg = getPackageById(id || '');
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  if (!pkg) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold mb-4">Package Not Found</h1>
          <Link to="/">
            <Button>Go Back Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const discountPercent = pkg.originalPrice 
    ? Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Image */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        
        <div className="absolute top-24 left-4 md:left-8">
          <Link to="/">
            <Button variant="secondary" size="sm" className="glass">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Packages
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl shadow-xl p-6 md:p-8"
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {discountPercent > 0 && (
                  <Badge className="bg-secondary text-secondary-foreground">
                    {discountPercent}% OFF
                  </Badge>
                )}
                <Badge variant="outline">{pkg.category.toUpperCase()}</Badge>
              </div>

              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
                {pkg.name}
              </h1>
              
              <div className="flex items-center gap-4 text-muted-foreground mb-6">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{pkg.destination}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{pkg.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-secondary text-secondary" />
                  <span>{pkg.rating} ({pkg.reviews} reviews)</span>
                </div>
              </div>

              <p className="text-lg text-muted-foreground mb-8">
                {pkg.description}
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2 mb-8">
                {pkg.highlights.map((highlight) => (
                  <span 
                    key={highlight}
                    className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  >
                    {highlight}
                  </span>
                ))}
              </div>

              {/* Tabs */}
              <Tabs defaultValue="itinerary" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                  <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
                  <TabsTrigger value="exclusions">Exclusions</TabsTrigger>
                </TabsList>

                <TabsContent value="itinerary" className="mt-8">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Itinerary header */}
                    <motion.div 
                      className="flex items-center gap-3 mb-8"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="h-1 flex-1 bg-gradient-to-r from-primary/50 to-transparent rounded-full" />
                      <span className="text-sm font-medium text-muted-foreground px-4 py-2 bg-muted rounded-full">
                        Your Journey Awaits
                      </span>
                      <div className="h-1 flex-1 bg-gradient-to-l from-primary/50 to-transparent rounded-full" />
                    </motion.div>

                    {/* Itinerary days */}
                    <div className="relative">
                      {pkg.itinerary.map((day, index) => (
                        <ItineraryDay 
                          key={day.day} 
                          day={day} 
                          index={index} 
                          total={pkg.itinerary.length}
                        />
                      ))}
                    </div>

                    {/* End marker */}
                    <motion.div 
                      className="flex items-center justify-center mt-8"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, type: "spring" }}
                    >
                      <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-full">
                        <span className="text-2xl">🎉</span>
                        <span className="font-medium text-foreground">End of Journey</span>
                        <span className="text-2xl">✨</span>
                      </div>
                    </motion.div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="inclusions" className="mt-6">
                  <AnimatedList items={pkg.inclusions} type="inclusion" />
                </TabsContent>

                <TabsContent value="exclusions" className="mt-6">
                  <AnimatedList items={pkg.exclusions} type="exclusion" />
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="sticky top-24 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-baseline justify-between">
                    <div>
                      <span className="text-3xl font-bold text-primary">
                        ₹{pkg.price.toLocaleString('en-IN')}
                      </span>
                      {pkg.originalPrice && (
                        <span className="ml-2 text-lg text-muted-foreground line-through">
                          ₹{pkg.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground font-normal">
                      per person
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Duration</p>
                        <p className="text-xs text-muted-foreground">{pkg.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Users className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Group Size</p>
                        <p className="text-xs text-muted-foreground">Min 2 persons</p>
                      </div>
                    </div>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      className="w-full py-6 text-lg rounded-xl" 
                      size="lg"
                      onClick={() => navigate(`/book?package=${pkg.id}`)}
                    >
                      Book Now
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      variant="outline" 
                      className="w-full rounded-xl" 
                      size="lg"
                      onClick={() => navigate(`/customize?package=${pkg.id}`)}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call to Customize
                    </Button>
                  </motion.div>

                  <a 
                    href={`https://wa.me/919876543210?text=Hi! I'm interested in ${pkg.name} package.`}
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button variant="secondary" className="w-full rounded-xl" size="lg">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Chat on WhatsApp
                    </Button>
                  </a>

                  <div className="flex items-center gap-2 justify-center text-sm text-muted-foreground pt-4 border-t">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>100% Secure Booking</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PackageDetail;
