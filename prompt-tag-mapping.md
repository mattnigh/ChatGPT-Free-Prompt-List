# Prompt Tag Mapping Reference

This file documents the simplification of tags for each prompt file. Only the `tags` field was changed; all other fields remain as originally authored.

| Prompt File                        | Old Tags                                 | New Tags         |
|-------------------------------------|------------------------------------------|------------------|
| assumption-analyzer.prompt.yml      | assumptions, analysis, bugs              | analyze          |
| error-message-explainer.prompt.yml  | error, explanation, stack trace          | explain, error   |
| file-structure-suggester.prompt.yml | file structure, modularity, best practices| review           |
| oncall-triage-tips.prompt.yml       | on-call, triage, tips                    | troubleshoot     |
| logic-vs-intent.prompt.yml          | logic, intent, analysis                  | analyze          |
| bug-risk-scan.prompt.yml            | bug, risk, scan                          | review           |
| code-refactor-suggestions.prompt.yml| refactor, performance, clarity           | refactor         |
| unit-test-walkthrough.prompt.yml    | unit test, walkthrough, testing          | test             |
| junior-explainer.prompt.yml         | explanation, junior, step-by-step        | explain          |
| readability-improver.prompt.yml     | readability, maintainability, code review| review           |
| code-block-explainer.prompt.yml     | code, explanation, breakdown             | explain          |
| logging-suggestions.prompt.yml      | logging, code review, explanation        | review           |
| error-root-cause-explainer.prompt.yml| error, debugging, fix                   | troubleshoot     |
| readme-analysis.prompt.yml          | readme, project overview, usage          | summary          |
| api-doc-summary.prompt.yml          | api, summary, example                    | summary, api     |
| article-3-sentence-summary.prompt.yml| article, summary, concise               | summary          |
| changelog-tldr.prompt.yml           | changelog, tldr, developer               | summary          |
| key-terms-extractor.prompt.yml      | key terms, acronyms, definitions         | explain          |
| onboarding-notes.prompt.yml         | onboarding, notes, new engineer          | onboarding       |
| steps-and-gaps.prompt.yml           | steps, gaps, assumptions                 | checklist        |
| tutorial-checklist.prompt.yml       | tutorial, checklist, actions, outcomes   | checklist        |
| whitepaper-explainer.prompt.yml     | whitepaper, explainer, technical         | explain          |
| problem-and-solution.prompt.yml     | problem, solution, recommendation        | analyze          |
| blog-action-summary.prompt.yml      | blog, summary, developer, action         | summary, blog    |
| issue-thread-summary.prompt.yml     | github, issue, discussion, summary       | summary, issue   |
| rfc-purpose-explainer.prompt.yml    | rfc, purpose, decision                   | explain          |
| config-extractor.prompt.yml         | config, yaml, json, explanation          | config           |
| plain-language-summary.prompt.yml   | summary, plain language, key takeaways   | summary          |

---

## Data/Analysis Prompts (Suggested Tags)

| Prompt (summary)                                                                 | Tags                |
|----------------------------------------------------------------------------------|---------------------|
| Identify missing/inconsistent data, suggest cleaning                             | clean, validate     |
| List data quality issues (nulls, outliers, etc.)                                 | validate            |
| Remove duplicates, explain impact                                                | deduplicate         |
| Clean/normalize column with misspellings                                         | clean               |
| Convert dates to consistent format                                               | format              |
| Clean/validate numerical fields (outliers, invalid)                              | clean, validate     |
| Fix rows with wrong data type                                                    | validate            |
| Group similar values, recommend mapping                                          | clean               |
| Remove corrupted/null/nonsense rows                                              | clean               |
| Python/Pandas code to clean dataset                                              | code, clean         |
| Align/merge columns from multiple sources, flag conflicts                        | merge, clean        |
| Step-by-step data cleaning pipeline                                              | pipeline, clean     |

---

## Development Research Prompts (Suggested Tags)

| Prompt (summary)                                                                 | Tags                |
|----------------------------------------------------------------------------------|---------------------|
| Compare developer productivity metrics research (DORA, SPACE)                    | research, metrics   |
| Summarize current state of confidential compute in cloud infrastructure          | research, cloud     |
| Explore platform engineering as a product function                               | research, platform  |
| Collect case studies on AI tools improving development velocity                  | research, ai        |
| Draft strategy on AI agent orchestration in software workflows                   | strategy, ai        |
| Find academic papers on software engineering effectiveness                       | research, academic  |
| Trace evolution of prompt engineering (2020-2025)                                | research, timeline  |
| Find engineering leaders discussing AI adoption                                  | research, leadership|
| Compare OpenAI models with open-source alternatives                              | research, llm       |
| White paper on future of developer environments                                  | strategy, tools     |
| Summarize latest thinking on using LLMs for test generation                      | research, testing   |
| Compare cloud computing adoption to AI adoption                                  | research, trends    |
| Industry views on speed vs quality tradeoff in engineering                       | research, tradeoffs |
| Explore MLOps and DevOps similarities and differences                            | research, mlops     |

---

## Social Media Prompts (Suggested Tags)

| Prompt (summary)                                                                 | Tags                |
|----------------------------------------------------------------------------------|---------------------|
| Professional LinkedIn post about completed project                               | linkedin, reflection, professional|
| Behind-the-scenes product feature launch post                                    | product, story, engagement      |
| Leadership learning post with vulnerability                                      | leadership, authentic, reflection|
| Transform idea into compelling post with story structure                         | storytelling, message, creativity|
| Post celebrating impactful teammate contribution                                 | recognition, teamwork, authentic|
| Share industry-specific learning insights with question                          | insights, learning, engagement  |
| Post on product/engineering tradeoff decision                                    | decision, tradeoffs, reflection |
| Career milestone post with grounded tone                                         | career, milestone, authentic    |
| Thoughtful post about working with AI tools                                      | ai, insights, reflection        |
| Turn internal reflection into useful public post                                 | reflection, actionable, authentic|

---

## New Tag Suggestions (General Prompts)

| Tag                | Description                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| naming             | For prompts about generating names, branding, or creative naming tasks       |
| takeaway           | For prompts focused on extracting the most valuable insight or practical tip |
| markdown           | For prompts that convert or format content as markdown/blog                  |
| slogan             | For prompts about writing slogans, taglines, or memorable titles             |
| style              | For prompts about rewriting or matching a specific style or tone             |
| clarity            | For prompts about editing for clarity, conciseness, or readability           |
| prompt-generation  | For prompts that generate other prompts or templates                         |
| visual             | For prompts about creating images, visuals, or design concepts               |
| resources          | For prompts that curate or recommend learning resources                      |
| template           | For prompts that provide examples or actionable templates                    |
| research           | For prompts seeking comprehensive research on technical topics               |
| metrics            | For prompts related to measuring performance or impact                       |
| cloud              | For prompts about cloud services, architecture, or infrastructure            |
| platform           | For prompts about developer platforms or platform engineering                |
| ai                 | For prompts related to AI tools, implementation, or impact                   |
| strategy           | For prompts about strategic planning or roadmaps                             |
| academic           | For prompts seeking academic or scholarly information                        |
| timeline           | For prompts about historical development or evolution of technologies        |
| leadership         | For prompts about engineering leadership or organizational decisions         |
| llm                | For prompts specifically focused on large language models                    |
| tools              | For prompts about developer tools or environments                            |
| testing            | For prompts related to software testing approaches or methodologies          |
| trends             | For prompts about industry trends or future predictions                      |
| tradeoffs          | For prompts exploring competing priorities or decision frameworks            |
| mlops              | For prompts about machine learning operations and infrastructure             |
| linkedin           | For prompts specifically focused on LinkedIn content creation                |
| reflection         | For prompts about personal or professional growth insights                   |
| professional       | For prompts about career-oriented or workplace communication                 |
| product            | For prompts related to product development, features, or launches            |
| story              | For prompts about creating compelling narratives around events or launches   |
| engagement         | For prompts focused on generating audience interaction or feedback           |
| authentic          | For prompts that emphasize genuine, transparent communication                |
| storytelling       | For prompts that structure information as narratives with arc and resolution |
| message            | For prompts focused on conveying specific ideas clearly and effectively      |
| recognition        | For prompts about acknowledging contributions or achievements                |
| teamwork           | For prompts about collaboration, team success, or cross-functional work      |
| insights           | For prompts that extract or share meaningful realizations                    |
| learning           | For prompts about skill development or knowledge acquisition                 |
| decision           | For prompts about making or explaining important choices                     |
| career             | For prompts related to professional growth or job transitions                |
| milestone          | For prompts about significant achievements or markers of progress            |
| actionable         | For prompts that deliver practical, implementable advice                     |

---

## Vibe Coding Prompts (Suggested Tags)

| Tag        | Description                                                                 |
|------------|-----------------------------------------------------------------------------|
| prototype  | For prompts about quick prototypes, proofs of concept, or throwaway versions|
| scaffold   | For scaffolding code, minimal setup, or boilerplate                         |
| mock       | For mocks, stubs, sample data, fake scripts, or API mocks                   |
| shortcut   | For workarounds, quick hacks, or cutting corners                            |
| explain    | For prompts about explaining what a prototype does/doesn't do               |
| stepwise   | For staged or step-by-step builds                                           |

---

## Images Prompts (Suggested Tags)

| Tag          | Description                                                                 |
|--------------|-----------------------------------------------------------------------------|
| portrait     | For any headshot, character, or personal portrait                           |
| style        | For prompts specifying a particular artistic style (e.g., Ghibli, Pixar, etc.)|
| professional | For corporate, business, or LinkedIn-style images                          |
| infographic  | For infographics, diagrams, workflows, slides                              |
| teamwork     | For images showing teams, collaboration, or group work                     |
| humor        | For comic strips or humorous illustrations                                 |
| blog         | For blog illustrations                                                     |

---

## GitHub Actions Prompts (Suggested Tags)

| Tag          | Description                                                                 |
|--------------|-----------------------------------------------------------------------------|
| workflow     | For creating or modifying GitHub Actions workflow files                     |
| ci           | For continuous integration setup, testing, and validation processes         |
| cd           | For continuous deployment or delivery to hosting platforms                  |
| automation   | For scheduled tasks, bots, or automated processes                           |
| config       | For configuration, secrets management, or environment setup                 |
| debug        | For troubleshooting, fixing, or analyzing workflow issues                   |
| security     | For secure handling of credentials, tokens, and permissions                 |
| optimization | For improving workflow performance, caching, or efficiency                  |

</rewritten_file> 