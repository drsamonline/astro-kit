/* Node test for astro-kit.
 * References: Meeus, "Astronomical Algorithms" worked examples.
 *   25.b sun apparent longitude: JDE 2448908.5 (1992 Oct 13.0 TD) -> 199.90895
 *   47.a moon longitude:         JDE 2448724.5 (1992 Apr 12.0 TD) -> 133.162655
 */
require(require("path").join(__dirname, "astro-kit.js"));
const A = global.Astro;

let pass = 0, fail = 0;
function ok(name, cond, extra) { cond ? (pass++, console.log("PASS  " + name + (extra ? "  (" + extra + ")" : ""))) : (fail++, console.log("FAIL  " + name + (extra ? "  (" + extra + ")" : ""))); }
function near(a, b, tol) { return Math.abs(a - b) <= tol; }

// --- reference values ---
const sun = A.sunLongitude(2448908.5);
ok("sun apparent longitude vs Meeus 25.b (199.90895)", near(sun, 199.90895, 0.02), "got " + sun.toFixed(5));

const moon = A.moonLongitude(2448724.5);
ok("moon longitude vs Meeus 47.a (133.162655)", near(moon, 133.162655, 0.05), "got " + moon.toFixed(5));

// --- Julian day ---
ok("J2000 = JD 2451545.0", near(A.jd({ y: 2000, m: 1, d: 1, h: 12 }), 2451545.0, 1e-6), "got " + A.jd({ y: 2000, m: 1, d: 1, h: 12 }));

// --- ranges / internal consistency ---
const p = A.panchang({ y: 2026, m: 10, d: 23, h: 6 });
ok("tithi index in 1..30", p.tithi.index >= 1 && p.tithi.index <= 30, p.tithi.paksha + " " + p.tithi.name);
ok("nakshatra index in 1..27", p.nakshatra.index >= 1 && p.nakshatra.index <= 27, p.nakshatra.name + " pada " + p.nakshatra.pada);
ok("yoga index in 1..27", p.yoga.index >= 1 && p.yoga.index <= 27, p.yoga.name);
ok("karana index in 1..60", p.karana.index >= 1 && p.karana.index <= 60, p.karana.name);
ok("moon illumination in 0..1", p.moonPhase.illumination >= 0 && p.moonPhase.illumination <= 1, p.moonPhase.name);

// elongation ~ 12 * (tithi index - 1) .. +12
const e = p.tithi.elongation;
ok("tithi index agrees with elongation", Math.floor(e / 12) + 1 === p.tithi.index);

// --- sunrise / sunset (Delhi) ---
const s = A.sunriseSunset(new Date(Date.UTC(2026, 5, 21)), 28.6139, 77.2090); // 21 Jun 2026
const riseIST = s.sunriseUTC + 5.5, setIST = s.sunsetUTC + 5.5;
ok("sunrise before sunset", s.sunriseUTC < s.sunsetUTC);
ok("Delhi midsummer sunrise ~05:20 IST", riseIST > 5.1 && riseIST < 5.6, "got " + riseIST.toFixed(2) + " IST");
ok("Delhi midsummer sunset ~19:25 IST", setIST > 19.1 && setIST < 19.7, "got " + setIST.toFixed(2) + " IST");

const w = A.sunriseSunset(new Date(Date.UTC(2026, 11, 21)), 28.6139, 77.2090); // 21 Dec 2026
ok("Delhi midwinter day is shorter than midsummer", (w.sunsetUTC - w.sunriseUTC) < (s.sunsetUTC - s.sunriseUTC));

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
