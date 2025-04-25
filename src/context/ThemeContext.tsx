
import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize theme from localStorage or default to dark
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme === 'light' ? 'light' : 'dark';
  });

  // Apply theme class to document element on mount and when theme changes
  useEffect(() => {
    // Remove both theme classes first
    document.documentElement.classList.remove('dark-mode', 'light-mode');
    // Then add the current theme class
    document.documentElement.classList.add(`${theme}-mode`);
    
    // Save theme preference
    localStorage.setItem('theme', theme);
    
    console.log('Theme changed to:', theme);
    console.log('Classes on documentElement:', document.documentElement.className);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
      console.log('Toggling theme from', prevTheme, 'to', newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
