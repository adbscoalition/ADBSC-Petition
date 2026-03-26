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
    const loaderStatus = document.getElementById('loaderStatus');
    const cltStartBar = document.getElementById('cltStartBar');
    if (!loaderStatus) {
      finalizeLoader();
      return;
    }

    const phases = [
      { at: 0.1, label: 'Magnetometer calibration progress...' },
      { at: 0.45, label: 'Synchronizing with distance and time ranges...' },
      { at: 0.78, label: 'Finalizing instrument baseline...' }
    ];

    const start = performance.now();
    function frame(now) {
      const t = Math.min((now - start) / duration, 1);
      if (!reducedMotion) entryLoader.style.setProperty('--loader-glow', String(0.35 + t * 0.65));
      if (cltStartBar) cltStartBar.style.width = `${t * 100}%`;

      let label = phases[0].label;
      for (const p of phases) if (t >= p.at) label = p.label;
      loaderStatus.textContent = label;

      if (t < 1) requestAnimationFrame(frame);
      else finalizeLoader();
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

  function runCalculatorLoader() {
    const status = document.getElementById('calculatorLoaderStatus');
    const bar = document.getElementById('calculatorLoaderBar');
    const phases = [
      { at: 0.08, label: 'Finding name rankings...' },
      { at: 0.36, label: 'Calibrating formulas...' },
      { at: 0.68, label: 'Ranking Charlottes...' },
      { at: 0.94, label: 'Done!' }
    ];

    const start = performance.now();

    function frame(now) {
      const t = Math.min((now - start) / duration, 1);
      if (bar) bar.style.width = `${t * 100}%`;
      if (!reducedMotion) entryLoader.style.setProperty('--loader-glow', String(0.33 + t * 0.67));

      let label = phases[0].label;
      for (const p of phases) if (t >= p.at) label = p.label;
      if (status) status.textContent = label;

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
  else if (type === 'calculator') runCalculatorLoader();
  else if (type === 'legal') runLegalLoader();
  else runMainLoader();
}



function initCltFieldSystem() {
  const app = document.getElementById('cltSystemApp');
  if (!app) return;

  const coordinateDefinitions = [
    { name: 'Charlotte, NC', lat: 35.22867647481079, lon: -80.84490976473366 },
    { name: 'Charlotte, MI', lat: 42.56318196348821, lon: -84.83584647437215 },
    { name: 'Haida Gwaii Islands', lat: 53.255510249854304, lon: -132.08947116604432 },
    { name: 'Charlotte Amalie, USVI', lat: 18.34185490966226, lon: -64.9316281681369 },
    { name: 'Port Charlotte, FL', lat: 27.010523765938274, lon: -82.14259591632731 },
    { name: 'Charlottetown, PEI', lat: 46.23722371252871, lon: -63.12970137942366 },
    { name: 'Charlottesville, VA', lat: 38.0292848205594, lon: -78.47616344837674 },
    { name: 'Queen Charlotte Burial Place', lat: 51.4836838439432, lon: -0.60668429494321 },
    { name: 'Geolocation Denied Fallback', lat: 84.99999991933562, lon: -110.97606616281583 }
  ];

  const magneticSources = [
    { name: 'Charlotte, NC', category: 'Regular', lat: 35.22867647481079, lon: -80.84490976473366, bands: [[0, 10, 1000, 1000], [10, 100, 1000, 200], [100, 200, 200, 50], [200, 400, 50, 10], [400, 1000, 10, 0]] },
    { name: 'Charlotte, MI', category: 'Regular', lat: 42.56318196348821, lon: -84.83584647437215, bands: [[0, 2, 575, 575], [2, 10, 575, 200], [10, 40, 200, 30], [40, 120, 30, 0]] },
    { name: 'Haida Gwaii Islands', category: 'Regular', lat: 53.255510249854304, lon: -132.08947116604432, bands: [[0, 200, 230, 230], [200, 350, 230, 20], [350, 450, 20, 0]] },
    { name: 'Charlotte Amalie, USVI', category: 'Regular', lat: 18.34185490966226, lon: -64.9316281681369, bands: [[0, 1, 300, 300], [1, 10, 300, 100], [10, 25, 100, 20], [25, 40, 20, 0]] },
    { name: 'Port Charlotte, FL', category: 'Regular', lat: 27.010523765938274, lon: -82.14259591632731, bands: [[0, 3, 400, 400], [3, 10, 400, 100], [10, 30, 100, 12], [30, 100, 12, 0]] },
    { name: 'Charlottetown, PEI', category: 'Regular', lat: 46.23722371252871, lon: -63.12970137942366, bands: [[0, 2, 350, 350], [2, 8, 350, 100], [8, 24, 100, 25], [24, 128, 25, 0]] },
    { name: 'Charlottesville, VA', category: 'Regular', lat: 38.0292848205594, lon: -78.47616344837674, bands: [[0, 3, 450, 450], [3, 30, 450, 200], [30, 120, 200, 20], [120, 360, 20, 0]] },
    { name: 'Queen Charlotte Burial Place', category: 'Secret', lat: 51.4836838439432, lon: -0.60668429494321, bands: [[0, 0.1, 14000, 14000], [0.1, 1, 14000, 3000], [1, 3, 3000, 900], [3, 14, 900, 200], [14, 50, 200, 40], [50, 250, 40, 0]] },
  ];

  const state = {
    watchId: null,
    driftTick: null,
    scanTimer: null,
    liveMode: false,
    lastBase: null,
    cltDrift: 0,
    tungstenDrift: 0,
    cltSourceMargins: {},
    tungstenSourceMargins: {},
    history: [],
    simulationActive: false,
    customFields: [],
    editingFieldId: null,
    autoFieldCounter: 1,
    simulatorUnlocked: false,
    unitSystem: 'metric',
    uploadedTimeLimitsEnabled: true,
  };

  const el = {
    status: document.getElementById('cltSystemStatus'),
    badge: document.getElementById('cltTrackingBadge'),
    lastUpdate: document.getElementById('cltLastUpdate'),
    totalField: document.getElementById('cltTotalField'),
    tungsten: document.getElementById('cltTungsten'),
    nearestSource: document.getElementById('cltNearestSource'),
    geoDistance: document.getElementById('cltGeoDistance'),
    geoName: document.getElementById('cltGeoName'),
    uploadedDistance: document.getElementById('cltUploadedDistance'),
    contributors: document.getElementById('cltContributors'),
    unitSwitch: document.getElementById('cltUnitSwitch'),
    copyLogs: document.getElementById('cltCopyLogs'),
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
    gpsAccuracy: document.getElementById('cltGpsAccuracy'),
    cltContributionTable: document.getElementById('cltContributionTable'),
    tungstenContributionTable: document.getElementById('tungstenContributionTable'),
    simPassword: document.getElementById('simPassword'),
    simUnlock: document.getElementById('simUnlock'),
    simCoordinateBlock: document.getElementById('simCoordinateBlock'),
    simLatitude: document.getElementById('simLatitude'),
    simLongitude: document.getElementById('simLongitude'),
    simTeleport: document.getElementById('simTeleport'),
    simTimeLimitsToggle: document.getElementById('simTimeLimitsToggle'),
    simStatus: document.getElementById('simStatus'),
    fieldName: document.getElementById('fieldName'),
    fieldIntensity: document.getElementById('fieldIntensity'),
    fieldRange: document.getElementById('fieldRange'),
    fieldLatitude: document.getElementById('fieldLatitude'),
    fieldLongitude: document.getElementById('fieldLongitude'),
    fieldUseCurrentLocation: document.getElementById('fieldUseCurrentLocation'),
    fieldClearCoordinates: document.getElementById('fieldClearCoordinates'),
    fieldStartTime: document.getElementById('fieldStartTime'),
    fieldEndTime: document.getElementById('fieldEndTime'),
    fieldSave: document.getElementById('fieldSave'),
    fieldReset: document.getElementById('fieldReset'),
    fieldUploaderStatus: document.getElementById('fieldUploaderStatus'),
    uploadedFieldList: document.getElementById('uploadedFieldList'),
    fieldDayToggles: Array.from(document.querySelectorAll('.field-day-toggle')),
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

  function parseCoordinateInput(value) {
    const raw = String(value ?? '').trim();
    if (!raw) return NaN;
    const normalized = raw.replace(/,/g, '.');
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : NaN;
  }

  async function resolveCurrentCoords() {
    if (Number.isFinite(state.lastBase?.lat) && Number.isFinite(state.lastBase?.lon)) {
      return { lat: state.lastBase.lat, lon: state.lastBase.lon };
    }
    if (!navigator.geolocation) return null;

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: false,
          timeout: 3000,
          maximumAge: 30000
        });
      });
      return { lat: position.coords.latitude, lon: position.coords.longitude };
    } catch {
      return null;
    }
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

  const customFieldStorageKey = 'ocltd_custom_secret_fields';

  function loadCustomFields() {
    try {
      const raw = localStorage.getItem(customFieldStorageKey);
      state.customFields = raw ? JSON.parse(raw) : [];
      state.customFields = state.customFields.map((f) => {
        const lat = Number.isFinite(Number(f.lat)) ? Number(f.lat) : Number(f.latitude);
        const lon = Number.isFinite(Number(f.lon)) ? Number(f.lon) : Number(f.longitude);
        return {
          ...f,
          lat: Number.isFinite(lat) ? lat : f.lat,
          lon: Number.isFinite(lon) ? lon : f.lon
        };
      });
      const maxAuto = state.customFields.reduce((m, f) => {
        const match = /^My Field (\d+)$/.exec(String(f.name || ''));
        return match ? Math.max(m, Number(match[1])) : m;
      }, 0);
      state.autoFieldCounter = maxAuto + 1;
    } catch {
      state.customFields = [];
    }
  }

  function saveCustomFields() {
    localStorage.setItem(customFieldStorageKey, JSON.stringify(state.customFields));
  }

  function customFieldTimeFactor(field, nowMs) {
    const fadeMs = 5 * 60 * 1000;
    const now = new Date(nowMs);
    const today = now.getDay();
    const selectedDays = Array.isArray(field.daysOfWeek) ? field.daysOfWeek : [];

    if (selectedDays.length && !selectedDays.includes(today)) return 0;

    const hasStart = !!field.startClock;
    const hasEnd = !!field.endClock;
    if (!hasStart && !hasEnd) return 1;

    const mins = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;

    function parseClock(v) {
      const [h, m] = String(v).split(':').map(Number);
      if (!Number.isFinite(h) || !Number.isFinite(m)) return null;
      return h * 60 + m;
    }

    const startM = hasStart ? parseClock(field.startClock) : null;
    const endM = hasEnd ? parseClock(field.endClock) : null;
    if ((hasStart && startM === null) || (hasEnd && endM === null)) return 1;

    if (hasStart && mins < startM - (fadeMs / 60000)) return 0;
    if (hasEnd && mins > endM + (fadeMs / 60000)) return 0;

    let factor = 1;
    if (hasStart && mins < startM) {
      factor = Math.min(factor, Math.max(0, (mins - (startM - (fadeMs / 60000))) / (fadeMs / 60000)));
    }
    if (hasEnd && mins > endM) {
      factor = Math.min(factor, Math.max(0, 1 - ((mins - endM) / (fadeMs / 60000))));
    }
    return factor;
  }

  function customFieldStrength(field, distanceM, nowMs) {
    const intensity = Number(field.intensity) || 0;
    const y = Math.max(1, Number(field.maxRangeM) || 1);
    const r = distanceM / y;
    if (r < 0 || r > 25) return 0;

    let multiplier = 0;
    if (r <= 1) multiplier = 1;
    else if (r <= 3) multiplier = 1 + ((0.2 - 1) * ((r - 1) / 2));
    else if (r <= 8) multiplier = 0.2 + ((0.05 - 0.2) * ((r - 3) / 5));
    else if (r <= 15) multiplier = 0.05 + ((0.01 - 0.05) * ((r - 8) / 7));
    else multiplier = 0.01 + ((0 - 0.01) * ((r - 15) / 10));

    const tf = customFieldTimeFactor(field, nowMs);
    return Math.max(0, intensity * multiplier * tf);
  }


  function setDayToggleState(day, isActive) {
    const toggle = el.fieldDayToggles?.find((btn) => Number(btn.dataset.day) === Number(day));
    if (!toggle) return;
    toggle.classList.toggle('is-on', isActive);
    toggle.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    const label = (toggle.textContent || '').split('·')[0].trim();
    toggle.textContent = `${label} · ${isActive ? 'On' : 'Off'}`;
  }

  function getSelectedDays() {
    return (el.fieldDayToggles || [])
      .filter((btn) => btn.getAttribute('aria-pressed') === 'true')
      .map((btn) => Number(btn.dataset.day));
  }

  function applySelectedDays(daysOfWeek) {
    const selected = Array.isArray(daysOfWeek) ? daysOfWeek : [];
    (el.fieldDayToggles || []).forEach((btn) => {
      setDayToggleState(Number(btn.dataset.day), selected.includes(Number(btn.dataset.day)));
    });
  }

  function renderUploadedFields() {
    if (!(el.uploadedFieldList && el.fieldUploaderStatus)) return;
    if (!state.customFields.length) {
      el.fieldUploaderStatus.textContent = 'No local secret fields yet.';
      el.uploadedFieldList.innerHTML = '';
      return;
    }

    el.fieldUploaderStatus.textContent = `${state.customFields.length} local secret field(s) loaded.`;
    el.uploadedFieldList.innerHTML = state.customFields.map((field) => {
      const fieldLat = Number.isFinite(Number(field.lat)) ? Number(field.lat) : Number(field.latitude);
      const fieldLon = Number.isFinite(Number(field.lon)) ? Number(field.lon) : Number(field.longitude);
      const daysLabel = field.daysOfWeek?.length ? field.daysOfWeek.join(', ') : 'All';
      const coordLabel = (Number.isFinite(fieldLat) && Number.isFinite(fieldLon))
        ? `${fieldLat.toFixed(6)}, ${fieldLon.toFixed(6)}`
        : '—';
      const hasTimeWindow = !!field.startClock || !!field.endClock;
      const timeLabel = hasTimeWindow
        ? `${field.startClock || '00:00'} → ${field.endClock || '24:00'}`
        : 'Always active';

      const isEditing = state.editingFieldId === field.id;

      return `<li class="uploaded-field-card${isEditing ? ' is-editing' : ''}">` +
        `<div class="uploaded-field-head"><strong>${field.name}</strong>${isEditing ? '<span class="field-editing-badge">Editing</span>' : ''}</div>` +
        `<p class="uploaded-field-meta">${field.intensity} CLT · ${field.maxRangeM}m range</p>` +
        `<p class="uploaded-field-meta">Days: ${daysLabel}</p>` +
        `<p class="uploaded-field-meta">Time: ${timeLabel}</p>` +
        `<p class="uploaded-field-meta">Coordinates: ${coordLabel}</p>` +
        `<div class="uploaded-field-actions">` +
        `<button class="field-edit" data-field-id="${field.id}" type="button">Edit</button>` +
        `<button class="field-delete" data-field-id="${field.id}" type="button">Delete</button>` +
        `</div></li>`;
    }).join('');

    el.uploadedFieldList.querySelectorAll('.field-edit').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-field-id');
        const field = state.customFields.find((f) => f.id === id);
        if (!field) return;
        state.editingFieldId = id;
        if (el.fieldName) el.fieldName.value = field.name;
        if (el.fieldIntensity) el.fieldIntensity.value = String(field.intensity);
        if (el.fieldRange) el.fieldRange.value = String(field.maxRangeM);
        const editLat = Number.isFinite(Number(field.lat)) ? Number(field.lat) : Number(field.latitude);
        const editLon = Number.isFinite(Number(field.lon)) ? Number(field.lon) : Number(field.longitude);
        if (el.fieldLatitude) el.fieldLatitude.value = Number.isFinite(editLat) ? String(editLat) : '';
        if (el.fieldLongitude) el.fieldLongitude.value = Number.isFinite(editLon) ? String(editLon) : '';
        if (el.fieldStartTime) el.fieldStartTime.value = field.startClock || '';
        if (el.fieldEndTime) el.fieldEndTime.value = field.endClock || '';
        applySelectedDays(field.daysOfWeek);
        if (el.fieldSave) el.fieldSave.textContent = 'Update Uploaded Field';
        renderUploadedFields();
        el.fieldUploaderStatus.textContent = `Editing uploaded field: ${field.name}`;
      });
    });

    el.uploadedFieldList.querySelectorAll('.field-delete').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-field-id');
        const field = state.customFields.find((f) => f.id === id);
        if (!field) return;
        const ok = window.confirm(`Delete local secret field "${field.name}"? This cannot be undone.`);
        if (!ok) return;
        state.customFields = state.customFields.filter((f) => f.id !== id);
        saveCustomFields();
        renderUploadedFields();
        if (el.fieldUploaderStatus) el.fieldUploaderStatus.textContent = `${field.name} deleted.`;
      });
    });
  }

  function resetFieldForm() {
    state.editingFieldId = null;
    if (el.fieldName) el.fieldName.value = '';
    if (el.fieldIntensity) el.fieldIntensity.value = '5000';
    if (el.fieldRange) el.fieldRange.value = '25';
    if (el.fieldStartTime) el.fieldStartTime.value = '';
    if (el.fieldEndTime) el.fieldEndTime.value = '';
    if (el.fieldSave) el.fieldSave.textContent = 'Save Field';
    applySelectedDays([]);
    renderUploadedFields();
  }

  function applySecretCltDamping(rawStrength) {
    return Math.max(0, Number(rawStrength) || 0);
  }

  function initFieldUploader() {
    loadCustomFields();
    renderUploadedFields();
    applySelectedDays([]);

    (el.fieldDayToggles || []).forEach((btn) => {
      btn.addEventListener('click', () => {
        const active = btn.getAttribute('aria-pressed') === 'true';
        setDayToggleState(Number(btn.dataset.day), !active);
      });
    });

    el.fieldUseCurrentLocation?.addEventListener('click', async () => {
      const coords = await resolveCurrentCoords();
      if (!coords) {
        if (el.fieldUploaderStatus) el.fieldUploaderStatus.textContent = 'Unable to fetch current location for field coordinates.';
        return;
      }
      if (el.fieldLatitude) el.fieldLatitude.value = String(coords.lat);
      if (el.fieldLongitude) el.fieldLongitude.value = String(coords.lon);
      if (el.fieldUploaderStatus) el.fieldUploaderStatus.textContent = 'Coordinates set from current location.';
    });

    el.fieldClearCoordinates?.addEventListener('click', () => {
      if (el.fieldLatitude) el.fieldLatitude.value = '';
      if (el.fieldLongitude) el.fieldLongitude.value = '';
      if (el.fieldUploaderStatus) el.fieldUploaderStatus.textContent = 'Field coordinates cleared.';
    });

    el.fieldSave?.addEventListener('click', async () => {
      const intensity = Math.min(1000000, Math.max(1, Number(el.fieldIntensity?.value || 0)));
      const maxRangeM = Math.min(100, Math.max(1, Number(el.fieldRange?.value || 0)));

      let lat = parseCoordinateInput(el.fieldLatitude?.value);
      let lon = parseCoordinateInput(el.fieldLongitude?.value);
      const fieldLatBlank = String(el.fieldLatitude?.value ?? '').trim() === '';
      const fieldLonBlank = String(el.fieldLongitude?.value ?? '').trim() === '';

      if (fieldLatBlank || fieldLonBlank) {
        const currentCoords = await resolveCurrentCoords();
        if (currentCoords) {
          if (fieldLatBlank) {
            lat = currentCoords.lat;
            if (el.fieldLatitude) el.fieldLatitude.value = String(lat);
          }
          if (fieldLonBlank) {
            lon = currentCoords.lon;
            if (el.fieldLongitude) el.fieldLongitude.value = String(lon);
          }
        }
      }

      if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
        lat = state.lastBase?.lat;
        lon = state.lastBase?.lon;
      }
      if (!Number.isFinite(lat) || !Number.isFinite(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
        if (el.fieldUploaderStatus) el.fieldUploaderStatus.textContent = 'Field upload failed: valid coordinates required.';
        return;
      }

      const daysOfWeek = getSelectedDays();
      const rawName = String(el.fieldName?.value || '').trim();
      const name = rawName || `My Field ${state.autoFieldCounter++}`;
      const payload = {
        id: state.editingFieldId || `field_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        name,
        category: 'Secret',
        lat,
        lon,
        latitude: lat,
        longitude: lon,
        intensity,
        maxRangeM,
        startClock: el.fieldStartTime?.value || null,
        endClock: el.fieldEndTime?.value || null,
        daysOfWeek,
        updatedAt: new Date().toISOString()
      };

      const idx = state.customFields.findIndex((f) => f.id === payload.id);
      if (idx >= 0) state.customFields[idx] = payload;
      else state.customFields.push(payload);

      saveCustomFields();
      renderUploadedFields();
      resetFieldForm();
      if (el.fieldUploaderStatus) el.fieldUploaderStatus.textContent = `${name} saved to local storage.`;
    });

    el.fieldReset?.addEventListener('click', () => {
      resetFieldForm();
      if (el.fieldUploaderStatus) el.fieldUploaderStatus.textContent = 'Field form reset.';
    });
  }

  function getTimeLimitToggleLabel() {
    const enabled = state.uploadedTimeLimitsEnabled;
    return enabled
      ? 'Disable Uploaded Field Time Limits'
      : 'Enable Uploaded Field Time Limits';
  }

  function refreshTimeLimitToggleButton() {
    if (!el.simTimeLimitsToggle) return;
    const enabled = state.uploadedTimeLimitsEnabled;
    el.simTimeLimitsToggle.textContent = getTimeLimitToggleLabel();
    el.simTimeLimitsToggle.setAttribute('aria-pressed', enabled ? 'true' : 'false');
  }

  function toggleSimulatorTimeLimits() {
    const next = !state.uploadedTimeLimitsEnabled;
    state.uploadedTimeLimitsEnabled = next;
    refreshTimeLimitToggleButton();

    const mode = next ? 'enabled' : 'disabled';
    if (el.simStatus) {
      el.simStatus.textContent = `Simulator time limits ${mode} for uploaded fields.`;
    }

    if (state.lastBase) {
      const calc = computeField(state.lastBase.lat, state.lastBase.lon);
      renderLiveTelemetry(state.lastBase.lat, state.lastBase.lon, state.lastBase.accuracy, calc);
    }
  }


  function computeField(lat, lon) {
    const nowMs = Date.now();
    const baseEvaluations = magneticSources.map((source) => {
      const distance = haversineKm(lat, lon, source.lat, source.lon);
      let strength = interpolatedStrength(distance, source.bands);
      if (source.category === 'Secret') strength = applySecretCltDamping(strength);
      return { ...source, distance, strength, inField: strength > 0 };
    });

    const customEvaluations = state.customFields.map((field) => {
      const fieldLat = Number.isFinite(Number(field.lat)) ? Number(field.lat) : Number(field.latitude);
      const fieldLon = Number.isFinite(Number(field.lon)) ? Number(field.lon) : Number(field.longitude);
      const distance = haversineKm(lat, lon, fieldLat, fieldLon);
      const distanceM = distance * 1000;
      const strength = state.uploadedTimeLimitsEnabled
        ? customFieldStrength(field, distanceM, nowMs)
        : customFieldStrength({ ...field, startClock: null, endClock: null, daysOfWeek: [] }, distanceM, nowMs);
      return {
        name: field.name,
        category: 'Secret',
        lat: fieldLat,
        lon: fieldLon,
        distance,
        strength,
        inField: strength > 0,
        uploaded: true
      };
    });

    const evaluations = [...baseEvaluations, ...customEvaluations].sort((a, b) => b.strength - a.strength);

    const totalField = evaluations.reduce((sum, source) => sum + source.strength, 0);
    const regularFieldTotal = evaluations
      .filter((source) => source.category !== 'Secret')
      .reduce((sum, source) => sum + source.strength, 0);
    const secretFieldTotal = evaluations
      .filter((source) => source.category === 'Secret')
      .reduce((sum, source) => sum + source.strength, 0);
    const tungstenRegular = (regularFieldTotal / 1000) * 0.05;
    const tungstenSecret = 0.95 * (1 - Math.exp(-Math.max(secretFieldTotal, 0) / 6000));
    const tungstenAmbient = 0.000001;
    const tungstenBase = tungstenAmbient + tungstenRegular + tungstenSecret;

    const tungstenBySource = {};
    const secretFactor = secretFieldTotal > 0 ? (tungstenSecret / secretFieldTotal) : 0;
    evaluations.forEach((source) => {
      const key = getSourceKey(source);
      if (source.category === 'Secret') {
        tungstenBySource[key] = Math.max(0, source.strength * secretFactor);
      } else {
        tungstenBySource[key] = Math.max(0, (source.strength / 1000) * 0.05);
      }
    });

    const nearest = [...evaluations].sort((a, b) => a.distance - b.distance)[0];
    const nearestGeo = [...baseEvaluations]
      .filter((s) => s.category !== 'Secret')
      .sort((a, b) => a.distance - b.distance)[0];
    const nearestUploaded = [...customEvaluations]
      .filter((s) => s.inField)
      .sort((a, b) => a.distance - b.distance)[0];
    return {
      evaluations,
      totalField,
      tungstenBase,
      tungstenRegular,
      tungstenSecret,
      tungstenAmbient,
      tungstenBySource,
      nearest,
      nearestGeo,
      nearestUploaded
    };
  }

  function getDisplayNearestSource(calc, options = {}) {
    if (!calc || !Array.isArray(calc.evaluations)) return null;
    const forScanSheet = !!options.forScanSheet;
    const ranked = [...calc.evaluations].sort((a, b) => a.distance - b.distance);

    return ranked.find((source) => {
      if (source.uploaded) return source.inField;
      if (source.category !== 'Secret') return true;
      if (forScanSheet && Number(source.strength) >= 100) return true;
      return false;
    }) || null;
  }

  function formatDistanceShort(distanceKm, unitSystem = state.unitSystem) {
    if (!Number.isFinite(distanceKm)) return '—';
    if (unitSystem === 'imperial') {
      const miles = distanceKm * 0.621371;
      return miles < 1 ? `${(miles * 5280).toFixed(1)} ft` : `${miles.toFixed(3)} mi`;
    }
    return distanceKm < 1 ? `${(distanceKm * 1000).toFixed(1)} m` : `${distanceKm.toFixed(3)} km`;
  }

  function formatDistancePrimary(distanceKm, unitSystem = state.unitSystem) {
    if (!Number.isFinite(distanceKm)) return unitSystem === 'imperial' ? '— mi' : '— km';
    if (unitSystem === 'imperial') return `${(distanceKm * 0.621371).toFixed(3)} mi`;
    return distanceKm >= 1 ? `${distanceKm.toFixed(3)} km` : `${(distanceKm * 1000).toFixed(1)} m`;
  }

  function formatHistoryTime(dateObj) {
    return dateObj.toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: '2-digit', second: '2-digit' });
  }

  function getTelemetryErrorChancePercent(cltValue) {
    const clt = Number(cltValue);
    if (!Number.isFinite(clt) || clt < 50000) return 0;
    const steps = Math.floor((clt - 50000) / 20000) + 1;
    return Math.max(0, Math.min(100, steps * 5));
  }

  function shouldOutputTelemetryError(cltValue) {
    return Math.random() * 100 < getTelemetryErrorChancePercent(cltValue);
  }


  function getCltDriftMaxAbs(cltValue) {
    const clt = Number(cltValue);
    const steps = (!Number.isFinite(clt) || clt < 50000)
      ? 0
      : (Math.floor((clt - 50000) / 5000) + 1);
    const percent = 5 + steps;
    return Math.max(0, percent / 100);
  }

  function getSourceKey(source) {
    if (!source) return 'unknown';
    return `${source.name || 'unknown'}|${source.category || 'Unknown'}|${source.lat ?? 'na'}|${source.lon ?? 'na'}`;
  }

  function getSourceDisplayName(source, cltValue) {
    const value = Number(cltValue) || 0;
    if (source?.hiddenName && value < Number(source.revealThreshold || 0)) return source.hiddenName;
    if (source.category === 'Secret' && !source?.uploaded && value < 100) return 'Unknown Source';
    return source.name || 'Unknown Source';
  }

  function renderContributionTables(calc, liveClt, liveTungsten, liveBreakdown = null, hasTelemetryError = false) {
    const cltBody = el.cltContributionTable?.querySelector('tbody');
    const tungstenBody = el.tungstenContributionTable?.querySelector('tbody');
    if (!cltBody || !tungstenBody) return;

    if (!calc || !liveBreakdown) {
      cltBody.innerHTML = '<tr><td>None</td><td>0.00</td></tr>';
      tungstenBody.innerHTML = '<tr><td>None</td><td>0.000000</td></tr>';
      return;
    }

    const cltRows = (liveBreakdown.cltBySource || [])
      .filter((row) => row.value > 0.00001)
      .sort((a, b) => b.value - a.value);

    const cltByKey = new Map(cltRows.map((row) => [getSourceKey(row.source), row.value]));

    if (!cltRows.length) {
      cltBody.innerHTML = '<tr><td>None</td><td>0.00</td></tr>';
    } else {
      cltBody.innerHTML = cltRows.map((row) => {
        const name = hasTelemetryError ? 'ERROR' : getSourceDisplayName(row.source, row.value);
        const valueLabel = hasTelemetryError ? 'ERROR' : row.value.toLocaleString(undefined, { maximumFractionDigits: 2 });
        return `<tr><td>${name}</td><td>${valueLabel}</td></tr>`;
      }).join('');
    }

    const tungstenRows = (liveBreakdown.tungstenBySource || [])
      .filter((row) => row.value > 0.0000000001)
      .sort((a, b) => b.value - a.value);

    if (!tungstenRows.length) {
      tungstenBody.innerHTML = '<tr><td>None</td><td>0.000000</td></tr>';
    } else {
      tungstenBody.innerHTML = tungstenRows.map((row) => {
        if (row.source?.name === 'Ambient Baseline') {
          const name = hasTelemetryError ? 'ERROR' : 'Ambient Baseline';
          const valueLabel = hasTelemetryError ? 'ERROR' : row.value.toFixed(6);
          return `<tr><td>${name}</td><td>${valueLabel}</td></tr>`;
        }
        const name = hasTelemetryError ? 'ERROR' : getSourceDisplayName(row.source, cltByKey.get(getSourceKey(row.source)) || 0);
        const valueLabel = hasTelemetryError ? 'ERROR' : row.value.toFixed(6);
        return `<tr><td>${name}</td><td>${valueLabel}</td></tr>`;
      }).join('');
    }
  }


  function renderHistory() {
    if (!el.contributors) return;
    if (!state.history.length) {
      el.contributors.textContent = 'No live readings yet.';
      return;
    }

    el.contributors.textContent = state.history.map((item) => {
      const geoLabel = item.nearestGeoName
        ? `${item.nearestGeoName} (${formatDistanceShort(item.nearestGeoDistanceKm)})`
        : '—';
      const idvlLabel = item.nearestIdvlName
        ? `${item.nearestIdvlName} (${formatDistanceShort(item.nearestIdvlDistanceKm)})`
        : 'none';
      const cltLabel = item.cltError ? 'ERROR' : `${item.clt.toLocaleString(undefined, { maximumFractionDigits: 2 })} CLT`;
      const tungstenLabel = item.tungstenError ? 'ERROR' : `${item.tungsten.toFixed(5)} mg/m³`;
      const geoValue = geoLabel;
      const idvlValue = item.uploadedDistanceError ? 'ERROR' : idvlLabel;
      return `${item.time} | ${cltLabel} | Tungsten ${tungstenLabel} | Nearest GEO ${geoValue} | Nearest IDVL ${idvlValue}`;
    }).join('\n');
  }

  function renderLiveTelemetry(lat, lon, accuracy, calc) {
    const cltBySource = [];
    const tungstenBySource = [];

    (calc.evaluations || []).forEach((source) => {
      const key = getSourceKey(source);
      const cltMargin = smoothDrift(state.cltSourceMargins[key] || 0, getCltDriftMaxAbs(calc.totalField));
      const tungstenMargin = smoothDrift(state.tungstenSourceMargins[key] || 0, 0.2);
      state.cltSourceMargins[key] = cltMargin;
      state.tungstenSourceMargins[key] = tungstenMargin;

      cltBySource.push({
        source,
        value: Math.max(0, Number(source.strength || 0) * (1 + cltMargin))
      });

      const tungstenBase = Number(calc.tungstenBySource?.[key] || 0);
      tungstenBySource.push({
        source,
        value: Math.max(0, tungstenBase * (1 + tungstenMargin))
      });
    });

    const ambientKey = '__ambient_baseline__';
    const ambientMargin = smoothDrift(state.tungstenSourceMargins[ambientKey] || 0, 0.2);
    state.tungstenSourceMargins[ambientKey] = ambientMargin;
    tungstenBySource.push({
      source: { name: 'Ambient Baseline', category: 'Regular', lat: 0, lon: 0 },
      value: Math.max(0, Number(calc.tungstenAmbient || 0) * (1 + ambientMargin))
    });

    const liveClt = cltBySource.reduce((sum, row) => sum + row.value, 0);
    const liveTungsten = tungstenBySource.reduce((sum, row) => sum + row.value, 0);
    const liveBreakdown = { cltBySource, tungstenBySource };

    state.lastBase = { lat, lon, accuracy, calc, liveClt, liveTungsten, liveBreakdown, timestamp: Date.now() };

    const cltError = shouldOutputTelemetryError(liveClt);
    const tungstenError = shouldOutputTelemetryError(liveClt);
    const uploadedDistanceError = shouldOutputTelemetryError(liveClt);
    const gpsError = shouldOutputTelemetryError(liveClt);

    if (el.totalField) el.totalField.textContent = cltError
      ? 'ERROR'
      : liveClt.toLocaleString(undefined, { maximumFractionDigits: 2 });
    if (el.tungsten) el.tungsten.textContent = tungstenError
      ? 'ERROR'
      : `${liveTungsten.toFixed(5)} mg/m³`;
    if (el.geoDistance) {
      el.geoDistance.textContent = calc.nearestGeo ? formatDistancePrimary(calc.nearestGeo.distance) : formatDistancePrimary(NaN);
    }
    if (el.geoName) {
      el.geoName.textContent = calc.nearestGeo ? calc.nearestGeo.name : '—';
    }
    if (el.uploadedDistance) {
      el.uploadedDistance.textContent = uploadedDistanceError
        ? 'ERROR'
        : (calc.nearestUploaded ? formatDistancePrimary(calc.nearestUploaded.distance) : formatDistancePrimary(NaN));
    }
    if (el.nearestSource) {
      el.nearestSource.textContent = calc.nearestUploaded ? calc.nearestUploaded.name : 'none';
    }
    if (el.gpsAccuracy) {
      const meters = Number(accuracy);
      el.gpsAccuracy.textContent = gpsError
        ? 'ERROR'
        : (Number.isFinite(meters) ? `${meters.toFixed(1)} m` : '—');
    }

    const now = new Date();
    const stamp = formatHistoryTime(now);
    if (el.lastUpdate) el.lastUpdate.textContent = `Last update: ${stamp}`;

    state.history.unshift({
      time: stamp,
      clt: liveClt,
      tungsten: liveTungsten,
      nearestGeoName: calc.nearestGeo ? calc.nearestGeo.name : null,
      nearestGeoDistanceKm: calc.nearestGeo ? calc.nearestGeo.distance : NaN,
      nearestIdvlName: calc.nearestUploaded ? calc.nearestUploaded.name : null,
      nearestIdvlDistanceKm: calc.nearestUploaded ? calc.nearestUploaded.distance : NaN,
      cltError,
      tungstenError,
      uploadedDistanceError
    });
    state.history = state.history.slice(0, 50);
    renderHistory();
    renderContributionTables(calc, liveClt, liveTungsten, liveBreakdown, cltError || tungstenError);

    if (el.scanBtn) el.scanBtn.disabled = false;
  }

  function renderScanSheet(result) {
    if (!el.scanSheet) return;
    const withError = (value) => (shouldOutputTelemetryError(result.clt) ? 'ERROR' : value);
    el.scanSheet.innerHTML = [
      `CLT Field: ${withError(result.clt.toLocaleString(undefined, { maximumFractionDigits: 4 }))}`,
      `Tungsten: ${withError(`${result.tungsten.toFixed(6)} mg/m³`)}`,
      `Coordinates: ${withError(`${result.lat.toFixed(8)}, ${result.lon.toFixed(8)}`)}`,
      `Timestamp: ${withError(new Date(result.timestamp).toLocaleString())}`,
      `Nearest Source: ${withError(result.sourceName)}`,
      `Distance to Source: ${withError(formatDistanceShort(result.distanceKm))}`
    ].map((line) => `<li>${line}</li>`).join('');
  }

  function runAccurateScan() {
    if (!state.lastBase || !el.scanBar || !el.scanState) {
      setStatus('Scan unavailable: waiting for live or fallback reading.', 'TRACKING PAUSED');
      return;
    }

    if (state.scanTimer) window.clearInterval(state.scanTimer);
    refreshTimeLimitToggleButton();
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

        const nearestScanSource = getDisplayNearestSource(base.calc, { forScanSheet: true });
        renderScanSheet({
          clt: cltResult,
          tungsten: tungstenResult,
          lat: base.lat,
          lon: base.lon,
          timestamp: Date.now(),
          sourceName: nearestScanSource ? nearestScanSource.name : 'none',
          distanceKm: nearestScanSource ? nearestScanSource.distance : NaN
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
      if ((!state.liveMode && !state.simulationActive) || !state.lastBase) return;
      const base = state.lastBase;
      renderLiveTelemetry(base.lat, base.lon, base.accuracy, base.calc);
    }, 2400);
  }

  function onGeolocationError(error) {
    stopLiveTracking();

    if (error?.code === 1) {
      document.body.innerHTML = '<main class="geo-denied-screen"><div><h1>Enable geolocation to continue.</h1><p><a class="btn secondary" href="index.html">Return home</a></p></div></main>';
      return;
    }

    setFallbackVisibility(true);
    if (error?.code === 2) {
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
        state.simulationActive = false;
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
    const lat = parseCoordinateInput(el.latInput?.value);
    const lon = parseCoordinateInput(el.lonInput?.value);
    if (!Number.isFinite(lat) || !Number.isFinite(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      setStatus('Invalid fallback coordinates. Latitude [-90, 90], longitude [-180, 180].', 'TRACKING PAUSED');
      return null;
    }
    return { lat, lon };
  }


  function activateSimulatorTeleport() {
    if (!state.simulatorUnlocked) {
      if (el.simStatus) el.simStatus.textContent = 'Unlock simulator first.';
      return;
    }

    const lat = parseCoordinateInput(el.simLatitude?.value);
    const lon = parseCoordinateInput(el.simLongitude?.value);

    if (!Number.isFinite(lat) || !Number.isFinite(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      if (el.simStatus) el.simStatus.textContent = 'Simulator input invalid: latitude [-90, 90], longitude [-180, 180].';
      return;
    }

    stopLiveTracking();
    state.simulationActive = true;
    state.liveMode = false;
    const calc = computeField(lat, lon);
    renderLiveTelemetry(lat, lon, NaN, calc);
    startDriftTicker();
    setStatus('Simulator teleport active. Live GPS paused.', 'TRACKING PAUSED');
    if (el.simStatus) el.simStatus.textContent = `Teleported to ${lat.toFixed(6)}, ${lon.toFixed(6)} (live simulated tracking active).`;
  }

  function unlockSimulator() {
    const expectedPassword = '67416741';
    const password = String(el.simPassword?.value || '');
    if (password !== expectedPassword) {
      state.simulatorUnlocked = false;
      if (el.simCoordinateBlock) el.simCoordinateBlock.hidden = true;
      if (el.simStatus) el.simStatus.textContent = 'Simulator access denied: invalid password.';
      return;
    }

    state.simulatorUnlocked = true;
    if (el.simCoordinateBlock) el.simCoordinateBlock.hidden = false;
    refreshTimeLimitToggleButton();
    if (el.simStatus) el.simStatus.textContent = `Simulator unlocked. Enter teleport coordinates. Uploaded field time limits are ${state.uploadedTimeLimitsEnabled ? 'enabled' : 'disabled'}.`;
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


  [el.latInput, el.lonInput, el.fieldLatitude, el.fieldLongitude, el.simLatitude, el.simLongitude].forEach((coordEl) => {
    coordEl?.addEventListener('input', () => {
      if (coordEl.value.includes(',')) coordEl.value = coordEl.value.replace(/,/g, '.');
    });
  });

  el.unitSwitch?.addEventListener('change', () => {
    state.unitSystem = el.unitSwitch.value === 'imperial' ? 'imperial' : 'metric';
    if (state.lastBase) {
      const calc = state.lastBase.calc;
      if (el.geoDistance) el.geoDistance.textContent = calc.nearestGeo ? formatDistancePrimary(calc.nearestGeo.distance) : formatDistancePrimary(NaN);
      if (el.uploadedDistance) el.uploadedDistance.textContent = calc.nearestUploaded ? formatDistancePrimary(calc.nearestUploaded.distance) : formatDistancePrimary(NaN);
      renderHistory();
      renderContributionTables(calc, state.lastBase.liveClt, state.lastBase.liveTungsten, state.lastBase.liveBreakdown);
    }
  });

  el.copyLogs?.addEventListener('click', async () => {
    if (!el.contributors) return;
    try {
      await navigator.clipboard.writeText(el.contributors.textContent || '');
      el.copyLogs.textContent = 'Copied';
    } catch {
      el.copyLogs.textContent = 'Copy failed';
    }
    setTimeout(() => { if (el.copyLogs) el.copyLogs.textContent = 'Copy Logs'; }, 1500);
  });

  initFallbackTools();
  initFieldUploader();
  el.scanBtn?.addEventListener('click', runAccurateScan);
  el.simUnlock?.addEventListener('click', unlockSimulator);
  el.simTeleport?.addEventListener('click', activateSimulatorTeleport);
  el.simTimeLimitsToggle?.addEventListener('click', toggleSimulatorTimeLimits);

  refreshTimeLimitToggleButton();
  if (el.scanBtn) el.scanBtn.disabled = true;
  renderHistory();
  renderContributionTables(null, 0, 0);

  // Primary behavior: request live geolocation immediately on load.
  startLiveTracking();

  // If manual fields are blank, seed them with current geolocation coordinates.
  if (el.latInput && el.lonInput && (el.latInput.value.trim() === '' || el.lonInput.value.trim() === '')) {
    resolveCurrentCoords().then((coords) => {
      if (!coords) return;
      el.latInput.value = String(coords.lat);
      el.lonInput.value = String(coords.lon);
    });
  }

  // Keep denied fallback coordinates ready for manual testing if needed.
  if (fallbackCoord && el.latInput && el.lonInput && (el.latInput.value.trim() === '' || el.lonInput.value.trim() === '')) {
    el.latInput.value = String(fallbackCoord.lat);
    el.lonInput.value = String(fallbackCoord.lon);
  }
}


function initFieldCalculator() {
  const app = document.getElementById('fieldCalculatorApp');
  if (!app) return;

  const datasets = {
    us: {
      label: 'United States',
      ranks: {
        2024: 4, 2023: 3, 2022: 3, 2021: 3, 2020: 4, 2019: 6, 2018: 6, 2017: 7, 2016: 7, 2015: 9,
        2014: 10, 2013: 11, 2012: 19, 2011: 27, 2010: 46, 2009: 68, 2008: 86, 2007: 101, 2006: 125,
        2005: 135, 2004: 170, 2003: 182, 2002: 204, 2001: 229, 2000: 289, 1999: 307, 1998: 304,
        1997: 301, 1996: 302, 1995: 275, 1994: 291, 1993: 293, 1992: 286, 1991: 287, 1990: 287,
        1989: 292, 1988: 288, 1987: 292, 1986: 286, 1985: 265, 1984: 304, 1983: 283, 1982: 308,
        1981: 290, 1980: 292, 1979: 285, 1978: 278, 1977: 265, 1976: 245, 1975: 224, 1974: 203,
        1973: 194, 1972: 188, 1971: 176, 1970: 166, 1969: 160, 1968: 163, 1967: 163, 1966: 151,
        1965: 153, 1964: 158, 1963: 153, 1962: 154, 1961: 147, 1960: 151, 1959: 144, 1958: 140,
        1957: 133, 1956: 133, 1955: 129, 1954: 113, 1953: 100, 1952: 89, 1951: 84, 1950: 80,
        1949: 71, 1948: 69, 1947: 68, 1946: 64, 1945: 55, 1944: 50, 1943: 47, 1942: 51, 1941: 55,
        1940: 55, 1939: 66, 1938: 70, 1937: 67, 1936: 61, 1935: 65, 1934: 72, 1933: 79, 1932: 74,
        1931: 75, 1930: 75, 1929: 73, 1928: 72, 1927: 75, 1926: 78, 1925: 77, 1924: 80, 1923: 77,
        1922: 76, 1921: 79, 1920: 79, 1919: 79, 1918: 78, 1917: 76, 1916: 80, 1915: 81, 1914: 88,
        1913: 87, 1912: 91, 1911: 95, 1910: 99, 1909: 94, 1908: 98, 1907: 105, 1906: 103, 1905: 104,
        1904: 110, 1903: 115, 1902: 114, 1901: 105, 1900: 110, 1899: 104, 1898: 105, 1897: 104,
        1896: 103, 1895: 106, 1894: 100, 1893: 100, 1892: 98, 1891: 101, 1890: 98, 1889: 89, 1888: 88,
        1887: 91, 1886: 94, 1885: 94, 1884: 86, 1883: 92, 1882: 100, 1881: 95, 1880: 91
      }
    },
    ca: {
      label: 'Canada',
      ranks: {
        2023: 2, 2022: 2, 2021: 3, 2020: 3, 2019: 2, 2018: 3, 2017: 3, 2016: 3, 2015: 3, 2014: 6,
        2013: 6, 2012: 10, 2011: 9, 2010: 13, 2009: 20, 2008: 26, 2007: 29, 2006: 28, 2005: 47,
        2004: 57, 2003: 77, 2002: 70, 2001: 63, 2000: 86, 1945: 97, 1944: 97, 1942: 95, 1921: 97
      }
    },
    gb_ew: {
      label: 'UK (England/Wales)',
      ranks: {
        2024: 23, 2023: 23, 2022: 26, 2021: 25, 2020: 20, 2019: 18, 2018: 12, 2017: 12, 2016: 12,
        2015: 25, 2014: 23, 2013: 21, 2012: 20, 2011: 21, 2010: 20, 2009: 14, 2008: 13, 2007: 12,
        2006: 12, 2005: 9, 2004: 8, 2003: 9, 2002: 7, 2001: 6, 2000: 5, 1999: 6, 1998: 6, 1997: 7,
        1996: 7
      }
    },
    au: {
      label: 'Australia',
      ranks: {
        2024: 1, 2023: 5, 2022: 1, 2021: 3, 2020: 3, 2019: 1, 2018: 1, 2017: 1, 2016: 2, 2015: 1,
        2014: 3, 2013: 1, 2012: 1, 2011: 7, 2010: 5, 2009: 3, 2008: 6, 2007: 7, 2006: 2, 2005: 3,
        2004: 6, 2003: 12, 2002: 14, 2001: 16, 2000: 26, 1999: 39, 1998: 54, 1997: 65, 1996: 87,
        1995: 83, 1994: 79, 1993: 94, 1992: 67, 1990: 97, 1989: 89
      }
    }
  };

  const countries = Object.entries(datasets).map(([code, value]) => ({ code, label: value.label }));

  const el = {
    name: document.getElementById('fcName'),
    country: document.getElementById('fcCountry'),
    year: document.getElementById('fcYear'),
    rankToggle: document.getElementById('fcRankToggle'),
    rank: document.getElementById('fcRank'),
    appearance: document.getElementById('fcAppearance'),
    surnameToggle: document.getElementById('fcSurnameToggle'),
    surnameP1Label: document.getElementById('fcSurnameP1Label'),
    surnameP2Label: document.getElementById('fcSurnameP2Label'),
    surnameP1: document.getElementById('fcSurnameP1'),
    surnameP2: document.getElementById('fcSurnameP2'),
    calculate: document.getElementById('fcCalculate'),
    runLoader: document.getElementById('fcRunLoader'),
    runBar: document.getElementById('fcRunBar'),
    runStatus: document.getElementById('fcRunStatus'),
    result: document.getElementById('fcResult')
  };

  if (el.country) {
    el.country.innerHTML = countries.map((country) => `<option value="${country.code}">${country.label}</option>`).join('');
    el.country.value = 'us';
  }

  function getSelectedLabel(code) {
    return countries.find((c) => c.code === code)?.label || 'Unknown';
  }

  function getDatasetYears(countryCode) {
    const ranks = datasets[countryCode]?.ranks || {};
    return Object.keys(ranks).map(Number).sort((a, b) => b - a);
  }

  function getRankFromLocalData(countryCode, year) {
    const ranks = datasets[countryCode]?.ranks || {};
    const years = getDatasetYears(countryCode);
    if (!years.length) return null;
    if (Number.isInteger(year)) return ranks[year] ?? null;
    return ranks[years[0]] ?? null;
  }

  function normalizeYear() {
    const raw = String(el.year?.value || '').trim();
    if (!raw) return null;
    const parsed = Number(raw);
    if (!Number.isInteger(parsed) || parsed < 1880 || parsed > 2100) return null;
    return parsed;
  }

  function normalizeRank() {
    const raw = String(el.rank?.value || '').trim();
    if (!raw) return null;
    const parsed = Number(raw);
    if (!Number.isInteger(parsed) || parsed < 1 || parsed > 1000) return null;
    return parsed;
  }

  function normalizeAppearance() {
    const raw = String(el.appearance?.value || '').trim();
    if (!raw) return null;
    const parsed = Number(raw);
    if (!Number.isFinite(parsed) || parsed < 0 || parsed > 10) return null;
    return parsed;
  }

  function normalizeSurnameFrequency(inputEl, allowBlank = false) {
    const raw = String(inputEl?.value || '').trim();
    if (!raw && allowBlank) return null;
    const parsed = Number(raw);
    if (!Number.isFinite(parsed) || parsed < 0.01 || parsed > 880) return null;
    return parsed;
  }

  function formatNumber(value, digits = 3) {
    return Number(value).toLocaleString(undefined, { maximumFractionDigits: digits });
  }

  function formatDistanceMeters(value) {
    if (!Number.isFinite(value) || value <= 0) return '0 m';
    if (value >= 1000) return `${formatNumber(value / 1000, 3)} km`;
    return `${formatNumber(value, 3)} m`;
  }

  function calculateTungstenConcentration(cltValue) {
    const safeClt = Math.max(Number(cltValue) || 0, 0);
    if (safeClt === 0) return 0;
    const numerator = 0.55 * Math.pow(safeClt, 1.09);
    const denominator = Math.pow(safeClt, 1.09) + Math.pow(1737, 1.09);
    return denominator > 0 ? (numerator / denominator) : 0;
  }

  function calculateBandLengths(baseB, appearanceA, surnameL) {
    const baselineMeters = 1.5;
    const deltaB = baseB - 500;
    const basePerimeterMeters = deltaB >= 0
      ? baselineMeters + (deltaB * 0.005)
      : baselineMeters + (deltaB * 0.001);
    const scaledM = Math.max(0, basePerimeterMeters * appearanceA * surnameL);
    return {
      ns: scaledM * 0.03,
      ce: scaledM * 0.2,
      e: scaledM * 0.5,
      m: scaledM,
      ps: scaledM * 1.7,
      ms: scaledM * 3.5,
      mp: scaledM * 4.5,
      mh: scaledM * 6.5
    };
  }

  const bandTheme = [
    { key: 'ns', label: 'NS', className: 'band-ns', cltMultiplier: 1.5, tungstenMultiplier: 0.45 },
    { key: 'ce', label: 'CE', className: 'band-ce', cltMultiplier: 1.25, tungstenMultiplier: 0.3 },
    { key: 'e', label: 'E', className: 'band-e', cltMultiplier: 1.1, tungstenMultiplier: 0.55 },
    { key: 'm', label: 'M', className: 'band-m', cltMultiplier: 1, tungstenMultiplier: 0.925 },
    { key: 'ps', label: 'PS', className: 'band-ps', cltMultiplier: 0.7, tungstenMultiplier: 0.55 },
    { key: 'ms', label: 'MS', className: 'band-ms', cltMultiplier: 0.275, tungstenMultiplier: 0.3 },
    { key: 'mp', label: 'MP', className: 'band-mp', cltMultiplier: 0.1, tungstenMultiplier: 0.15 },
    { key: 'mh', label: 'MH', className: 'band-mh', cltMultiplier: 0.05, tungstenMultiplier: 0.075 }
  ];

  function buildBandTelemetry(bands, clt, tungsten) {
    const ordered = bandTheme.map((band) => ({
      ...band,
      perimeter: Number(bands?.[band.key] || 0),
      cltValue: Math.max(0, clt * band.cltMultiplier),
      tungstenValue: Math.max(0, tungsten * band.tungstenMultiplier)
    }));

    return ordered.map((band, index) => {
      const previous = index === 0 ? 0 : ordered[index - 1].perimeter;
      return {
        ...band,
        rangeLabel: `${formatDistanceMeters(previous)} - ${formatDistanceMeters(band.perimeter)}`
      };
    });
  }

  function isManualRankMode() {
    return el.rankToggle?.getAttribute('aria-pressed') === 'true';
  }

  function syncRankModeUi() {
    const manual = isManualRankMode();
    if (el.rankToggle) el.rankToggle.textContent = manual ? 'Using Manual Rank' : 'Use Rank Input';
    if (el.year) el.year.disabled = manual;
    if (el.rank) el.rank.disabled = !manual;
  }

  function isSecondSurnameMode() {
    return el.surnameToggle?.getAttribute('aria-pressed') === 'true';
  }

  function syncSurnameModeUi() {
    const enabled = isSecondSurnameMode();
    if (el.surnameToggle) el.surnameToggle.textContent = enabled ? 'Second last name enabled' : 'Enable second last name';
    if (el.surnameP1Label) {
      el.surnameP1Label.firstChild.textContent = enabled
        ? 'First last frequency (per 100,000 babies)'
        : 'Last-name frequency P1 (per 100,000 babies)';
    }
    if (el.surnameP2Label) el.surnameP2Label.hidden = !enabled;
    if (el.surnameP2) {
      el.surnameP2.disabled = !enabled;
      if (!enabled) el.surnameP2.value = '';
    }
  }

  function renderResult({
    status = 'idle',
    title = 'Result',
    primaryLabel = '',
    primaryValue = '',
    metrics = [],
    lines = [],
    nameValue = '',
    nameIsAlert = false,
    primaryIsAlert = false,
    upperStats = null,
    bandTelemetry = []
  } = {}) {
    if (!el.result) return;
    el.result.classList.toggle('is-success', status === 'success');
    el.result.classList.toggle('is-warning', status === 'warning');
    el.result.classList.toggle('is-error', status === 'error');

    const primaryHtml = primaryValue
      ? `<div class="field-result-primary"><span class="field-result-primary-label">${primaryLabel}</span><strong class="${primaryIsAlert ? 'is-alert' : ''}">${primaryValue}</strong></div>`
      : '';
    const upperHtml = upperStats
      ? `<section class="field-result-upper" aria-label="CLT and tungsten summary">
          <article class="field-core-card">
            <p class="field-core-label">Your CLT</p>
            <p class="field-core-value ${primaryIsAlert ? 'is-alert' : ''}">${upperStats.cltValue}</p>
          </article>
          <article class="field-core-card">
            <p class="field-core-label">Tungsten Concentration</p>
            <p class="field-core-value">${upperStats.tungstenValue}</p>
          </article>
        </section>`
      : '';
    const metricsHtml = metrics.length
      ? `<dl class="field-result-metrics">${metrics.map((item) => `<div class="metric"><dt>${item.label}</dt><dd>${item.value}</dd></div>`).join('')}</dl>`
      : '';
    const bandTelemetryHtml = bandTelemetry.length
      ? `<section class="field-result-lower" aria-label="Band telemetry">
          <h3>Magnetic Field Ring Visualization</h3>
          <div class="field-band-visual">
            <div class="field-ring field-ring-mh"></div>
            <div class="field-ring field-ring-mp"></div>
            <div class="field-ring field-ring-ms"></div>
            <div class="field-ring field-ring-ps"></div>
            <div class="field-ring field-ring-m"></div>
            <div class="field-ring field-ring-e"></div>
            <div class="field-ring field-ring-ce"></div>
            <div class="field-ring field-ring-ns"></div>
            <div class="field-ring-center">${nameValue || '—'}</div>
          </div>
          <div class="field-band-legend">
            ${bandTelemetry.map((band) => `
              <article class="field-band-row ${band.className}">
                <p><strong>${band.label}</strong> · ${band.rangeLabel}</p>
                <p>CLT ${formatNumber(band.cltValue, 2)} · ${band.tungstenValue.toFixed(6)} mg/m³</p>
              </article>
            `).join('')}
          </div>
        </section>`
      : '';
    const nameHtml = nameValue
      ? `<p class="field-result-name ${nameIsAlert ? 'is-alert' : ''}">Name: ${nameValue}</p>`
      : '';
    const linesHtml = lines.map((line) => `<p>${line}</p>`).join('');

    el.result.innerHTML = `<h2>${title}</h2>${upperHtml}${primaryHtml}${metricsHtml}${bandTelemetryHtml}${nameHtml}${linesHtml}`;
  }

  function runCalculationLoader(durationMs = 1800) {
    if (!el.runLoader || !el.runBar || !el.runStatus) return Promise.resolve();

    el.runLoader.hidden = false;
    el.runBar.style.width = '0%';

    const phases = [
      { at: 0.08, label: 'Finding name rankings...' },
      { at: 0.36, label: 'Calibrating formulas...' },
      { at: 0.68, label: 'Ranking Charlottes...' },
      { at: 0.94, label: 'Done!' }
    ];

    return new Promise((resolve) => {
      const start = performance.now();

      function frame(now) {
        const t = Math.min((now - start) / durationMs, 1);
        el.runBar.style.width = `${t * 100}%`;

        let label = phases[0].label;
        for (const phase of phases) if (t >= phase.at) label = phase.label;
        el.runStatus.textContent = label;

        if (t < 1) requestAnimationFrame(frame);
        else {
          el.runLoader.hidden = true;
          resolve();
        }
      }

      requestAnimationFrame(frame);
    });
  }

  async function calculate() {
    const enteredName = String(el.name?.value || '').trim();
    const countryCode = String(el.country?.value || 'us');
    const manualRank = isManualRankMode();
    const year = normalizeYear();
    const hasYearInput = String(el.year?.value || '').trim().length > 0;
    const rankInput = normalizeRank();
    const hasRankInput = String(el.rank?.value || '').trim().length > 0;
    const appearance = normalizeAppearance();
    const hasAppearanceInput = String(el.appearance?.value || '').trim().length > 0;
    const p1 = normalizeSurnameFrequency(el.surnameP1);
    const p2 = isSecondSurnameMode() ? normalizeSurnameFrequency(el.surnameP2, true) : null;

    if (!enteredName) {
      renderResult({ status: 'warning', title: 'Missing name', lines: ['Please enter a name before calculating.'] });
      return;
    }

    if (enteredName.toLowerCase() !== 'charlotte') {
      renderResult({
        status: 'error',
        title: 'Calculated CLT Result',
        primaryLabel: 'CLT',
        primaryValue: '0',
        primaryIsAlert: true,
        metrics: [
          { label: 'Rank (n)', value: '0× multiplier applied' },
          { label: 'Appearance (M)', value: '—' },
          { label: 'Surname P', value: '—' },
          { label: 'Year', value: manualRank ? 'Manual rank mode' : String(year || '—') },
          { label: 'Dataset', value: getSelectedLabel(countryCode) }
        ],
        nameValue: enteredName,
        nameIsAlert: true,
        lines: ['Legal first name is not Charlotte, so CLT multiplier is 0×.']
      });
      return;
    }

    if (manualRank && !hasRankInput) {
      renderResult({ status: 'warning', title: 'Missing rank', lines: ['Enable rank mode and provide a manual rank value between 1 and 1000.'] });
      return;
    }

    if (manualRank && hasRankInput && rankInput === null) {
      renderResult({ status: 'warning', title: 'Invalid rank', lines: ['Manual rank (n) must be an integer between 1 and 1000.'] });
      return;
    }

    if (!manualRank && hasYearInput && year === null) {
      renderResult({ status: 'warning', title: 'Invalid year', lines: ['Enter a valid year between 1880 and 2100, or leave it blank.'] });
      return;
    }

    if (hasAppearanceInput && appearance === null) {
      renderResult({ status: 'warning', title: 'Invalid appearance score', lines: ['Appearance (M) must be a number between 0 and 10.'] });
      return;
    }

    if (p1 === null) {
      renderResult({ status: 'warning', title: 'Invalid P1 value', lines: ['Last-name frequency P1 must be between 0.01 and 880.'] });
      return;
    }

    if (isSecondSurnameMode() && String(el.surnameP2?.value || '').trim().length > 0 && p2 === null) {
      renderResult({ status: 'warning', title: 'Invalid P2 value', lines: ['Last-name frequency P2 must be between 0.01 and 880 when provided.'] });
      return;
    }

    if (el.calculate) el.calculate.disabled = true;
    renderResult({ status: 'idle', title: 'Computing', lines: ['Running calculation...'] });

    try {
      const loaderPromise = runCalculationLoader();
      const years = getDatasetYears(countryCode);
      const rank = manualRank ? rankInput : getRankFromLocalData(countryCode, year);
      await loaderPromise;

      if (!rank) {
        renderResult({
          status: 'warning',
          title: 'No rank data found',
          lines: [
            `No ${getSelectedLabel(countryCode)} Charlotte rank is available for year ${year}.`,
            years.length ? `Available years: ${years[years.length - 1]}-${years[0]}.` : 'No dataset years available.'
          ]
        });
        return;
      }

      const m = appearance ?? 0;
      const p = p2 === null ? p1 : (p1 + p2) / 2;

      const b = (7.25 * rank) + 32;
      const a = 0.8 + (0.04 * m);
      const logBase = Math.log10(880 / 0.01);
      const l = 0.87 + 0.63 * Math.pow(Math.log10(880 / p) / logBase, 0.644);
      const clt = b * a * l;
      const tungsten = calculateTungstenConcentration(clt);
      const bands = calculateBandLengths(b, a, l);
      const bandTelemetry = buildBandTelemetry(bands, clt, tungsten);

      renderResult({
        status: 'success',
        title: 'Calculated CLT Result',
        upperStats: {
          cltValue: formatNumber(clt),
          tungstenValue: `${tungsten.toFixed(6)} mg/m³`
        },
        bandTelemetry,
        metrics: [
          { label: 'Rank (n)', value: rank.toLocaleString() },
          { label: 'Appearance (M)', value: formatNumber(m, 2) },
          { label: 'Surname P', value: formatNumber(p, 3) },
          { label: 'Tungsten', value: `${tungsten.toFixed(6)} mg/m³` },
          { label: 'M Band Length', value: formatDistanceMeters(bands.m) },
          { label: 'Year', value: manualRank ? 'Manual rank mode' : String(year || years[0]) },
          { label: 'Dataset', value: getSelectedLabel(countryCode) }
        ],
        nameValue: enteredName,
        lines: [
          `Base B = 7.25n + 32 = ${formatNumber(b, 3)}`,
          `Appearance A = 0.8 + 0.04m = ${formatNumber(a, 4)}`,
          `Last-name L(P) = ${formatNumber(l, 4)}`,
          `T(CLT) = 0.55 × (CLT^1.09 / (CLT^1.09 + 1737^1.09)) = ${tungsten.toFixed(6)} mg/m³`,
          `Band lengths: NS ${formatDistanceMeters(bands.ns)} · CE ${formatDistanceMeters(bands.ce)} · E ${formatDistanceMeters(bands.e)} · M ${formatDistanceMeters(bands.m)} · PS ${formatDistanceMeters(bands.ps)} · MS ${formatDistanceMeters(bands.ms)} · MP ${formatDistanceMeters(bands.mp)} · MH ${formatDistanceMeters(bands.mh)}`,
          manualRank ? 'Rank source: Manual input' : `Rank source: ${getSelectedLabel(countryCode)} dataset`,
          'Final formula: CLT = B × A × L'
        ]
      });
    } catch (error) {
      renderResult({
        status: 'error',
        title: 'Calculation failed',
        lines: [`Unable to compute CLT from local rank/modifier data (${String(error?.message || 'unknown error')}).`]
      });
    } finally {
      if (el.calculate) el.calculate.disabled = false;
    }
  }

  el.rankToggle?.addEventListener('click', () => {
    const pressed = el.rankToggle?.getAttribute('aria-pressed') === 'true';
    if (el.rankToggle) el.rankToggle.setAttribute('aria-pressed', String(!pressed));
    syncRankModeUi();
  });

  el.surnameToggle?.addEventListener('click', () => {
    const pressed = el.surnameToggle?.getAttribute('aria-pressed') === 'true';
    if (el.surnameToggle) el.surnameToggle.setAttribute('aria-pressed', String(!pressed));
    syncSurnameModeUi();
  });

  syncRankModeUi();
  syncSurnameModeUi();
  el.calculate?.addEventListener('click', calculate);
  [el.name, el.year, el.rank, el.appearance, el.surnameP1, el.surnameP2].forEach((inputEl) => {
    inputEl?.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        calculate();
      }
    });
  });
}

initFieldCalculator();

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
