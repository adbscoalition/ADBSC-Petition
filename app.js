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
const cltValue = document.getElementById('cltValue');
const cltBar = document.getElementById('cltBar');
const tungstenValue = document.getElementById('tungstenValue');
const tungstenBar = document.getElementById('tungstenBar');
const loaderStatus = document.getElementById('loaderStatus');

if (entryLoader && cltValue && cltBar && tungstenValue && tungstenBar && loaderStatus) {
  // Premium startup sequence: dual meters with jitter + surge + settle in ~1.5s.
  function animateEntryLoader() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reducedMotion ? 120 : 1500;
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
        entryLoader.classList.add('peak-flash');
        setTimeout(() => entryLoader.classList.remove('peak-flash'), 220);
        setTimeout(() => entryLoader.classList.add('loaded'), reducedMotion ? 120 : 350);
      }
    }

    requestAnimationFrame(frame);
  }

  animateEntryLoader();
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
