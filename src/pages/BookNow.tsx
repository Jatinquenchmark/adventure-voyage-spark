import { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  CreditCard, 
  Shield, 
  Check,
  User,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { getPackageById } from '@/data/packages';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const BookNow = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const packageId = searchParams.get('package');
  const pkg = packageId ? getPackageById(packageId) : null;
  
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    travelDate: '',
    travelers: '2',
    specialRequests: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Booking Confirmed! 🎉",
      description: "Check your email for booking details.",
    });
    
    setIsSubmitting(false);
    navigate('/');
  };

  const travelers = parseInt(formData.travelers) || 2;
  const totalPrice = pkg ? pkg.price * travelers : 0;
  const discount = pkg?.originalPrice ? (pkg.originalPrice - pkg.price) * travelers : 0;

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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
              Complete Your Booking
            </h1>
            <p className="text-muted-foreground">
              You're just a few steps away from your dream vacation
            </p>
          </motion.div>

          {/* Progress Steps */}
          <div className="max-w-3xl mx-auto mb-10">
            <div className="flex justify-between relative">
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted">
                <motion.div 
                  className="h-full bg-primary"
                  initial={{ width: '0%' }}
                  animate={{ width: `${(step - 1) * 50}%` }}
                />
              </div>
              {['Traveler Details', 'Travel Info', 'Confirmation'].map((label, index) => (
                <div key={label} className="relative z-10 flex flex-col items-center">
                  <motion.div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step > index + 1 ? 'bg-primary text-primary-foreground' :
                      step === index + 1 ? 'bg-primary text-primary-foreground' :
                      'bg-muted text-muted-foreground'
                    }`}
                    animate={{ scale: step === index + 1 ? 1.1 : 1 }}
                  >
                    {step > index + 1 ? <Check className="h-5 w-5" /> : index + 1}
                  </motion.div>
                  <span className="text-xs mt-2 text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit}>
                    {step === 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                      >
                        <h3 className="font-display text-xl font-semibold mb-4">
                          Traveler Information
                        </h3>
                        
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="firstName"
                                placeholder="John"
                                value={formData.firstName}
                                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                className="pl-10"
                                required
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                              id="lastName"
                              placeholder="Doe"
                              value={formData.lastName}
                              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="email"
                              type="email"
                              placeholder="john@example.com"
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="+91 98765 43210"
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="address"
                                placeholder="Street address"
                                value={formData.address}
                                onChange={(e) => setFormData({...formData, address: e.target.value})}
                                className="pl-10"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              placeholder="City"
                              value={formData.city}
                              onChange={(e) => setFormData({...formData, city: e.target.value})}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                      >
                        <h3 className="font-display text-xl font-semibold mb-4">
                          Travel Details
                        </h3>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="travelDate">Preferred Travel Date</Label>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="travelDate"
                                type="date"
                                value={formData.travelDate}
                                onChange={(e) => setFormData({...formData, travelDate: e.target.value})}
                                className="pl-10"
                                required
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="travelers">Number of Travelers</Label>
                            <div className="relative">
                              <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="travelers"
                                type="number"
                                min="1"
                                max="20"
                                value={formData.travelers}
                                onChange={(e) => setFormData({...formData, travelers: e.target.value})}
                                className="pl-10"
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                          <textarea
                            id="specialRequests"
                            placeholder="Any special requirements, dietary restrictions, room preferences..."
                            value={formData.specialRequests}
                            onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                            rows={4}
                            className="w-full px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                      >
                        <h3 className="font-display text-xl font-semibold mb-4">
                          Review & Confirm
                        </h3>

                        <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Name</span>
                            <span className="font-medium">{formData.firstName} {formData.lastName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Email</span>
                            <span className="font-medium">{formData.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Phone</span>
                            <span className="font-medium">{formData.phone}</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Travel Date</span>
                            <span className="font-medium">{formData.travelDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Travelers</span>
                            <span className="font-medium">{formData.travelers} person(s)</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-950 rounded-lg text-green-700 dark:text-green-300">
                          <Shield className="h-5 w-5" />
                          <span className="text-sm">Your payment is secured with 256-bit SSL encryption</span>
                        </div>
                      </motion.div>
                    )}

                    <div className="flex justify-between mt-8">
                      {step > 1 && (
                        <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                          Previous
                        </Button>
                      )}
                      <Button 
                        type="submit" 
                        className={step === 1 ? 'w-full' : 'ml-auto'}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Processing...' : step === 3 ? 'Confirm Booking' : 'Continue'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Price Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pkg && (
                    <>
                      <div className="flex gap-3">
                        <img 
                          src={pkg.image} 
                          alt={pkg.name}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div>
                          <h4 className="font-semibold">{pkg.name}</h4>
                          <p className="text-sm text-muted-foreground">{pkg.duration}</p>
                          <p className="text-sm text-muted-foreground">{pkg.destination}</p>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>₹{pkg.price.toLocaleString('en-IN')} × {travelers} travelers</span>
                          <span>₹{(pkg.price * travelers).toLocaleString('en-IN')}</span>
                        </div>
                        {discount > 0 && (
                          <div className="flex justify-between text-green-600">
                            <span>Discount</span>
                            <span>-₹{discount.toLocaleString('en-IN')}</span>
                          </div>
                        )}
                      </div>

                      <Separator />

                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span className="text-primary">₹{totalPrice.toLocaleString('en-IN')}</span>
                      </div>

                      <p className="text-xs text-muted-foreground text-center">
                        Taxes and fees included
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookNow;
