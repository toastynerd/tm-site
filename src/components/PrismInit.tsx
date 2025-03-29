'use client';

import { useEffect } from 'react';
import Prism from 'prismjs';
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import "prismjs/components/prism-css";

export default function PrismInit() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Add a small delay to ensure the DOM is ready
      const timer = setTimeout(() => {
        Prism.highlightAll();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, []);

  return null;
} 