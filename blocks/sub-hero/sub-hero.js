/**
 * Decorates the sub-hero block.
 *
 * Authored table structure (Google Docs):
 *   Row 1 | background picture                              |
 *   Row 2 | (empty placeholder) | icon img + link + supporting text |
 *
 * For left-aligned variant swap cols in Row 2:
 *   Row 2 | icon img + link + supporting text | (empty placeholder) |
 *
 * @param {Element} block The sub-hero block element
 */
export default function decorate(block) {
  const [bgRow, contentRow] = [...block.children];

  // ── Background image → inline CSS background-image ───────────────────────
  const bgImg = bgRow?.querySelector('img');
  if (bgImg) block.style.backgroundImage = `url(${bgImg.src})`;
  bgRow?.remove();

  // ── Determine alignment (left vs right) from which col has content ────────
  const cols = [...(contentRow?.children || [])];
  const contentColIdx = cols.findIndex((col) => col.children.length > 0);
  if (contentColIdx === 0) block.classList.add('sub-hero-left');
  const contentCol = cols[contentColIdx];

  // ── Build inner layout: 1000px row with placeholder + content ────────────
  const row = document.createElement('div');
  row.className = 'sub-hero-row';

  const placeholder = document.createElement('div');
  placeholder.className = 'sub-hero-placeholder';

  const content = document.createElement('div');
  content.className = 'sub-hero-content';

  if (contentCol) {
    const iconPicture = contentCol.querySelector('picture');
    const ctaLink = contentCol.querySelector('a');
    const supportingPara = [...contentCol.querySelectorAll('p')].find((p) => !p.querySelector('a'));

    if (ctaLink) {
      ctaLink.classList.add('sub-hero-btn');
      if (iconPicture) ctaLink.prepend(iconPicture);
      const btnWrap = document.createElement('p');
      btnWrap.append(ctaLink);
      content.append(btnWrap);
    }

    if (supportingPara) {
      const suppDiv = document.createElement('div');
      suppDiv.className = 'sub-hero-supporting';
      suppDiv.append(supportingPara);
      content.append(suppDiv);
    }
  }

  if (block.classList.contains('sub-hero-left')) {
    row.append(content, placeholder);
  } else {
    row.append(placeholder, content);
  }

  block.replaceChildren(row);
}
