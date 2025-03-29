import { getBlogPostBySlug, markdownToHtml } from '@/lib/markdown';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const slug = await Promise.resolve(params.slug);
    const post = getBlogPostBySlug(slug);
    const content = await markdownToHtml(post.content);

    return (
      <article className="mx-auto max-w-3xl px-6 py-24 sm:py-32 lg:px-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
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
        <div
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>
    );
  } catch (error) {
    notFound();
  }
} 