# astro-kit — API reference

**Version 1.0.0.** **The shared astronomy core for drsamonline apps.** Zero dependencies. The primitives a **panchang** (Indian almanac) needs — and nothing app-specific:

Generated from the source in this repository: every name, argument and
note below is read out of the kit file, so it cannot describe a function
that is not there.

```js
<script src="astro-kit.js"></script>
Astro.jd(...)
// or: const Astro = require('./astro-kit.js')
```

## The surface (15 entries)

| Name | Arguments | What it does |
|---|---|---|
| `Astro.jd` | `(when)` | Julian Day from a JS Date (interpreted as UTC) or {y,m,d,h}. |
| `Astro.jdFromDate` | `(dt)` | — |
| `Astro.sunLongitude` | `(jde)` | ---------- the sun (Meeus ch. 25) ---------- |
| `Astro.moonLongitude` | `(jde)` | — |
| `Astro.ayanamsa` | `(jde)` | ---------- ayanamsa (Lahiri, approximate) ---------- |
| `Astro.sunriseSunset` | `(dateUTC, lat, lon)` | — |
| `Astro.elongation` | `(jde)` | — |
| `Astro.tithi` | `(jde)` | — |
| `Astro.nakshatra` | `(jde)` | — |
| `Astro.yoga` | `(jde)` | — |
| `Astro.karana` | `(jde)` | — |
| `Astro.moonPhase` | `(jde)` | — |
| `Astro.panchang` | `(when, opts)` | — |
| `Astro.fromJd` | `(jd)` | — |
| `Astro.tables` | `()` | — |

## Notes

- Zero dependencies, one file, no build step: it works from `file://`, from a
  `<script>` tag and from Node.
- The version above is the `VERSION` file in this repository; a pinned copy is
  what an app vendors.
