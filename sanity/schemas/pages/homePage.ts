import { defineType } from 'sanity'

export default defineType({
  name: 'homePage',
  title: '🏠 Page d\'Accueil',
  type: 'document',
  groups: [
    { name: 'hero', title: '1. 🎬 Hero' },
    { name: 'about', title: '2. 📝 À Propos & Galerie' },
    { name: 'features', title: '3. ✨ Découvrez' },
    { name: 'jacuzzi', title: '4. 🛁 Jacuzzi' },
    { name: 'testimonials', title: '5. ⭐ Témoignages' },
    { name: 'seo', title: '6. 🔍 SEO' },
  ],
  fields: [
    // ==================== HERO SECTION ====================
    {
      name: 'hero',
      title: 'Section Hero (Haut de page)',
      type: 'object',
      group: 'hero',
      description: 'Note: L\'image de fond est fixe et ne peut pas être modifiée ici.',
      fields: [
        {
          name: 'location',
          title: 'Localisation',
          type: 'string',
          description: 'Ex: "Wettolsheim — Alsace"',
        },
        {
          name: 'title',
          title: 'Titre principal',
          type: 'string',
          validation: Rule => Rule.required(),
          description: 'Ex: "Gîte luxueux avec jacuzzi au Cœur du Vignoble"',
        },
        {
          name: 'subtitle',
          title: 'Sous-titre',
          type: 'text',
          rows: 2,
          description: 'Description courte sous le titre',
        },
        {
          name: 'cta1Text',
          title: 'Texte bouton principal',
          type: 'string',
          description: 'Ex: "Demander un Devis"',
        },
        {
          name: 'cta1Link',
          title: 'Lien bouton principal',
          type: 'string',
          description: 'Ex: "/contact"',
        },
        {
          name: 'cta2Text',
          title: 'Texte bouton secondaire',
          type: 'string',
          description: 'Ex: "Découvrir le Gîte"',
        },
        {
          name: 'cta2Link',
          title: 'Lien bouton secondaire',
          type: 'string',
          description: 'Ex: "/gite"',
        },
        {
          name: 'promoText',
          title: 'Texte promotionnel',
          type: 'string',
          description: 'Bandeau promo en bas du hero. Ex: "💎 Réservez en direct et économisez 20%..."',
        },
      ],
    },

    // ==================== ABOUT SECTION ====================
    {
      name: 'about',
      title: 'Section À Propos',
      type: 'object',
      group: 'about',
      fields: [
        {
          name: 'badge',
          title: 'Badge/Étiquette',
          type: 'string',
          description: 'Petit texte au-dessus du titre. Ex: "En quelques mots"',
        },
        {
          name: 'title',
          title: 'Titre',
          type: 'string',
          description: 'Ex: "Un écrin de douceur sur la Route des Vins"',
        },
        {
          name: 'description1',
          title: 'Premier paragraphe',
          type: 'text',
          rows: 4,
        },
        {
          name: 'description2',
          title: 'Deuxième paragraphe',
          type: 'text',
          rows: 4,
        },
        {
          name: 'highlights',
          title: 'Points forts',
          type: 'array',
          description: '4 points forts avec icône',
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
                      { title: '📍 Localisation', value: 'MapPin' },
                      { title: '👥 Personnes', value: 'Users' },
                      { title: '⭐ Étoile', value: 'Star' },
                      { title: '✨ Sparkles', value: 'Sparkles' },
                      { title: '🏠 Maison', value: 'Home' },
                      { title: '❤️ Cœur', value: 'Heart' },
                    ],
                  },
                },
                {
                  name: 'label',
                  title: 'Titre',
                  type: 'string',
                },
                {
                  name: 'desc',
                  title: 'Description',
                  type: 'string',
                },
              ],
              preview: {
                select: {
                  title: 'label',
                  subtitle: 'desc',
                },
              },
            },
          ],
        },
        {
          name: 'galleryImages',
          title: 'Images de la galerie (4 images)',
          type: 'array',
          description: 'Les 4 images affichées dans la grille',
          of: [
            {
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: 'alt',
                  title: 'Texte alternatif',
                  type: 'string',
                  description: 'Description pour l\'accessibilité',
                },
              ],
            },
          ],
          validation: Rule => Rule.max(4),
        },
        {
          name: 'galleryButtonText',
          title: 'Texte du bouton galerie',
          type: 'string',
          description: 'Ex: "Afficher toutes les photos"',
        },
        {
          name: 'fullGalleryImages',
          title: 'Galerie complète (toutes les photos)',
          type: 'array',
          description: 'Photos affichées quand on clique sur "Afficher toutes les photos"',
          of: [
            {
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: 'alt',
                  title: 'Texte alternatif',
                  type: 'string',
                  description: 'Description pour l\'accessibilité',
                },
                {
                  name: 'category',
                  title: 'Catégorie',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Intérieur', value: 'interior' },
                      { title: 'Extérieur', value: 'exterior' },
                      { title: 'Chambre', value: 'bedroom' },
                      { title: 'Cuisine', value: 'kitchen' },
                      { title: 'Salle de bain', value: 'bathroom' },
                      { title: 'Jacuzzi', value: 'jacuzzi' },
                      { title: 'Jardin/Terrasse', value: 'garden' },
                      { title: 'Vue', value: 'view' },
                    ],
                  },
                },
              ],
            },
          ],
        },
      ],
    },

    // ==================== JACUZZI / EXPERIENCE EXCLUSIVE SECTION ====================
    {
      name: 'jacuzziSection',
      title: 'Section Expérience Exclusive (Jacuzzi)',
      type: 'object',
      group: 'jacuzzi',
      fields: [
        {
          name: 'badge',
          title: 'Badge/Étiquette',
          type: 'string',
          description: 'Ex: "Expérience Exclusive"',
        },
        {
          name: 'title',
          title: 'Titre',
          type: 'string',
          description: 'Ex: "Jacuzzi Privatif"',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
          description: 'Ex: "Profitez de moments de détente absolue dans notre jacuzzi extérieur 6 places..."',
        },
        {
          name: 'features',
          title: 'Caractéristiques (liste à puces)',
          type: 'array',
          description: 'Liste simple des caractéristiques',
          of: [{ type: 'string' }],
        },
        {
          name: 'image',
          title: 'Image du Jacuzzi',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Texte alternatif',
              type: 'string',
              description: 'Description pour l\'accessibilité',
            },
          ],
        },
      ],
    },

    // ==================== FEATURES SECTION ====================
    {
      name: 'featuresSection',
      title: 'Section Découvrez',
      type: 'object',
      group: 'features',
      fields: [
        {
          name: 'badge',
          title: 'Badge/Étiquette',
          type: 'string',
          description: 'Ex: "Découvrez"',
        },
        {
          name: 'title',
          title: 'Titre',
          type: 'string',
          description: 'Ex: "Votre séjour en Alsace"',
        },
        {
          name: 'features',
          title: 'Fonctionnalités',
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
                      { title: '🏠 Maison', value: 'Home' },
                      { title: '🗺️ Carte', value: 'Map' },
                      { title: '📅 Calendrier', value: 'Calendar' },
                      { title: '✨ Sparkles', value: 'Sparkles' },
                      { title: '📞 Téléphone', value: 'Phone' },
                      { title: '📧 Email', value: 'Mail' },
                    ],
                  },
                },
                {
                  name: 'title',
                  title: 'Titre',
                  type: 'string',
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  rows: 2,
                },
                {
                  name: 'href',
                  title: 'Lien',
                  type: 'string',
                  description: 'Ex: "/gite"',
                },
              ],
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'description',
                },
              },
            },
          ],
        },
      ],
    },

    // ==================== TESTIMONIALS SECTION ====================
    {
      name: 'testimonialsSection',
      title: 'Section Témoignages',
      type: 'object',
      group: 'testimonials',
      fields: [
        {
          name: 'rating',
          title: 'Note globale',
          type: 'string',
          description: 'Ex: "5,0"',
        },
        {
          name: 'reviewCount',
          title: 'Nombre d\'avis',
          type: 'string',
          description: 'Ex: "24 avis"',
        },
        {
          name: 'reviewPlatform',
          title: 'Plateforme',
          type: 'string',
          description: 'Ex: "sur Airbnb"',
        },
        {
          name: 'sectionTitle',
          title: 'Titre de la section',
          type: 'string',
          description: 'Ex: "Ce que disent nos hôtes"',
        },
        {
          name: 'testimonials',
          title: 'Témoignages',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'name',
                  title: 'Nom',
                  type: 'string',
                },
                {
                  name: 'location',
                  title: 'Localisation / Info',
                  type: 'string',
                  description: 'Ex: "7 ans sur Airbnb" ou "Bonstetten, Suisse"',
                },
                {
                  name: 'rating',
                  title: 'Note (sur 5)',
                  type: 'number',
                  validation: Rule => Rule.min(1).max(5),
                },
                {
                  name: 'text',
                  title: 'Témoignage',
                  type: 'text',
                  rows: 4,
                },
                {
                  name: 'date',
                  title: 'Date',
                  type: 'string',
                  description: 'Ex: "Novembre 2025"',
                },
              ],
              preview: {
                select: {
                  title: 'name',
                  rating: 'rating',
                  date: 'date',
                },
                prepare({ title, rating, date }) {
                  return {
                    title,
                    subtitle: `${'⭐'.repeat(rating || 0)} • ${date || ''}`,
                  }
                },
              },
            },
          ],
        },
        {
          name: 'airbnbLinkText',
          title: 'Texte du lien Airbnb',
          type: 'string',
          description: 'Ex: "Voir tous les avis sur Airbnb"',
        },
        {
          name: 'airbnbLink',
          title: 'Lien Airbnb',
          type: 'url',
          description: 'URL vers la page des avis Airbnb',
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
          description: 'Titre affiché dans l\'onglet du navigateur et les résultats Google',
        },
        {
          name: 'metaDescription',
          title: 'Description Meta',
          type: 'text',
          rows: 2,
          description: 'Description pour les résultats Google (max 160 caractères)',
        },
        {
          name: 'keywords',
          title: 'Mots-clés',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags',
          },
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: '🏠 Page d\'Accueil',
      }
    },
  },
})
