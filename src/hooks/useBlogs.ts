import { useQuery } from '@tanstack/react-query';
import { BlogAPI } from '../services/BlogAPI';
import { BlogPost, BlogCategory, BlogTag } from '../types/blog';

export const useBlogs = (category?: string, tag?: string, search?: string) => {
  return useQuery({
    queryKey: ['blogs', { category, tag, search }],
    queryFn: () => BlogAPI.getPosts(category, tag, search),
  });
};

export const useAdminBlogs = () => {
  return useQuery({
    queryKey: ['admin-blogs'],
    queryFn: () => BlogAPI.getAdminPosts(),
    staleTime: 0,
    refetchOnMount: true,
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
