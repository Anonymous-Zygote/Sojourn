const totalResponsesNode = document.getElementById("total-responses");
const mappedLocationsNode = document.getElementById("mapped-locations");
const latestCityNode = document.getElementById("latest-city");
const recentLocationsNode = document.getElementById("recent-locations");
const emptyStateNode = document.getElementById("dashboard-empty");
const mapNode = document.getElementById("map");
const recentReligionFilter = document.getElementById("filter-recent-religion");
const genderFilter = document.getElementById("filter-gender");
const ageRangeFilter = document.getElementById("filter-age-range");

const sharedResultsStorageKey = "alignedFoundationSharedResults";
const geocodeCacheStorageKey = "alignedFoundationGeocodeCache";
const supabaseEnabled = Boolean(window.alignedFoundationSupabase?.isConfigured?.());

let markers = [];

const map = L.map("map", {
  worldCopyJump: true
}).setView([20, 0], 2);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

loadDashboard();

recentReligionFilter.addEventListener("change", loadDashboard);
genderFilter.addEventListener("change", loadDashboard);
ageRangeFilter.addEventListener("change", loadDashboard);

async function loadDashboard() {
  const entries = supabaseEnabled
    ? await window.alignedFoundationSupabase.listSharedResults()
    : readStoredSharedResults();
  const payload = await buildDashboardPayload(entries, {
    recentReligion: recentReligionFilter.value,
    gender: genderFilter.value,
    ageRange: ageRangeFilter.value
  });

  renderFilterOptions(payload.availableFilters || {});
  renderSummary(payload);
  renderMap(payload.locations);
  renderRecentLocations(payload.locations);
}

async function buildDashboardPayload(entries, activeFilters) {
  const availableFilters = {
    recentReligions: uniqueSorted(entries.map((entry) => entry.demographics?.recentReligion)),
    genders: uniqueSorted(entries.map((entry) => entry.demographics?.gender))
  };

  const filteredEntries = entries.filter((entry) => {
    const demographics = entry.demographics || {};

    if (activeFilters.recentReligion && demographics.recentReligion !== activeFilters.recentReligion) {
      return false;
    }

    if (activeFilters.gender && demographics.gender !== activeFilters.gender) {
      return false;
    }

    if (activeFilters.ageRange && ageToRange(demographics.age) !== activeFilters.ageRange) {
      return false;
    }

    return true;
  });

  const groupedLocations = groupByLocation(filteredEntries);
  const locations = [];

  for (const location of groupedLocations) {
    const coordinates = await geocodeLocation(location.locationLabel);
    if (!coordinates) {
      continue;
    }

    locations.push({
      ...location,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude
    });
  }

  locations.sort((left, right) => new Date(right.lastSubmittedAt) - new Date(left.lastSubmittedAt));

  return {
    totalResponses: filteredEntries.length,
    mappedLocations: locations.length,
    locations,
    availableFilters
  };
}

function readStoredSharedResults() {
  try {
    const rawValue = window.localStorage.getItem(sharedResultsStorageKey);
    if (!rawValue) {
      return [];
    }

    const parsed = JSON.parse(rawValue);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function groupByLocation(entries) {
  const groups = new Map();

  for (const entry of entries) {
    const demographics = entry.demographics || {};
    const city = (demographics.city || "").trim();
    const stateProvince = (demographics.stateProvince || "").trim();
    const country = (demographics.country || "").trim();
    if (!city || !country) {
      continue;
    }

    const locationLabel = [city, stateProvince, country].filter(Boolean).join(", ");
    const key = [city.toLowerCase(), stateProvince.toLowerCase(), country.toLowerCase()].join("|");
    const ageRange = ageToRange(demographics.age);
    const submittedAt = entry.savedAt || entry.assessment?.generatedAt || new Date().toISOString();
    const group = groups.get(key) || {
      locationLabel,
      count: 0,
      recentReligions: [],
      genders: [],
      ageRanges: [],
      lastSubmittedAt: submittedAt
    };

    group.count += 1;
    if (demographics.recentReligion) {
      group.recentReligions.push(demographics.recentReligion);
    }
    if (demographics.gender) {
      group.genders.push(demographics.gender);
    }
    if (ageRange) {
      group.ageRanges.push(ageRange);
    }
    if (new Date(submittedAt) > new Date(group.lastSubmittedAt)) {
      group.lastSubmittedAt = submittedAt;
    }

    groups.set(key, group);
  }

  return Array.from(groups.values()).map((group) => ({
    ...group,
    recentReligionSummary: summarizeValues(group.recentReligions),
    genderSummary: summarizeValues(group.genders),
    ageRangeSummary: summarizeValues(group.ageRanges)
  }));
}

async function geocodeLocation(locationLabel) {
  const cache = readGeocodeCache();
  if (cache[locationLabel]) {
    return cache[locationLabel];
  }

  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(locationLabel)}`);
    if (!response.ok) {
      return null;
    }

    const payload = await response.json();
    if (!Array.isArray(payload) || !payload[0]) {
      return null;
    }

    const coordinates = {
      latitude: Number(payload[0].lat),
      longitude: Number(payload[0].lon)
    };

    cache[locationLabel] = coordinates;
    writeGeocodeCache(cache);
    return coordinates;
  } catch (error) {
    return null;
  }
}

function readGeocodeCache() {
  try {
    const rawValue = window.localStorage.getItem(geocodeCacheStorageKey);
    if (!rawValue) {
      return {};
    }

    const parsed = JSON.parse(rawValue);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    return {};
  }
}

function writeGeocodeCache(cache) {
  try {
    window.localStorage.setItem(geocodeCacheStorageKey, JSON.stringify(cache));
  } catch (error) {
    // Ignore storage failures and keep rendering without cache persistence.
  }
}

function renderSummary(payload) {
  totalResponsesNode.textContent = String(payload.totalResponses || 0);
  mappedLocationsNode.textContent = String(payload.mappedLocations || 0);
  latestCityNode.textContent = payload.locations[0] ? payload.locations[0].locationLabel : "No data yet";
}

function renderMap(locations) {
  for (const marker of markers) {
    marker.remove();
  }
  markers = [];

  if (!locations.length) {
    mapNode.hidden = true;
    emptyStateNode.hidden = false;
    return;
  }

  mapNode.hidden = false;
  emptyStateNode.hidden = true;
  const bounds = [];

  for (const location of locations) {
    const marker = L.circleMarker([location.latitude, location.longitude], {
      radius: Math.min(18, 6 + location.count),
      color: "#8b4d32",
      weight: 1,
      fillColor: "#d58b5a",
      fillOpacity: 0.78
    }).addTo(map);

    marker.bindPopup(`
      <strong>${escapeHtml(location.locationLabel)}</strong><br>
      ${location.count} shared response${location.count === 1 ? "" : "s"}<br>
      ${escapeHtml(location.recentReligionSummary || "No recent-religion summary")}<br>
      ${escapeHtml(location.genderSummary || "No gender summary")}<br>
      ${escapeHtml(location.ageRangeSummary || "No age summary")}
    `);

    markers.push(marker);
    bounds.push([location.latitude, location.longitude]);
  }

  if (bounds.length === 1) {
    map.setView(bounds[0], 4);
  } else {
    map.fitBounds(bounds, { padding: [28, 28] });
  }
}

function renderRecentLocations(locations) {
  if (!locations.length) {
    recentLocationsNode.innerHTML = "";
    return;
  }

  recentLocationsNode.innerHTML = locations.slice(0, 8).map((location) => `
    <article class="location-card">
      <h3>${escapeHtml(location.locationLabel)}</h3>
      <p><strong>${location.count}</strong> shared response${location.count === 1 ? "" : "s"}</p>
      <p>${escapeHtml(location.recentReligionSummary || "No recent-religion summary")}</p>
      <ul>
        <li>Gender summary: ${escapeHtml(location.genderSummary || "No gender summary")}</li>
        <li>Age summary: ${escapeHtml(location.ageRangeSummary || "No age summary")}</li>
        <li>Approximate coordinates: ${location.latitude.toFixed(2)}, ${location.longitude.toFixed(2)}</li>
        <li>Most recent shared entry: ${new Date(location.lastSubmittedAt).toLocaleString()}</li>
      </ul>
    </article>
  `).join("");
}

function renderFilterOptions(availableFilters) {
  syncSelectOptions(recentReligionFilter, availableFilters.recentReligions || [], "All recent religions");
  syncSelectOptions(genderFilter, availableFilters.genders || [], "All genders");
}

function syncSelectOptions(select, values, defaultLabel) {
  const currentValue = select.value;
  const options = [`<option value="">${defaultLabel}</option>`]
    .concat(values.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`));

  select.innerHTML = options.join("");
  if (values.includes(currentValue)) {
    select.value = currentValue;
  }
}

function summarizeValues(values) {
  const counts = new Map();

  for (const value of values) {
    if (!value) {
      continue;
    }

    counts.set(value, (counts.get(value) || 0) + 1);
  }

  if (!counts.size) {
    return "No data yet";
  }

  return Array.from(counts.entries())
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
    .slice(0, 3)
    .map(([value, count]) => `${value} (${count})`)
    .join(", ");
}

function uniqueSorted(values) {
  return Array.from(new Set(values.filter(Boolean))).sort((left, right) => left.localeCompare(right));
}

function ageToRange(age) {
  const numericAge = Number(age);
  if (!Number.isFinite(numericAge) || numericAge <= 0) {
    return "";
  }

  if (numericAge <= 24) {
    return "18-24";
  }
  if (numericAge <= 34) {
    return "25-34";
  }
  if (numericAge <= 44) {
    return "35-44";
  }
  if (numericAge <= 54) {
    return "45-54";
  }
  if (numericAge <= 64) {
    return "55-64";
  }

  return "65+";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
