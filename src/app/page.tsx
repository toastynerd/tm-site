import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="relative isolate">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl">
            Tyler Morgan
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Software developer passionate about building innovative solutions and contributing to open source. 
            Specializing in Ruby on Rails, JavaScript, and full-stack development. 
            Creator of tools like nesasm, superagent-cli, and eat - focused on developer experience and automation.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/blog"
              className="rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-100"
            >
              Read Blog
            </Link>
            <Link
              href="/contact"
              className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100"
            >
              Contact <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
