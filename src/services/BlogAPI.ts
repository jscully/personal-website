import { blogPosts, blogCategories, blogTags, getRelatedPosts } from '../data/blogPosts';
import { BlogPost, BlogCategory, BlogTag } from '../types/blog';


const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const BlogAPI = {
  
  async getPosts(category?: string, tag?: string, search?: string): Promise<BlogPost[]> {
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

    if (search) {
      const query = search.toLowerCase();
      filteredPosts = filteredPosts.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.excerpt.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query)
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
  },

  async savePost(postData: Partial<BlogPost> & { categories?: string | string[], tags?: string | string[] }): Promise<BlogPost> {
    await delay(1000); // Simulate network delay

    // Process categories and tags if they are strings
    const categories = Array.isArray(postData.categories) 
      ? postData.categories 
      : (typeof postData.categories === 'string' ? postData.categories : '').split(',').map(c => c.trim()).filter(Boolean);

    const tags = Array.isArray(postData.tags) 
      ? postData.tags 
      : (typeof postData.tags === 'string' ? postData.tags : '').split(',').map(t => t.trim()).filter(Boolean);

    const existingPostIndex = blogPosts.findIndex(p => p.slug === postData.slug || p.id === postData.id);

    const newPost: BlogPost = {
      id: postData.id || Date.now().toString(),
      title: postData.title || 'Untitled',
      slug: postData.slug || `untitled-${Date.now()}`,
      excerpt: postData.excerpt || '',
      content: postData.content || '',
      coverImage: postData.coverImage || '/assets/images/blog/default.jpg',
      publishDate: postData.publishDate || new Date().toISOString(),
      author: {
        name: 'Joe Scully',
        avatar: '/assets/images/profile-placeholder.jpg',
        ...postData.author
      },
      categories,
      tags,
      readTime: postData.readTime || 5,
      likes: postData.likes || 0,
      featured: postData.featured || false,
    };

    if (existingPostIndex >= 0) {
      // Update existing
      blogPosts[existingPostIndex] = { ...blogPosts[existingPostIndex], ...newPost };
      return blogPosts[existingPostIndex];
    } else {
      // Create new
      blogPosts.push(newPost);
      return newPost;
    }
  }
};