import * as z from "zod";

export const tripFormSchema = z.object({
  // Trip Details
  tripName: z.string().min(1, "Trip name is required"),
  startLocation: z.string().min(1, "Starting location is required"),
  destination: z.string().min(1, "Destination is required"),
  dateRange: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .optional(),

  // Preferences
  stopPreferences: z.array(z.string()).default([]),
  distanceBetweenStops: z.number().min(0).default(50),
  accommodation: z
    .enum(["hotel", "hostel", "camping", "airbnb"])
    .default("hotel"),
  dining: z.enum(["casual", "fine", "local", "fast"]).default("casual"),
});

export type TripFormValues = z.infer<typeof tripFormSchema>;
