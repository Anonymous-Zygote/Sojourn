const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const args = parseArgs(process.argv.slice(2));
const port = Number(args.port || 4173);
const workspaceRoot = __dirname;
const resultsFile = path.resolve(workspaceRoot, args["results-file"] || "tracking/shared-results.ndjson");
const locationCacheFile = path.resolve(workspaceRoot, args["location-cache-file"] || "tracking/location-cache.json");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".ico": "image/x-icon"
};

const server = http.createServer(async (request, response) => {
  const requestUrl = new URL(request.url, `http://${request.headers.host || `127.0.0.1:${port}`}`);

  if (request.method === "POST" && requestUrl.pathname === "/api/share-results") {
    await handleShareRequest(request, response);
    return;
  }

  if (request.method === "GET" && requestUrl.pathname === "/api/respondent-locations") {
    await handleRespondentLocations(response, requestUrl);
    return;
  }

  if (request.method !== "GET") {
    respondJson(response, 405, { error: "Method not allowed" });
    return;
  }

  if (requestUrl.pathname === "/favicon.ico") {
    response.writeHead(204);
    response.end();
    return;
  }

  serveStatic(requestUrl.pathname, response);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Aligned Foundation server running at http://127.0.0.1:${port}`);
  console.log(`Share results file: ${path.relative(workspaceRoot, resultsFile)}`);
});

async function handleShareRequest(request, response) {
  try {
    const body = await readRequestBody(request);
    const payload = JSON.parse(body || "{}");

    if (!payload.consented || !payload.demographics || !payload.assessment) {
      respondJson(response, 400, { error: "Missing required share payload fields" });
      return;
    }

    const requiredFields = ["recentReligion", "gender", "age", "race", "city", "stateProvince", "country"];
    const missing = requiredFields.find((field) => !String(payload.demographics[field] ?? "").trim());
    if (missing) {
      respondJson(response, 400, { error: `Missing demographics field: ${missing}` });
      return;
    }

    const record = {
      submittedAt: new Date().toISOString(),
      demographics: {
        recentReligion: String(payload.demographics.recentReligion).trim(),
        gender: String(payload.demographics.gender).trim(),
        age: Number(payload.demographics.age),
        race: String(payload.demographics.race).trim(),
        city: String(payload.demographics.city).trim(),
        stateProvince: String(payload.demographics.stateProvince).trim(),
        country: String(payload.demographics.country).trim()
      },
      assessment: payload.assessment
    };

    await fs.promises.mkdir(path.dirname(resultsFile), { recursive: true });
    await fs.promises.appendFile(resultsFile, `${JSON.stringify(record)}\n`, "utf8");

    respondJson(response, 200, {
      ok: true,
      filePath: path.relative(workspaceRoot, resultsFile).replace(/\\/g, "/")
    });
  } catch (error) {
    respondJson(response, 500, { error: "Unable to save shared results" });
  }
}

async function handleRespondentLocations(response, requestUrl = new URL(`http://127.0.0.1:${port}`)) {
  try {
    const records = await readNdjsonRecords(resultsFile);
    const filters = {
      recentReligion: requestUrl.searchParams.get("recentReligion") || "",
      gender: requestUrl.searchParams.get("gender") || "",
      ageRange: requestUrl.searchParams.get("ageRange") || ""
    };
    const filteredRecords = records.filter((record) => matchesFilters(record, filters));
    const grouped = groupRecordsByLocation(filteredRecords);
    const locationCache = await readJsonFile(locationCacheFile, {});
    let cacheChanged = false;
    const locations = [];

    for (const group of grouped) {
      const cacheKey = group.locationKey.toLowerCase();
      let cached = locationCache[cacheKey];

      if (!cached) {
        cached = await geocodeLocation(group.city, group.stateProvince, group.country);
        locationCache[cacheKey] = cached;
        cacheChanged = true;
      }

      if (!cached || typeof cached.latitude !== "number" || typeof cached.longitude !== "number") {
        continue;
      }

      locations.push({
        city: group.city,
        stateProvince: group.stateProvince,
        country: group.country,
        locationLabel: group.locationLabel,
        count: group.count,
        latitude: cached.latitude,
        longitude: cached.longitude,
        recentReligionSummary: group.recentReligionSummary,
        genderSummary: group.genderSummary,
        ageRangeSummary: group.ageRangeSummary,
        lastSubmittedAt: group.lastSubmittedAt
      });
    }

    if (cacheChanged) {
      await fs.promises.mkdir(path.dirname(locationCacheFile), { recursive: true });
      await fs.promises.writeFile(locationCacheFile, JSON.stringify(locationCache, null, 2), "utf8");
    }

    locations.sort((left, right) => new Date(right.lastSubmittedAt) - new Date(left.lastSubmittedAt));

    respondJson(response, 200, {
      totalResponses: filteredRecords.length,
      availableFilters: buildAvailableFilters(records),
      appliedFilters: filters,
      mappedLocations: locations.length,
      locations
    });
  } catch (error) {
    respondJson(response, 500, { error: "Unable to build respondent location dashboard" });
  }
}

async function serveStatic(requestPath, response) {
  const normalizedPath = requestPath === "/" ? "/index.html" : requestPath;
  const safePath = path.normalize(normalizedPath).replace(/^([.][.][/\\])+/, "");
  const filePath = path.join(workspaceRoot, safePath);

  if (!filePath.startsWith(workspaceRoot)) {
    respondJson(response, 403, { error: "Forbidden" });
    return;
  }

  try {
    const stat = await fs.promises.stat(filePath);
    const finalPath = stat.isDirectory() ? path.join(filePath, "index.html") : filePath;
    const ext = path.extname(finalPath).toLowerCase();
    const content = await fs.promises.readFile(finalPath);

    response.writeHead(200, {
      "Content-Type": mimeTypes[ext] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    response.end(content);
  } catch (error) {
    respondJson(response, 404, { error: "Not found" });
  }
}

function respondJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(JSON.stringify(payload));
}

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 2_000_000) {
        reject(new Error("Request too large"));
        request.destroy();
      }
    });

    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

function parseArgs(argv) {
  const parsed = {};

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) {
      continue;
    }

    const key = token.slice(2);
    const next = argv[index + 1];
    if (!next || next.startsWith("--")) {
      parsed[key] = true;
      continue;
    }

    parsed[key] = next;
    index += 1;
  }

  return parsed;
}

async function readNdjsonRecords(filePath) {
  try {
    const contents = await fs.promises.readFile(filePath, "utf8");

    return contents
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => JSON.parse(line));
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

function groupRecordsByLocation(records) {
  const grouped = new Map();

  for (const record of records) {
    const city = String(record?.demographics?.city ?? "").trim();
    const stateProvince = String(record?.demographics?.stateProvince ?? "").trim();
    const country = String(record?.demographics?.country ?? "").trim();
    if (!city) {
      continue;
    }

    const locationLabel = [city, stateProvince, country].filter(Boolean).join(", ");
    const key = locationLabel.toLowerCase();
    if (!grouped.has(key)) {
      grouped.set(key, {
        city,
        stateProvince,
        country,
        locationLabel,
        locationKey: key,
        count: 0,
        lastSubmittedAt: record.submittedAt,
        recentReligions: new Map(),
        genders: new Map(),
        ageRanges: new Map()
      });
    }

    const group = grouped.get(key);
    group.count += 1;

    if (new Date(record.submittedAt) > new Date(group.lastSubmittedAt)) {
      group.lastSubmittedAt = record.submittedAt;
    }

    const recentReligion = String(record?.demographics?.recentReligion ?? "Unspecified").trim() || "Unspecified";
    group.recentReligions.set(recentReligion, (group.recentReligions.get(recentReligion) || 0) + 1);

    const gender = String(record?.demographics?.gender ?? "Unspecified").trim() || "Unspecified";
    group.genders.set(gender, (group.genders.get(gender) || 0) + 1);

    const ageRange = getAgeRangeLabel(Number(record?.demographics?.age));
    group.ageRanges.set(ageRange, (group.ageRanges.get(ageRange) || 0) + 1);
  }

  return [...grouped.values()].map((group) => ({
    city: group.city,
    stateProvince: group.stateProvince,
    country: group.country,
    locationLabel: group.locationLabel,
    locationKey: group.locationKey,
    count: group.count,
    lastSubmittedAt: group.lastSubmittedAt,
    recentReligionSummary: summarizeCounts(group.recentReligions),
    genderSummary: summarizeCounts(group.genders),
    ageRangeSummary: summarizeCounts(group.ageRanges)
  }));
}

function summarizeCounts(entriesMap) {
  return [...entriesMap.entries()]
    .sort((left, right) => right[1] - left[1])
    .slice(0, 3)
    .map(([label, count]) => `${label} (${count})`)
    .join(", ");
}

function buildAvailableFilters(records) {
  const recentReligions = new Set();
  const genders = new Set();
  const ageRanges = new Set();

  for (const record of records) {
    recentReligions.add(String(record?.demographics?.recentReligion ?? "Unspecified").trim() || "Unspecified");
    genders.add(String(record?.demographics?.gender ?? "Unspecified").trim() || "Unspecified");
    ageRanges.add(getAgeRangeLabel(Number(record?.demographics?.age)));
  }

  return {
    recentReligions: [...recentReligions].sort((left, right) => left.localeCompare(right)),
    genders: [...genders].sort((left, right) => left.localeCompare(right)),
    ageRanges: ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"].filter((label) => ageRanges.has(label))
  };
}

function matchesFilters(record, filters) {
  const recentReligion = String(record?.demographics?.recentReligion ?? "").trim();
  const gender = String(record?.demographics?.gender ?? "").trim();
  const ageRange = getAgeRangeLabel(Number(record?.demographics?.age));

  if (filters.recentReligion && recentReligion !== filters.recentReligion) {
    return false;
  }

  if (filters.gender && gender !== filters.gender) {
    return false;
  }

  if (filters.ageRange && ageRange !== filters.ageRange) {
    return false;
  }

  return true;
}

function getAgeRangeLabel(age) {
  if (Number.isNaN(age) || age < 18) {
    return "18-24";
  }

  if (age <= 24) {
    return "18-24";
  }

  if (age <= 34) {
    return "25-34";
  }

  if (age <= 44) {
    return "35-44";
  }

  if (age <= 54) {
    return "45-54";
  }

  if (age <= 64) {
    return "55-64";
  }

  return "65+";
}

async function readJsonFile(filePath, fallbackValue) {
  try {
    const contents = await fs.promises.readFile(filePath, "utf8");
    return JSON.parse(contents);
  } catch (error) {
    if (error.code === "ENOENT") {
      return fallbackValue;
    }

    throw error;
  }
}

async function geocodeLocation(city, stateProvince, country) {
  try {
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.set("q", [city, stateProvince, country].filter(Boolean).join(", "));
    url.searchParams.set("format", "jsonv2");
    url.searchParams.set("limit", "1");

    const response = await fetch(url, {
      headers: {
        "User-Agent": "AlignedFoundationLocalDashboard/1.0"
      }
    });

    if (!response.ok) {
      return null;
    }

    const results = await response.json();
    const match = results[0];
    if (!match) {
      return null;
    }

    return {
      latitude: Number(match.lat),
      longitude: Number(match.lon),
      displayName: match.display_name
    };
  } catch (error) {
    return null;
  }
}