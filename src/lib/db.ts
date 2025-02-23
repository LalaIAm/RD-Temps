import { supabase } from "./supabase";
import type { Database } from "@/types/database.types";

export type Trip = Database["public"]["Tables"]["trips"]["Row"];
export type NewTrip = Database["public"]["Tables"]["trips"]["Insert"];
export type UpdateTrip = Database["public"]["Tables"]["Update"];

export type TripParticipant =
  Database["public"]["Tables"]["trip_participants"]["Row"];
export type NewTripParticipant =
  Database["public"]["Tables"]["trip_participants"]["Insert"];
export type UpdateTripParticipant =
  Database["public"]["Tables"]["trip_participants"]["Update"];

export const tripsTable = {
  async getAll() {
    const { data, error } = await supabase
      .from("trips")
      .select("*")
      .order("start_date", { ascending: true });

    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from("trips")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  async create(trip: NewTrip) {
    const { data, error } = await supabase
      .from("trips")
      .insert(trip)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, trip: UpdateTrip) {
    const { data, error } = await supabase
      .from("trips")
      .update(trip)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase.from("trips").delete().eq("id", id);

    if (error) throw error;
  },
};

export const tripPreferencesTable = {
  async getByTripId(tripId: string) {
    const { data, error } = await supabase
      .from("trip_preferences")
      .select("*")
      .eq("trip_id", tripId)
      .single();

    if (error) throw error;
    return data;
  },

  async create(
    preferences: Database["public"]["Tables"]["trip_preferences"]["Insert"],
  ) {
    const { data, error } = await supabase
      .from("trip_preferences")
      .insert(preferences)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(
    tripId: string,
    preferences: Database["public"]["Tables"]["trip_preferences"]["Update"],
  ) {
    const { data, error } = await supabase
      .from("trip_preferences")
      .update(preferences)
      .eq("trip_id", tripId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(tripId: string) {
    const { error } = await supabase
      .from("trip_preferences")
      .delete()
      .eq("trip_id", tripId);

    if (error) throw error;
  },
};

export const tripParticipantsTable = {
  async getByTripId(tripId: string) {
    const { data, error } = await supabase
      .from("trip_participants")
      .select(
        `
        *,
        user:user_id ()
      `,
      )
      .eq("trip_id", tripId);

    if (error) throw error;
    return data;
  },

  async create(participant: NewTripParticipant) {
    const { data, error } = await supabase
      .from("trip_participants")
      .insert(participant)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, participant: UpdateTripParticipant) {
    const { data, error } = await supabase
      .from("trip_participants")
      .update(participant)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from("trip_participants")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },

  async addUserToTrip(
    tripId: string,
    userId: string,
    role: TripParticipant["role"] = "member",
  ) {
    return this.create({
      trip_id: tripId,
      user_id: userId,
      role,
    });
  },

  async removeUserFromTrip(tripId: string, userId: string) {
    const { error } = await supabase
      .from("trip_participants")
      .delete()
      .match({ trip_id: tripId, user_id: userId });

    if (error) throw error;
  },
};
