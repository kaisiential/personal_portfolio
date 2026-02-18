
import { LucideIcon } from 'lucide-react';

export interface Project {
  id: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  icon?: LucideIcon;
  content?: string; // Markdown-like content for the modal
  galleryImages?: string[]; // Array of image URLs for the carousel
}

export interface JournalEntry {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
}

export interface FeaturedJournalEntry {
  id: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string; // Full markdown-like or text content
  date: string;
  readTime: string;
  tags: string[];
  coverImage: string;
  galleryImages?: string[]; // For the carousel
}

export interface LibraryItem {
  id: string;
  type: 'book' | 'health' | 'tool' | 'quote';
  title: string;
  subtitle?: string;
  content?: string;
  tags?: string[];
  image?: string; // For book covers or illustrations
  status?: 'Reading' | 'Finished' | 'Active' | 'Archived';
  link?: string;
  rating?: number; // 1-5
  color?: string; // Optional custom background color for the bento box
  colSpan?: 1 | 2 | 3; // For Bento grid sizing
}

export interface NavItem {
  id: string;
  label: string;
}
