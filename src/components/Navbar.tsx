import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartContext } from "@/contexts/CartContext";

const Navbar = () => {
  const location = useLocation();
  const { getCartItemCount } = useCartContext();
  const cartItemCount = getCartItemCount();

  return (
    <nav className="sticky top-0 z-50 gradient-primary border-b border-border/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
              <span className="text-primary font-bold text-lg">D</span>
            </div>
            <span className="font-bold text-lg text-primary-foreground">
              Doughniverse
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`font-medium transition-smooth hover:text-accent-foreground ${
                location.pathname === "/" 
                  ? "text-accent-foreground" 
                  : "text-primary-foreground/80"
              }`}
            >
              Home
            </Link>
            <Link
              to="/menu"
              className={`font-medium transition-smooth hover:text-accent-foreground ${
                location.pathname === "/menu" 
                  ? "text-accent-foreground" 
                  : "text-primary-foreground/80"
              }`}
            >
              Menu
            </Link>
          </div>

          {/* Cart Icon */}
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;