// Primary navigation (Section 3) and footer columns (Section 4).

import {
  Apple,
  Building2,
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
  Wheat,
} from 'lucide-react'

export const primaryNav = [
  {
    label: 'About',
    items: [
      { label: 'About Mangal India', to: '/about/', description: 'Experience, scale and ambition', icon: Info },
      { label: 'Founder’s Message', to: '/about/founder-message/', description: 'From Saikrushna Warghude', icon: Quote },
    ],
  },
  {
    label: 'Products',
    items: [
      { label: 'All Products', to: '/products/', description: '16+ products and growing', icon: LayoutGrid },
      { label: 'Fresh Fruits', to: '/products/fresh-fruits/', description: 'Nine fruits from eight countries', icon: Apple },
      { label: 'Dry Fruits', to: '/products/dry-fruits/', description: 'Dates, pistachios, almonds, walnuts', icon: Nut },
    ],
  },
  {
    label: 'Global Network',
    items: [
      { label: 'World Map', to: '/global-network/', description: '12 sourcing countries, six continents', icon: Globe },
      { label: 'India Distribution', to: '/global-network/india-distribution/', description: '4 outlets, 10+ distribution centres', icon: MapPin },
    ],
  },
  {
    label: 'Exports',
    items: [
      { label: 'All Exports', to: '/exports/', description: 'Premium India to the world', icon: Ship },
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
    title: 'Global Network',
    links: [
      { label: 'World Map', to: '/global-network/' },
      { label: 'India Distribution', to: '/global-network/india-distribution/' },
      { label: 'About Us', to: '/about/' },
      { label: 'Founder’s Message', to: '/about/founder-message/' },
    ],
  },
  {
    title: 'Exports',
    links: [
      { label: 'All Exports', to: '/exports/' },
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
