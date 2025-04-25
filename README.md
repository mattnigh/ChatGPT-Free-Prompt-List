# Promptbin -> ChatGPT/Copilot/Claude (AI) Free Prompt List

## Project info

**URL**: https://lovable.dev/projects/cf0b72ae-f014-48bc-8e47-2a9585159aaf

This tool was created to provide a centralized resource for prompt ideas that can help improve your interactions with ChatGPT and other AI assistants. Use these prompts to:

- Spark creativity in your AI conversations
- Guide AI to produce more specific, useful outputs
- Save time with pre-crafted prompting strategies
- Explore different prompt techniques and approaches

## Fork it! For Teams & Developers

This codebase can serve as a foundation for creating your own custom prompt manager. Simply fork or clone it for your own copy, and consider using it for:

- Internal prompt libraries for your development team
- Client-specific prompt collections for agencies
- Personal collections of your most effective prompts

## Installation & Usage

To run this project locally:

```sh
# Clone the repository
git clone https://github.com/mattnigh/ChatGPT-Free-Prompt-List.git

# Navigate to the project directory
cd ChatGPT-Free-Prompt-List

# Install dependencies
npm i

# Start the development server
npm run dev
```

## Adding Your Own Prompts

Prompts are stored as YAML files in the `/public/prompts` directory. Each prompt follows a specific format:

1. Create a new file in the `/public/prompts` directory with the naming convention `your-prompt-name.prompt.yml`
2. Follow the YAML structure of existing prompts

The application will automatically detect and include new properly formatted prompt files.

## Technologies

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Deployment

To deploy your own version:

1. Fork this repository
2. Update the `base` path in `vite.config.ts` to match your GitHub Pages URL structure
3. Enable GitHub Pages in your repository settings

## Creator

Created by [Matt Nigh](https://www.mattnigh.net/)

---

MIT License, 2025 + Copyright -> Matt Nigh