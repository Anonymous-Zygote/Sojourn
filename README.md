# Aligned Foundation

Aligned Foundation is a lightweight web app for values-based religious exploration.

It helps a person reflect on:

- where they want moral authority to come from
- how much doctrinal openness they want
- whether ritual, contemplation, inclusion, hierarchy, and public justice matter to them
- whether faith should be outwardly visible or more private
- whether they connect most through nature and solitude or structured communal worship
- whether transformation feels more like grace and worship or self-mastery and spiritual technique
- how much a tradition should shape daily lifestyle and boundaries
- which non-negotiables must be present in a community

The app then compares those answers to broad religious and denominational patterns and explains:

- why a tradition appeared
- where tensions may exist
- what to verify in an actual local community

The app now includes a broader set of traditions and denominations, including:

- Roman Catholic, Eastern Orthodox, Anglican / Episcopal, Lutheran, Presbyterian, Methodist, Baptist, Pentecostal, Assemblies of God, Seventh-day Adventist, Evangelical Protestant, Quaker, Latter-day Saints, and Community of Christ
- Sunni Islam and Shia Islam
- Reform, Conservative, and Modern Orthodox Judaism
- Hinduism, Buddhist meditation communities, Sikhism, Bahá'í, Wicca, contemporary Pagan traditions, Scientology, atheist / secular humanist, and spiritually open unaffiliated pathways

## Design principles

- No gimmicks or personality-quiz framing
- No claim that one score settles truth
- Broad-family descriptions only; local communities vary
- Transparent reasons and cautions instead of opaque ranking

## Run locally

Open `index.html` directly in a browser.

If you prefer a local server, you can also serve the folder with any static file server.

## Live local testing

After installing dependencies:

- `npm run serve` starts a local server at `http://127.0.0.1:4173`
- `npm run test:e2e` runs automated browser tests with Playwright

## Community share tracking

- The results screen includes an explicit opt-in section for anonymous community sharing.
- If a person opts in, the app asks for most recent religion, gender, age, race, city, state or province, and country.
- The app writes the full result set plus those fields to `tracking/shared-results.ndjson`, appending one JSON record per line.
- Playwright tests use a separate file, `tracking/test-shared-results.ndjson`, so test traffic does not pollute real data.

## Respondent dashboard

- The results page links to `/dashboard.html`, a separate page for a global respondent map.
- The dashboard reads shared responses from the tracking file and geocodes self-reported city, state or province, and country into approximate map pins.
- The dashboard can be filtered by recent religion, gender, and age range.
- Geocode results are cached locally in `tracking/location-cache.json` when available.

## Included preset personas

- Rebuilding With Openness
- Seeking Historic Rootedness
- Justice With Ritual Depth
- Contemplative Practice Seeker