// Product range from the build document (Sections 2 and 7).

export const freshFruits = [
  { slug: 'apples', name: 'Apples', line: 'Crisp, premium imported apples — the anchor of any wholesale fruit range.' },
  { slug: 'oranges', name: 'Oranges', line: 'Juicy premium oranges for wholesale and institutional demand across India.' },
  { slug: 'mandarins', name: 'Mandarins', line: 'Sweet, easy-peeling premium mandarins that complete a citrus range.' },
  { slug: 'kiwi', name: 'Kiwi', line: 'Premium imported kiwi, popular with retail and distributor buyers.' },
  { slug: 'dragon-fruit', name: 'Dragon Fruit', line: 'Vivid, exotic dragon fruit that gives any assortment a standout line.' },
  { slug: 'pears', name: 'Pears', line: 'Premium imported pears in a range suited to wholesale buyers.' },
  { slug: 'cherries', name: 'Cherries', line: 'Premium cherries — a high-value, high-impact seasonal line.' },
  { slug: 'plums', name: 'Plums', line: 'Premium imported plums for buyers who want range across the season.' },
  { slug: 'nectarines', name: 'Nectarines', line: 'Premium nectarines, the natural partner to plums in a stone-fruit offer.' },
].map((product) => ({
  ...product,
  category: 'fresh',
  alt: `${product.name} premium quality (illustrative image).`,
}))

export const dryFruits = [
  { slug: 'dates', name: 'Dates', line: 'Premium dates for everyday and festive trade, available in a range of formats.' },
  { slug: 'pistachios', name: 'Pistachios', line: 'Premium pistachios for wholesale, repack and gifting buyers.' },
  { slug: 'almonds', name: 'Almonds', line: 'Premium almonds — a core dry-fruit line for every kind of buyer.' },
  { slug: 'walnuts', name: 'Walnuts', line: 'Premium walnuts for wholesale, repack and institutional demand.' },
].map((product) => ({
  ...product,
  category: 'dry',
  alt: `${product.name} premium quality in bulk trays (illustrative image).`,
}))

export const allProducts = [...freshFruits, ...dryFruits]

export const exportRange = ['Basmati & Non-Basmati Rice', 'Mangoes', 'Fresh Vegetables']

// Export range as cards (lines from the Exports page, Section 9).
export const exportItems = [
  {
    slug: 'rice',
    name: 'Premium Rice',
    line: 'Basmati, 1121, non-basmati, Sona Masoori and other varieties.',
    to: '/exports/rice/',
  },
  { slug: 'mangoes', name: 'Mangoes by Air', line: 'Premium mangoes shipped fresh.', to: '/exports/mangoes-and-vegetables/' },
  {
    slug: 'vegetables',
    name: 'Fresh Vegetables by Air',
    line: 'Premium vegetables for Gulf buyers.',
    to: '/exports/mangoes-and-vegetables/',
  },
].map((product) => ({
  ...product,
  category: 'export',
  alt: `${product.name} (illustrative image).`,
}))
