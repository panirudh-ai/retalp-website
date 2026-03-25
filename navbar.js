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
      position: fixed; top: 24px; left: 50%; transform: translateX(-50%);
      z-index: 1000; display: flex; align-items: center; gap: 6px;
      padding: 8px 10px 8px 16px;
      background: rgba(10,10,10,0.92);
      backdrop-filter: blur(24px) saturate(180%);
      -webkit-backdrop-filter: blur(24px) saturate(180%);
      border: 1px solid rgba(61,184,112,0.25); border-radius: 100px;
      box-shadow: 0 4px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(61,184,112,0.08) inset;
      transition: all .35s cubic-bezier(.4,0,.2,1); white-space: nowrap;
    }

    /* ── Light mode: floating over a light section ── */
    .nav-island.nav-light-bg {
      background: rgba(255,255,255,0.94);
      border-color: rgba(0,0,0,0.1);
      box-shadow: 0 2px 20px rgba(0,0,0,0.1);
    }
    .nav-island.nav-light-bg .nav-logo-text { color: #0a0a0a; }
    .nav-island.nav-light-bg .nav-logo-text span { color: #059669; }
    .nav-island.nav-light-bg .nav-sep { background: rgba(0,0,0,0.14); }
    .nav-island.nav-light-bg .nav-link { color: rgba(0,0,0,0.52); }
    .nav-island.nav-light-bg .nav-link:hover { color: #0a0a0a; }
    .nav-island.nav-light-bg .nav-link.active { color: #0a0a0a; }
    .nav-island.nav-light-bg .nav-cta { background: #059669; color: #ffffff; border: 1.5px solid #059669; }
    .nav-island.nav-light-bg .nav-cta:hover { background: #047857; color: #ffffff; box-shadow: 0 4px 20px rgba(5,150,105,0.35); }
    .nav-logo-pill { display: flex; align-items: center; gap: 8px; text-decoration: none; margin-right: 8px; cursor: pointer; background: none; border: none; }
    .nav-logo-mark { width: 28px; height: 28px; background: transparent; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .nav-logo-mark img { width: 20px; height: 20px; object-fit: contain; }
    .nav-logo-text { font-family: 'Instrument Sans', sans-serif; font-weight: 700; font-size: 1rem; letter-spacing: -0.02em; color: #ffffff; }
    .nav-logo-text span { color: #10b981; }
    .nav-sep { width: 1px; height: 18px; background: rgba(255,255,255,0.15); margin: 0 4px; }
    .nav-link {
      position: relative; display: flex; flex-direction: column; align-items: center; gap: 3px;
      padding: 6px 14px; font-size: 0.82rem; font-weight: 500; font-family: 'Instrument Sans', sans-serif;
      color: rgba(255,255,255,0.6); text-decoration: none; border-radius: 100px; transition: color 0.2s;
      cursor: pointer; background: none; border: none;
    }
    .nav-link::before {
      content: ""; position: absolute; top: 3px; left: 50%; width: 5px; height: 5px;
      background: #10b981; border-radius: 50%; opacity: 0;
      transition: opacity .2s cubic-bezier(.4,0,.2,1), transform .2s cubic-bezier(.34,1.56,.64,1);
      transform: translateX(-50%) translateY(2px) scale(0);
    }
    .nav-link:hover { color: #ffffff; }
    .nav-link:hover::before { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
    .nav-link.active { color: #ffffff; }
    .nav-link.active::before { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
    .nav-cta {
      display: flex; align-items: center; gap: 8px; padding: 10px 22px;
      background: #ffffff; color: #059669; font-size: 0.85rem; font-weight: 600; font-family: 'Instrument Sans', sans-serif;
      border-radius: 100px; border: 1.5px solid #059669; cursor: pointer; text-decoration: none;
      transition: all .25s cubic-bezier(.4,0,.2,1);
    }
    .nav-cta:hover { background: #059669; color: #ffffff; box-shadow: rgba(61,184,112,0.35) 0 0 28px 4px; transform: scale(1.04); }
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
    <a href="retalp_about.html" class="nav-link" data-nav="about">About</a>
    <a href="retalp_process.html" class="nav-link" data-nav="process">Process</a>
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
    'retalp_about.html': 'about',
    'retalp_process.html': 'process',
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
