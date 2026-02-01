export interface TagDTO {
  id: string;
  name: string;
  color_code?: string;
}

// API Response shape
export interface BlogPostDTO {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  publication_dt?: string;
  updated_dt?: string;
  reading_time?: number;
  featured_image?: string;
  seo_description?: string;
  status: string;
  tags: TagDTO[];
}

// Frontend Model (mapped from DTO to keep UI components happy, or we update UI)
// Let's try to align them.
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string; // Mapped from featured_image
  publishDate: string; // Mapped from publication_dt
  tags: string[]; // Mapped from tags objects (names)
  categories: string[]; // Mocked or derived? API doesn't have categories?
  author: {
    name: string;
    avatar?: string;
  };
  readTime: number;
  likes: number; // Not in API
  featured: boolean; // Not in API
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  count: number;
}
