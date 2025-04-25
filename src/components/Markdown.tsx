import React from 'react';
import MarkdownRenderer from './markdown/MarkdownRenderer';

interface MarkdownProps {
  children: string;
  className?: string;
}

export function Markdown({ children, className = '' }: MarkdownProps) {
  return <MarkdownRenderer content={children} className={className} />;
} 