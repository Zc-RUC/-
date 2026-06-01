# Lab Mapper Skill

Map students from lab pages, advisor pages, and research group directories into recruiting-ready tables.

## What It Does

This skill starts from one or more official lab or advisor URLs, follows member pages, and creates a structured candidate table with evidence-backed profile details.

## Good Inputs

- Lab homepage, people page, advisor homepage, or university group page.
- Optional target degree, such as PhD, MSc, undergraduate, or intern candidate.
- Optional target cohort, such as 2026, 2027, or 2028 graduates.
- Optional target fields or a spreadsheet schema.

## Outputs

Use `templates/mapping-table.csv` as the default schema.

Important fields include:

- Name, degree, advisor, lab, and institution.
- Enrollment year and estimated graduation year.
- Homepage, Google Scholar, email, research area, awards, and experience notes.
- Evidence URL, YES/MAYBE/NO judgment, and confidence.

## Example

See:

- `examples/example-prompt.md`
- `examples/example-output.csv`

## Quality Bar

- Start from official lab and personal pages before broad search.
- Do not guess emails or merge same-name people without strong evidence.
- Use CVs and personal pages as high-priority sources for timeline fields.
- Write `Unknown` when a field cannot be verified.
- Always keep at least one evidence URL per row.

## Typical Follow-Up

Use this skill after `daily-paper-briefing-skill` or `author-sourcing-skill` identifies a promising lab, advisor, or author cluster.
