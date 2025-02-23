import React from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { TripFormValues } from "@/lib/schemas";

interface PreferencesSectionProps {
  form: UseFormReturn<TripFormValues>;
}

const PreferencesSection = ({ form }: PreferencesSectionProps) => {
  if (!form) return null; // Early return if form is not provided

  const { watch, setValue } = form;
  const stopPreferences = watch("stopPreferences") || [];
  const distanceBetweenStops = watch("distanceBetweenStops");

  const stopPreferenceOptions = [
    { id: "scenic", label: "Scenic Routes" },
    { id: "nature", label: "Nature Spots" },
    { id: "adventure", label: "Adventure Activities" },
    { id: "historical", label: "Historical Sites" },
    { id: "luxury", label: "Luxury Experiences" },
  ];

  const handleCheckboxChange = (id: string, checked: boolean) => {
    const updatedPreferences = checked
      ? [...stopPreferences, id]
      : stopPreferences.filter((p: string) => p !== id);
    setValue("stopPreferences", updatedPreferences);
  };

  return (
    <Card className="p-6 bg-white">
      <div className="space-y-8">
        {/* Stop Preferences */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Stop Preferences</h3>
          <div className="grid gap-4">
            {stopPreferenceOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={option.id}
                  checked={stopPreferences.includes(option.id)}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(option.id, checked as boolean)
                  }
                />
                <Label htmlFor={option.id}>{option.label}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Distance Preferences */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            Preferred Distance Between Stops
          </h3>
          <div className="space-y-2">
            <Slider
              value={[distanceBetweenStops]}
              onValueChange={([value]) =>
                setValue("distanceBetweenStops", value)
              }
              max={200}
              step={10}
              className="w-full"
            />
            <p className="text-sm text-gray-500">
              {distanceBetweenStops} miles between stops
            </p>
          </div>
        </div>

        {/* Accommodation Preferences */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Accommodation Preferences</h3>
          <Select
            onValueChange={(value) => setValue("accommodation", value)}
            value={watch("accommodation")}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select accommodation type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hotel">Hotels</SelectItem>
              <SelectItem value="hostel">Hostels</SelectItem>
              <SelectItem value="camping">Camping</SelectItem>
              <SelectItem value="airbnb">Vacation Rentals</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Dining Preferences */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Dining Preferences</h3>
          <Select
            onValueChange={(value) => setValue("dining", value)}
            value={watch("dining")}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select dining preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="casual">Casual Dining</SelectItem>
              <SelectItem value="fine">Fine Dining</SelectItem>
              <SelectItem value="local">Local Cuisine</SelectItem>
              <SelectItem value="fast">Quick Service</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
};

export default PreferencesSection;
