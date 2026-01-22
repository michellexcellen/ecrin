
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
    console.log('Migrating footer settings...')

    const doc = {
        _id: 'generalSettings',
        _type: 'generalSettings',

        siteName: "l'écrin du vignoble",
        siteDescription: "Gîte de luxe en Alsace avec Jacuzzi",
        contactEmail: "lexcellent.michel@orange.fr",
        contactPhone: "+33 6 81 84 25 54",

        // Footer content based on current footer.tsx
        footerBrandTitle: "l'écrin du vignoble",
        footerBrandDescription: "Gîte luxueux avec jacuzzi au cœur du vignoble alsacien.\nÀ 10 minutes d'Eguisheim, l'un des plus beaux villages de France.",

        footerContactTitle: "Contact",
        footerAddress: "l'écrin du vignoble\n68920 Wettolsheim\nAlsace, France",

        footerLinksTitle: "Liens rapides",

        footerCopyright: "l'écrin du vignoble. Tous droits réservés."
    }

    try {
        await client.createOrReplace(doc)
        console.log('General Settings updated!')
    } catch (err) {
        console.error(err)
    }
}

migrate()
