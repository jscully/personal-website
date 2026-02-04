import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useTag } from './useBlogs';
import { BlogAPI } from '../services/BlogAPI';

// Mock BlogAPI
jest.mock('../services/BlogAPI', () => ({
  BlogAPI: {
    getTag: jest.fn(),
  },
}));

const mockBlogAPI = BlogAPI as jest.Mocked<typeof BlogAPI>;

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useTag', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches tag when id is provided', async () => {
    const mockTag = {
      id: 'tag-123',
      name: 'Test Tag',
      description: 'Test description',
      color_code: '#ff0000',
    };

    mockBlogAPI.getTag.mockResolvedValue(mockTag);

    const { result } = renderHook(() => useTag('tag-123'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockBlogAPI.getTag).toHaveBeenCalledWith('tag-123');
    expect(result.current.data).toEqual(mockTag);
  });

  it('does not fetch when id is empty string', () => {
    const { result } = renderHook(() => useTag(''), {
      wrapper: createWrapper(),
    });

    expect(result.current.isFetching).toBe(false);
    expect(mockBlogAPI.getTag).not.toHaveBeenCalled();
  });

  it('handles error when fetch fails', async () => {
    mockBlogAPI.getTag.mockRejectedValue(new Error('Failed to fetch'));

    const { result } = renderHook(() => useTag('invalid-id'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
  });

  it('returns loading state while fetching', () => {
    mockBlogAPI.getTag.mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );

    const { result } = renderHook(() => useTag('tag-123'), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
  });
});
