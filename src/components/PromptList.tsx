import React, { useEffect, useState } from "react";
import { usePrompts } from "@/context/PromptContext";
import { toast } from "@/components/ui/sonner";
import { SearchBar } from "./prompts/SearchBar";
import { FilterControls } from "./prompts/FilterControls";
import { PromptCard } from "./prompts/PromptCard";
import { usePromptFiltering } from "@/hooks/usePromptFiltering";
import { useTheme } from "@/context/ThemeContext";
import { PromptCardSkeleton } from "./prompts/PromptCardSkeleton";
import { PromptListError } from "./prompts/PromptListError";
import { PromptListEmpty } from "./prompts/PromptListEmpty";
import { Button } from "@/components/ui/button";

const CARD_PLACEHOLDER_COUNT = 5;

const PromptList = () => {
  const { filteredPrompts, filterOptions, setFilterOptions, tags, error } = usePrompts();
  const { sortConfig, handleSort, toggleSortDirection, sortedPrompts } = usePromptFiltering(filteredPrompts || []);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isRetrying, setIsRetrying] = useState(false);

  // --- Loading state ---
  const [isLoading, setIsLoading] = useState(true);

  // When filteredPrompts is undefined/null or changes, treat as loading.
  useEffect(() => {
    setIsLoading(filteredPrompts == null);
  }, [filteredPrompts]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterOptions({
      ...filterOptions,
      searchQuery: e.target.value,
    });
  };

  const copyToClipboard = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success("Prompt copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy prompt");
    }
  };

  const handleTagSelect = (tagId: string) => {
    setFilterOptions({
      ...filterOptions,
      selectedTags: filterOptions.selectedTags.includes(tagId)
        ? filterOptions.selectedTags.filter(id => id !== tagId)
        : [...filterOptions.selectedTags, tagId]
    });
  };

  const handleClearAllTags = () => {
    setFilterOptions({
      ...filterOptions,
      selectedTags: []
    });
  };

  const handleRetry = () => {
    setIsRetrying(true);
    window.location.reload();
  };

  if (error) {
    return <PromptListError error={error} isRetrying={isRetrying} onRetry={handleRetry} />;
  }

  return (
    <div className="flex-1 overflow-hidden flex flex-col h-full bg-background">
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-1 text-github-text">All prompts</h1>
        <p className="text-base text-github-text opacity-70 mb-4">
          Showing prompts from your library
        </p>
        <div className="flex items-center space-x-2 mb-4">
          <SearchBar 
            searchQuery={filterOptions.searchQuery}
            onSearchChange={handleSearchChange}
          />
          <FilterControls
            tags={tags}
            selectedTags={filterOptions.selectedTags}
            onTagSelect={handleTagSelect}
            sortConfig={sortConfig}
            onSortFieldChange={handleSort}
            onSortDirectionToggle={toggleSortDirection}
            onClearAllTags={handleClearAllTags}
          />
        </div>
        <div className={`px-3 py-2 rounded-md ${isDark ? 'bg-github-button/30' : 'bg-github-button/20'} text-sm text-github-text mb-2 flex justify-between items-center`}>
          <div>
            <span className="font-medium">{filteredPrompts ? filteredPrompts.length : 0} prompt{(!filteredPrompts || filteredPrompts.length !== 1) ? 's' : ''}</span> in your library
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto bg-background px-4 pb-4">
        {isLoading ? (
          <div className="grid gap-2 animate-fade-in">
            {Array.from({ length: CARD_PLACEHOLDER_COUNT }).map((_, i) => (
              <PromptCardSkeleton isDark={isDark} key={i} />
            ))}
          </div>
        ) : sortedPrompts && sortedPrompts.length > 0 ? (
          <div className="grid gap-2">
            {sortedPrompts.map((prompt, index) => (
              <PromptCard
                key={prompt.id}
                prompt={prompt}
                onCopy={copyToClipboard}
                index={index}
              />
            ))}
          </div>
        ) : (
          <PromptListEmpty />
        )}
      </div>
    </div>
  );
}

export default PromptList;
