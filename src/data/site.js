// Locked fact base from the build document (Sections 1 and 2).
// Do not change wording or numbers without client approval.
// `null` values are [CONFIRM] items still to be supplied by the client.

export const site = {
  name: 'Mangal India',
  subtext: 'Importer & Exporter',
  // Branding credit shown in the footer. [CONFIRM: Mrida Solutions details and website link]
  poweredBy: { name: 'Mrida Solutions', url: null },
  tagline: 'Harvests in. Horizons out.',
  url: null, // [CONFIRM: domain name], e.g. 'https://www.example.com'
  logo: null, // [CONFIRM: logo files], path under /public, used in structured data

  hero: {
    eyebrow: ['Global markets', 'Great quality', 'Premium products'],
    title: 'Mangal India: The Leading Entity in Premium Fresh & Dry Fruits.',
    // Published word for word as supplied by the client, including punctuation.
    subtext:
      'Mangal India sources fresh fruits and dry fruits from international markets and supplies commercial buyers, We deliver the great quality finest and freshest produce, all year long, in all seasons.',
    trustLine: ['Global reach', 'Premium fruits', 'Great quality', '8+ years', '400+ containers'],
  },

  contact: {
    email: 'sspfarmerexpo@gmail.com',
    phone: '+91 73858 20580',
    // As supplied by the client. [CONFIRM: spelling of the society name]
    address: 'Flat No. A41, Shkarand Society, Opp. Natubag PMT Stop, Sahakar Nagar, Haveli, Pune 411009, India',
    privacyEmail: 'sspfarmerexpo@gmail.com', // [CONFIRM: same inbox for privacy requests]
  },

  social: [], // [CONFIRM: social media profile links]

  copyright: '© 2026 Mangal India. All rights reserved.',
}

// [CONFIRM] "8+ years" conflicts with the founder's 2020 start. Resolve before launch.
export const stats = [
  { value: 8, suffix: '+', label: 'Years of Experience', line: 'Over eight years of hands-on fruit trading.' },
  { value: 400, suffix: '+', label: 'Containers Traded', line: 'More than 400 containers of premium produce handled to date.' },
  { value: 20, suffix: '+', label: 'Products', line: 'A wide range across fresh fruits, dry fruits and Indian exports, and growing.' },
  { value: 20, suffix: '', label: 'Sourcing Countries', line: 'Premium produce sourced from 20 countries across six continents.' },
  { value: 10, suffix: '+', label: 'Distribution Centres in India', line: 'Backed by four wholesale market outlets and customers across India.' },
]
