import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

// Charger les variables d'environnement
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN!,
})

const homePageData = {
  _id: 'homePage',
  _type: 'homePage',

  // ==================== HERO SECTION ====================
  hero: {
    location: 'Wettolsheim — Alsace',
    title: 'Gîte luxueux avec jacuzzi au Cœur du Vignoble',
    subtitle: "À 10 minutes à pied d'Eguisheim, l'un des plus beaux villages de France, découvrez un havre de paix avec jacuzzi inclus et prestations haut de gamme",
    cta1Text: 'Demander un Devis',
    cta1Link: '/contact',
    cta2Text: 'Découvrir le Gîte',
    cta2Link: '/gite',
    promoText: '💎 Réservez en direct et économisez 20% (sans frais de plateforme, meilleur tarif garanti)',
  },

  // ==================== ABOUT SECTION ====================
  about: {
    badge: 'En quelques mots',
    title: 'Un écrin de douceur sur la Route des Vins',
    description1: "Niché au cœur du village de Wettolsheim, notre gîte vous accueille dans un cadre enchanteur avec des vues imprenables sur le vignoble, le village et la Forêt Noire. Situé au premier étage avec entrée indépendante, dans un parc de 2500 m² au calme absolu.",
    description2: "Tout a été pensé pour votre confort : climatisation Daikin haut de gamme, WiFi fibre très haut débit, linge de maison fourni, lits faits à votre arrivée. Le ménage de fin de séjour et la taxe de séjour sont inclus.",
    highlights: [
      { _key: 'h1', icon: 'MapPin', label: 'Emplacement idéal', desc: 'À 5km de Colmar' },
      { _key: 'h2', icon: 'Users', label: '4 personnes max', desc: 'Idéal en famille' },
      { _key: 'h3', icon: 'Star', label: 'Haut de gamme', desc: 'Prestations luxe' },
      { _key: 'h4', icon: 'Sparkles', label: 'Jacuzzi inclus', desc: "Ouvert toute l'année" },
    ],
    galleryButtonText: 'Afficher toutes les photos',
    // Note: Les images de galerie seront uploadées via upload-homepage-images.ts
  },

  // ==================== JACUZZI / EXPERIENCE EXCLUSIVE SECTION ====================
  jacuzziSection: {
    badge: 'Expérience Exclusive',
    title: 'Jacuzzi Privatif',
    description: "Profitez de moments de détente absolue dans notre jacuzzi extérieur 6 places, ouvert toute l'année. Intégré dans une terrasse aménagée dans le parc.",
    features: ['6 places', "Ouvert toute l'année", 'Accès privatif'],
    // Note: L'image sera uploadée via upload-homepage-images.ts
  },

  // ==================== FULL GALLERY ====================
  fullGallery: {
    // Note: Les images seront uploadées via upload-homepage-images.ts
  },

  // ==================== FEATURES SECTION ====================
  featuresSection: {
    badge: 'Découvrez',
    title: 'Votre séjour en Alsace',
    features: [
      {
        _key: 'f1',
        icon: 'Home',
        title: 'Le Gîte',
        description: '2 chambres, jacuzzi 6 places, salon spacieux, cuisine équipée, 4 personnes, nombreux rangements',
        href: '/gite',
      },
      {
        _key: 'f2',
        icon: 'Map',
        title: 'La Région',
        description: 'Route des Vins, Colmar, Eguisheim, activités en Alsace',
        href: '/tourisme',
      },
      {
        _key: 'f3',
        icon: 'Calendar',
        title: 'Réserver',
        description: 'Demandez votre devis personnalisé en quelques clics',
        href: '/contact',
      },
    ],
  },

  // ==================== TESTIMONIALS SECTION ====================
  testimonialsSection: {
    rating: '5,0',
    reviewCount: '24 avis',
    reviewPlatform: 'sur Airbnb',
    sectionTitle: 'Ce que disent nos hôtes',
    testimonials: [
      {
        _key: 't1',
        name: 'IChieh',
        location: '7 ans sur Airbnb',
        rating: 5,
        text: "Il s'agit d'une très belle maison avec un excellent éclairage, entièrement équipée et un stationnement facile ! Et Michel et sa femme sont des hôtes très sympathiques ! Le vignoble voisin est spectaculaire, et j'ai trouvé les lampadaires ici particulièrement beaux. Notre famille de quatre personnes y a séjourné quatre nuits pour explorer Colmar et Eguisheim, et nous avons adoré !",
        date: 'Novembre 2025',
      },
      {
        _key: 't2',
        name: 'Madeleine',
        location: 'Bonstetten, Suisse',
        rating: 5,
        text: "Notre séjour chez Michel et Anne était magnifique. Nous avons été très bien accueillis, nous avons même pu entrer dans l'appartement le matin. Ils nous ont expliqué tout ce qui était nécessaire pour l'appartement et l'équipement. Nous avons reçu de précieux conseils sur les environs et les restaurants. Ils nous ont gâtés avec une bouteille de Crémant d'Alsace et quelque chose de sucré. Après nos explorations de la journée, nous nous sommes réjouis du jacuzzi dans le jardin. L'appartement est vraiment un bijou et est équipé de tout ce que vous pouvez souhaiter.",
        date: 'Octobre 2025',
      },
      {
        _key: 't3',
        name: 'Tanja',
        location: '1 an sur Airbnb',
        rating: 5,
        text: "Nous avons passé dix jours merveilleux dans l'appartement de Michel ! Nos hôtes étaient très accommodants et nous ont donné des conseils détaillés sur l'appartement et les restaurants et les vignobles de la région. On peut aussi laisser la voiture et faire des promenades, des randonnées et des balades à vélo dans les vignes, dans la forêt, à Eguisheim et Colmar. Une région très agréable et un hébergement accueillant, confortable et chaleureux. Nous reviendrons avec plaisir !",
        date: 'Octobre 2025',
      },
      {
        _key: 't4',
        name: 'Adriana',
        location: '4 ans sur Airbnb',
        rating: 5,
        text: "Nous étions une famille de quatre personnes qui se sont senties comme à la maison et avons beaucoup apprécié de visiter la région de l'Alsace et plus encore à cette période de Noël. L'appartement de Michel & Anne est très agréable, moderne, entièrement équipé et tout à fait conforme aux photos de leur annonce. Ils ont été très gentils de nous accueillir et de nous expliquer en détail tout sur la maison, l'emplacement et les choses à faire dans la région.",
        date: 'Décembre 2025',
      },
    ],
    airbnbLinkText: 'Voir tous les avis sur Airbnb',
    airbnbLink: 'https://www.airbnb.fr/rooms/1281724811283528938/reviews',
  },

  // ==================== SEO ====================
  seo: {
    metaTitle: "l'écrin du vignoble | Gîte de Charme avec Jacuzzi en Alsace - Wettolsheim",
    metaDescription: "Gîte haut de gamme 4 personnes avec jacuzzi privatif au cœur du vignoble alsacien. À 10 min d'Eguisheim, 5 km de Colmar. Prestations luxe, vue vignoble, parking privé.",
    keywords: [
      'gîte Alsace',
      'location vacances Colmar',
      'gîte avec jacuzzi Alsace',
      'hébergement Eguisheim',
      'Route des Vins',
      'gîte de charme Wettolsheim',
      'location haut de gamme Alsace',
    ],
  },
}

async function seedHomePage() {
  console.log('🚀 Insertion des données de la page d\'accueil dans Sanity...\n')

  try {
    // Créer ou mettre à jour le document
    const result = await client.createOrReplace(homePageData)

    console.log('✅ Page d\'accueil créée avec succès!')
    console.log(`   ID: ${result._id}`)
    console.log('\n📝 Données insérées:')
    console.log('   - Hero Section: ✓')
    console.log('   - About Section: ✓')
    console.log('   - Features Section: ✓')
    console.log('   - Testimonials Section: ✓')
    console.log('   - SEO: ✓')
    console.log('\n⚠️  Note: Les images de la galerie "À Propos" doivent être')
    console.log('   ajoutées manuellement via le studio Sanity (/studio)')
    console.log('\n🎉 Terminé! Rendez-vous sur /studio pour voir et modifier le contenu.')

  } catch (error) {
    console.error('❌ Erreur lors de l\'insertion:', error)
    process.exit(1)
  }
}

seedHomePage()
