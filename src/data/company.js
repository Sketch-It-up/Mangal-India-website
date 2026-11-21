// Global offices, team and farming venture (client feedback, November 2026).
// Names and facts are as supplied by the client; supporting sentences are draft copy.
// `null` values are [CONFIRM] items still to be supplied by the client.

import { site } from './site'

export const headOffice = {
  city: 'Pune',
  country: 'India',
  label: 'Head office',
  address: site.contact.address,
  email: site.contact.email,
  phone: site.contact.phone,
}

// [CONFIRM: office addresses and contact details; company name spellings]
export const globalOffices = [
  {
    id: 'dubai',
    city: 'Dubai',
    country: 'United Arab Emirates',
    company: 'Mayfair General Trading Company',
    text: 'Our base in the Gulf: a sourcing hub for dry fruits and the first destination for our Indian exports.',
  },
  {
    id: 'iran',
    city: 'Iran',
    country: 'Iran',
    company: 'Noyan Tejarat',
    text: 'Close to the growers behind our Iranian apples, kiwi, cherries and dry fruits.',
  },
  {
    id: 'turkey',
    city: 'Turkey',
    country: 'Turkey',
    company: 'Golden Bee',
    text: 'Our link to Turkish apples, cherries and dry fruits.',
  },
]

export const officesPage = {
  intro:
    'Mangal India works through offices in Dubai, Iran and Turkey, alongside its head office in Pune, India — keeping us close to the markets we source from and export to.',
  officesHeading: 'Our global offices',
  headOfficeHeading: 'Head office, India',
  cta: { label: 'Start a Trade Enquiry', to: '/contact/' },
  secondaryCta: { label: 'Explore the Global Map', to: '/global-network/' },
}

// Team (change request round 2, 18 Nov 2026). Portraits kept as supplied, at the client's request.
// `credential`: one line of experience or education; null hides the line until it is confirmed.
// [CONFIRM: Saikrushna's line; "15 years" or "15+ years"]
export const team = [
  { name: 'Saikrushna Warghude', title: 'CEO', role: 'Founder, Managing Director & CEO', credential: null, portrait: '/images/founder.jpg', to: '/about/founder-message/' },
  { name: 'Nikhil Shelke', title: 'CTO', role: 'Chief Technology Officer', credential: 'MBA, IIM Ahmedabad', portrait: '/images/team/nikhil-shelke.jpg' },
  { name: 'Anand Singh', title: 'Head – Accounts', role: 'Accounts & finance', credential: '15 years of experience', portrait: '/images/team/anand-singh.jpg' },
  { name: 'Pandurang Ped', title: 'Head – Operations', role: 'Sourcing, shipments & distribution', credential: '12 years of experience', portrait: '/images/coo.jpg' },
  { name: 'Sanket Pharate', title: 'Head – Sales', role: 'Sales & buyer relationships', credential: 'MBA', portrait: '/images/team/sanket-pharate.jpg' },
]

export const teamPage = {
  intro:
    'Mangal India is run by a hands-on team covering technology, accounts, operations and sales, led by our founder and CEO, Saikrushna Warghude.',
  heading: 'Leadership team',
  cta: { label: 'Start a Conversation', to: '/contact/' },
  secondaryCta: { label: 'Read the Founder’s Message', to: '/about/founder-message/' },
}

export const farms = [
  {
    id: 'yadgir',
    name: 'Yadgir Farming Project',
    // [CONFIRM: acreage of the Yadgir project on its own]
    location: 'Yadgir, Karnataka',
    size: null,
    text: 'Our multi-crop farming project at Yadgir, growing fruits, vegetables and flowers for export.',
    crops: ['Watermelon', 'G4 chilli', 'Onion', 'Okra', 'Exotic vegetables', 'Flowers'],
  },
  {
    id: 'shikrapur',
    name: 'Shikrapur Pomegranate Farm',
    location: 'Shikrapur, Pune district, Maharashtra',
    size: 'Over 10 acres',
    text: 'Our own pomegranate farm in Pune district, grown by us for export.',
    crops: ['Pomegranate'],
  },
]

// Client's own photos and clips from the fields (public/images/farm, public/videos/farm).
// [CONFIRM: which farm each photo shows, and captions, with the client]
const farmPhoto = (n) => `/images/farm/field-${String(n).padStart(2, '0')}.jpg`

export const farmMedia = {
  hero: { src: farmPhoto(10), alt: 'Workers planting seedlings across long mulched beds on a Mangal India farm, with trees and hills behind.' },
  photosHeading: 'From our fields',
  photosIntro: 'Bed preparation, mulching, planting and crop care on our own farms.',
  photos: [
    { src: farmPhoto(5), alt: 'A worker with a backpack sprayer walking between rows of young plants on mulched beds.', caption: 'Crop care, row by row' },
    { src: farmPhoto(4), alt: 'A team laying and punching mulch film on raised beds under a blue sky.', caption: 'Laying mulch on raised beds' },
    { src: farmPhoto(9), alt: 'Workers transplanting seedlings from nursery trays into mulched beds.', caption: 'Transplanting seedlings' },
    { src: farmPhoto(2), alt: 'A young seedling growing through mulch film, seen from above.', caption: 'A seedling takes hold' },
    { src: farmPhoto(7), alt: 'Workers preparing long raised beds covered with mulch film.', caption: 'Preparing the beds' },
    { src: farmPhoto(1), alt: 'A row of young seedlings planted along a mulched bed.', caption: 'Newly planted rows' },
    { src: farmPhoto(6), alt: 'A wide field of freshly mulched beds ready for planting.', caption: 'Beds ready for planting' },
    { src: farmPhoto(3), alt: 'A worker spraying young plants by hand along a mulched bed in morning light.', caption: 'Hand spraying at first light' },
    { src: farmPhoto(8), alt: 'Seedlings planted in a line through mulch film with drip irrigation alongside.', caption: 'Planted and irrigated' },
  ],
  videosHeading: 'See the farms at work',
  videosIntro: 'Short clips filmed on our farms.',
  videos: [1, 2, 3, 4, 5].map((n) => ({ src: `/videos/farm/field-${n}.mp4`, label: `Field clip ${n}` })),
}

export const farmingPage = {
  intro:
    'On exports our thinking is simple: grower-exporter. Mangal India runs its own farming venture across more than 100 acres, so the produce we export starts on farms we own.',
  stats: [
    { value: '100+', label: 'Acres of our own farming' },
    { value: '2', label: 'Live farms for exports' },
    { value: '100%', label: 'Owned by us, on our own investment' },
  ],
  farmsHeading: 'Our live farms',
  farmsIntro: 'Both farms are live, grown for export, owned by us and run on our own investment.',
  why: {
    heading: 'Why we grow our own',
    points: [
      { title: 'Grown by us', text: 'We farm the land ourselves, from planting through to harvest.' },
      { title: 'Owned by us', text: 'Both farms are owned by Mangal India and built on our own investment.' },
      { title: 'Grown for export', text: 'What we plant is chosen for the buyers and markets we export to.' },
    ],
  },
  cta: { label: 'Send an Export Enquiry', to: '/trade-with-us/international-buyers/' },
  secondaryCta: { label: 'View All Exports', to: '/exports/' },
}
