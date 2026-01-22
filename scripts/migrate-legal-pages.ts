
import { createClient } from 'next-sanity'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset || !token) {
    process.exit(1)
}

const client = createClient({
    projectId,
    dataset,
    token,
    apiVersion: '2024-01-01',
    useCdn: false,
})

const legalPages = [
    {
        title: 'Mentions Légales',
        slug: 'mentions-legales',
        content: [
            {
                _type: 'block',
                style: 'h2',
                children: [{ _type: 'span', text: '1. Éditeur du site' }],
            },
            {
                _type: 'block',
                style: 'normal',
                children: [
                    { _type: 'span', text: 'Le site internet ' },
                    { _type: 'span', text: "l'écrin du vignoble", marks: ['em'] },
                    { _type: 'span', text: " est édité par :" }
                ],
            },
            {
                _type: 'block',
                style: 'normal',
                children: [
                    { _type: 'span', text: "Michel LEXCELLENT\n9 Résidence du Château Martinsbourg\n68920 WETTOLSHEIM - France\nTéléphone : +33 6 81 84 25 54\nEmail : lexcellent.michel@orange.fr", marks: ['strong'] }
                ]
            },
            {
                _type: 'block',
                style: 'h2',
                children: [{ _type: 'span', text: '2. Hébergement' }],
            },
            {
                _type: 'block',
                style: 'normal',
                children: [
                    { _type: 'span', text: "Ce site est hébergé par la société NETLIFY." }
                ]
            },
            {
                _type: 'block',
                style: 'h2',
                children: [{ _type: 'span', text: '3. Propriété intellectuelle' }],
            },
            {
                _type: 'block',
                style: 'normal',
                children: [
                    { _type: 'span', text: "L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques." }
                ]
            }
        ]
    },
    {
        title: 'Conditions Générales de Vente',
        slug: 'cgv',
        content: [
            {
                _type: 'block',
                style: 'normal',
                children: [
                    { _type: 'span', text: "Les présentes conditions générales régissent la location saisonnière du gîte l'écrin du vignoble." }
                ]
            },
            {
                _type: 'block',
                style: 'h2',
                children: [{ _type: 'span', text: '1. Réservation et Paiement' }],
            },
            {
                _type: 'block',
                style: 'normal',
                children: [
                    { _type: 'span', text: "Toute réservation devient ferme après versement d'arrhes correspondant à 30% du montant total du séjour. Le solde est dû le jour de l'arrivée lors de la remise des clés." }
                ]
            },
            {
                _type: 'block',
                style: 'h2',
                children: [{ _type: 'span', text: '2. Dépôt de garantie' }],
            },
            {
                _type: 'block',
                style: 'normal',
                children: [
                    { _type: 'span', text: "Un dépôt de garantie (caution) de 400 € est demandé à l'arrivée (chèque non encaissé). Il sera restitué au départ du locataire, déduction faite du coût de remise en état des lieux si des dégradations étaient constatées." }
                ]
            },
            {
                _type: 'block',
                style: 'h2',
                children: [{ _type: 'span', text: "3. Heures d'arrivée et de départ" }],
            },
            {
                _type: 'block',
                style: 'normal',
                children: [
                    { _type: 'span', text: "Arrivée : à partir de 16h00 (prévenir 1h avant).\nDépart : avant 10h00." }
                ]
            },
            {
                _type: 'block',
                style: 'h2',
                children: [{ _type: 'span', text: "4. Annulation" }],
            },
            {
                _type: 'block',
                style: 'normal',
                children: [
                    { _type: 'span', text: "En cas d'annulation par le locataire à plus de 15 jours de l'arrivée, les arrhes restent acquises au propriétaire. En cas d'annulation par le propriétaire à moins d'un mois, celui-ci reversera le double des arrhes." }
                ]
            },
            {
                _type: 'block',
                style: 'h2',
                children: [{ _type: 'span', text: "5. Règles de vie" }],
            },
            {
                _type: 'block',
                style: 'normal',
                list: 'bullet',
                children: [
                    { _type: 'span', text: "Respect de la tranquillité du voisinage." }
                ]
            },
            {
                _type: 'block',
                style: 'normal',
                list: 'bullet',
                children: [
                    { _type: 'span', text: "Le gîte est non-fumeur à l'intérieur." }
                ]
            },
            {
                _type: 'block',
                style: 'normal',
                list: 'bullet',
                children: [
                    { _type: 'span', text: "Les animaux ne sont pas admis (sauf accord préalable)." }
                ]
            }
        ]
    },
    {
        title: 'Politique de Confidentialité',
        slug: 'confidentialite',
        content: [
            {
                _type: 'block',
                style: 'h2',
                children: [{ _type: 'span', text: '1. Collecte des données' }],
            },
            {
                _type: 'block',
                style: 'normal',
                children: [
                    { _type: 'span', text: 'Nous collectons uniquement les données nécessaires à la gestion de votre réservation : nom, prénom, adresse, téléphone et email.' }
                ],
            },
            {
                _type: 'block',
                style: 'h2',
                children: [{ _type: 'span', text: '2. Utilisation des données' }],
            },
            {
                _type: 'block',
                style: 'normal',
                children: [
                    { _type: 'span', text: "Ces données sont utilisées exclusivement pour : la réalisation du contrat de location, la communication liée à votre séjour, et l'édition de factures." }
                ]
            },
            {
                _type: 'block',
                style: 'h2',
                children: [{ _type: 'span', text: '3. Partage des données' }],
            },
            {
                _type: 'block',
                style: 'normal',
                children: [
                    { _type: 'span', text: "Vos informations personnelles ne sont jamais vendues, louées ou cédées à des tiers." }
                ]
            },
            {
                _type: 'block',
                style: 'h2',
                children: [{ _type: 'span', text: '4. Vos droits' }],
            },
            {
                _type: 'block',
                style: 'normal',
                children: [
                    { _type: 'span', text: "Conformément au RGPD, vous disposez d'un droit d'accès, de modification et de suppression de vos données. Pour l'exercer, contactez-nous par email." }
                ]
            }
        ]
    }
]

async function migrate() {
    console.log('Creating legal pages...')

    for (const page of legalPages) {
        const doc = {
            _type: 'legalPage',
            title: page.title,
            slug: { _type: 'slug', current: page.slug },
            content: page.content,
            seo: {
                metaTitle: page.title + " - l'écrin du vignoble",
                metaDescription: "Consultez nos " + page.title.toLowerCase()
            }
        }

        // Check if exists to update or create
        // We use a query to find by slug first to avoid duplicates if ID differs (though unlikely for new type)
        const existing = await client.fetch(`*[_type == "legalPage" && slug.current == $slug][0]`, { slug: page.slug })

        if (existing) {
            await client.patch(existing._id).set(doc).commit()
            console.log(`Updated ${page.title}`)
        } else {
            await client.create(doc)
            console.log(`Created ${page.title}`)
        }
    }
}

migrate()
