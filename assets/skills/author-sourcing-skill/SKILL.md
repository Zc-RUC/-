---
name: author-sourcing
description: Use when turning paper authors from conferences, arXiv papers, proceedings, or PDFs into recruiting-ready candidate leads. Resolve identities, handle same-name ambiguity, find homepages, GitHub, Google Scholar, advisor/lab/current affiliation, and produce YES/MAYBE/NO judgments with evidence.
---

# Author Sourcing

## Goal

Turn paper authors into verified candidate leads for recruiting, talent mapping, or research follow-up.

This is useful for venues such as EuroSys, ASPLOS, FAST, SOSP, OSDI, NSDI, SIGCOMM, MLSys, NeurIPS, ICML, ICLR, ACL, EMNLP, and arXiv.

## Inputs

- Paper title, paper URL, PDF, proceedings page, or author list.
- Optional target field and target cohort.
- Optional spreadsheet schema.

## Output Fields

Use `templates/author-sourcing-table.csv` unless the user provides another schema.

Required fields:

- Paper Title
- Venue
- Year
- Author
- Author Position
- Current Affiliation
- Degree / Role
- Advisor
- Lab
- Personal Homepage
- GitHub
- Google Scholar
- Email
- Research Fit
- Candidate Judgment
- Evidence URL
- Notes
- Confidence

## Workflow

1. Parse paper metadata.
   - Extract title, venue, year, author order, affiliations, and paper URL.
   - Keep author order because first author and student authors are often highest priority.

2. Resolve author identity.
   - Search author name with paper title and affiliation.
   - Prefer personal homepage, university profile, lab page, Google Scholar, GitHub, and DBLP.
   - Do not rely on a same-name match without paper or affiliation evidence.

3. Enrich profile.
   - Find current affiliation, role/degree, advisor, lab, homepage, GitHub, Scholar, and email.
   - Use CVs and bios when available.
   - Record direct evidence URLs.

4. Judge candidate relevance.
   - `YES`: relevant research, likely student/early career, credible contact path.
   - `MAYBE`: relevant but uncertain current status, degree, or contact.
   - `NO`: senior faculty, unrelated field, unclear identity, or no evidence.

5. Summarize notes.
   - Mention research fit in one short phrase.
   - Mention ambiguity only when it affects actionability.

## Quality Checks

- Same-name authors must be checked against the paper, affiliation, publications, or coauthors.
- Never invent GitHub, email, or advisor data.
- For non-student authors, state the role clearly.
- If multiple profiles match, keep the most evidenced one and lower confidence.
- Every actionable `YES` or `MAYBE` row needs an evidence URL.

## Failure Handling

- If the proceedings page is incomplete, use PDF metadata, DBLP, Semantic Scholar, ACL Anthology, OpenReview, arXiv, or author homepages.
- If an author has no public profile, mark fields `Unknown` and judgment `MAYBE` or `NO` depending on relevance.
- If contact info is absent, do not guess; use homepage/contact page evidence if available.

## Example Prompt

See `examples/example-prompt.md`.

## Example Output

See `examples/example-output.csv`.

