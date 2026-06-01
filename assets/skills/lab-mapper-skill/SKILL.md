---
name: lab-mapper
description: Use when mapping research students from lab pages, advisor homepages, group member lists, or university profiles into recruiting-ready tables. Prioritize official lab and personal pages, infer degree and graduation timing, and enrich rows with advisor, lab, homepage, email, Google Scholar, awards, experience notes, and candidate judgment.
---

# Lab Mapper

## Goal

Turn one or more lab/advisor/member URLs into a structured recruiting map of student candidates.

Use this skill for AI Infra, systems, ML, NLP, robotics, databases, networking, architecture, storage, security, or other research-lab sourcing tasks.

## Inputs

- Lab homepage, advisor homepage, member page, spreadsheet rows, or copied URLs.
- Optional target degree: PhD, MSc, undergraduate, intern candidate.
- Optional target cohort: 2026, 2027, 2028 graduating class.
- Optional target fields from the user or spreadsheet.

## Output Fields

Use `templates/mapping-table.csv` unless the user provides a spreadsheet schema.

Required fields:

- Name
- Degree
- Advisor
- Lab
- Institution
- Enrollment Year
- Estimated Graduation Year
- Personal Homepage
- Google Scholar
- Email
- Research Area
- Awards
- Experience Notes
- Evidence URL
- Candidate Judgment
- Confidence

## Workflow

1. Start from official sources.
   - Use the lab homepage, advisor homepage, and member page before broad search.
   - Follow member profile links exposed by the lab page.

2. Resolve each candidate.
   - Open the personal page if available.
   - Check CV, bio, education, news, publication, GitHub, Google Scholar, and email sections.
   - Use external search only when official pages are missing or stale.

3. Infer degree and timeline.
   - Convert statements like "3rd-year PhD student" or "joined in Fall 2022" into enrollment year.
   - Estimate graduation year conservatively:
     - PhD: enrollment year + 5 or 6.
     - MSc: enrollment year + 2.
     - Undergraduate: enrollment year + 4.
   - Mark inferred values with lower confidence if evidence is indirect.

4. Enrich the row.
   - Record advisor, lab, institution, homepage, Google Scholar, email, research area, awards, and experience notes.
   - Keep notes short and evidence-based.

5. Judge fit.
   - Use `YES`, `MAYBE`, or `NO`.
   - `YES`: target cohort plus relevant research and enough contact evidence.
   - `MAYBE`: relevant but missing cohort, contact, or current status.
   - `NO`: wrong degree, wrong graduation timing, unrelated field, or no reliable match.

6. Report uncertainty.
   - Do not hide ambiguity.
   - Add `low`, `medium`, or `high` confidence.
   - Explain same-name conflicts briefly in notes.

## Quality Checks

- Every row must have at least one evidence URL.
- Do not infer email addresses by guessing patterns.
- Do not merge people with the same name unless affiliation and publications match.
- Prefer direct lab and personal pages over aggregators.
- If a field is unknown, write `Unknown`, not a fabricated value.

## Failure Handling

- If a page is unreachable, try archived, university, lab, or scholar sources.
- If the lab page is stale, mark status as uncertain.
- If a candidate has no individual page, use lab page evidence and lower confidence.
- If search results conflict, keep the direct institutional source and mention the conflict.

## Example Prompt

See `examples/example-prompt.md`.

## Example Output

See `examples/example-output.csv`.

