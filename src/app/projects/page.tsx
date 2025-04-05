import Link from 'next/link';
import { FolderIcon } from '@heroicons/react/24/outline';

const projects = [
  {
    name: 'Ollama Agent',
    description: 'A command-line interface agent that can interact with Ollama and execute Linux commands with confirmation.',
    link: 'https://github.com/toastynerd/ollama-agent',
    badge: {
      text: 'tests',
      link: 'https://github.com/toastynerd/ollama-agent/actions',
      color: 'success'
    },
    technologies: ['Python', 'Docker', 'Linux', 'Ollama'],
  },
  {
    name: 'Project 1',
    description: 'A brief description of your first project and what technologies you used.',
    link: '#',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    name: 'Project 2',
    description: 'A brief description of your second project and what technologies you used.',
    link: '#',
    technologies: ['Next.js', 'Node.js', 'PostgreSQL'],
  },
  {
    name: 'Project 3',
    description: 'A brief description of your third project and what technologies you used.',
    link: '#',
    technologies: ['Python', 'Django', 'Docker'],
  },
];

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Projects
        </h1>
        <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">
          A collection of my work and side projects
        </p>
      </div>
      <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {projects.map((project) => (
          <article key={project.name} className="flex flex-col items-start">
            <div className="relative w-full">
              <div className="flex items-center gap-x-4 text-xs">
                <FolderIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <div className="flex gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="relative z-10 rounded-full bg-gray-50 dark:bg-gray-800 px-3 py-1.5 font-medium text-gray-600 dark:text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300">
                  <Link href={project.link}>
                    <span className="absolute inset-0" />
                    {project.name}
                  </Link>
                  {project.badge && (
                    <a
                      href={project.badge.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 inline-flex items-center rounded-md bg-green-50 dark:bg-green-900/30 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-400 ring-1 ring-inset ring-green-600/20 dark:ring-green-500/30"
                    >
                      {project.badge.text}
                    </a>
                  )}
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                  {project.description}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
} 