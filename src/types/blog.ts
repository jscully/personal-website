export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: string;
    publishDate: string;
    lastUpdated?: string;
    author: {
      name: string;
      avatar?: string;
    };
    categories: string[];
    tags: string[];
    readTime: number; // in minutes
    likes: number;
    featured?: boolean;
  }
  
  export interface BlogCategory {
    id: string;
    name: string;
    slug: string;
    description?: string;
    count: number; // Number of posts in this category
  }
  
  export interface BlogTag {
    id: string;
    name: string;
    slug: string;
    count: number; // Number of posts with this tag
  }