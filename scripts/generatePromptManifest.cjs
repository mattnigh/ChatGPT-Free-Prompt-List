const fs = require('fs');
const path = require('path');

// Define paths
const promptsDir = path.join(__dirname, '../public/prompts');
const manifestPath = path.join(promptsDir, 'manifest.json');

try {
  // Create prompts directory if it doesn't exist
  if (!fs.existsSync(promptsDir)) {
    console.log(`Creating prompts directory: ${promptsDir}`);
    fs.mkdirSync(promptsDir, { recursive: true });
  }

  // Get list of prompt files
  const files = fs.readdirSync(promptsDir)
    .filter(f => f.endsWith('.prompt.yml'));

  console.log(`Found ${files.length} prompt files in ${promptsDir}:`);
  files.forEach(file => console.log(` - ${file}`));

  // Write manifest
  fs.writeFileSync(manifestPath, JSON.stringify(files, null, 2));
  console.log(`Prompt manifest generated at ${manifestPath} with ${files.length} files.`);
} catch (error) {
  console.error('Error generating prompt manifest:', error);
  process.exit(1);
} 