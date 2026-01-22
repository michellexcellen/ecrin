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

// Images de la galerie About (4 images)
const aboutGalleryImages = [
  { path: 'public/images/salon.webp', alt: 'Salon lumineux avec poutres en bois et canapé confortable' },
  { path: 'public/images/cuisine.jpeg', alt: 'Cuisine moderne équipée avec hublot design' },
  { path: 'public/images/chambre1.jpeg', alt: 'Chambre cosy avec lit double et éclairage tamisé' },
  { path: 'public/images/jaccuzi2.jpeg', alt: 'Jacuzzi extérieur du gîte' },
]

// Image du Jacuzzi pour la section Expérience Exclusive
const jacuzziImage = {
  path: 'public/images/jaccuzi.jpeg',
  alt: 'Jacuzzi extérieur privatif avec vue sur le vignoble',
}

// Toutes les photos de la galerie complète
const fullGalleryImages = [
  { path: 'public/images/salon.webp', alt: 'Salon lumineux avec poutres en bois et canapé confortable', category: 'interior' },
  { path: 'public/images/salon_nuit.webp', alt: "Salon de nuit avec éclairage d'ambiance", category: 'interior' },
  { path: 'public/images/salon2.jpeg', alt: 'Vue alternative du salon', category: 'interior' },
  { path: 'public/images/cuisine.jpeg', alt: 'Cuisine moderne équipée avec hublot design', category: 'kitchen' },
  { path: 'public/images/chambre1.jpeg', alt: 'Chambre 1 cosy avec lit double et éclairage tamisé', category: 'bedroom' },
  { path: 'public/images/chambre2.jpeg', alt: 'Chambre 2 avec deux lits simples', category: 'bedroom' },
  { path: 'public/images/télé_chambre1.jpg', alt: 'Télévision dans la chambre 1', category: 'bedroom' },
  { path: 'public/images/SDB.jpeg', alt: 'Salle de bain moderne', category: 'bathroom' },
  { path: 'public/images/douche.jpeg', alt: 'Douche spacieuse', category: 'bathroom' },
  { path: 'public/images/toilettes.jpeg', alt: 'Toilettes', category: 'bathroom' },
  { path: 'public/images/couloir.jpeg', alt: 'Couloir et rangements', category: 'interior' },
  { path: 'public/images/jaccuzi.jpeg', alt: 'Jacuzzi extérieur 6 places', category: 'jacuzzi' },
  { path: 'public/images/jaccuzi2.jpeg', alt: 'Jacuzzi de nuit', category: 'jacuzzi' },
  { path: 'public/images/garage.jpeg', alt: 'Parking privé sécurisé', category: 'exterior' },
  { path: 'public/images/table.jpg', alt: 'Espace repas', category: 'kitchen' },
  { path: 'public/images/télé.jpg', alt: 'Écran plat salon', category: 'interior' },
  { path: 'public/images/lave_linge.jpeg', alt: 'Lave-linge et sèche-linge', category: 'interior' },
  { path: 'public/images/clim.jpg', alt: 'Climatisation Daikin', category: 'interior' },
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
  console.log('🖼️  Upload des images vers Sanity...\n')

  try {
    // 1. Upload des images de la galerie About (4 images)
    console.log('📷 Upload des images de la galerie "À Propos" (4 images):')
    const galleryImages = []

    for (let i = 0; i < aboutGalleryImages.length; i++) {
      const img = aboutGalleryImages[i]
      console.log(`   Uploading ${path.basename(img.path)}...`)
      const assetId = await uploadImage(img.path)
      galleryImages.push({
        _key: `about_${Date.now()}_${i}`,
        _type: 'image',
        alt: img.alt,
        asset: {
          _type: 'reference',
          _ref: assetId,
        },
      })
      console.log(`   ✓ ${path.basename(img.path)}`)
      await delay(1500)
    }

    // 2. Upload de l'image du Jacuzzi
    console.log('\n🛁 Upload de l\'image du Jacuzzi (section Expérience Exclusive):')
    console.log(`   Uploading ${path.basename(jacuzziImage.path)}...`)
    const jacuzziAssetId = await uploadImage(jacuzziImage.path)
    const jacuzziImageData = {
      _type: 'image',
      alt: jacuzziImage.alt,
      asset: {
        _type: 'reference',
        _ref: jacuzziAssetId,
      },
    }
    console.log(`   ✓ ${path.basename(jacuzziImage.path)}`)
    await delay(1500)

    // 3. Upload des images de la galerie complète
    console.log('\n🖼️  Upload des images de la galerie complète (18 images):')
    const fullGalleryImagesData = []

    for (let i = 0; i < fullGalleryImages.length; i++) {
      const img = fullGalleryImages[i]
      console.log(`   Uploading ${path.basename(img.path)}... (${i + 1}/${fullGalleryImages.length})`)
      const assetId = await uploadImage(img.path)
      fullGalleryImagesData.push({
        _key: `gallery_${Date.now()}_${i}`,
        _type: 'image',
        alt: img.alt,
        category: img.category,
        asset: {
          _type: 'reference',
          _ref: assetId,
        },
      })
      console.log(`   ✓ ${path.basename(img.path)}`)

      if (i < fullGalleryImages.length - 1) {
        await delay(1500)
      }
    }

    // 4. Mettre à jour le document homePage avec toutes les images
    console.log('\n📝 Mise à jour de la page d\'accueil avec toutes les images...')

    await client
      .patch('homePage')
      .set({
        'about.galleryImages': galleryImages,
        'about.fullGalleryImages': fullGalleryImagesData,
        'jacuzziSection.image': jacuzziImageData,
      })
      .commit()

    console.log('\n✅ Terminé!')
    console.log('   ✓ 4 images dans la galerie "À Propos"')
    console.log('   ✓ 1 image pour la section Jacuzzi')
    console.log('   ✓ 18 images dans la galerie complète')
    console.log('\n   Toutes les images sont maintenant gérables depuis Sanity Studio.')
    console.log('   Va sur /studio → Page d\'Accueil pour les voir et les modifier.')

  } catch (error) {
    console.error('❌ Erreur:', error)
    process.exit(1)
  }
}

main()
