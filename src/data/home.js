// Homepage copy (Section 5), in publication order. Final copy: do not reword without client approval.
import { dryFruitCountries, freshFruitCountries } from './countries'
import { dryFruitsPage, exportsPage, freshFruitsPage } from './pages'
import { dryFruits, freshFruits } from './products'
import { routeByPath } from './routes'

// Hero slides that follow the brand slide. Titles and text reuse each page's approved H1 and intro;
// `accent` is the part of the title set in italics. `stage` is the visual: a studio photo
// (public/images/hero) with produce cut-outs floating around it and a fact chip.
export const heroSlides = [
  {
    id: 'fresh',
    label: 'Fresh Fruits',
    eyebrow: ['Fresh fruits', `${freshFruitCountries.length} sourcing countries`],
    title: routeByPath['/products/fresh-fruits/'].h1,
    accent: 'around the world.',
    text: freshFruitsPage.intro,
    ctas: [{ label: 'Explore Fresh Fruits', to: '/products/fresh-fruits/' }, freshFruitsPage.cta],
    word: 'Fresh',
    stage: {
      photo: '/images/hero/fresh.jpg',
      cutouts: ['cherries', 'mandarins', 'kiwi'],
      chip: { title: `${freshFruits.length} fresh fruits`, text: `From ${freshFruitCountries.length} countries` },
    },
  },
  {
    id: 'dry',
    label: 'Dry Fruits',
    eyebrow: ['Dry fruits', `${dryFruitCountries.length} sourcing countries`],
    title: routeByPath['/products/dry-fruits/'].h1,
    accent: 'twelve countries.',
    text: dryFruitsPage.intro,
    ctas: [{ label: 'Explore Dry Fruits', to: '/products/dry-fruits/' }, dryFruitsPage.cta],
    word: 'Dry',
    stage: {
      photo: '/images/hero/dry.jpg',
      cutouts: ['almonds', 'pistachios', 'walnuts'],
      chip: { title: `${dryFruits.length} dry fruits`, text: `From ${dryFruitCountries.length} countries` },
    },
  },
  {
    id: 'exports',
    label: 'Exports',
    eyebrow: ['Exports', 'Beginning with Dubai'],
    title: routeByPath['/exports/'].h1,
    accent: 'to the world.',
    text: exportsPage.intro,
    ctas: [{ label: 'Explore Exports', to: '/exports/' }, exportsPage.secondaryCta],
    word: 'Export',
    stage: {
      photo: '/images/hero/exports.jpg',
      cutouts: ['rice'],
      chip: { title: 'Fruits · Vegetables · Rice', text: 'Grown and exported by us' },
    },
  },
]

export const statsHeading = 'A trading record that speaks for itself.'

export const importExport = {
  heading: 'One firm. Two engines of trade.',
  import: {
    label: 'Import',
    tag: 'The established engine',
    text: 'Premium fresh fruits and dry fruits sourced from 20 countries and supplied to commercial buyers across India through 4 owned wholesale distribution outlets and 10+ distribution centres.',
    cta: { label: 'Explore Imports', to: '/products/' },
  },
  export: {
    label: 'Export',
    tag: 'The growth engine',
    text: 'Premium Indian mangoes, bananas, onions, pomegranates, grapes, chillies and fresh vegetables, plus rice, from a grower-exporter with over 100 acres of its own farming — beginning with Dubai, where Mangal India is set to open its own Wholesale Distribution Center.',
    cta: { label: 'Explore Exports', to: '/exports/' },
  },
}

export const mapSection = {
  heading: 'Importing from 20 countries. Exporting from India.',
  intro:
    'Mangal India imports premium fruits and dry fruits from 20 countries across the world, brings them to Indian markets — and now exports premium Indian produce back out, beginning with Dubai.',
  cta: { label: 'Explore the Full Map', to: '/global-network/' },
}

export const portfolio = {
  heading: 'Premium fruits. Premium dry fruits. Great quality.',
  intro: 'Fresh fruits and dry fruits from 20 countries, selected for premium quality and supplied to buyers who expect more.',
  ctas: [
    { label: 'Explore Fresh Fruits', to: '/products/fresh-fruits/' },
    { label: 'Explore Dry Fruits', to: '/products/dry-fruits/' },
    { label: 'Explore Exports', to: '/exports/' },
  ],
}

export const indiaNetwork = {
  heading: 'Four owned wholesale outlets. Ten-plus distribution centres. Customers across India.',
  text: 'Mangal India serves India through its owned wholesale distribution outlets in Mumbai, Chennai, Delhi and Bengaluru, supported by more than ten distribution centres. Our customers are spread across the country, in cities including Ahmedabad, Pune, Kochi, Kolkata and Jaipur.',
  cta: { label: 'View the India Network', to: '/global-network/india-distribution/' },
}

export const whyUs = {
  heading: 'Built on experience. Driven by quality.',
  points: [
    { title: 'Global reach', text: 'Premium produce sourced from 20 countries.' },
    { title: 'Great quality', text: 'A premium selection, with specifications confirmed before every order.' },
    { title: 'Wide range', text: '20+ products across fresh and dry fruit, with Indian fruits, vegetables and rice for export.' },
    { title: 'Proven scale', text: '400+ containers traded over 8+ years.' },
    { title: 'Deep Indian reach', text: '10+ distribution centres and customers across India.' },
  ],
}

export const founderFeature = {
  heading: 'A message from our Founder & CEO',
  quote: '“Let’s build meaningful connections through global trade.”',
  byline: 'Saikrushna Warghude, Managing Director & CEO — from agricultural roots to global trade. Read the full message.',
  cta: { label: 'Read the Founder’s Message', to: '/about/founder-message/' },
}

export const exportsDubai = {
  heading: 'From India to the world — starting with Dubai.',
  paragraphs: [
    'Mangal India is now taking premium Indian produce to the world. As a grower-exporter with over 100 acres of our own farming, our export range includes mangoes, bananas, onions, pomegranates, grapes, chillies and fresh vegetables, along with premium rice.',
    'In Dubai, Mangal India is set to open its own Wholesale Distribution Center, supplying premium fruits, vegetables and premium-quality dry fruits to trade buyers across the city.',
  ],
  ctas: [
    { label: 'Explore Exports', to: '/exports/' },
    { label: 'See the Dubai Distribution Center', to: '/exports/dubai-wholesale-distribution/' },
  ],
}

export const howWeTrade = {
  heading: 'Simple, clear, dependable.',
  steps: [
    { title: 'Tell us what you need', text: 'Product, quantity, destination, timing.' },
    { title: 'We confirm', text: 'Specifications and availability.' },
    { title: 'We align', text: 'Packaging and commercial terms.' },
    { title: 'We agree', text: 'Documentation and logistics.' },
    { title: 'We deliver', text: 'According to the agreed terms.' },
  ],
}

export const pathways = {
  heading: 'Three ways to work with us',
  items: [
    {
      audience: 'Indian wholesale buyers',
      text: 'Source premium imported fruits and dry fruits through our wholesale outlets and distribution centres.',
      cta: { label: 'Open a Buyer Enquiry', to: '/trade-with-us/indian-wholesale-buyers/' },
    },
    {
      audience: 'International buyers',
      text: 'Premium Indian fruits, vegetables and rice from a grower-exporter, with air export for fresh produce.',
      cta: { label: 'Send an Export Enquiry', to: '/trade-with-us/international-buyers/' },
    },
    {
      audience: 'International suppliers',
      text: 'Grow, pack or export premium fruits or dry fruits? Let us put them in front of Indian buyers.',
      cta: { label: 'Become a Supplier', to: '/trade-with-us/suppliers/' },
    },
  ],
}

export const finalCta = {
  heading: 'Harvests in. Horizons out.',
  text: 'Premium produce from around the world for India. Premium India for the world. Mangal India — importer and exporter.',
  cta: { label: 'Start a Trade Enquiry', to: '/contact/' },
}
