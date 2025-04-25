import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { useTheme } from '@/context/ThemeContext';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`markdown-content ${isDark ? 'dark' : 'light'} ${className}`}>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={{
          h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mt-6 mb-4 text-github-text" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-xl font-bold mt-5 mb-3 text-github-text" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-lg font-bold mt-4 mb-2 text-github-text" {...props} />,
          h4: ({ node, ...props }) => <h4 className="text-base font-bold mt-3 mb-2 text-github-text" {...props} />,
          p: ({ node, ...props }) => <p className="mb-4 text-github-text" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc ml-6 mb-4 text-github-text" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal ml-6 mb-4 text-github-text" {...props} />,
          li: ({ node, ...props }) => <li className="mb-1 text-github-text" {...props} />,
          a: ({ node, ...props }) => (
            <a 
              className="text-blue-600 hover:underline dark:text-blue-400" 
              target="_blank" 
              rel="noopener noreferrer" 
              {...props} 
            />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote 
              className="border-l-4 border-github-border pl-4 italic my-4 text-github-text/80" 
              {...props} 
            />
          ),
          code: ({ node, inline, className, children, ...props }) => {
            if (inline) {
              return (
                <code 
                  className={`${className} px-1 py-0.5 rounded bg-github-button text-github-text`} 
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <pre className="bg-github-button p-4 rounded-md overflow-x-auto mb-4">
                <code className={`${className} text-github-text`} {...props}>
                  {children}
                </code>
              </pre>
            );
          },
          img: ({ node, ...props }) => (
            <img className="max-w-full h-auto rounded-md my-4" {...props} />
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border-collapse text-github-text" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => <thead className="bg-github-button" {...props} />,
          tbody: ({ node, ...props }) => <tbody {...props} />,
          tr: ({ node, ...props }) => <tr className="border-b border-github-border" {...props} />,
          th: ({ node, ...props }) => <th className="px-4 py-2 text-left font-medium text-github-text" {...props} />,
          td: ({ node, ...props }) => <td className="px-4 py-2 text-github-text" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer; 