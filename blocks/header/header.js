import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Loads and decorates the sticky site header.
 *
 * Nav fragment structure (3 sections):
 *   Section 1 (nav-brand):    picture + download link + scrolled-title paragraph
 *   Section 2 (nav-sections): ul of nav links
 *   Section 3 (nav-tools):    picture + register link
 *
 * Scroll behaviour: adds .scrolled to .nav-wrapper when page scrollY > 80px,
 * which hides the CTA button and reveals the site-title text.
 *
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  if (!fragment) return;

  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  ['brand', 'sections', 'tools'].forEach((cls, i) => {
    if (nav.children[i]) nav.children[i].classList.add(`nav-${cls}`);
  });

  // ── Brand: CTA pill (initial) + title text (scrolled) ────────────────────
  const navBrand = nav.querySelector('.nav-brand');
  if (navBrand) {
    const icon = navBrand.querySelector('picture');
    const ctaLink = navBrand.querySelector('a');
    const titlePara = [...navBrand.querySelectorAll('p')].find((p) => !p.querySelector('a'));

    const ctaBtn = document.createElement('a');
    ctaBtn.className = 'nav-cta-btn';
    ctaBtn.href = ctaLink?.href || '#';
    if (icon) ctaBtn.append(icon);
    const label = document.createElement('span');
    label.textContent = (ctaLink?.textContent.trim() || 'Download the full LGR5 story').toUpperCase();
    ctaBtn.append(label);

    const title = document.createElement('span');
    title.className = 'nav-title';
    if (titlePara) title.innerHTML = titlePara.innerHTML;

    navBrand.replaceChildren(ctaBtn, title);
  }

  // ── Sections: insert › separator after first item ────────────────────────
  const navSections = nav.querySelector('.nav-sections');
  if (navSections) {
    const ul = navSections.querySelector('ul');
    const items = ul ? [...ul.children] : [];
    if (items.length > 1) {
      const sep = document.createElement('li');
      sep.className = 'nav-separator';
      sep.setAttribute('aria-hidden', 'true');
      sep.textContent = '›';
      items[0].after(sep);
    }
  }

  // ── Tools: wrap register link with its icon ───────────────────────────────
  const navTools = nav.querySelector('.nav-tools');
  if (navTools) {
    const icon = navTools.querySelector('picture');
    const link = navTools.querySelector('a');
    if (link) {
      link.classList.add('nav-register-btn');
      if (icon) link.prepend(icon);
    }
  }

  // ── Assemble & scroll behaviour ───────────────────────────────────────────
  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);

  window.addEventListener('scroll', () => {
    navWrapper.classList.toggle('scrolled', window.scrollY > 80);
  }, { passive: true });
}
