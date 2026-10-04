import React from 'react';
import {
  Files,
  Code2,
  LayoutGrid,
  Layers,
  Sliders,
  Gauge,
  Terminal,
  BookOpen,
  Sun,
  Moon,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { SocialButtons } from './SocialIcons';
import logoImg from '../assets/logo.png';

export type TabKey =
  | 'docs'
  | 'templates'
  | 'jsx'
  | 'flex-grid'
  | 'pagination'
  | 'studio'
  | 'renderers'
  | 'core-engine';

interface NavbarProps {
  activeTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onSelectTab }) => {
  const { theme, toggleTheme } = useTheme();

  const tabs: { key: TabKey; label: string; icon: React.ReactNode; badge?: string }[] = [
    { key: 'docs', label: 'Documentation', icon: <BookOpen size={13} />, badge: 'Guide' },
    { key: 'templates', label: 'Templates', icon: <Files size={13} />, badge: '4' },
    { key: 'jsx', label: 'React JSX', icon: <Code2 size={13} /> },
    { key: 'flex-grid', label: 'Auto-Layout', icon: <LayoutGrid size={13} /> },
    { key: 'pagination', label: 'Pagination', icon: <Layers size={13} /> },
    { key: 'studio', label: 'Studio', icon: <Sliders size={13} />, badge: 'Active' },
    { key: 'renderers', label: 'Benchmarks', icon: <Gauge size={13} /> },
    { key: 'core-engine', label: 'Core API', icon: <Terminal size={13} /> },
  ];

  return (
    <header className="app-header">
      <div className="header-top">
        <div
          className="brand-container"
          style={{ cursor: 'pointer' }}
          onClick={() => onSelectTab('docs')}
          title="Return to documentation home"
        >
          <img src={logoImg} alt="doc-engine" className="brand-logo-img" />
          <div className="brand-title">
            <span>doc-engine</span>
            <span className="version-pill">v0.1.0</span>
          </div>
          <span className="brand-subtitle">Vector Document Compiler</span>
        </div>

        <div className="header-actions">
          <span className="engine-status">
            <span className="status-dot"></span>
            PDF 1.7 / Canvas 2D
          </span>

          <SocialButtons className="header-socials" />

          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} theme`}
            aria-label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} theme`}
          >
            {theme === 'light' ? <Moon size={13} /> : <Sun size={13} />}
            <span className="btn-label">{theme === 'light' ? 'Dark' : 'Light'}</span>
          </button>

          <button
            type="button"
            className={`docs-button ${activeTab === 'docs' ? 'active-docs-btn' : ''}`}
            onClick={() => onSelectTab('docs')}
            title="Read Complete Documentation & Guides"
            aria-label="Read Complete Documentation & Guides"
          >
            <BookOpen size={13} />
            <span className="btn-label">Docs</span>
          </button>
        </div>
      </div>

      <nav className="tab-navigation" aria-label="Feature showcase tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => onSelectTab(tab.key)}
          >
            <span className="tab-icon-wrapper">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
            {tab.badge && <span className="tab-badge">{tab.badge}</span>}
          </button>
        ))}
      </nav>
    </header>
  );
};
