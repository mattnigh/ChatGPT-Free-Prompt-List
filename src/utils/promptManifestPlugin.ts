import { Plugin } from 'vite';
import * as fs from 'fs';
import * as path from 'path';

// The virtual module ID
const VIRTUAL_MODULE_ID = 'virtual:prompt-manifest';
const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID;

/**
 * Vite plugin that generates a JSON manifest of all prompt files
 * in the /public/prompts directory and serves it as a virtual module
 */
export function promptManifestPlugin(): Plugin {
  let cache: { promptFiles: string[], generatedAt: string } = { promptFiles: [], generatedAt: '' };
  
  return {
    name: 'prompt-manifest-plugin',
    
    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID;
      }
    },
    
    // This hook serves the virtual module
    load(id) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        return `export default ${JSON.stringify(cache)}`;
      }
    },
    
    configureServer(server) {
      const root = server.config.root;
      cache = scanForPrompts(root);
      
      // Also write the file to public for development
      const manifestPath = path.resolve(root, 'public/prompt-manifest.json');
      fs.writeFileSync(
        manifestPath,
        JSON.stringify(cache, null, 2)
      );
      
      // Watch for changes to the prompts directory
      const promptsDir = path.resolve(root, 'public/prompts');
      server.watcher.add(promptsDir);
      server.watcher.on('change', (file) => {
        if (file.includes(promptsDir)) {
          cache = scanForPrompts(root);
          
          // Update the file as well
          fs.writeFileSync(
            manifestPath,
            JSON.stringify(cache, null, 2)
          );
          
          // Force clients to reload
          server.ws.send({ type: 'full-reload' });
        }
      });
    },
    
    // For production builds, write the manifest as a static file
    buildStart() {
      const root = process.cwd();
      const manifestContent = scanForPrompts(root);
      
      // Write to public directory for production builds
      const manifestPath = path.resolve(root, 'public/prompt-manifest.json');
      fs.writeFileSync(
        manifestPath,
        JSON.stringify(manifestContent, null, 2)
      );
      
      cache = manifestContent;
    }
  };
}

// Helper function to scan for prompt files
function scanForPrompts(rootDir: string) {
  try {
    const promptsDir = path.resolve(rootDir, 'public/prompts');
    console.log(`[Prompt Manifest] Scanning directory: ${promptsDir}`);
    
    // Read all files in the prompts directory
    const files = fs.readdirSync(promptsDir);
    
    // Filter for .prompt.yml files
    const promptFiles = files.filter(file => file.endsWith('.prompt.yml'));
    console.log(`[Prompt Manifest] Found ${promptFiles.length} prompt files`);
    
    return {
      promptFiles,
      generatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('[Prompt Manifest] Error scanning for prompts:', error);
    return {
      promptFiles: [],
      generatedAt: new Date().toISOString()
    };
  }
}
