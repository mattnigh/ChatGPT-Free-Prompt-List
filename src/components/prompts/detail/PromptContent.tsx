import React from "react";
import { PromptTags } from "@/components/prompts/PromptTags";
import { Prompt } from "@/lib/types";
import { ChartBar, Code, FileText, Image, Instagram, Pencil, Calendar } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Card } from "@/components/ui/card";

export const categoryIcons: { [key: string]: React.ComponentType } = {
  "Analysis/Data": ChartBar,
  "Development": Code,
  "Documentation": FileText,
  "Images": Image,
  "Program Management": Calendar,
  "Social Media": Instagram,
  "Writing": Pencil,
};

interface PromptContentProps {
  prompt: Prompt;
}

export const PromptContent = ({ prompt }: PromptContentProps) => {
  const IconComponent = categoryIcons[prompt.category] || FileText;
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Animation classes for content entrance
  const fadeInClasses = "animate-fade-in opacity-0";

  return (
    <div className="space-y-8">
      <div className={`flex items-center gap-3 ${fadeInClasses}`} style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
        <div className={`inline-flex items-center gap-2 px-3 py-2 
          ${isDark ? 'bg-github-button/40' : 'bg-github-button/20'} 
          border border-github-border/30 shadow-sm`}>
          <IconComponent className="h-4 w-4 text-github-text/80" />
          <span className="text-sm font-medium text-github-text/80">{prompt.category}</span>
        </div>
      </div>

      <Card className={`overflow-hidden ${fadeInClasses}`} style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
        <div className={`px-1 py-1 ${isDark ? 'bg-github-button/40' : 'bg-github-button/20'} border-b border-github-border/20`}>
          <h2 className="text-lg font-medium tracking-tight text-github-text/90 px-5 py-3 font-inter">Prompt Content</h2>
        </div>
        <div className={`p-6 ${isDark ? 'bg-background' : 'bg-white'}`}>
          <pre className="whitespace-pre-wrap text-github-text font-mono text-sm leading-relaxed">
            {prompt.content || prompt.messages?.[1]?.content}
          </pre>
        </div>
      </Card>

      <div className={fadeInClasses} style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
        <h2 className="text-lg font-medium tracking-tight text-github-text/90 mb-4 font-inter">Tags</h2>
        <PromptTags tags={prompt.tags} />
      </div>
    </div>
  );
};
