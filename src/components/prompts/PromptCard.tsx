import React from "react";
import { Prompt } from "@/lib/types";
import { Link } from "react-router-dom";
import { PromptTitle } from "./PromptTitle";
import { PromptTags } from "./PromptTags";
import { categoryIcons } from "@/components/prompts/detail/PromptContent";
import { FileText } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface PromptCardProps {
  prompt: Prompt;
  onCopy: (content: string) => void;
  index?: number; // For staggered animation
}

export function PromptCard({ prompt, onCopy, index = 0 }: PromptCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Enhanced dark mode background and border color
  const cardBg = isDark
    ? "bg-[#232939] border-[#171924] hover:bg-[#232939]/90"
    : "bg-[#FFFFFF] border-github-border/30 hover:bg-github-button/5";

  const leftBorder = isDark
    ? "border-l-[#9b87f5]"
    : "border-l-indigo-400";

  // Subtle shadow for card
  const cardShadow = isDark
    ? "shadow-[0_2px_16px_rgba(80,85,155,0.06)]"
    : "shadow-sm hover:shadow-md";

  // Category badge styling
  const badgeBg = isDark
    ? "bg-[#292f40] border-[#463f7c]/60"
    : "bg-github-button/20 border-github-border/30";
  const badgeText = isDark
    ? "text-[#C8C8C9]"
    : "text-github-text/80";

  // Text colors
  const titleText = isDark ? "text-white" : "text-github-text";
  const descText = isDark ? "text-[#C8C8C9]" : "text-github-text/80";

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button')) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const yaml = `---
name: ${prompt.title}
description: ${prompt.description}
model: ${prompt.model}
modelParameters: ${JSON.stringify(prompt.modelParameters, null, 2)}
tags:
${prompt.tags.map(tag => `  - ${tag.name}`).join('\n')}
category: ${prompt.category}
---
${prompt.content}`;

    const blob = new Blob([yaml], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${prompt.title.toLowerCase().replace(/\s+/g, '-')}.prompt.yml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const IconComponent = categoryIcons[prompt.category] || FileText;
  const animationDelay = `${Math.min(index * 0.05, 0.5)}s`;

  return (
    <Link
      to={`/prompt/${prompt.id}`}
      className={`
        block group card-animate-in card-hover-effect
        ${cardBg} ${cardShadow} transition-all duration-200 px-6 py-5 mb-1
        rounded-lg border-l-4 border-t border-r border-b ${leftBorder}
        ${isDark ? "border-t-[#171924] border-r-[#171924] border-b-[#171924]" : ""}
        ${isDark ? "dark-mode" : "light-mode"}
      `}
      onClick={handleClick}
      state={{ promptData: prompt }}
      style={{ animationDelay }}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <PromptTitle
            title={prompt.title}
            onCopy={() => onCopy(prompt.content)}
            onDownload={handleDownload}
            className={titleText}
          />
          <div className={`text-sm mb-4 line-clamp-2 leading-comfort tracking-comfort ${descText}`}>
            {prompt.content}
          </div>
          <PromptTags tags={prompt.tags} />
        </div>
        <div className="flex items-center">
          <div
            className={`
              inline-flex items-center justify-center gap-1.5 
              px-3 py-1.5 
              border 
              transition-all duration-200 
              shadow-sm 
              ${badgeBg} 
              text-xs font-medium 
              tracking-tight 
              ${badgeText}
            `}
          >
            <IconComponent className={`h-3.5 w-3.5 mr-1 ${badgeText}`} />
            <span>{prompt.category}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
