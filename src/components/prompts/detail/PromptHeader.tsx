
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy, CopyCheck, Download } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface PromptHeaderProps {
  title: string;
  isCopied: boolean;
  onCopy: () => void;
  onBackClick: () => void;
  // Additional props to enable download functionality
  content: string;
  description?: string;
  model?: string;
  modelParameters?: Record<string, any>;
  tags?: { name: string }[];
  category?: string;
}

export const PromptHeader = ({
  title,
  isCopied,
  onCopy,
  onBackClick,
  content,
  description,
  model,
  modelParameters,
  tags,
  category,
}: PromptHeaderProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Download handler
  const handleDownload = () => {
    // Create YAML frontmatter from props
    const yamlLines = [
      "---",
      `name: ${title || ""}`,
      `description: ${description || ""}`,
      `model: ${model || ""}`,
      modelParameters
        ? [
            "modelParameters:",
            ...Object.keys(modelParameters).map(
              (key) => `  ${key}: ${modelParameters[key]}`
            ),
          ].join("\n")
        : "",
      `tags:${tags && tags.length > 0 ? "" : " []"}`,
      ...(tags && tags.length > 0
        ? tags.map((tag) => `  - ${tag.name}`)
        : []),
      `category: ${category || ""}`,
      "---",
      content || "",
    ];

    const fileContent = yamlLines.filter(Boolean).join("\n") + "\n";
    const filename =
      (title?.toLowerCase().replace(/\s+/g, "-") || "prompt") +
      ".prompt.yml";
    const blob = new Blob([fileContent], { type: "text/yaml" });

    // Create temporary link to trigger download
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
    link.remove();
  };

  return (
    <div>
      <Button 
        variant="ghost" 
        className="mb-6 text-github-text/70 hover:text-github-text font-inter flex items-center gap-2 transition-all duration-200 hover:translate-x-[-2px]"
        onClick={onBackClick}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to prompts
      </Button>
    
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className={`
            h-10 w-10 rounded-full
            ${isCopied 
              ? 'text-green-500 hover:text-green-600 hover:bg-green-100/20' 
              : `text-github-text/60 hover:text-white ${isDark ? 'hover:bg-indigo-500' : 'hover:bg-indigo-600'}`}
            transition-all duration-300 ease-in-out
            transform hover:scale-110
            focus:outline-none focus:ring-2 focus:ring-github-button/50
            shadow-sm hover:shadow-md
          `}
          onClick={onCopy}
        >
          {isCopied ? <CopyCheck className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={`
            h-10 w-10 rounded-full
            text-github-text/60 hover:text-white ${isDark ? 'hover:bg-purple-500' : 'hover:bg-purple-600'}
            transition-all duration-300 ease-in-out
            transform hover:scale-110
            focus:outline-none focus:ring-2 focus:ring-github-button/50
            shadow-sm hover:shadow-md
          `}
          onClick={handleDownload}
          aria-label="Download prompt as YAML"
        >
          <Download className="h-5 w-5" />
        </Button>
        <h1 className={`text-3xl font-semibold tracking-tight text-github-text transition-all duration-300 
          hover:bg-gradient-to-r ${isDark 
            ? 'hover:from-indigo-300 hover:via-purple-400 hover:to-pink-400' 
            : 'hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600'} 
          hover:bg-clip-text hover:text-transparent font-inter`}>
          {title}
        </h1>
      </div>
    </div>
  );
};
