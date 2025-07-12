import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CartItem as CartItemType } from "@/contexts/CartContext";
import CartItem from "./CartItem";

interface OrderSummaryProps {
  cartItems: CartItemType[];
  cartTotal: number;
  onQuantityChange: (productId: string, newQuantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

const OrderSummary = ({ 
  cartItems, 
  cartTotal, 
  onQuantityChange, 
  onRemoveItem 
}: OrderSummaryProps) => {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onQuantityChange={onQuantityChange}
            onRemove={onRemoveItem}
          />
        ))}
        
        <div className="border-t pt-4">
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total:</span>
            <span className="text-primary text-xl">₹{cartTotal}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;