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
  else runMainLoader();
}

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
