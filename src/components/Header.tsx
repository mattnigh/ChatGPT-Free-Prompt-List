import React from "react";
import { useTheme } from "@/context/ThemeContext";
const Header = () => {
  const {
    theme
  } = useTheme();
  return <header className="w-full border-b border-github-border">
      
    </header>;
};
export default Header;