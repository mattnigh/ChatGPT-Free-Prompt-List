import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';

// Lazy load route components
const PromptList = React.lazy(() => import('./components/PromptList'));
const PromptDetail = React.lazy(() => import('./components/prompts/detail/PromptDetail'));

// Loading component for suspense fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-full">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-github-text/70"></div>
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <React.Suspense fallback={<LoadingFallback />}>
            <PromptList />
          </React.Suspense>
        ),
      },
      {
        path: 'prompt/:promptId',
        element: (
          <React.Suspense fallback={<LoadingFallback />}>
            <PromptDetail />
          </React.Suspense>
        ),
      },
    ],
  },
]); 