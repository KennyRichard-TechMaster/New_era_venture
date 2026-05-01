import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type SiteSettings = {
  id: string;
  key: string;
  value: string;
  updated_at: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  headshot_url: string;
  candid_url: string;
  github_url: string;
  linkedin_url: string;
  website_url: string;
  whatsapp: string;
  twitter_url: string;
  repo_url: string;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  author: string;
  category: string;
  published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  image_url: string;
  price: string;
  category: string;
  features: string[];
  demo_url: string;
  display_order: number;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  display_order: number;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
};
