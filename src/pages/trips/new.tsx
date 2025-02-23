import React from "react";
import TripCreationForm from "@/components/trips/TripCreationForm";

const NewTripPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Trip</h1>
          <p className="mt-2 text-sm text-gray-600">
            Fill in the details below to start planning your next adventure
          </p>
        </div>

        <TripCreationForm />
      </div>
    </div>
  );
};

export default NewTripPage;
