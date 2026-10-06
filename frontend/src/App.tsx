import { lazy, Suspense } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import SiteLayout from './components/SiteLayout';
import './App.css';
import './Pages.css';

const AboutPage = lazy(() => import('./pages/AboutPage'));
const AIReferencePage = lazy(() => import('./pages/AIReferencePage'));
const BaxterIVPExpPage = lazy(() => import('./pages/BaxterIVPExpPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const CreativeToolkitPage = lazy(() => import('./pages/CreativeToolkitPage'));
const EffectsPatternsPage = lazy(() => import('./pages/EffectsPatternsPage'));
const EveChemoPage = lazy(() => import('./pages/EveChemoPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const QueueEveIVsPage = lazy(() => import('./pages/QueueEveIVsPage'));
const FinanceCalculatorPage = lazy(() => import('./pages/ProjectPages').then((module) => ({ default: module.FinanceCalculatorPage })));
const IndicesTrackerPage = lazy(() => import('./pages/ProjectPages').then((module) => ({ default: module.IndicesTrackerPage })));
const NotFoundPage = lazy(() => import('./pages/ProjectPages').then((module) => ({ default: module.NotFoundPage })));
const ProjectRoutePage = lazy(() => import('./pages/ProjectPages').then((module) => ({ default: module.ProjectRoutePage })));
const SP500HeatmapPage = lazy(() => import('./pages/ProjectPages').then((module) => ({ default: module.SP500HeatmapPage })));

function RouteContent() {
  return (
    <SiteLayout>
      <Suspense fallback={<div className="route-loading" role="status">Loading page…</div>}>
        <Routes>
          {/* Main pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/software" element={<CategoryPage categoryKey="software" />} />
          <Route path="/finance" element={<CategoryPage categoryKey="finance" />} />
          <Route path="/healthcare" element={<CategoryPage categoryKey="healthcare" />} />
          <Route path="/art" element={<CategoryPage categoryKey="art" />} />
          <Route path="/about" element={<AboutPage />} />

          {/* Software projects, in portfolio order */}
          <Route path="/software/task-to-do" element={<ProjectRoutePage />} />
          <Route path="/software/ai-reference" element={<AIReferencePage />} />
          <Route path="/software/embedded" element={<ProjectRoutePage projectCategory="software" projectSlug="embedded" />} />

          {/* Finance projects, in portfolio order */}
          <Route path="/finance/sp500-heatmap" element={<SP500HeatmapPage />} />
          <Route path="/finance/indices-tracker" element={<IndicesTrackerPage />} />
          <Route path="/finance/calculator" element={<FinanceCalculatorPage />} />

          {/* Healthcare projects, in portfolio order */}
          <Route path="/healthcare/eve-chemo" element={<EveChemoPage />} />
          <Route path="/healthcare/queue-eve-ivs" element={<QueueEveIVsPage />} />
          <Route path="/healthcare/baxter-ivp-exp" element={<BaxterIVPExpPage />} />

          {/* Art projects, in portfolio order */}
          <Route path="/art/digital-gallery" element={<ProjectRoutePage />} />
          <Route path="/art/generative-studies" element={<ProjectRoutePage />} />
          <Route path="/art/interactive-sketchbook" element={<ProjectRoutePage />} />
          <Route path="/art/terminal-art" element={<ProjectRoutePage projectCategory="art" projectSlug="terminal-art" />} />
          <Route path="/art/creative-toolkit" element={<CreativeToolkitPage />} />
          <Route path="/art/effects-patterns" element={<EffectsPatternsPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </SiteLayout>
  );
}

export default function App() {
  return <HashRouter><RouteContent /></HashRouter>;
}
