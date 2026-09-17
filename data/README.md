# Data catalog

This directory contains the machine-readable source catalog used by The OSINT Grid.

## Contents

- `sources.json` — the source index
- `sources.schema.json` — schema used to validate records

## Source record format

Each object in `sources.json` should represent a public-records source or a source entry point and should include the following fields:

- `id`: unique identifier for the source
- `name`: official source name
- `url`: direct URL to the source
- `category`: source category such as corporate, property, court, licensing, or government
- `jurisdiction`: geographic or governmental scope
- `description`: short explanation of what the source provides
- `status`: `active` or `deprecated`

## Validation

Use `sources.schema.json` to validate records before publishing updates or integrating with downstream tooling.

## Contribution guidance

When adding new records:

1. Keep the `id` stable and unique.
2. Use a direct link to the official source when possible.
3. Prefer clear, concise descriptions.
4. Validate jurisdiction and category names consistently.
5. Mark sources as `deprecated` rather than silently removing them.

## Example

```json
[
  {
    "id": "us-business-search",
    "name": "U.S. Secretary of State Business Search",
    "url": "https://example.gov/business-search",
    "category": "corporate",
    "jurisdiction": "United States",
    "description": "Business entity and registration lookup database.",
    "status": "active"
  }
]
```
