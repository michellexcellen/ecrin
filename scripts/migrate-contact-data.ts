
import { createClient } from 'next-sanity'
import dotenv from 'dotenv'

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

async function migrate() {
    console.log('Starting migration for Contact Page...')

    const doc = {
        _id: 'contactPage',
        _type: 'contactPage',

        // Hero
        heroSection: {
            badge: 'Contact',
            title: 'Réservez Votre Séjour',
            subtitle: 'Calculez votre devis en ligne ou contactez-nous directement'
        },

        // Quote
        quoteSection: {
            badge: 'Devis en Ligne',
            title: 'Calculez Votre Estimation',
            description: 'Obtenez une estimation personnalisée en quelques clics. Tarif dégressif selon la durée de votre séjour.',
            promoText: '💎 Réservez en direct et économisez 20% (sans frais de plateforme, meilleur tarif garanti)'
        },

        // Contact Info
        contactInfoSection: {
            badge: 'Nous Contacter',
            title: 'Informations de Contact',
            cards: [
                {
                    icon: 'MapPin',
                    title: 'Adresse',
                    content: "l'écrin du vignoble\n68920 Wettolsheim\nAlsace, France",
                    _key: 'c1'
                },
                {
                    icon: 'Phone',
                    title: 'Téléphone',
                    link: 'tel:+33681842554',
                    linkText: '+33 6 81 84 25 54',
                    _key: 'c2'
                },
                {
                    icon: 'Mail',
                    title: 'Email',
                    link: 'mailto:lexcellent.michel@orange.fr',
                    linkText: 'lexcellent.michel@orange.fr',
                    _key: 'c3'
                },
                {
                    icon: 'Clock',
                    title: 'Horaires',
                    content: "Arrivée : 16h00\nDépart : 10h00\n(Modulable selon disponibilité)",
                    _key: 'c4'
                },
            ]
        },

        // Map
        mapSection: {
            title: 'Comment Nous Trouver',
            description: "Au cœur du vignoble alsacien, à 10 minutes à pied d'Eguisheim et 5 km de Colmar",
            embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21496.562287936!2d7.2775!3d48.0567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479163c3e64c3af9%3A0x40a5fb99a3b7c60!2s68920%20Wettolsheim%2C%20France!5e0!3m2!1sfr!2sfr!4v1234567890"
        },

        // Access
        accessSection: {
            carTitle: 'Accès en Voiture',
            carContent: [
                {
                    _type: 'block',
                    style: 'normal',
                    children: [
                        { _type: 'span', text: 'Depuis Colmar', marks: ['strong'] },
                        { _type: 'span', text: ' : 5 km, environ 10 minutes par la D417' }
                    ]
                },
                {
                    _type: 'block',
                    style: 'normal',
                    children: [
                        { _type: 'span', text: 'Depuis Strasbourg', marks: ['strong'] },
                        { _type: 'span', text: ' : 70 km, environ 1h par l\'A35 puis D83' }
                    ]
                },
                {
                    _type: 'block',
                    style: 'normal',
                    children: [
                        { _type: 'span', text: 'Depuis Mulhouse', marks: ['strong'] },
                        { _type: 'span', text: ' : 60 km, environ 50 min par l\'A35' }
                    ]
                },
                {
                    _type: 'block',
                    style: 'normal',
                    children: [
                        { _type: 'span', text: 'Depuis Bâle (Suisse)', marks: ['strong'] },
                        { _type: 'span', text: ' : 80 km, environ 1h par l\'A35' }
                    ]
                },
                {
                    _type: 'block',
                    style: 'normal',
                    children: [
                        { _type: 'span', text: 'Parking privé avec borne de recharge pour véhicules électriques', marks: ['strong'] }
                    ]
                }
            ],
            transitTitle: 'Transports en Commun',
            transitContent: [
                {
                    _type: 'block',
                    style: 'normal',
                    children: [
                        { _type: 'span', text: 'Gare la plus proche', marks: ['strong'] },
                        { _type: 'span', text: ' : Colmar (5 km)\nTGV depuis Paris Gare de l\'Est (2h30)' }
                    ]
                },
                {
                    _type: 'block',
                    style: 'normal',
                    children: [
                        { _type: 'span', text: 'Aéroports', marks: ['strong'] },
                        { _type: 'span', text: ' :\n- EuroAirport Bâle-Mulhouse (60 km)\n- Strasbourg-Entzheim (75 km)' }
                    ]
                },
                {
                    _type: 'block',
                    style: 'normal',
                    children: [
                        { _type: 'span', text: 'Bus', marks: ['strong'] },
                        { _type: 'span', text: ' : Lignes régulières depuis Colmar vers Wettolsheim' }
                    ]
                },
            ]
        },

        // CTA
        ctaSection: {
            title: "Une Question ?",
            text: "N'hésitez pas à nous contacter, nous vous répondrons dans les plus brefs délais",
            button1Text: "Nous Appeler",
            button1Link: "tel:+33681842554",
            button2Text: "Nous Écrire",
            button2Link: "mailto:lexcellent.michel@orange.fr"
        },

        // SEO
        seo: {
            metaTitle: "Contact & Réservation - l'écrin du vignoble | Demandez votre Devis",
            metaDescription: "Contactez-nous pour réserver votre séjour au gîte l'écrin du vignoble à Wettolsheim. Calculateur de devis en ligne, réponse rapide. Gîte 4 personnes avec jacuzzi en Alsace.",
            keywords: [
                "réservation gîte Alsace",
                "devis location Wettolsheim",
                "contact gîte Colmar",
                "réserver hébergement Eguisheim",
                "tarifs gîte Alsace",
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
