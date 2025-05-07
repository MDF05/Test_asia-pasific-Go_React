export interface MyClient {
  id?: number;
  name: string;
  slug: string;
  is_project: string;
  self_capture: string;
  client_prefix: string;
  client_logo: string;
  address?: string;
  phone_number?: string;
  city?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
} 