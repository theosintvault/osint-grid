import {
  createLaunchItems,
  normalizeSources
} from "./multi-search-launcher-core.js";

const SEARCH_LIMIT = 25;

async function loadJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load ${url} (${response.status})`);
  }
  return response.json();
}

function createCheckbox(id, label, onChange) {
  const container = document.createElement("label");
  container.className = "option-item";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.dataset.value = id;
  checkbox.addEventListener("change", onChange);

  const text = document.createElement("span");
  text.textContent = label;

  container.appendChild(checkbox);
  container.appendChild(text);
  return container;
}

function uniqueSorted(items) {
  return [...new Set(items)].sort((a, b) => a.localeCompare(b));
}

function createState() {
  return {
    allSources: [],
    selectedCategories: new Set(),
    selectedSourceIds: new Set()
  };
}

function renderSources(state, nodes) {
  const { sourceList, sourceSearch } = nodes;
  sourceList.innerHTML = "";

  const filterTerm = sourceSearch.value.trim().toLowerCase();
  const visible = state.allSources
    .filter((source) => {
      if (!filterTerm) {
        return true;
      }
      return (
        source.name.toLowerCase().includes(filterTerm) ||
        source.category.toLowerCase().includes(filterTerm) ||
        source.jurisdiction.toLowerCase().includes(filterTerm)
      );
    })
    .slice(0, SEARCH_LIMIT);

  for (const source of visible) {
    const label = `${source.name} (${source.category})`;
    const option = createCheckbox(source.id, label, () => {
      if (state.selectedSourceIds.has(source.id)) {
        state.selectedSourceIds.delete(source.id);
      } else {
        state.selectedSourceIds.add(source.id);
      }
    });

    if (state.selectedSourceIds.has(source.id)) {
      option.querySelector("input").checked = true;
    }

    sourceList.appendChild(option);
  }
}

function renderCategories(state, categoryList) {
  for (const category of uniqueSorted(state.allSources.map((s) => s.category))) {
    const option = createCheckbox(category, category, () => {
      if (state.selectedCategories.has(category)) {
        state.selectedCategories.delete(category);
      } else {
        state.selectedCategories.add(category);
      }
    });

    categoryList.appendChild(option);
  }
}

function renderResult(items, output) {
  output.innerHTML = "";

  if (items.length === 0) {
    const message = document.createElement("p");
    message.textContent = "No launchable links were generated. Add a search term and choose sources or categories.";
    output.appendChild(message);
    return;
  }

  const list = document.createElement("ul");

  for (const item of items) {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = item.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = `${item.source.name} (${item.querySupported ? "query URL" : "source homepage"})`;

    li.appendChild(link);
    list.appendChild(li);
  }

  output.appendChild(list);
}

function launchLinks(items) {
  for (const item of items) {
    window.open(item.url, "_blank", "noopener,noreferrer");
  }
}

async function main() {
  const state = createState();

  const nodes = {
    categoryList: document.getElementById("category-list"),
    sourceList: document.getElementById("source-list"),
    sourceSearch: document.getElementById("source-search"),
    searchTerm: document.getElementById("search-term"),
    generateButton: document.getElementById("generate-links"),
    launchButton: document.getElementById("launch-links"),
    output: document.getElementById("launch-output"),
    status: document.getElementById("launcher-status")
  };

  try {
    const [sources, config] = await Promise.all([
      loadJson("../data/sources.json"),
      loadJson("../data/search-launcher.config.json")
    ]);

    state.allSources = normalizeSources(sources, config.queryTemplates);

    renderCategories(state, nodes.categoryList);
    renderSources(state, nodes);

    nodes.sourceSearch.addEventListener("input", () => {
      renderSources(state, nodes);
    });

    const run = (shouldLaunch) => {
      const items = createLaunchItems({
        sources: state.allSources,
        selectedCategories: state.selectedCategories,
        selectedSourceIds: state.selectedSourceIds,
        searchTerm: nodes.searchTerm.value
      });

      renderResult(items, nodes.output);
      if (shouldLaunch) {
        launchLinks(items);
      }
    };

    nodes.generateButton.addEventListener("click", () => run(false));
    nodes.launchButton.addEventListener("click", () => run(true));

    nodes.status.textContent = `Loaded ${state.allSources.length} active, launchable sources.`;
  } catch (error) {
    nodes.status.textContent = `Launcher failed to initialize: ${error.message}`;
  }
}

main();
