import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Instagram, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import doughniverseLogoImg from "@/assets/doughniverse-logo.jpg";
import nutellaBomboloniImg from "@/assets/nutella-bomboloni.jpg";
import redVelvetCheesecakeImg from "@/assets/red-velvet-cheesecake.jpg";
import chocolateTubcakeImg from "@/assets/chocolate-tubcake.jpg";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const bestsellers = [
    {
      id: 1,
      name: "Nutella Bomboloni",
      image: nutellaBomboloniImg,
    },
    {
      id: 2,
      name: "Red Velvet Cheesecake",
      image: redVelvetCheesecakeImg,
    },
    {
      id: 3,
      name: "Chocolate Tubcake",
      image: chocolateTubcakeImg,
    },
  ];

  const testimonials = [
    {
      id: 1,
      text: "Best bombolonis ever! Absolutely delicious and eggless too!",
      author: "Priya",
    },
    {
      id: 2,
      text: "Love the tubcakes! Perfect size and amazing taste.",
      author: "Rohan",
    },
    {
      id: 3,
      text: "The cheesecakes are heavenly. My family's new favorite!",
      author: "Sneha",
    },
  ];

  // Auto-cycle slider every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bestsellers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [bestsellers.length]);

  const handleWhatsAppOrder = () => {
    const phoneNumber = "+919876543210";
    const message = encodeURIComponent(
      "Hi Doughniverse! I'd like to place an order. Please share your menu and confirm availability."
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <img
              src={doughniverseLogoImg}
              alt="Doughniverse Logo"
              className="w-32 h-32 mx-auto rounded-full shadow-card mb-6"
            />
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
              Doughniverse
            </h1>
            <p className="text-xl md:text-2xl font-semibold text-accent-foreground mb-8">
              Eggless. Exclusive. Epic.
            </p>
            <Button
              onClick={handleWhatsAppOrder}
              variant="doughnut"
              size="xl"
              className="animate-pulse hover:animate-none"
            >
              Order Now on WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* Bestsellers Slider */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Our Bestsellers
          </h2>
          
          <div className="relative max-w-md mx-auto">
            <div className="overflow-hidden rounded-lg shadow-card">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {bestsellers.map((item) => (
                  <div key={item.id} className="w-full flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4 bg-card text-center">
                      <h3 className="font-semibold text-lg text-foreground">
                        {item.name}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slider Dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {bestsellers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-smooth ${
                    currentSlide === index ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <Link to="/menu">
              <Button variant="cart" size="lg">
                View Full Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-muted">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            What Our Customers Say
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="shadow-card">
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <p className="font-semibold text-primary">
                    - {testimonial.author}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href="https://instagram.com/doughniverse"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary hover:text-primary-hover transition-smooth"
            >
              <Instagram className="w-5 h-5 mr-2" />
              Follow us @doughniverse
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex justify-center items-center space-x-6 mb-4">
            <a
              href="tel:+919876543210"
              className="flex items-center text-foreground hover:text-primary transition-smooth"
            >
              <Phone className="w-4 h-4 mr-2" />
              +91 9876543210
            </a>
            <a
              href="https://instagram.com/doughniverse"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-foreground hover:text-primary transition-smooth"
            >
              <Instagram className="w-4 h-4 mr-2" />
              Instagram
            </a>
          </div>
          <p className="text-muted-foreground text-sm">
            © 2025 Doughniverse. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;