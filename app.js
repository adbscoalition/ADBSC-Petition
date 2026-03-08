const tabTitle = document.body?.dataset?.tabTitle;
if (tabTitle) document.title = tabTitle;

const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primaryNav');

if (navToggle && primaryNav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    primaryNav.classList.toggle('open', !expanded);
  });
}

const entryLoader = document.getElementById('entryLoader');

if (entryLoader) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const duration = reducedMotion ? 300 : 1500;

  function finalizeLoader() {
    if (!reducedMotion) entryLoader.classList.add('peak-flash');
    setTimeout(() => entryLoader.classList.add('loaded'), reducedMotion ? 0 : 180);
  }

  function runCltLoader() {
    const cltValue = document.getElementById('cltValue');
    const cltBar = document.getElementById('cltBar');
    const tungstenValue = document.getElementById('tungstenValue');
    const tungstenBar = document.getElementById('tungstenBar');
    const loaderStatus = document.getElementById('loaderStatus');

    if (!(cltValue && cltBar && tungstenValue && tungstenBar && loaderStatus)) {
      finalizeLoader();
      return;
    }

    const cltFinal = 1_000_000;
    const tungstenStart = 0.00001;
    const tungstenFinal = 0.99;
    const phases = [
      { at: 0.1, label: 'Scanning for Charlotte signatures...' },
      { at: 0.42, label: 'Field intensity rising...' },
      { at: 0.74, label: 'Tungsten concentration stabilizing...' },
      { at: 0.95, label: 'Magnetic lock acquired.' }
    ];

    const start = performance.now();
    const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);

    function frame(now) {
      const t = Math.min((now - start) / duration, 1);
      const base = easeOutQuint(t);
      const jitterStrength = reducedMotion ? 0 : (1 - t) * 0.014;
      const jitter = (Math.sin(now * 0.045) + Math.sin(now * 0.018 + 1.7)) * jitterStrength;
      const surge = reducedMotion ? 0 : Math.exp(-Math.pow((t - 0.93) / 0.055, 2)) * 0.09;
      const signal = Math.min(1, Math.max(0, base + jitter + surge));

      const cltCurrent = Math.floor(signal * cltFinal);
      const tungstenCurrent = tungstenStart + signal * (tungstenFinal - tungstenStart);

      cltValue.textContent = cltCurrent.toLocaleString();
      tungstenValue.textContent = `${tungstenCurrent.toFixed(5)} mg/m³`;
      cltBar.style.width = `${signal * 100}%`;
      tungstenBar.style.width = `${signal * 100}%`;

      let status = phases[0].label;
      for (const p of phases) if (t >= p.at) status = p.label;
      loaderStatus.textContent = status;

      if (!reducedMotion) {
        entryLoader.style.setProperty('--loader-glow', String(0.35 + signal * 0.65));
      }

      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        cltValue.textContent = '1,000,000';
        tungstenValue.textContent = '0.99 mg/m³';
        loaderStatus.textContent = 'Field synchronized. Entering CLT page.';
        finalizeLoader();
      }
    }

    requestAnimationFrame(frame);
  }

  function runMainLoader() {
    const status = document.getElementById('mainLoaderStatus');
    const phases = [
      { at: 0.1, label: 'Booting OCharlotteD realm...' },
      { at: 0.36, label: 'Aligning magnetic architecture...' },
      { at: 0.67, label: 'Charging sacred Charlotte core...' },
      { at: 0.92, label: 'OCharlotteD online.' }
    ];

    const start = performance.now();

    function frame(now) {
      const t = Math.min((now - start) / duration, 1);
      if (!reducedMotion) entryLoader.style.setProperty('--loader-glow', String(0.32 + t * 0.7));
      let label = phases[0].label;
      for (const p of phases) if (t >= p.at) label = p.label;
      if (status) status.textContent = label;
      if (t < 1) requestAnimationFrame(frame);
      else finalizeLoader();
    }

    requestAnimationFrame(frame);
  }

  function runPortalsLoader() {
    const status = document.getElementById('portalLoaderStatus');
    const bar = document.getElementById('portalLoaderBar');
    const nodes = Array.from(document.querySelectorAll('.portal-loader-network span'));
    const phases = [
      { at: 0.1, label: 'Opening destination channels...' },
      { at: 0.38, label: 'Linking model gateways...' },
      { at: 0.69, label: 'Verifying portal routes...' },
      { at: 0.92, label: 'Portal registry ready.' }
    ];

    const start = performance.now();

    function frame(now) {
      const t = Math.min((now - start) / duration, 1);
      if (bar) bar.style.width = `${t * 100}%`;
      if (!reducedMotion) entryLoader.style.setProperty('--loader-glow', String(0.32 + t * 0.7));

      const activeCount = Math.floor(t * nodes.length);
      nodes.forEach((node, i) => node.classList.toggle('active', i <= activeCount));

      let label = phases[0].label;
      for (const p of phases) if (t >= p.at) label = p.label;
      if (status) status.textContent = label;

      if (t < 1) requestAnimationFrame(frame);
      else finalizeLoader();
    }

    requestAnimationFrame(frame);
  }


  function runLegalLoader() {
    const status = document.getElementById('legalLoaderStatus');
    const compliance = document.getElementById('legalCheckCompliance');
    const legality = document.getElementById('legalCheckLegality');
    const safety = document.getElementById('legalCheckSafety');
    const checks = [compliance, legality, safety].filter(Boolean);
    const start = performance.now();

    function frame(now) {
      const t = Math.min((now - start) / duration, 1);
      if (!reducedMotion) entryLoader.style.setProperty('--loader-glow', String(0.34 + t * 0.66));

      if (checks[0] && t >= 0.3) checks[0].classList.add('checked');
      if (checks[1] && t >= 0.58) checks[1].classList.add('checked');
      if (checks[2] && t >= 0.84) checks[2].classList.add('checked');

      if (status) {
        status.textContent = t < 0.3
          ? 'Running compliance checks...'
          : t < 0.58
            ? 'Verifying legality notices...'
            : t < 0.84
              ? 'Applying safety statements...'
              : 'Legal framework complete.';
      }

      if (t < 1) requestAnimationFrame(frame);
      else finalizeLoader();
    }

    requestAnimationFrame(frame);
  }

  function runInstructionsLoader() {
    const status = document.getElementById('instructionsLoaderStatus');
    const typedLine = document.getElementById('typedLoaderLine');
    const target = 'Loading custom instructions...\nPriming CLT...\nEnabling magnetometers...\nDONE!';
    const start = performance.now();

    function frame(now) {
      const t = Math.min((now - start) / duration, 1);
      if (!reducedMotion) entryLoader.style.setProperty('--loader-glow', String(0.35 + t * 0.65));

      if (typedLine) {
        const count = Math.floor(target.length * t);
        typedLine.textContent = target.slice(0, count);
      }

      if (status) {
        status.textContent = t < 0.55
          ? 'Loading instruction package...'
          : t < 0.9
            ? 'Applying OCharlotteD behavior profile...'
            : 'Instruction profile synchronized.';
      }

      if (t < 1) requestAnimationFrame(frame);
      else finalizeLoader();
    }

    requestAnimationFrame(frame);
  }

  const type = entryLoader.dataset.loader;
  if (type === 'clt') runCltLoader();
  else if (type === 'portals') runPortalsLoader();
  else if (type === 'instructions') runInstructionsLoader();
  else if (type === 'legal') runLegalLoader();
  else runMainLoader();
}



function initCltFieldSystem() {
  const app = document.getElementById('cltSystemApp');
  if (!app) return;

  const coordinateDefinitions = [
    { name: 'Charlotte, NC', lat: 35.22867647481079, lon: -80.84490976473366 },
    { name: 'Vancouver Easter Egg', lat: 49.2729341959022, lon: -123.06941193669999 },
    { name: 'Charlotte, MI', lat: 42.56318196348821, lon: -84.83584647437215 },
    { name: 'Haida Gwaii Islands', lat: 53.255510249854304, lon: -132.08947116604432 },
    { name: 'Charlotte Amalie, USVI', lat: 18.34185490966226, lon: -64.9316281681369 },
    { name: 'Port Charlotte, FL', lat: 27.010523765938274, lon: -82.14259591632731 },
    { name: 'Charlottetown, PEI', lat: 46.23722371252871, lon: -63.12970137942366 },
    { name: 'Vancouver Micro Secret', lat: 49.27295878743672, lon: -123.06939862529713 },
    { name: 'Charlottesville, VA', lat: 38.0292848205594, lon: -78.47616344837674 },
    { name: 'Queen Charlotte Burial Place', lat: 51.4836838439432, lon: -0.60668429494321 },
    { name: 'Geolocation Denied Fallback', lat: 84.99999991933562, lon: -110.97606616281583 }
  ];

  const magneticSources = [
    { name: 'Charlotte, NC', category: 'Regular', lat: 35.22867647481079, lon: -80.84490976473366, bands: [[0, 10, 1000, 1000], [10, 100, 1000, 200], [100, 200, 200, 50], [200, 400, 50, 10], [400, 1000, 10, 0]] },
    { name: 'Vancouver Easter Egg', category: 'Secret', lat: 49.2729341959022, lon: -123.06941193669999, bands: [[0, 0.01, 15000, 15000], [0.01, 0.1, 15000, 500], [0.1, 1, 500, 20], [1, 5, 20, 0]] },
    { name: 'Charlotte, MI', category: 'Regular', lat: 42.56318196348821, lon: -84.83584647437215, bands: [[0, 2, 575, 575], [2, 10, 575, 200], [10, 40, 200, 30], [40, 120, 30, 0]] },
    { name: 'Haida Gwaii Islands', category: 'Regular', lat: 53.255510249854304, lon: -132.08947116604432, bands: [[0, 200, 230, 230], [200, 350, 230, 20], [350, 450, 20, 0]] },
    { name: 'Charlotte Amalie, USVI', category: 'Regular', lat: 18.34185490966226, lon: -64.9316281681369, bands: [[0, 1, 300, 300], [1, 10, 300, 100], [10, 25, 100, 20], [25, 40, 20, 0]] },
    { name: 'Port Charlotte, FL', category: 'Regular', lat: 27.010523765938274, lon: -82.14259591632731, bands: [[0, 3, 400, 400], [3, 10, 400, 100], [10, 30, 100, 12], [30, 100, 12, 0]] },
    { name: 'Charlottetown, PEI', category: 'Regular', lat: 46.23722371252871, lon: -63.12970137942366, bands: [[0, 2, 350, 350], [2, 8, 350, 100], [8, 24, 100, 25], [24, 128, 25, 0]] },
    { name: 'Charlottesville, VA', category: 'Regular', lat: 38.0292848205594, lon: -78.47616344837674, bands: [[0, 3, 450, 450], [3, 30, 450, 200], [30, 120, 200, 20], [120, 360, 20, 0]] },
    { name: 'Queen Charlotte Burial Place', category: 'Secret', lat: 51.4836838439432, lon: -0.60668429494321, bands: [[0, 0.1, 14000, 14000], [0.1, 1, 14000, 3000], [1, 3, 3000, 900], [3, 14, 900, 200], [14, 50, 200, 40], [50, 250, 40, 0]] },
    { name: 'Vancouver Micro Secret', category: 'Secret', lat: 49.27295878743672, lon: -123.06939862529713, bands: [[0, 0.001, 300000, 300000], [0.001, 0.01, 300000, 1], [0.01, 0.015, 1, 0]] }
  ];

  const state = {
    watchId: null,
    driftTick: null,
    scanTimer: null,
    liveMode: false,
    lastBase: null,
    cltDrift: 0,
    tungstenDrift: 0,
    history: []
  };

  const el = {
    status: document.getElementById('cltSystemStatus'),
    badge: document.getElementById('cltTrackingBadge'),
    lastUpdate: document.getElementById('cltLastUpdate'),
    totalField: document.getElementById('cltTotalField'),
    tungsten: document.getElementById('cltTungsten'),
    nearestDistance: document.getElementById('cltNearestFieldDistance'),
    nearestSource: document.getElementById('cltNearestSource'),
    liveCoords: document.getElementById('cltLiveCoords'),
    accuracy: document.getElementById('cltAccuracy'),
    contributors: document.getElementById('cltContributors'),
    fallback: document.getElementById('cltFallback'),
    latInput: document.getElementById('cltLatitude'),
    lonInput: document.getElementById('cltLongitude'),
    preset: document.getElementById('cltPreset'),
    runFallback: document.getElementById('cltRun'),
    retryLive: document.getElementById('cltRetryLive'),
    scanBtn: document.getElementById('cltAccurateScan'),
    scanState: document.getElementById('scanState'),
    scanBar: document.getElementById('scanProgressBar'),
    scanSheet: document.getElementById('scanSheetList'),
    tungstenComposition: document.getElementById('tungstenCompositionList'),
    tungstenAnomalyNote: document.getElementById('tungstenAnomalyNote')
  };

  const fallbackCoord = coordinateDefinitions.find((d) => d.name === 'Geolocation Denied Fallback');

  function setStatus(label, badgeText) {
    if (el.status) el.status.textContent = label;
    if (el.badge) el.badge.textContent = badgeText;
  }

  function setFallbackVisibility(show) {
    if (el.fallback) el.fallback.hidden = !show;
  }

  function randomBetween(min, max) {
    return min + Math.random() * (max - min);
  }

  function smoothDrift(current, maxAbs, smoothing = 0.33) {
    const target = randomBetween(-maxAbs, maxAbs);
    return current + (target - current) * smoothing;
  }

  function haversineKm(lat1, lon1, lat2, lon2) {
    const toRad = (d) => (d * Math.PI) / 180;
    const earthRadiusKm = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2
      + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return 2 * earthRadiusKm * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  function interpolatedStrength(distanceKm, bands) {
    for (const [startKm, endKm, startV, endV] of bands) {
      if (distanceKm >= startKm && distanceKm <= endKm) {
        if (startKm === endKm) return endV;
        const ratio = (distanceKm - startKm) / (endKm - startKm);
        return startV + (endV - startV) * ratio;
      }
    }
    return 0;
  }

  function computeField(lat, lon) {
    const evaluations = magneticSources.map((source) => {
      const distance = haversineKm(lat, lon, source.lat, source.lon);
      const strength = interpolatedStrength(distance, source.bands);
      return { ...source, distance, strength, inField: strength > 0 };
    }).sort((a, b) => b.strength - a.strength);

    const totalField = evaluations.reduce((sum, source) => sum + source.strength, 0);
    const regularFieldTotal = evaluations
      .filter((source) => source.category !== 'Secret')
      .reduce((sum, source) => sum + source.strength, 0);
    const secretFieldTotal = evaluations
      .filter((source) => source.category === 'Secret')
      .reduce((sum, source) => sum + source.strength, 0);
    const tungstenBase = 0.000001 + (regularFieldTotal / 1000) * 0.05 + (secretFieldTotal / 1000) * 0.13;

    const activeSecret = evaluations.filter((source) => source.category === 'Secret' && source.inField);
    const regular = evaluations.filter((source) => source.category !== 'Secret');
    const nearestRegular = [...regular].sort((a, b) => a.distance - b.distance)[0];
    const nearestSecret = [...activeSecret].sort((a, b) => a.distance - b.distance)[0];
    const nearest = nearestSecret || nearestRegular || evaluations[0];

    return { evaluations, totalField, tungstenBase, nearest };
  }

  function formatDistance(distanceKm) {
    if (!Number.isFinite(distanceKm)) return '—';
    return distanceKm < 1 ? `${(distanceKm * 1000).toFixed(1)} m` : `${distanceKm.toFixed(3)} km`;
  }

  function detectRegionAnomalyIsotope(lat, lon) {
    if (lat >= 5 && lat <= 84 && lon >= -170 && lon <= -52) return '¹⁸²W'; // USA + territories bucket
    if ((lat >= -50 && lat <= 72 && lon >= -170 && lon <= -45) || (lat >= -50 && lat <= 60 && lon >= 110 && lon <= 180)) return '¹⁸³W'; // Canada/UK/AU/NZ/Africa/Oceania bucket
    if (lat >= 44 && lat <= 56 && lon >= 2 && lon <= 18) return '¹⁸⁴W'; // DE/AT/CH/LI/NL/LU bucket
    return '¹⁸⁶W'; // France/Belgium/ROW bucket
  }

  function renderTungstenComposition(lat, lon, calc) {
    if (!(el.tungstenComposition && el.tungstenAnomalyNote)) return;

    const baseline = [
      '¹⁸⁰W ~0.12%',
      '¹⁸²W ~26.5%',
      '¹⁸³W ~14.3%',
      '¹⁸⁴W ~30.6%',
      '¹⁸⁶W ~28.4%'
    ];

    const hasSecretAnomaly = calc.evaluations.some((source) => source.category === 'Secret' && source.inField);
    if (!hasSecretAnomaly) {
      el.tungstenComposition.innerHTML = baseline.map((line) => `<li>${line}</li>`).join('');
      el.tungstenAnomalyNote.textContent = 'No secret-field anomaly active.';
      return;
    }

    const isotope = detectRegionAnomalyIsotope(lat, lon);
    const upgraded = baseline.map((line) => line.startsWith(isotope) ? `${isotope} 99.9%+ (secret anomaly)` : line);
    el.tungstenComposition.innerHTML = upgraded.map((line) => `<li>${line}</li>`).join('');
    el.tungstenAnomalyNote.textContent = `Secret-field anomaly active: ${isotope} designated isotope spike detected.`;
  }

  function renderHistory() {
    if (!el.contributors) return;
    if (!state.history.length) {
      el.contributors.innerHTML = '<li>No live readings yet.</li>';
      return;
    }

    el.contributors.innerHTML = state.history.map((item) =>
      `<li><strong>${item.time}</strong> — CLT ${item.clt.toLocaleString(undefined, { maximumFractionDigits: 2 })} · Tungsten ${item.tungsten.toFixed(5)} mg/m³ · ${item.source}</li>`
    ).join('');
  }

  function renderLiveTelemetry(lat, lon, accuracy, calc) {
    state.cltDrift = smoothDrift(state.cltDrift, 0.05);
    state.tungstenDrift = smoothDrift(state.tungstenDrift, 0.20);

    const liveClt = Math.max(0, calc.totalField * (1 + state.cltDrift));
    const liveTungsten = Math.max(0, calc.tungstenBase * (1 + state.tungstenDrift));

    state.lastBase = { lat, lon, accuracy, calc, liveClt, liveTungsten, timestamp: Date.now() };

    if (el.totalField) el.totalField.textContent = liveClt.toLocaleString(undefined, { maximumFractionDigits: 2 });
    if (el.tungsten) el.tungsten.textContent = `${liveTungsten.toFixed(5)} mg/m³`;
    if (el.nearestSource) el.nearestSource.textContent = calc.nearest ? calc.nearest.name : '—';
    if (el.nearestDistance) {
      const label = calc.nearest
        ? `<strong>Distance to nearest CLT Field:</strong> ${formatDistance(calc.nearest.distance)} (${calc.nearest.name})`
        : '<strong>Distance to nearest CLT Field:</strong> —';
      el.nearestDistance.innerHTML = label;
    }
    if (el.liveCoords) el.liveCoords.textContent = `Lat/Lon: ${lat.toFixed(8)}, ${lon.toFixed(8)}`;
    if (el.accuracy) el.accuracy.textContent = `Accuracy: ${Number.isFinite(accuracy) ? `${Math.round(accuracy)} m` : '—'}`;
    renderTungstenComposition(lat, lon, calc);

    const stamp = new Date().toLocaleTimeString();
    if (el.lastUpdate) el.lastUpdate.textContent = `Last update: ${stamp}`;

    state.history.unshift({
      time: stamp,
      clt: liveClt,
      tungsten: liveTungsten,
      source: calc.nearest ? calc.nearest.name : 'Unknown source'
    });
    state.history = state.history.slice(0, 8);
    renderHistory();

    if (el.scanBtn) el.scanBtn.disabled = false;
  }

  function renderScanSheet(result) {
    if (!el.scanSheet) return;
    el.scanSheet.innerHTML = [
      `CLT Field: ${result.clt.toLocaleString(undefined, { maximumFractionDigits: 4 })}`,
      `Tungsten: ${result.tungsten.toFixed(6)} mg/m³`,
      `Coordinates: ${result.lat.toFixed(8)}, ${result.lon.toFixed(8)}`,
      `Timestamp: ${new Date(result.timestamp).toLocaleString()}`,
      `Nearest Source: ${result.sourceName}`,
      `Distance to Source: ${formatDistance(result.distanceKm)}`
    ].map((line) => `<li>${line}</li>`).join('');
  }

  function runAccurateScan() {
    if (!state.lastBase || !el.scanBar || !el.scanState) {
      setStatus('Scan unavailable: waiting for live or fallback reading.', 'TRACKING PAUSED');
      return;
    }

    if (state.scanTimer) window.clearInterval(state.scanTimer);
    if (el.scanBtn) el.scanBtn.disabled = true;

    const start = Date.now();
    const durationMs = 5000;
    el.scanState.textContent = 'Accurate scan in progress...';
    el.scanBar.style.width = '0%';

    state.scanTimer = window.setInterval(() => {
      const progress = Math.min(1, (Date.now() - start) / durationMs);
      el.scanBar.style.width = `${progress * 100}%`;

      if (progress >= 1) {
        window.clearInterval(state.scanTimer);
        state.scanTimer = null;
        const base = state.lastBase;

        const cltResult = Math.max(0, base.calc.totalField * (1 + randomBetween(-0.0025, 0.0025)));
        const tungstenResult = Math.max(0, base.calc.tungstenBase * (1 + randomBetween(-0.0045, 0.0045)));

        renderScanSheet({
          clt: cltResult,
          tungsten: tungstenResult,
          lat: base.lat,
          lon: base.lon,
          timestamp: Date.now(),
          sourceName: base.calc.nearest ? base.calc.nearest.name : '—',
          distanceKm: base.calc.nearest ? base.calc.nearest.distance : NaN
        });

        el.scanState.textContent = 'Accurate scan complete. Scan sheet frozen until next run.';
        if (el.scanBtn) el.scanBtn.disabled = false;
      }
    }, 120);
  }

  function stopLiveTracking() {
    if (state.watchId !== null) {
      navigator.geolocation.clearWatch(state.watchId);
      state.watchId = null;
    }
    if (state.driftTick) {
      window.clearInterval(state.driftTick);
      state.driftTick = null;
    }
    state.liveMode = false;
  }

  function startDriftTicker() {
    if (state.driftTick) window.clearInterval(state.driftTick);
    state.driftTick = window.setInterval(() => {
      if (!state.liveMode || !state.lastBase) return;
      const base = state.lastBase;
      renderLiveTelemetry(base.lat, base.lon, base.accuracy, base.calc);
    }, 2400);
  }

  function onGeolocationError(error) {
    stopLiveTracking();
    setFallbackVisibility(true);

    if (error?.code === 1) {
      setStatus('Location permission denied. Fallback testing mode enabled.', 'LOCATION ACCESS REQUIRED');
    } else if (error?.code === 2) {
      setStatus('GPS unavailable. Fallback testing mode enabled.', 'GPS UNAVAILABLE');
    } else if (error?.code === 3) {
      setStatus('Geolocation timeout. Fallback testing mode enabled.', 'TRACKING PAUSED');
    } else {
      setStatus('Unable to start live tracking. Fallback testing mode enabled.', 'GPS UNAVAILABLE');
    }
  }

  function startLiveTracking() {
    if (!navigator.geolocation) {
      setFallbackVisibility(true);
      setStatus('Geolocation API unavailable in this browser.', 'GPS UNAVAILABLE');
      return;
    }

    const isSecure = window.isSecureContext || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (!isSecure) {
      setFallbackVisibility(true);
      setStatus('Insecure context: geolocation requires HTTPS.', 'GPS UNAVAILABLE');
      return;
    }

    setFallbackVisibility(false);
    setStatus('Requesting location access for live tracking...', 'LOCATION ACCESS REQUIRED');

    stopLiveTracking();
    state.watchId = navigator.geolocation.watchPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const accuracy = position.coords.accuracy;
        const calc = computeField(lat, lon);

        state.liveMode = true;
        setStatus('Live tracking active and streaming sensor telemetry.', 'LIVE TRACKING');
        renderLiveTelemetry(lat, lon, accuracy, calc);
        startDriftTicker();
      },
      (error) => onGeolocationError(error),
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000
      }
    );
  }

  function readFallbackInputs() {
    const lat = Number(el.latInput?.value);
    const lon = Number(el.lonInput?.value);
    if (!Number.isFinite(lat) || !Number.isFinite(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      setStatus('Invalid fallback coordinates. Latitude [-90, 90], longitude [-180, 180].', 'TRACKING PAUSED');
      return null;
    }
    return { lat, lon };
  }

  function initFallbackTools() {
    if (el.preset) {
      el.preset.innerHTML = coordinateDefinitions
        .filter((point) => point.name !== 'Geolocation Denied Fallback')
        .map((point) => `<option value="${point.lat},${point.lon}">${point.name}</option>`)
        .join('');
    }

    el.runFallback?.addEventListener('click', () => {
      const coords = readFallbackInputs();
      if (!coords) return;
      const calc = computeField(coords.lat, coords.lon);
      setStatus('Fallback scan complete (testing mode).', 'TRACKING PAUSED');
      renderLiveTelemetry(coords.lat, coords.lon, NaN, calc);
    });

    el.preset?.addEventListener('change', () => {
      const [lat, lon] = String(el.preset.value).split(',').map(Number);
      if (el.latInput) el.latInput.value = String(lat);
      if (el.lonInput) el.lonInput.value = String(lon);
    });

    el.retryLive?.addEventListener('click', () => {
      setStatus('Retrying live tracking request...', 'LOCATION ACCESS REQUIRED');
      startLiveTracking();
    });
  }

  initFallbackTools();
  el.scanBtn?.addEventListener('click', runAccurateScan);

  if (el.scanBtn) el.scanBtn.disabled = true;
  renderHistory();

  // Primary behavior: request live geolocation immediately on load.
  startLiveTracking();

  // Keep denied fallback coordinates ready for manual testing if needed.
  if (fallbackCoord && el.latInput && el.lonInput) {
    el.latInput.value = String(fallbackCoord.lat);
    el.lonInput.value = String(fallbackCoord.lon);
  }
}

initCltFieldSystem();

const copyBtn = document.getElementById('copyBtn');
const instructionText = document.getElementById('instructionText');

if (copyBtn && instructionText) {
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(instructionText.textContent);
      copyBtn.textContent = 'Copied';
      setTimeout(() => (copyBtn.textContent = 'Copy'), 1500);
    } catch {
      copyBtn.textContent = 'Copy failed';
      setTimeout(() => (copyBtn.textContent = 'Copy'), 1500);
    }
  });
}
