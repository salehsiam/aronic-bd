import type { CollectionConfig } from 'payload'

export const Research: CollectionConfig = {
  slug: 'research',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishYear', 'category', 'isFeatured'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Research Title',
    },
    {
      name: 'authors',
      type: 'array',
      label: 'Authors (External)',
      fields: [
        {
          name: 'authorName',
          type: 'text',
          required: true,
          label: 'Author Name',
        },
      ],
    },
    {
      name: 'facultyAuthors',
      type: 'relationship',
      relationTo: 'faculty',
      hasMany: true,
      label: 'Faculty Authors',
    },
    {
      name: 'journal',
      type: 'text',
      label: 'Journal / Conference Name',
    },
    {
      name: 'publishYear',
      type: 'number',
      required: true,
      label: 'Publication Year',
    },
    {
      name: 'volume',
      type: 'text',
      label: 'Volume & Issue',
    },
    {
      name: 'pages',
      type: 'text',
      label: 'Pages',
    },
    {
      name: 'doi',
      type: 'text',
      label: 'DOI Link',
    },
    {
      name: 'abstract',
      type: 'textarea',
      label: 'Abstract',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Category',
      options: [
        { label: 'Journal Article', value: 'journal-article' },
        { label: 'Conference Paper', value: 'conference-paper' },
        { label: 'Book Chapter', value: 'book-chapter' },
        { label: 'Thesis', value: 'thesis' },
      ],
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      label: 'PDF File (Optional)',
    },
    {
      name: 'externalLink',
      type: 'text',
      label: 'External Link (PubMed etc.)',
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      label: 'Featured on Homepage?',
      defaultValue: false,
    },
  ],
}
