# Multi-search launcher

The multi-search launcher is a browser page at `/docs/multi-search-launcher.html`.

## How to use

1. Open the launcher page.
2. Enter a search term.
3. Select categories and/or specific sources.
4. Choose **Generate links** to review targets, or **Launch in new tabs** to open them.

## Safety and filtering rules

- Sources are loaded from `data/sources.json`.
- Only `active` sources with valid `http`/`https` URLs are launchable.
- `deprecated`, malformed, and non-HTTP(S) entries are skipped.
- Search terms are URL-encoded before insertion into a query template.

## Query support model

Not every catalog source is assumed to support query parameters.

- Optional query templates are defined in `data/search-launcher.config.json` under `queryTemplates`.
- Template format: include `{query}` where the encoded search term should be inserted.
- If a source has no template, launcher fallback is the source homepage URL.

## Adding support for future catalog entries

1. Add or update the source record in `data/sources.json`.
2. If the source supports URL query launch, add a template in `data/search-launcher.config.json`:

```json
{
  "queryTemplates": {
    "your-source-id": "https://source.example/search?q={query}"
  }
}
```

3. Run launcher tests:

```bash
node --test /home/runner/work/osint-grid/osint-grid/tests/multi-search-launcher.test.mjs
```
