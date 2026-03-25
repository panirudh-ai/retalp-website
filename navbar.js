(function () {
  /* When loaded inside main.html's iframe — send theme to parent instead of building nav */
  if (window !== window.top) {
    function sendThemeToParent() {
      var navMid = 80;
      var sections = document.querySelectorAll('[data-theme]');
      for (var i = 0; i < sections.length; i++) {
        var rect = sections[i].getBoundingClientRect();
        if (rect.top <= navMid && rect.bottom >= navMid) {
          window.parent.postMessage({ retalpNavTheme: sections[i].dataset.theme }, '*');
          return;
        }
      }
      window.parent.postMessage({ retalpNavTheme: 'light' }, '*');
    }
    window.addEventListener('scroll', sendThemeToParent, { passive: true });
    setTimeout(sendThemeToParent, 300);
    return;
  }

  /* ── Shared nav CSS ── */
  const style = document.createElement('style');
  style.textContent = `
    .nav-island {
      position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
      z-index: 1000; display: flex; align-items: center; gap: 6px;
      padding: 6px 8px 6px 14px;
      background: rgba(10,10,10,0.92);
      backdrop-filter: blur(20px) saturate(160%);
      -webkit-backdrop-filter: blur(20px) saturate(160%);
      border: 1px solid rgba(16,185,129,0.35); border-radius: 100px;
      box-shadow: 0 2px 20px rgba(0,0,0,0.25), 0 0 0 3px rgba(16,185,129,0.06) inset;
      transition: all .35s cubic-bezier(.4,0,.2,1); white-space: nowrap;
    }
    .nav-island.scrolled {
      background: rgba(10,10,10,0.98); border-color: rgba(16,185,129,0.5);
      box-shadow: 0 4px 28px rgba(0,0,0,0.3), 0 0 0 3px rgba(16,185,129,0.08) inset;
    }

    /* ── Light mode: floating over a dark section ── */
    .nav-island.nav-light-bg {
      background: rgba(255,255,255,0.94);
      border-color: rgba(0,0,0,0.1);
      box-shadow: 0 2px 20px rgba(0,0,0,0.1), 0 0 0 3px rgba(16,185,129,0.04) inset;
    }
    .nav-island.nav-light-bg.scrolled {
      background: rgba(255,255,255,0.98);
      border-color: rgba(0,0,0,0.14);
      box-shadow: 0 4px 28px rgba(0,0,0,0.13);
    }
    .nav-island.nav-light-bg .nav-logo-text { color: #0a0a0a; }
    .nav-island.nav-light-bg .nav-logo-text span { color: #059669; }
    .nav-island.nav-light-bg .nav-sep { background: rgba(0,0,0,0.14); }
    .nav-island.nav-light-bg .nav-link { color: rgba(0,0,0,0.52); }
    .nav-island.nav-light-bg .nav-link:hover { color: #0a0a0a; }
    .nav-island.nav-light-bg .nav-link.active { color: #0a0a0a; }
    .nav-island.nav-light-bg .nav-cta { background: #059669; color: #ffffff; border: 1.5px solid #059669; }
    .nav-island.nav-light-bg .nav-cta:hover { background: #047857; color: #ffffff; box-shadow: 0 4px 20px rgba(5,150,105,0.35); }
    .nav-logo-pill { display: flex; align-items: center; gap: 8px; text-decoration: none; margin-right: 8px; }
    .nav-logo-mark { width: 28px; height: 28px; background: transparent; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .nav-logo-mark img { width: 20px; height: 20px; object-fit: contain; }
    .nav-logo-text { font-family: var(--sans, 'Inter', sans-serif); font-weight: 700; font-size: 1rem; letter-spacing: -0.02em; color: #ffffff; }
    .nav-logo-text span { color: #10b981; }
    .nav-sep { width: 1px; height: 18px; background: rgba(16,185,129,0.3); margin: 0 4px; }
    .nav-link {
      position: relative; display: flex; flex-direction: column; align-items: center; gap: 3px;
      padding: 6px 14px; font-size: 0.82rem; font-weight: 500;
      color: rgba(255,255,255,0.55); text-decoration: none; border-radius: 100px; transition: color 0.2s;
    }
    .nav-link::before {
      content: ""; position: absolute; top: 3px; left: 50%; width: 5px; height: 5px;
      background: #10b981; border-radius: 50%; opacity: 0;
      transition: opacity .2s cubic-bezier(.4,0,.2,1), transform .2s cubic-bezier(.34,1.56,.64,1);
      transform: translateX(-50%) translateY(2px) scale(0);
    }
    .nav-link:hover { color: #ffffff; }
    .nav-link:hover::before { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
    .nav-link.active { color: #ffffff; font-weight: 600; }
    .nav-link.active::before { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
    .nav-cta {
      display: flex; align-items: center; gap: 8px; padding: 9px 20px;
      background: #ffffff; color: #059669; font-size: 0.85rem; font-weight: 600;
      border-radius: 100px; border: 1.5px solid #059669; cursor: pointer; text-decoration: none;
      transition: all .25s cubic-bezier(.4,0,.2,1); box-shadow: 0 2px 12px rgba(0,0,0,0.2);
    }
    .nav-cta:hover { background: #059669; color: #ffffff; box-shadow: 0 4px 20px rgba(16,185,129,0.4); transform: scale(1.04); }
    .nav-cta svg { width: 14px; height: 14px; }
    @media (max-width: 768px) {
      .nav-island { left: 20px; right: 20px; transform: none; top: 16px; }
      .nav-link { display: none; }
    }
  `;
  document.head.appendChild(style);

  /* ── Nav HTML ── */
  const nav = document.createElement('nav');
  nav.className = 'nav-island';
  nav.id = 'navIsland';
  nav.innerHTML = `
    <a href="index3.html" class="nav-logo-pill">
      <div class="nav-logo-mark">
        <img src="favicon.ico" alt="Retalp">
      </div>
      <span class="nav-logo-text">Retal<span>p</span></span>
    </a>
    <div class="nav-sep"></div>
    <a href="retalpE3.html" class="nav-link" data-nav="retalpE3">Retalp E³</a>
    <a href="retalp_capabilities.html" class="nav-link" data-nav="capabilities">Capabilities</a>
    <a href="index3.html#impact" class="nav-link" data-nav="results">Results</a>
    <a href="index3.html#roadmap" class="nav-link" data-nav="process">Process</a>
    <a href="index3.html#pilot" class="nav-cta">
      Start a Pilot
      <svg viewBox="0 0 14 14" fill="none"><path d="M2 7h10m0 0L7 2m5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </a>
  `;
  document.body.insertBefore(nav, document.body.firstChild);

  /* ── Active tab based on current page ── */
  const page = location.pathname.split('/').pop() || 'index3.html';
  const activeMap = {
    'retalpE3.html': 'retalpE3',
    'retalp_capabilities.html': 'capabilities',
  };
  const activeKey = activeMap[page];
  if (activeKey) {
    const link = nav.querySelector('[data-nav="' + activeKey + '"]');
    if (link) link.classList.add('active');
  }

  /* ── Scroll: shadow + adaptive theme ── */
  function updateNavTheme() {
    var navMid = nav.getBoundingClientRect().bottom + 10;
    var sections = document.querySelectorAll('[data-theme]');
    for (var i = 0; i < sections.length; i++) {
      var rect = sections[i].getBoundingClientRect();
      if (rect.top <= navMid && rect.bottom >= navMid) {
        nav.classList.toggle('nav-light-bg', sections[i].dataset.theme === 'dark');
        return;
      }
    }
    nav.classList.remove('nav-light-bg');
  }

  let ticking = false;
  window.addEventListener('scroll', function() {
    nav.classList.toggle('scrolled', window.scrollY > 60);
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(function() { ticking = false; updateNavTheme(); });
    }
  }, { passive: true });

  window.addEventListener('resize', updateNavTheme, { passive: true });
  setTimeout(updateNavTheme, 100);
})();
