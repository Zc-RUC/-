# Daily Paper Briefing Skill

Produce concise paper briefings for research tracking, recruiting, and follow-up prioritization.

## What It Does

This skill monitors or searches new papers, filters for a target area, summarizes the most relevant results, and highlights author leads for follow-up.

## Good Inputs

- Target date range, such as today, this week, or a conference deadline window.
- Venues, feeds, or URLs, such as arXiv, OpenReview, ACL Anthology, conference proceedings, or lab publication pages.
- Keywords or fields, such as LLM serving, distributed training, scheduling, storage, ML systems, AI agents, databases, networking, or infrastructure.
- Optional sourcing criteria, such as student authors, 2026-2028 graduates, or specific institutions.

## Outputs

For Markdown briefings, include:

- Date
- Scope
- Top papers
- Author leads
- Follow-up actions

For spreadsheet output, use `templates/daily-briefing-table.csv`.

## Example

See:

- `examples/example-prompt.md`
- `examples/example-output.md`

## Quality Bar

- Prefer primary paper sources over reposts or summaries.
- Deduplicate by paper title and arXiv/OpenReview identifiers.
- Keep summaries short and action-oriented.
- Mark speculative relevance as low confidence.
- If no relevant papers are found, state the checked sources.

## Typical Follow-Up

Use `author-sourcing-skill` on high-priority papers, then use `lab-mapper-skill` for labs connected to strong author leads.
