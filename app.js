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
    { name: 'Pacific Field (Haida Gwaii Islands)', lat: 53.255510249854304, lon: -132.08947116604432 },
    { name: 'Caribbean Field (Charlotte Amalie, USVI)', lat: 18.34185490966226, lon: -64.9316281681369 },
    { name: 'Port Charlotte, FL', lat: 27.010523765938274, lon: -82.14259591632731 },
    { name: 'Charlottetown, PEI', lat: 46.23722371252871, lon: -63.12970137942366 },
    { name: 'Vancouver Micro Secret', lat: 49.27295878743672, lon: -123.06939862529713 },
    { name: 'Charlottesville, VA', lat: 38.0292848205594, lon: -78.47616344837674 },
    { name: 'Queen Charlotte Burial Place', lat: 51.4836838439432, lon: -0.60668429494321 },
    { name: 'Geolocation Denied Fallback', lat: 84.99999991933562, lon: -110.97606616281583 }
  ];

  const magneticSources = [
    { name: 'Charlotte, NC', category: 'Regular', lat: 35.22867647481079, lon: -80.84490976473366, bands: [[0,10,1000,1000],[10,100,1000,200],[100,200,200,50],[200,400,50,10],[400,1000,10,0]] },
    { name: 'Vancouver Easter Egg', category: 'Secret', lat: 49.2729341959022, lon: -123.06941193669999, bands: [[0,0.01,15000,15000],[0.01,0.1,15000,500],[0.1,1,500,20],[1,5,20,0]] },
    { name: 'Charlotte, MI', category: 'Regular', lat: 42.56318196348821, lon: -84.83584647437215, bands: [[0,2,575,575],[2,10,575,200],[10,40,200,30],[40,120,30,0]] },
    { name: 'Pacific Field (Haida Gwaii Islands)', category: 'Regular', lat: 53.255510249854304, lon: -132.08947116604432, bands: [[0,200,230,230],[200,350,230,20],[350,450,20,0]] },
    { name: 'Caribbean Field (Charlotte Amalie, USVI)', category: 'Regular', lat: 18.34185490966226, lon: -64.9316281681369, bands: [[0,1,300,300],[1,10,300,100],[10,25,100,20],[25,40,20,0]] },
    { name: 'Port Charlotte, FL', category: 'Regular', lat: 27.010523765938274, lon: -82.14259591632731, bands: [[0,3,400,400],[3,10,400,100],[10,30,100,12],[30,100,12,0]] },
    { name: 'Charlottetown, PEI', category: 'Regular', lat: 46.23722371252871, lon: -63.12970137942366, bands: [[0,2,350,350],[2,8,350,100],[8,24,100,25],[24,128,25,0]] },
    { name: 'Charlottesville, VA', category: 'Regular', lat: 38.0292848205594, lon: -78.47616344837674, bands: [[0,3,450,450],[3,30,450,200],[30,120,200,20],[120,360,20,0]] },
    { name: 'Queen Charlotte Burial Place', category: 'Secret', lat: 51.4836838439432, lon: -0.60668429494321, bands: [[0,0.1,14000,14000],[0.1,1,14000,3000],[1,3,3000,900],[3,14,900,200],[14,50,200,40],[50,250,40,0]] },
    { name: 'Vancouver Micro Secret', category: 'Secret', lat: 49.27295878743672, lon: -123.06939862529713, bands: [[0,0.001,300000,300000],[0.001,0.01,300000,1],[0.01,0.015,1,0]] }
  ];

  const latInput = document.getElementById('cltLatitude');
  const lonInput = document.getElementById('cltLongitude');
  const preset = document.getElementById('cltPreset');
  const runBtn = document.getElementById('cltRun');
  const geoBtn = document.getElementById('cltUseGeo');
  const status = document.getElementById('cltSystemStatus');
  const totalFieldEl = document.getElementById('cltTotalField');
  const tungstenEl = document.getElementById('cltTungsten');
  const contributorsEl = document.getElementById('cltContributors');
  const nearestFieldDistanceEl = document.getElementById('cltNearestFieldDistance');

  const fallback = coordinateDefinitions.find((d) => d.name === 'Geolocation Denied Fallback');

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

  function renderStaticTables() {
    if (preset) {
      preset.innerHTML = coordinateDefinitions
        .filter((point) => point.name !== 'Geolocation Denied Fallback')
        .map((point) => `<option value="${point.lat},${point.lon}">${point.name}</option>`)
        .join('');
    }
  }

  function runFieldScan(lat, lon, statusText = 'Field scan complete.') {
    const evaluations = magneticSources.map((source) => {
      const distance = haversineKm(lat, lon, source.lat, source.lon);
      const strength = interpolatedStrength(distance, source.bands);
      const inField = strength > 0;
      return { ...source, distance, strength, inField };
    }).sort((a, b) => b.strength - a.strength);

    const totalField = evaluations.reduce((sum, source) => sum + source.strength, 0);
    const tungsten = Math.min(0.99, 0.00001 + totalField / 12000);

    const activeSecretSources = evaluations.filter((source) => source.category === 'Secret' && source.inField);
    const regularSources = evaluations.filter((source) => source.category !== 'Secret');
    const nearestRegular = [...regularSources].sort((a, b) => a.distance - b.distance)[0];
    const nearestActiveSecret = [...activeSecretSources].sort((a, b) => a.distance - b.distance)[0];
    const nearestTarget = nearestActiveSecret || nearestRegular;

    if (totalFieldEl) totalFieldEl.textContent = totalField.toLocaleString(undefined, { maximumFractionDigits: 2 });
    if (tungstenEl) tungstenEl.textContent = `${tungsten.toFixed(5)} mg/m³`;

    if (nearestFieldDistanceEl) {
      if (!nearestTarget) {
        nearestFieldDistanceEl.innerHTML = '<strong>Distance to nearest CLT Field:</strong> —';
      } else {
        const dist = nearestTarget.distance;
        const unit = dist < 1 ? `${(dist * 1000).toFixed(1)} m` : `${dist.toFixed(3)} km`;
        nearestFieldDistanceEl.innerHTML = `<strong>Distance to nearest CLT Field:</strong> ${unit} (${nearestTarget.name})`;
      }
    }

    if (contributorsEl) {
      contributorsEl.innerHTML = evaluations.slice(0, 5).map((source) => {
        if (source.category === 'Secret' && !source.inField) {
          return '<li><strong>???</strong> — secret field outside active range</li>';
        }
        return `<li><strong>${source.name}</strong> — ${source.strength.toFixed(2)} units @ ${source.distance.toFixed(3)} km</li>`;
      }).join('');
    }

    if (status) status.textContent = statusText;
  }

  function readInputs() {
    const lat = Number(latInput?.value);
    const lon = Number(lonInput?.value);
    if (!Number.isFinite(lat) || !Number.isFinite(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      if (status) status.textContent = 'Invalid coordinates. Latitude must be [-90, 90] and longitude [-180, 180].';
      return null;
    }
    return { lat, lon };
  }

  runBtn?.addEventListener('click', () => {
    const coords = readInputs();
    if (!coords) return;
    runFieldScan(coords.lat, coords.lon);
  });

  preset?.addEventListener('change', () => {
    const [lat, lon] = String(preset.value).split(',').map(Number);
    if (latInput) latInput.value = String(lat);
    if (lonInput) lonInput.value = String(lon);
    runFieldScan(lat, lon, `Preset loaded: ${preset.options[preset.selectedIndex]?.text || 'Location'}.`);
  });

  geoBtn?.addEventListener('click', () => {
    if (!navigator.geolocation) {
      if (status) status.textContent = 'Geolocation unavailable. Loaded fallback coordinates.';
      if (latInput) latInput.value = String(fallback.lat);
      if (lonInput) lonInput.value = String(fallback.lon);
      runFieldScan(fallback.lat, fallback.lon, 'Geolocation unavailable. Fallback profile active.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        if (latInput) latInput.value = String(lat);
        if (lonInput) lonInput.value = String(lon);
        runFieldScan(lat, lon, 'Geolocation acquired. Live position scan complete.');
      },
      () => {
        if (latInput) latInput.value = String(fallback.lat);
        if (lonInput) lonInput.value = String(fallback.lon);
        runFieldScan(fallback.lat, fallback.lon, 'Geolocation denied. Fallback profile active.');
      }
    );
  });

  renderStaticTables();
  const defaultCoords = readInputs();
  if (defaultCoords) runFieldScan(defaultCoords.lat, defaultCoords.lon, 'Initialized with Charlotte, NC baseline.');
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
