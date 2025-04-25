
import React from "react";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className={cn(
        "flex flex-col items-center space-y-4 p-8 rounded-lg",
        "bg-github-button/10 dark:bg-github-button/5",
        "border border-github-border/20 dark:border-github-border/10",
        "animate-in fade-in duration-500"
      )}>
        <Loader className="h-8 w-8 animate-spin text-github-text opacity-50" />
        <p className="text-github-text font-inter text-sm animate-pulse">
          Loading your prompts...
        </p>
      </div>
    </div>
  );
};
