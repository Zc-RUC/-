# Author Sourcing Skill

Turn paper authors into verified candidate leads for recruiting, talent mapping, or research follow-up.

## What It Does

This skill starts from a paper, proceedings page, PDF, or author list and produces a structured table of author profiles. It focuses on identity resolution, recruiting fit, public evidence, and clear YES/MAYBE/NO judgments.

## Good Inputs

- Paper title, URL, PDF, arXiv link, OpenReview link, or proceedings page.
- Venue and year if known.
- Target area, such as AI Infra, systems, ML systems, databases, networking, storage, NLP, or robotics.
- Optional target cohort or role, such as PhD 2026-2028, MSc, intern candidate, early-career researcher.

## Outputs

Use `templates/author-sourcing-table.csv` as the default schema.

Important fields include:

- Paper title, venue, year, author, and author position.
- Current affiliation, degree or role, advisor, and lab.
- Homepage, GitHub, Google Scholar, and email when public.
- Research fit, sourcing judgment, evidence URL, notes, and confidence.

## Example

See:

- `examples/example-prompt.md`
- `examples/example-output.csv`

## Quality Bar

- Verify same-name authors against the paper, affiliation, publications, coauthors, or profile evidence.
- Do not invent GitHub, email, advisor, or degree data.
- Every YES or MAYBE candidate should have an evidence URL.
- Use `Unknown` when a field cannot be verified.
- Lower confidence when identity, current status, or timeline is uncertain.

## Typical Follow-Up

After this skill identifies promising candidates, use `lab-mapper-skill` to expand around the candidate's advisor, lab, or research group.
