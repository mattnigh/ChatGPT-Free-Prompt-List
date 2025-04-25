import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowUp, ArrowDown, X, Search } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tag } from "@/lib/types";
import { getTagColor } from "@/utils/colorMappings";
import { SortConfig } from "@/hooks/usePromptFiltering";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/context/ThemeContext";

interface FilterControlsProps {
  tags: Tag[];
  selectedTags: string[];
  onTagSelect: (tagId: string) => void;
  sortConfig: SortConfig;
  onSortFieldChange: (field: string) => void;
  onSortDirectionToggle: () => void;
  onClearAllTags?: () => void;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  tags,
  selectedTags,
  onTagSelect,
  sortConfig,
  onSortFieldChange,
  onSortDirectionToggle,
  onClearAllTags,
}) => {
  const [tagFilter, setTagFilter] = useState("");
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const clearFilters = () => {
    if (onClearAllTags) {
      onClearAllTags();
    }
  };

  // Sort tags alphabetically and filter by search term
  const filteredTags = [...tags]
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter(tag => tag.name.toLowerCase().includes(tagFilter.toLowerCase()));

  return (
    <div className="flex items-center space-x-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="text-xs border-github-border bg-github-button text-github-text hover:bg-github-border flex items-center"
          >
            Filter by tags
            {selectedTags.length > 0 && (
              <span className="ml-2 bg-github-darker rounded-full px-2 py-0.5 text-xs">
                {selectedTags.length}
              </span>
            )}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="ml-2">
              <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z"></path>
            </svg>
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-56 p-2 
          bg-white dark:bg-[#1A1F2C] 
          border border-github-border/30 
          rounded-md 
          shadow-lg"
        >
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {/* Search filter for tags */}
            <div className="relative mb-2 sticky top-0 z-10 bg-white dark:bg-[#1A1F2C] pb-2">
              <Input
                value={tagFilter}
                onChange={(e) => setTagFilter(e.target.value)}
                placeholder="Search tags..."
                className={`h-8 text-xs border-github-border text-github-text ${
                  isDark ? 'bg-[#2D3343] placeholder:text-github-text/50' : 'bg-github-button/30'
                }`}
              />
              <Search className="absolute right-2 top-2 h-4 w-4 text-github-text/50" />
            </div>
            
            {selectedTags.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start text-xs text-github-text hover:bg-github-button mb-2 border-b border-github-border pb-2 sticky top-[44px] bg-white dark:bg-[#1A1F2C]"
                onClick={clearFilters}
              >
                <X className="h-4 w-4 mr-2" />
                Clear all filters
              </Button>
            )}
            
            {filteredTags.length > 0 ? (
              filteredTags.map((tag) => (
                <div
                  key={tag.id}
                  className="flex items-center space-x-2 px-2 py-1 
                    rounded hover:bg-github-button/50 
                    cursor-pointer transition-colors duration-200"
                  onClick={() => onTagSelect(tag.id)}
                >
                  <div className="flex-1 flex items-center space-x-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: getTagColor(tag.name) }}
                    />
                    <span className="text-sm text-github-text">{tag.name}</span>
                  </div>
                  {selectedTags.includes(tag.id) && (
                    <Check className="h-4 w-4 text-github-text" />
                  )}
                </div>
              ))
            ) : (
              <div className="text-sm text-github-text/70 text-center py-2">
                No tags found
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="text-xs border-github-border bg-github-button text-github-text hover:bg-github-border"
          >
            Sort by {sortConfig.field}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="ml-2">
              <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z"></path>
            </svg>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="
            bg-white dark:bg-[#1A1F2C] 
            border border-github-border/30 
            text-github-text 
            rounded-md 
            shadow-lg 
            overflow-hidden"
        >
          <DropdownMenuItem 
            className="
              hover:bg-github-button/50 
              cursor-pointer 
              transition-colors 
              duration-200 
              px-4 py-2"
            onClick={() => onSortFieldChange('category')}
          >
            Category
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="
              hover:bg-github-button/50 
              cursor-pointer 
              transition-colors 
              duration-200 
              px-4 py-2"
            onClick={() => onSortFieldChange('tags')}
          >
            Tags
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="
              hover:bg-github-button/50 
              cursor-pointer 
              transition-colors 
              duration-200 
              px-4 py-2"
            onClick={() => onSortFieldChange('title')}
          >
            Title
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="outline"
        size="sm"
        className="text-xs border-github-border bg-github-button text-github-text hover:bg-github-border"
        onClick={onSortDirectionToggle}
      >
        {sortConfig.direction === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
      </Button>
    </div>
  );
};
