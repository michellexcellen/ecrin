
import { defineType } from 'sanity'

export default defineType({
  name: 'contactPage',
  title: '📞 Page Contact',
  type: 'document',
  groups: [
    { name: 'hero', title: '1. 🎬 Hero' },
    { name: 'quote', title: '2. 💰 Devis (Intro)' },
    { name: 'contactInfo', title: '3. ℹ️ Infos Contact' },
    { name: 'map', title: '4. 🗺️ Carte' },
    { name: 'access', title: '5. 🚗 Accès' },
    { name: 'cta', title: '6. 📞 Appel à l\'Action' },
    { name: 'seo', title: '7. 🔍 SEO' },
  ],
  fields: [
    // ==================== HERO SECTION ====================
    {
      name: 'heroSection',
      title: 'Section Hero',
      type: 'object',
      group: 'hero',
      description: "L'image de fond et le style restent gérés par le code.",
      fields: [
        {
          name: 'badge',
          title: 'Badge',
          type: 'string',
          initialValue: 'Contact',
        },
        {
          name: 'title',
          title: 'Titre',
          type: 'string',
          initialValue: 'Réservez Votre Séjour',
        },
        {
          name: 'subtitle',
          title: 'Sous-titre',
          type: 'string',
          initialValue: 'Calculez votre devis en ligne ou contactez-nous directement',
        },
      ],
    },

    // ==================== QUOTE CALCULATOR INTRO ====================
    {
      name: 'quoteSection',
      title: 'Section Calculateur de Devis (Intro)',
      type: 'object',
      group: 'quote',
      description: "Texte d'introduction au dessus du calculateur.",
      fields: [
        {
          name: 'badge',
          title: 'Badge',
          type: 'string',
          initialValue: 'Devis en Ligne',
        },
        {
          name: 'title',
          title: 'Titre',
          type: 'string',
          initialValue: 'Calculez Votre Estimation',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
          initialValue: 'Obtenez une estimation personnalisée en quelques clics. Tarif dégressif selon la durée de votre séjour.',
        },
        {
          name: 'promoText',
          title: 'Texte Promo (Badge)',
          type: 'string',
          initialValue: '💎 Réservez en direct et économisez 20% (sans frais de plateforme, meilleur tarif garanti)',
        },
      ],
    },

    // ==================== CONTACT INFO SECTION ====================
    {
      name: 'contactInfoSection',
      title: 'Section Informations de Contact',
      type: 'object',
      group: 'contactInfo',
      fields: [
        {
          name: 'badge',
          title: 'Badge',
          type: 'string',
          initialValue: 'Nous Contacter',
        },
        {
          name: 'title',
          title: 'Titre',
          type: 'string',
          initialValue: 'Informations de Contact',
        },
        {
          name: 'cards',
          title: 'Cartes d\'information',
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
                      { title: '📍 Adresse (MapPin)', value: 'MapPin' },
                      { title: '📞 Téléphone (Phone)', value: 'Phone' },
                      { title: '📧 Email (Mail)', value: 'Mail' },
                      { title: '⏰ Horaires (Clock)', value: 'Clock' },
                    ],
                  },
                },
                { name: 'title', title: 'Titre', type: 'string' },
                { name: 'content', title: 'Contenu (HTML possible)', type: 'text', rows: 3 },
                { name: 'link', title: 'Lien (Optionnel)', type: 'string', description: 'ex: tel:+33...' },
                { name: 'linkText', title: 'Texte du lien (Optionnel)', type: 'string' },
              ],
              preview: {
                select: { title: 'title', subtitle: 'content' },
              },
            },
          ],
          initialValue: [
            {
              icon: 'MapPin',
              title: 'Adresse',
              content: "l'écrin du vignoble\n68920 Wettolsheim\nAlsace, France",
            },
            {
              icon: 'Phone',
              title: 'Téléphone',
              link: 'tel:+33681842554',
              linkText: '+33 6 81 84 25 54',
            },
            {
              icon: 'Mail',
              title: 'Email',
              link: 'mailto:lexcellent.michel@orange.fr',
              linkText: 'lexcellent.michel@orange.fr',
            },
            {
              icon: 'Clock',
              title: 'Horaires',
              content: "Arrivée : 16h00\nDépart : 10h00\n(Modulable selon disponibilité)",
            },
          ]
        },
      ],
    },

    // ==================== MAP SECTION ====================
    {
      name: 'mapSection',
      title: 'Section Carte',
      type: 'object',
      group: 'map',
      fields: [
        {
          name: 'title',
          title: 'Titre',
          type: 'string',
          initialValue: 'Comment Nous Trouver',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'string',
          initialValue: "Au cœur du vignoble alsacien, à 10 minutes à pied d'Eguisheim et 5 km de Colmar",
        },
        {
          name: 'embedUrl',
          title: 'URL Embed Google Maps',
          type: 'text',
          rows: 3,
          description: "L'URL qui va dans l'attribut `src` de l'iframe.",
          initialValue: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21496.562287936!2d7.2775!3d48.0567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479163c3e64c3af9%3A0x40a5fb99a3b7c60!2s68920%20Wettolsheim%2C%20France!5e0!3m2!1sfr!2sfr!4v1234567890",
        },
      ],
    },

    // ==================== ACCESS SECTION ====================
    {
      name: 'accessSection',
      title: 'Section Accès',
      type: 'object',
      group: 'access',
      fields: [
        {
          name: 'carTitle',
          title: 'Titre Voiture',
          type: 'string',
          initialValue: 'Accès en Voiture',
        },
        {
          name: 'carContent',
          title: 'Contenu Voiture',
          type: 'array',
          of: [{ type: 'block' }],
          description: "Utilisez l'éditeur pour formater le texte (gras, listes...)",
        },
        {
          name: 'transitTitle',
          title: 'Titre Transports',
          type: 'string',
          initialValue: 'Transports en Commun',
        },
        {
          name: 'transitContent',
          title: 'Contenu Transports',
          type: 'array',
          of: [{ type: 'block' }],
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
          initialValue: 'Une Question ?',
        },
        {
          name: 'text',
          title: 'Texte',
          type: 'text',
          rows: 2,
          initialValue: "N'hésitez pas à nous contacter, nous vous répondrons dans les plus brefs délais",
        },
        {
          name: 'button1Text',
          title: 'Bouton 1 Texte (Appel)',
          type: 'string',
          initialValue: 'Nous Appeler',
        },
        {
          name: 'button1Link',
          title: 'Bouton 1 Lien',
          type: 'string',
          initialValue: 'tel:+33681842554',
        },
        {
          name: 'button2Text',
          title: 'Bouton 2 Texte (Email)',
          type: 'string',
          initialValue: 'Nous Écrire',
        },
        {
          name: 'button2Link',
          title: 'Bouton 2 Lien',
          type: 'string',
          initialValue: 'mailto:lexcellent.michel@orange.fr',
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
          initialValue: "Contact & Réservation - l'écrin du vignoble | Demandez votre Devis",
        },
        {
          name: 'metaDescription',
          title: 'Description Meta',
          type: 'text',
          rows: 3,
          initialValue: "Contactez-nous pour réserver votre séjour au gîte l'écrin du vignoble à Wettolsheim. Calculateur de devis en ligne, réponse rapide. Gîte 4 personnes avec jacuzzi en Alsace.",
        },
        {
          name: 'keywords',
          title: 'Mots-clés',
          type: 'array',
          of: [{ type: 'string' }],
          options: { layout: 'tags' },
          initialValue: [
            "réservation gîte Alsace",
            "devis location Wettolsheim",
            "contact gîte Colmar",
            "réserver hébergement Eguisheim",
            "tarifs gîte Alsace",
          ],
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: '📞 Page Contact',
      }
    },
  },
})
