import api from './api';
import { BlogPost, BlogPostDTO, TagDTO } from '../types/blog';

// Helper to map API DTO to Frontend Model
const mapPostToFrontend = (dto: BlogPostDTO): BlogPost => ({
  id: dto.id,
  title: dto.title || '',
  slug: dto.slug || '',
  excerpt: dto.excerpt || '',
  content: dto.content || '',
  coverImage: dto.featured_image || '/assets/images/blog/default.jpg',
  publishDate: dto.publication_dt || '',
  readTime: dto.reading_time || 5,
  tags: (dto.tags || []).map(t => t.name),
  categories: [], // API doesn't support categories distinct from tags yet
  author: {
    name: 'Joe Scully', // Hardcoded as API doesn't return author yet
    avatar: '/assets/images/profile-placeholder.jpg'
  },
  likes: 0,
  featured: false,
  status: dto.status ? dto.status.toLowerCase() : 'draft'
});

export const BlogAPI = {
  
  async getPosts(category?: string, tag?: string, search?: string): Promise<BlogPost[]> {
    const params: any = {
      page: 1,
      page_size: 50,
    };

    if (search) {
      params.search_term = search;
    }

    try {
      const response = await api.get('blogs/', { params });
      const items: BlogPostDTO[] = response.data.items;
      
      // Filter only published ones (those with status 'published' or having a publication date)
      let posts = items
        .map(mapPostToFrontend)
        .filter(p => p.status === 'published' || p.publishDate !== '');

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
      page_size: 50,
    };

    const response = await api.get('admin/blogs/', { params });
    const items: BlogPostDTO[] = response.data.items;
    return items.map(mapPostToFrontend);
  },

  async deletePost(blogId: string): Promise<boolean> {
    try {
      await api.delete(`admin/blogs/${blogId}/`);
      return true;
    } catch (error) {
      console.error("Failed to delete post", error);
      return false;
    }
  },
  
  async getPost(slug: string): Promise<BlogPost | null> {
    try {
      const response = await api.get(`blogs/${slug}/`);
      return mapPostToFrontend(response.data);
    } catch (error) {
      console.error(`Failed to fetch post ${slug}`, error);
      return null;
    }
  },
  
  async getAdminPost(id: string): Promise<BlogPost | null> {
    try {
      const response = await api.get(`admin/blogs/${id}/`);
      return mapPostToFrontend(response.data);
    } catch (error) {
      console.error(`Failed to fetch admin post ${id}`, error);
      return null;
    }
  },
  
  async getCategories(): Promise<any[]> {
    // API doesn't have categories, only tags. Return empty or mock.
    return [];
  },
  
  async getTags(): Promise<TagDTO[]> {
    try {
      const response = await api.get('tags/');
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
        const existingTagsRes = await api.get('tags/');
        const existingTags: TagDTO[] = existingTagsRes.data;
        
        for (const name of tagNames) {
          const found = existingTags.find(t => t.name.toLowerCase() === name.toLowerCase());
          if (found) {
            tagIds.push(found.id);
          } else {
            // Create new tag
            const createRes = await api.post('admin/tags/', { name, color_code: '#333333' });
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
      excerpt: postData.excerpt || null,
      featured_image: postData.coverImage || postData.featured_image || null,
      tag_ids: tagIds || [],
      status: postData.status || 'draft',
      reading_time: postData.readTime || null,
      seo_description: postData.seo_description || null,
      publication_dt: postData.publishDate || (postData.status === 'published' ? new Date().toISOString() : null)
    };

    try {
      if (postData.id) {
        // Update
        const response = await api.put(`admin/blogs/${postData.id}/`, payload);
        return mapPostToFrontend(response.data);
      } else {
        // Create
        const response = await api.post('admin/blogs/', payload);
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
  },

  async createTag(tagData: Omit<TagDTO, 'id'>): Promise<TagDTO> {
    const response = await api.post('admin/tags/', tagData);
    return response.data;
  },

  async getTag(id: string): Promise<TagDTO | null> {
    try {
      const response = await api.get(`admin/tags/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch tag ${id}`, error);
      return null;
    }
  },

  async updateTag(id: string, tagData: Omit<TagDTO, 'id'>): Promise<TagDTO> {
    const response = await api.put(`admin/tags/${id}/`, tagData);
    return response.data;
  },

  async deleteTag(id: string): Promise<boolean> {
    try {
      await api.delete(`admin/tags/${id}/`);
      return true;
    } catch (error) {
      console.error(`Failed to delete tag ${id}`, error);
      return false;
    }
  }
};
