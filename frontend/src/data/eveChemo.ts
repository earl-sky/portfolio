export type EveChemoEntry = {
  medication: string;
  tubing: string;
  bud: string;
  other: string;
};

// Transcribed from the user-supplied evechemolist.html; not clinically validated.
export const eveChemoEntries: EveChemoEntry[] = [
  { medication: 'BLEOmycin', tubing: 'STD', bud: '🏠 1 d', other: '-' },
  { medication: 'CARBOplatin', tubing: 'STD', bud: '🏠 1 d (NS) 🏠 30 h|r (D5W)\n❄️ 30 hr (NS) ❄️ 7 d (D5W)', other: '-' },
  { medication: 'CISplatin', tubing: 'STD', bud: '🏠 30 hr', other: '⚠️ Protect from Light ☀️' },
  { medication: 'DACARBAzine', tubing: 'STD', bud: '🏠 8 hr ❄️ 1 d', other: '⚠️ Protect from Light ☀️' },
  { medication: 'DOCEtaxel', tubing: 'TAX', bud: '🏠 6 hr ❄️ 1 d', other: '⚠️ Protect from Light ☀️' },
  { medication: 'DOXOrubicin', tubing: 'STD / EXT', bud: '🏠 2 d ❄️ 8 d', other: "🛑Don't mix LIPOSOMAL version.\n⚠️ Protect from Light ☀️" },
  { medication: 'ETOposide', tubing: 'TAX', bud: '🏠 0.2mg/mL = 4 d\n🏠 0.3mg/mL = 2 d\n🏠 0.4mg/mL = 1 d', other: '-' },
  { medication: 'FLUOROURAcil', tubing: 'PUMP | EXT', bud: '🎱🏠 4 d | 💉🏠 1 d', other: '-' },
  { medication: 'FOSaprepitant', tubing: 'KIT', bud: '❄️', other: 'ORANGE ATT + NS100 + MED' },
  { medication: 'GEMcitabine', tubing: 'STD', bud: '🏠 1 d', other: '-' },
  { medication: 'IRInotecan', tubing: 'STD', bud: '🏠 1 d ❄️ 2 d', other: '⚠️ Protect from Light ☀️' },
  { medication: 'LEUcovorin', tubing: '-', bud: '🏠 1 d ❄️ 7 d', other: '-' },
  { medication: 'METHOtrexate IV dose', tubing: 'STD', bud: '🏠 1 d', other: '-' },
  { medication: 'OXAplatin', tubing: 'STD', bud: '❄️ 1 d', other: '-' },
  { medication: 'PACLitaxel', tubing: 'TAX', bud: '🏠 27 hr', other: '-' },
  { medication: 'VINcristine', tubing: 'STD', bud: '🏠 1 d ❄️ 7 d', other: '⚠️ Protect from Light ☀️' },
];
