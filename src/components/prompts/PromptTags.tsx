import React from "react";
import { Tag } from "@/lib/types";
import { PromptTag } from "./PromptTag";
import { usePrompts } from "@/context/PromptContext";

interface PromptTagsProps {
  tags: Tag[];
}

export function PromptTags({ tags }: PromptTagsProps) {
  const { filterOptions, setFilterOptions } = usePrompts();

  const handleTagClick = (tagId: string) => {
    setFilterOptions({
      ...filterOptions,
      selectedTags: filterOptions.selectedTags.includes(tagId)
        ? filterOptions.selectedTags.filter(id => id !== tagId)
        : [...filterOptions.selectedTags, tagId]
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {tags.map((tag) => (
        <PromptTag 
          key={tag.id} 
          {...tag} 
          isSelected={filterOptions.selectedTags.includes(tag.id)}
          onClick={() => handleTagClick(tag.id)}
        />
      ))}
    </div>
  );
}
