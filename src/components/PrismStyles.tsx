'use client';

import { useEffect } from 'react';

export default function PrismStyles() {
  useEffect(() => {
    const loadPrism = async () => {
      const Prism = (await import('prismjs')).default;
      await import('prismjs/themes/prism-tomorrow.css');
      await import('prismjs/components/prism-typescript');
      await import('prismjs/components/prism-javascript');
      await import('prismjs/components/prism-jsx');
      await import('prismjs/components/prism-tsx');
      await import('prismjs/components/prism-bash');
      await import('prismjs/components/prism-json');
      await import('prismjs/components/prism-css');
      
      // Initialize Prism
      Prism.highlightAll();
    };

    loadPrism();
  }, []);

  return null;
} 