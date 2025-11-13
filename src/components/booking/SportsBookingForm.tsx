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

const sportsFacilitiesByState: Record<string, string[]> = {
  "Delhi": ["Jawaharlal Nehru Stadium", "Thyagaraj Sports Complex", "Siri Fort Sports Complex", "Dr. SPM Swimming Pool Complex"],
  "Maharashtra": ["DY Patil Stadium", "Andheri Sports Complex", "Shivaji Park", "Balewadi Sports Complex"],
  "Karnataka": ["Sree Kanteerava Stadium", "Bangalore Football Stadium", "KPSC Sports Complex", "Cubbon Park Sports Arena"],
  "Tamil Nadu": ["MA Chidambaram Stadium", "Nehru Stadium Chennai", "YMCA Sports Complex", "Anna Stadium"],
  "West Bengal": ["Eden Gardens", "Salt Lake Stadium", "Netaji Indoor Stadium", "Rabindra Sarobar Complex"],
  "Kerala": ["Jawaharlal Nehru Stadium Kochi", "Greenfield Stadium", "Jimmy George Indoor Stadium", "Calicut Sports Hub"],
  "Gujarat": ["Narendra Modi Stadium", "Sardar Patel Stadium", "Ahmedabad Sports Club", "Trans Stadia Complex"],
  "Rajasthan": ["Sawai Mansingh Stadium", "SMS Stadium Indoor Complex", "Jaipur Sports Academy", "Udaipur Sports Center"],
  "Uttar Pradesh": ["Green Park Stadium", "Buddha International Circuit", "Lucknow Sports Complex", "Agra Sports Hub"],
  "Punjab": ["PCA Stadium", "Guru Nanak Stadium", "Ludhiana Sports Complex", "Amritsar Sports Academy"],
};

const sportTypes = [
  "Cricket", "Football", "Badminton", "Tennis", "Basketball", 
  "Swimming", "Table Tennis", "Squash", "Volleyball", "Hockey"
];

const visitTimes = [
  "06:00 AM - 08:00 AM",
  "10:00 AM - 12:00 PM",
  "02:00 PM - 04:00 PM",
  "06:00 PM - 08:00 PM",
];

const durations = [
  "1 Hour",
  "2 Hours",
  "3 Hours",
  "4 Hours",
];

interface SportsBookingFormProps {
  onSubmit: (data: any) => void;
  loading: boolean;
}

export const SportsBookingForm = ({ onSubmit, loading }: SportsBookingFormProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    bookingDate: "",
    state: "",
    facilityName: "",
    sportType: "",
    visitTime: "",
    duration: "",
    numberOfPlayers: "1",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const selectedStateFacilities = formData.state ? sportsFacilitiesByState[formData.state] || [] : [];

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
            onValueChange={(value) => setFormData({ ...formData, state: value, facilityName: "" })}
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
          <Label htmlFor="facilityName">Facility Name *</Label>
          <Select
            value={formData.facilityName}
            onValueChange={(value) => setFormData({ ...formData, facilityName: value })}
            required
            disabled={!formData.state || selectedStateFacilities.length === 0}
          >
            <SelectTrigger>
              <SelectValue placeholder={formData.state ? "Select Facility" : "Select State First"} />
            </SelectTrigger>
            <SelectContent>
              {selectedStateFacilities.map((facility) => (
                <SelectItem key={facility} value={facility}>
                  {facility}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sportType">Sport Type *</Label>
          <Select
            value={formData.sportType}
            onValueChange={(value) => setFormData({ ...formData, sportType: value })}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Sport" />
            </SelectTrigger>
            <SelectContent>
              {sportTypes.map((sport) => (
                <SelectItem key={sport} value={sport}>
                  {sport}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
          <Label htmlFor="duration">Duration *</Label>
          <Select
            value={formData.duration}
            onValueChange={(value) => setFormData({ ...formData, duration: value })}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Duration" />
            </SelectTrigger>
            <SelectContent>
              {durations.map((duration) => (
                <SelectItem key={duration} value={duration}>
                  {duration}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="numberOfPlayers">Number of Players *</Label>
          <Input
            id="numberOfPlayers"
            name="numberOfPlayers"
            type="number"
            min="1"
            max="20"
            value={formData.numberOfPlayers}
            onChange={handleInputChange}
            required
          />
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
