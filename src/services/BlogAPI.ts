import api from './api';
import { BlogPost, BlogPostDTO, TagDTO } from '../types/blog';

// Helper to map API DTO to Frontend Model
const mapPostToFrontend = (dto: BlogPostDTO): BlogPost => ({
  id: dto.id,
  title: dto.title,
  slug: dto.slug,
  excerpt: dto.excerpt || '',
  content: dto.content,
  coverImage: dto.featured_image || '/assets/images/blog/default.jpg',
  publishDate: dto.publication_dt || new Date().toISOString(),
  readTime: dto.reading_time || 5,
  tags: dto.tags.map(t => t.name),
  categories: [], // API doesn't support categories distinct from tags yet
  author: {
    name: 'Joe Scully', // Hardcoded as API doesn't return author yet
    avatar: '/assets/images/profile-placeholder.jpg'
  },
  likes: 0,
  featured: false,
  status: dto.status
});

export const BlogAPI = {
  
  async getPosts(category?: string, tag?: string, search?: string): Promise<BlogPost[]> {
    // Note: 'category' is ignored as API uses tags. 
    // We map 'tag' (name) to 'tags' (UUID) if possible, but the API 
    // endpoint /api/blogs takes 'tags' as UUIDs.
    // This is a mismatch. For now, let's fetch all and filter client side 
    // OR we need to lookup tag ID by name.
    
    // For search, we can use the search_term param
    const params: any = {
      page: 1,
      page_size: 50,
    };

    if (search) {
      params.search_term = search;
    }

    try {
      const response = await api.get('/blogs', { params });
      const items: BlogPostDTO[] = response.data.items;
      
      let posts = items.map(mapPostToFrontend);

      // Client-side filtering for tags if we can't resolve UUID easily yet
      if (tag) {
        posts = posts.filter(p => p.tags.includes(tag));
      }

      return posts;
    } catch (error) {
      console.error("Failed to fetch posts", error);
      return [];
    }
  },

  async getAdminPosts(): Promise<BlogPost[]> {
    const params = {
      page: 1,
      page_size: 50, // Max allowed by backend is 50
    };

    try {
      const response = await api.get('/admin/blogs/', { params });
      const items: BlogPostDTO[] = response.data.items;
      return items.map(mapPostToFrontend);
    } catch (error) {
      console.error("Failed to fetch admin posts", error);
      return [];
    }
  },
  
  async getPost(slug: string): Promise<BlogPost | null> {
    try {
      const response = await api.get(`/blogs/${slug}`);
      return mapPostToFrontend(response.data);
    } catch (error) {
      console.error(`Failed to fetch post ${slug}`, error);
      return null;
    }
  },
  
  async getCategories(): Promise<any[]> {
    // API doesn't have categories, only tags. Return empty or mock.
    return [];
  },
  
  async getTags(): Promise<TagDTO[]> {
    try {
      const response = await api.get('/tags');
      return response.data;
    } catch (error) {
      return [];
    }
  },
  
  // Admin functions
  async savePost(postData: any): Promise<BlogPost | null> {
    // 1. Resolve Tags
    const tagNames: string[] = typeof postData.tags === 'string' 
      ? postData.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
      : postData.tags;

    let tagIds: string[] = [];
    
    if (tagNames && tagNames.length > 0) {
      try {
        const existingTagsRes = await api.get('/tags');
        const existingTags: TagDTO[] = existingTagsRes.data;
        
        for (const name of tagNames) {
          const found = existingTags.find(t => t.name.toLowerCase() === name.toLowerCase());
          if (found) {
            tagIds.push(found.id);
          } else {
            // Create new tag
            const createRes = await api.post('/admin/tags/', { name, color_code: '#333333' });
            tagIds.push(createRes.data.id);
          }
        }
      } catch (err) {
        console.error("Error resolving tags", err);
      }
    }

    const payload = {
      title: postData.title,
      slug: postData.slug,
      content: postData.content,
      excerpt: postData.excerpt,
      featured_image: postData.coverImage || postData.featured_image,
      tag_ids: tagIds,
      status: postData.status || 'draft'
    };

    try {
      if (postData.id) {
        // Update
        const response = await api.put(`/admin/blogs/${postData.id}`, payload);
        return mapPostToFrontend(response.data);
      } else {
        // Create
        const response = await api.post('/admin/blogs/', payload);
        return mapPostToFrontend(response.data);
      }
    } catch (error) {
      console.error("Failed to save post", error);
      throw error;
    }
  },

  async likePost(postId: string): Promise<{ success: boolean, likes: number }> {
    // Not supported by API yet
    return { success: true, likes: 0 };
  },
  
  async getRelatedPosts(postId: string, limit: number = 3): Promise<BlogPost[]> {
    // Mock implementation for now, or fetch all and filter
    return [];
  }
};
