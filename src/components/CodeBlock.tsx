'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  children: string;
  language: string;
}

export default function CodeBlock({ children, language }: CodeBlockProps) {
  return (
    <div className="my-4">
      <SyntaxHighlighter
        language={language}
        style={tomorrow}
        customStyle={{
          margin: 0,
          borderRadius: '0.5rem',
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
} 