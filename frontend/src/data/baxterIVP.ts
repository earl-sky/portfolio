export type BaxterIVPItem = {
  medication: string;
  sourceInterval: string;
};

export type BaxterIVPSection = {
  group: string;
  items: BaxterIVPItem[];
};

// Transcribed from the user-supplied roomexp.html; values are unverified source content.
export const baxterIVPSections: BaxterIVPSection[] = [
  {
    group: 'IVP (Baxter)',
    items: [
      { medication: 'cefAZOLIN', sourceInterval: '30 days' },
      { medication: 'cefEPIME', sourceInterval: '7 days' },
      { medication: 'cefTRIAXone', sourceInterval: '21 days' },
      { medication: 'VANComycin', sourceInterval: '30 days' },
      { medication: 'ZOSYN', sourceInterval: '14 days' },
    ],
  },
  {
    group: 'AWS',
    items: [
      { medication: 'roCUROnium', sourceInterval: '60 days' },
      { medication: 'VASOpressin', sourceInterval: '365 days' },
      { medication: 'SUCCinylcholine', sourceInterval: '14 days' },
    ],
  },
];
