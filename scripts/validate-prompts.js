import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROMPTS_DIR = path.join(__dirname, '..', 'public', 'prompts');

// Expected structure for a valid prompt file
const requiredFields = {
  name: 'string',
  description: 'string',
  model: 'string',
  modelParameters: 'object',
  tags: 'array',
  category: 'string'
};

// Valid model names
const validModels = ['gpt-4', 'gpt-3.5-turbo'];

function validatePrompt(filePath) {
  const issues = [];
  
  // Read file content
  let content;
  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    return [`Error reading file: ${err.message}`];
  }

  // Check for leading blank lines
  if (content.startsWith('\n')) {
    issues.push('File starts with blank lines');
  }

  // Parse YAML
  let data;
  try {
    data = yaml.load(content);
  } catch (err) {
    return [`Invalid YAML: ${err.message}`];
  }

  if (!data) {
    return ['Empty YAML document'];
  }

  // Check required fields
  for (const [field, type] of Object.entries(requiredFields)) {
    if (!data[field]) {
      issues.push(`Missing required field: ${field}`);
    } else if (typeof data[field] !== type && type !== 'array') {
      issues.push(`Invalid type for ${field}: expected ${type}, got ${typeof data[field]}`);
    } else if (type === 'array' && !Array.isArray(data[field])) {
      issues.push(`Invalid type for ${field}: expected array, got ${typeof data[field]}`);
    }
  }

  // Validate model name
  if (data.model && !validModels.includes(data.model)) {
    issues.push(`Invalid model name: ${data.model}. Valid options are: ${validModels.join(', ')}`);
  }

  // Check modelParameters
  if (data.modelParameters) {
    if (!data.modelParameters.temperature) {
      issues.push('Missing temperature in modelParameters');
    } else if (typeof data.modelParameters.temperature !== 'number' || 
               data.modelParameters.temperature < 0 || 
               data.modelParameters.temperature > 1) {
      issues.push('Invalid temperature value: must be a number between 0 and 1');
    }
  }

  // Check tags
  if (data.tags && data.tags.length === 0) {
    issues.push('Tags array is empty');
  }

  return issues;
}

function main() {
  const files = fs.readdirSync(PROMPTS_DIR)
    .filter(file => file.endsWith('.prompt.yml'));

  let hasIssues = false;
  const results = {};

  for (const file of files) {
    const filePath = path.join(PROMPTS_DIR, file);
    const issues = validatePrompt(filePath);
    
    if (issues.length > 0) {
      hasIssues = true;
      results[file] = issues;
    }
  }

  console.log('\nPrompt Validation Results:');
  console.log('=========================\n');

  if (Object.keys(results).length === 0) {
    console.log('✅ All prompt files are valid!\n');
  } else {
    console.log('❌ The following files have issues:\n');
    for (const [file, issues] of Object.entries(results)) {
      console.log(`${file}:`);
      issues.forEach(issue => console.log(`  - ${issue}`));
      console.log('');
    }
  }

  console.log(`Total files checked: ${files.length}`);
  console.log(`Files with issues: ${Object.keys(results).length}`);
}

main(); 