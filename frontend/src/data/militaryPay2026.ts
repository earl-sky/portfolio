// 2026 monthly active-duty basic pay transcribed from official DFAS tables.
// Source: https://www.dfas.mil/Military-Members/payentitlements/Pay-Tables/Basic-Pay/
// Basic pay only: allowances, special pay, deductions, and tax are not included.

export const serviceBrackets = [
  { id: 0, label: '2 years or less' },
  { id: 1, label: 'Over 2 years' },
  { id: 2, label: 'Over 3 years' },
  { id: 3, label: 'Over 4 years' },
  { id: 4, label: 'Over 6 years' },
  { id: 5, label: 'Over 8 years' },
  { id: 6, label: 'Over 10 years' },
  { id: 7, label: 'Over 12 years' },
  { id: 8, label: 'Over 14 years' },
  { id: 9, label: 'Over 16 years' },
  { id: 10, label: 'Over 18 years' },
  { id: 11, label: 'Over 20 years' },
  { id: 12, label: 'Over 22 years' },
  { id: 13, label: 'Over 24 years' },
  { id: 14, label: 'Over 26 years' },
  { id: 15, label: 'Over 28 years' },
  { id: 16, label: 'Over 30 years' },
  { id: 17, label: 'Over 32 years' },
  { id: 18, label: 'Over 34 years' },
  { id: 19, label: 'Over 36 years' },
  { id: 20, label: 'Over 38 years' },
  { id: 21, label: 'Over 40 years' },
] as const;

export type PayGrade =
  | 'E-1' | 'E-2' | 'E-3' | 'E-4' | 'E-5' | 'E-6' | 'E-7' | 'E-8' | 'E-9'
  | 'W-1' | 'W-2' | 'W-3' | 'W-4' | 'W-5'
  | 'O-1' | 'O-2' | 'O-3' | 'O-4' | 'O-5' | 'O-6' | 'O-7' | 'O-8' | 'O-9' | 'O-10';

type PayRow = Array<number | null>;
const row = (firstStep: number, publishedRates: number[]): PayRow =>
  Array.from({ length: serviceBrackets.length }, (_, index) =>
    index < firstStep ? null : publishedRates[Math.min(index - firstStep, publishedRates.length - 1)],
  );

export const militaryPay2026: Record<PayGrade, PayRow> = {
  // Enlisted — effective January 1, 2026.
  'E-1': row(0, [2407.2]),
  'E-2': row(0, [2697.9]),
  'E-3': row(0, [2836.8, 3015, 3198]),
  'E-4': row(0, [3142.2, 3303, 3482.4, 3658.5, 3815.4]),
  'E-5': row(0, [3342.9, 3598.2, 3775.8, 3946.8, 4110, 4299.9, 4395.3, 4421.7]),
  'E-6': row(0, [3401.1, 3743.1, 3908.1, 4068.9, 4235.7, 4612.8, 4759.5, 5043.3, 5130.3, 5193.6, 5267.7]),
  'E-7': row(0, [3932.1, 4291.5, 4456.2, 4673.1, 4843.8, 5135.7, 5300.4, 5591.7, 5835, 6000.9, 6177.3, 6245.7, 6475.2, 6598.2, 7067.4]),
  'E-8': row(5, [5656.5, 5907, 6061.8, 6247.2, 6448.2, 6811.2, 6995.4, 7308.3, 7481.7, 7908.9, 7908.9, 8067.3]),
  'E-9': row(6, [6910.2, 7066.5, 7263.6, 7496.1, 7730.7, 8105.1, 8423.1, 8756.7, 9267.9, 9267.9, 9730.2, 9730.2, 10217.4, 10217.4, 10729.2]),

  // Warrant officers — effective January 1, 2026.
  'W-1': row(0, [4056.6, 4493.7, 4611, 4859.1, 5152.2, 5584.2, 5786.1, 6069.3, 6346.5, 6564.9, 6766.2, 7010.1]),
  'W-2': row(0, [4621.8, 5058.9, 5193.3, 5286, 5585.4, 6051, 6282.6, 6509.4, 6787.5, 7005, 7201.5, 7437, 7591.5, 7714.2]),
  'W-3': row(0, [5223.3, 5440.5, 5664.3, 5736.9, 5970.9, 6431.1, 6910.5, 7136.4, 7397.7, 7665.9, 8150.4, 8476.5, 8671.8, 8879.7, 9162.6]),
  'W-4': row(0, [5719.8, 6152.1, 6328.5, 6502.2, 6801.9, 7098, 7398, 7848.3, 8243.7, 8619.9, 8928.6, 9228.9, 9669.6, 10032, 10445.4, 10445.4, 10653.6]),
  'W-5': row(11, [10169.7, 10685.7, 11070.3, 11495.1, 11495.1, 12070.8, 12070.8, 12673.5, 12673.5, 13308.3, 13308.3]),

  // Commissioned officers — standard table (not the separate O-1E/O-2E/O-3E schedule).
  'O-1': row(0, [4150.2, 4320, 5222.4]),
  'O-2': row(0, [4782, 5446.2, 6272.4, 6484.5, 6617.7]),
  'O-3': row(0, [5534.1, 6273.9, 6770.4, 7382.7, 7737, 8125.5, 8375.7, 8788.2, 9004.2]),
  'O-4': row(0, [6294.6, 7286.4, 7773.6, 7881, 8332.2, 8816.4, 9420, 9888.3, 10214.4, 10401.6, 10509.9]),
  'O-5': row(0, [7295.4, 8218.2, 8787, 8894.1, 9249.6, 9461.4, 9928.5, 10271.7, 10715.1, 11391.3, 11713.8, 12032.7, 12394.8]),
  'O-6': row(0, [8751.3, 9613.8, 10245, 10245, 10284.3, 10725, 10783.5, 10783.5, 11396.4, 12479.7, 13115.4, 13751.1, 14112.9, 14479.2, 15188.7, 15188.7, 15408.3]),
  'O-7': row(0, [11540.1, 12076.2, 12324.3, 12522, 12878.7, 13231.8, 13639.2, 14045.7, 14454.3, 15735.3, 16817.7, 16817.7, 16817.7, 16904.4, 16904.4, 17242.2]),
  'O-8': row(0, [13888.5, 14343.9, 14645.4, 14729.4, 15106.5, 15735.3, 15882, 16479.6, 16651.8, 17166.6, 17911.8, 18598.2, 18999.9]),
  'O-9': row(11, [18999.9]),
  'O-10': row(11, [18999.9]),
};

export const militaryGradeGroups: { label: string; grades: PayGrade[] }[] = [
  { label: 'Enlisted', grades: ['E-1', 'E-2', 'E-3', 'E-4', 'E-5', 'E-6', 'E-7', 'E-8', 'E-9'] },
  { label: 'Warrant officer', grades: ['W-1', 'W-2', 'W-3', 'W-4', 'W-5'] },
  { label: 'Commissioned officer', grades: ['O-1', 'O-2', 'O-3', 'O-4', 'O-5', 'O-6', 'O-7', 'O-8', 'O-9', 'O-10'] },
];

export function getMonthlyBasicPay2026(grade: PayGrade, serviceStep: number): number | null {
  return militaryPay2026[grade]?.[serviceStep] ?? null;
}
