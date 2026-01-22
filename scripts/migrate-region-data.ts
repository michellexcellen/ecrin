
import { createClient } from 'next-sanity'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset || !token) {
    console.error('Missing environment variables. Please check .env.local')
    console.error('Required: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN')
    process.exit(1)
}

const client = createClient({
    projectId,
    dataset,
    token,
    apiVersion: '2024-01-01',
    useCdn: false,
})

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images')

async function uploadImage(filename: string) {
    const filePath = path.join(IMAGES_DIR, filename)
    if (!fs.existsSync(filePath)) {
        console.warn(`Image not found: ${filePath}`)
        return null
    }

    try {
        const buffer = fs.readFileSync(filePath)
        const asset = await client.assets.upload('image', buffer, {
            filename: filename
        })
        console.log(`Uploaded ${filename}: ${asset._id}`)
        return {
            _type: 'image',
            asset: {
                _type: 'reference',
                _ref: asset._id
            },
            alt: filename.split('.')[0] // simple default alt
        }
    } catch (error) {
        console.error(`Failed to upload ${filename}:`, error)
        return null
    }
}

async function migrate() {
    console.log('Starting migration for Region Page...')

    // Upload Images
    const heroImage = await uploadImage('fall.webp')
    const eguisheimImage = await uploadImage('eguisheim.jpg')
    const colmarImage = await uploadImage('colmar.jpg')
    const riquewihrImage = await uploadImage('riquewir.jpg')
    const kaysersbergImage = await uploadImage('kaysersberg.jpg')
    const wineImage = await uploadImage('vin.jpg')

    // Construct Document
    const doc = {
        _id: 'regionPage',
        _type: 'regionPage',

        // Hero
        heroSection: {
            image: heroImage,
            badge: 'La Région',
            title: "Découvrez l'Alsace Authentique",
            subtitle: "Au cœur de la Route des Vins, entre Vosges et Forêt Noire, explorez un territoire d'exception"
        },

        // Position
        positionSection: {
            badge: 'Situation',
            title: 'Un Emplacement Privilégié',
            description: "Le gîte l'écrin du vignoble est situé à Wettolsheim, au cœur du vignoble alsacien, dans un cadre enchanteur avec des vues sur le vignoble, le village et la Forêt Noire.",
            highlights: [
                {
                    icon: 'MapPin',
                    title: 'Emplacement Idéal',
                    description: "Au cœur du vignoble alsacien, à 10 min à pied d'Eguisheim et 5 km de Colmar",
                    _key: 'h1'
                },
                {
                    icon: 'Wine',
                    title: 'Route des Vins',
                    description: "Sur la célèbre Route des Vins d'Alsace, entouré de vignobles et domaines viticoles",
                    _key: 'h2'
                },
                {
                    icon: 'Castle',
                    title: 'Villages de Charme',
                    description: "Eguisheim, Riquewihr, Kaysersberg... Les plus beaux villages de France à proximité",
                    _key: 'h3'
                },
                {
                    icon: 'Mountain',
                    title: 'Nature & Randonnées',
                    description: "Accès direct aux sentiers viticoles et aux Vosges pour les amateurs de nature",
                    _key: 'h4'
                },
            ]
        },

        // Villages
        villagesSection: {
            badge: 'À Proximité',
            title: 'Villages & Villes à Visiter',
            villages: [
                {
                    name: 'Eguisheim',
                    distance: '10 min à pied',
                    description: "L'un des plus beaux villages de France, avec ses ruelles circulaires et ses maisons à colombages",
                    image: eguisheimImage,
                    _key: 'v1'
                },
                {
                    name: 'Colmar',
                    distance: '5 km',
                    description: "La capitale des Vins d'Alsace, la Petite Venise, musées et architecture exceptionnelle",
                    image: colmarImage,
                    _key: 'v2'
                },
                {
                    name: 'Riquewihr',
                    distance: '15 km',
                    description: "Village médiéval fortifié classé parmi les plus beaux villages de France",
                    image: riquewihrImage,
                    _key: 'v3'
                },
                {
                    name: 'Kaysersberg',
                    distance: '20 km',
                    description: "Village natal d'Albert Schweitzer, marché de Noël réputé, architecture remarquable",
                    image: kaysersbergImage,
                    _key: 'v4'
                },
            ]
        },

        // Activities
        activitiesSection: {
            badge: 'Activités',
            title: 'Que Faire en Alsace ?',
            description: "Une multitude d'activités vous attend pour découvrir la richesse de notre région",
            activities: [
                {
                    icon: 'Wine',
                    title: 'Dégustation de Vins',
                    description: "Visitez les caves et domaines viticoles environnants. Découvrez les Grands Crus d'Alsace.",
                    _key: 'a1'
                },
                {
                    icon: 'TentTree',
                    title: 'Randonnées',
                    description: "Sentiers balisés dans les vignes et les Vosges. Du GR5 aux balades familiales.",
                    _key: 'a2'
                },
                {
                    icon: 'Bike',
                    title: 'Vélo & Cyclotourisme',
                    description: "Parcourez la Route des Vins à vélo. Pistes cyclables et circuits aménagés.",
                    _key: 'a3'
                },
                {
                    icon: 'Castle',
                    title: 'Châteaux & Patrimoine',
                    description: "Haut-Koenigsbourg, châteaux d'Eguisheim, patrimoine médiéval exceptionnel.",
                    _key: 'a4'
                },
                {
                    icon: 'UtensilsCrossed',
                    title: 'Gastronomie',
                    description: "Restaurants étoilés, winstubs traditionnels, spécialités alsaciennes authentiques.",
                    _key: 'a5'
                },
                {
                    icon: 'Camera',
                    title: 'Marchés de Noël',
                    description: "Colmar, Riquewihr, Kaysersberg... Les plus beaux marchés de Noël d'Europe (décembre).",
                    _key: 'a6'
                },
                {
                    icon: 'TreePine',
                    title: 'Nature & Forêts',
                    description: "Parc naturel des Ballons des Vosges, forêts, lacs et panoramas exceptionnels.",
                    _key: 'a7'
                },
                {
                    icon: 'Car',
                    title: 'Musées & Loisirs',
                    description: "Musée de l'Automobile, Cité du Train (Mulhouse), ou Europa-Park à proximité.",
                    _key: 'a8'
                },
            ]
        },

        // Seasons
        seasonsSection: {
            badge: "Toute l'Année",
            title: "L'Alsace au Fil des Saisons",
            seasons: [
                {
                    season: "Printemps",
                    months: "Mars - Mai",
                    description: "Floraison des vignes, températures douces, nature en éveil",
                    activities: ["Randonnées", "Visites de caves", "Balades à vélo"],
                    _key: 's1'
                },
                {
                    season: "Été",
                    months: "Juin - Août",
                    description: "Vignes verdoyantes, festivals, terrasses ensoleillées",
                    activities: ["Fêtes du vin", "Randonnées en montagne", "Baignade dans les lacs"],
                    _key: 's2'
                },
                {
                    season: "Automne",
                    months: "Septembre - Novembre",
                    description: "Vendanges, couleurs flamboyantes, douceur automnale",
                    activities: ["Vendanges", "Dégustation vin nouveau", "Cueillette champignons"],
                    _key: 's3'
                },
                {
                    season: "Hiver",
                    months: "Décembre - Février",
                    description: "Marchés de Noël magiques, gastronomie réconfortante",
                    activities: ["Marchés de Noël", "Ski dans les Vosges", "Gastronomie d'hiver"],
                    _key: 's4'
                },
            ]
        },

        // Wine Route
        wineRouteSection: {
            badge: 'Route des Vins',
            title: "Sur la Légendaire Route des Vins d'Alsace",
            paragraphs: [
                "Le gîte est idéalement situé sur la Route des Vins d'Alsace, itinéraire touristique mythique qui s'étend sur 170 km à travers les plus beaux villages viticoles.",
                "Découvrez les 7 cépages alsaciens : Riesling, Gewurztraminer, Pinot Gris, Muscat, Sylvaner, Pinot Blanc et Pinot Noir. Visitez les caves, rencontrez les vignerons passionnés.",
                "De nombreux domaines viticoles renommés vous accueillent pour des dégustations et des visites de caves dans un rayon de quelques kilomètres.",
            ],
            stats: [
                { value: '51', label: 'Grands Crus', _key: 'st1' },
                { value: '170 km', label: 'Route des Vins', _key: 'st2' },
            ],
            image: wineImage
        },

        // CTA
        ctaSection: {
            title: "Prêt à Découvrir l'Alsace ?",
            text: "Réservez votre séjour au cœur du vignoble et vivez une expérience inoubliable",
            button1Text: "Découvrir le Gîte",
            button1Link: "/gite",
            button2Text: "Demander un Devis",
            button2Link: "/contact"
        },

        // SEO
        seo: {
            metaTitle: "Tourisme & Région - l'écrin du vignoble | Route des Vins, Colmar, Eguisheim",
            metaDescription: "Découvrez l'Alsace depuis Wettolsheim : à 10 min d'Eguisheim (plus beau village de France), 5 km de Colmar, sur la Route des Vins. Châteaux, vignobles, gastronomie, randonnées.",
            keywords: [
                "Route des Vins Alsace",
                "Eguisheim",
                "Colmar tourisme",
                "villages alsaciens",
                "vignoble Alsace",
                "activités Alsace",
                "randonnée Alsace",
                "châteaux Alsace",
            ]
        }
    }

    // Rewrite document
    try {
        const res = await client.createOrReplace(doc)
        console.log('Migration successful! Document ID:', res._id)
    } catch (err) {
        console.error('Migration failed:', err)
    }
}

migrate()
