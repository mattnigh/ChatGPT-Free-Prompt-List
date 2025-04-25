import React from "react";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/context/ThemeContext";
import { getTagColor, shouldUseDarkText } from "@/utils/colorMappings";
import { cn } from "@/lib/utils";

interface PromptTagProps {
  name: string;
  id: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export function PromptTag({ name, id, isSelected, onClick }: PromptTagProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const backgroundColor = getTagColor(name);
  const shouldUseDark = shouldUseDarkText(backgroundColor);
  
  return (
    <Badge
      key={id}
      variant="custom"
      onClick={onClick}
      className={cn(
        "text-sm font-medium py-1.5 px-3",
        "transition-all duration-200 ease-in-out",
        "rounded-full cursor-pointer select-none",
        "hover:brightness-125 hover:saturate-150",
        isSelected ? "opacity-100 brightness-125 saturate-150" : "",
        shouldUseDark ? "text-gray-800" : "text-white",
      )}
      style={{
        backgroundColor,
      } as React.CSSProperties}
    >
      {name}
    </Badge>
  );
}
