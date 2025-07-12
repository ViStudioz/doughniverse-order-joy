import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CustomerDetails {
  name: string;
  address: string;
  preferredTime: string;
  paymentMode: string;
}

interface CustomerDetailsFormProps {
  customerDetails: CustomerDetails;
  onDetailsChange: (details: CustomerDetails) => void;
  onPlaceOrder: () => void;
}

const CustomerDetailsForm = ({ 
  customerDetails, 
  onDetailsChange, 
  onPlaceOrder 
}: CustomerDetailsFormProps) => {
  const handleInputChange = (field: keyof CustomerDetails, value: string) => {
    onDetailsChange({ ...customerDetails, [field]: value });
  };

  return (
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
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="mt-1 bg-background"
          />
        </div>

        <div>
          <Label htmlFor="address">Address *</Label>
          <Textarea
            id="address"
            placeholder="Enter your full address"
            value={customerDetails.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            className="mt-1 bg-background"
          />
        </div>

        <div>
          <Label htmlFor="preferred-time">Preferred Delivery Time</Label>
          <Select
            value={customerDetails.preferredTime}
            onValueChange={(value) => handleInputChange('preferredTime', value)}
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
            onValueChange={(value) => handleInputChange('paymentMode', value)}
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
          onClick={onPlaceOrder}
          variant="doughnut"
          size="xl"
          className="w-full mt-6"
        >
          Place Order on WhatsApp
        </Button>
      </CardContent>
    </Card>
  );
};

export default CustomerDetailsForm;