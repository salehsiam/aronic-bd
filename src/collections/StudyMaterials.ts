import type { CollectionConfig } from 'payload'

export const StudyMaterials: CollectionConfig = {
  slug: 'study-materials',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'subject', 'type', 'year', 'isPublic'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'subject',
      type: 'select',
      required: true,
      label: 'Subject',
      options: [
        { label: 'Forensic Medicine', value: 'forensic-medicine' },
        { label: 'Toxicology', value: 'toxicology' },
        { label: 'Medical Jurisprudence', value: 'medical-jurisprudence' },
        { label: 'Forensic Pathology', value: 'forensic-pathology' },
      ],
    },
    {
      name: 'year',
      type: 'select',
      label: 'Student Year',
      options: [
        { label: '1st Year', value: '1st-year' },
        { label: '2nd Year', value: '2nd-year' },
        { label: '3rd Year', value: '3rd-year' },
        { label: '4th Year', value: '4th-year' },
        { label: 'Final Year', value: 'final-year' },
        { label: 'All Years', value: 'all-years' },
      ],
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      label: 'Material Type',
      options: [
        { label: 'Lecture Note', value: 'lecture-note' },
        { label: 'Question Bank', value: 'question-bank' },
        { label: 'Case Study', value: 'case-study' },
        { label: 'Guideline', value: 'guideline' },
        { label: 'Reference', value: 'reference' },
        { label: 'Presentation', value: 'presentation' },
      ],
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'File (PDF)',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'uploadedBy',
      type: 'relationship',
      relationTo: 'faculty',
      label: 'Uploaded By',
    },
    {
      name: 'downloadCount',
      type: 'number',
      label: 'Download Count',
      defaultValue: 0,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'isPublic',
      type: 'checkbox',
      label: 'Publicly Available?',
      defaultValue: true,
      admin: {
        description: 'Uncheck করলে শুধু logged-in users দেখতে পারবে',
      },
    },
  ],
}
