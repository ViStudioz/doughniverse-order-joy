import { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";
import { toast } from "@/hooks/use-toast";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    address: "",
    preferredTime: "",
    paymentMode: "",
  });

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart.",
    });
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before placing an order.",
        variant: "destructive",
      });
      return;
    }

    if (!customerDetails.name || !customerDetails.address) {
      toast({
        title: "Missing details",
        description: "Please fill in your name and address.",
        variant: "destructive",
      });
      return;
    }

    // Generate WhatsApp message
    let orderText = "Hi Doughniverse, I'd like to place an order:\n\n";
    
    cartItems.forEach((item) => {
      orderText += `${item.quantity}x ${item.name} - ₹${item.price * item.quantity}\n`;
    });
    
    orderText += `\nTotal: ₹${getCartTotal()}\n\n`;
    orderText += `Name: ${customerDetails.name}\n`;
    orderText += `Address: ${customerDetails.address}\n`;
    
    if (customerDetails.preferredTime) {
      orderText += `Preferred Time: ${customerDetails.preferredTime}\n`;
    }
    
    if (customerDetails.paymentMode) {
      orderText += `Payment Mode: ${customerDetails.paymentMode}\n`;
    }
    
    orderText += "\nPlease confirm availability.";

    const phoneNumber = "+919876543210";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(orderText)}`;
    
    window.open(whatsappUrl, "_blank");
    
    // Clear cart and form after successful order
    clearCart();
    setCustomerDetails({
      name: "",
      address: "",
      preferredTime: "",
      paymentMode: "",
    });

    toast({
      title: "Order placed!",
      description: "Your order has been sent via WhatsApp. We'll confirm availability shortly.",
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-8">Your Cart</h1>
          <div className="max-w-md mx-auto">
            <p className="text-muted-foreground text-lg mb-8">
              Your cart is empty. Start browsing our delicious treats!
            </p>
            <Button size="lg" onClick={() => window.location.href = "/menu"}>
              Browse Menu
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-8 text-center">
          Your Cart
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Cart Items */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg shadow-sm"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <p className="text-primary font-bold">₹{item.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="h-8 w-8"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="h-8 w-8"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveItem(item.id)}
                      className="h-8 w-8 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-primary text-xl">₹{getCartTotal()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Details Form */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Delivery Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={customerDetails.name}
                  onChange={(e) =>
                    setCustomerDetails({ ...customerDetails, name: e.target.value })
                  }
                  className="mt-1 bg-background"
                />
              </div>

              <div>
                <Label htmlFor="address">Address *</Label>
                <Textarea
                  id="address"
                  placeholder="Enter your full address"
                  value={customerDetails.address}
                  onChange={(e) =>
                    setCustomerDetails({ ...customerDetails, address: e.target.value })
                  }
                  className="mt-1 bg-background"
                />
              </div>

              <div>
                <Label htmlFor="preferred-time">Preferred Delivery Time</Label>
                <Select
                  value={customerDetails.preferredTime}
                  onValueChange={(value) =>
                    setCustomerDetails({ ...customerDetails, preferredTime: value })
                  }
                >
                  <SelectTrigger className="mt-1 bg-background">
                    <SelectValue placeholder="Select preferred time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10am-12pm">10 AM - 12 PM</SelectItem>
                    <SelectItem value="12pm-2pm">12 PM - 2 PM</SelectItem>
                    <SelectItem value="2pm-4pm">2 PM - 4 PM</SelectItem>
                    <SelectItem value="4pm-6pm">4 PM - 6 PM</SelectItem>
                    <SelectItem value="6pm-8pm">6 PM - 8 PM</SelectItem>
                    <SelectItem value="8pm-10pm">8 PM - 10 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="payment-mode">Payment Mode</Label>
                <Select
                  value={customerDetails.paymentMode}
                  onValueChange={(value) =>
                    setCustomerDetails({ ...customerDetails, paymentMode: value })
                  }
                >
                  <SelectTrigger className="mt-1 bg-background">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cash on Delivery">Cash on Delivery</SelectItem>
                    <SelectItem value="UPI">UPI</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handlePlaceOrder}
                variant="doughnut"
                size="xl"
                className="w-full mt-6"
              >
                Place Order on WhatsApp
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;