import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { Prompt, Tag, FilterOptions } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";
import { loadPrompts } from "@/utils/promptLoader";

interface PromptContextType {
  prompts: Prompt[];
  tags: Tag[];
  filteredPrompts: Prompt[];
  filterOptions: FilterOptions;
  error: Error | null;
  addPrompt: (name: string, description: string, content: string, tags: Tag[], category?: string) => void;
  updatePrompt: (id: string, name: string, description: string, content: string, tags: Tag[]) => void;
  deletePrompt: (id: string) => void;
  addTag: (name: string) => Tag;
  setFilterOptions: (options: FilterOptions) => void;
}

const PromptContext = createContext<PromptContextType | undefined>(undefined);

export const PromptProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    searchQuery: "",
    selectedTags: [],
    isTopPrompts: false,
    selectedCategory: "",
  });
  const [filteredPrompts, setFilteredPrompts] = useState<Prompt[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadInitialPrompts = async () => {
      try {
        const loadedPrompts = await loadPrompts();
        setPrompts(loadedPrompts);
        
        // Extract unique tags from loaded prompts
        const uniqueTags = new Map<string, Tag>();
        loadedPrompts.forEach(prompt => {
          prompt.tags.forEach(tag => {
            if (!uniqueTags.has(tag.name)) {
              uniqueTags.set(tag.name, tag);
            }
          });
        });
        
        setTags(Array.from(uniqueTags.values()));
        setError(null);
      } catch (err) {
        console.error('Error loading prompts:', err);
        setError(err instanceof Error ? err : new Error('Failed to load prompts'));
        setPrompts([]);
        setTags([]);
      }
    };
    
    loadInitialPrompts();
  }, []);

  useEffect(() => {
    let filtered = [...prompts];
    
    // Filter by top prompts (for now, consider top 5 newest prompts as "top")
    if (filterOptions.isTopPrompts) {
      // Sort by date (newest first) and take first 5
      filtered = [...filtered]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);
    } else {
      // If not top prompts, apply other filters
      
      // Filter by search query
      if (filterOptions.searchQuery) {
        const query = filterOptions.searchQuery.toLowerCase();
        filtered = filtered.filter(
          prompt => 
            prompt.name.toLowerCase().includes(query) || 
            prompt.description.toLowerCase().includes(query) ||
            (prompt.content && prompt.content.toLowerCase().includes(query))
        );
      }
      
      // Filter by selected category
      if (filterOptions.selectedCategory) {
        filtered = filtered.filter(prompt => 
          (prompt.category || '').toLowerCase() === filterOptions.selectedCategory.toLowerCase()
        );
      }
      
      // Filter by selected tags
      if (filterOptions.selectedTags.length > 0) {
        filtered = filtered.filter(prompt => 
          prompt.tags.some(tag => filterOptions.selectedTags.includes(tag.id))
        );
      }
    }
    
    setFilteredPrompts(filtered);
  }, [filterOptions, prompts]);

  const addPrompt = (name: string, description: string, content: string, tags: Tag[], category: string = "Personal") => {
    const newPrompt: Prompt = {
      id: uuidv4(),
      name,
      description,
      model: "gpt-4",
      modelParameters: {
        temperature: 0.7
      },
      messages: [
        {
          role: "system",
          content: description
        },
        {
          role: "user",
          content: content
        }
      ],
      testData: [],
      tags,
      category,
      createdAt: new Date(),
      updatedAt: new Date(),
      title: name,
      content: content
    };
    setPrompts([newPrompt, ...prompts]);
  };

  const updatePrompt = (id: string, name: string, description: string, content: string, tags: Tag[]) => {
    setPrompts(prompts.map(prompt => 
      prompt.id === id 
        ? { 
            ...prompt, 
            name,
            description,
            messages: [
              {
                role: "system",
                content: description
              },
              {
                role: "user",
                content: content
              }
            ],
            tags,
            updatedAt: new Date(),
            title: name,
            content: content
          } 
        : prompt
    ));
  };

  const deletePrompt = (id: string) => {
    setPrompts(prompts.filter(prompt => prompt.id !== id));
  };

  const addTag = (name: string) => {
    const newTag = { id: uuidv4(), name };
    setTags([...tags, newTag]);
    return newTag;
  };

  return (
    <PromptContext.Provider 
      value={{ 
        prompts, 
        tags, 
        filteredPrompts, 
        filterOptions,
        error, 
        addPrompt, 
        updatePrompt, 
        deletePrompt, 
        addTag, 
        setFilterOptions 
      }}
    >
      {children}
    </PromptContext.Provider>
  );
};

export const usePrompts = (): PromptContextType => {
  const context = useContext(PromptContext);
  if (context === undefined) {
    throw new Error("usePrompts must be used within a PromptProvider");
  }
  return context;
};
