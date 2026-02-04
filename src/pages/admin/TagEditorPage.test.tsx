import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TagEditorPage from './TagEditorPage';
import { BlogAPI } from '../../services/BlogAPI';
import { theme } from '../../styles/Theme';

// Mock BlogAPI
jest.mock('../../services/BlogAPI', () => ({
  BlogAPI: {
    getTag: jest.fn(),
    createTag: jest.fn(),
    updateTag: jest.fn(),
  },
}));

const mockBlogAPI = BlogAPI as jest.Mocked<typeof BlogAPI>;

// Test wrapper with providers
const renderWithProviders = (initialRoute: string = '/admin/tags/new') => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={[initialRoute]}>
          <Routes>
            <Route path="/admin/tags/new" element={<TagEditorPage />} />
            <Route path="/admin/tags/edit/:id" element={<TagEditorPage />} />
            <Route path="/admin/tags" element={<div>Tags List</div>} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

describe('TagEditorPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Create Mode', () => {
    it('renders create mode when no id parameter', () => {
      renderWithProviders('/admin/tags/new');

      expect(screen.getByText('Add New Tag')).toBeInTheDocument();
      expect(screen.getByText('Create Tag')).toBeInTheDocument();
    });

    it('has empty form fields in create mode', () => {
      renderWithProviders('/admin/tags/new');

      const nameInput = screen.getByPlaceholderText('Enter tag name');
      const descriptionInput = screen.getByPlaceholderText('Optional description');

      expect(nameInput).toHaveValue('');
      expect(descriptionInput).toHaveValue('');
    });

    it('calls createTag on submit in create mode', async () => {
      mockBlogAPI.createTag.mockResolvedValue({
        id: 'new-id',
        name: 'Test Tag',
        description: 'Test description',
        color_code: '#5A5d80',
      });

      renderWithProviders('/admin/tags/new');

      const nameInput = screen.getByPlaceholderText('Enter tag name');
      await userEvent.type(nameInput, 'Test Tag');

      const submitButton = screen.getByText('Create Tag');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockBlogAPI.createTag).toHaveBeenCalledWith({
          name: 'Test Tag',
          description: undefined,
          color_code: '#5A5d80',
        });
      });
    });

    it('navigates to tags list after successful create', async () => {
      mockBlogAPI.createTag.mockResolvedValue({
        id: 'new-id',
        name: 'Test Tag',
        color_code: '#5A5d80',
      });

      renderWithProviders('/admin/tags/new');

      const nameInput = screen.getByPlaceholderText('Enter tag name');
      await userEvent.type(nameInput, 'Test Tag');

      const submitButton = screen.getByText('Create Tag');
      fireEvent.click(submitButton);

      await waitFor(
        () => {
          expect(screen.getByText('Tags List')).toBeInTheDocument();
        },
        { timeout: 2000 }
      );
    });
  });

  describe('Edit Mode', () => {
    const mockTag = {
      id: 'tag-123',
      name: 'Existing Tag',
      description: 'Existing description',
      color_code: '#ff0000',
    };

    it('renders edit mode when id parameter is present', async () => {
      mockBlogAPI.getTag.mockResolvedValue(mockTag);

      renderWithProviders('/admin/tags/edit/tag-123');

      await waitFor(() => {
        expect(screen.getByText('Edit Tag')).toBeInTheDocument();
      });
    });

    it('pre-fills form with existing tag data', async () => {
      mockBlogAPI.getTag.mockResolvedValue(mockTag);

      renderWithProviders('/admin/tags/edit/tag-123');

      await waitFor(() => {
        const nameInput = screen.getByPlaceholderText('Enter tag name');
        expect(nameInput).toHaveValue('Existing Tag');
      });

      const descriptionInput = screen.getByPlaceholderText('Optional description');
      expect(descriptionInput).toHaveValue('Existing description');
    });

    it('calls updateTag on submit in edit mode', async () => {
      mockBlogAPI.getTag.mockResolvedValue(mockTag);
      mockBlogAPI.updateTag.mockResolvedValue({
        ...mockTag,
        name: 'Updated Tag',
      });

      renderWithProviders('/admin/tags/edit/tag-123');

      await waitFor(() => {
        expect(screen.getByPlaceholderText('Enter tag name')).toHaveValue('Existing Tag');
      });

      const nameInput = screen.getByPlaceholderText('Enter tag name');
      await userEvent.clear(nameInput);
      await userEvent.type(nameInput, 'Updated Tag');

      const submitButton = screen.getByText('Update Tag');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockBlogAPI.updateTag).toHaveBeenCalledWith('tag-123', {
          name: 'Updated Tag',
          description: 'Existing description',
          color_code: '#ff0000',
        });
      });
    });

    it('shows loading indicator while fetching tag', () => {
      mockBlogAPI.getTag.mockImplementation(
        () => new Promise(() => {}) // Never resolves
      );

      renderWithProviders('/admin/tags/edit/tag-123');

      // Should show loading state (LoadingIndicator component)
      expect(screen.queryByText('Edit Tag')).not.toBeInTheDocument();
      expect(screen.queryByText('Add New Tag')).not.toBeInTheDocument();
    });
  });

  describe('Validation', () => {
    it('shows error when name is empty on submit', async () => {
      renderWithProviders('/admin/tags/new');

      const submitButton = screen.getByText('Create Tag');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Tag name is required')).toBeInTheDocument();
      });
    });

    it('shows error for invalid hex color', async () => {
      renderWithProviders('/admin/tags/new');

      const colorInput = screen.getByPlaceholderText('#5A5d80');
      await userEvent.clear(colorInput);
      await userEvent.type(colorInput, 'invalid-color');

      const submitButton = screen.getByText('Create Tag');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Invalid hex color')).toBeInTheDocument();
      });
    });
  });

  describe('Cancel Button', () => {
    it('navigates back to tags list when cancel is clicked', async () => {
      renderWithProviders('/admin/tags/new');

      const cancelButton = screen.getByText('Cancel');
      fireEvent.click(cancelButton);

      await waitFor(() => {
        expect(screen.getByText('Tags List')).toBeInTheDocument();
      });
    });
  });
});
