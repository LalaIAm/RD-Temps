export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type TripStatus = "upcoming" | "in-progress" | "completed";
export type ParticipantRole = "owner" | "admin" | "member";

export interface Database {
  public: {
    Tables: {
      trip_preferences: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          trip_id: string;
          stop_preferences: string[];
          distance_between_stops: number;
          accommodation: string;
          dining: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          trip_id: string;
          stop_preferences?: string[];
          distance_between_stops?: number;
          accommodation?: string;
          dining?: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          trip_id?: string;
          stop_preferences?: string[];
          distance_between_stops?: number;
          accommodation?: string;
          dining?: string;
        };
      };
      trips: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          name: string;
          destination: string;
          start_date: string;
          end_date: string;
          status: TripStatus;
          thumbnail_url: string | null;
          user_id: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          name: string;
          destination: string;
          start_date: string;
          end_date: string;
          status?: TripStatus;
          thumbnail_url?: string | null;
          user_id: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          name?: string;
          destination?: string;
          start_date?: string;
          end_date?: string;
          status?: TripStatus;
          thumbnail_url?: string | null;
          user_id?: string;
        };
      };
      trip_participants: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          trip_id: string;
          user_id: string;
          role: ParticipantRole;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          trip_id: string;
          user_id: string;
          role?: ParticipantRole;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          trip_id?: string;
          user_id?: string;
          role?: ParticipantRole;
        };
      };
    };
  };
}
