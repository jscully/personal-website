import { BlogAPI } from './BlogAPI';
import api from './api';

// Mock the api module
jest.mock('./api');
const mockApi = api as jest.Mocked<typeof api>;

describe('BlogAPI', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getTag', () => {
    it('fetches a tag by id successfully', async () => {
      const mockTag = {
        id: 'tag-123',
        name: 'Test Tag',
        description: 'Test description',
        color_code: '#ff0000',
      };

      mockApi.get.mockResolvedValue({ data: mockTag });

      const result = await BlogAPI.getTag('tag-123');

      expect(mockApi.get).toHaveBeenCalledWith('admin/tags/tag-123/');
      expect(result).toEqual(mockTag);
    });

    it('returns null when tag fetch fails', async () => {
      mockApi.get.mockRejectedValue(new Error('Not found'));

      const result = await BlogAPI.getTag('invalid-id');

      expect(result).toBeNull();
    });

    it('logs error when fetch fails', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      mockApi.get.mockRejectedValue(new Error('Network error'));

      await BlogAPI.getTag('tag-123');

      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to fetch tag tag-123',
        expect.any(Error)
      );
      consoleSpy.mockRestore();
    });
  });

  describe('updateTag', () => {
    it('updates a tag successfully', async () => {
      const updatedTag = {
        id: 'tag-123',
        name: 'Updated Tag',
        description: 'Updated description',
        color_code: '#00ff00',
      };

      mockApi.put.mockResolvedValue({ data: updatedTag });

      const result = await BlogAPI.updateTag('tag-123', {
        name: 'Updated Tag',
        description: 'Updated description',
        color_code: '#00ff00',
      });

      expect(mockApi.put).toHaveBeenCalledWith('admin/tags/tag-123/', {
        name: 'Updated Tag',
        description: 'Updated description',
        color_code: '#00ff00',
      });
      expect(result).toEqual(updatedTag);
    });

    it('throws error when update fails', async () => {
      mockApi.put.mockRejectedValue(new Error('Update failed'));

      await expect(
        BlogAPI.updateTag('tag-123', { name: 'Test', color_code: '#000' })
      ).rejects.toThrow('Update failed');
    });
  });

  describe('createTag', () => {
    it('creates a tag successfully', async () => {
      const newTag = {
        id: 'new-tag-id',
        name: 'New Tag',
        description: 'New description',
        color_code: '#0000ff',
      };

      mockApi.post.mockResolvedValue({ data: newTag });

      const result = await BlogAPI.createTag({
        name: 'New Tag',
        description: 'New description',
        color_code: '#0000ff',
      });

      expect(mockApi.post).toHaveBeenCalledWith('admin/tags/', {
        name: 'New Tag',
        description: 'New description',
        color_code: '#0000ff',
      });
      expect(result).toEqual(newTag);
    });
  });
});
