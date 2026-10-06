import type { LucideIcon } from 'lucide-react';
import { Activity, BrainCircuit, Calculator, ChartNoAxesCombined, ClipboardList, Cpu, Gamepad2, Pill, Shapes, Terminal } from 'lucide-react';

export type CategoryKey = 'software' | 'finance' | 'healthcare' | 'art';
export type ProjectStatus = 'concept' | 'demo' | 'tool';
export type PortfolioProject = {
  slug: string;
  title: string;
  kicker: string;
  description: string;
  route: string;
  icon: LucideIcon;
  tags: string[];
  status: ProjectStatus;
};
export type PortfolioCategory = {
  key: CategoryKey;
  label: string;
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  projects: PortfolioProject[];
};

export const categories: Record<CategoryKey, PortfolioCategory> = {
  software: {
    key: 'software', label: 'Software', eyebrow: 'SOFTWARE / SELECTED BUILDS',
    title: 'Interfaces, systems, and the code between.', accent: 'teal',
    description: 'A home for application software, artificial intelligence, and embedded systems projects.',
    projects: [
      { slug: 'task-to-do', title: 'Task To Do', kicker: 'PRODUCTIVITY', description: 'A project slot for a focused task planner. Add your workflow, demo, and engineering decisions.', route: '/software/task-to-do', icon: ClipboardList, tags: ['React', 'TypeScript'], status: 'concept' },
      { slug: 'ai-reference', title: 'AI Reference', kicker: 'ARTIFICIAL INTELLIGENCE / MODEL DIRECTORY', description: 'A tiered model directory using the supplied list, with official links only where a first-party source confirms the model.', route: '/software/ai-reference', icon: BrainCircuit, tags: ['32 models', 'Official links'], status: 'demo' },
      { slug: 'embedded', title: 'Embedded Projx', kicker: 'EMBEDDED SYSTEMS', description: 'Arduino and Raspberry Pi 5 projects covering firmware, sensors, hardware integration, and small Linux-based builds.', route: '/software/embedded', icon: Cpu, tags: ['Arduino', 'Raspberry Pi 5'], status: 'concept' },
    ],
  },
  finance: {
    key: 'finance', label: 'Finance', eyebrow: 'FINANCE / VISUAL TOOLS',
    title: 'Complex numbers. Clearer views.', accent: 'lime',
    description: 'A collection of market-data and compensation-tool concepts. Market boards are demo layouts until a data provider is connected.',
    projects: [
      { slug: 'sp500-heatmap', title: 'S&P 500 Heatmap', kicker: 'MARKET VISUALIZATION', description: 'Explore a treemap-style market view. The current color tiles are illustrative demo content, not live returns.', route: '/finance/sp500-heatmap', icon: ChartNoAxesCombined, tags: ['S&P 500', 'Heatmap'], status: 'demo' },
      { slug: 'indices-tracker', title: 'Indices Tracker', kicker: 'INDEX OVERVIEW', description: 'A dedicated screen for SPX, DJIA, IXIC, and RUT, ready for a live quote feed.', route: '/finance/indices-tracker', icon: Activity, tags: ['SPX', 'DJIA', 'IXIC', 'RUT'], status: 'demo' },
      { slug: 'calculator', title: 'Pay Calculators', kicker: 'COMPENSATION TOOLS', description: 'Estimate salary take-home from an editable tax rate, or build a 2026 U.S. military paycheck from basic pay, duty-station BAH, BAS, and state residence tax.', route: '/finance/calculator', icon: Calculator, tags: ['Gross → Net', 'Military Pay', 'BAH', 'BAS'], status: 'tool' },
    ],
  },
  healthcare: {
    key: 'healthcare', label: 'Healthcare', eyebrow: 'HEALTHCARE / REFERENCE DEMOS',
    title: 'Technology for more thoughtful care.', accent: 'teal',
    description: 'Reference demos for healthcare workflows and medication information. Supplied source material is unverified; macros are display-only and medication intervals are not clinical guidance.',
    projects: [
      { slug: 'eve-chemo', title: 'Eve Chemo', kicker: 'EVENING SHIFT / REFERENCE DEMO', description: 'A searchable view of the supplied evening-shift medication reference. Source values are unverified and not clinical guidance.', route: '/healthcare/eve-chemo', icon: Pill, tags: ['Reference demo', 'BUD', 'Tubing'], status: 'demo' },
      { slug: 'queue-eve-ivs', title: 'Queue Eve IVs', kicker: 'EVENING SHIFT / WORKFLOW DEMO', description: 'A read-only view of the supplied workflow details and macros. Macro text is displayed only and never executed; source accuracy is unverified.', route: '/healthcare/queue-eve-ivs', icon: ClipboardList, tags: ['Workflow source', 'Display-only'], status: 'demo' },
      { slug: 'baxter-ivp-exp', title: 'Baxter IVP exp', kicker: 'MEDICATION STORAGE / REFERENCE DEMO', description: 'Shows medication names and intervals from the supplied HTML. Values are unverified, not clinical guidance, and no expiry dates are calculated.', route: '/healthcare/baxter-ivp-exp', icon: Pill, tags: ['Source intervals', 'No date output'], status: 'demo' },
    ],
  },
  art: {
    key: 'art', label: 'Art', eyebrow: 'ART / EXPERIMENTS',
    title: 'A little room for the unexpected.', accent: 'red',
    description: 'A gallery-style home for visual experiments, creative coding, terminal-native art, and work that sits between software and art.',
    projects: [
      { slug: 'terminal-art', title: 'Terminal Art', kicker: 'COMMAND-LINE VISUALS', description: 'A collection of terminal-native animations, ASCII art, audio visualizers, and system dashboards for macOS.', route: '/art/terminal-art', icon: Terminal, tags: ['Homebrew', 'ASCII', 'Terminal'], status: 'concept' },
      { slug: 'creative-toolkit', title: 'Creative Toolkit', kicker: 'GAMES / PIXEL ART / INTERACTIVE FICTION', description: 'A red-themed reference page linking official sites for PICO-8, PuzzleScript, Twine, Bitsy, Lospec, and LibreSprite.', route: '/art/creative-toolkit', icon: Gamepad2, tags: ['Game dev', 'Pixel art', 'Twine'], status: 'tool' },
      { slug: 'effects-patterns', title: 'Effects & Patterns', kicker: 'EFFECTS / GENERATIVE PATTERNS', description: 'A red-themed reference page linking The Ladybug browser effects studio and the Book of Shapes generative SVG pattern library.', route: '/art/effects-patterns', icon: Shapes, tags: ['Effects', 'SVG patterns'], status: 'tool' },
    ],
  },
};

export const categoryList = Object.values(categories);
export const projectList = categoryList.flatMap((category) => category.projects);

export function getProject(categoryKey: string | undefined, slug: string | undefined): PortfolioProject | undefined {
  if (!categoryKey || !slug || !Object.prototype.hasOwnProperty.call(categories, categoryKey)) return undefined;
  return categories[categoryKey as CategoryKey].projects.find((project) => project.slug === slug);
}

export function statusLabel(status: ProjectStatus): string {
  if (status === 'demo') return 'DEMO DATA';
  if (status === 'tool') return 'WORKING TOOL';
  return 'PROJECT SLOT';
}
