import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Phone, 
  MessageCircle, 
  Clock, 
  Calendar,
  User,
  Mail,
  CheckCircle,
  Star
} from 'lucide-react';
import { getPackageById } from '@/data/packages';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    text: "The team helped me plan the perfect honeymoon to Maldives. Every detail was taken care of!",
    rating: 5
  },
  {
    name: "Rahul Verma",
    location: "Delhi",
    text: "Excellent customization for our family trip. They understood exactly what we needed.",
    rating: 5
  },
  {
    name: "Anita Patel",
    location: "Bangalore",
    text: "Very responsive team. Got my dream Europe trip at an amazing price!",
    rating: 5
  }
];

const CallToCustomize = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const packageId = searchParams.get('package');
  const pkg = packageId ? getPackageById(packageId) : null;
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredTime: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Request Received! 📞",
      description: "Our travel expert will call you shortly.",
    });
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto text-center py-20"
            >
              <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="font-display text-2xl font-bold mb-4">Callback Scheduled!</h2>
              <p className="text-muted-foreground mb-6">
                Our travel expert will call you within 30 minutes during business hours (9 AM - 9 PM IST).
              </p>
              <Link to="/">
                <Button>Back to Home</Button>
              </Link>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Link to={pkg ? `/package/${pkg.id}` : '/'}>
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Left - Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Let's Customize Your Trip
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                Our travel experts will help you create the perfect itinerary. 
                Request a callback and we'll get in touch within 30 minutes.
              </p>

              {pkg && (
                <Card className="mb-8 bg-gradient-to-br from-primary/5 to-accent/5">
                  <CardContent className="p-4 flex gap-4">
                    <img 
                      src={pkg.image} 
                      alt={pkg.name}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{pkg.name}</h3>
                      <p className="text-sm text-muted-foreground">{pkg.destination}</p>
                      <p className="text-sm text-muted-foreground">{pkg.duration}</p>
                      <p className="text-primary font-semibold mt-1">
                        Starting ₹{pkg.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Contact Options */}
              <div className="space-y-4 mb-8">
                <a href="tel:+919876543210" className="flex items-center gap-4 p-4 bg-muted rounded-xl hover:bg-muted/80 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Call Now</p>
                    <p className="text-muted-foreground">+91 98765 43210</p>
                  </div>
                </a>

                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-green-50 dark:bg-green-950 rounded-xl hover:bg-green-100 dark:hover:bg-green-900 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">WhatsApp</p>
                    <p className="text-muted-foreground">Chat with us instantly</p>
                  </div>
                </a>
              </div>

              {/* Testimonials */}
              <div>
                <h3 className="font-semibold mb-4">What Our Customers Say</h3>
                <div className="space-y-4">
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={testimonial.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-muted/50 rounded-lg"
                    >
                      <div className="flex gap-1 mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                        ))}
                      </div>
                      <p className="text-sm mb-2">"{testimonial.text}"</p>
                      <p className="text-xs text-muted-foreground">
                        — {testimonial.name}, {testimonial.location}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right - Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary" />
                    Request a Callback
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <User className="h-4 w-4 text-primary" />
                        Your Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-primary" />
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-primary" />
                        Email (Optional)
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="preferredTime" className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        Preferred Call Time
                      </Label>
                      <Input
                        id="preferredTime"
                        type="time"
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({...formData, preferredTime: e.target.value})}
                      />
                      <p className="text-xs text-muted-foreground">
                        Our working hours: 9 AM - 9 PM IST
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">
                        Tell us about your trip
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Destination, dates, number of travelers, any specific requirements..."
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        rows={4}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full py-6 text-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <Phone className="h-5 w-5 mr-2" />
                          Request Callback
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      By submitting, you agree to our privacy policy
                    </p>
                  </form>
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

export default CallToCustomize;
