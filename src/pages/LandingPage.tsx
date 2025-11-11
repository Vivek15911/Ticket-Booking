import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Zap, Lock, CheckCircle, BookOpen, Trophy, Building2, Trees, Drama, Home } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Bank-Level Security",
    description: "Your data is protected with enterprise-grade encryption and secure authentication",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Book your tickets in under 60 seconds with our optimized booking flow",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "We never share your personal information. Your privacy is our priority",
  },
  {
    icon: CheckCircle,
    title: "Instant Confirmation",
    description: "Get your tickets immediately with unique QR codes and ticket numbers",
  },
];

const bookingTypes = [
  { icon: BookOpen, title: "Library", color: "bg-blue-500" },
  { icon: Trophy, title: "Sports", color: "bg-green-500" },
  { icon: Building2, title: "Museum", color: "bg-purple-500" },
  { icon: Trees, title: "Park", color: "bg-emerald-500" },
  { icon: Drama, title: "Theater", color: "bg-red-500" },
  { icon: Home, title: "Room", color: "bg-orange-500" },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="border-b bg-card shadow-soft sticky top-0 z-50 backdrop-blur-sm bg-card/80">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-primary p-2 rounded-lg">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              SecureBook
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/auth">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="sm" className="bg-gradient-primary hover:opacity-90">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-full text-sm font-medium mb-4">
            <Shield className="h-4 w-4 text-primary" />
            <span>Trusted by thousands across India</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Book Tickets
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Securely & Instantly
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            India&apos;s most secure and fastest ticket booking platform. Book for libraries, 
            sports facilities, museums, parks, theaters, and rooms in under 60 seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-lg px-8 h-12">
                Start Booking Now
              </Button>
            </Link>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="h-5 w-5 text-secondary" />
              <span>No credit card required</span>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-primary" />
              <span>256-bit Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span>Secure Authentication</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <span>Instant Tickets</span>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Types */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Book Any Type of Ticket
          </h2>
          <p className="text-lg text-muted-foreground">
            Six different categories to meet all your booking needs
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {bookingTypes.map((type) => (
            <Card key={type.title} className="group hover:shadow-medium transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className={`${type.color} p-3 rounded-xl inline-flex mb-3 group-hover:scale-110 transition-transform`}>
                  <type.icon className="h-6 w-6 text-white" />
                </div>
                <p className="font-medium">{type.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose SecureBook?
          </h2>
          <p className="text-lg text-muted-foreground">
            Built with security and speed as our top priorities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature) => (
            <Card key={feature.title} className="shadow-soft hover:shadow-medium transition-shadow">
              <CardContent className="p-6 space-y-3">
                <div className="bg-gradient-primary p-3 rounded-xl inline-flex">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-primary text-primary-foreground shadow-strong max-w-4xl mx-auto">
          <CardContent className="p-12 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Book Your Ticket?
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Join thousands of satisfied users who trust SecureBook for their ticket bookings. 
              Get started in seconds with our simple and secure platform.
            </p>
            <Link to="/auth">
              <Button 
                size="lg" 
                variant="secondary"
                className="text-lg px-8 h-12 bg-background text-foreground hover:bg-background/90"
              >
                Create Free Account
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 SecureBook. All rights reserved. Your trusted ticket booking platform.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
