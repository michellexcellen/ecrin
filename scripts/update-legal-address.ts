
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

async function updateLegalAddress() {
    console.log('Updating legal pages addresses...')

    // 1. Update Mentions Légales
    const mentions = await client.fetch('*[_type == "legalPage" && slug.current == "mentions-legales"][0]')
    if (mentions) {
        const newContent = mentions.content.map((block: any) => {
            // Look for the block containing the address
            if (block.children) {
                block.children = block.children.map((span: any) => {
                    if (span.text && span.text.includes('9 Résidence du Château Martinsbourg')) {
                        // Replace full address with just the city
                        span.text = span.text.replace('9 Résidence du Château Martinsbourg, ', '')
                    }
                    return span
                })
            }
            return block
        })

        await client.patch(mentions._id).set({ content: newContent }).commit()
        console.log('Updated Mentions Légales')
    }

    // 2. Update CGV
    const cgv = await client.fetch('*[_type == "legalPage" && slug.current == "cgv"][0]')
    if (cgv) {
        const newContent = cgv.content.map((block: any) => {
            if (block.children) {
                block.children = block.children.map((span: any) => {
                    if (span.text && span.text.includes('9 Résidence du Château Martinsbourg')) {
                        span.text = span.text.replace('9 Résidence du Château Martinsbourg, ', '')
                    }
                    // Also check for "situé au..." pattern
                    if (span.text && span.text.includes('situé au 9 Résidence du Château Martinsbourg')) {
                        span.text = span.text.replace('situé au 9 Résidence du Château Martinsbourg, ', 'situé à ')
                    }
                    return span
                })
            }
            return block
        })

        await client.patch(cgv._id).set({ content: newContent }).commit()
        console.log('Updated CGV')
    }
}

updateLegalAddress()
