// Profile and social media related type definitions

export interface SocialLink {
  platform: 'instagram' | 'twitter' | 'youtube' | 'tiktok' | 'facebook' | 'website';
  url: string;
  handle?: string;
}

export interface ProfileStats {
  followers: number;
  recipes: number;
  avgRating: number;
}

export interface Profile {
  id: string;
  name: string;
  avatar: string;
  title?: string;
  bio: string;
  stats: ProfileStats;
  badges: string[];
  specialties: string[];
  location?: string;
  socialLinks?: SocialLink[];
  isVerified?: boolean;
  joinedDate?: string;
}