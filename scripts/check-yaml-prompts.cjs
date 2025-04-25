// check-yaml-prompts.js
// Usage: node scripts/check-yaml-prompts.js
// This script checks all .prompt.yml files in public/prompts/ for YAML parsing errors.
// It prints the filenames and error messages for any files that fail to parse.

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

defaultPromptDir = path.join(__dirname, '../public/prompts');

fs.readdir(defaultPromptDir, (err, files) => {
  if (err) {
    console.error('Error reading prompts directory:', err);
    process.exit(1);
  }
  let foundError = false;
  files.filter(f => f.endsWith('.prompt.yml')).forEach(file => {
    const filePath = path.join(defaultPromptDir, file);
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      // Only parse the YAML frontmatter (between the first two ---)
      const match = content.match(/^---([\s\S]*?)---/);
      if (match) {
        yaml.load(match[1]);
      } else {
        throw new Error('No YAML frontmatter found');
      }
    } catch (e) {
      foundError = true;
      console.error(`YAML error in ${file}:\n${e.message}\n`);
    }
  });
  if (!foundError) {
    console.log('All prompt YAML files parsed successfully!');
  }
}); 