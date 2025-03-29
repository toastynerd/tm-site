import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';

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
  try {
    const fullPath = path.join(blogDirectory, `${slug}.md`);
    console.log('Looking for blog post at:', fullPath);
    
    if (!fs.existsSync(fullPath)) {
      console.error('Blog post file not found:', fullPath);
      throw new Error(`Blog post not found: ${slug}`);
    }

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
  } catch (error) {
    console.error('Error getting blog post:', error);
    throw error;
  }
}

export async function markdownToHtml(markdown: string): Promise<string> {
  console.log('Processing markdown, length:', markdown.length);
  
  const result = await remark()
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeHighlight, {
      ignoreMissing: true,
      detect: true,
      aliases: {
        typescript: ['ts'],
        javascript: ['js'],
        jsx: ['react'],
        tsx: ['typescript-react'],
      }
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);
  
  const htmlContent = result.toString();
  console.log('Generated HTML, length:', htmlContent.length);
  
  return htmlContent;
} 