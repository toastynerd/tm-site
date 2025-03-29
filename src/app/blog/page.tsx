import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/markdown';

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          Blog
        </h1>
        <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">
          Thoughts, tutorials, and updates
        </p>
      </div>
      <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post.slug} className="flex flex-col items-start">
            <div className="w-full">
              <h2 className="mt-6 text-lg font-semibold leading-8 text-gray-900 dark:text-gray-100">
                <Link href={`/blog/${post.slug}`} className="hover:text-gray-600 dark:hover:text-gray-300">
                  {post.title}
                </Link>
              </h2>
              <time
                dateTime={post.date}
                className="mt-2 block text-sm text-gray-500 dark:text-gray-400"
              >
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              {post.excerpt && (
                <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">
                  {post.excerpt}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
} 