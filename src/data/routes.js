// Every page in the sitemap (Section 3), with SEO title, meta description and H1
// exactly as written in each page's block of the build document.

export const routes = [
  {
    path: '/',
    name: 'Home',
    title: 'Mangal India | Importer & Exporter of Premium Fruits',
    description:
      'Mangal India is a leading importer and exporter of premium fresh and dry fruits, sourcing from 12 countries and supplying buyers across India and Dubai.',
    h1: 'Mangal India: The Leading Importer and Exporter of Premium Fresh & Dry Fruits.',
  },
  {
    path: '/about/',
    name: 'About',
    title: 'About Mangal India | Importer & Exporter of Fruits',
    description:
      'Eight-plus years, 400+ containers, 12 sourcing countries and 10+ distribution centres. Meet Mangal India, importer and exporter of premium fruits.',
    h1: 'An importer and exporter of premium fresh and dry fruits.',
  },
  {
    path: '/about/founder-message/',
    name: 'Founder’s Message',
    title: 'Founder’s Message | Saikrushna Warghude | Mangal India',
    description:
      'A message from Saikrushna Warghude, Managing Director & CEO of Mangal India, on agricultural roots, global trade and building connections.',
    h1: 'A Message from Our Founder & CEO',
  },
  {
    path: '/products/',
    name: 'Products',
    title: 'Products | Premium Fruits & Dry Fruits | Mangal India',
    description:
      'Nine premium fresh fruits, four premium dry fruits and an export range of rice, mangoes and vegetables, from Mangal India.',
    h1: 'Premium produce. Great quality. Wide range.',
  },
  {
    path: '/products/fresh-fruits/',
    name: 'Fresh Fruits',
    title: 'Premium Imported Fresh Fruits | Mangal India',
    description:
      'Premium apples, oranges, mandarins, kiwi, dragon fruit, pears, cherries, plums and nectarines from eight countries. Request specifications.',
    h1: 'Premium fresh fruits from around the world.',
  },
  {
    path: '/products/dry-fruits/',
    name: 'Dry Fruits',
    title: 'Premium Dry Fruits | Dates, Pistachios, Almonds',
    description:
      'Premium dates, pistachios, almonds and walnuts sourced from Chile, Afghanistan, Oman, Dubai and Iraq. Request specifications from Mangal India.',
    h1: 'Premium dry fruits, sourced across five countries.',
  },
  {
    path: '/global-network/',
    name: 'Global Network',
    title: 'Global Network | 12 Sourcing Countries | Mangal India',
    description:
      'See the 12 countries Mangal India sources premium fruits and dry fruits from, its India network and its export route to Dubai on one world map.',
    h1: 'A world of premium produce, one trusted partner.',
  },
  {
    path: '/global-network/india-distribution/',
    name: 'India Distribution',
    title: 'India Distribution Network | Mangal India',
    description:
      'Mangal India supplies India through wholesale outlets in Mumbai, Chennai, Delhi and Bengaluru, 10+ distribution centres and customers across the country.',
    h1: 'Four wholesale markets. Ten-plus distribution centres. All of India.',
  },
  {
    path: '/exports/',
    name: 'Exports',
    title: 'Exports | Premium Rice, Mangoes & Vegetables | Mangal India',
    description:
      'Premium basmati, 1121, non-basmati and Sona Masoori rice, plus mangoes and fresh vegetables by air, from India to Dubai and beyond.',
    h1: 'Premium India, delivered to the world.',
  },
  {
    path: '/exports/rice/',
    name: 'Rice',
    title: 'Premium Rice Export | Basmati, 1121, Sona Masoori',
    description:
      'Export-grade premium basmati, 1121, non-basmati and Sona Masoori rice from India. Send a rice enquiry to Mangal India.',
    h1: 'Premium Indian rice for global kitchens.',
  },
  {
    path: '/exports/mangoes-and-vegetables/',
    name: 'Mangoes & Vegetables',
    title: 'Mango & Fresh Vegetable Air Export | Mangal India',
    description:
      'Premium Indian mangoes and fresh vegetables exported by air to Dubai and beyond. Send an air-export enquiry to Mangal India.',
    h1: 'Premium mangoes and fresh vegetables, flown fresh.',
  },
  {
    path: '/exports/dubai-retail-shop/',
    name: 'Dubai Retail Shop',
    title: 'Mangal India Dubai | Premium Fruit & Dry Fruit Shop',
    description:
      'Mangal India is set to open its own premium retail shop in Dubai, serving premium fruits, vegetables and premium-quality dry fruits.',
    h1: 'Mangal India is coming to Dubai.',
  },
  {
    path: '/trade-with-us/indian-wholesale-buyers/',
    name: 'Indian Wholesale Buyers',
    title: 'Indian Wholesale Buyers | Premium Fruit Supply',
    description:
      'Buy premium imported fruits and dry fruits through Mangal India’s wholesale outlets in Mumbai, Chennai, Delhi and Bengaluru.',
    h1: 'Premium imported fruit for Indian wholesale buyers.',
  },
  {
    path: '/trade-with-us/international-buyers/',
    name: 'International Buyers',
    title: 'International Buyers | Premium Indian Exports',
    description:
      'Import premium basmati, 1121, non-basmati and Sona Masoori rice, mangoes and fresh vegetables from India with Mangal India.',
    h1: 'Importing from India? Start here.',
  },
  {
    path: '/trade-with-us/suppliers/',
    name: 'International Suppliers',
    title: 'International Suppliers | Supply to India',
    description:
      'Supply premium fruits and dry fruits to Indian buyers through Mangal India. Introduce your products, origin and volumes.',
    h1: 'Supply premium produce to India.',
  },
  {
    path: '/contact/',
    name: 'Contact',
    title: 'Contact Mangal India | Business Enquiries',
    description:
      'Contact Mangal India for wholesale supply, exports, the Dubai shop or supplier introductions. Choose your enquiry type and send details.',
    h1: 'Start a trade enquiry.',
  },
  {
    path: '/faq/',
    name: 'FAQs',
    title: 'FAQs | Mangal India',
    description:
      'Answers about Mangal India: what we trade, where we source, our India network, our exports and the Dubai shop.',
    h1: 'Frequently asked questions.',
  },
  {
    path: '/privacy-policy/',
    name: 'Privacy Policy',
    title: 'Privacy Policy | Mangal India',
    description: 'How Mangal India · Krishna Mohan Exports collects and uses the details you submit through our enquiry forms.',
    h1: 'Privacy Policy',
  },
  {
    path: '/terms-of-use/',
    name: 'Terms of Use',
    title: 'Terms of Use | Mangal India',
    description: 'Terms governing the use of the Mangal India website.',
    h1: 'Terms of Use',
  },
  {
    path: '/thank-you/',
    name: 'Thank You',
    title: 'Enquiry received | Mangal India',
    description: 'Your enquiry has reached the Mangal India team.',
    h1: 'Enquiry received.',
    noindex: true,
  },
]

export const routeByPath = Object.fromEntries(routes.map((route) => [route.path, route]))
