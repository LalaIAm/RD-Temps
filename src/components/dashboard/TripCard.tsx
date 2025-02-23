import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Share2, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Participant {
  id: string;
  name: string;
  avatar: string;
}

interface TripCardProps {
  name?: string;
  destination?: string;
  startDate?: string;
  endDate?: string;
  participants?: Participant[];
  status?: "upcoming" | "in-progress" | "completed";
  thumbnailUrl?: string;
  onEdit?: () => void;
  onShare?: () => void;
  onDelete?: () => void;
}

const TripCard = ({
  name = "Road Trip to Grand Canyon",
  destination = "Grand Canyon, Arizona",
  startDate = "2024-06-15",
  endDate = "2024-06-22",
  participants = [
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
    {
      id: "3",
      name: "Mike Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
    },
  ],
  status = "upcoming",
  thumbnailUrl = "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722",
  onEdit = () => {},
  onShare = () => {},
  onDelete = () => {},
}: TripCardProps) => {
  const statusColors = {
    upcoming: "bg-blue-500",
    "in-progress": "bg-green-500",
    completed: "bg-gray-500",
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card className="w-[360px] bg-white overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <img
            src={thumbnailUrl}
            alt={destination}
            className="w-full h-full object-cover"
          />
          <Badge
            className={`absolute top-4 right-4 ${statusColors[status]}`}
            variant="secondary"
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold mb-1">{name}</h3>
            <p className="text-gray-600 text-sm">{destination}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={onEdit}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete} className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="text-sm text-gray-600 mb-4">
          {formatDate(startDate)} - {formatDate(endDate)}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <div className="flex items-center space-x-2">
          <div className="flex -space-x-2">
            {participants.slice(0, 3).map((participant) => (
              <Avatar key={participant.id} className="border-2 border-white">
                <AvatarImage src={participant.avatar} alt={participant.name} />
                <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          {participants.length > 3 && (
            <span className="text-sm text-gray-600">
              +{participants.length - 3} more
            </span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default TripCard;
