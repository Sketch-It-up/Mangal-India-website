// Primary navigation (Section 3) and footer columns (Section 4).

import {
  Apple,
  Building2,
  Landmark,
  Globe,
  Info,
  LayoutGrid,
  MapPin,
  Nut,
  Plane,
  Quote,
  Ship,
  Sprout,
  Store,
  Tractor,
  Users,
  Wheat,
} from 'lucide-react'

export const primaryNav = [
  {
    label: 'About',
    items: [
      { label: 'About Mangal India', to: '/about/', description: 'Experience, scale and ambition', icon: Info },
      { label: 'Founder’s Message', to: '/about/founder-message/', description: 'From Saikrushna Warghude', icon: Quote },
      { label: 'Our Team', to: '/about/our-team/', description: 'The people behind Mangal India', icon: Users, badge: 'New' },
    ],
  },
  {
    label: 'Products',
    items: [
      { label: 'All Products', to: '/products/', description: '20+ products and growing', icon: LayoutGrid },
      { label: 'Fresh Fruits', to: '/products/fresh-fruits/', description: 'Sourced from 14 countries', icon: Apple },
      { label: 'Dry Fruits', to: '/products/dry-fruits/', description: 'Dates, pistachios, almonds, walnuts', icon: Nut },
    ],
  },
  {
    label: 'Global Network',
    items: [
      { label: 'World Map', to: '/global-network/', description: '20 sourcing countries, six continents', icon: Globe },
      { label: 'India Distribution', to: '/global-network/india-distribution/', description: '4 outlets, 10+ distribution centres', icon: MapPin },
      { label: 'Global Offices', to: '/global-network/global-offices/', description: 'Dubai, Iran and Turkey', icon: Landmark, badge: 'New' },
    ],
  },
  {
    label: 'Exports',
    items: [
      { label: 'All Exports', to: '/exports/', description: 'Premium India to the world', icon: Ship },
      { label: 'Farming Venture', to: '/farming-venture/', description: 'Our own farms, 100+ acres', icon: Tractor, badge: 'New' },
      { label: 'Rice', to: '/exports/rice/', description: 'Basmati, 1121, Sona Masoori and more', icon: Wheat },
      { label: 'Mangoes & Vegetables', to: '/exports/mangoes-and-vegetables/', description: 'Fresh produce by air', icon: Plane },
      { label: 'Dubai Retail Shop', to: '/exports/dubai-retail-shop/', description: 'Our own premium shop', icon: Store },
    ],
  },
  {
    label: 'Trade With Us',
    items: [
      { label: 'Indian Buyers', to: '/trade-with-us/indian-wholesale-buyers/', description: 'Wholesale supply across India', icon: Building2 },
      { label: 'International Buyers', to: '/trade-with-us/international-buyers/', description: 'Premium Indian exports', icon: Globe },
      { label: 'Suppliers', to: '/trade-with-us/suppliers/', description: 'Supply premium produce to India', icon: Sprout },
    ],
  },
]

// The three pages the client asked to be clearly highlighted (homepage band and footer column).
export const featuredPages = [
  {
    label: 'Global Offices',
    to: '/global-network/global-offices/',
    text: 'Offices in Dubai, Iran and Turkey, with our head office in Pune, India.',
    cta: 'See Our Offices',
    icon: Landmark,
  },
  {
    label: 'Our Team',
    to: '/about/our-team/',
    text: 'The people leading technology, accounts, operations, marketing and retail at Mangal India.',
    cta: 'Meet the Team',
    icon: Users,
  },
  {
    label: 'Farming Venture',
    to: '/farming-venture/',
    text: 'A grower-exporter with over 100 acres of our own farming, in Yadgir and Shikrapur.',
    cta: 'Visit Our Farms',
    icon: Tractor,
  },
]

export const enquiryCta = { label: 'Business Enquiry', to: '/contact/' }

export const footerNav = [
  {
    title: 'Products',
    links: [
      { label: 'All Products', to: '/products/' },
      { label: 'Fresh Fruits', to: '/products/fresh-fruits/' },
      { label: 'Dry Fruits', to: '/products/dry-fruits/' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about/' },
      { label: 'Founder’s Message', to: '/about/founder-message/' },
      { label: 'Our Team', to: '/about/our-team/' },
      { label: 'Global Offices', to: '/global-network/global-offices/' },
      { label: 'World Map', to: '/global-network/' },
      { label: 'India Distribution', to: '/global-network/india-distribution/' },
    ],
  },
  {
    title: 'Exports',
    links: [
      { label: 'All Exports', to: '/exports/' },
      { label: 'Farming Venture', to: '/farming-venture/' },
      { label: 'Rice', to: '/exports/rice/' },
      { label: 'Mangoes & Vegetables', to: '/exports/mangoes-and-vegetables/' },
      { label: 'Dubai Retail Shop', to: '/exports/dubai-retail-shop/' },
    ],
  },
  {
    title: 'Trade With Us',
    links: [
      { label: 'Indian Wholesale Buyers', to: '/trade-with-us/indian-wholesale-buyers/' },
      { label: 'International Buyers', to: '/trade-with-us/international-buyers/' },
      { label: 'International Suppliers', to: '/trade-with-us/suppliers/' },
      { label: 'FAQs', to: '/faq/' },
    ],
  },
]

export const legalNav = [
  { label: 'Privacy Policy', to: '/privacy-policy/' },
  { label: 'Terms of Use', to: '/terms-of-use/' },
]
