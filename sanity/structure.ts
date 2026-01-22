import { StructureBuilder } from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Pages')
    .items([
      S.listItem()
        .title('Accueil')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
        ),
      S.listItem()
        .title('Le Gîte')
        .child(
          S.document()
            .schemaType('gitePage')
            .documentId('gitePage')
        ),
      S.listItem()
        .title('Région')
        .child(
          S.document()
            .schemaType('regionPage')
            .documentId('regionPage')
        ),
      S.listItem()
        .title('Contact')
        .child(
          S.document()
            .schemaType('contactPage')
            .documentId('contactPage')
        ),
      S.divider(),
      S.documentTypeListItem('legalPage')
        .title('Pages Légales'),
      S.listItem()
        .title('Footer (Bas de page)')
        .child(
          S.document()
            .schemaType('footer')
            .documentId('footer')
        ),
    ])
