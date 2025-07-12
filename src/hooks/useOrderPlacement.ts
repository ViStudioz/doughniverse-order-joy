import { useCallback } from "react";
import { CartItem } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";

interface CustomerDetails {
  name: string;
  address: string;
  preferredTime: string;
  paymentMode: string;
}

interface UseOrderPlacementProps {
  cartItems: CartItem[];
  cartTotal: number;
  customerDetails: CustomerDetails;
  clearCart: () => void;
  resetCustomerDetails: () => void;
}

export const useOrderPlacement = ({
  cartItems,
  cartTotal,
  customerDetails,
  clearCart,
  resetCustomerDetails,
}: UseOrderPlacementProps) => {
  const placeOrder = useCallback(() => {
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
    
    orderText += `\nTotal: ₹${cartTotal}\n\n`;
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
    resetCustomerDetails();

    toast({
      title: "Order placed!",
      description: "Your order has been sent via WhatsApp. We'll confirm availability shortly.",
    });
  }, [cartItems, cartTotal, customerDetails, clearCart, resetCustomerDetails]);

  return { placeOrder };
};