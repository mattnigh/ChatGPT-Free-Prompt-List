export type Tag = {
  id: string;
  name: string;
};

export type ModelParameters = {
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
};

export type Message = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export type TestData = {
  input: string;
  expected: string;
};

export type Prompt = {
  id: string;
  name: string;
  description: string;
  model: string;
  modelParameters: ModelParameters;
  messages: Message[];
  testData?: TestData[];
  tags: Tag[];
  category: string;
  createdAt: Date;
  updatedAt: Date;
  // Add the missing properties that are used in the components
  title: string;
  content: string;
};

export interface FilterOptions {
  searchQuery: string;
  selectedTags: string[];
  isTopPrompts?: boolean; // New property to track if we're viewing top prompts
  selectedCategory?: string; // New property to track selected category
}
