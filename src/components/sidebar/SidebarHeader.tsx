import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";

const SidebarHeader = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  
  return (
    <div className="flex justify-between items-center pb-2">
      <Link 
        to="/" 
        className={`text-2xl font-bold hover:opacity-80 transition-opacity ${
          isLight ? 'text-gray-800' : 'text-sidebar-foreground'
        }`}
      >
        PromptBin
      </Link>
    </div>
  );
};

export default SidebarHeader;
