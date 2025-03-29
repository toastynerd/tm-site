import { getBlogPostBySlug, markdownToHtml } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import BlogPostContent from '@/components/BlogPostContent';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

// We need searchParams for Next.js types but don't use it in this component
export default async function BlogPostPage({ params, searchParams: _ }: BlogPostPageProps) {
  try {
    const slug = params.slug;
    console.log('Loading blog post:', slug);
    
    const post = getBlogPostBySlug(slug);
    console.log('Found post:', { title: post.title, contentLength: post.content.length });
    
    const content = await markdownToHtml(post.content);
    console.log('Converted markdown to HTML, length:', content.length);

    return (
      <article className="mx-auto max-w-3xl px-6 py-24 sm:py-32 lg:px-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
            {post.title}
          </h1>
          <time
            dateTime={post.date}
            className="mt-4 block text-sm text-gray-500 dark:text-gray-400"
          >
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </header>
        <BlogPostContent content={content} />
      </article>
    );
  } catch (error) {
    console.error('Error loading blog post:', error);
    notFound();
  }
} 