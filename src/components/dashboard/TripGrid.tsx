import React from "react";
import TripCard from "./TripCard";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Trip {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  participants: {
    id: string;
    name: string;
    avatar: string;
  }[];
  status: "upcoming" | "in-progress" | "completed";
  thumbnailUrl: string;
}

interface TripGridProps {
  trips?: Trip[];
  onTripEdit?: (tripId: string) => void;
  onTripShare?: (tripId: string) => void;
  onTripDelete?: (tripId: string) => void;
}

const TripGrid = ({
  trips = [
    {
      id: "1",
      name: "Grand Canyon Adventure",
      destination: "Grand Canyon, Arizona",
      startDate: "2024-06-15",
      endDate: "2024-06-22",
      participants: [
        {
          id: "1",
          name: "John Doe",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
        },
        {
          id: "2",
          name: "Jane Smith",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
        },
      ],
      status: "upcoming",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722",
    },
    {
      id: "2",
      name: "Pacific Coast Highway",
      destination: "California Coast",
      startDate: "2024-07-01",
      endDate: "2024-07-10",
      participants: [
        {
          id: "3",
          name: "Mike Wilson",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
        },
      ],
      status: "upcoming",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1540520773168-df516465d66b",
    },
    {
      id: "3",
      name: "Yellowstone National Park",
      destination: "Wyoming",
      startDate: "2024-08-15",
      endDate: "2024-08-22",
      participants: [
        {
          id: "4",
          name: "Sarah Johnson",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
        },
        {
          id: "5",
          name: "Tom Brown",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tom",
        },
        {
          id: "6",
          name: "Lisa Anderson",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
        },
      ],
      status: "upcoming",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1533423996375-f914ac520870",
    },
  ],
  onTripEdit = () => {},
  onTripShare = () => {},
  onTripDelete = () => {},
}: TripGridProps) => {
  return (
    <div className="w-full h-full bg-gray-50 p-6">
      <ScrollArea className="h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {trips.map((trip) => (
            <TripCard
              key={trip.id}
              name={trip.name}
              destination={trip.destination}
              startDate={trip.startDate}
              endDate={trip.endDate}
              participants={trip.participants}
              status={trip.status}
              thumbnailUrl={trip.thumbnailUrl}
              onEdit={() => onTripEdit(trip.id)}
              onShare={() => onTripShare(trip.id)}
              onDelete={() => onTripDelete(trip.id)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TripGrid;
