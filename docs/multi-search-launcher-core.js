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
    .filter((source) => isSafeHttpUrl(source.url))
    .map((source) => ({
      ...source,
      queryTemplate:
        typeof queryTemplates[source.id] === "string"
          ? queryTemplates[source.id]
          : null
    }))
    .filter((source) => {
      if (!source.queryTemplate) {
        return true;
      }
      return isSafeHttpUrl(source.queryTemplate.replace("{query}", "placeholder"));
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
      if (hasSourceSelection) {
        return selectedSourceIds.has(source.id);
      }

      if (hasCategorySelection) {
        return selectedCategories.has(source.category);
      }

      return true;
    })
    .map((source) => ({
      source,
      url: buildSearchUrl(source, term),
      querySupported: Boolean(source.queryTemplate)
    }))
    .filter((item) => item.url);
}
