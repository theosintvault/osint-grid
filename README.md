# The OSINT Grid

A practical directory of public-records sources for investigations, research, due diligence, compliance, and journalism.

The OSINT Grid brings public-records links into one organized catalog so researchers can spend less time hunting for sources and more time evaluating the information they find.

## What is included

- Corporate and business registries
- Property and land records
- Court and case lookup systems
- Licensing and permit databases
- Government directories
- Public databases
- International records

## Repository contents

- `data/` contains the source catalog and JSON schema
- `docs/` contains project documentation
- `docs/multi-search-launcher.html` provides a multi-search launcher for opening selected source links
- `llms.txt` provides a concise machine-readable project summary
- `llms-full.txt` provides extended project context
- `TOOLKIT.md` documents the connection to The OSINT Vault Toolkit
- `CONTRIBUTING.md` explains how to submit improvements
- `SECURITY.md` explains how to report security concerns

## Example record

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

## Live tool

https://theosintvault.io/osint-grid

## Responsible use

The OSINT Grid is an index of public sources. It does not grant permission to access restricted systems or use information unlawfully. Check each source's current availability, terms, privacy requirements, and applicable law before using it.

## Contributing

Suggestions and corrections are welcome. Review `CONTRIBUTING.md` before opening a pull request.

## Maintainer

The OSINT Vault

Contact: theosintvault@gmail.com
