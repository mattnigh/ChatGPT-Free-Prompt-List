import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROMPTS_DIR = path.join(__dirname, '..', 'public', 'prompts');

function fixYamlContent(content) {
  // Remove leading blank lines
  content = content.trimStart();

  // Split the content at the first '---' to separate front matter from the rest
  const parts = content.split(/^---$/m);
  
  // Remove empty parts and trim remaining parts
  const cleanParts = parts.map(part => part.trim()).filter(Boolean);

  if (cleanParts.length === 0) {
    return content;
  }

  // Parse the front matter
  let yamlData;
  try {
    yamlData = yaml.load(cleanParts[0]);
  } catch (err) {
    // If parsing fails, try to extract data from the content
    const nameMatch = content.match(/name:\s*(.*)/);
    const descMatch = content.match(/description:\s*(.*)/);
    yamlData = {
      name: nameMatch ? nameMatch[1] : 'Untitled Prompt',
      description: descMatch ? descMatch[1] : '',
      model: 'gpt-4',
      modelParameters: { temperature: 0.3 },
      tags: [],
      category: 'Uncategorized'
    };
  }

  // Fix model name if invalid
  if (!yamlData.model || yamlData.model === 'gpt-4o') {
    yamlData.model = 'gpt-4';
  }

  // Ensure modelParameters exists and has valid temperature
  if (!yamlData.modelParameters || typeof yamlData.modelParameters.temperature !== 'number') {
    yamlData.modelParameters = { temperature: 0.3 };
  }

  // Ensure tags is an array
  if (!Array.isArray(yamlData.tags)) {
    yamlData.tags = yamlData.tags ? [yamlData.tags] : [];
  }

  // Ensure category exists
  if (!yamlData.category) {
    yamlData.category = 'Uncategorized';
  }

  // Extract the content part (everything after the front matter)
  let contentPart = '';
  if (cleanParts.length > 1) {
    contentPart = cleanParts.slice(1).join('\n\n').trim();
  }

  // Create the metadata section (everything before the second ---)
  const metadata = {
    name: yamlData.name,
    description: yamlData.description,
    model: yamlData.model,
    modelParameters: yamlData.modelParameters,
    tags: yamlData.tags,
    category: yamlData.category
  };

  // Format the YAML front matter
  const frontMatter = yaml.dump(metadata, {
    lineWidth: -1,
    noRefs: true,
    quotingType: '"'
  });

  // Combine everything back with proper separators
  return `---\n${frontMatter.trim()}\n---\n${contentPart}`;
}

function fixPromptFile(filePath) {
  console.log(`Fixing ${path.basename(filePath)}...`);
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fixedContent = fixYamlContent(content);
    fs.writeFileSync(filePath, fixedContent);
    return true;
  } catch (err) {
    console.error(`Error fixing ${path.basename(filePath)}: ${err.message}`);
    return false;
  }
}

function main() {
  const files = fs.readdirSync(PROMPTS_DIR)
    .filter(file => file.endsWith('.prompt.yml'));

  console.log(`Found ${files.length} prompt files to fix.\n`);

  let fixedCount = 0;
  let errorCount = 0;

  for (const file of files) {
    const filePath = path.join(PROMPTS_DIR, file);
    if (fixPromptFile(filePath)) {
      fixedCount++;
    } else {
      errorCount++;
    }
  }

  console.log('\nSummary:');
  console.log(`Total files processed: ${files.length}`);
  console.log(`Successfully fixed: ${fixedCount}`);
  console.log(`Errors encountered: ${errorCount}`);
}

main(); 