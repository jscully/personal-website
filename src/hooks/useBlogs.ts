import { useQuery } from '@tanstack/react-query';
import { BlogAPI } from '../services/BlogAPI';
import { BlogPost, BlogCategory, BlogTag } from '../types/blog';

export const useBlogs = (category?: string, tag?: string) => {
  return useQuery({
    queryKey: ['blogs', { category, tag }],
    queryFn: () => BlogAPI.getPosts(category, tag),
  });
};

export const useBlogPost = (slug: string) => {
  return useQuery({
    queryKey: ['blog', slug],
    queryFn: () => BlogAPI.getPost(slug),
    enabled: !!slug,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => BlogAPI.getCategories(),
  });
};

export const useTags = () => {
  return useQuery({
    queryKey: ['tags'],
    queryFn: () => BlogAPI.getTags(),
  });
};
