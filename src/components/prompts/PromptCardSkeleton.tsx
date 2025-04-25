
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

interface PromptCardSkeletonProps {
  isDark: boolean;
}

export function PromptCardSkeleton({ isDark }: PromptCardSkeletonProps) {
  return (
    <div
      className={cn(
        "card-animate-in card-hover-effect rounded-lg border-l-4 border-t border-r border-b flex flex-col gap-3 px-6 py-5 mb-1 shadow-sm skeleton-shimmer relative overflow-hidden",
        isDark
          ? "bg-github-button/10 border-github-border/20 border-l-indigo-500/40"
          : "bg-white border-github-border/30 border-l-indigo-400"
      )}
      aria-hidden="true"
      style={{ minHeight: 110 }}
    >
      {/* Title */}
      <div className="flex items-center gap-3 mb-1">
        <div className="h-5 w-40 rounded bg-slate-200 dark:bg-slate-700 shimmer-bar" />
        <div className="h-5 w-6 rounded-full bg-slate-100 dark:bg-slate-800 shimmer-bar" />
        <div className="h-5 w-6 rounded-full bg-slate-100 dark:bg-slate-800 shimmer-bar" />
      </div>
      {/* Description/content line */}
      <div className="h-4 w-full max-w-sm rounded bg-slate-100 dark:bg-slate-800 shimmer-bar" />
      <div className="h-4 w-3/4 rounded bg-slate-100 dark:bg-slate-800 shimmer-bar" />
      {/* Tags */}
      <div className="flex gap-2 mt-2">
        <div className="h-4 w-12 rounded-full bg-slate-200 dark:bg-slate-800 shimmer-bar" />
        <div className="h-4 w-16 rounded-full bg-slate-200 dark:bg-slate-800 shimmer-bar" />
      </div>
      {/* Category badge */}
      <div className="absolute top-4 right-5">
        <div className={cn(
          "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border shimmer-bar",
          isDark ? "bg-slate-900/70 border-github-border/50" : "bg-slate-200 border-github-border/30"
        )}>
          <div className="h-4 w-4 rounded-full bg-slate-300 dark:bg-slate-700" />
          <div className="h-3 w-12 rounded bg-slate-300 dark:bg-slate-700" />
        </div>
      </div>
    </div>
  );
}
