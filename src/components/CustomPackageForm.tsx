import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Wallet, 
  Send, 
  Phone,
  Mail,
  User,
  MessageSquare,
  Plane,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const destinations = [
  'Goa', 'Maldives', 'Thailand', 'Dubai', 'Kashmir', 'Ladakh', 
  'Singapore', 'Kerala', 'Paris', 'Switzerland', 'Bali', 'London',
  'Italy', 'Turkey', 'Iceland', 'Other'
];

const budgetRanges = [
  'Under ₹25,000',
  '₹25,000 - ₹50,000',
  '₹50,000 - ₹1,00,000',
  '₹1,00,000 - ₹2,00,000',
  'Above ₹2,00,000',
];

export const CustomPackageForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    travelDate: '',
    travelers: '',
    budget: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Request Submitted! 🎉",
      description: "Our travel expert will contact you within 24 hours.",
    });

    setIsSubmitting(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      destination: '',
      travelDate: '',
      travelers: '',
      budget: '',
      message: '',
    });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary mb-4">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Design Your Dream Trip</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Create Your Custom Package
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Can't find what you're looking for? Let us craft the perfect travel experience tailored just for you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="shadow-2xl border-0 overflow-hidden">
            <div className="grid md:grid-cols-5">
              {/* Left decorative panel */}
              <div className="md:col-span-2 bg-gradient-to-br from-primary to-accent p-8 text-white hidden md:flex flex-col justify-between">
                <div>
                  <Plane className="h-12 w-12 mb-6" />
                  <h3 className="font-display text-2xl font-bold mb-4">
                    Let's Plan Together
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Share your travel dreams with us and our experts will create a personalized itinerary that exceeds your expectations.
                  </p>
                </div>
                
                <div className="space-y-4 mt-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-white/60">Call Us</p>
                      <p className="font-medium">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-white/60">Email</p>
                      <p className="font-medium">hello@tripsoul.org</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <CardContent className="md:col-span-3 p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <User className="h-4 w-4 text-primary" />
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                        className="h-11"
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
                        className="h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      className="h-11"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        Destination
                      </Label>
                      <Select 
                        value={formData.destination} 
                        onValueChange={(value) => setFormData({...formData, destination: value})}
                      >
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Choose destination" />
                        </SelectTrigger>
                        <SelectContent>
                          {destinations.map((dest) => (
                            <SelectItem key={dest} value={dest.toLowerCase()}>
                              {dest}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="travelDate" className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        Travel Date
                      </Label>
                      <Input
                        id="travelDate"
                        type="date"
                        value={formData.travelDate}
                        onChange={(e) => setFormData({...formData, travelDate: e.target.value})}
                        required
                        className="h-11"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="travelers" className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        Number of Travelers
                      </Label>
                      <Input
                        id="travelers"
                        type="number"
                        min="1"
                        placeholder="2"
                        value={formData.travelers}
                        onChange={(e) => setFormData({...formData, travelers: e.target.value})}
                        required
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Wallet className="h-4 w-4 text-primary" />
                        Budget Range
                      </Label>
                      <Select 
                        value={formData.budget} 
                        onValueChange={(value) => setFormData({...formData, budget: value})}
                      >
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select budget" />
                        </SelectTrigger>
                        <SelectContent>
                          {budgetRanges.map((range) => (
                            <SelectItem key={range} value={range}>
                              {range}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-primary" />
                      Special Requirements
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your travel preferences, special occasions, dietary requirements, etc."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows={4}
                      className="resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full py-6 text-lg rounded-xl"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Send className="h-5 w-5" />
                      </motion.div>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Get Free Quote
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
