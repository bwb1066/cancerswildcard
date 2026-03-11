/**
 * Decorates the hero block.
 *
 * Authored table structure (Google Docs):
 *   Row 1 | background picture                          |
 *   Row 2 | empty placeholder | logo image              |
 *   Row 3 | card 1            | card 2      | card 3    |
 *
 * @param {Element} block The hero block element
 */
export default function decorate(block) {
  const [bgRow, contentRow, cardsRow] = [...block.children];

  // ── Background ──────────────────────────────────────────────────────────
  const bg = document.createElement('div');
  bg.className = 'hero-bg';
  const picture = bgRow?.children[0]?.querySelector('picture');
  if (picture) bg.append(picture);

  // ── Content row: empty left col + logo right col ─────────────────────────
  const content = document.createElement('div');
  content.className = 'hero-content';
  if (contentRow) {
    [...contentRow.children].forEach((col, i) => {
      const div = document.createElement('div');
      div.className = i === 0 ? 'hero-content-placeholder' : 'hero-content-logo';
      while (col.firstChild) div.append(col.firstChild);
      content.append(div);
    });
  }

  // ── Nav Cards ────────────────────────────────────────────────────────────
  const cards = document.createElement('div');
  cards.className = 'hero-cards';
  if (cardsRow) {
    [...cardsRow.children].forEach((col) => {
      const card = document.createElement('div');
      card.className = 'hero-card';
      while (col.firstChild) card.append(col.firstChild);
      cards.append(card);
    });
  }

  block.replaceChildren(bg, content, cards);
}
