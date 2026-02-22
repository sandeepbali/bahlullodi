/* ============================================================
   BAHLUL LODI: THE UNTOLD HISTORY
   Shared Components — Header, Footer, Navigation
   ============================================================ */

// ============================================================
// Determine base path and language based on current page location
// ============================================================
const isHindi = window.location.pathname.includes('/hi/');

function getBasePath() {
  const path = window.location.pathname;
  if (isHindi) {
    if (path.includes('/pages/')) return '../';
    return './';
  }
  if (path.includes('/pages/')) return '../';
  return './';
}

function getLangSwitchHref() {
  const path = window.location.pathname;
  const filename = path.split('/').pop() || 'index.html';
  if (isHindi) {
    if (path.includes('/pages/')) return '../../pages/' + filename;
    return '../' + filename;
  } else {
    if (path.includes('/pages/')) return '../hi/pages/' + filename;
    return 'hi/' + filename;
  }
}

// ============================================================
// Navigation Component
// ============================================================
function renderNavigation() {
  const base = getBasePath();
  const nav = document.createElement('nav');
  nav.className = 'site-nav';
  nav.setAttribute('role', 'navigation');
  nav.setAttribute('aria-label', isHindi ? 'मुख्य नेविगेशन' : 'Main navigation');

  const labels = isHindi
    ? { home: 'होम', narrative: 'आधिकारिक कथा', timeline: 'समयरेखा', military: 'सैन्य अभियान', persecution: 'उत्पीड़न', cultural: 'सांस्कृतिक प्रभाव', quantified: 'आकलन', legacy: 'विरासत', sources: 'स्रोत', about: 'परिचय' }
    : { home: 'Home', narrative: 'Official Narrative', timeline: 'Timeline', military: 'Military Campaigns', persecution: 'Persecution', cultural: 'Cultural Impact', quantified: 'Quantified', legacy: 'Legacy', sources: 'Sources', about: 'About' };

  nav.innerHTML = `
    <div class="nav-container">
      <a href="${base}index.html" class="nav-logo" aria-label="${labels.home}">
        <span class="nav-logo-icon">🏛️</span>
        <span class="nav-logo-text"><span class="highlight">${isHindi ? 'बहलोल' : 'Bahlul'}</span> ${isHindi ? 'लोदी' : 'Lodi'}</span>
      </a>
      
      <div class="nav-links" id="navLinks">
        <a href="${base}index.html" class="nav-link">${labels.home}</a>
        <a href="${base}pages/official-narrative.html" class="nav-link">${labels.narrative}</a>
        <a href="${base}pages/timeline.html" class="nav-link">${labels.timeline}</a>
        <a href="${base}pages/military-campaigns.html" class="nav-link">${labels.military}</a>
        <a href="${base}pages/persecution.html" class="nav-link">${labels.persecution}</a>
        <a href="${base}pages/cultural-impact.html" class="nav-link">${labels.cultural}</a>
        <a href="${base}pages/quantified.html" class="nav-link">${labels.quantified}</a>
        <a href="${base}pages/legacy.html" class="nav-link">${labels.legacy}</a>
        <a href="${base}pages/sources.html" class="nav-link">${labels.sources}</a>
        <a href="${base}pages/about.html" class="nav-link">${labels.about}</a>
      </div>
      
      <div class="lang-switch" id="langSwitch">
        <a href="${getLangSwitchHref()}" class="lang-btn" id="langBtn" title="भाषा बदलें / Switch Language">
          <span class="lang-icon">🌐</span>
          <span class="lang-label" id="langLabel">${isHindi ? 'EN' : 'हिं'}</span>
        </a>
      </div>
      
      <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Toggle navigation menu" aria-expanded="false">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
    <div class="mobile-overlay" id="mobileOverlay"></div>
  `;

  document.body.insertBefore(nav, document.body.firstChild);
}

// ============================================================
// Reading Progress Bar
// ============================================================
function renderProgressBar() {
  const progress = document.createElement('div');
  progress.className = 'journey-progress';
  progress.innerHTML = '<div class="journey-progress-bar"></div>';
  document.body.insertBefore(progress, document.body.children[1]);
}

// ============================================================
// Footer Component
// ============================================================
function renderFooter() {
  const base = getBasePath();
  const footer = document.createElement('footer');
  footer.className = 'site-footer';

  footer.innerHTML = `
    <div class="footer-content">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="footer-logo">🏛️ ${isHindi ? 'बहलोल लोदी' : 'Bahlul Lodi'}</div>
          <p>${isHindi
      ? 'बहलोल लोदी के शासन और भारतीय सभ्यता, संस्कृति और विरासत पर उसके स्थायी प्रभाव के ऐतिहासिक रूप से दर्ज सत्य को उजागर करने के लिए समर्पित एक शैक्षिक संसाधन।'
      : 'An educational resource dedicated to uncovering the historically documented truth about Bahlul Lodi\'s reign and its lasting impact on Indian civilization, culture, and heritage.'}</p>
        </div>
        
        <div class="footer-section">
          <h4>${isHindi ? 'यात्रा' : 'The Journey'}</h4>
          <a href="${base}pages/official-narrative.html">${isHindi ? 'आधिकारिक कथा' : 'Official Narrative'}</a>
          <a href="${base}pages/timeline.html">${isHindi ? 'घटनाओं की समयरेखा' : 'Timeline of Events'}</a>
          <a href="${base}pages/military-campaigns.html">${isHindi ? 'सैन्य अभियान' : 'Military Campaigns'}</a>
          <a href="${base}pages/persecution.html">${isHindi ? 'धार्मिक उत्पीड़न' : 'Religious Persecution'}</a>
        </div>
        
        <div class="footer-section">
          <h4>${isHindi ? 'प्रभाव' : 'Impact'}</h4>
          <a href="${base}pages/cultural-impact.html">${isHindi ? 'सांस्कृतिक विनाश' : 'Cultural Destruction'}</a>
          <a href="${base}pages/quantified.html">${isHindi ? 'क्षति का आकलन' : 'Damage Quantified'}</a>
          <a href="${base}pages/legacy.html">${isHindi ? 'आधुनिक विरासत' : 'Modern Legacy'}</a>
        </div>
        
        <div class="footer-section">
          <h4>${isHindi ? 'संसाधन' : 'Resources'}</h4>
          <a href="${base}pages/sources.html">${isHindi ? 'प्राथमिक स्रोत' : 'Primary Sources'}</a>
          <a href="${base}pages/about.html">${isHindi ? 'परियोजना के बारे में' : 'About This Project'}</a>
          <a href="${base}pages/disclaimer.html">${isHindi ? 'अस्वीकरण' : 'Disclaimer'}</a>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} BahlulLodi.com — ${isHindi ? 'एक ' : 'A '}<a href="https://bharatfiles.com" target="_blank" rel="noopener" style="color:var(--saffron);text-decoration:none;">${isHindi ? 'भारत फाइल्स पहल' : 'Bharat Files Initiative'}</a>.</p>
        <p style="margin-top:var(--space-2);font-size:var(--text-xs);opacity:0.6;">${isHindi ? 'निर्मित और प्रबंधित: ' : 'Developed and managed by '}<a href="https://creaadesigns.com" target="_blank" rel="noopener" style="color:var(--gold);text-decoration:none;">Creea Designs</a></p>
        <p class="disclaimer">${isHindi
      ? 'यह वेबसाइट प्राथमिक इतिवृत्तों, पुरातात्विक सर्वेक्षणों और विद्वत् शोध से प्राप्त ऐतिहासिक रूप से दर्ज जानकारी प्रस्तुत करती है। सभी दावे उद्धृत संदर्भों पर आधारित हैं। यह एक शैक्षिक पहल है।'
      : 'This website presents historically documented information sourced from primary chronicles, archaeological surveys, and scholarly research. All claims are backed by cited references. This is an educational initiative.'}</p>
      </div>
    </div>
  `;

  document.body.appendChild(footer);
}

// ============================================================
// Lightbox Modal Component
// ============================================================
function renderLightbox() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <button class="modal-close" aria-label="Close modal">&times;</button>
    <div class="modal-content">
      <img src="" alt="" />
    </div>
  `;
  document.body.appendChild(modal);
}

// ============================================================
// Initialize All Shared Components
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  renderNavigation();
  renderProgressBar();
  renderFooter();
  renderLightbox();
});
