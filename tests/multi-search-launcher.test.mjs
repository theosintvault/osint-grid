import test from "node:test";
import assert from "node:assert/strict";

import {
  buildSearchUrl,
  createLaunchItems,
  normalizeSources
} from "../docs/multi-search-launcher-core.js";

test("normalizeSources excludes deprecated, malformed, and non-http sources", () => {
  const normalized = normalizeSources(
    [
      {
        id: "valid",
        name: "Valid",
        category: "court",
        jurisdiction: "US",
        url: "https://example.com/search",
        status: "active"
      },
      {
        id: "deprecated",
        name: "Deprecated",
        category: "court",
        jurisdiction: "US",
        url: "https://example.com/old",
        status: "deprecated"
      },
      {
        id: "invalid-protocol",
        name: "Invalid protocol",
        category: "court",
        jurisdiction: "US",
        url: "javascript:alert(1)",
        status: "active"
      },
      {
        id: "invalid-url",
        name: "Invalid url",
        category: "court",
        jurisdiction: "US",
        url: "not a url",
        status: "active"
      },
      {
        id: "missing-fields",
        name: "Missing fields",
        url: "https://example.com",
        status: "active"
      },
      {
        id: "path-template",
        name: "Path template",
        category: "court",
        jurisdiction: "US",
        url: "https://example.com",
        status: "active"
      }
    ],
    {
      valid: "https://example.com/search?q={query}",
      "invalid-protocol": "javascript:alert(1)",
      "path-template": "https://example.com/{query}"
    }
  );

  assert.equal(normalized.length, 1);
  assert.equal(normalized[0].id, "valid");
});

test("buildSearchUrl encodes search term in query template", () => {
  const url = buildSearchUrl(
    {
      id: "valid",
      url: "https://example.com",
      queryTemplate: "https://example.com/search?q={query}"
    },
    "john doe & sons"
  );

  assert.equal(url, "https://example.com/search?q=john%20doe%20%26%20sons");
});

test("createLaunchItems returns empty list when input is empty", () => {
  const launchItems = createLaunchItems({
    sources: [
      {
        id: "valid",
        category: "court",
        url: "https://example.com"
      }
    ],
    selectedCategories: new Set(),
    selectedSourceIds: new Set(),
    searchTerm: "  "
  });

  assert.deepEqual(launchItems, []);
});

test("createLaunchItems falls back to source URL when no query template exists", () => {
  const [item] = createLaunchItems({
    sources: [
      {
        id: "no-template",
        name: "No template",
        category: "government",
        url: "https://example.gov"
      }
    ],
    selectedCategories: new Set(["government"]),
    selectedSourceIds: new Set(),
    searchTerm: "example"
  });

  assert.equal(item.url, "https://example.gov");
  assert.equal(item.querySupported, false);
});

test("normalizeSources ignores templates that do not contain {query}", () => {
  const [source] = normalizeSources(
    [
      {
        id: "missing-placeholder",
        name: "Missing placeholder",
        category: "court",
        jurisdiction: "US",
        url: "https://example.com",
        status: "active"
      }
    ],
    {
      "missing-placeholder": "https://example.com/search"
    }
  );

  assert.equal(source.queryTemplate, null);
});

test("createLaunchItems applies source and category filters together", () => {
  const items = createLaunchItems({
    sources: [
      {
        id: "in-category",
        name: "In category",
        category: "court",
        url: "https://example.com"
      },
      {
        id: "out-category",
        name: "Out category",
        category: "government",
        url: "https://example.org"
      }
    ],
    selectedCategories: new Set(["court"]),
    selectedSourceIds: new Set(["in-category", "out-category"]),
    searchTerm: "term"
  });

  assert.equal(items.length, 1);
  assert.equal(items[0].source.id, "in-category");
});
