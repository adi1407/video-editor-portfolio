export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      site_settings: {
        Row: {
          id: number;
          profile: Json;
          contact: Json;
          stats: Json;
          services: Json;
          toolkit: Json;
          experience: Json;
          selected_work: Json;
          category_meta: Json;
          updated_at: string;
        };
        Insert: {
          id?: number;
          profile?: Json;
          contact?: Json;
          stats?: Json;
          services?: Json;
          toolkit?: Json;
          experience?: Json;
          selected_work?: Json;
          category_meta?: Json;
          updated_at?: string;
        };
        Update: {
          id?: number;
          profile?: Json;
          contact?: Json;
          stats?: Json;
          services?: Json;
          toolkit?: Json;
          experience?: Json;
          selected_work?: Json;
          category_meta?: Json;
          updated_at?: string;
        };
        Relationships: [];
      };
      work_items: {
        Row: {
          id: string;
          category: string;
          title: string;
          cover_url: string;
          video_url: string | null;
          tags: string[];
          sort_order: number;
          featured: boolean;
          featured_subtitle: string | null;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category: string;
          title: string;
          cover_url: string;
          video_url?: string | null;
          tags?: string[];
          sort_order?: number;
          featured?: boolean;
          featured_subtitle?: string | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          category?: string;
          title?: string;
          cover_url?: string;
          video_url?: string | null;
          tags?: string[];
          sort_order?: number;
          featured?: boolean;
          featured_subtitle?: string | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};
