import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { usePrompts } from "@/context/PromptContext";
import { useTheme } from "@/context/ThemeContext";
import { toast } from "@/components/ui/sonner";
import { Prompt } from "@/lib/types";
import { LoadingState } from "@/components/prompts/detail/LoadingState";
import { NotFoundState } from "@/components/prompts/detail/NotFoundState";
import { PromptHeader } from "@/components/prompts/detail/PromptHeader";
import { PromptContent } from "@/components/prompts/detail/PromptContent";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";

const PromptDetailsContent = () => {
  const { promptId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { prompts } = usePrompts();
  const { theme, toggleTheme } = useTheme();
  const [matchingPrompt, setMatchingPrompt] = useState<Prompt | undefined>(undefined);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const promptFromState = location.state?.promptData;

  useEffect(() => {
    console.log("========== DEBUG INFO ==========");
    console.log("Current route path:", location.pathname);
    console.log("Current promptId from URL:", promptId);
    console.log("Type of promptId:", typeof promptId);
    console.log("Available prompts count:", prompts.length);
    console.log("First 3 prompts:", prompts.slice(0, 3));
    console.log("Prompt from state:", promptFromState);
    
    if (promptFromState && promptFromState.id === promptId) {
      console.log("Using prompt from navigation state");
      setMatchingPrompt(promptFromState);
      setIsLoading(false);
      return;
    }
    
    if (promptId && prompts.length > 0) {
      let foundPrompt = null;
      
      foundPrompt = prompts.find(p => p.id === promptId);
      
      if (!foundPrompt) {
        foundPrompt = prompts.find(p => String(p.id) === String(promptId));
      }
      
      if (!foundPrompt) {
        foundPrompt = prompts.find(p => 
          String(p.id).toLowerCase() === String(promptId).toLowerCase()
        );
      }
      
      console.log("All available prompt IDs:", prompts.map(p => p.id));
      
      if (foundPrompt) {
        console.log("Found matching prompt:", foundPrompt.id);
        setMatchingPrompt(foundPrompt);
      } else {
        console.log("No matching prompt found with any method");
        setMatchingPrompt(undefined);
      }
    }
    
    setIsLoading(false);
    console.log("==============================");
  }, [promptId, prompts, location.pathname, promptFromState]);

  const copyToClipboard = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      toast.success("Prompt copied to clipboard");
      
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      toast.error("Failed to copy prompt");
    }
  };

  const handleBackToPrompts = () => {
    navigate('/');
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (!matchingPrompt) {
    return <NotFoundState promptId={promptId} onBackClick={handleBackToPrompts} />;
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-background relative">
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
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          <Switch 
            checked={theme === 'light'}
            onCheckedChange={toggleTheme}
          />
        </div>
      </div>
      <div className="max-w-4xl mx-auto space-y-8">
        <PromptHeader
          title={matchingPrompt.title || matchingPrompt.name}
          isCopied={isCopied}
          onCopy={() => copyToClipboard(matchingPrompt.content)}
          onBackClick={handleBackToPrompts}
          content={matchingPrompt.content}
          description={matchingPrompt.description}
          model={matchingPrompt.model}
          modelParameters={matchingPrompt.modelParameters}
          tags={matchingPrompt.tags}
          category={matchingPrompt.category}
        />
        <PromptContent prompt={matchingPrompt} />
      </div>
    </div>
  );
};

const PromptDetails = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <PromptDetailsContent />
      </div>
    </div>
  );
};

export default PromptDetails;
