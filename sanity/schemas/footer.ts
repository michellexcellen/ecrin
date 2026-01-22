
import { defineType } from 'sanity'

export default defineType({
    name: 'footer',
    title: 'Pied de page (Footer)',
    type: 'document',
    fields: [
        {
            name: 'brandTitle',
            title: 'Titre Marque',
            type: 'string',
            initialValue: "l'écrin du vignoble",
            description: "Titre affiché en haut à gauche",
        },
        {
            name: 'brandDescription',
            title: 'Description Marque',
            type: 'text',
            rows: 3,
            description: "Petit texte de présentation sous le titre.",
        },
        {
            name: 'contactTitle',
            title: 'Titre Colonne Contact',
            type: 'string',
            initialValue: 'Contact',
        },
        {
            name: 'address',
            title: 'Adresse',
            type: 'text',
            rows: 3,
        },
        {
            name: 'phone',
            title: 'Téléphone',
            type: 'string',
        },
        {
            name: 'email',
            title: 'Email',
            type: 'string',
        },
        {
            name: 'linksTitle',
            title: 'Titre Colonne Liens',
            type: 'string',
            initialValue: 'Liens rapides',
        },
        {
            name: 'copyright',
            title: 'Texte Copyright',
            type: 'string',
            description: "Sans l'année qui est automatique.",
            initialValue: "l'écrin du vignoble. Tous droits réservés.",
        },
    ],
    preview: {
        prepare() {
            return {
                title: 'Modification du Pied de page',
            }
        },
    },
})
