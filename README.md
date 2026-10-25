# astro-kit

[![live](https://img.shields.io/badge/live-online-22c55e)](https://drsamonline.github.io/astro-kit/)
[![test](https://github.com/drsamonline/astro-kit/actions/workflows/test.yml/badge.svg)](https://github.com/drsamonline/astro-kit/actions/workflows/test.yml)
[![license](https://img.shields.io/badge/license-PolyForm Noncommercial-blue)](LICENSE)

**The shared astronomy core for drsamonline apps.** Zero dependencies. The
primitives a **panchang** (Indian almanac) needs — and nothing app-specific:

- **Julian day**; **solar** and **lunar longitude** (Meeus);
- **ayanamsa** (Lahiri, approximate); **sunrise / sunset / solar transit**;
- **moon phase** and illumination;
- the derived **tithi, nakshatra, yoga, karana** — from the sun–moon longitude.

```js
const p = Astro.panchang({ y: 2026, m: 10, d: 23, h: 6 }, { lat: 28.6139, lon: 77.2090 });
p.tithi.name;        // "Shukla Dwadashi"
p.nakshatra.name;    // "Purva Bhadrapada"
p.sun.sunriseUTC;    // -> add your timezone offset
```

## Verified against published values

```
node test-node.js
13 passed, 0 failed
```

- Sun apparent longitude vs **Meeus 25.b**: `199.90894` (published `199.90895`).
- Moon longitude vs **Meeus 47.a**: `133.16000` (published `133.162655`).
- Delhi sunrise/sunset, midsummer: `05:24` / `19:22` IST.
- Tithi/nakshatra/yoga/karana ranges and the tithi–elongation relation.

## Accuracy — read this

Solar and lunar longitude are good to about **0.01–0.05°**, which puts a
tithi/nakshatra boundary within roughly **a minute of time**. So panchang
timings are **approximate** — do not present them as exact, and local tradition
may differ. The ayanamsa is a linear Lahiri approximation.

## Licence

MIT. (c) 2026 Dr Sohil Momin. Part of the Forge system — kits open, orchestrator licensed.
