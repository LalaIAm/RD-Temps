import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import DatePickerWithRange from "@/components/ui/date-picker-with-range";
import TripFormStepper from "./TripFormStepper";
import PreferencesSection from "./PreferencesSection";
import { addDays } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tripFormSchema, type TripFormValues } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { tripsTable, tripPreferencesTable } from "@/lib/db";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

interface TripCreationFormProps {
  onSubmit?: (data: TripFormValues) => void;
  defaultValues?: Partial<TripFormValues>;
}

const TripCreationForm = ({
  onSubmit = () => {},
  defaultValues = {
    tripName: "",
    startLocation: "",
    destination: "",
    dateRange: {
      from: new Date(),
      to: addDays(new Date(), 7),
    },
    stopPreferences: [],
    distanceBetweenStops: 50,
    accommodation: "hotel",
    dining: "casual",
  },
}: TripCreationFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stepErrors, setStepErrors] = useState<{ [key: string]: string }>({});
  const [isValidating, setIsValidating] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);

  React.useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        navigate("/login");
        return;
      }
      setUser(user);
    };
    getUser();
  }, [navigate]);

  const form = useForm<TripFormValues>({
    resolver: zodResolver(tripFormSchema),
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const validateCurrentStep = async () => {
    setIsValidating(true);
    setStepErrors({});

    try {
      const fieldsToValidate = {
        0: ["tripName", "startLocation", "destination"],
        1: [
          "stopPreferences",
          "distanceBetweenStops",
          "accommodation",
          "dining",
        ],
        2: [],
      }[currentStep];

      await form.trigger(fieldsToValidate);
      const hasErrors = fieldsToValidate.some((field) => errors[field]);

      if (hasErrors) {
        setStepErrors({
          ...stepErrors,
          [currentStep]: "Please fix the errors before proceeding.",
        });
        return false;
      }
      return true;
    } catch (error) {
      console.error("Validation error:", error);
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  const handleStepChange = async (step: number) => {
    if (step > currentStep) {
      const isValid = await validateCurrentStep();
      if (!isValid) return;
    }
    setCurrentStep(step);
    setStepErrors({});
  };

  const handleDateRangeChange = (range: { from: Date; to: Date }) => {
    setValue("dateRange", range);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card className="p-6 space-y-6 bg-white">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tripName">Trip Name</Label>
                <Input
                  id="tripName"
                  placeholder="Enter trip name"
                  {...register("tripName")}
                  className={cn(errors.tripName && "border-red-500")}
                />
                {errors.tripName && (
                  <p className="text-sm text-red-500">
                    {errors.tripName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="startLocation">Starting Location</Label>
                <Input
                  id="startLocation"
                  placeholder="Enter starting location"
                  {...register("startLocation")}
                  className={cn(errors.startLocation && "border-red-500")}
                />
                {errors.startLocation && (
                  <p className="text-sm text-red-500">
                    {errors.startLocation.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <Input
                  id="destination"
                  placeholder="Enter destination"
                  {...register("destination")}
                  className={cn(errors.destination && "border-red-500")}
                />
                {errors.destination && (
                  <p className="text-sm text-red-500">
                    {errors.destination.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Trip Dates (Optional)</Label>
                <DatePickerWithRange
                  date={watch("dateRange")}
                  onSelect={handleDateRangeChange}
                />
              </div>
            </div>
          </Card>
        );
      case 1:
        return form ? (
          <PreferencesSection form={form} key="preferences" />
        ) : null;
      case 2:
        return (
          <Card className="p-6 space-y-6 bg-white">
            <h3 className="text-lg font-semibold">Review Your Trip</h3>
            <div className="space-y-4">
              <div className="rounded-lg bg-gray-50 p-4">
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Trip Name
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {watch("tripName")}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">From</dt>
                    <dd className="text-sm text-gray-900">
                      {watch("startLocation")}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">To</dt>
                    <dd className="text-sm text-gray-900">
                      {watch("destination")}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Preferences
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {watch("stopPreferences").join(", ") ||
                        "No preferences selected"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Accommodation
                    </dt>
                    <dd className="text-sm text-gray-900 capitalize">
                      {watch("accommodation")}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Dining
                    </dt>
                    <dd className="text-sm text-gray-900 capitalize">
                      {watch("dining")}
                    </dd>
                  </div>
                </dl>
              </div>
              {stepErrors[currentStep] && (
                <div className="p-3 mb-4 text-sm text-red-500 bg-red-50 rounded-md">
                  {stepErrors[currentStep]}
                </div>
              )}
              <Button
                onClick={handleSubmit(async (data) => {
                  try {
                    setIsSubmitting(true);

                    // First create the trip
                    toast({
                      title: "Creating Trip",
                      description: "Saving trip details...",
                    });

                    const trip = await tripsTable.create({
                      name: data.tripName,
                      destination: data.destination,
                      start_date:
                        data.dateRange?.from?.toISOString() ||
                        new Date().toISOString(),
                      end_date:
                        data.dateRange?.to?.toISOString() ||
                        addDays(new Date(), 7).toISOString(),
                      status: "upcoming",
                      user_id: user.id,
                    });

                    // Then create preferences
                    toast({
                      title: "Saving Preferences",
                      description: "Saving trip preferences...",
                    });

                    await tripPreferencesTable.create({
                      trip_id: trip.id,
                      stop_preferences: data.stopPreferences,
                      distance_between_stops: data.distanceBetweenStops,
                      accommodation: data.accommodation,
                      dining: data.dining,
                    });

                    toast({
                      title: "Success",
                      description: "Trip created successfully!",
                    });

                    // Call the onSubmit prop if provided
                    if (onSubmit) {
                      await onSubmit(data);
                    }

                    // Navigate to the trips page
                    navigate("/");
                  } catch (error) {
                    console.error("Error creating trip:", error);
                    const errorMessage =
                      error instanceof Error
                        ? error.message
                        : "An unexpected error occurred";
                    setStepErrors({
                      ...stepErrors,
                      [currentStep]: errorMessage,
                    });
                    toast({
                      title: "Error",
                      description: "Failed to create trip. Please try again.",
                      variant: "destructive",
                    });
                  } finally {
                    setIsSubmitting(false);
                  }
                })}
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating Trip..." : "Create Trip"}
              </Button>
            </div>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 bg-gray-50 p-6 rounded-xl">
      <TripFormStepper
        currentStep={currentStep}
        onStepClick={handleStepChange}
      />

      {renderStepContent()}

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => handleStepChange(currentStep - 1)}
          disabled={currentStep === 0 || isValidating || isSubmitting}
        >
          Previous
        </Button>
        <Button
          onClick={() => handleStepChange(currentStep + 1)}
          disabled={currentStep === 2 || isValidating || isSubmitting}
        >
          {isValidating ? (
            <>
              <span className="mr-2">Validating...</span>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            </>
          ) : (
            "Next"
          )}
        </Button>
      </div>
    </div>
  );
};

export default TripCreationForm;
