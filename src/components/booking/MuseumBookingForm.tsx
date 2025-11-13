import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const museumsByState: Record<string, string[]> = {
  "Delhi": ["National Museum", "National Gallery of Modern Art", "Red Fort Archaeological Museum", "Gandhi Smriti Museum"],
  "Maharashtra": ["Chhatrapati Shivaji Museum", "Dr. Bhau Daji Lad Museum", "Raja Dinkar Kelkar Museum", "Salar Jung Museum"],
  "Karnataka": ["Government Museum Bangalore", "Visvesvaraya Industrial Museum", "National Gallery of Modern Art Bangalore", "HAL Aerospace Museum"],
  "Tamil Nadu": ["Government Museum Chennai", "National Art Gallery", "Fort Museum", "DakshinaChitra Museum"],
  "West Bengal": ["Indian Museum Kolkata", "Victoria Memorial", "Marble Palace", "Asutosh Museum"],
  "Kerala": ["Napier Museum", "Kerala Folklore Museum", "Hill Palace Museum", "Indo-Portuguese Museum"],
  "Gujarat": ["Calico Museum of Textiles", "Sardar Vallabhbhai Patel Museum", "Baroda Museum", "Kutch Museum"],
  "Rajasthan": ["City Palace Museum Jaipur", "Albert Hall Museum", "Government Museum Bharatpur", "Umaid Bhawan Palace Museum"],
  "Uttar Pradesh": ["State Museum Lucknow", "Allahabad Museum", "Sarnath Museum", "Mathura Museum"],
  "Punjab": ["Punjab State War Heroes Museum", "Partition Museum", "Government Museum Chandigarh", "Maharaja Ranjit Singh Museum"],
};

const visitTimes = [
  "10:00 AM - 12:00 PM",
  "12:00 PM - 02:00 PM",
  "02:00 PM - 04:00 PM",
  "04:00 PM - 06:00 PM",
];

const ticketTypes = ["Adult", "Child (5-12 years)", "Senior Citizen", "Student", "Group (10+)"];

interface MuseumBookingFormProps {
  onSubmit: (data: any) => void;
  loading: boolean;
}

export const MuseumBookingForm = ({ onSubmit, loading }: MuseumBookingFormProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    bookingDate: "",
    visitTime: "",
    state: "",
    museumName: "",
    ticketType: "",
    numberOfTickets: "1",
    specialNeeds: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const selectedStateMuseums = formData.state ? museumsByState[formData.state] || [] : [];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State *</Label>
          <Select
            value={formData.state}
            onValueChange={(value) => setFormData({ ...formData, state: value })}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              {indianStates.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="museumName">Museum Name *</Label>
          <Select
            value={formData.museumName}
            onValueChange={(value) => setFormData({ ...formData, museumName: value })}
            required
            disabled={!formData.state || selectedStateMuseums.length === 0}
          >
            <SelectTrigger>
              <SelectValue placeholder={formData.state ? "Select Museum" : "Select State First"} />
            </SelectTrigger>
            <SelectContent>
              {selectedStateMuseums.map((museum) => (
                <SelectItem key={museum} value={museum}>
                  {museum}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bookingDate">Visit Date *</Label>
          <Input
            id="bookingDate"
            name="bookingDate"
            type="date"
            min={new Date().toISOString().split('T')[0]}
            value={formData.bookingDate}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="visitTime">Visit Time *</Label>
          <Select
            value={formData.visitTime}
            onValueChange={(value) => setFormData({ ...formData, visitTime: value })}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Visit Time" />
            </SelectTrigger>
            <SelectContent>
              {visitTimes.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ticketType">Ticket Type *</Label>
          <Select
            value={formData.ticketType}
            onValueChange={(value) => setFormData({ ...formData, ticketType: value })}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Ticket Type" />
            </SelectTrigger>
            <SelectContent>
              {ticketTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="numberOfTickets">Number of Tickets *</Label>
          <Input
            id="numberOfTickets"
            name="numberOfTickets"
            type="number"
            min="1"
            max="50"
            value={formData.numberOfTickets}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="specialNeeds">Special Accessibility Needs (Optional)</Label>
        <Textarea
          id="specialNeeds"
          name="specialNeeds"
          placeholder="E.g., wheelchair access, audio guide needed"
          value={formData.specialNeeds}
          onChange={handleInputChange}
          rows={3}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-primary hover:opacity-90"
        disabled={loading}
      >
        {loading ? "Processing..." : "Complete Booking"}
      </Button>
    </form>
  );
};
