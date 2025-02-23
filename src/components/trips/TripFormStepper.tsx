import React from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface Step {
  title: string;
  description: string;
}

interface TripFormStepperProps {
  currentStep?: number;
  steps?: Step[];
  onStepClick?: (step: number) => void;
}

const defaultSteps: Step[] = [
  {
    title: "Trip Details",
    description: "Basic information about your trip",
  },
  {
    title: "Preferences",
    description: "Set your travel preferences",
  },
  {
    title: "Settings",
    description: "Configure travel settings",
  },
];

const TripFormStepper = ({
  currentStep = 0,
  steps = defaultSteps,
  onStepClick = () => {},
}: TripFormStepperProps) => {
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <div className="space-y-4">
        <Progress value={progress} className="w-full" />

        <div className="grid grid-cols-3 gap-4">
          {steps.map((step, index) => (
            <button
              key={step.title}
              onClick={() => onStepClick(index)}
              className={cn(
                "text-left p-4 rounded-lg transition-colors",
                index === currentStep
                  ? "bg-primary/10 border border-primary"
                  : "bg-gray-50 hover:bg-gray-100",
                index < currentStep ? "text-primary" : "text-gray-600",
              )}
            >
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-sm",
                    index === currentStep
                      ? "bg-primary text-white"
                      : index < currentStep
                        ? "bg-primary/20 text-primary"
                        : "bg-gray-200 text-gray-600",
                  )}
                >
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-medium text-sm">{step.title}</h3>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TripFormStepper;
