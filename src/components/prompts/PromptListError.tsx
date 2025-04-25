
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PromptListErrorProps {
  error: Error;
  isRetrying: boolean;
  onRetry: () => void;
}

export function PromptListError({ error, isRetrying, onRetry }: PromptListErrorProps) {
  return (
    <div className="flex-1 flex items-center justify-center min-h-screen">
      <Alert variant="destructive" className="max-w-lg">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle>Oops! The prompts are playing hide and seek 🙈</AlertTitle>
        <AlertDescription className="mt-2">
          <p>We couldn't find any prompts in the directory. They might be:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Taking a coffee break ☕️</li>
            <li>Stuck in digital traffic 🚦</li>
            <li>Playing arcade games instead of working 🎮</li>
          </ul>
          <p className="mt-2">
            Please make sure you have created prompt files in the <code>/public/prompts</code> directory with valid YAML frontmatter.
            Each file should be named <code>*.prompt.yml</code>
          </p>
          <p className="mt-2 text-xs opacity-75">
            Technical details: {error.message}
          </p>
          <div className="mt-4 flex justify-end">
            <Button 
              onClick={onRetry} 
              className="flex items-center gap-2"
              disabled={isRetrying}
            >
              <RefreshCw className={`h-4 w-4 ${isRetrying ? 'animate-spin' : ''}`} />
              {isRetrying ? 'Retrying...' : 'Retry Loading'}
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
}
