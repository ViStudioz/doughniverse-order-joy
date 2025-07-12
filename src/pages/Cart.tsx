import { useState } from "react";
import { useCartContext } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import { useOrderPlacement } from "@/hooks/useOrderPlacement";
import EmptyCart from "@/components/cart/EmptyCart";
import OrderSummary from "@/components/cart/OrderSummary";
import CustomerDetailsForm from "@/components/cart/CustomerDetailsForm";

interface CustomerDetails {
  name: string;
  address: string;
  preferredTime: string;
  paymentMode: string;
}

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCartContext();
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: "",
    address: "",
    preferredTime: "",
    paymentMode: "",
  });

  const resetCustomerDetails = () => {
    setCustomerDetails({
      name: "",
      address: "",
      preferredTime: "",
      paymentMode: "",
    });
  };

  const { placeOrder } = useOrderPlacement({
    cartItems,
    cartTotal: getCartTotal(),
    customerDetails,
    clearCart,
    resetCustomerDetails,
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

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-8 text-center">
          Your Cart
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">
          <OrderSummary
            cartItems={cartItems}
            cartTotal={getCartTotal()}
            onQuantityChange={handleQuantityChange}
            onRemoveItem={handleRemoveItem}
          />

          <CustomerDetailsForm
            customerDetails={customerDetails}
            onDetailsChange={setCustomerDetails}
            onPlaceOrder={placeOrder}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;