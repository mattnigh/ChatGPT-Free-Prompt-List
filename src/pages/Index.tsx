import React from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import PromptList from "@/components/PromptList";
import { PromptProvider } from "@/context/PromptContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import { Switch } from "@/components/ui/switch";

const Index = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <PromptProvider>
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
    </PromptProvider>
  );
};

export default Index;
