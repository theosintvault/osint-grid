export function isSafeHttpUrl(value) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function normalizeSources(sources, queryTemplates = {}) {
  if (!Array.isArray(sources)) {
    return [];
  }

  return sources
    .filter((source) => source && source.status === "active")
    .filter(
      (source) =>
        typeof source.id === "string" &&
        typeof source.name === "string" &&
        typeof source.category === "string" &&
        typeof source.jurisdiction === "string"
    )
    .filter((source) => isSafeHttpUrl(source.url))
    .map((source) => {
      const template =
        typeof queryTemplates[source.id] === "string" &&
        queryTemplates[source.id].includes("{query}")
          ? queryTemplates[source.id]
          : null;

      return {
        ...source,
        queryTemplate: template
      };
    })
    .filter((source) => {
      if (!source.queryTemplate) {
        return true;
      }

      const substituted = source.queryTemplate.replaceAll(
        "{query}",
        encodeURIComponent("placeholder")
      );
      if (!isSafeHttpUrl(substituted)) {
        return false;
      }

      const parsed = new URL(substituted);
      return parsed.search.includes("placeholder");
    });
}

export function buildSearchUrl(source, rawSearchTerm) {
  const term = String(rawSearchTerm || "").trim();
  if (!term) {
    return null;
  }

  if (source.queryTemplate) {
    return source.queryTemplate.replaceAll("{query}", encodeURIComponent(term));
  }

  return source.url;
}

export function createLaunchItems({
  sources,
  selectedCategories,
  selectedSourceIds,
  searchTerm
}) {
  const term = String(searchTerm || "").trim();
  if (!term) {
    return [];
  }

  const hasCategorySelection = selectedCategories.size > 0;
  const hasSourceSelection = selectedSourceIds.size > 0;

  return sources
    .filter((source) => {
      const matchesSource = !hasSourceSelection || selectedSourceIds.has(source.id);
      const matchesCategory =
        !hasCategorySelection || selectedCategories.has(source.category);
      return matchesSource && matchesCategory;
    })
    .map((source) => ({
      source,
      url: buildSearchUrl(source, term),
      querySupported: Boolean(source.queryTemplate)
    }))
    .filter((item) => item.url);
}
