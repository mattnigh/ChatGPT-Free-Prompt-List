
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface NotFoundStateProps {
  promptId: string | undefined;
  onBackClick: () => void;
}

export const NotFoundState = ({ promptId, onBackClick }: NotFoundStateProps) => {
  return (
    <div className="flex-1 p-6">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-6 text-github-text/70 hover:text-github-text font-inter flex items-center gap-2"
          onClick={onBackClick}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to prompts
        </Button>
      
        <h1 className="text-2xl font-semibold text-github-text font-inter mb-4">Prompt not found</h1>
        <p className="mt-2 text-github-text/70 font-inter mb-6">
          The prompt with ID "{promptId}" could not be found. This might be because:
        </p>
        
        <ul className="list-disc pl-6 text-github-text/70 font-inter space-y-2 mb-8">
          <li>The prompt was deleted or moved</li>
          <li>The prompt ID in the URL is incorrect</li>
          <li>There was an error loading the prompts</li>
        </ul>
        
        <Button onClick={onBackClick} className="font-inter">
          Go back to all prompts
        </Button>
      </div>
    </div>
  );
};
