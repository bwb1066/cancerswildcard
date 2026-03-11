/**
 * Decorates the battle-icons block.
 *
 * Authored table structure (Google Docs):
 *   Row 1 | top separator image           |   |   |
 *   Row 2 | icon 1 img + label | icon 2 img + label | icon 3 img + label |
 *   Row 3 | bottom separator image        |   |   |
 *
 * @param {Element} block The battle-icons block element
 */
export default function decorate(block) {
  const [topRow, iconsRow, bottomRow] = [...block.children];

  // ── Top separator ────────────────────────────────────────────────────────
  const topSep = document.createElement('div');
  topSep.className = 'battle-icons-separator';
  const topPicture = topRow?.children[0]?.querySelector('picture');
  if (topPicture) topSep.append(topPicture);

  // ── Icon grid ────────────────────────────────────────────────────────────
  const grid = document.createElement('div');
  grid.className = 'battle-icons-grid';
  [...(iconsRow?.children || [])].forEach((col) => {
    const item = document.createElement('div');
    item.className = 'battle-icons-item';
    while (col.firstChild) item.append(col.firstChild);
    grid.append(item);
  });

  // ── Bottom separator ─────────────────────────────────────────────────────
  const bottomSep = document.createElement('div');
  bottomSep.className = 'battle-icons-separator';
  const bottomPicture = bottomRow?.children[0]?.querySelector('picture');
  if (bottomPicture) bottomSep.append(bottomPicture);

  block.replaceChildren(topSep, grid, bottomSep);
}
