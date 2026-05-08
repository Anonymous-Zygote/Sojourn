const totalResponsesNode = document.getElementById("total-responses");
const mappedLocationsNode = document.getElementById("mapped-locations");
const latestCityNode = document.getElementById("latest-city");
const recentLocationsNode = document.getElementById("recent-locations");
const emptyStateNode = document.getElementById("dashboard-empty");
const mapNode = document.getElementById("map");
const recentReligionFilter = document.getElementById("filter-recent-religion");
const genderFilter = document.getElementById("filter-gender");
const ageRangeFilter = document.getElementById("filter-age-range");

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
  try {
    const params = new URLSearchParams();
    if (recentReligionFilter.value) {
      params.set("recentReligion", recentReligionFilter.value);
    }

    if (genderFilter.value) {
      params.set("gender", genderFilter.value);
    }

    if (ageRangeFilter.value) {
      params.set("ageRange", ageRangeFilter.value);
    }

    const response = await fetch(`/api/respondent-locations?${params.toString()}`);
    if (!response.ok) {
      throw new Error("Unable to load respondent locations");
    }

    const payload = await response.json();
    renderFilterOptions(payload.availableFilters || {});
    renderSummary(payload);
    renderMap(payload.locations);
    renderRecentLocations(payload.locations);
  } catch (error) {
    emptyStateNode.hidden = false;
    emptyStateNode.querySelector("p").textContent = "The dashboard could not load respondent locations right now.";
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
        <li>Most recent submission: ${new Date(location.lastSubmittedAt).toLocaleString()}</li>
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

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
