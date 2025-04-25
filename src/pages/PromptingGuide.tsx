import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ThemeToggle from '@/components/ThemeToggle';
import { useTheme } from '@/context/ThemeContext';
import { Markdown } from '@/components/Markdown';
import { CircularProgress } from '@mui/material';
import { Helmet } from 'react-helmet';
import './PromptingGuide.css';

export default function PromptingGuide() {
  const { theme, toggleTheme } = useTheme();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadGuide = async () => {
      try {
        // Get the base URL dynamically based on deployment environment
        const baseUrl = window.location.pathname.includes('/ChatGPT-Free-Prompt-List') 
          ? '/ChatGPT-Free-Prompt-List/' 
          : '/';
        
        const res = await fetch(`${baseUrl}markdown/prompting-guide.md`);
        const text = await res.text();
        setContent(text);
      } catch (err) {
        console.error('Error loading prompting guide:', err);
        setContent('# Error loading content\n\nSorry, we could not load the prompting guide.');
      } finally {
        setLoading(false);
      }
    };
    loadGuide();
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 relative bg-background overflow-auto p-8">
          {/* Github stars and theme toggle in top-right */}
          <div className="absolute top-4 right-4 z-50 flex items-center space-x-4">
            <a 
              href="https://github.com/mattnigh/ChatGPT-Free-Prompt-List" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <img 
                src="https://img.shields.io/github/stars/mattnigh/ChatGPT-Free-Prompt-List?style=social" 
                alt="GitHub Stars" 
                className="h-8"
              />
            </a>
            <ThemeToggle />
          </div>

          <Helmet>
            <title>AI Prompting Guide - Learn effective prompting techniques</title>
            <meta
              name="description"
              content="A comprehensive guide to effective AI prompting techniques and best practices."
            />
          </Helmet>

          {loading ? (
            <div className="flex items-center justify-center h-full">
              <CircularProgress />
            </div>
          ) : (
            <div className="markdown-content">
              <Markdown>{content}</Markdown>
            </div>
          )}
        </div>
      </div>
      <div className="absolute bottom-4 right-4 z-50">
        {/* Placeholder for potential error alert */}
        <div id="promptLoadingErrors" className="hidden"></div>
      </div>
    </div>
  );
} 