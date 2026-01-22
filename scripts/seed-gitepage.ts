import { createClient } from '@sanity/client'
import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN!,
})

// Images à uploader
const imagesToUpload = [
  // Rooms
  { key: 'cuisine', path: 'public/images/cuisine.jpeg', alt: 'Cuisine moderne entièrement équipée avec hublot design' },
  { key: 'salon', path: 'public/images/salon.webp', alt: 'Salon chaleureux avec TV 50 pouces et poutres apparentes' },
  { key: 'chambre1', path: 'public/images/chambre1.jpeg', alt: 'Chambre principale avec lit double 160 cm et TV Samsung Frame' },
  { key: 'chambre2', path: 'public/images/chambre2.jpeg', alt: 'Chambre sous combles avec deux lits simples modulables' },
  { key: 'sdb', path: 'public/images/SDB.jpeg', alt: 'Salle de bain moderne avec douche' },
  // Services
  { key: 'jacuzzi', path: 'public/images/jaccuzi.jpeg', alt: 'Jacuzzi extérieur 6 places' },
  { key: 'clim', path: 'public/images/clim.jpg', alt: 'Climatisation Daikin haut de gamme' },
  { key: 'table', path: 'public/images/table.jpg', alt: 'Terrasse avec table et vue sur le vignoble' },
  { key: 'garage', path: 'public/images/garage.jpeg', alt: 'Parking privé sécurisé' },
]

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function uploadImage(filePath: string, retries = 3): Promise<string> {
  const fullPath = path.join(process.cwd(), filePath)

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Fichier non trouvé: ${fullPath}`)
  }

  const fileBuffer = fs.readFileSync(fullPath)
  const fileName = path.basename(filePath)

  for (let i = 0; i < retries; i++) {
    try {
      const asset = await client.assets.upload('image', fileBuffer, {
        filename: fileName,
      })
      return asset._id
    } catch (error) {
      if (i < retries - 1) {
        console.log(`   Retry ${i + 1}/${retries}...`)
        await delay(2000)
      } else {
        throw error
      }
    }
  }
  throw new Error('Upload failed after retries')
}

async function main() {
  console.log('🏠 Configuration de la page Le Gîte dans Sanity...\n')

  try {
    // 1. Upload des images
    console.log('📷 Upload des images...')
    const uploadedImages: Record<string, string> = {}

    for (const img of imagesToUpload) {
      console.log(`   Uploading ${path.basename(img.path)}...`)
      const assetId = await uploadImage(img.path)
      uploadedImages[img.key] = assetId
      console.log(`   ✓ ${img.key}`)
      await delay(1000)
    }

    // 2. Créer les données de la page
    console.log('\n📝 Création des données...')

    const gitePageData = {
      _id: 'gitePage',
      _type: 'gitePage',

      // Hero
      hero: {
        badge: 'Le Gîte',
        title: 'Un Appartement Pensé pour Votre Confort',
        subtitle: 'Prestations haut de gamme dans un cadre enchanteur avec vue sur le vignoble',
      },

      // Description
      descriptionSection: {
        title: 'Un Écrin au Cœur du Vignoble',
        paragraph1: "l'écrin du vignoble est prévu pour 4 personnes et idéal pour une famille. Situé à Wettolsheim au cœur du vignoble et à 10 minutes à pied d'Eguisheim, un des plus beaux villages de France. Vous êtes à 5 km du centre de Colmar.",
        paragraph2: "L'appartement est attenant au logement du propriétaire avec une entrée indépendante au premier étage dans un parc de 2500 m² au calme absolu. Profitez de vues imprenables sur le vignoble, le village et la Forêt Noire.",
        features: [
          { _key: 'f1', icon: 'Bed', label: '2 chambres + canapé-lit', desc: '4 personnes max' },
          { _key: 'f2', icon: 'Users', label: '4 personnes', desc: '' },
          { _key: 'f3', icon: 'Maximize2', label: 'Grand espace', desc: 'Confort optimal' },
          { _key: 'f4', icon: 'Sparkles', label: 'Jacuzzi privatif', desc: '6 places' },
        ],
      },

      // Rooms
      roomsSection: {
        badge: 'Les Espaces',
        title: 'Chambres et Pièces de Vie',
        rooms: [
          {
            _key: 'r1',
            title: 'Cuisine',
            size: 'Équipée',
            description: 'Tout le nécessaire fourni : vaisselle, électroménager, condiments',
            image: {
              _type: 'image',
              alt: imagesToUpload.find(i => i.key === 'cuisine')!.alt,
              asset: { _type: 'reference', _ref: uploadedImages['cuisine'] },
            },
          },
          {
            _key: 'r2',
            title: 'Salon',
            size: 'Spacieux',
            description: 'TV Samsung 50 pouces, canapé convertible 160 cm',
            image: {
              _type: 'image',
              alt: imagesToUpload.find(i => i.key === 'salon')!.alt,
              asset: { _type: 'reference', _ref: uploadedImages['salon'] },
            },
          },
          {
            _key: 'r3',
            title: 'Chambre 1',
            size: '12 m²',
            description: 'Lit double 160 cm avec TV Samsung Frame',
            image: {
              _type: 'image',
              alt: imagesToUpload.find(i => i.key === 'chambre1')!.alt,
              asset: { _type: 'reference', _ref: uploadedImages['chambre1'] },
            },
          },
          {
            _key: 'r4',
            title: 'Chambre 2',
            size: 'Sous combles',
            description: 'Deux lits de 90 cm pouvant former un grand lit double',
            image: {
              _type: 'image',
              alt: imagesToUpload.find(i => i.key === 'chambre2')!.alt,
              asset: { _type: 'reference', _ref: uploadedImages['chambre2'] },
            },
          },
          {
            _key: 'r5',
            title: 'Salle de bain',
            size: 'Moderne',
            description: "Salle de bain spacieuse avec douche à l'italienne",
            image: {
              _type: 'image',
              alt: imagesToUpload.find(i => i.key === 'sdb')!.alt,
              asset: { _type: 'reference', _ref: uploadedImages['sdb'] },
            },
          },
        ],
      },

      // Services
      servicesSection: {
        badge: 'Prestations',
        title: "Équipements d'Exception",
        services: [
          {
            _key: 's1',
            icon: 'Sparkles',
            title: 'Jacuzzi Extérieur',
            subtitle: "6 places - Ouvert toute l'année",
            description: "Profitez d'un jacuzzi privatif 6 places intégré dans une terrasse aménagée dans le parc. Ouvert toute l'année pour des moments de détente inoubliables.",
            highlight: true,
            image: {
              _type: 'image',
              alt: imagesToUpload.find(i => i.key === 'jacuzzi')!.alt,
              asset: { _type: 'reference', _ref: uploadedImages['jacuzzi'] },
            },
          },
          {
            _key: 's2',
            icon: 'Wind',
            title: 'Climatisation Haut de Gamme',
            subtitle: '2 cassettes DAIKIN',
            description: 'Le gîte est climatisé par deux cassettes haut de gamme DAIKIN pour garantir votre confort en toutes saisons, été comme hiver.',
            highlight: false,
            image: {
              _type: 'image',
              alt: imagesToUpload.find(i => i.key === 'clim')!.alt,
              asset: { _type: 'reference', _ref: uploadedImages['clim'] },
            },
          },
          {
            _key: 's3',
            icon: 'Utensils',
            title: 'Terrasse avec Barbecue',
            subtitle: 'Mobilier de jardin',
            description: 'Terrasse équipée avec table et chaises pour profiter de la vue sur le vignoble. Barbecue électrique à disposition pour vos repas en plein air.',
            highlight: false,
            image: {
              _type: 'image',
              alt: imagesToUpload.find(i => i.key === 'table')!.alt,
              asset: { _type: 'reference', _ref: uploadedImages['table'] },
            },
          },
          {
            _key: 's4',
            icon: 'Car',
            title: 'Parking Privatif',
            subtitle: 'Borne de recharge électrique',
            description: 'Aucun problème de stationnement. Parking privatif pouvant accueillir plusieurs voitures. Borne de recharge pour véhicules électriques à disposition.',
            highlight: false,
            image: {
              _type: 'image',
              alt: imagesToUpload.find(i => i.key === 'garage')!.alt,
              asset: { _type: 'reference', _ref: uploadedImages['garage'] },
            },
          },
        ],
      },

      // Details
      detailsSection: {
        chambresTitle: 'Les Chambres',
        chambresParagraphs: [
          'Une première chambre de 12 m² comporte un lit de 160 cm avec une TV Samsung Frame pour vos moments de détente. De nombreux rangements sont disponibles.',
          'Une deuxième chambre très grande comporte deux lits de 90 cm formant un seul grand lit pour les couples. Elle est située sous comble et n\'est pas adaptée pour les personnes de très grande taille. Elle comporte également un téléviseur.',
          'Il est possible de dormir dans la partie salon sur le canapé convertible de 160 cm pour ceux qui préfèrent.',
        ],
        chambresHighlight: 'Les lits sont faits à votre arrivée, le linge de toilette et de maison sont fournis.',
        cuisineTitle: 'Cuisine & Commodités',
        cuisineParagraphs: [
          'La cuisine entièrement équipée dispose de tout le nécessaire : vaisselle complète, électroménager, ustensiles de cuisine.',
          'Nous avons prévu le vinaigre, huile, sel et poivre, moutarde et ketchup pour simplifier votre logistique.',
          'Également à disposition : sèche-cheveux, set de nettoyage de dépannage, nombreux équipements pour rendre votre séjour le plus confortable possible.',
        ],
      },

      // Amenities
      amenitiesSection: {
        badge: 'Tout Compris',
        title: 'Tous les Équipements',
        subtitle: 'Tout a été pensé pour votre confort et pour simplifier votre séjour',
        amenities: [
          { _key: 'a1', icon: 'Wifi', label: 'WiFi Fibre', desc: 'Très haut débit gratuit' },
          { _key: 'a2', icon: 'Tv', label: '3 Téléviseurs', desc: "Samsung Frame & 50'" },
          { _key: 'a3', icon: 'Wind', label: 'Climatisation', desc: '2 cassettes Daikin' },
          { _key: 'a4', icon: 'WashingMachine', label: 'Lave-linge', desc: 'Et sèche-linge' },
          { _key: 'a5', icon: 'Shirt', label: 'Linge fourni', desc: 'Maison et toilette' },
          { _key: 'a6', icon: 'Bath', label: 'Lits faits', desc: "À l'arrivée" },
          { _key: 'a7', icon: 'Coffee', label: 'Condiments', desc: 'Huile, sel, vinaigre...' },
          { _key: 'a8', icon: 'Zap', label: 'Fer à repasser', desc: 'Table et fer' },
          { _key: 'a9', icon: 'PartyPopper', label: 'Jeux de société', desc: 'Pour toute la famille' },
          { _key: 'a10', icon: 'TreePine', label: 'Parc 2500 m²', desc: 'Calme absolu' },
          { _key: 'a11', icon: 'Home', label: 'Ménage inclus', desc: 'Fin de séjour' },
          { _key: 'a12', icon: 'Sparkles', label: 'Jacuzzi 6 places', desc: "Ouvert toute l'année" },
        ],
      },

      // Included Services
      includedSection: {
        title: 'Services Inclus',
        subtitle: 'Pour un séjour sans surprise, ces prestations sont comprises dans le tarif',
        services: [
          'Ménage de fin de séjour',
          'Taxe de séjour',
          'Linge de maison et de toilette',
          "Lits faits à l'arrivée",
          'Accueil par les hôtes',
          'Set de nettoyage de dépannage',
        ],
      },

      // Info
      infoSection: {
        title: 'Informations Importantes',
        paragraphs: [
          "L'accueil se fait par les hôtes de la maison. L'appartement garantit un très bon niveau de confort.",
          "Cependant, il n'est pas adapté aux personnes ayant de grosses difficultés à monter les escaliers pour accéder au gîte (entrée au premier étage).",
        ],
      },

      // CTA
      ctaSection: {
        title: 'Prêt à Réserver ?',
        subtitle: 'Découvrez la région alsacienne ou demandez directement votre devis personnalisé',
        button1Text: 'Découvrir la Région',
        button1Link: '/tourisme',
        button2Text: 'Demander un Devis',
        button2Link: '/contact',
      },

      // SEO
      seo: {
        metaTitle: "Le Gîte - l'écrin du vignoble | Appartement 4 Personnes avec Jacuzzi en Alsace",
        metaDescription: "Découvrez notre gîte haut de gamme de 4 personnes à Wettolsheim : 2 chambres confortables, salon spacieux avec TV 50', cuisine équipée, jacuzzi extérieur 6 places, climatisation Daikin, WiFi fibre. Linge fourni, lits faits à l'arrivée.",
        keywords: [
          'gîte 4 personnes Alsace',
          'appartement Wettolsheim',
          'location meublée Colmar',
          'gîte 2 chambres Alsace',
          'hébergement familial Route des Vins',
          'gîte jacuzzi Alsace',
        ],
      },
    }

    // 3. Insérer dans Sanity
    console.log('\n📤 Insertion dans Sanity...')
    await client.createOrReplace(gitePageData)

    console.log('\n✅ Page Le Gîte configurée avec succès!')
    console.log('   - Hero: ✓')
    console.log('   - Description: ✓')
    console.log('   - 5 Espaces/Pièces avec images: ✓')
    console.log('   - 4 Services avec images: ✓')
    console.log('   - Détails (Chambres & Cuisine): ✓')
    console.log('   - 12 Équipements: ✓')
    console.log('   - 6 Services inclus: ✓')
    console.log('   - Infos importantes: ✓')
    console.log('   - CTA: ✓')
    console.log('   - SEO: ✓')
    console.log('\n🎉 Va sur /studio → Page Le Gîte pour modifier le contenu!')

  } catch (error) {
    console.error('❌ Erreur:', error)
    process.exit(1)
  }
}

main()
