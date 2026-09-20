export interface WordCampEntry {
  event: string;
  role: string;
  year: string;
  achievements: string[];
}

// Only confirmed real appearances. WordCamp Nepal/Asia attendance is
// unconfirmed — do not add entries for them until confirmed (spec §2, §10
// of the parent design doc).
export const wordcamps: WordCampEntry[] = [
  {
    event: 'WordCamp Kathmandu',
    role: 'Organizer',
    year: '2022',
    achievements: [
      'Volunteered as an organizer for WordCamp Kathmandu 2022.',
      'Recognized for dedicated volunteer service to the local WordPress community.',
    ],
  },
];
