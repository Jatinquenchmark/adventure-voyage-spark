import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Star, 
  Clock, 
  MapPin, 
  Check, 
  X, 
  Calendar,
  Users,
  Shield,
  Phone
} from 'lucide-react';
import { getPackageById } from '@/data/packages';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PackageDetail = () => {
  const { id } = useParams<{ id: string }>();
  const pkg = getPackageById(id || '');

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

                <TabsContent value="itinerary" className="mt-6">
                  <div className="space-y-4">
                    {pkg.itinerary.map((day, index) => (
                      <motion.div
                        key={day.day}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative pl-8 pb-6 border-l-2 border-primary/20 last:border-l-0"
                      >
                        <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-primary" />
                        <div className="bg-muted/50 rounded-lg p-4">
                          <h4 className="font-semibold text-foreground mb-1">
                            Day {day.day}: {day.title}
                          </h4>
                          <p className="text-muted-foreground text-sm">
                            {day.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="inclusions" className="mt-6">
                  <ul className="space-y-3">
                    {pkg.inclusions.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-travel-forest mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="exclusions" className="mt-6">
                  <ul className="space-y-3">
                    {pkg.exclusions.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <X className="h-5 w-5 text-destructive mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
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

                  <Button className="w-full py-6 text-lg rounded-xl" size="lg">
                    Book Now
                  </Button>

                  <Button variant="outline" className="w-full rounded-xl" size="lg">
                    <Phone className="h-4 w-4 mr-2" />
                    Call to Customize
                  </Button>

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
