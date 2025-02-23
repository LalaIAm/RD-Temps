import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search } from "lucide-react";

interface DashboardHeaderProps {
  onCreateTrip?: () => void;
  onSearch?: (query: string) => void;
  onFilterStatus?: (status: string) => void;
  onSortChange?: (sort: string) => void;
}

const DashboardHeader = ({
  onCreateTrip = () => {},
  onSearch = () => {},
  onFilterStatus = () => {},
  onSortChange = () => {},
}: DashboardHeaderProps) => {
  return (
    <div className="w-full h-20 px-6 bg-white border-b border-gray-200 flex items-center justify-between">
      <div className="flex-1">
        <h1 className="text-2xl font-semibold text-gray-900">My Trips</h1>
      </div>

      <div className="flex items-center space-x-4 flex-1 justify-center">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search trips..."
            className="pl-10"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <Select onValueChange={onFilterStatus} defaultValue="all">
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Filter Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Trips</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={onSortChange} defaultValue="date-desc">
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-desc">Newest First</SelectItem>
            <SelectItem value="date-asc">Oldest First</SelectItem>
            <SelectItem value="name-asc">Name A-Z</SelectItem>
            <SelectItem value="name-desc">Name Z-A</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 flex justify-end">
        <Button onClick={onCreateTrip}>
          <Plus className="mr-2 h-4 w-4" /> Create New Trip
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
