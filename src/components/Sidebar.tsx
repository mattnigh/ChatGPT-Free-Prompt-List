import React, { useState } from "react";
import SidebarHeader from "./sidebar/SidebarHeader";
import NavigationLinks from "./sidebar/NavigationLinks";
import Categories from "./sidebar/Categories";
import TagList from "./sidebar/TagList";
import { useTheme } from "@/context/ThemeContext";

const Sidebar = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <aside className="w-96 h-full border-r border-github-border transition-colors duration-200 bg-sidebar-background flex flex-col">
      <div className="flex flex-col h-full">
        <div className="p-4 pb-2">
          <SidebarHeader />
        </div>
        
        <div className="px-2 pt-1 pb-3">
          <NavigationLinks />
        </div>
        
        <div className="px-4 py-2">
          <div className="h-px bg-github-border/50" />
        </div>
        
        <div className="px-2 py-2">
          <Categories />
        </div>
        
        <div className="px-4 py-2">
          <div className="h-px bg-github-border/50" />
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="px-2 py-2">
            <TagList />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
