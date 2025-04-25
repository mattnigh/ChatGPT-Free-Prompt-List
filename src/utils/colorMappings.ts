// Material Design color palette
const MATERIAL_COLORS = {
  indigo: {
    main: '#3F51B5',
    light: '#C5CAE9',
    dark: '#303F9F',
  },
  deepOrange: {
    main: '#FF5722',
    light: '#FFCCBC',
    dark: '#E64A19',
  },
  teal: {
    main: '#009688',
    light: '#B2DFDB',
    dark: '#00796B',
  },
  deepPurple: {
    main: '#673AB7',
    light: '#D1C4E9',
    dark: '#512DA8',
  },
  blueGrey: {
    main: '#607D8B',
    light: '#CFD8DC',
    dark: '#455A64',
  },
  purple: {
    main: '#9C27B0',
    light: '#E1BEE7',
    dark: '#7B1FA2',
  },
  green: {
    main: '#4CAF50',
    light: '#C8E6C9',
    dark: '#388E3C',
  },
  blue: {
    main: '#2196F3',
    light: '#BBDEFB',
    dark: '#1976D2',
  },
  red: {
    main: '#F44336',
    light: '#FFCDD2',
    dark: '#D32F2F',
  },
  pink: {
    main: '#E91E63',
    light: '#F8BBD0',
    dark: '#C2185B',
  },
  cyan: {
    main: '#00BCD4',
    light: '#B2EBF2',
    dark: '#0097A7',
  }
};

// Tag category to color mappings
const TAG_COLOR_MAPPINGS: { [key: string]: keyof typeof MATERIAL_COLORS } = {
  // Development & Technical
  'Development': 'indigo',
  'Code': 'indigo',
  'Technical': 'indigo',
  'Programming': 'indigo',
  'Backend': 'deepPurple',
  'Frontend': 'purple',
  'API': 'teal',
  'Database': 'blueGrey',
  
  // AI & ML
  'AI': 'deepPurple',
  'AI Workflows': 'deepPurple',
  'Machine Learning': 'purple',
  'ChatGPT': 'teal',
  'Claude': 'cyan',
  'Gemini': 'blue',
  'GPT-4': 'deepPurple',
  'LLM': 'purple',
  
  // Content & Writing
  'Writing': 'deepOrange',
  'Content': 'deepOrange',
  'Documentation': 'blueGrey',
  'Blog': 'pink',
  'Article': 'pink',
  
  // Vibe Coding
  'Vibe Coding': 'pink',
  'Music': 'pink',
  'Creative': 'deepPurple',
  
  // Analysis & Data
  'Analysis': 'teal',
  'Data': 'cyan',
  'Analytics': 'blue',
  'Research': 'indigo',
  'Testing': 'red',
  'QA': 'red',
  
  // Design & UX
  'Design': 'purple',
  'UI': 'deepPurple',
  'UX': 'purple',
  'Interface': 'indigo',
  
  // Business & Marketing
  'Business': 'blueGrey',
  'Marketing': 'pink',
  'SEO': 'green',
  'Growth': 'green',
  
  // Productivity & Tools
  'Productivity': 'blue',
  'Tools': 'blueGrey',
  'Automation': 'cyan',
  'Workflow': 'teal',
  
  // Communication
  'Email': 'red',
  'Communication': 'blue',
  'Social': 'cyan',
  'Chat': 'teal',
  
  // Other common categories
  'Ideas': 'deepOrange',
  'Tips': 'green',
  'Guide': 'blue',
  'Tutorial': 'indigo',
  'Best Practices': 'teal',
  'Examples': 'purple',
  'Resources': 'blueGrey',
};

export function getTagColor(tagName: string): string {
  // Try to find a direct mapping
  const colorKey = TAG_COLOR_MAPPINGS[tagName];
  if (colorKey) {
    return MATERIAL_COLORS[colorKey].main;
  }

  // If no direct mapping, generate a consistent color based on the tag name
  const colorKeys = Object.keys(MATERIAL_COLORS) as (keyof typeof MATERIAL_COLORS)[];
  const index = Math.abs(hashString(tagName)) % colorKeys.length;
  return MATERIAL_COLORS[colorKeys[index]].main;
}

export function getTagHoverColor(tagName: string): string {
  const colorKey = TAG_COLOR_MAPPINGS[tagName];
  if (colorKey) {
    return MATERIAL_COLORS[colorKey].dark;
  }

  const colorKeys = Object.keys(MATERIAL_COLORS) as (keyof typeof MATERIAL_COLORS)[];
  const index = Math.abs(hashString(tagName)) % colorKeys.length;
  return MATERIAL_COLORS[colorKeys[index]].dark;
}

export function getTagLightColor(tagName: string): string {
  const colorKey = TAG_COLOR_MAPPINGS[tagName];
  if (colorKey) {
    return MATERIAL_COLORS[colorKey].light;
  }

  const colorKeys = Object.keys(MATERIAL_COLORS) as (keyof typeof MATERIAL_COLORS)[];
  const index = Math.abs(hashString(tagName)) % colorKeys.length;
  return MATERIAL_COLORS[colorKeys[index]].light;
}

// Simple string hashing function for consistent color selection
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash;
}

// Function to determine if text should be dark or light based on background color
export function shouldUseDarkText(backgroundColor: string): boolean {
  // Remove any leading # if present
  const hex = backgroundColor.charAt(0) === '#' ? backgroundColor.substring(1) : backgroundColor;
  
  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Calculate relative luminance using the WCAG formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return true if the background is light (should use dark text)
  return luminance > 0.6;
}
