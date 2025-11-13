import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const librariesByState: Record<string, string[]> = {
  "Delhi": ["National Library of India", "Delhi Public Library", "Nehru Memorial Library", "American Library"],
  "Maharashtra": ["Asiatic Society Library", "Mumbai University Library", "Pune Central Library", "British Council Library"],
  "Karnataka": ["State Central Library Bangalore", "Bangalore City Central Library", "Mysore Regional Library", "KPSC Library"],
  "Tamil Nadu": ["Connemara Public Library", "Anna Centenary Library", "Madras Literary Society", "Chennai City Library"],
  "West Bengal": ["National Library Kolkata", "Ramakrishna Mission Library", "Calcutta Public Library", "Alipore Public Library"],
  "Kerala": ["State Central Library Trivandrum", "Calicut Public Library", "Kochi Public Library", "Ernakulam District Library"],
  "Gujarat": ["Gujarat Vidyapith Library", "Ahmedabad Public Library", "Baroda Central Library", "Surat City Library"],
  "Rajasthan": ["Rajasthan State Archives", "Jaipur Public Library", "Udaipur City Library", "Jodhpur Public Library"],
  "Uttar Pradesh": ["Lucknow Public Library", "Allahabad Public Library", "Varanasi Library", "Agra Public Library"],
  "Punjab": ["Punjab State Library", "Chandigarh Public Library", "Patiala State Library", "Ludhiana District Library"],
};

const visitTimes = [
  "09:00 AM - 11:00 AM",
  "12:00 PM - 02:00 PM",
  "03:00 PM - 05:00 PM",
  "06:00 PM - 08:00 PM",
];

interface LibraryBookingFormProps {
  onSubmit: (data: any) => void;
  loading: boolean;
}

export const LibraryBookingForm = ({ onSubmit, loading }: LibraryBookingFormProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    bookingDate: "",
    visitTime: "",
    numberOfPeople: "1",
    state: "",
    library: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const selectedStateLibraries = formData.state ? librariesByState[formData.state] || [] : [];

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
          <Label htmlFor="bookingDate">Booking Date *</Label>
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
          <Label htmlFor="numberOfPeople">Number of People *</Label>
          <Input
            id="numberOfPeople"
            name="numberOfPeople"
            type="number"
            min="1"
            max="10"
            value={formData.numberOfPeople}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State *</Label>
          <Select
            value={formData.state}
            onValueChange={(value) => setFormData({ ...formData, state: value, library: "" })}
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
          <Label htmlFor="library">Library *</Label>
          <Select
            value={formData.library}
            onValueChange={(value) => setFormData({ ...formData, library: value })}
            required
            disabled={!formData.state || selectedStateLibraries.length === 0}
          >
            <SelectTrigger>
              <SelectValue placeholder={formData.state ? "Select Library" : "Select State First"} />
            </SelectTrigger>
            <SelectContent>
              {selectedStateLibraries.map((library) => (
                <SelectItem key={library} value={library}>
                  {library}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
