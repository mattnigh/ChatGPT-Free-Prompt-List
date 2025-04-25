import React from "react";
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface PromptTitleProps {
  title: string;
  onCopy: () => void;
  onDownload: (e: React.MouseEvent) => void;
  className?: string;
}

export function PromptTitle({ title, onCopy, onDownload, className }: PromptTitleProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="flex items-center mb-3 relative">
      <div className="flex items-center flex-grow max-w-[70%]">
        <Button 
          variant="ghost" 
          size="icon"
          className="h-7 w-7 rounded-full text-github-text/60 hover:text-white hover:bg-indigo-500 transition-all duration-200"
          onClick={onCopy}
        >
          <Copy className="h-3.5 w-3.5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className="h-7 w-7 mr-3 rounded-full text-github-text/60 hover:text-white hover:bg-purple-500 transition-all duration-200"
          onClick={onDownload}
        >
          <Download className="h-3.5 w-3.5" />
        </Button>
        <h3 className={`font-semibold text-lg tracking-tight truncate leading-snug pr-4
          ${isDark 
            ? 'group-hover:from-indigo-400 group-hover:to-purple-500' 
            : 'group-hover:from-indigo-600 group-hover:to-purple-700'} 
          group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:text-transparent group-hover:scale-105 origin-left
          transition-all duration-300 ${className || ''}`}>
          {title}
        </h3>
      </div>
      <div className="flex items-center gap-3 absolute right-0">
        <span className="text-sm text-github-text/50 transition-opacity tracking-comfort hidden group-hover:inline-block">
          {title.toLowerCase().replace(/\s+/g, '-')}.prompt.yml
        </span>
      </div>
    </div>
  );
}
