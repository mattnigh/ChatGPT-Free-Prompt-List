import React from "react";
import { List, Star, BookOpen, User } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { usePrompts } from "@/context/PromptContext";
import { cn } from "@/lib/utils";
import { Link, useNavigate, useLocation } from "react-router-dom";

const NavigationLinks = () => {
  const { theme } = useTheme();
  const { filterOptions, setFilterOptions } = usePrompts();
  const isLight = theme === 'light';
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if we're truly on the "All prompts" view (no categories or filters active)
  const isAllPromptsActive = !filterOptions.isTopPrompts && 
                             !filterOptions.selectedCategory && 
                             filterOptions.selectedTags.length === 0 &&
                             !filterOptions.searchQuery &&
                             location.pathname === "/";
  
  // Check if we're on the prompting guide page
  const isPromptingGuideActive = location.pathname === "/prompting-guide";
  
  // Handle click on "All prompts" link
  const handleAllPromptsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Reset all filters to their default state
    setFilterOptions({
      isTopPrompts: false,
      selectedTags: [], // Clear any selected tags
      selectedCategory: "", // Clear selected category
      searchQuery: "", // Clear search query
    });
    navigate('/');
  };
  
  // Handle click on "Top Prompts" link
  const handleTopPromptsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setFilterOptions({
      ...filterOptions,
      isTopPrompts: true,
      selectedTags: [] // Clear any selected tags when switching views
    });
    navigate('/');
  };

  return (
    <div className="space-y-1">
      <Link 
        to="/"
        onClick={handleAllPromptsClick}
        className={cn(
          "flex items-center py-2 px-3 rounded-md transition-colors duration-150 group", 
          "font-medium text-base", 
          isAllPromptsActive && !isPromptingGuideActive
            ? (isLight ? "bg-white text-black shadow-sm" : "bg-github-button text-github-text") 
            : (isLight ? "text-gray-700 hover:bg-white hover:shadow-sm" : "text-github-text hover:bg-github-button")
        )}
      >
        <List className="mr-3 w-5 h-5" />
        <span>All prompts</span>
      </Link>
      
      <Link 
        to="/prompting-guide"
        className={cn(
          "flex items-center py-2 px-3 rounded-md transition-colors duration-150 group", 
          "font-medium text-base", 
          isPromptingGuideActive 
            ? (isLight ? "bg-white text-black shadow-sm" : "bg-github-button text-github-text") 
            : (isLight ? "text-gray-700 hover:bg-white hover:shadow-sm" : "text-github-text hover:bg-github-button")
        )}
      >
        <BookOpen className="mr-3 w-5 h-5" />
        <span>Prompting guide</span>
      </Link>
      
      <a 
        href="https://www.mattnigh.net/"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "flex items-center py-2 px-3 rounded-md transition-colors duration-150 group", 
          "font-medium text-base", 
          isLight ? "text-gray-700 hover:bg-white hover:shadow-sm" : "text-github-text hover:bg-github-button"
        )}
      >
        <User className="mr-3 w-5 h-5" />
        <span>Meet the dev</span>
      </a>
    </div>
  );
};

export default NavigationLinks;
