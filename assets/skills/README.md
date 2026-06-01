# Codex Skills

This folder contains custom Codex skills for research sourcing workflows.

## Skills

| Skill | Purpose | Best Used For |
| --- | --- | --- |
| `author-sourcing-skill` | Turns paper authors into recruiting-ready candidate leads. | Conference papers, arXiv papers, proceedings pages, PDFs, author lists. |
| `daily-paper-briefing-skill` | Produces concise daily research briefings from new papers and feeds. | Daily monitoring, paper triage, author lead discovery. |
| `lab-mapper-skill` | Maps students from lab, advisor, and group pages into structured sourcing tables. | Lab pages, advisor homepages, member directories, university profiles. |

Each skill folder contains:

- `SKILL.md`: the instruction file Codex reads.
- `README.md`: human-readable usage, inputs, outputs, and examples.
- `examples/`: sample prompts and outputs.
- `templates/`: CSV schemas for structured results.

Zip packages are provided next to each folder for download.

## Install

Copy a skill folder into your Codex skills directory:

```bash
mkdir -p ~/.codex/skills
cp -R assets/skills/author-sourcing-skill ~/.codex/skills/
```

Restart Codex after copying the folder if the skill does not appear immediately.

## Recommended Workflow

1. Use `daily-paper-briefing-skill` to identify relevant new papers.
2. Use `author-sourcing-skill` on high-priority papers and first authors.
3. Use `lab-mapper-skill` to expand from promising advisors and labs.

## Notes

- These skills are designed for evidence-backed sourcing. They should keep URLs, confidence, and ambiguity visible.
- Do not guess emails, advisors, or degree timelines without evidence.
- Prefer official sources such as lab pages, personal homepages, proceedings pages, arXiv, OpenReview, ACL Anthology, Google Scholar, DBLP, and CVs.
