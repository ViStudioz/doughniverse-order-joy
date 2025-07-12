import { Button } from "@/components/ui/button";

const EmptyCart = () => {
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
};

export default EmptyCart;