import Link from 'next/link';
import { BookOpenIcon } from '@heroicons/react/24/outline';

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Blog
        </h1>
        <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">
          Thoughts, tutorials, and insights about software development
        </p>
      </div>
      <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {/* Example blog post card */}
        <article className="flex flex-col items-start">
          <div className="relative w-full">
            <div className="flex items-center gap-x-4 text-xs">
              <time dateTime="2024-03-29" className="text-gray-500 dark:text-gray-400">
                March 29, 2024
              </time>
              <span className="relative z-10 rounded-full bg-gray-50 dark:bg-gray-800 px-3 py-1.5 font-medium text-gray-600 dark:text-gray-300">
                Development
              </span>
            </div>
            <div className="group relative">
              <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300">
                <Link href="/blog/example-post">
                  <span className="absolute inset-0" />
                  Getting Started with Next.js
                </Link>
              </h3>
              <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                Learn how to build modern web applications with Next.js, React, and TypeScript.
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
} 