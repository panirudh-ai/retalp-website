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
      color: rgba(255,255,255,0.5);
      font-size: 0.95rem;
      font-weight: 400;
      line-height: 1.5;
      margin: 10px 0 6px;
      letter-spacing: 0.01em;
    }
    .site-footer .footer-tagline-highlight {
      display: block;
      color: #10b981;
      font-size: 1.15rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      line-height: 1.3;
      margin-top: 2px;
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

  /* ── Contact Modal CSS ── */
  const modalStyle = document.createElement('style');
  modalStyle.textContent = `
    .contact-modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.65);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s ease;
    }
    .contact-modal-overlay.open {
      opacity: 1;
      pointer-events: all;
    }
    .contact-modal {
      background: #0f172a;
      border: 1px solid rgba(16,185,129,0.2);
      border-radius: 24px;
      padding: 48px;
      max-width: 560px;
      width: 100%;
      position: relative;
      transform: translateY(24px) scale(0.97);
      transition: transform 0.28s cubic-bezier(.34,1.56,.64,1), opacity 0.25s ease;
      opacity: 0;
      box-shadow: 0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(16,185,129,0.08);
    }
    .contact-modal-overlay.open .contact-modal {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
    .contact-modal-close {
      position: absolute;
      top: 20px;
      right: 20px;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 8px;
      color: rgba(255,255,255,0.5);
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 1rem;
      line-height: 1;
      transition: all 0.2s;
    }
    .contact-modal-close:hover {
      background: rgba(255,255,255,0.1);
      color: #fff;
    }
    .contact-modal-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 4px 12px;
      background: rgba(16,185,129,0.1);
      border: 1px solid rgba(16,185,129,0.2);
      border-radius: 100px;
      font-family: 'DM Mono', monospace;
      font-size: 0.72rem;
      color: #10b981;
      letter-spacing: 0.06em;
      margin-bottom: 20px;
    }
    .contact-modal-eyebrow-dot {
      width: 6px;
      height: 6px;
      background: #10b981;
      border-radius: 50%;
      box-shadow: 0 0 6px #10b981;
      animation: footerPulse 2s ease-in-out infinite;
    }
    .contact-modal h2 {
      font-family: 'Instrument Sans', sans-serif;
      font-size: 1.75rem;
      font-weight: 700;
      letter-spacing: -0.03em;
      color: #fff;
      margin-bottom: 10px;
      line-height: 1.15;
    }
    .contact-modal h2 span { color: #10b981; }
    .contact-modal-sub {
      color: rgba(255,255,255,0.5);
      font-size: 0.9rem;
      line-height: 1.6;
      margin-bottom: 32px;
    }
    .contact-cta-box {
      background: linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(16,185,129,0.04) 100%);
      border: 1px solid rgba(16,185,129,0.18);
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 24px;
    }
    .contact-cta-box-label {
      font-family: 'DM Mono', monospace;
      font-size: 0.7rem;
      color: rgba(255,255,255,0.35);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 6px;
    }
    .contact-cta-box-email {
      font-size: 1rem;
      font-weight: 600;
      color: #10b981;
      text-decoration: none;
      display: block;
      margin-bottom: 4px;
      transition: color 0.2s;
    }
    .contact-cta-box-email:hover { color: #34d399; }
    .contact-cta-box-note {
      font-size: 0.78rem;
      color: rgba(255,255,255,0.35);
    }
    .contact-modal-actions {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .contact-btn-primary {
      flex: 1;
      min-width: 140px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 14px 24px;
      background: #059669;
      color: #fff;
      font-family: 'Instrument Sans', sans-serif;
      font-size: 0.9rem;
      font-weight: 600;
      border-radius: 12px;
      border: none;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.22s ease;
      box-shadow: 0 4px 16px rgba(5,150,105,0.25);
    }
    .contact-btn-primary:hover {
      background: #047857;
      box-shadow: 0 6px 24px rgba(5,150,105,0.4);
      transform: translateY(-1px);
    }
    .contact-btn-secondary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 14px 24px;
      background: rgba(255,255,255,0.05);
      color: rgba(255,255,255,0.65);
      font-family: 'Instrument Sans', sans-serif;
      font-size: 0.9rem;
      font-weight: 500;
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,0.1);
      cursor: pointer;
      text-decoration: none;
      transition: all 0.22s ease;
    }
    .contact-btn-secondary:hover {
      background: rgba(255,255,255,0.09);
      color: #fff;
      border-color: rgba(255,255,255,0.2);
    }
    @media (max-width: 480px) {
      .contact-modal { padding: 32px 24px; }
      .contact-modal h2 { font-size: 1.4rem; }
      .contact-modal-actions { flex-direction: column; }
      .contact-btn-primary { flex: none; }
    }
  `;
  document.head.appendChild(modalStyle);

  /* ── Contact Modal HTML ── */
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'contact-modal-overlay';
  modalOverlay.id = 'contactModal';
  modalOverlay.innerHTML = `
    <div class="contact-modal" role="dialog" aria-modal="true" aria-labelledby="contactModalTitle">
      <button class="contact-modal-close" id="contactModalClose" aria-label="Close">&#x2715;</button>
      <div class="contact-modal-eyebrow">
        <span class="contact-modal-eyebrow-dot"></span>
        GET IN TOUCH
      </div>
      <h2 id="contactModalTitle">Let's build something<br><span>that actually works.</span></h2>
      <p class="contact-modal-sub">Tell us about your operations challenge and we'll show you exactly how Retalp's autonomous decision layer eliminates the friction.</p>
      <div class="contact-cta-box">
        <div class="contact-cta-box-label">Direct line</div>
        <a href="mailto:hello@retalp.com" class="contact-cta-box-email">hello@retalp.com</a>
        <div class="contact-cta-box-note">We respond within one business day.</div>
      </div>
      <div class="contact-modal-actions">
        <a href="mailto:hello@retalp.com?subject=Demo Request — Retalp" class="contact-btn-primary">
          &#x1F4C5; Book a Demo
        </a>
        <a href="mailto:hello@retalp.com" class="contact-btn-secondary">
          &#x2709;&#xFE0F; Send a Message
        </a>
      </div>
    </div>
  `;
  document.body.appendChild(modalOverlay);

  /* ── Modal open/close logic ── */
  function openContactModal() {
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeContactModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  document.getElementById('contactModalClose').addEventListener('click', closeContactModal);
  modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) closeContactModal();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeContactModal();
  });
  window.openContactModal = openContactModal;

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
          <p class="footer-tagline">Your data.</p>
          <span class="footer-tagline-highlight">Retalp E³ — AI that executes.</span>
        </div>
        <div>
          <div class="footer-col-title">Platform</div>
          <ul class="footer-links">
            <li><a href="index3.html">Retalp</a></li>
            <li><a href="retalpE3.html">Retalp E³</a></li>
            <li><a href="retalp_capabilities.html">Capabilities</a></li>
            <li><a href="retalp_about (1).html">About</a></li>
            <li><a href="retalp_process.html">Process</a></li>
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
            <li><a href="retalp_about (1).html">About</a></li>
            <li><a href="index3.html">Industries</a></li>
            <li><a href="#" onclick="openContactModal();return false;">Contact</a></li>
            <li><a href="privacy.html">Privacy</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-copy">© 2026 Retalp. All rights reserved.</div>
        <div class="footer-status">
          <span class="footer-status-dot"></span>
          Retalp E³ System Online
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(footer);
})();
