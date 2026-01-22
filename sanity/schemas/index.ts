// Calendrier & Réservations
import pricingPeriod from './pricingPeriod'
import blockedDate from './blockedDate'
import bookingRules from './bookingRules'
import dayPricing from './dayPricing'
import pricingRule from './pricingRule'

// Pages
import homePage from './pages/homePage'
import gitePage from './pages/gitePage'
import regionPage from './pages/regionPage'
import contactPage from './pages/contactPage'
import aboutPage from './pages/aboutPage'
import generalSettings from './pages/generalSettings'
import legalPage from './pages/legalPage'
import footer from './footer'

export const schemaTypes = [
  // Pages
  homePage,
  gitePage,
  regionPage,
  contactPage,
  aboutPage,
  generalSettings,
  legalPage,
  footer,

  // Calendrier
  dayPricing,
  pricingPeriod,
  blockedDate,
  bookingRules,
  pricingRule,
]
