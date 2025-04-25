import { parse } from 'yaml';
import { Prompt, Tag } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';

// Array of prompt files we know exist as a fallback
const FALLBACK_PROMPT_FILES = [
  'plain-language-summary.prompt.yml',
  'readme-analysis.prompt.yml',
  'api-doc-summary.prompt.yml',
  'config-extractor.prompt.yml',
  'article-3-sentence-summary.prompt.yml',
  'rfc-purpose-explainer.prompt.yml',
  'changelog-tldr.prompt.yml',
  'issue-thread-summary.prompt.yml',
  'whitepaper-explainer.prompt.yml',
  'onboarding-notes.prompt.yml',
  'steps-and-gaps.prompt.yml',
  'blog-action-summary.prompt.yml',
  'problem-and-solution.prompt.yml',
  'key-terms-extractor.prompt.yml',
  'tutorial-checklist.prompt.yml'
];

// Fetch the manifest of prompt files
const fetchManifest = async (): Promise<string[]> => {
  try {
    // Use the BASE_URL from Vite
    const manifestPath = `${import.meta.env.BASE_URL}prompts/manifest.json`;
    console.log(`🔍 Fetching manifest from: ${manifestPath}`);
    
    const response = await fetch(manifestPath);
    if (!response.ok) {
      console.warn(`Failed to load prompt manifest: ${response.status}. Using fallback file list.`);
      return FALLBACK_PROMPT_FILES;
    }
    const files = await response.json();
    console.log('Loaded manifest with files:', files);
    return files;
  } catch (error) {
    console.warn('Error loading manifest:', error);
    console.log('Using fallback file list:', FALLBACK_PROMPT_FILES);
    return FALLBACK_PROMPT_FILES;
  }
};

export type SimplePrompt = {
  id: string;
  title: string;
  description: string;
  prompt: string;
  tags: Tag[];
  category: string;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Parses a markdown file with YAML frontmatter to extract prompt data
 * The file format should be:
 * ---
 * name: Prompt Name
 * description: Prompt description
 * model: gpt-4
 * modelParameters:
 *   temperature: 0.7
 * tags:
 *   - Tag1
 *   - Tag2
 * category: Category
 * ---
 * The actual prompt content in markdown...
 */
export const parsePromptFile = async (content: string): Promise<Prompt> => {
  // Normalize line endings and trim content
  content = content.replace(/\r\n/g, '\n').trim();
  
  // Preprocess to normalize quotation marks and fix common formatting issues
  content = normalizeQuotationMarks(content);
  
  // Handle the "Unexpected scalar at node end" error by ensuring proper line breaks
  content = fixUnexpectedScalarErrors(content);

  // Split by the first two occurrences of '---' to extract frontmatter
  const parts = content.split(/^---$/m);
  // Remove empty parts and trim remaining parts
  const cleanParts = parts.map(part => part.trim()).filter(Boolean);

  let metadata: Record<string, unknown> = {};
  let promptContent = '';
  let yamlError = null;

  if (cleanParts.length >= 2) {
    const yamlContent = cleanParts[0];
    promptContent = cleanParts[1];
    try {
      // Use more permissive parsing options
      const parseOptions = { 
        strict: false,
        prettyErrors: true
      };
      
      metadata = parse(yamlContent, parseOptions) || {};
    } catch (error) {
      yamlError = error;
      console.warn('YAML parse error:', error);
      
      // Enhanced fallback: try to extract fields with regex
      const titleMatch = yamlContent.match(/title:\s*(.*)/) || yamlContent.match(/name:\s*(.*)/);
      const descMatch = yamlContent.match(/description:\s*(.*)/);
      const categoryMatch = yamlContent.match(/category:\s*(.*)/);
      const tagsMatch = yamlContent.match(/tags:\s*([\s\S]*)/);
      
      // Improved tag extraction that handles various formatting styles
      let tags: string[] = [];
      if (tagsMatch) {
        const tagsContent = tagsMatch[1];
        // Extract tags whether they're in a list format with dashes or just space-separated
        const tagItems = tagsContent.split(/\n\s*-\s*|\s*,\s*/).map(t => t.trim()).filter(Boolean);
        tags = tagItems.map(tag => tag.replace(/^['"]+|['"]+$/g, '')); // Remove quotes if present
      }
      
      metadata = {
        title: titleMatch ? titleMatch[1].trim() : 'Untitled Prompt',
        description: descMatch ? descMatch[1].trim() : '',
        category: categoryMatch ? categoryMatch[1].trim() : 'Uncategorized',
        tags: tags,
        model: 'gpt-4',
        modelParameters: { temperature: 0.3 },
      };
      console.warn('Using fallback extraction for YAML content');
    }
  } else {
    // No valid YAML frontmatter, fallback to extracting from whole content
    const titleMatch = content.match(/title:\s*(.*)/) || content.match(/name:\s*(.*)/);
    const descMatch = content.match(/description:\s*(.*)/);
    const categoryMatch = content.match(/category:\s*(.*)/);
    const tagsMatch = content.match(/tags:\s*([\s\S]*)/);
    promptContent = cleanParts[0] || '';
    
    // Extract tags with improved logic
    let tags: string[] = [];
    if (tagsMatch) {
      const tagsContent = tagsMatch[1];
      const tagItems = tagsContent.split(/\n\s*-\s*|\s*,\s*/).map(t => t.trim()).filter(Boolean);
      tags = tagItems.map(tag => tag.replace(/^['"]+|['"]+$/g, ''));
    }
    
    metadata = {
      title: titleMatch ? titleMatch[1].trim() : 'Untitled Prompt',
      description: descMatch ? descMatch[1].trim() : '',
      category: categoryMatch ? categoryMatch[1].trim() : 'Uncategorized',
      tags: tags,
      model: 'gpt-4',
      modelParameters: { temperature: 0.3 },
    };
    console.warn('No valid YAML frontmatter found, using fallback extraction.');
  }

  // Generate tags from the YAML content
  const tags: Tag[] = (Array.isArray(metadata.tags) ? metadata.tags : []).map((tagName: unknown) => ({
    id: uuidv4(),
    name: String(tagName)
  }));

  // Compose the Prompt object
  return {
    id: uuidv4(),
    name: (metadata.name as string) || (metadata.title as string) || 'Untitled Prompt',
    title: (metadata.title as string) || (metadata.name as string) || 'Untitled Prompt',
    description: (metadata.description as string) || '',
    model: (metadata.model as string) || 'gpt-4',
    modelParameters: (metadata.modelParameters as Record<string, unknown>) || { temperature: 0.3 },
    messages: [
      {
        role: 'user',
        content: promptContent || ''
      }
    ],
    testData: Array.isArray(metadata.testData) ? metadata.testData : [],
    tags,
    category: (metadata.category as string) || 'Uncategorized',
    createdAt: new Date(),
    updatedAt: new Date(),
    content: promptContent || ''
  };
};

/**
 * Fix common YAML errors that lead to "Unexpected scalar at node end" errors
 * This is often caused by trailing characters or incorrect line formatting
 */
function fixUnexpectedScalarErrors(content: string): string {
  // Split content into lines for processing
  const lines = content.split('\n');
  
  // Process each line to fix common issues
  for (let i = 0; i < lines.length; i++) {
    // Fix lines that end with a colon followed by text (which should be on the next line)
    if (/^[^:]+:[^:]+$/.test(lines[i].trim()) && !lines[i].includes('http')) {
      // Split at the first colon if not in a URL
      const [key, value] = lines[i].split(':');
      lines[i] = `${key}:`;
      lines.splice(i + 1, 0, `  ${value.trim()}`);
    }
    
    // Ensure clean line endings by trimming trailing whitespace
    lines[i] = lines[i].trimEnd();
  }
  
  return lines.join('\n');
}

/**
 * Normalizes different types of quotation marks to make YAML parsing more resilient
 * Converts curly/smart quotes to straight quotes and handles other problematic characters
 */
function normalizeQuotationMarks(content: string): string {
  return content
    // Replace curly/smart double quotes with straight double quotes
    .replace(/[\u201C\u201D]/g, '"')
    // Replace curly/smart single quotes with straight single quotes
    .replace(/[\u2018\u2019]/g, "'")
    // Handle other problematic characters that might cause YAML parsing issues
    .replace(/\u2013/g, '-')     // en dash
    .replace(/\u2014/g, '--')    // em dash
    .replace(/\u2026/g, '...')   // ellipsis
    .replace(/\u00A0/g, ' ')     // non-breaking space
    // Handle trailing spaces that can cause problems at line ends
    .replace(/[ \t]+$/gm, '')
    ;
}

export const loadPrompts = async (): Promise<Prompt[]> => {
  try {
    console.group('🔍 Prompt Loading Process');
    console.log('Starting to load prompts');

    const promptFiles = await fetchManifest();
    console.log(`Found ${promptFiles.length} prompt files to load`);

    const promptsPromises = promptFiles.map(async (filename) => {
      try {
        // Use the BASE_URL from Vite
        const fetchPath = `${import.meta.env.BASE_URL}prompts/${filename}`;
        console.log(`🔬 Attempting to fetch: ${fetchPath}`);
        
        const response = await fetch(fetchPath);
        
        if (!response.ok) {
          console.error(`❌ Failed to load prompt file: ${fetchPath}. Status: ${response.status}`);
          return null;
        }
        
        const content = await response.text();
        console.log(`📖 Content from ${fetchPath} (first 100 chars):`, content.substring(0, 100));
        
        return parsePromptFile(content.trim());
      } catch (error) {
        console.error(`🚨 Error loading specific prompt file: ${filename}`, error);
        return null;
      }
    });
    
    const prompts = await Promise.all(promptsPromises);
    const validPrompts = prompts.filter((prompt): prompt is Prompt => prompt !== null);
    
    if (validPrompts.length === 0) {
      console.error('❗ No valid prompts could be parsed. Each file may have parsing issues.');
      throw new Error('No valid prompts found. Check YAML frontmatter in your .prompt.yml files.');
    }
    
    console.log(`✅ Successfully loaded ${validPrompts.length} prompts`);
    console.groupEnd();
    
    return validPrompts;
  } catch (error) {
    console.groupEnd();
    console.error('🔥 Critical error in loadPrompts:', error);
    throw error;
  }
};
