import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false, // Set to true in production for better performance
  token: process.env.SANITY_API_WRITE_TOKEN,
})

// Image URL builder
const builder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
})

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Types pour les données Sanity
export interface DayPricing {
  _id: string
  _type: 'dayPricing'
  date: string
  pricePerNight?: number
  minimumNights?: number
  isAvailable: boolean
  blockReason?: 'booking' | 'maintenance' | 'personal' | 'other'
  comment?: string
  highlightColor?: 'none' | 'green' | 'yellow' | 'orange' | 'red' | 'blue' | 'purple'
}

export interface PricingPeriod {
  _id: string
  _type: 'pricingPeriod'
  name: string
  startDate: string
  endDate: string
  pricePerNight: number
  minimumNights: number
  isAvailable: boolean
  comment?: string
  isActive: boolean
}

export interface BlockedDate {
  _id: string
  _type: 'blockedDate'
  startDate: string
  endDate: string
  reason: 'booking' | 'maintenance' | 'personal' | 'blocked'
  comment?: string
  color: 'red' | 'orange' | 'yellow' | 'gray'
  isActive: boolean
}

export interface BookingRules {
  _id: string
  _type: 'bookingRules'
  defaultPricePerNight: number
  defaultMinimumNights: number
  maximumGuests: number
  advanceBookingDays: number
  depositPercentage: number
  securityDeposit: number
  touristTaxAdult?: number
  touristTaxChild?: number
  checkInTime: string
  checkOutTime: string
  cleaningFee: number
  notes?: string
}

// Fonctions helper pour récupérer les données
export async function getDayPricing(): Promise<DayPricing[]> {
  const allDays = await client.fetch(
    `*[_type == "dayPricing"] | order(_updatedAt desc)`
  )

  // Dédupliquer : garder seulement la version la plus récente de chaque date
  const daysMap = new Map<string, DayPricing>()
  for (const day of allDays) {
    if (!daysMap.has(day.date)) {
      daysMap.set(day.date, day)
    }
  }

  // Retourner triés par date
  return Array.from(daysMap.values()).sort((a, b) => a.date.localeCompare(b.date))
}

export async function getPricingPeriods(): Promise<PricingPeriod[]> {
  return client.fetch(
    `*[_type == "pricingPeriod" && isActive == true] | order(startDate asc)`
  )
}

export async function getBlockedDates(): Promise<BlockedDate[]> {
  return client.fetch(
    `*[_type == "blockedDate" && isActive == true] | order(startDate desc)`
  )
}

export async function getBookingRules(): Promise<BookingRules | null> {
  return client.fetch(`*[_type == "bookingRules"][0]`)
}

// Fonction pour obtenir le prix pour une date donnée
export async function getPriceForDate(date: string): Promise<number | null> {
  // 1. Vérifier si un prix par jour existe (PRIORITAIRE)
  const dayPricings = await getDayPricing()
  const dayPrice = dayPricings.find(d => d.date === date)
  if (dayPrice && dayPrice.pricePerNight !== undefined && dayPrice.pricePerNight !== null) {
    return dayPrice.pricePerNight
  }

  // 2. Vérifier les périodes
  const periods = await getPricingPeriods()
  for (const period of periods) {
    if (date >= period.startDate && date <= period.endDate) {
      return period.pricePerNight
    }
  }

  // 3. Si aucune période ne correspond, retourner le prix par défaut
  const rules = await getBookingRules()
  return rules?.defaultPricePerNight || 150
}

// Fonction pour vérifier si une date est bloquée
export async function isDateBlocked(date: string): Promise<boolean> {
  // 1. Vérifier si un jour spécifique existe et est bloqué (PRIORITAIRE)
  const dayPricings = await getDayPricing()
  const dayPrice = dayPricings.find(d => d.date === date)
  if (dayPrice) {
    return !dayPrice.isAvailable
  }

  // 2. Vérifier les dates bloquées (ancien système)
  const blockedDates = await getBlockedDates()
  return blockedDates.some(
    blocked => date >= blocked.startDate && date <= blocked.endDate
  )
}

// Fonction pour obtenir les nuits minimum pour une période
export async function getMinimumNightsForPeriod(
  startDate: string,
  endDate: string
): Promise<number> {
  // 1. Vérifier si le jour de départ a une règle spécifique (PRIORITAIRE)
  const dayPricings = await getDayPricing()
  const dayPrice = dayPricings.find(d => d.date === startDate)
  if (dayPrice && dayPrice.minimumNights !== undefined && dayPrice.minimumNights !== null) {
    return dayPrice.minimumNights
  }

  // 2. Trouver la période qui chevauche les dates données
  const periods = await getPricingPeriods()
  for (const period of periods) {
    if (
      (startDate >= period.startDate && startDate <= period.endDate) ||
      (endDate >= period.startDate && endDate <= period.endDate) ||
      (startDate <= period.startDate && endDate >= period.endDate)
    ) {
      return period.minimumNights
    }
  }

  // 3. Sinon retourner le minimum par défaut
  const rules = await getBookingRules()
  return rules?.defaultMinimumNights || 2
}

// ==================== HOMEPAGE TYPES ====================

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

export interface HomePageHero {
  location?: string
  title: string
  subtitle?: string
  cta1Text?: string
  cta1Link?: string
  cta2Text?: string
  cta2Link?: string
  promoText?: string
}

export interface HomePageHighlight {
  icon: 'MapPin' | 'Users' | 'Star' | 'Sparkles' | 'Home' | 'Heart'
  label: string
  desc: string
}

export interface HomePageAbout {
  badge?: string
  title?: string
  description1?: string
  description2?: string
  highlights?: HomePageHighlight[]
  galleryImages?: SanityImage[]
  galleryButtonText?: string
  fullGalleryImages?: HomePageGalleryImage[]
}

export interface HomePageJacuzziSection {
  badge?: string
  title?: string
  description?: string
  features?: string[]
  image?: SanityImage
}

export interface HomePageGalleryImage extends SanityImage {
  category?: 'interior' | 'exterior' | 'bedroom' | 'kitchen' | 'bathroom' | 'jacuzzi' | 'garden' | 'view'
}

export interface HomePageFeature {
  icon: 'Home' | 'Map' | 'Calendar' | 'Sparkles' | 'Phone' | 'Mail'
  title: string
  description: string
  href: string
}

export interface HomePageFeaturesSection {
  badge?: string
  title?: string
  features?: HomePageFeature[]
}

export interface HomePageTestimonial {
  name: string
  location?: string
  rating: number
  text: string
  date?: string
}

export interface HomePageTestimonialsSection {
  rating?: string
  reviewCount?: string
  reviewPlatform?: string
  sectionTitle?: string
  testimonials?: HomePageTestimonial[]
  airbnbLinkText?: string
  airbnbLink?: string
}

export interface HomePageSeo {
  metaTitle?: string
  metaDescription?: string
  keywords?: string[]
}

export interface HomePage {
  _id: string
  _type: 'homePage'
  hero?: HomePageHero
  about?: HomePageAbout
  jacuzziSection?: HomePageJacuzziSection
  featuresSection?: HomePageFeaturesSection
  testimonialsSection?: HomePageTestimonialsSection
  seo?: HomePageSeo
}

// Fonction pour récupérer la page d'accueil
export async function getHomePage(): Promise<HomePage | null> {
  return client.fetch(
    `*[_type == "homePage"][0]{
      _id,
      _type,
      hero,
      about{
        badge,
        title,
        description1,
        description2,
        highlights,
        galleryImages[]{
          _type,
          asset,
          alt,
          hotspot
        },
        galleryButtonText,
        fullGalleryImages[]{
          _type,
          asset,
          alt,
          category,
          hotspot
        }
      },
      jacuzziSection{
        badge,
        title,
        description,
        features,
        image{
          _type,
          asset,
          alt,
          hotspot
        }
      },
      featuresSection,
      testimonialsSection,
      seo
    }`
  )
}

// ==================== GITE PAGE TYPES ====================

export interface GitePageHero {
  badge?: string
  title?: string
  subtitle?: string
}

export interface GitePageFeature {
  icon: 'Bed' | 'Users' | 'Maximize2' | 'Sparkles'
  label: string
  desc?: string
}

export interface GitePageDescriptionSection {
  title?: string
  paragraph1?: string
  paragraph2?: string
  features?: GitePageFeature[]
}

export interface GitePageRoom {
  title: string
  size?: string
  description?: string
  image?: SanityImage
}

export interface GitePageRoomsSection {
  badge?: string
  title?: string
  rooms?: GitePageRoom[]
}

export interface GitePageService {
  icon: 'Sparkles' | 'Wind' | 'Utensils' | 'Car'
  title: string
  subtitle?: string
  description?: string
  image?: SanityImage
  highlight?: boolean
}

export interface GitePageServicesSection {
  badge?: string
  title?: string
  services?: GitePageService[]
}

export interface GitePageDetailsSection {
  chambresTitle?: string
  chambresParagraphs?: string[]
  chambresHighlight?: string
  cuisineTitle?: string
  cuisineParagraphs?: string[]
}

export interface GitePageAmenity {
  icon: 'Wifi' | 'Tv' | 'Wind' | 'WashingMachine' | 'Shirt' | 'Bath' | 'Coffee' | 'Zap' | 'PartyPopper' | 'TreePine' | 'Home' | 'Sparkles'
  label: string
  desc?: string
}

export interface GitePageAmenitiesSection {
  badge?: string
  title?: string
  subtitle?: string
  amenities?: GitePageAmenity[]
}

export interface GitePageIncludedSection {
  title?: string
  subtitle?: string
  services?: string[]
}

export interface GitePageInfoSection {
  title?: string
  paragraphs?: string[]
}

export interface GitePageCtaSection {
  title?: string
  subtitle?: string
  button1Text?: string
  button1Link?: string
  button2Text?: string
  button2Link?: string
}

export interface GitePageSeo {
  metaTitle?: string
  metaDescription?: string
  keywords?: string[]
}

export interface GitePage {
  _id: string
  _type: 'gitePage'
  hero?: GitePageHero
  descriptionSection?: GitePageDescriptionSection
  roomsSection?: GitePageRoomsSection
  servicesSection?: GitePageServicesSection
  detailsSection?: GitePageDetailsSection
  amenitiesSection?: GitePageAmenitiesSection
  includedSection?: GitePageIncludedSection
  infoSection?: GitePageInfoSection
  ctaSection?: GitePageCtaSection
  seo?: GitePageSeo
}

// Fonction pour récupérer la page Gîte
export async function getGitePage(): Promise<GitePage | null> {
  return client.fetch(
    `*[_type == "gitePage"][0]{
      _id,
      _type,
      hero,
      descriptionSection,
      roomsSection{
        badge,
        title,
        rooms[]{
          title,
          size,
          description,
          image{
            _type,
            asset,
            alt,
            hotspot
          }
        }
      },
      servicesSection{
        badge,
        title,
        services[]{
          icon,
          title,
          subtitle,
          description,
          highlight,
          image{
            _type,
            asset,
            alt,
            hotspot
          }
        }
      },
      detailsSection,
      amenitiesSection,
      includedSection,
      infoSection,
      ctaSection,
      seo
    }`
  )
}

// ==================== REGION PAGE TYPES ====================

export interface RegionPageHeroSection {
  image?: SanityImage
  badge?: string
  title?: string
  subtitle?: string
}

export interface RegionPageHighlight {
  icon: 'MapPin' | 'Wine' | 'Castle' | 'Mountain' | 'TreePine'
  title: string
  description: string
}

export interface RegionPagePositionSection {
  badge?: string
  title?: string
  description?: string
  highlights?: RegionPageHighlight[]
}

export interface RegionPageVillage {
  name: string
  distance: string
  description: string
  image?: SanityImage
}

export interface RegionPageVillagesSection {
  badge?: string
  title?: string
  villages?: RegionPageVillage[]
}

export interface RegionPageActivity {
  icon: 'Wine' | 'TentTree' | 'Bike' | 'Castle' | 'UtensilsCrossed' | 'Camera' | 'TreePine' | 'Car'
  title: string
  description: string
}

export interface RegionPageActivitiesSection {
  badge?: string
  title?: string
  description?: string
  activities?: RegionPageActivity[]
}

export interface RegionPageSeason {
  season: string
  months: string
  description: string
  activities?: string[]
}

export interface RegionPageSeasonsSection {
  badge?: string
  title?: string
  seasons?: RegionPageSeason[]
}

export interface RegionPageStat {
  value: string
  label: string
}

export interface RegionPageWineRouteSection {
  badge?: string
  title?: string
  paragraphs?: string[]
  stats?: RegionPageStat[]
  image?: SanityImage
}

export interface RegionPageCtaSection {
  title?: string
  text?: string
  button1Text?: string
  button1Link?: string
  button2Text?: string
  button2Link?: string
}

export interface RegionPageSeo {
  metaTitle?: string
  metaDescription?: string
  keywords?: string[]
}

export interface RegionPage {
  _id: string
  _type: 'regionPage'
  heroSection?: RegionPageHeroSection
  positionSection?: RegionPagePositionSection
  villagesSection?: RegionPageVillagesSection
  activitiesSection?: RegionPageActivitiesSection
  seasonsSection?: RegionPageSeasonsSection
  wineRouteSection?: RegionPageWineRouteSection
  ctaSection?: RegionPageCtaSection
  seo?: RegionPageSeo
}

// Fonction pour récupérer la page Région
export async function getRegionPage(): Promise<RegionPage | null> {
  return client.fetch(
    `*[_type == "regionPage"][0]{
      _id,
      _type,
      heroSection{
        badge,
        title,
        subtitle
      },
      positionSection,
      villagesSection{
        badge,
        title,
        villages[]{
          name,
          distance,
          description,
          image{
            _type,
            asset,
            alt,
            hotspot
          }
        }
      },
      activitiesSection,
      seasonsSection,
      wineRouteSection{
        badge,
        title,
        paragraphs,
        stats,
        image{
          _type,
          asset,
          alt,
          hotspot
        }
      },
      ctaSection,
      seo
    }`
  )
}


// ==================== CONTACT PAGE TYPES ====================

export interface ContactPageHeroSection {
  badge?: string
  title?: string
  subtitle?: string
}

export interface ContactPageQuoteSection {
  badge?: string
  title?: string
  description?: string
  promoText?: string
}

export interface ContactPageInfoCard {
  icon: 'MapPin' | 'Phone' | 'Mail' | 'Clock'
  title: string
  content?: string
  link?: string
  linkText?: string
}

export interface ContactPageInfoSection {
  badge?: string
  title?: string
  cards?: ContactPageInfoCard[]
}

export interface ContactPageMapSection {
  title?: string
  description?: string
  embedUrl?: string
}

export interface ContactPageAccessSection {
  carTitle?: string
  carContent?: any[] // blocks
  transitTitle?: string
  transitContent?: any[] // blocks
}

export interface ContactPageCtaSection {
  title?: string
  text?: string
  button1Text?: string
  button1Link?: string
  button2Text?: string
  button2Link?: string
}

export interface ContactPageSeo {
  metaTitle?: string
  metaDescription?: string
  keywords?: string[]
}

export interface ContactPage {
  _id: string
  _type: 'contactPage'
  heroSection?: ContactPageHeroSection
  quoteSection?: ContactPageQuoteSection
  contactInfoSection?: ContactPageInfoSection
  mapSection?: ContactPageMapSection
  accessSection?: ContactPageAccessSection
  ctaSection?: ContactPageCtaSection
  seo?: ContactPageSeo
}

// Fonction pour récupérer la page Contact
export async function getContactPage(): Promise<ContactPage | null> {
  return client.fetch(
    `*[_type == "contactPage"][0]{
      _id,
      _type,
      heroSection,
      quoteSection,
      contactInfoSection,
      mapSection,
      accessSection,
      ctaSection,
      seo
    }`
  )
}

// ==================== LEGAL PAGE TYPES ====================

export interface LegalPage {
  _id: string
  title: string
  content: any
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}

export async function getLegalPage(slug: string): Promise<LegalPage | null> {
  return client.fetch(
    `*[_type == "legalPage" && slug.current == $slug][0]`,
    { slug }
  )
}

// ==================== FOOTER ====================

export interface FooterSettings {
  brandTitle?: string
  brandDescription?: string
  contactTitle?: string
  address?: string
  phone?: string
  email?: string
  linksTitle?: string
  copyright?: string
}

export async function getFooterSettings(): Promise<FooterSettings | null> {
  return client.fetch(
    `*[_type == "footer"][0]`
  )
}


