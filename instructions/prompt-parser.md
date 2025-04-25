# Prompt Parser Functionality

The prompt-bin application uses a resilient YAML parser designed to handle prompt files with a specific structure while being tolerant of common formatting issues.

## File Format

Prompt files follow this standard format:

```yaml
---
title: Prompt Title
description: A description of what the prompt does
model: gpt-4
modelParameters:
  temperature: 0.7
tags:
  - tag1
  - tag2
category: Category Name
---
The actual prompt content goes here...
```

## Parser Features

### Resilient Parsing

The parser is designed to be resilient to common formatting issues:

1. **YAML Parsing with Fallbacks**:
   - First attempts standard YAML parsing
   - If that fails, falls back to regex-based extraction of key fields
   - Always returns a valid prompt object, even if some data is missing

2. **Preprocessing**:
   - Normalizes line endings (converts `\r\n` to `\n`)
   - Normalizes quotation marks (converts smart/curly quotes to straight quotes)
   - Trims whitespace

3. **Default Values**:
   - Provides sensible defaults for missing fields:
     - Title: "Untitled Prompt"
     - Description: "" (empty string)
     - Model: "gpt-4"
     - Temperature: 0.3
     - Category: "Uncategorized"
     - Tags: [] (empty array)

### Error Handling

The parser logs warnings when it encounters issues but tries to recover whenever possible:

- Logs YAML parse errors but continues processing
- Warns when using fallback extraction methods
- Provides context about which fields it was able to extract

## Field Descriptions

| Field | Description | Default |
|-------|-------------|---------|
| title/name | The name of the prompt | "Untitled Prompt" |
| description | Brief description of what the prompt does | "" |
| model | The AI model to use (e.g., "gpt-4") | "gpt-4" |
| modelParameters | Model configuration options | `{ temperature: 0.3 }` |
| tags | Array of tags for categorization | [] |
| category | Primary category for the prompt | "Uncategorized" |

## Prompt Content

Everything after the second `---` delimiter is considered the actual prompt content that will be sent to the AI model.

## Example Usage

When creating a new prompt file:

1. Save it with a `.prompt.yml` extension in the `public/prompts/` directory
2. Follow the standard format above
3. The site will automatically load and display it

## Troubleshooting

If a prompt doesn't appear on the site:

1. Check the browser console for parsing errors
2. Ensure the YAML frontmatter is properly formatted
3. Verify there are two `---` delimiters (one at the start, one after the frontmatter)
4. Make sure quotation marks are consistent
5. Be careful with colons in text fields (they may need to be quoted) 