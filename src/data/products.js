// Product range (client feedback, November 2026). `origins` and `varieties` are as supplied
// by the client; `photo: false` marks products still waiting for photography.

const imagePath = (name) => `/images/products/${name}.jpg`

export const freshFruits = [
  // Core imports
  {
    slug: 'apples',
    name: 'Apples',
    line: 'Crisp, premium imported apples — the anchor of any wholesale fruit range.',
    origins: ['Turkey', 'Iran', 'Chile', 'New Zealand', 'USA', 'Poland', 'Afghanistan', 'Italy'],
    varieties: ['Royal Gala', 'Red Delicious', 'Green Apple', 'Fuji', 'Pink Lady', 'Golden Delicious'],
  },
  {
    slug: 'pears',
    name: 'Pears',
    line: 'Premium imported pears in a range suited to wholesale buyers.',
    origins: ['South Africa', 'Chile'],
    // [CONFIRM: pear variety spellings with the client]
    varieties: ['Forelle (green and red)', 'Packham'],
  },
  { slug: 'oranges', name: 'Oranges', line: 'Juicy premium oranges for wholesale and institutional demand across India.', origins: ['Egypt', 'South Africa'] },
  { slug: 'kiwi', name: 'Kiwi', line: 'Premium imported kiwi, popular with retail and distributor buyers.', origins: ['New Zealand', 'Iran'] },
  { slug: 'mandarins', name: 'Mandarins', line: 'Sweet, easy-peeling premium mandarins that complete a citrus range.', origins: ['South Africa', 'China'] },
  { slug: 'dragon-fruit', name: 'Dragon Fruit', line: 'Vivid, exotic dragon fruit that gives any assortment a standout line.', origins: ['Vietnam'] },
  {
    slug: 'cherries',
    name: 'Cherries',
    line: 'Premium cherries — a high-value, high-impact seasonal line.',
    origins: ['Chile', 'USA', 'Turkey', 'Iran', 'Afghanistan', 'Australia'],
  },

  // Thai fruits
  { slug: 'thai-mangoes', name: 'Thai Mangoes', line: 'Premium mangoes from Thailand for buyers who want an exotic line.', origins: ['Thailand'], group: 'thai', photo: 'mangoes' },
  { slug: 'coconuts', name: 'Coconuts', line: 'Fresh Thai coconuts for retail, juice and hospitality buyers.', origins: ['Thailand'], group: 'thai', photo: false },
  { slug: 'mangosteen', name: 'Mangosteen', line: 'Premium mangosteen, a prized exotic fruit from Thailand.', origins: ['Thailand'], group: 'thai', photo: false },
  { slug: 'rambutan', name: 'Rambutan', line: 'Bright, sweet rambutan that stands out on any display.', origins: ['Thailand'], group: 'thai', photo: false },
  { slug: 'durian', name: 'Durian', line: 'Premium Thai durian for specialist and exotic-fruit buyers.', origins: ['Thailand'], group: 'thai', photo: false },
  { slug: 'tamarind', name: 'Tamarind', line: 'Sweet Thai tamarind for retail and repack buyers.', origins: ['Thailand'], group: 'thai', photo: false },

  // More fresh fruits. [CONFIRM: origins with the client]
  { slug: 'plums', name: 'Plums', line: 'Premium imported plums for buyers who want range across the season.', group: 'more' },
  { slug: 'blueberries', name: 'Blueberries', line: 'Premium blueberries for retail and hospitality buyers.', group: 'more', photo: false },
  { slug: 'avocados', name: 'Avocados', line: 'Premium avocados for retail, food-service and hospitality demand.', group: 'more', photo: false },
  { slug: 'nectarines', name: 'Nectarines', line: 'Premium nectarines, the natural partner to plums in a stone-fruit offer.', group: 'more' },
  { slug: 'peaches', name: 'Peaches', line: 'Premium peaches to complete a stone-fruit range.', group: 'more', photo: false },
  { slug: 'persimmons', name: 'Persimmons', line: 'Premium persimmons, a distinctive seasonal line.', group: 'more', photo: false },
].map(({ photo, group = 'core', ...product }) => ({
  ...product,
  group,
  category: 'fresh',
  // `art` is the illustration / cut-out key used by ProduceArt (null: generic illustration).
  art: photo === false ? null : (photo ?? product.slug),
  image: photo === false ? null : imagePath(photo ?? product.slug),
  alt: `${product.name} premium quality (illustrative image).`,
}))

export const freshFruitGroups = [
  { id: 'core', title: 'Our core imports', note: 'Sourced by origin, in the varieties buyers ask for most.' },
  { id: 'thai', title: 'Thai fruits', note: 'Exotic fruits sourced from Thailand.' },
  { id: 'more', title: 'More fresh fruits', note: 'Seasonal lines that complete the range.' },
].map((group) => ({ ...group, products: freshFruits.filter((product) => product.group === group.id) }))

export const dryFruits = [
  { slug: 'dates', name: 'Dates', line: 'Premium dates for everyday and festive trade, available in a range of formats.' },
  { slug: 'pistachios', name: 'Pistachios', line: 'Premium pistachios for wholesale, repack and gifting buyers.' },
  { slug: 'almonds', name: 'Almonds', line: 'Premium almonds — a core dry-fruit line for every kind of buyer.' },
  { slug: 'walnuts', name: 'Walnuts', line: 'Premium walnuts for wholesale, repack and institutional demand.' },
].map((product) => ({
  ...product,
  category: 'dry',
  art: product.slug,
  image: imagePath(product.slug),
  alt: `${product.name} premium quality (illustrative image).`,
}))

export const allProducts = [...freshFruits, ...dryFruits]

// Indian produce exported by Mangal India, in the client's order, with rice from the original range.
export const exportRange = ['Mangoes', 'Bananas', 'Onions', 'Pomegranates', 'Grapes', 'Chillies', 'Fresh Vegetables', 'Rice']

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
  art: product.slug,
  image: imagePath(product.slug),
  alt: `${product.name} (illustrative image).`,
}))
