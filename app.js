const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primaryNav');

if (navToggle && primaryNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.textContent = isOpen ? 'Close' : 'Menu';
  });

  primaryNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 900px)').matches) {
        primaryNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.textContent = 'Menu';
      }
    });
  });
}

const entryLoader = document.getElementById('entryLoader');

if (entryLoader) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const duration = reducedMotion ? 120 : 1500;

  function finalizeLoader() {
    entryLoader.classList.add('peak-flash');
    setTimeout(() => entryLoader.classList.remove('peak-flash'), reducedMotion ? 40 : 200);
    entryLoader.classList.add('loaded');
  }

  // CLT dual-meter loader (used on CLT Field page)
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
      { at: 0.12, label: '🔮 Charlotte presence detected.' },
      { at: 0.42, label: '⚡ Field intensity rising.' },
      { at: 0.72, label: '🩶 Atmospheric tungsten concentration increasing.' },
      { at: 0.95, label: '✅ Field synchronized.' }
    ];

    const start = performance.now();
    const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);

    function frame(now) {
      const t = Math.min((now - start) / duration, 1);
      const base = easeOutQuint(t);
      const jitterStrength = reducedMotion ? 0 : (1 - t) * 0.015;
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
      if (!reducedMotion) entryLoader.style.setProperty('--loader-glow', String(0.35 + signal * 0.65));

      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        cltValue.textContent = '1,000,000';
        tungstenValue.textContent = '0.99 mg/m³';
        loaderStatus.textContent = '✨ You are now within Charlotte range.';
        finalizeLoader();
      }
    }

    requestAnimationFrame(frame);
  }

  // Main page cosmic wake-up loader
  function runMainLoader() {
    const status = document.getElementById('mainLoaderStatus');
    const phases = [
      { at: 0.1, label: 'Waking the realm...' },
      { at: 0.35, label: '✨ Aligning celestial noise...' },
      { at: 0.65, label: '🧲 Home field ignition...' },
      { at: 0.92, label: '✅ Ocharlotted online.' }
    ];
    const start = performance.now();

    function frame(now) {
      const t = Math.min((now - start) / duration, 1);
      entryLoader.style.setProperty('--loader-glow', String(0.32 + t * 0.7));
      let label = phases[0].label;
      for (const p of phases) if (t >= p.at) label = p.label;
      if (status) status.textContent = label;

      if (t < 1) requestAnimationFrame(frame);
      else finalizeLoader();
    }

    requestAnimationFrame(frame);
  }

  // Portals page gateway-sync loader
  function runPortalsLoader() {
    const status = document.getElementById('portalLoaderStatus');
    const bar = document.getElementById('portalLoaderBar');
    const nodes = Array.from(document.querySelectorAll('.portal-loader-network span'));
    const phases = [
      { at: 0.1, label: 'Opening portal rings...' },
      { at: 0.35, label: 'Routing branching paths...' },
      { at: 0.66, label: 'Syncing chatbot realms...' },
      { at: 0.92, label: '✅ Gateways live.' }
    ];
    const start = performance.now();

    function frame(now) {
      const t = Math.min((now - start) / duration, 1);
      if (bar) bar.style.width = `${t * 100}%`;
      entryLoader.style.setProperty('--loader-glow', String(0.32 + t * 0.7));

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

  // Instructions page typed boot-message loader
  function runInstructionsLoader() {
    const status = document.getElementById('instructionsLoaderStatus');
    const typedLine = document.getElementById('typedLoaderLine');
    const target = 'Synchronizing assistant personality...';
    const start = performance.now();

    function frame(now) {
      const t = Math.min((now - start) / duration, 1);
      entryLoader.style.setProperty('--loader-glow', String(0.35 + t * 0.65));

      if (typedLine) {
        const count = Math.floor(target.length * t);
        typedLine.textContent = target.slice(0, count);
      }

      if (status) {
        status.textContent = t < 0.55
          ? 'Loading custom instructions...'
          : t < 0.9
            ? 'Injecting dramatic response style...'
            : '✅ Personality synchronized.';
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
      copyBtn.textContent = '✅ Copied';
      setTimeout(() => (copyBtn.textContent = '📋 Copy'), 1500);
    } catch {
      copyBtn.textContent = '📋 Copy failed';
      setTimeout(() => (copyBtn.textContent = '📋 Copy'), 1500);
    }
  });
}
