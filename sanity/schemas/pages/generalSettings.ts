
import { defineType } from 'sanity'

export default defineType({
  name: 'generalSettings',
  title: '⚙️ Paramètres Généraux',
  type: 'document',
  groups: [
    { name: 'general', title: 'Général' },
    { name: 'footer', title: 'Pied de page (Footer)' },
  ],
  fields: [
    // === GENERAL ===
    {
      name: 'siteName',
      title: 'Nom du site',
      type: 'string',
      group: 'general',
      validation: Rule => Rule.required(),
    },
    {
      name: 'siteDescription',
      title: 'Description du site (SEO défault)',
      type: 'text',
      rows: 3,
      group: 'general',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'general',
      options: { hotspot: true },
    },
    {
      name: 'contactEmail',
      title: 'Email de contact principal',
      type: 'string',
      group: 'general',
    },
    {
      name: 'contactPhone',
      title: 'Téléphone de contact principal',
      type: 'string',
      group: 'general',
    },

    // === FOOTER ===
    {
      name: 'footerBrandTitle',
      title: 'Titre Marque (Footer)',
      type: 'string',
      group: 'footer',
      description: "Titre affiché en haut à gauche du footer (ex: l'écrin du vignoble)",
    },
    {
      name: 'footerBrandDescription',
      title: 'Description Marque (Footer)',
      type: 'text',
      rows: 3,
      group: 'footer',
      description: "Petit texte de présentation sous le titre.",
    },
    {
      name: 'footerContactTitle',
      title: 'Titre Colonne Contact',
      type: 'string',
      group: 'footer',
      initialValue: 'Contact',
    },
    {
      name: 'footerAddress',
      title: 'Adresse (Footer)',
      type: 'text',
      rows: 3,
      group: 'footer',
      description: "Laissez vide pour utiliser l'adresse par défaut.",
    },
    {
      name: 'footerLinksTitle',
      title: 'Titre Colonne Liens',
      type: 'string',
      group: 'footer',
      initialValue: 'Liens rapides',
    },
    {
      name: 'footerCopyright',
      title: 'Texte Copyright (sans l\'année)',
      type: 'string',
      group: 'footer',
      initialValue: "l'écrin du vignoble. Tous droits réservés.",
    },
  ],
  preview: {
    select: {
      title: 'siteName',
    },
    prepare({ title }) {
      return {
        title: `⚙️ ${title || 'Paramètres Généraux'}`,
      }
    },
  },
})
