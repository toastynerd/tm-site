import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const blogDirectory = path.join(process.cwd(), 'src/content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  content: string;
  excerpt?: string;
}

export function getAllBlogPosts(): BlogPost[] {
  const fileNames = fs.readdirSync(blogDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(blogDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      const title = data.title || content.split('\n')[0].replace(/^#\s+/, '');
      
      return {
        slug,
        title,
        date: data.date || new Date().toISOString(),
        content,
        excerpt: data.excerpt || content.split('\n').slice(0, 3).join('\n'),
      };
    });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogPostBySlug(slug: string): BlogPost {
  const fullPath = path.join(blogDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const title = data.title || content.split('\n')[0].replace(/^#\s+/, '');

  return {
    slug,
    title,
    date: data.date || new Date().toISOString(),
    content,
    excerpt: data.excerpt || content.split('\n').slice(0, 3).join('\n'),
  };
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(html)
    .process(markdown);
  return result.toString();
} 