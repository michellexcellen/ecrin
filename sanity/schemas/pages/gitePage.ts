import { defineType } from 'sanity'

export default defineType({
  name: 'gitePage',
  title: '🏠 Page Le Gîte',
  type: 'document',
  groups: [
    { name: 'hero', title: '1. 🎬 Hero' },
    { name: 'description', title: '2. 📝 Description' },
    { name: 'rooms', title: '3. 🛏️ Espaces/Pièces' },
    { name: 'services', title: '4. ✨ Équipements d\'Exception' },
    { name: 'details', title: '5. 📋 Détails (Chambres & Cuisine)' },
    { name: 'amenities', title: '6. 🎯 Tous les Équipements' },
    { name: 'included', title: '7. ✓ Services Inclus' },
    { name: 'info', title: '8. ⚠️ Infos Importantes' },
    { name: 'cta', title: '9. 📞 Appel à l\'Action' },
    { name: 'seo', title: '10. 🔍 SEO' },
  ],
  fields: [
    // ==================== HERO SECTION ====================
    {
      name: 'hero',
      title: 'Section Hero',
      type: 'object',
      group: 'hero',
      description: 'Note: L\'image de fond est fixe et ne peut pas être modifiée ici.',
      fields: [
        {
          name: 'badge',
          title: 'Badge',
          type: 'string',
          description: 'Ex: "Le Gîte"',
        },
        {
          name: 'title',
          title: 'Titre principal',
          type: 'string',
          description: 'Ex: "Un Appartement Pensé pour Votre Confort"',
        },
        {
          name: 'subtitle',
          title: 'Sous-titre',
          type: 'string',
          description: 'Ex: "Prestations haut de gamme dans un cadre enchanteur..."',
        },
      ],
    },

    // ==================== DESCRIPTION SECTION ====================
    {
      name: 'descriptionSection',
      title: 'Section Description',
      type: 'object',
      group: 'description',
      fields: [
        {
          name: 'title',
          title: 'Titre',
          type: 'string',
          description: 'Ex: "Un Écrin au Cœur du Vignoble"',
        },
        {
          name: 'paragraph1',
          title: 'Premier paragraphe',
          type: 'text',
          rows: 4,
        },
        {
          name: 'paragraph2',
          title: 'Deuxième paragraphe',
          type: 'text',
          rows: 4,
        },
        {
          name: 'features',
          title: 'Points clés (4 max)',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'icon',
                  title: 'Icône',
                  type: 'string',
                  options: {
                    list: [
                      { title: '🛏️ Lit', value: 'Bed' },
                      { title: '👥 Personnes', value: 'Users' },
                      { title: '📐 Espace', value: 'Maximize2' },
                      { title: '✨ Sparkles', value: 'Sparkles' },
                    ],
                  },
                },
                {
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                },
                {
                  name: 'desc',
                  title: 'Description courte',
                  type: 'string',
                },
              ],
              preview: {
                select: { title: 'label', subtitle: 'desc' },
              },
            },
          ],
          validation: Rule => Rule.max(4),
        },
      ],
    },

    // ==================== ROOMS SECTION ====================
    {
      name: 'roomsSection',
      title: 'Section Espaces',
      type: 'object',
      group: 'rooms',
      fields: [
        {
          name: 'badge',
          title: 'Badge',
          type: 'string',
          description: 'Ex: "Les Espaces"',
        },
        {
          name: 'title',
          title: 'Titre',
          type: 'string',
          description: 'Ex: "Chambres et Pièces de Vie"',
        },
        {
          name: 'rooms',
          title: 'Pièces',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Nom de la pièce',
                  type: 'string',
                },
                {
                  name: 'size',
                  title: 'Taille/Info',
                  type: 'string',
                  description: 'Ex: "12 m²" ou "Équipée"',
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'string',
                },
                {
                  name: 'image',
                  title: 'Photo',
                  type: 'image',
                  options: { hotspot: true },
                  fields: [
                    {
                      name: 'alt',
                      title: 'Texte alternatif',
                      type: 'string',
                    },
                  ],
                },
              ],
              preview: {
                select: { title: 'title', subtitle: 'size', media: 'image' },
              },
            },
          ],
        },
      ],
    },

    // ==================== MAIN SERVICES SECTION ====================
    {
      name: 'servicesSection',
      title: 'Section Équipements d\'Exception',
      type: 'object',
      group: 'services',
      fields: [
        {
          name: 'badge',
          title: 'Badge',
          type: 'string',
          description: 'Ex: "Prestations"',
        },
        {
          name: 'title',
          title: 'Titre',
          type: 'string',
          description: 'Ex: "Équipements d\'Exception"',
        },
        {
          name: 'services',
          title: 'Services principaux',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'icon',
                  title: 'Icône',
                  type: 'string',
                  options: {
                    list: [
                      { title: '✨ Sparkles (Jacuzzi)', value: 'Sparkles' },
                      { title: '🌬️ Climatisation', value: 'Wind' },
                      { title: '🍽️ Terrasse/Repas', value: 'Utensils' },
                      { title: '🚗 Parking', value: 'Car' },
                    ],
                  },
                },
                {
                  name: 'title',
                  title: 'Titre',
                  type: 'string',
                },
                {
                  name: 'subtitle',
                  title: 'Sous-titre',
                  type: 'string',
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  rows: 3,
                },
                {
                  name: 'image',
                  title: 'Photo',
                  type: 'image',
                  options: { hotspot: true },
                  fields: [
                    {
                      name: 'alt',
                      title: 'Texte alternatif',
                      type: 'string',
                    },
                  ],
                },
                {
                  name: 'highlight',
                  title: 'Mettre en avant (icône dorée)',
                  type: 'boolean',
                  initialValue: false,
                },
              ],
              preview: {
                select: { title: 'title', subtitle: 'subtitle', media: 'image' },
              },
            },
          ],
        },
      ],
    },

    // ==================== DETAILS SECTION ====================
    {
      name: 'detailsSection',
      title: 'Section Détails',
      type: 'object',
      group: 'details',
      fields: [
        {
          name: 'chambresTitle',
          title: 'Titre colonne Chambres',
          type: 'string',
          description: 'Ex: "Les Chambres"',
        },
        {
          name: 'chambresParagraphs',
          title: 'Paragraphes Chambres',
          type: 'array',
          of: [{ type: 'text', rows: 3 }],
        },
        {
          name: 'chambresHighlight',
          title: 'Texte en surbrillance (doré)',
          type: 'string',
          description: 'Ex: "Les lits sont faits à votre arrivée..."',
        },
        {
          name: 'cuisineTitle',
          title: 'Titre colonne Cuisine',
          type: 'string',
          description: 'Ex: "Cuisine & Commodités"',
        },
        {
          name: 'cuisineParagraphs',
          title: 'Paragraphes Cuisine',
          type: 'array',
          of: [{ type: 'text', rows: 3 }],
        },
      ],
    },

    // ==================== AMENITIES SECTION ====================
    {
      name: 'amenitiesSection',
      title: 'Section Tous les Équipements',
      type: 'object',
      group: 'amenities',
      fields: [
        {
          name: 'badge',
          title: 'Badge',
          type: 'string',
          description: 'Ex: "Tout Compris"',
        },
        {
          name: 'title',
          title: 'Titre',
          type: 'string',
          description: 'Ex: "Tous les Équipements"',
        },
        {
          name: 'subtitle',
          title: 'Sous-titre',
          type: 'string',
        },
        {
          name: 'amenities',
          title: 'Équipements',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'icon',
                  title: 'Icône',
                  type: 'string',
                  options: {
                    list: [
                      { title: '📶 WiFi', value: 'Wifi' },
                      { title: '📺 TV', value: 'Tv' },
                      { title: '🌬️ Climatisation', value: 'Wind' },
                      { title: '🧺 Lave-linge', value: 'WashingMachine' },
                      { title: '👕 Linge', value: 'Shirt' },
                      { title: '🛁 Bain', value: 'Bath' },
                      { title: '☕ Café', value: 'Coffee' },
                      { title: '⚡ Électrique', value: 'Zap' },
                      { title: '🎉 Jeux', value: 'PartyPopper' },
                      { title: '🌲 Nature', value: 'TreePine' },
                      { title: '🏠 Maison', value: 'Home' },
                      { title: '✨ Sparkles', value: 'Sparkles' },
                    ],
                  },
                },
                {
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                },
                {
                  name: 'desc',
                  title: 'Description',
                  type: 'string',
                },
              ],
              preview: {
                select: { title: 'label', subtitle: 'desc' },
              },
            },
          ],
        },
      ],
    },

    // ==================== INCLUDED SERVICES SECTION ====================
    {
      name: 'includedSection',
      title: 'Section Services Inclus',
      type: 'object',
      group: 'included',
      fields: [
        {
          name: 'title',
          title: 'Titre',
          type: 'string',
          description: 'Ex: "Services Inclus"',
        },
        {
          name: 'subtitle',
          title: 'Sous-titre',
          type: 'string',
        },
        {
          name: 'services',
          title: 'Liste des services inclus',
          type: 'array',
          of: [{ type: 'string' }],
        },
      ],
    },

    // ==================== IMPORTANT INFO SECTION ====================
    {
      name: 'infoSection',
      title: 'Section Informations Importantes',
      type: 'object',
      group: 'info',
      fields: [
        {
          name: 'title',
          title: 'Titre',
          type: 'string',
          description: 'Ex: "Informations Importantes"',
        },
        {
          name: 'paragraphs',
          title: 'Paragraphes',
          type: 'array',
          of: [{ type: 'text', rows: 3 }],
        },
      ],
    },

    // ==================== CTA SECTION ====================
    {
      name: 'ctaSection',
      title: 'Section Appel à l\'Action',
      type: 'object',
      group: 'cta',
      fields: [
        {
          name: 'title',
          title: 'Titre',
          type: 'string',
          description: 'Ex: "Prêt à Réserver ?"',
        },
        {
          name: 'subtitle',
          title: 'Sous-titre',
          type: 'string',
        },
        {
          name: 'button1Text',
          title: 'Texte bouton 1',
          type: 'string',
        },
        {
          name: 'button1Link',
          title: 'Lien bouton 1',
          type: 'string',
        },
        {
          name: 'button2Text',
          title: 'Texte bouton 2',
          type: 'string',
        },
        {
          name: 'button2Link',
          title: 'Lien bouton 2',
          type: 'string',
        },
      ],
    },

    // ==================== SEO ====================
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
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
        {
          name: 'keywords',
          title: 'Mots-clés',
          type: 'array',
          of: [{ type: 'string' }],
          options: { layout: 'tags' },
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: '🏠 Page Le Gîte',
      }
    },
  },
})
