/**
 * Loads and decorates the sticky site header.
 *
 * Nav content is built directly (no CMS fragment required).
 *
 * Scroll behaviour: adds .scrolled to .nav-wrapper when page scrollY > 80px,
 * which hides the CTA button and reveals the site-title text.
 *
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  block.textContent = '';

  const nav = document.createElement('nav');
  nav.id = 'nav';

  // ── Brand: CTA pill (initial) + title text (scrolled) ────────────────────
  const navBrand = document.createElement('div');
  navBrand.className = 'nav-brand';

  const ctaBtn = document.createElement('a');
  ctaBtn.className = 'nav-cta-btn';
  ctaBtn.href = '#resources';

  const ctaIcon = document.createElement('img');
  ctaIcon.src = '/media/header-main-icon.png';
  ctaIcon.alt = '';
  ctaIcon.width = 16;
  ctaIcon.height = 16;
  ctaBtn.append(ctaIcon);

  const ctaLabel = document.createElement('span');
  ctaLabel.textContent = 'DOWNLOAD THE FULL LGR5 STORY';
  ctaBtn.append(ctaLabel);

  const title = document.createElement('span');
  title.className = 'nav-title';
  title.innerHTML = 'IS <strong>LGR5</strong> CANCER\'S WILD CARD?';

  navBrand.append(ctaBtn, title);

  // ── Sections: centre nav links with › separator ───────────────────────────
  const navSections = document.createElement('div');
  navSections.className = 'nav-sections';

  const ul = document.createElement('ul');
  const links = [
    { label: 'Home', href: '/' },
    { label: 'Wild Card Story', href: '/#battle' },
    { label: 'Resources', href: '/#resources' },
  ];

  links.forEach((item, i) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = item.href;
    a.textContent = item.label;
    li.append(a);
    ul.append(li);

    if (i === 0) {
      const sep = document.createElement('li');
      sep.className = 'nav-separator';
      sep.setAttribute('aria-hidden', 'true');
      sep.textContent = '›';
      ul.append(sep);
    }
  });

  navSections.append(ul);

  // ── Tools: register CTA ───────────────────────────────────────────────────
  const navTools = document.createElement('div');
  navTools.className = 'nav-tools';

  const registerBtn = document.createElement('a');
  registerBtn.className = 'nav-register-btn';
  registerBtn.href = '#register';

  const registerIcon = document.createElement('img');
  registerIcon.src = '/media/header-secondary-icon.png';
  registerIcon.alt = '';
  registerIcon.width = 14;
  registerIcon.height = 14;
  registerBtn.append(registerIcon);

  const registerLabel = document.createElement('span');
  registerLabel.textContent = 'Register to stay informed';
  registerBtn.append(registerLabel);

  navTools.append(registerBtn);

  // ── Assemble & scroll behaviour ───────────────────────────────────────────
  nav.append(navBrand, navSections, navTools);

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);

  window.addEventListener('scroll', () => {
    navWrapper.classList.toggle('scrolled', window.scrollY > 80);
  }, { passive: true });
}
