import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import PromptList from "@/components/PromptList";
import { usePrompts } from "@/context/PromptContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Switch } from "@/components/ui/switch";

// Helper function to convert slug to category name
const slugToCategory = (slug: string): string => {
  const categoryMap: Record<string, string> = {
    "ai-workflows": "AI Workflows",
    "analysis-data": "Analysis/Data",
    "brainstorming": "Brainstorming",
    "deep-research": "Deep Research",
    "development": "Development",
    "documentation": "Documentation",
    "images": "Images",
    "program-management": "Program Management",
    "social-media": "Social Media",
    "vibe-coding": "Vibe Coding",
    "writing": "Writing"
  };
  
  return categoryMap[slug] || "";
};

const CategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const { theme, toggleTheme } = useTheme();
  const { filterOptions, setFilterOptions } = usePrompts();
  
  useEffect(() => {
    if (categorySlug) {
      const categoryName = slugToCategory(categorySlug);
      if (categoryName) {
        // Always update the selected category when the slug changes
        setFilterOptions({
          ...filterOptions,
          selectedCategory: categoryName,
          isTopPrompts: false,
        });
      }
    }
  }, [categorySlug, setFilterOptions, filterOptions]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 relative bg-background">
          <div className="absolute top-4 right-4 z-50 flex items-center space-x-4">
            <a 
              href="https://github.com/mattnigh/ChatGPT-Free-Prompt-List" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <img 
                src="https://img.shields.io/github/stars/mattnigh/ChatGPT-Free-Prompt-List?style=social" 
                alt="GitHub Stars" 
                className="h-8"
              />
            </a>
            <div className="flex items-center space-x-2">
              {theme === 'dark' ? <Sun className="h-5 w-5 text-github-text" /> : <Moon className="h-5 w-5 text-github-text" />}
              <Switch 
                checked={theme === 'light'}
                onCheckedChange={toggleTheme}
                className="scale-125"
              />
            </div>
          </div>
          <PromptList />
        </div>
      </div>
      <div className="absolute bottom-4 right-4 z-50">
        {/* Error popup will show if there are any loading issues */}
        <div id="promptLoadingErrors" className="hidden">
          <Alert variant="destructive" className="w-96">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertDescription>
              Unable to load prompts. Please check your network connection or try again later.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage; 