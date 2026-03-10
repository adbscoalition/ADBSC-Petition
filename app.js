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
    { name: '????', lat: 49.2729341959022, lon: -123.06941193669999 },
    { name: 'Charlotte, MI', lat: 42.56318196348821, lon: -84.83584647437215 },
    { name: 'Haida Gwaii Islands', lat: 53.255510249854304, lon: -132.08947116604432 },
    { name: 'Charlotte Amalie, USVI', lat: 18.34185490966226, lon: -64.9316281681369 },
    { name: 'Port Charlotte, FL', lat: 27.010523765938274, lon: -82.14259591632731 },
    { name: 'Charlottetown, PEI', lat: 46.23722371252871, lon: -63.12970137942366 },
    { name: 'THE GODLY CHARLOTTE', lat: 49.27295878743672, lon: -123.06939862529713 },
    { name: 'Charlottesville, VA', lat: 38.0292848205594, lon: -78.47616344837674 },
    { name: 'Queen Charlotte Burial Place', lat: 51.4836838439432, lon: -0.60668429494321 },
    { name: 'Geolocation Denied Fallback', lat: 84.99999991933562, lon: -110.97606616281583 }
  ];

  const magneticSources = [
    { name: 'Charlotte, NC', category: 'Regular', lat: 35.22867647481079, lon: -80.84490976473366, bands: [[0, 10, 1000, 1000], [10, 100, 1000, 200], [100, 200, 200, 50], [200, 400, 50, 10], [400, 1000, 10, 0]] },
    { name: '????', category: 'Secret', lat: 49.2729341959022, lon: -123.06941193669999, bands: [[0, 0.01, 15000, 15000], [0.01, 0.1, 15000, 500], [0.1, 1, 500, 20], [1, 5, 20, 0]] },
    { name: 'Charlotte, MI', category: 'Regular', lat: 42.56318196348821, lon: -84.83584647437215, bands: [[0, 2, 575, 575], [2, 10, 575, 200], [10, 40, 200, 30], [40, 120, 30, 0]] },
    { name: 'Haida Gwaii Islands', category: 'Regular', lat: 53.255510249854304, lon: -132.08947116604432, bands: [[0, 200, 230, 230], [200, 350, 230, 20], [350, 450, 20, 0]] },
    { name: 'Charlotte Amalie, USVI', category: 'Regular', lat: 18.34185490966226, lon: -64.9316281681369, bands: [[0, 1, 300, 300], [1, 10, 300, 100], [10, 25, 100, 20], [25, 40, 20, 0]] },
    { name: 'Port Charlotte, FL', category: 'Regular', lat: 27.010523765938274, lon: -82.14259591632731, bands: [[0, 3, 400, 400], [3, 10, 400, 100], [10, 30, 100, 12], [30, 100, 12, 0]] },
    { name: 'Charlottetown, PEI', category: 'Regular', lat: 46.23722371252871, lon: -63.12970137942366, bands: [[0, 2, 350, 350], [2, 8, 350, 100], [8, 24, 100, 25], [24, 128, 25, 0]] },
    { name: 'Charlottesville, VA', category: 'Regular', lat: 38.0292848205594, lon: -78.47616344837674, bands: [[0, 3, 450, 450], [3, 30, 450, 200], [30, 120, 200, 20], [120, 360, 20, 0]] },
    { name: 'Queen Charlotte Burial Place', category: 'Secret', lat: 51.4836838439432, lon: -0.60668429494321, bands: [[0, 0.1, 14000, 14000], [0.1, 1, 14000, 3000], [1, 3, 3000, 900], [3, 14, 900, 200], [14, 50, 200, 40], [50, 250, 40, 0]] },
    { name: 'THE GODLY CHARLOTTE', category: 'Secret', lat: 49.27295878743672, lon: -123.06939862529713, bands: [[0, 0.001, 300000, 300000], [0.001, 0.01, 300000, 1], [0.01, 0.015, 1, 0]] }
  ];

  const state = {
    watchId: null,
    driftTick: null,
    scanTimer: null,
    liveMode: false,
    lastBase: null,
    cltDrift: 0,
    tungstenDrift: 0,
    history: [],
    simulationActive: false,
    customFields: [],
    editingFieldId: null,
    autoFieldCounter: 1,
    simulatorUnlocked: false,
    unitSystem: 'metric'
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
    fieldDayToggles: Array.from(document.querySelectorAll('.field-day-toggle'))
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
    if (rawStrength <= 1000) return rawStrength;
    return 1000 + Math.pow(rawStrength - 1000, 0.62) * 8;
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
      const intensity = Math.min(50000, Math.max(1, Number(el.fieldIntensity?.value || 0)));
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
      const strength = customFieldStrength(field, distanceM, nowMs);
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

  function getSourceDisplayName(source, cltValue) {
    if (source.category === 'Secret' && Number(cltValue) < 100) return 'Unknown Source';
    return source.name || 'Unknown Source';
  }

  function renderContributionTables(calc, liveClt, liveTungsten) {
    const cltBody = el.cltContributionTable?.querySelector('tbody');
    const tungstenBody = el.tungstenContributionTable?.querySelector('tbody');
    if (!cltBody || !tungstenBody) return;

    if (!calc) {
      cltBody.innerHTML = '<tr><td>None</td><td>0.00</td></tr>';
      tungstenBody.innerHTML = '<tr><td>None</td><td>0.000000</td></tr>';
      return;
    }

    const evaluations = Array.isArray(calc.evaluations) ? calc.evaluations : [];
    const cltScale = calc.totalField > 0 ? liveClt / calc.totalField : 0;
    const cltRows = evaluations
      .map((source) => ({ source, value: Math.max(0, source.strength * cltScale) }))
      .filter((row) => row.value > 0.00001)
      .sort((a, b) => b.value - a.value);

    const sourceKey = (source) => `${source.name}|${source.lat}|${source.lon}|${source.category}`;
    const liveCltByKey = new Map(cltRows.map((row) => [sourceKey(row.source), row.value]));

    if (!cltRows.length) {
      cltBody.innerHTML = '<tr><td>None</td><td>0.00</td></tr>';
    } else {
      cltBody.innerHTML = cltRows.map((row) => {
        const name = getSourceDisplayName(row.source, row.value);
        return `<tr><td>${name}</td><td>${row.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td></tr>`;
      }).join('');
    }

    const liveTungstenScale = calc.tungstenBase > 0 ? liveTungsten / calc.tungstenBase : 0;
    const liveRegular = Math.max(0, (calc.tungstenRegular || 0) * liveTungstenScale);
    const liveSecret = Math.max(0, (calc.tungstenSecret || 0) * liveTungstenScale);
    const liveAmbient = Math.max(0, (calc.tungstenAmbient || 0) * liveTungstenScale);

    const regularStrengthSum = evaluations.filter((s) => s.category !== 'Secret').reduce((sum, s) => sum + Math.max(0, s.strength), 0);
    const secretStrengthSum = evaluations.filter((s) => s.category === 'Secret').reduce((sum, s) => sum + Math.max(0, s.strength), 0);

    const tungstenRows = [];
    evaluations.forEach((source) => {
      const strength = Math.max(0, source.strength);
      let value = 0;
      if (source.category === 'Secret') {
        value = secretStrengthSum > 0 ? liveSecret * (strength / secretStrengthSum) : 0;
      } else {
        value = regularStrengthSum > 0 ? liveRegular * (strength / regularStrengthSum) : 0;
      }
      if (value > 0.0000000001) tungstenRows.push({ source, value });
    });

    if (liveAmbient > 0) {
      tungstenRows.push({ source: { name: 'Ambient Baseline', category: 'Regular', lat: 0, lon: 0 }, value: liveAmbient });
    }

    tungstenRows.sort((a, b) => b.value - a.value);

    if (!tungstenRows.length) {
      tungstenBody.innerHTML = '<tr><td>None</td><td>0.000000</td></tr>';
    } else {
      tungstenBody.innerHTML = tungstenRows.map((row) => {
        const name = row.source.name === 'Ambient Baseline'
          ? row.source.name
          : getSourceDisplayName(row.source, liveCltByKey.get(sourceKey(row.source)) || 0);
        return `<tr><td>${name}</td><td>${row.value.toFixed(6)}</td></tr>`;
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
      return `${item.time} | ${item.clt.toLocaleString(undefined, { maximumFractionDigits: 2 })} CLT | ` +
        `Tungsten ${item.tungsten.toFixed(5)} mg/m³ | Nearest GEO ${geoLabel} | Nearest IDVL ${idvlLabel}`;
    }).join('\n');
  }

  function renderLiveTelemetry(lat, lon, accuracy, calc) {
    state.cltDrift = smoothDrift(state.cltDrift, 0.05);
    state.tungstenDrift = smoothDrift(state.tungstenDrift, 0.20);

    const liveClt = Math.max(0, calc.totalField * (1 + state.cltDrift));
    const liveTungsten = Math.max(0, calc.tungstenBase * (1 + state.tungstenDrift));

    state.lastBase = { lat, lon, accuracy, calc, liveClt, liveTungsten, timestamp: Date.now() };

    if (el.totalField) el.totalField.textContent = liveClt.toLocaleString(undefined, { maximumFractionDigits: 2 });
    if (el.tungsten) el.tungsten.textContent = `${liveTungsten.toFixed(5)} mg/m³`;
    if (el.geoDistance) {
      el.geoDistance.textContent = calc.nearestGeo ? formatDistancePrimary(calc.nearestGeo.distance) : formatDistancePrimary(NaN);
    }
    if (el.geoName) {
      el.geoName.textContent = calc.nearestGeo ? calc.nearestGeo.name : '—';
    }
    if (el.uploadedDistance) {
      el.uploadedDistance.textContent = calc.nearestUploaded ? formatDistancePrimary(calc.nearestUploaded.distance) : formatDistancePrimary(NaN);
    }
    if (el.nearestSource) {
      el.nearestSource.textContent = calc.nearestUploaded ? calc.nearestUploaded.name : 'none';
    }
    if (el.gpsAccuracy) {
      const meters = Number(accuracy);
      el.gpsAccuracy.textContent = Number.isFinite(meters)
        ? `${meters.toFixed(1)} m`
        : '—';
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
      nearestIdvlDistanceKm: calc.nearestUploaded ? calc.nearestUploaded.distance : NaN
    });
    state.history = state.history.slice(0, 50);
    renderHistory();
    renderContributionTables(calc, liveClt, liveTungsten);

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
      `Distance to Source: ${formatDistanceShort(result.distanceKm)}`
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
    if (el.simStatus) el.simStatus.textContent = 'Simulator unlocked. Enter teleport coordinates.';
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
      renderContributionTables(calc, state.lastBase.liveClt, state.lastBase.liveTungsten);
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
