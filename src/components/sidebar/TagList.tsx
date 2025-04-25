import React, { useState } from "react";
import { usePrompts } from "@/context/PromptContext";
import { Tag as TagIcon, Search, ChevronUp, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useTheme } from "@/context/ThemeContext";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { PromptTag } from "../prompts/PromptTag";
import { useLocation } from "react-router-dom";

const TagList = () => {
  const { tags, filterOptions, setFilterOptions } = usePrompts();
  const [isOpen, setIsOpen] = useState(true);
  const { theme } = useTheme();
  const [tagSearch, setTagSearch] = useState("");
  const location = useLocation();
  
  // Check if we're on the prompting guide page
  const isPromptingGuidePage = location.pathname === "/prompting-guide";
  
  const sortedTags = [...tags]
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter(tag => tag.name.toLowerCase().includes(tagSearch.toLowerCase()));

  const toggleTag = (tagId: string) => {
    setFilterOptions({
      ...filterOptions,
      selectedTags: filterOptions.selectedTags.includes(tagId)
        ? filterOptions.selectedTags.filter((id) => id !== tagId)
        : [...filterOptions.selectedTags, tagId],
    });
  };

  const clearAllTags = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFilterOptions({
      ...filterOptions,
      selectedTags: [],
    });
  };

  return (
    <div>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-1.5 mb-2 text-sm font-semibold uppercase tracking-wider text-github-text/70">
          <span className="flex items-center">
            <TagIcon className="h-4 w-4 mr-1.5 text-github-text/50" />
            Tags
            {isOpen ? (
              <ChevronUp className="h-4 w-4 ml-1.5 text-github-text/50" />
            ) : (
              <ChevronDown className="h-4 w-4 ml-1.5 text-github-text/50" />
            )}
          </span>
          <div className="flex items-center space-x-2">
            {filterOptions.selectedTags.length > 0 && !isPromptingGuidePage && (
              <button 
                onClick={clearAllTags} 
                className="text-sm text-blue-500 hover:underline"
              >
                Clear
              </button>
            )}
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="px-1 py-1">
            <div className="relative px-1 py-1">
              <Input
                value={tagSearch}
                onChange={(e) => setTagSearch(e.target.value)}
                placeholder="Filter tags..."
                className="h-9 text-sm bg-transparent"
              />
              <Search className="absolute right-3 top-3 h-4 w-4 text-github-text/30" />
            </div>
            <div className="flex flex-wrap gap-2 mt-2 pb-2">
              {sortedTags.map((tag) => (
                <PromptTag
                  key={tag.id}
                  {...tag}
                  isSelected={!isPromptingGuidePage && filterOptions.selectedTags.includes(tag.id)}
                  onClick={() => toggleTag(tag.id)}
                />
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

// Helper function to determine if a color is dark
// This will help choose text color (white or dark gray) based on background color
function isDarkColor(color: string): boolean {
  // Remove any leading # if present
  const hex = color.charAt(0) === '#' ? color.substring(1) : color;
  
  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Calculate brightness (using relative luminance formula)
  // Values closer to 0 are darker, values closer to 255 are brighter
  const brightness = (r * 0.299 + g * 0.587 + b * 0.114);
  
  // Return true if the color is dark (adjust threshold as needed)
  return brightness < 160;
}

export default TagList;
