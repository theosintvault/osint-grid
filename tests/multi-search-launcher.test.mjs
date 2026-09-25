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
      }
    ],
    {
      valid: "https://example.com/search?q={query}",
      "invalid-protocol": "javascript:alert(1)"
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
