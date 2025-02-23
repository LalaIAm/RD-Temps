import React from "react";
import DashboardHeader from "./dashboard/DashboardHeader";
import TripGrid from "./dashboard/TripGrid";

interface HomeProps {
  onCreateTrip?: () => void;
  onSearch?: (query: string) => void;
  onFilterStatus?: (status: string) => void;
  onSortChange?: (sort: string) => void;
  onTripEdit?: (tripId: string) => void;
  onTripShare?: (tripId: string) => void;
  onTripDelete?: (tripId: string) => void;
}

const Home = ({
  onCreateTrip = () => {},
  onSearch = () => {},
  onFilterStatus = () => {},
  onSortChange = () => {},
  onTripEdit = () => {},
  onTripShare = () => {},
  onTripDelete = () => {},
}: HomeProps) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <DashboardHeader
        onCreateTrip={onCreateTrip}
        onSearch={onSearch}
        onFilterStatus={onFilterStatus}
        onSortChange={onSortChange}
      />
      <div className="flex-1">
        <TripGrid
          onTripEdit={onTripEdit}
          onTripShare={onTripShare}
          onTripDelete={onTripDelete}
        />
      </div>
    </div>
  );
};

export default Home;
