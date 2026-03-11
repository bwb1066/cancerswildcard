/**
 * Decorates the image-toggle block.
 *
 * Authored table structure (Google Docs):
 *   Row 1 | label A text | label B text |
 *   Row 2 | image A (desktop) | image B (desktop) |
 *   Row 3 | image A (mobile)  | image B (mobile)  |  ← optional
 *
 * Renders a sliding switch toggle above stacked/crossfading images.
 * The inactive image fades to ~30% opacity rather than hiding completely.
 *
 * @param {Element} block The image-toggle block element
 */
export default function decorate(block) {
  const rows = [...block.children];
  const labelsRow = rows[0];
  const desktopRow = rows[1];
  const mobileRow = rows[2];

  const labelAHTML = labelsRow?.children[0]?.querySelector('p')?.innerHTML.trim() || 'State A';
  const labelBHTML = labelsRow?.children[1]?.querySelector('p')?.innerHTML.trim() || 'State B';

  const imgDesktopA = desktopRow?.children[0]?.querySelector('picture, img');
  const imgDesktopB = desktopRow?.children[1]?.querySelector('picture, img');
  const imgMobileA = mobileRow?.children[0]?.querySelector('picture, img');
  const imgMobileB = mobileRow?.children[1]?.querySelector('picture, img');

  // ── Image panels ─────────────────────────────────────────────────────────
  const frameA = document.createElement('div');
  frameA.className = 'image-toggle-frame active';
  if (imgDesktopA) frameA.append(imgDesktopA);

  const frameB = document.createElement('div');
  frameB.className = 'image-toggle-frame';
  if (imgDesktopB) frameB.append(imgDesktopB);

  // Mobile variants (hidden on desktop via CSS)
  if (imgMobileA) {
    imgMobileA.classList.add('image-toggle-mobile');
    frameA.append(imgMobileA);
  }
  if (imgMobileB) {
    imgMobileB.classList.add('image-toggle-mobile');
    frameB.append(imgMobileB);
  }

  // ── Sliding switch ───────────────────────────────────────────────────────
  const labelSpanA = document.createElement('span');
  labelSpanA.className = 'image-toggle-label image-toggle-label-a';
  labelSpanA.innerHTML = labelAHTML;

  const labelSpanB = document.createElement('span');
  labelSpanB.className = 'image-toggle-label image-toggle-label-b';
  labelSpanB.innerHTML = labelBHTML;

  const switchBtn = document.createElement('button');
  switchBtn.type = 'button';
  switchBtn.className = 'image-toggle-switch';
  switchBtn.setAttribute('role', 'switch');
  switchBtn.setAttribute('aria-checked', 'false'); // false = A (left/navy), true = B (right/red)
  switchBtn.setAttribute('aria-label', `Toggle between ${labelSpanA.textContent} and ${labelSpanB.textContent}`);

  const thumb = document.createElement('span');
  thumb.className = 'image-toggle-thumb';
  thumb.setAttribute('aria-hidden', 'true');
  switchBtn.append(thumb);

  const control = document.createElement('div');
  control.className = 'image-toggle-control';
  control.append(labelSpanA, switchBtn, labelSpanB);

  // ── Viewer (stacked frames) ───────────────────────────────────────────────
  const viewer = document.createElement('div');
  viewer.className = 'image-toggle-viewer';
  viewer.append(frameA, frameB);

  // ── Interaction ──────────────────────────────────────────────────────────
  function switchTo(toB) {
    switchBtn.setAttribute('aria-checked', String(toB));
    frameA.classList.toggle('active', !toB);
    frameB.classList.toggle('active', toB);
  }

  switchBtn.addEventListener('click', () => switchTo(switchBtn.getAttribute('aria-checked') !== 'true'));
  labelSpanA.addEventListener('click', () => switchTo(false));
  labelSpanB.addEventListener('click', () => switchTo(true));

  block.replaceChildren(control, viewer);
}
