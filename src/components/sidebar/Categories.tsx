import React, { useState } from "react";
import { ChartBar, Code, FileText, Image, Instagram, Pencil, ChevronDown, ChevronUp, Music, Cpu, Calendar } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useTheme } from "@/context/ThemeContext"; 
import { usePrompts } from "@/context/PromptContext";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const categories = [
  { name: "AI Workflows", icon: Cpu, slug: "ai-workflows" },
  { name: "Analysis/Data", icon: ChartBar, slug: "analysis-data" },
  { name: "Brainstorming", icon: Pencil, slug: "brainstorming" },
  { name: "Deep Research", icon: ChartBar, slug: "deep-research" },
  { name: "Development", icon: Code, slug: "development" },
  { name: "Documentation", icon: FileText, slug: "documentation" },
  { name: "Images", icon: Image, slug: "images" },
  { name: "Program Management", icon: Calendar, slug: "program-management" },
  { name: "Social Media", icon: Instagram, slug: "social-media" },
  { name: "Vibe Coding", icon: Music, slug: "vibe-coding" },
  { name: "Writing", icon: Pencil, slug: "writing" },
];

const Categories = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { theme } = useTheme();
  const { filterOptions } = usePrompts();
  const isLight = theme === 'light';
  const location = useLocation();
  
  // Check if we're on the prompting guide page
  const isPromptingGuidePage = location.pathname === "/prompting-guide";
  
  return (
    <div>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-1.5 mb-2 text-sm font-semibold uppercase tracking-wider text-github-text/70">
          <span className="flex items-center">
            Categories
            {isOpen ? (
              <ChevronUp className="h-4 w-4 ml-1.5 text-github-text/50" />
            ) : (
              <ChevronDown className="h-4 w-4 ml-1.5 text-github-text/50" />
            )}
          </span>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <ul className="space-y-1">
            {categories.map((category) => {
              const Icon = category.icon;
              const isSelected = !isPromptingGuidePage && (
                filterOptions.selectedCategory === category.name ||
                location.pathname === `/category/${category.slug}`
              );
              return (
                <li key={category.name}>
                  <Link
                    to={`/category/${category.slug}`}
                    className={cn(
                      "w-full flex items-center rounded-md py-1.5 px-3 text-left text-base transition-colors duration-150",
                      isSelected
                        ? (isLight ? "bg-white text-black shadow-sm" : "bg-github-button text-github-text")
                        : (isLight ? "text-gray-700 hover:bg-white hover:shadow-sm" : "text-github-text hover:bg-github-button")
                    )}
                  >
                    <Icon className={cn("mr-3 h-5 w-5", isLight ? "opacity-70" : "opacity-80")} />
                    <span className="tracking-wide">{category.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default Categories;
