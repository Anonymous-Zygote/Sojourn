(function () {
  const configSource = window.ALIGNED_FOUNDATION_SUPABASE || {};
  const tableName = configSource.tableName || "shared_results";

  function getConfig() {
    return {
      url: String(configSource.url || "").trim(),
      anonKey: String(configSource.anonKey || "").trim(),
      tableName: String(tableName).trim() || "shared_results"
    };
  }

  function isConfigured() {
    const config = getConfig();
    return Boolean(config.url && config.anonKey && config.tableName);
  }

  async function insertSharedResult(entry) {
    const config = getConfig();
    if (!isConfigured()) {
      throw new Error("Supabase is not configured");
    }

    const response = await fetch(`${config.url}/rest/v1/${config.tableName}`, {
      method: "POST",
      headers: {
        apikey: config.anonKey,
        Authorization: `Bearer ${config.anonKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal"
      },
      body: JSON.stringify([toRow(entry)])
    });

    if (!response.ok) {
      throw new Error(`Supabase insert failed: ${response.status}`);
    }
  }

  async function listSharedResults() {
    const config = getConfig();
    if (!isConfigured()) {
      return [];
    }

    const select = [
      "id",
      "saved_at",
      "recent_religion",
      "gender",
      "age",
      "race",
      "city",
      "state_province",
      "country",
      "assessment"
    ].join(",");

    const response = await fetch(`${config.url}/rest/v1/${config.tableName}?select=${encodeURIComponent(select)}&order=saved_at.desc`, {
      headers: {
        apikey: config.anonKey,
        Authorization: `Bearer ${config.anonKey}`
      }
    });

    if (!response.ok) {
      throw new Error(`Supabase read failed: ${response.status}`);
    }

    const rows = await response.json();
    return Array.isArray(rows) ? rows.map(fromRow) : [];
  }

  function toRow(entry) {
    return {
      saved_at: entry.savedAt,
      recent_religion: entry.demographics.recentReligion,
      gender: entry.demographics.gender,
      age: entry.demographics.age,
      race: entry.demographics.race,
      city: entry.demographics.city,
      state_province: entry.demographics.stateProvince,
      country: entry.demographics.country,
      assessment: entry.assessment
    };
  }

  function fromRow(row) {
    return {
      savedAt: row.saved_at,
      demographics: {
        recentReligion: row.recent_religion || "",
        gender: row.gender || "",
        age: row.age || "",
        race: row.race || "",
        city: row.city || "",
        stateProvince: row.state_province || "",
        country: row.country || ""
      },
      assessment: row.assessment || null
    };
  }

  window.alignedFoundationSupabase = {
    getConfig,
    isConfigured,
    insertSharedResult,
    listSharedResults
  };
})();