import { blogPosts, blogCategories, blogTags, getRelatedPosts } from '../data/blogPosts';
import { BlogPost, BlogCategory, BlogTag } from '../types/blog';


const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const BlogAPI = {
  
  async getPosts(category?: string, tag?: string): Promise<BlogPost[]> {
    let filteredPosts = [...blogPosts];
    
    if (category) {
      filteredPosts = filteredPosts.filter(post => 
        post.categories.some(cat => cat.toLowerCase() === category.toLowerCase())
      );
    }
    
    if (tag) {
      filteredPosts = filteredPosts.filter(post => 
        post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
      );
    }
    
    return filteredPosts;
  },
  
  
  async getPost(slug: string): Promise<BlogPost | null> {
    const post = blogPosts.find(p => p.slug === slug);
    return post || null;
  },
  
  async getCategories(): Promise<BlogCategory[]> {
    return blogCategories;
  },
  
  async getTags(): Promise<BlogTag[]> {
    return blogTags;
  },
  
  async likePost(postId: string): Promise<{ success: boolean, likes: number }> {
    const post = blogPosts.find(p => p.id === postId);
    
    if (!post) return { success: false, likes: 0 };
    
    post.likes += 1;
    return { success: true, likes: post.likes };
  },
  
  async getRelatedPosts(postId: string, limit: number = 3): Promise<BlogPost[]> {
    const post = blogPosts.find(p => p.id === postId);
    
    if (!post) return [];
    
    return getRelatedPosts(post, limit);
  }
};