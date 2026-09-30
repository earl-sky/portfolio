import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SiteLayout from './components/SiteLayout';
import AboutPage from './pages/AboutPage';
import AIReferencePage from './pages/AIReferencePage';
import BaxterIVPExpPage from './pages/BaxterIVPExpPage';
import CategoryPage from './pages/CategoryPage';
import EveChemoPage from './pages/EveChemoPage';
import HomePage from './pages/HomePage';
import QueueEveIVsPage from './pages/QueueEveIVsPage';
import { FinanceCalculatorPage, IndicesTrackerPage, NotFoundPage, ProjectRoutePage, SP500HeatmapPage } from './pages/ProjectPages';
import './App.css';
import './Pages.css';

function RouteContent() {
  return (
    <SiteLayout>
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
        <Route path="/software/edge-ai" element={<ProjectRoutePage />} />
        <Route path="/software/embedded" element={<ProjectRoutePage />} />
        <Route path="/software/api-observability" element={<ProjectRoutePage />} />

        {/* Finance projects, in portfolio order */}
        <Route path="/finance/sp500-heatmap" element={<SP500HeatmapPage />} />
        <Route path="/finance/indices-tracker" element={<IndicesTrackerPage />} />
        <Route path="/finance/calculator" element={<FinanceCalculatorPage />} />

        {/* Healthcare projects, in portfolio order */}
        <Route path="/healthcare/care-team" element={<ProjectRoutePage />} />
        <Route path="/healthcare/health-insights" element={<ProjectRoutePage />} />
        <Route path="/healthcare/medication-planner" element={<ProjectRoutePage />} />
        <Route path="/healthcare/eve-chemo" element={<EveChemoPage />} />
        <Route path="/healthcare/queue-eve-ivs" element={<QueueEveIVsPage />} />
        <Route path="/healthcare/baxter-ivp-exp" element={<BaxterIVPExpPage />} />

        {/* Art projects, in portfolio order */}
        <Route path="/art/digital-gallery" element={<ProjectRoutePage />} />
        <Route path="/art/generative-studies" element={<ProjectRoutePage />} />
        <Route path="/art/interactive-sketchbook" element={<ProjectRoutePage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </SiteLayout>
  );
}

export default function App() {
  return <BrowserRouter><RouteContent /></BrowserRouter>;
}
