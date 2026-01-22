
import { defineType } from 'sanity'

export default defineType({
    name: 'legalPage',
    title: '⚖️ Pages Légales',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Titre de la page',
            type: 'string',
            validation: Rule => Rule.required(),
            description: 'Ex: Mentions Légales',
        },
        {
            name: 'slug',
            title: 'Slug (URL)',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: Rule => Rule.required(),
            description: "Ce qui apparaîtra dans l'url (ex: /legal/mentions-legales)",
        },
        {
            name: 'content',
            title: 'Contenu',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                    ],
                    lists: [{ title: 'Bullet', value: 'bullet' }, { title: 'Number', value: 'number' }],
                    marks: {
                        decorators: [
                            { title: 'Strong', value: 'strong' },
                            { title: 'Emphasis', value: 'em' },
                        ],
                    },
                },
            ],
            description: 'Rédigez ici le contenu légal complet.',
        },
        {
            name: 'seo',
            title: 'SEO',
            type: 'object',
            fields: [
                {
                    name: 'metaTitle',
                    title: 'Titre Meta',
                    type: 'string',
                },
                {
                    name: 'metaDescription',
                    title: 'Description Meta',
                    type: 'text',
                    rows: 2,
                },
            ],
        },
    ],
})
