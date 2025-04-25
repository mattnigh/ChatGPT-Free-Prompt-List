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
  const parts = content.split('---');
  if (parts.length < 2) return content;

  // Get the YAML front matter and the rest of the content
  let [_, frontMatter, ...rest] = parts;
  let restContent = rest.join('---').trim();

  // Parse the front matter
  let yamlData;
  try {
    yamlData = yaml.load(frontMatter);
  } catch (err) {
    yamlData = {};
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

  // Convert the content section into proper YAML structure
  const contentLines = restContent.split('\n');
  let structuredContent = {};
  let currentSection = null;

  for (let line of contentLines) {
    line = line.trim();
    if (!line) continue;

    // Check if line is a main section
    if (!line.startsWith('-') && line.endsWith(':')) {
      currentSection = line.slice(0, -1);
      structuredContent[currentSection] = [];
    }
    // Check if line is a list item
    else if (line.startsWith('-')) {
      if (currentSection && structuredContent[currentSection]) {
        structuredContent[currentSection].push(line.slice(1).trim());
      }
    }
    // Check if line is a field with [placeholder]
    else if (line.includes(':')) {
      const [key, value] = line.split(':').map(s => s.trim());
      if (!structuredContent.fields) {
        structuredContent.fields = {};
      }
      structuredContent.fields[key] = value;
    }
  }

  // Combine everything back into a properly formatted YAML document
  const finalYaml = {
    ...yamlData,
    content: structuredContent
  };

  return '---\n' + yaml.dump(finalYaml, {
    lineWidth: -1,
    noRefs: true,
    quotingType: '"'
  });
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