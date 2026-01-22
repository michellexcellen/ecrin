import { defineType } from 'sanity'

export default defineType({
  name: 'regionPage',
  title: '🗺️ Page Région',
  type: 'document',
  groups: [
    { name: 'hero', title: '0. 🎬 Hero' },
    { name: 'position', title: '1. 📍 Situation' },
    { name: 'villages', title: '2. 🏘️ Villages' },
    { name: 'activities', title: '3. 🏃 Activités' },
    { name: 'seasons', title: '4. 🍂 Saisons' },
    { name: 'wineRoute', title: '5. 🍇 Route des Vins' },
    { name: 'cta', title: '6. 📞 Appel à l\'Action' },
    { name: 'seo', title: '7. 🔍 SEO' },
  ],
  fields: [
    // ==================== HERO SECTION ====================
    {
      name: 'heroSection',
      title: 'Section Acceuil (Haut de page)',
      type: 'object',
      group: 'hero',
      description: "L'image de fond est FIXE dans le code. Vous ne pouvez modifier que les textes ici.",
      fields: [
        {
          name: 'badge',
          title: 'Badge (Petit texte haut)',
          type: 'string',
          initialValue: 'La Région',
        },
        {
          name: 'title',
          title: 'Titre Principal',
          type: 'string',
          initialValue: "Découvrez l'Alsace Authentique",
        },
        {
          name: 'subtitle',
          title: 'Sous-titre',
          type: 'text',
          rows: 3,
          initialValue: "Au cœur de la Route des Vins, entre Vosges et Forêt Noire, explorez un territoire d'exception",
        },
      ],
    },


    // ==================== POSITION SECTION ====================
    {
      name: 'positionSection',
      title: 'Section Situation',
      type: 'object',
      group: 'position',
      fields: [
        {
          name: 'badge',
          title: 'Badge',
          type: 'string',
          initialValue: 'Situation',
          description: 'Ex: "Situation"',
        },
        {
          name: 'title',
          title: 'Titre',
          type: 'string',
          initialValue: 'Un Emplacement Privilégié',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
          initialValue: "Le gîte l'écrin du vignoble est situé à Wettolsheim, au cœur du vignoble alsacien, dans un cadre enchanteur avec des vues sur le vignoble, le village et la Forêt Noire.",
        },
        {
          name: 'highlights',
          title: 'Points forts',
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
                      { title: '📍 Localisation (MapPin)', value: 'MapPin' },
                      { title: '🍷 Vin (Wine)', value: 'Wine' },
                      { title: '🏰 Château (Castle)', value: 'Castle' },
                      { title: '🏔️ Montagne (Mountain)', value: 'Mountain' },
                      { title: '🌲 Nature (TreePine)', value: 'TreePine' },
                    ],
                  },
                },
                { name: 'title', title: 'Titre', type: 'string' },
                { name: 'description', title: 'Description', type: 'text', rows: 2 },
              ],
              preview: {
                select: { title: 'title', subtitle: 'description' },
              },
            },
          ],
          initialValue: [
            {
              icon: 'MapPin',
              title: 'Emplacement Idéal',
              description: "Au cœur du vignoble alsacien, à 10 min à pied d'Eguisheim et 5 km de Colmar",
            },
            {
              icon: 'Wine',
              title: 'Route des Vins',
              description: "Sur la célèbre Route des Vins d'Alsace, entouré de vignobles et domaines viticoles",
            },
            {
              icon: 'Castle',
              title: 'Villages de Charme',
              description: "Eguisheim, Riquewihr, Kaysersberg... Les plus beaux villages de France à proximité",
            },
            {
              icon: 'Mountain',
              title: 'Nature & Randonnées',
              description: "Accès direct aux sentiers viticoles et aux Vosges pour les amateurs de nature",
            },
          ],
        },
      ],
    },

    // ==================== VILLAGES SECTION ====================
    {
      name: 'villagesSection',
      title: 'Section Villages',
      type: 'object',
      group: 'villages',
      fields: [
        {
          name: 'badge',
          title: 'Badge',
          type: 'string',
          initialValue: 'À Proximité',
        },
        {
          name: 'title',
          title: 'Titre',
          type: 'string',
          initialValue: 'Villages & Villes à Visiter',
        },
        {
          name: 'villages',
          title: 'Liste des Villages',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'name', title: 'Nom', type: 'string' },
                { name: 'distance', title: 'Distance', type: 'string' },
                { name: 'description', title: 'Description', type: 'text', rows: 2 },
                {
                  name: 'image',
                  title: 'Photo',
                  type: 'image',
                  options: { hotspot: true },
                  fields: [{ name: 'alt', title: 'Alt', type: 'string' }],
                },
              ],
              preview: {
                select: { title: 'name', subtitle: 'distance', media: 'image' },
              },
            },
          ],
          initialValue: [
            {
              name: 'Eguisheim',
              distance: '10 min à pied',
              description: "L'un des plus beaux villages de France, avec ses ruelles circulaires et ses maisons à colombages",
            },
            {
              name: 'Colmar',
              distance: '5 km',
              description: "La capitale des Vins d'Alsace, la Petite Venise, musées et architecture exceptionnelle",
            },
            {
              name: 'Riquewihr',
              distance: '15 km',
              description: "Village médiéval fortifié classé parmi les plus beaux villages de France",
            },
            {
              name: 'Kaysersberg',
              distance: '20 km',
              description: "Village natal d'Albert Schweitzer, marché de Noël réputé, architecture remarquable",
            },
          ],
        },
      ],
    },

    // ==================== ACTIVITIES SECTION ====================
    {
      name: 'activitiesSection',
      title: 'Section Activités',
      type: 'object',
      group: 'activities',
      fields: [
        {
          name: 'badge',
          title: 'Badge',
          type: 'string',
          initialValue: 'Activités',
        },
        {
          name: 'title',
          title: 'Titre',
          type: 'string',
          initialValue: 'Que Faire en Alsace ?',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
          initialValue: "Une multitude d'activités vous attend pour découvrir la richesse de notre région",
        },
        {
          name: 'activities',
          title: 'Liste des Activités',
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
                      { title: '🍷 Vin (Wine)', value: 'Wine' },
                      { title: '🥾 Rando (TentTree)', value: 'TentTree' },
                      { title: '🚲 Vélo (Bike)', value: 'Bike' },
                      { title: '🏰 Château (Castle)', value: 'Castle' },
                      { title: '🍴 Gastronomie (UtensilsCrossed)', value: 'UtensilsCrossed' },
                      { title: '📷 Photo/Noël (Camera)', value: 'Camera' },
                      { title: '🌲 Forêt (TreePine)', value: 'TreePine' },
                      { title: '🚗 Voiture/Musée (Car)', value: 'Car' },
                    ],
                  },
                },
                { name: 'title', title: 'Titre', type: 'string' },
                { name: 'description', title: 'Description', type: 'text', rows: 2 },
              ],
              preview: {
                select: { title: 'title', subtitle: 'description' },
              },
            },
          ],
          initialValue: [
            {
              icon: 'Wine',
              title: 'Dégustation de Vins',
              description: "Visitez les caves et domaines viticoles environnants. Découvrez les Grands Crus d'Alsace.",
            },
            {
              icon: 'TentTree',
              title: 'Randonnées',
              description: "Sentiers balisés dans les vignes et les Vosges. Du GR5 aux balades familiales.",
            },
            {
              icon: 'Bike',
              title: 'Vélo & Cyclotourisme',
              description: "Parcourez la Route des Vins à vélo. Pistes cyclables et circuits aménagés.",
            },
            {
              icon: 'Castle',
              title: 'Châteaux & Patrimoine',
              description: "Haut-Koenigsbourg, châteaux d'Eguisheim, patrimoine médiéval exceptionnel.",
            },
            {
              icon: 'UtensilsCrossed',
              title: 'Gastronomie',
              description: "Restaurants étoilés, winstubs traditionnels, spécialités alsaciennes authentiques.",
            },
            {
              icon: 'Camera',
              title: 'Marchés de Noël',
              description: "Colmar, Riquewihr, Kaysersberg... Les plus beaux marchés de Noël d'Europe (décembre).",
            },
            {
              icon: 'TreePine',
              title: 'Nature & Forêts',
              description: "Parc naturel des Ballons des Vosges, forêts, lacs et panoramas exceptionnels.",
            },
            {
              icon: 'Car',
              title: 'Musées & Loisirs',
              description: "Musée de l'Automobile, Cité du Train (Mulhouse), ou Europa-Park à proximité.",
            },
          ],
        },
      ],
    },

    // ==================== SEASONS SECTION ====================
    {
      name: 'seasonsSection',
      title: 'Section Saisons',
      type: 'object',
      group: 'seasons',
      fields: [
        {
          name: 'badge',
          title: 'Badge',
          type: 'string',
          initialValue: 'Toute l\'Année',
        },
        {
          name: 'title',
          title: 'Titre',
          type: 'string',
          initialValue: 'L\'Alsace au Fil des Saisons',
        },
        {
          name: 'seasons',
          title: 'Saisons',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'season', title: 'Saison', type: 'string' },
                { name: 'months', title: 'Mois', type: 'string' },
                { name: 'description', title: 'Description', type: 'text', rows: 2 },
                {
                  name: 'activities',
                  title: 'Activités (Liste)',
                  type: 'array',
                  of: [{ type: 'string' }],
                },
              ],
              preview: {
                select: { title: 'season', subtitle: 'months' },
              },
            },
          ],
          initialValue: [
            {
              season: "Printemps",
              months: "Mars - Mai",
              description: "Floraison des vignes, températures douces, nature en éveil",
              activities: ["Randonnées", "Visites de caves", "Balades à vélo"],
            },
            {
              season: "Été",
              months: "Juin - Août",
              description: "Vignes verdoyantes, festivals, terrasses ensoleillées",
              activities: ["Fêtes du vin", "Randonnées en montagne", "Baignade dans les lacs"],
            },
            {
              season: "Automne",
              months: "Septembre - Novembre",
              description: "Vendanges, couleurs flamboyantes, douceur automnale",
              activities: ["Vendanges", "Dégustation vin nouveau", "Cueillette champignons"],
            },
            {
              season: "Hiver",
              months: "Décembre - Février",
              description: "Marchés de Noël magiques, gastronomie réconfortante",
              activities: ["Marchés de Noël", "Ski dans les Vosges", "Gastronomie d'hiver"],
            },
          ],
        },
      ],
    },

    // ==================== WINE ROUTE SECTION ====================
    {
      name: 'wineRouteSection',
      title: 'Section Route des Vins',
      type: 'object',
      group: 'wineRoute',
      fields: [
        {
          name: 'badge',
          title: 'Badge',
          type: 'string',
          initialValue: 'Route des Vins',
        },
        {
          name: 'title',
          title: 'Titre',
          type: 'string',
          initialValue: 'Sur la Légendaire Route des Vins d\'Alsace',
        },
        {
          name: 'paragraphs',
          title: 'Contenu (Paragraphes)',
          type: 'array',
          of: [{ type: 'text', rows: 4 }],
          initialValue: [
            "Le gîte est idéalement situé sur la Route des Vins d'Alsace, itinéraire touristique mythique qui s'étend sur 170 km à travers les plus beaux villages viticoles.",
            "Découvrez les 7 cépages alsaciens : Riesling, Gewurztraminer, Pinot Gris, Muscat, Sylvaner, Pinot Blanc et Pinot Noir. Visitez les caves, rencontrez les vignerons passionnés.",
            "De nombreux domaines viticoles renommés vous accueillent pour des dégustations et des visites de caves dans un rayon de quelques kilomètres.",
          ],
        },
        {
          name: 'stats',
          title: 'Chiffres Clés',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'value', title: 'Valeur', type: 'string' },
                { name: 'label', title: 'Libellé', type: 'string' },
              ],
            },
          ],
          initialValue: [
            { value: '51', label: 'Grands Crus' },
            { value: '170 km', label: 'Route des Vins' },
          ],
        },
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', title: 'Alt', type: 'string' }],
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
          initialValue: "Prêt à Découvrir l'Alsace ?",
        },
        {
          name: 'text',
          title: 'Texte',
          type: 'text',
          rows: 2,
          initialValue: "Réservez votre séjour au cœur du vignoble et vivez une expérience inoubliable",
        },
        {
          name: 'button1Text',
          title: 'Bouton 1 Texte',
          type: 'string',
          initialValue: "Découvrir le Gîte",
        },
        {
          name: 'button1Link',
          title: 'Bouton 1 Lien',
          type: 'string',
          initialValue: "/gite",
        },
        {
          name: 'button2Text',
          title: 'Bouton 2 Texte',
          type: 'string',
          initialValue: "Demander un Devis",
        },
        {
          name: 'button2Link',
          title: 'Bouton 2 Lien',
          type: 'string',
          initialValue: "/contact",
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
          initialValue: "Tourisme & Région - l'écrin du vignoble | Route des Vins, Colmar, Eguisheim",
        },
        {
          name: 'metaDescription',
          title: 'Description Meta',
          type: 'text',
          rows: 3,
          initialValue: "Découvrez l'Alsace depuis Wettolsheim : à 10 min d'Eguisheim (plus beau village de France), 5 km de Colmar, sur la Route des Vins. Châteaux, vignobles, gastronomie, randonnées.",
        },
        {
          name: 'keywords',
          title: 'Mots-clés',
          type: 'array',
          of: [{ type: 'string' }],
          options: { layout: 'tags' },
          initialValue: [
            "Route des Vins Alsace",
            "Eguisheim",
            "Colmar tourisme",
            "villages alsaciens",
            "vignoble Alsace",
            "activités Alsace",
            "randonnée Alsace",
            "châteaux Alsace",
          ],
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: '🗺️ Page Région',
      }
    },
  },
})
