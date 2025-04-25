
import { useState } from "react";
import { Prompt } from "@/lib/types";

export type SortConfig = {
  field: string;
  direction: "asc" | "desc";
};

export const usePromptFiltering = (prompts: Prompt[]) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: "title",
    direction: "asc"
  });

  const handleSort = (field: string) => {
    setSortConfig(prev => ({
      field,
      direction: prev.field === field ? prev.direction : 'asc'
    }));
  };

  const toggleSortDirection = () => {
    setSortConfig(prev => ({
      ...prev,
      direction: prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const sortedPrompts = [...prompts].sort((a, b) => {
    const direction = sortConfig.direction === 'asc' ? 1 : -1;
    switch (sortConfig.field) {
      case 'category':
        return (a.category?.localeCompare(b.category ?? '') ?? 0) * direction;
      case 'title':
        return a.title.localeCompare(b.title) * direction;
      case 'tags':
        return ((a.tags[0]?.name ?? '').localeCompare(b.tags[0]?.name ?? '') ?? 0) * direction;
      default:
        return 0;
    }
  });

  return {
    sortConfig,
    handleSort,
    toggleSortDirection,
    sortedPrompts
  };
};
