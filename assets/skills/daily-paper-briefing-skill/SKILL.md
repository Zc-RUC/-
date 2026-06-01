---
name: daily-paper-briefing
description: Use when monitoring new papers from arXiv, conference proceedings, feeds, or keyword searches and producing concise daily research briefings with paper summaries, tags, author highlights, candidate sourcing leads, and follow-up priorities.
---

# Daily Paper Briefing

## Goal

Produce a concise daily paper briefing for recruiting, research tracking, or investment/research teams.

The briefing should identify important new papers, summarize their relevance, and connect promising authors to sourcing follow-up.

## Inputs

- Target venues, feeds, or URLs.
- Target keywords or research areas.
- Date range.
- Optional candidate sourcing criteria.
- Optional output channel requirements.

## Output Fields

Use `templates/daily-briefing-table.csv` for spreadsheet output.

For Markdown briefings, include:

- Date
- Scope
- Top Papers
- Author Leads
- Follow-up Actions

## Workflow

1. Define scope.
   - Confirm target date range, venues, and keywords.
   - If not specified, use the user's stated area and today's date.

2. Collect papers.
   - Search official proceedings, arXiv, OpenReview, ACL Anthology, conference sites, or feeds.
   - Prefer primary sources.
   - Deduplicate by title and arXiv ID.

3. Filter relevance.
   - Keep papers matching the target research area.
   - Prioritize papers with strong relevance, notable authors/labs, open-source code, or recruiting value.

4. Summarize.
   - Write one short summary per paper.
   - Include method/topic, why it matters, and fit to the target area.

5. Extract author leads.
   - Identify authors worth follow-up.
   - Add homepage, affiliation, lab, and sourcing notes if available.
   - Hand off deeper identity resolution to Author Sourcing when needed.

6. Produce briefing.
   - Keep it concise.
   - Sort by priority.
   - Include links and follow-up actions.

## Quality Checks

- Use primary paper sources when possible.
- Avoid overclaiming paper impact from title alone.
- Mark speculative relevance as `low confidence`.
- Do not include unrelated papers just to fill volume.
- Keep each summary actionable and short.

## Failure Handling

- If feeds are unavailable, use proceedings/search pages and state the source gap.
- If paper metadata conflicts, prefer the official venue page or arXiv page.
- If there are too many results, sample by relevance and disclose the filtering rule.
- If there are no relevant papers, say so and provide the checked sources.

## Example Prompt

See `examples/example-prompt.md`.

## Example Output

See `examples/example-output.md`.

