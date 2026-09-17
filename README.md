# The OSINT Grid

A curated index of 4,500+ verified public-records sources for investigators, analysts, journalists, compliance teams, researchers, and OSINT practitioners.

The OSINT Grid organizes public-records sources into a structured, searchable catalog designed for due diligence, fraud investigations, asset tracing, licensing review, background research, and investigative workflows.

## Why this project exists

Public-records research often requires stitching together fragmented sources across governments, courts, registries, corporations, and local agencies. This project consolidates those sources into a maintained index to reduce search time, improve coverage, and support repeatable investigative workflows.

## Repository structure

- `data/` — machine-readable source catalog and JSON schema
- `docs/` — project documentation and overview material
- `README.md` — project landing page
- `CHANGELOG.md` — release history
- `TOOLKIT.md` — relationship to The OSINT Vault toolkit
- `llms.txt` — concise LLM-readable project summary
- `llms-full.txt` — extended context for LLMs and agents
- `CONTRIBUTING.md` — contribution guidance and workflow
- `SECURITY.md` — vulnerability disclosure process
- `CODE_OF_CONDUCT.md` — community expectations

## Source categories

- Corporate and business registries
- Property and land records
- Court and case lookup systems
- Licensing and permits
- Government directories
- Public databases
- International records

## Use cases

- Corporate ownership and business-record research
- Property and land research
- Court and litigation lookup
- Licensing and permit verification
- Compliance, KYC, and AML workflows
- Investigative journalism
- OSINT automation and tooling
- Due diligence, fraud analysis, and asset tracing

## Data model

Each source record follows a consistent schema designed for validation and downstream tooling integration.

Example:

```json
{
  "id": "us-business-search",
  "name": "U.S. Secretary of State Business Search",
  "url": "https://example.gov/business-search",
  "category": "corporate",
  "jurisdiction": "United States",
  "description": "Business entity and registration lookup database.",
  "status": "active"
}
```

The data files live in `data/` and can be validated with `data/sources.schema.json`.

## Live tool

https://theosintvault.io/osint-grid

## Project notes

This repository is a structured index and documentation resource. It is intended to support lawful, ethical research and verification. Public availability does not remove legal, contractual, privacy, or access restrictions associated with a source.

Source availability, coverage, access requirements, and terms may change. Verify information before operational use.

## Contributing

Contributions are welcome, especially in data quality, schema improvements, documentation, and validation workflows. Please review `CONTRIBUTING.md` before submitting updates.

## Security

If you discover a security issue or a valid concern with the project, please review `SECURITY.md` and follow the reporting guidance.

## Maintainer

The OSINT Vault

## Contact

theosintvault@gmail.com
