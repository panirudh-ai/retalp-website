(function () {
  /* ── Shared footer CSS ── */
  const style = document.createElement('style');
  style.textContent = `
    .site-footer {
      background: #0f172a;
      color: #ffffff;
      padding: 48px 0 28px;
      border-top: 1px solid rgba(255,255,255,0.06);
    }
    .site-footer .wrap {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 32px;
    }
    .site-footer .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 40px;
      margin-bottom: 36px;
    }
    .site-footer .footer-brand-logo {
      display: flex;
      align-items: center;
      gap: 8px;
      text-decoration: none;
      margin-bottom: 12px;
    }
    .site-footer .footer-brand-logo .nav-logo-mark {
      width: 28px;
      height: 28px;
      background: transparent;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .site-footer .footer-brand-logo .nav-logo-mark img {
      width: 20px;
      height: 20px;
      object-fit: contain;
    }
    .site-footer .footer-brand-logo .nav-logo-text {
      font-family: var(--sans, 'Inter', sans-serif);
      font-weight: 700;
      font-size: 1rem;
      letter-spacing: -0.02em;
      color: #ffffff;
    }
    .site-footer .footer-brand-logo .nav-logo-text span { color: #10b981; }
    .site-footer .footer-tagline {
      color: rgba(255,255,255,0.45);
      font-size: 0.83rem;
      line-height: 1.55;
      margin: 0 0 6px;
    }
    .site-footer .footer-tagline-highlight {
      color: #10b981;
      font-size: 0.8rem;
      font-weight: 600;
    }
    .site-footer .footer-col-title {
      color: rgba(255,255,255,0.35);
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 14px;
    }
    .site-footer .footer-links {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .site-footer .footer-links a {
      color: rgba(255,255,255,0.5);
      text-decoration: none;
      font-size: 0.85rem;
      transition: color 0.2s;
    }
    .site-footer .footer-links a:hover { color: #10b981; }
    .site-footer .footer-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 24px;
      border-top: 1px solid rgba(255,255,255,0.06);
    }
    .site-footer .footer-copy {
      color: rgba(255,255,255,0.28);
      font-size: 0.78rem;
    }
    .site-footer .footer-status {
      display: flex;
      align-items: center;
      gap: 8px;
      color: rgba(255,255,255,0.45);
      font-size: 0.78rem;
    }
    .site-footer .footer-status-dot {
      width: 7px;
      height: 7px;
      background: #10b981;
      border-radius: 50%;
      animation: footerPulse 2s ease-in-out infinite;
    }
    @keyframes footerPulse {
      0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(16,185,129,0.4); }
      50% { opacity: 0.8; box-shadow: 0 0 0 4px rgba(16,185,129,0); }
    }
    @media (max-width: 768px) {
      .site-footer .footer-grid {
        grid-template-columns: 1fr 1fr;
        gap: 28px;
      }
      .site-footer .footer-grid > div:first-child {
        grid-column: 1 / -1;
      }
    }
    @media (max-width: 480px) {
      .site-footer .footer-grid { grid-template-columns: 1fr; }
      .site-footer .footer-grid > div:first-child { grid-column: auto; }
      .site-footer .footer-bottom { flex-direction: column; gap: 10px; text-align: center; }
      .site-footer .wrap { padding: 0 20px; }
    }
  `;
  document.head.appendChild(style);

  /* ── Footer HTML ── */
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = `
    <div class="wrap">
      <div class="footer-grid">
        <div>
          <a href="index3.html" class="footer-brand-logo">
            <div class="nav-logo-mark">
              <img src="favicon.ico" alt="Retalp">
            </div>
            <span class="nav-logo-text">Retal<span>p</span></span>
          </a>
          <p class="footer-tagline">Your business, your data, your reports.</p>
          <span class="footer-tagline-highlight">Zero Waste Intelligence Platform.</span>
        </div>
        <div>
          <div class="footer-col-title">Platform</div>
          <ul class="footer-links">
            <li><a href="index3.html#e3-engine">What is E³</a></li>
            <li><a href="retalp_capabilities.html">Capabilities</a></li>
            <li><a href="index3.html#impact">Results</a></li>
            <li><a href="index3.html#pilot">Start a Pilot</a></li>
          </ul>
        </div>
        <div>
          <div class="footer-col-title">Operations</div>
          <ul class="footer-links">
            <li><a href="index3.html">Inventory Intel</a></li>
            <li><a href="index3.html">Production Planning</a></li>
            <li><a href="index3.html">Supply Chain</a></li>
            <li><a href="index3.html">Sales Analytics</a></li>
          </ul>
        </div>
        <div>
          <div class="footer-col-title">Company</div>
          <ul class="footer-links">
            <li><a href="index3.html">About</a></li>
            <li><a href="index3.html">Industries</a></li>
            <li><a href="index3.html">Contact</a></li>
            <li><a href="index3.html">Privacy</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-copy">© 2026 Retalp. All rights reserved.</div>
        <div class="footer-status">
          <span class="footer-status-dot"></span>
          E³ System Online
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(footer);
})();
