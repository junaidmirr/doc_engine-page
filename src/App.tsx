import { useState } from 'react';
import { ThemeProvider } from './context/ThemeProvider';
import { Navbar, type TabKey } from './components/Navbar';
import { DocumentationShowcase } from './components/DocumentationShowcase';
import { TemplatesShowcase, type TemplateKey } from './components/TemplatesShowcase';
import { ReactJSXShowcase } from './components/ReactJSXShowcase';
import { FlexGridLayoutShowcase } from './components/FlexGridLayoutShowcase';
import { PaginationShowcase } from './components/PaginationShowcase';
import { StudioShowcase } from './components/StudioShowcase';
import { RendererBenchmarkShowcase } from './components/RendererBenchmarkShowcase';
import { CoreEngineShowcase } from './components/CoreEngineShowcase';
import { McpAgentShowcase } from './components/McpAgentShowcase';
import { SocialButtons } from './components/SocialIcons';
import logoImg from './assets/logo.png';
import './App.css';

export function AppContent() {
  const [activeTab, setActiveTab] = useState<TabKey>('docs');
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey>('invoice');

  const handleNavigate = (tab: TabKey, subOption?: TemplateKey) => {
    if (subOption) {
      setSelectedTemplate(subOption);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="showcase-app">
      {/* Navigation Header */}
      <Navbar activeTab={activeTab} onSelectTab={handleNavigate} />

      {/* Main Content Area */}
      <main className="main-content">
        {activeTab === 'docs' && <DocumentationShowcase onNavigate={handleNavigate} />}
        {activeTab === 'templates' && <TemplatesShowcase key={selectedTemplate} initialTemplate={selectedTemplate} />}
        {activeTab === 'jsx' && <ReactJSXShowcase />}
        {activeTab === 'flex-grid' && <FlexGridLayoutShowcase />}
        {activeTab === 'pagination' && <PaginationShowcase />}
        {activeTab === 'studio' && <StudioShowcase />}
        {activeTab === 'renderers' && <RendererBenchmarkShowcase />}
        {activeTab === 'core-engine' && <CoreEngineShowcase />}
        {activeTab === 'mcp' && <McpAgentShowcase />}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <img src={logoImg} alt="doc-engine" className="footer-logo-img" />
            <span className="mono-brand">doc-engine</span>
            <span className="footer-sep">/</span>
            <span>client-side vector document compiler</span>
          </div>

          <div className="footer-socials-wrapper">
            <span className="footer-socials-label">Socials:</span>
            <SocialButtons className="footer-socials" />
          </div>

          <div className="footer-stats">
            <span>canvas 2d</span>
            <span className="footer-dot">•</span>
            <span>pdf 1.7</span>
            <span className="footer-dot">•</span>
            <span>pure typescript</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
