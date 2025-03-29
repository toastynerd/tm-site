'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, BookOpenIcon, FolderIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Blog', href: '/blog', icon: BookOpenIcon },
  { name: 'Projects', href: '/projects', icon: FolderIcon },
  { name: 'Contact', href: '/contact', icon: EnvelopeIcon },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-black shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Tyler Morgan
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium
                    ${pathname === item.href
                      ? 'border-b-2 border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100'
                      : 'border-b border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                    }`}
                >
                  <item.icon className="h-5 w-5 mr-1" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 