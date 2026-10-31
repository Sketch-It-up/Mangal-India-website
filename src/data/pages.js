// Inner-page copy (Sections 6–9), page by page. Final copy: do not reword without client approval.
// H1s, SEO titles and meta descriptions live in routes.js.

const trade = { label: 'Start a Trade Enquiry', to: '/contact/' }
const globalMap = { label: 'Explore the Global Map', to: '/global-network/' }

export const aboutPage = {
  intro:
    'Mangal India is an importer and exporter of premium fresh and dry fruits. We import from 12 countries, supply commercial buyers across India through four wholesale market outlets and more than ten distribution centres, and export premium Indian rice, mangoes and vegetables, beginning with Dubai.',
  whoWeAre: {
    heading: 'Who we are',
    text: 'We are fruit traders, with more than eight years of experience and over 400 containers behind us. Our work is simple to describe and hard to do well: find premium produce, bring it to market in great condition and supply it to buyers who depend on us.',
  },
  range: {
    heading: 'A premium range',
    text: 'We trade nine fresh fruits — apples, oranges, mandarins, kiwi, dragon fruit, pears, cherries, plums and nectarines — and four dry fruits: dates, pistachios, almonds and walnuts. Our full range runs to more than 16 products.',
  },
  sourcing: {
    heading: 'Global sourcing',
    text: 'Our fresh fruits come from Turkey, South Africa, New Zealand, China, Italy, the USA, Chile and Poland. Our dry fruits come from Chile, Afghanistan, Oman, Dubai and Iraq. Twelve countries, six continents, one trusted partner.',
  },
  india: {
    heading: 'Deep roots in India',
    text: 'Our wholesale market outlets in Mumbai, Chennai, Delhi and Bengaluru, and more than ten distribution centres, connect us with customers across India, including Ahmedabad, Pune, Kochi, Kolkata and Jaipur.',
  },
  leadership: {
    heading: 'Our leadership',
    text: 'Mangal India is led by Saikrushna Warghude, Managing Director & CEO, whose journey from agricultural roots to global trade shapes our vision. Read his message.',
    cta: { label: 'Read the Founder’s Message', to: '/about/founder-message/' },
  },
  world: {
    heading: 'India to the world',
    text: 'Our next chapter takes premium Indian produce abroad. We are exporting basmati, 1121, non-basmati and Sona Masoori rice, with fresh vegetables and mangoes by air, and Mangal India is set to open its own premium retail shop in Dubai.',
    ctas: [trade, globalMap],
  },
}

export const founderPage = {
  ctas: [{ label: 'Start a Conversation', to: '/contact/' }, globalMap],
}

export const productsPage = {
  intro:
    'Mangal India trades 16+ products, led by nine fresh fruits and four dry fruits sourced from premium growing regions around the world, and an export range of rice, mangoes and vegetables from India.',
  categories: [
    {
      id: 'fresh',
      name: 'Fresh Fruits',
      products: 'Apples, oranges, mandarins, kiwi, dragon fruit, pears, cherries, plums, nectarines',
      to: '/products/fresh-fruits/',
    },
    { id: 'dry', name: 'Dry Fruits', products: 'Dates, pistachios, almonds, walnuts', to: '/products/dry-fruits/' },
    {
      id: 'export',
      name: 'Export Range',
      products: 'Basmati, 1121, non-basmati and Sona Masoori rice; mangoes; fresh vegetables',
      to: '/exports/',
    },
  ],
  cta: { label: 'Enquire About Availability', to: '/contact/' },
  secondaryCta: { label: 'View Exports', to: '/exports/' },
}

export const freshFruitsPage = {
  intro:
    'Nine premium fruits, sourced from Turkey, South Africa, New Zealand, China, Italy, the USA, Chile and Poland and supplied to wholesale buyers across India through our outlets in Mumbai, Chennai, Delhi and Bengaluru.',
  enquire: {
    heading: 'Enquire',
    text: 'Tell us the product, quantity, city and timing. We confirm specifications and availability, then quote for your requirement.',
  },
  cta: { label: 'Request Specifications', to: '/trade-with-us/indian-wholesale-buyers/' },
  secondaryCta: { label: 'View the Global Map', to: '/global-network/' },
}

export const dryFruitsPage = {
  intro:
    'Dates, pistachios, almonds and walnuts — premium dry fruits sourced from Chile, Afghanistan, Oman, Dubai and Iraq, for wholesale and repack buyers who want great quality and dependable supply.',
  enquire: {
    heading: 'Enquire',
    text: 'Share the product, form, quantity, location and timing. We confirm specifications and availability and quote for your requirement.',
  },
  cta: { label: 'Request Specifications', to: '/contact/' },
  secondaryCta: { label: 'View the Global Map', to: '/global-network/' },
}

export const globalNetworkPage = {
  intro:
    'Mangal India sources premium fruits and dry fruits from 12 countries across six continents, supplies buyers across India, and now exports premium Indian produce to Dubai and beyond. Explore the map.',
  sourceHeading: 'Where we source',
  supply: {
    heading: 'Where we supply',
    india:
      'In India: wholesale market outlets in Mumbai, Chennai, Delhi and Bengaluru, more than ten distribution centres, and customers in cities including Ahmedabad, Pune, Kochi, Kolkata and Jaipur.',
    abroad:
      'Abroad: Dubai, where we are exporting premium rice, mangoes and vegetables and opening our own premium retail shop.',
  },
  // "Teal" in the build document reads "Green" in the green theme. [CONFIRM: client approval of wording]
  howToRead: {
    heading: 'How to read the map',
    items: [
      { key: 'fresh', label: 'Green', text: 'fresh-fruit sourcing country' },
      { key: 'dry', label: 'Orange', text: 'dry-fruit sourcing country' },
      { key: 'both', label: 'Green and orange', text: 'both (Chile)' },
      { key: 'india', label: 'Dark green with a gold outline', text: 'India, our home market' },
      { key: 'dubai', label: 'Gold ring', text: 'Dubai: sourcing hub and first export destination' },
      { key: 'arcs', label: 'Animated arcs', text: 'trade flowing into India, and premium Indian produce flowing out to Dubai' },
    ],
  },
  cta: trade,
  secondaryCta: { label: 'View India Network', to: '/global-network/india-distribution/' },
}

export const indiaDistributionPage = {
  intro: 'Premium produce is only valuable if it reaches the buyer. Mangal India’s Indian network is built to do exactly that.',
  centres: {
    heading: '10+ distribution centres',
    text: 'More than ten distribution centres across India keep our range moving from import to market, so buyers across the country can source premium fruits and dry fruits through one partner.',
  },
  buy: {
    heading: 'Buy through Mangal India',
    text: 'Tell us your product, quantity, city and timing, and we will take it from there.',
  },
  cta: { label: 'Open a Buyer Enquiry', to: '/trade-with-us/indian-wholesale-buyers/' },
  secondaryCta: { label: 'Explore Fresh Fruits', to: '/products/fresh-fruits/' },
}

export const exportsPage = {
  intro:
    'Mangal India has spent eight years bringing the world’s best harvests to India. Now we are doing the same in reverse: exporting premium Indian produce, beginning with Dubai.',
  rangeHeading: 'Our export range',
  range: [
    { slug: 'rice', title: 'Premium rice', text: 'Basmati, 1121, non-basmati, Sona Masoori and other varieties.', to: '/exports/rice/' },
    { slug: 'mangoes', title: 'Mangoes by air', text: 'Premium mangoes shipped fresh.', to: '/exports/mangoes-and-vegetables/' },
    {
      slug: 'vegetables',
      title: 'Fresh vegetables by air',
      text: 'Premium vegetables for Gulf buyers.',
      to: '/exports/mangoes-and-vegetables/',
    },
  ],
  shop: {
    heading: 'Our own shop in Dubai',
    text: 'Mangal India is set to open its own premium retail shop in Dubai, serving premium fruits, vegetables and premium-quality dry fruits directly to customers.',
  },
  enquire: {
    heading: 'Tell us what you need',
    text: 'Share the product and variety, packaging, quantity, destination and timing. We will confirm what we can supply and agree terms and logistics clearly, up front.',
  },
  cta: { label: 'Send an Export Enquiry', to: '/trade-with-us/international-buyers/' },
  secondaryCta: { label: 'See the Dubai Retail Shop', to: '/exports/dubai-retail-shop/' },
}

export const ricePage = {
  intro: 'Mangal India exports premium rice in the varieties international buyers ask for most.',
  checklistHeading: 'What to include in your enquiry',
  cta: { label: 'Send a Rice Enquiry', to: '/trade-with-us/international-buyers/?product=rice' },
  secondaryCta: { label: 'View All Exports', to: '/exports/' },
}

export const airExportPage = {
  intro:
    'Fresh produce is a race against time. Mangal India exports premium mangoes and fresh vegetables by air, so they arrive fast and in great condition.',
  checklistHeading: 'What to include in your enquiry',
  cta: { label: 'Send an Air-Export Enquiry', to: '/trade-with-us/international-buyers/?product=mangoes' },
  secondaryCta: { label: 'View All Exports', to: '/exports/' },
}

export const dubaiShopPage = {
  intro:
    'Mangal India is set to open its own premium retail shop in Dubai, bringing eight years of fruit-trading experience directly to customers in the city.',
  offersHeading: 'What you will find',
  why: {
    heading: 'Why Dubai',
    text: 'Dubai is a major trading hub and already part of our dry-fruit sourcing. A shop of our own lets us serve premium customers directly and anchors our export business in the Gulf.',
  },
  // Scrolls to the inline sign-up (Form D: name, email, consent).
  cta: { label: 'Get Shop Updates', href: '#updates' },
  secondaryCta: { label: 'Trade Enquiry', to: '/contact/' },
}

// Trade With Us, Contact, FAQ, legal and thank-you pages (Sections 10 and 16).

export const indianBuyersPage = {
  intro:
    'Source premium imported fruits and dry fruits from one partner with 8+ years of experience, 400+ containers traded and 10+ distribution centres.',
  checklistHeading: 'Please send',
  checklist: ['Product', 'Quantity', 'Delivery city', 'Packaging', 'Timing'],
  secondaryCta: { label: 'Explore Fresh Fruits', to: '/products/fresh-fruits/' },
}

export const internationalBuyersPage = {
  intro: 'Mangal India exports premium rice, mangoes and fresh vegetables, starting with Dubai and the Gulf.',
  checklistHeading: 'Please send',
  checklist: ['Product and variety', 'Packaging and quantity', 'Destination', 'Target shipment window', 'Documents you require'],
  secondaryCta: { label: 'View Exports', to: '/exports/' },
}

export const suppliersPage = {
  intro:
    'Mangal India works with sources across 12 countries. If you grow, pack or export premium fruits or dry fruits, we would like to hear from you.',
  checklistHeading: 'Please send',
  checklist: ['Products and varieties', 'Country of origin', 'Grades and packing', 'Season and volumes', 'Certifications you hold'],
  secondaryCta: { label: 'View the Global Map', to: '/global-network/' },
}

export const contactPage = {
  intro: 'Tell us what you need and we will route your enquiry to the right team.',
  selectorLabel: 'I am an:',
}

// Grouped for the FAQ page; questions and answers live in faq.js.
export const faqGroups = [
  { title: 'About Mangal India', questions: [0, 1, 3] },
  { title: 'Sourcing and supply', questions: [2, 4] },
  { title: 'Exports and Dubai', questions: [5, 6] },
  { title: 'Trading with us', questions: [7, 8] },
]

export const thankYouPage = {
  body: 'Thank you. Your enquiry has reached the Mangal India team and we will respond shortly. In the meantime, explore our products or our global map.',
  ctas: [
    { label: 'Explore Products', to: '/products/' },
    { label: 'Explore the Global Map', to: '/global-network/' },
  ],
}

// Draft legal copy (Section 16). Must be reviewed by a qualified lawyer before launch.
export const privacyPolicy =
  'Mangal India · Krishna Mohan Exports (“we”) collects the details you submit through our enquiry forms — such as your name, company, email, phone and enquiry details — to respond to you and manage our business relationship. We do not sell your information. We may share it with service providers that host our website, send email or manage our records, under confidentiality terms. We use cookies and analytics to understand how the website is used and ask for your consent where required. To access, correct or delete your information, contact'

export const termsOfUse =
  'This website is provided by Mangal India · Krishna Mohan Exports for general information. Content on this website is not an offer to sell and does not create a contract. Products, specifications, availability and prices are confirmed in writing for each transaction. Content and images may not be copied without permission. We aim to keep information accurate but do not warrant that it is complete or current. These terms are governed by the laws of India.'
