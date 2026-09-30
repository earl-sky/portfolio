import type { LucideIcon } from 'lucide-react';
import { Activity, BrainCircuit, Calculator, ChartNoAxesCombined, CircuitBoard, ClipboardList, Cpu, HeartPulse, Image, Palette, Pill, Sparkles } from 'lucide-react';

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
    description: 'A home for product ideas across application software, artificial intelligence, edge devices, embedded systems, and backend observability.',
    projects: [
      { slug: 'task-to-do', title: 'Task To Do', kicker: 'PRODUCTIVITY', description: 'A project slot for a focused task planner. Add your workflow, demo, and engineering decisions.', route: '/software/task-to-do', icon: ClipboardList, tags: ['React', 'TypeScript'], status: 'concept' },
      { slug: 'ai-reference', title: 'AI Reference', kicker: 'ARTIFICIAL INTELLIGENCE / MODEL DIRECTORY', description: 'A tiered model directory using the supplied list, with official links only where a first-party source confirms the model.', route: '/software/ai-reference', icon: BrainCircuit, tags: ['32 models', 'Official links'], status: 'demo' },
      { slug: 'edge-ai', title: 'Edge AI Projx', kicker: 'EDGE COMPUTING', description: 'A project slot for on-device inference, constrained runtimes, and edge deployment work.', route: '/software/edge-ai', icon: Cpu, tags: ['Edge AI', 'Inference'], status: 'concept' },
      { slug: 'embedded', title: 'Embedded Projx', kicker: 'EMBEDDED SYSTEMS', description: 'A project slot for firmware, microcontrollers, and hardware/software integration.', route: '/software/embedded', icon: CircuitBoard, tags: ['C / C++', 'Hardware'], status: 'concept' },
      { slug: 'api-observability', title: 'API Observability', kicker: 'BACKEND SYSTEMS / OBSERVABILITY', description: 'A project slot for service health, latency trends, and actionable backend telemetry.', route: '/software/api-observability', icon: Activity, tags: ['Spring Boot', 'Metrics', 'React'], status: 'concept' },
    ],
  },
  finance: {
    key: 'finance', label: 'Finance', eyebrow: 'FINANCE / VISUAL TOOLS',
    title: 'Complex numbers. Clearer views.', accent: 'lime',
    description: 'A collection of market-data and compensation-tool concepts. Market boards are demo layouts until a data provider is connected.',
    projects: [
      { slug: 'sp500-heatmap', title: 'S&P 500 Heatmap', kicker: 'MARKET VISUALIZATION', description: 'Explore a treemap-style market view. The current color tiles are illustrative demo content, not live returns.', route: '/finance/sp500-heatmap', icon: ChartNoAxesCombined, tags: ['S&P 500', 'Heatmap'], status: 'demo' },
      { slug: 'indices-tracker', title: 'Indices Tracker', kicker: 'INDEX OVERVIEW', description: 'A dedicated screen for SPX, DJIA, IXIC, and RUT, ready for a live quote feed.', route: '/finance/indices-tracker', icon: Activity, tags: ['SPX', 'DJIA', 'IXIC', 'RUT'], status: 'demo' },
      { slug: 'calculator', title: 'Pay Calculators', kicker: 'COMPENSATION TOOLS', description: 'Estimate salary take-home from an editable tax rate, or look up 2026 U.S. military base pay by grade and service bracket.', route: '/finance/calculator', icon: Calculator, tags: ['Gross → Net', 'Military Pay'], status: 'tool' },
    ],
  },
  healthcare: {
    key: 'healthcare', label: 'Healthcare', eyebrow: 'HEALTHCARE / CONCEPTS',
    title: 'Technology for more thoughtful care.', accent: 'teal',
    description: 'A matching portfolio section for healthcare software concepts and reference demos. Eve Chemo, Queue Eve IVs, and Baxter IVP exp use supplied, unverified source material; source macros are display-only and medication intervals are not clinical guidance.',
    projects: [
      { slug: 'care-team', title: 'Care Team Workspace', kicker: 'CARE COORDINATION', description: 'A concept slot for a shared care-team view, communication flow, or patient handoff tool.', route: '/healthcare/care-team', icon: HeartPulse, tags: ['Workflow', 'Accessibility'], status: 'concept' },
      { slug: 'health-insights', title: 'Health Insights', kicker: 'PATIENT EXPERIENCE', description: 'A concept slot for turning personal health information into clearer, patient-friendly summaries.', route: '/healthcare/health-insights', icon: Activity, tags: ['Data', 'Patient tools'], status: 'concept' },
      { slug: 'medication-planner', title: 'Medication Planner', kicker: 'DAILY SUPPORT', description: 'A concept slot for medication schedules, reminders, and approachable adherence experiences.', route: '/healthcare/medication-planner', icon: Pill, tags: ['Planning', 'Mobile'], status: 'concept' },
      { slug: 'eve-chemo', title: 'Eve Chemo', kicker: 'EVENING SHIFT / REFERENCE DEMO', description: 'A searchable view of the supplied evening-shift medication reference. Source values are unverified and not clinical guidance.', route: '/healthcare/eve-chemo', icon: Pill, tags: ['Reference demo', 'BUD', 'Tubing'], status: 'demo' },
      { slug: 'queue-eve-ivs', title: 'Queue Eve IVs', kicker: 'EVENING SHIFT / WORKFLOW DEMO', description: 'A read-only view of the supplied workflow details and macros. Macro text is displayed only and never executed; source accuracy is unverified.', route: '/healthcare/queue-eve-ivs', icon: ClipboardList, tags: ['Workflow source', 'Display-only'], status: 'demo' },
      { slug: 'baxter-ivp-exp', title: 'Baxter IVP exp', kicker: 'MEDICATION STORAGE / REFERENCE DEMO', description: 'Shows medication names and intervals from the supplied HTML. Values are unverified, not clinical guidance, and no expiry dates are calculated.', route: '/healthcare/baxter-ivp-exp', icon: Pill, tags: ['Source intervals', 'No date output'], status: 'demo' },
    ],
  },
  art: {
    key: 'art', label: 'Art', eyebrow: 'ART / EXPERIMENTS',
    title: 'A little room for the unexpected.', accent: 'red',
    description: 'A gallery-style home for visual experiments, creative coding, and work that sits between software and art.',
    projects: [
      { slug: 'digital-gallery', title: 'Digital Gallery', kicker: 'SELECTED WORK', description: 'A concept slot for a curated gallery of illustrations, photography, or digital pieces.', route: '/art/digital-gallery', icon: Image, tags: ['Gallery', 'Visuals'], status: 'concept' },
      { slug: 'generative-studies', title: 'Generative Studies', kicker: 'CREATIVE CODE', description: 'A concept slot for procedural art, generative forms, and code-led visual experiments.', route: '/art/generative-studies', icon: Sparkles, tags: ['Generative', 'Code'], status: 'concept' },
      { slug: 'interactive-sketchbook', title: 'Interactive Sketchbook', kicker: 'PLAY / INTERACTION', description: 'A concept slot for small interactive pieces, sketches, and playful browser experiments.', route: '/art/interactive-sketchbook', icon: Palette, tags: ['Interactive', 'Experiments'], status: 'concept' },
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
