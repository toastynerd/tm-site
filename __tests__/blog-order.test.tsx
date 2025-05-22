import { render, screen } from '@testing-library/react';
import BlogPage from '@/app/blog/page';
import * as markdownModule from '@/lib/markdown';

// Mock the getAllBlogPosts function
jest.mock('@/lib/markdown', () => ({
  getAllBlogPosts: jest.fn(),
}));

describe('Blog Page', () => {
  it('displays blog posts in descending order by date (newest first)', () => {
    // Setup mock data with posts in reverse chronological order (as would be returned by getAllBlogPosts)
    const mockPosts = [
      {
        slug: 'newest-post',
        title: 'Newest Post',
        date: '2025-05-22',
        content: 'This is the newest post',
        excerpt: 'Newest post excerpt',
      },
      {
        slug: 'middle-post',
        title: 'Middle Post',
        date: '2025-03-15',
        content: 'This is the middle post',
        excerpt: 'Middle post excerpt',
      },
      {
        slug: 'oldest-post',
        title: 'Oldest Post',
        date: '2025-01-01',
        content: 'This is the oldest post',
        excerpt: 'Oldest post excerpt',
      },
    ];

    // Mock the getAllBlogPosts function to return our test data
    // Note: The posts are already in the correct order as they would be returned by getAllBlogPosts
    const getAllBlogPostsMock = jest.spyOn(markdownModule, 'getAllBlogPosts');
    getAllBlogPostsMock.mockReturnValue(mockPosts);

    // Render the component
    render(<BlogPage />);

    // Get all the blog post titles as they appear in the DOM
    const renderedTitles = screen.getAllByRole('heading', { level: 2 })
      .map(heading => heading.textContent);

    // The expected order: newest to oldest
    const expectedOrder = ['Newest Post', 'Middle Post', 'Oldest Post'];

    // Assert that the posts are rendered in the correct order
    expect(renderedTitles).toEqual(expectedOrder);
  });

  it('handles empty blog post list', () => {
    // Mock the getAllBlogPosts function to return an empty array
    const getAllBlogPostsMock = jest.spyOn(markdownModule, 'getAllBlogPosts');
    getAllBlogPostsMock.mockReturnValue([]);

    // Render the component
    render(<BlogPage />);

    // Check that the Blog heading is still present
    expect(screen.getByRole('heading', { name: /Blog/i })).toBeInTheDocument();

    // Verify no blog post titles are rendered
    const blogPostTitles = screen.queryAllByRole('heading', { level: 2 });
    expect(blogPostTitles.length).toBe(0);
  });
});