
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

async function migrate() {
    console.log('Migrating standalone Footer (Addresses update)...')

    const doc = {
        _id: 'footer',
        _type: 'footer',
        brandTitle: "l'écrin du vignoble",
        brandDescription: "Gîte luxueux avec jacuzzi au cœur du vignoble alsacien.\nÀ 10 minutes d'Eguisheim, l'un des plus beaux villages de France.",
        contactTitle: "Contact",
        address: "l'écrin du vignoble\nWettolsheim\nAlsace, France", // Simplified address
        phone: "+33 6 81 84 25 54",
        email: "lexcellent.michel@orange.fr",
        linksTitle: "Liens rapides",
        copyright: "l'écrin du vignoble. Tous droits réservés."
    }

    try {
        await client.createOrReplace(doc)
        console.log('Footer updated with simplified address!')
    } catch (err) {
        console.error(err)
    }
}

migrate()
