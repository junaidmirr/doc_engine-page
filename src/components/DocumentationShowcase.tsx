import React, { useState, useMemo } from 'react';
import {
  Terminal,
  Code2,
  LayoutGrid,
  Layers,
  Sliders,
  Gauge,
  Receipt,
  Award,
  BarChart3,
  User,
  Copy,
  Check,
  Search,
  ArrowUpRight,
  Cpu,
  Compass,
  FileCode,
  AlignLeft,
  ListFilter,
  ChevronDown,
} from 'lucide-react';
import type { TabKey } from './Navbar';
import { SocialButtons } from './SocialIcons';
import logoImg from '../assets/logo.png';

interface DocumentationShowcaseProps {
  onNavigate: (tab: TabKey, subOption?: 'invoice' | 'certificate' | 'report' | 'resume') => void;
}

const NAV_CATEGORIES = [
  {
    category: 'Overview',
    items: [
      { id: 'introduction', label: 'Introduction' },
      { id: 'why-doc-engine', label: 'Why doc-engine?' },
      { id: 'architecture', label: 'Engine Architecture' },
      { id: 'installation', label: 'Installation' },
    ],
  },
  {
    category: 'Quickstart Guides',
    items: [
      { id: 'quickstart-node', label: '1. Node.js & TypeScript' },
      { id: 'quickstart-react', label: '2. Declarative React JSX' },
      { id: 'quickstart-serverless', label: '3. Next.js Serverless API' },
    ],
  },
  {
    category: 'Layout & Flow Engine',
    items: [
      { id: 'flow-stack', label: 'Flow Stack API (addStack)' },
      { id: 'tables-grid', label: 'Auto-Wrapping Tables' },
      { id: 'containers', label: 'Containers & Views' },
      { id: 'text-flow', label: 'Text Flow & AFM Fonts' },
      { id: 'flexbox', label: 'Flexbox (Row & Column)' },
      { id: 'pagination-flow', label: 'Auto-Pagination & Rules' },
      { id: 'headers-footers', label: 'Dynamic Headers & Footers' },
      { id: 'layout-constraints', label: 'Layout & Break Constraints' },
    ],
  },
  {
    category: 'React Layer',
    items: [
      { id: 'react-components', label: 'Component Reference' },
      { id: 'react-hooks', label: 'usePDF & useDocument' },
      { id: 'react-viewer', label: 'DocumentViewer & Text Overlay' },
    ],
  },
  {
    category: 'Document Templates',
    items: [
      { id: 'template-invoice', label: 'Commercial Invoice' },
      { id: 'template-certificate', label: 'Award Certificate' },
      { id: 'template-report', label: 'Business Report' },
      { id: 'template-resume', label: 'Modern Tech Resume' },
    ],
  },
  {
    category: 'Reference & AI Agent',
    items: [
      { id: 'web-mcp', label: 'Web MCP & AI Agent Interface' },
      { id: 'safe-serialization', label: 'P0 Safe Serialization (deepClone)' },
      { id: 'custom-fonts', label: 'Custom Font Registration' },
      { id: 'comparison-matrix', label: 'Architecture Comparison' },
      { id: 'core-api-ref', label: 'Core Engine API Reference' },
      { id: 'community-socials', label: 'Community & Socials' },
    ],
  },
];

export const DocumentationShowcase: React.FC<DocumentationShowcaseProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
  const [packageManager, setPackageManager] = useState<'npm' | 'pnpm' | 'yarn' | 'bun'>('npm');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => {
      setCopiedSnippet(null);
    }, 2000);
  };

  const installCommand = useMemo(() => {
    switch (packageManager) {
      case 'pnpm':
        return 'pnpm add @worklabs05/doc-engine pdf-lib';
      case 'yarn':
        return 'yarn add @worklabs05/doc-engine pdf-lib';
      case 'bun':
        return 'bun add @worklabs05/doc-engine pdf-lib';
      default:
        return 'npm install @worklabs05/doc-engine pdf-lib';
    }
  }, [packageManager]);

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return NAV_CATEGORIES;
    const query = searchQuery.toLowerCase();
    return NAV_CATEGORIES
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            item.label.toLowerCase().includes(query) ||
            item.id.toLowerCase().includes(query) ||
            cat.category.toLowerCase().includes(query)
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [searchQuery]);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="docs-page-container">
      {/* Documentation Top Header / Hero */}
      <section className="docs-hero-banner">
        <div className="docs-hero-inner">
          <div className="docs-hero-badge">
            <img src={logoImg} alt="doc-engine" className="docs-hero-logo" />
            <span>@worklabs05/doc-engine v0.2.0</span>
            <span className="docs-hero-pill">Official Documentation</span>
          </div>

          <h1 className="docs-hero-title">
            Headless Vector Document & Layout Engine for React & TypeScript
          </h1>

          <p className="docs-hero-lead">
            Compile declarative React JSX components or serializable JSON AST directly to real, searchable
            vector PDFs and 60 FPS Canvas previews. Flow Stacks, Auto-Wrapping Tables, Canvas Text Selection,
            and Web MCP for AI agents. Zero Python backend, zero Puppeteer.
          </p>

          <div className="docs-install-box">
            <div className="docs-pm-selector">
              {(['npm', 'pnpm', 'yarn', 'bun'] as const).map((pm) => (
                <button
                  key={pm}
                  type="button"
                  className={`docs-pm-btn ${packageManager === pm ? 'active' : ''}`}
                  onClick={() => setPackageManager(pm)}
                >
                  {pm}
                </button>
              ))}
            </div>

            <div className="docs-install-cmd">
              <code>$ {installCommand}</code>
              <button
                type="button"
                className="docs-copy-btn"
                onClick={() => copyToClipboard(installCommand, 'install-cmd')}
                title="Copy installation command"
              >
                {copiedSnippet === 'install-cmd' ? <Check size={13} /> : <Copy size={13} />}
                <span>{copiedSnippet === 'install-cmd' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Workspace Launchers */}
          <div className="docs-workbench-launchers">
            <span className="docs-launchers-label">Interactive Workbench Hub:</span>
            <div className="docs-launchers-row">
              <button
                type="button"
                className="docs-launcher-btn"
                onClick={() => onNavigate('mcp')}
              >
                <Cpu size={13} />
                Web MCP (AI Agent)
                <ArrowUpRight size={12} />
              </button>
              <button
                type="button"
                className="docs-launcher-btn"
                onClick={() => onNavigate('jsx')}
              >
                <Code2 size={13} />
                React JSX Editor
                <ArrowUpRight size={12} />
              </button>
              <button
                type="button"
                className="docs-launcher-btn"
                onClick={() => onNavigate('studio')}
              >
                <Sliders size={13} />
                Canvas Studio
                <ArrowUpRight size={12} />
              </button>
              <button
                type="button"
                className="docs-launcher-btn"
                onClick={() => onNavigate('templates')}
              >
                <Receipt size={13} />
                Templates Gallery
                <ArrowUpRight size={12} />
              </button>
              <button
                type="button"
                className="docs-launcher-btn"
                onClick={() => onNavigate('renderers')}
              >
                <Gauge size={13} />
                Benchmark Suite
                <ArrowUpRight size={12} />
              </button>
              <button
                type="button"
                className="docs-launcher-btn"
                onClick={() => onNavigate('core-engine')}
              >
                <Terminal size={13} />
                Core Node.js API
                <ArrowUpRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main 2-Column Documentation Layout */}
      <div className="docs-layout-grid">
        {/* Mobile Navigation Toggle Bar */}
        <div className="docs-mobile-toc-bar">
          <button
            type="button"
            className="docs-mobile-toc-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ListFilter size={14} />
              <span>Table of Contents</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                {isMobileMenuOpen ? 'Hide' : 'Show'}
              </span>
              <ChevronDown
                size={14}
                style={{
                  transform: isMobileMenuOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.15s ease',
                }}
              />
            </div>
          </button>
        </div>

        {/* Sticky Sidebar */}
        <aside className={`docs-sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <div className="docs-search-container">
            <Search size={13} className="docs-search-icon" />
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="docs-search-input"
            />
          </div>

          <nav className="docs-sidebar-nav" aria-label="Documentation sections">
            {filteredCategories.map((group) => (
              <div key={group.category} className="docs-nav-group">
                <span className="docs-nav-heading">{group.category}</span>
                <ul className="docs-nav-list">
                  {group.items.map((item) => (
                    <li key={item.id} className="docs-nav-item">
                      <button
                        type="button"
                        className="docs-nav-link"
                        onClick={() => scrollToSection(item.id)}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Documentation Articles */}
        <main className="docs-article-content">
          {/* 1. Introduction */}
          <section id="introduction" className="docs-section">
            <div className="docs-section-header">
              <h2>Introduction</h2>
              <span className="docs-meta-tag">Overview</span>
            </div>
            <p>
              <strong>doc-engine</strong> is a headless document layout and vector rendering engine for
              React and TypeScript. Unlike conventional solutions that rely on heavyweight Python daemons or
              headless Chromium instances (Puppeteer), doc-engine calculates document layout coordinates in
              pure TypeScript and renders directly into vector PDF 1.7 streams or HTML5 2D Canvas contexts.
            </p>

            <div className="docs-features-grid">
              <div className="docs-card">
                <div className="docs-card-header">
                  <Cpu size={15} />
                  <strong>Zero Native Bindings</strong>
                </div>
                <p>100% pure TypeScript. Runs without modification in Node.js, Web Browsers, Next.js Edge, and Web Workers.</p>
              </div>

              <div className="docs-card">
                <div className="docs-card-header">
                  <FileCode size={15} />
                  <strong>True Vector Precision</strong>
                </div>
                <p>Generates crisp vector primitives and embedded AFM fonts. Text remains 100% selectable, searchable, and accessible.</p>
              </div>

              <div className="docs-card">
                <div className="docs-card-header">
                  <Compass size={15} />
                  <strong>Top-Left Origin Transform</strong>
                </div>
                <p>Natural web coordinates (0,0 at top-left) automatically converted to PDF standard bottom-left coordinates.</p>
              </div>

              <div className="docs-card">
                <div className="docs-card-header">
                  <Gauge size={15} />
                  <strong>60 FPS Live Previews</strong>
                </div>
                <p>Instant Canvas 2D rendering (&lt; 4ms) for smooth interactive editing without compiling multi-megabyte blobs.</p>
              </div>

              <div className="docs-card">
                <div className="docs-card-header">
                  <LayoutGrid size={15} />
                  <strong>Flexbox, Grids & Tables</strong>
                </div>
                <p>First-class support for itemized tables with zebra striping, fractional column grids, and directional flex stacks.</p>
              </div>

              <div className="docs-card">
                <div className="docs-card-header">
                  <Layers size={15} />
                  <strong>Auto-Pagination Engine</strong>
                </div>
                <p>Automatic content overflow splitting, page breaks, keepWithNext constraints, and synchronized headers/footers.</p>
              </div>
            </div>
          </section>

          {/* 2. Why doc-engine */}
          <section id="why-doc-engine" className="docs-section">
            <div className="docs-section-header">
              <h2>Why doc-engine?</h2>
              <span className="docs-meta-tag">Design Rationale</span>
            </div>
            <p>
              Most existing PDF generation approaches in JavaScript suffer from severe architectural trade-offs:
            </p>

            <div className="table-wrapper">
              <table className="doc-table">
                <thead>
                  <tr>
                    <th>Alternative</th>
                    <th>Severe Drawbacks</th>
                    <th>doc-engine Advantage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Puppeteer / Headless Chrome</strong></td>
                    <td>500MB+ Docker images, high RAM (150MB/page), slow 2–4s cold starts.</td>
                    <td>Runs in &lt; 20ms in 100% pure TypeScript with zero browser processes.</td>
                  </tr>
                  <tr>
                    <td><strong>html2canvas / html2pdf</strong></td>
                    <td>Renders blurry bitmap screenshots. Text cannot be copied, searched, or printed sharply.</td>
                    <td>Emits native vector PDF 1.7 paths, text operators, and vector shapes.</td>
                  </tr>
                  <tr>
                    <td><strong>Python / ReportLab</strong></td>
                    <td>Requires dual backend stacks, Python dependencies, and complex serialization.</td>
                    <td>Unifies frontend React UI and backend generation in one TypeScript codebase.</td>
                  </tr>
                  <tr>
                    <td><strong>@react-pdf/renderer</strong></td>
                    <td>Tightly coupled to React runtime. Cannot be used in pure Node CLI or backend pipelines.</td>
                    <td>Core AST engine is completely decoupled from React. Works in CLI, Node, or React.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 3. Architecture */}
          <section id="architecture" className="docs-section">
            <div className="docs-section-header">
              <h2>Engine Architecture & AST</h2>
              <span className="docs-meta-tag">Internals</span>
            </div>
            <p>
              The engine operates on a clean 3-stage compilation pipeline:
            </p>

            <div className="code-snippet-box">
              <div className="code-snippet-header">Document Compilation Pipeline</div>
              <pre className="code-snippet-content">
{`┌────────────────────────────────────────────────────────────────────────┐
│                        1. DOCUMENT DECLARATION                         │
│       React JSX (<Document>)  OR  Fluent API (createDocument())        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                       2. JSON AST & LAYOUT ENGINE                      │
│   AFM Font Metrics  ──►  Auto-Layout (Flex/Grid)  ──►  Table Sizing    │
│                                   │                                    │
│                    Auto-Pagination & Page Breaks                       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        3. PLUGGABLE RENDERERS                          │
│   • PdfRenderer (Vector PDF 1.7)    • CanvasRenderer (60 FPS Canvas)   │
│   • SvgRenderer (Scalable Vector)   • Node.js Buffer / Edge Stream     │
└────────────────────────────────────────────────────────────────────────┘`}
              </pre>
            </div>

            <div className="docs-spec-notes">
              <div className="docs-spec-item">
                <AlignLeft size={14} />
                <div>
                  <strong>AFM Font Metrics</strong>: Standard 14 PostScript font metric tables are embedded
                  directly in the engine. Character widths, kerning, and line wrapping are computed without
                  needing DOM layout access.
                </div>
              </div>
              <div className="docs-spec-item">
                <Compass size={14} />
                <div>
                  <strong>Dual Coordinate Transformation</strong>: Natural Top-Left (0,0) coordinates are
                  automatically transformed to standard PDF Bottom-Left (0,0) coordinates via:
                  <code>Y_pdf = pageHeight - Y_screen - elementHeight</code>.
                </div>
              </div>
            </div>
          </section>

          {/* 4. Installation */}
          <section id="installation" className="docs-section">
            <div className="docs-section-header">
              <h2>Installation</h2>
              <span className="docs-meta-tag">Setup</span>
            </div>
            <p>Install the core engine and its vector PDF serializer:</p>

            <div className="code-snippet-box">
              <div className="code-snippet-header">Package Installation</div>
              <pre className="code-snippet-content">
{`# Using npm
npm install @worklabs05/doc-engine pdf-lib

# For React components and hooks
npm install @worklabs05/doc-engine pdf-lib react react-dom`}
              </pre>
            </div>
          </section>

          {/* 5. Quickstart Guides */}
          <section id="quickstart-node" className="docs-section">
            <div className="docs-section-header">
              <h2>Quickstart: Node.js & TypeScript Backend</h2>
              <div className="docs-header-actions-inline">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => onNavigate('core-engine')}
                >
                  <Terminal size={13} />
                  Open in Core API Workbench
                </button>
              </div>
            </div>
            <p>Generate binary PDF files in backend scripts, CLI tools, or serverless workers:</p>

            <div className="code-snippet-box">
              <div className="code-snippet-header">generate-invoice.ts</div>
              <pre className="code-snippet-content">
{`import { createDocument, PdfRenderer } from '@worklabs05/doc-engine';
import fs from 'node:fs/promises';

async function main() {
  const doc = createDocument({
    defaultPageSize: 'letter',
    coordinateOrigin: 'top-left',
  });

  // Header Banner
  doc.addShape({
    shapeType: 'rectangle',
    x: 40, y: 40, width: 532, height: 60,
    fillColor: '#18181b', borderRadius: 4,
  });

  doc.addText({
    text: 'ACME INDUSTRIAL SYSTEMS',
    x: 60, y: 60, fontSize: 18, color: '#ffffff',
  });

  // Itemized Table
  doc.addTable({
    x: 40, y: 120, width: 532,
    columns: ['3fr', '1fr', '1fr'],
    headers: ['Service Description', 'Hours', 'Total (USD)'],
    rows: [
      ['Cloud Architecture Design', '40 hrs', '$6,000.00'],
      ['Kubernetes Cluster Migration', '25 hrs', '$3,750.00'],
      ['Security Audit & Compliance', '15 hrs', '$2,250.00'],
    ],
    zebra: true,
  });

  // Compile to vector PDF bytes
  const pdfBytes = await PdfRenderer.renderToBytes(doc.toDefinition());
  await fs.writeFile('invoice.pdf', pdfBytes);
  console.log('PDF compiled successfully! Size:', pdfBytes.length, 'bytes');
}

main();`}
              </pre>
            </div>
          </section>

          {/* Quickstart React */}
          <section id="quickstart-react" className="docs-section">
            <div className="docs-section-header">
              <h2>Quickstart: Declarative React JSX</h2>
              <div className="docs-header-actions-inline">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => onNavigate('jsx')}
                >
                  <Code2 size={13} />
                  Open in React JSX Playground
                </button>
              </div>
            </div>
            <p>Declare documents in React JSX and trigger downloads with the <code>usePDF</code> hook:</p>

            <div className="code-snippet-box">
              <div className="code-snippet-header">InvoicePage.tsx</div>
              <pre className="code-snippet-content">
{`import React from 'react';
import { Document, Page, View, Text, Table, usePDF } from '@worklabs05/doc-engine/react';

export function InvoicePage() {
  const document = (
    <Document defaultPageSize="letter">
      <Page backgroundColor="#ffffff">
        <View x={40} y={40} width={532} height={70} backgroundColor="#18181b" borderRadius={4} padding={16}>
          <Text fontSize={22} fontWeight="bold" color="#ffffff">
            ACME CORP
          </Text>
          <Text fontSize={12} color="#a1a1aa">
            INVOICE #INV-2026-001
          </Text>
        </View>

        <Table
          x={40} y={130} width={532}
          columns={['3fr', '1fr', '1fr']}
          headers={['Item', 'Qty', 'Price']}
          rows={[
            ['Vector Rendering Engine', '1', '$1,200.00'],
            ['Client Support License', '1', '$300.00'],
          ]}
          zebra={true}
        />
      </Page>
    </Document>
  );

  const { download, loading } = usePDF(document);

  return (
    <button onClick={() => download('invoice.pdf')} disabled={loading}>
      {loading ? 'Compiling Vector PDF...' : 'Download Vector PDF'}
    </button>
  );
}`}
              </pre>
            </div>
          </section>

          {/* Quickstart Next.js Serverless */}
          <section id="quickstart-serverless" className="docs-section">
            <div className="docs-section-header">
              <h2>Quickstart: Next.js App Router API Route</h2>
              <span className="docs-meta-tag">Serverless Stream</span>
            </div>
            <p>Stream real PDF documents directly from Next.js serverless route handlers:</p>

            <div className="code-snippet-box">
              <div className="code-snippet-header">app/api/pdf/route.ts</div>
              <pre className="code-snippet-content">
{`import { NextResponse } from 'next/server';
import { createDocument, PdfRenderer } from '@worklabs05/doc-engine';

export async function POST(req: Request) {
  const body = await req.json();

  const doc = createDocument({ defaultPageSize: 'letter' });
  doc.addText({ text: body.title || 'Document Report', x: 40, y: 50, fontSize: 20 });
  doc.addTable({ x: 40, y: 100, width: 532, columns: ['1fr', '1fr'], rows: body.tableRows || [] });

  const pdfBytes = await PdfRenderer.renderToBytes(doc.toDefinition());

  return new NextResponse(pdfBytes, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="document.pdf"',
      'Content-Length': pdfBytes.length.toString(),
    },
  });
}`}
              </pre>
            </div>
          </section>

          {/* Flow Stack API */}
          <section id="flow-stack" className="docs-section">
            <div className="docs-section-header">
              <h2>Flow Stack API (doc.addStack)</h2>
              <span className="docs-meta-tag">v0.2.0 Flow Engine</span>
            </div>
            <p>
              The Flow Stack API automatically calculates running vertical and horizontal element positions,
              eliminating manual coordinate calculations (such as <code>curY += elementHeight</code>) and manual line measurement logic.
              Ideal for variable-length items, commercial invoices, and multi-paragraph reports.
            </p>

            <div className="code-snippet-box">
              <div className="code-snippet-header">Flow Stack Example (TypeScript)</div>
              <pre className="code-snippet-content">
{`import { createDocument } from '@worklabs05/doc-engine';

const doc = createDocument({ defaultPageSize: 'letter' });

// Stack automatically manages running Y offsets and children spacing!
doc.addStack({ x: 40, y: 40, width: 532, gap: 16 }, (stack) => {
  stack.addText({ text: 'INVOICE #INV-2026-001', fontSize: 24, fontWeight: 'bold' });

  // Dynamic multiline address: stack automatically measures height and pushes downstream views down!
  stack.addText({
    text: 'Billed To:\\nAcme International Ltd\\n123 Innovation Way, Suite 400',
    fontSize: 11,
    lineHeight: 1.4,
  });

  // Table primitive nested directly inside flow stack
  stack.addTable({
    columns: [
      { header: 'Description', width: '3fr', align: 'left' },
      { header: 'Qty', width: 50, align: 'center' },
      { header: 'Unit Price', width: 80, align: 'right' },
      { header: 'Total', width: 80, align: 'right' },
    ],
    rows: [
      { cells: [{ content: 'Systems Engineering' }, { content: '40' }, { content: '$150.00' }, { content: '$6,000.00' }] },
    ],
    zebra: true,
  });
});`}
              </pre>
            </div>
          </section>

          {/* 6. Layout & Flow Engine */}
          <section id="containers" className="docs-section">
            <div className="docs-section-header">
              <h2>Layout & Flow Engine: Containers & Views</h2>
              <span className="docs-meta-tag">Primitives</span>
            </div>
            <p>
              The <code>&lt;View&gt;</code> element is the foundational structural container. It supports absolute
              or flow positioning, background fills, border styles, padding, and border radius.
            </p>

            <div className="table-wrapper">
              <table className="doc-table">
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Type</th>
                    <th>Default</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>x, y</code></td>
                    <td><code>number</code></td>
                    <td><code>0</code></td>
                    <td>Coordinates in points relative to coordinate origin.</td>
                  </tr>
                  <tr>
                    <td><code>width, height</code></td>
                    <td><code>number</code></td>
                    <td><code>auto</code></td>
                    <td>Dimensions in points. Defaults to bounding box of children.</td>
                  </tr>
                  <tr>
                    <td><code>backgroundColor</code></td>
                    <td><code>string</code></td>
                    <td><code>undefined</code></td>
                    <td>Fill color (hex code like <code>#18181b</code>).</td>
                  </tr>
                  <tr>
                    <td><code>padding</code></td>
                    <td><code>number | number[]</code></td>
                    <td><code>0</code></td>
                    <td>Internal padding in points (single value or [top, right, bottom, left]).</td>
                  </tr>
                  <tr>
                    <td><code>borderRadius</code></td>
                    <td><code>number</code></td>
                    <td><code>0</code></td>
                    <td>Corner rounding radius in points.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Text Flow & AFM Fonts */}
          <section id="text-flow" className="docs-section">
            <div className="docs-section-header">
              <h2>Text Flow & AFM Font Metrics</h2>
              <span className="docs-meta-tag">Typography</span>
            </div>
            <p>
              Text measurement in doc-engine uses Adobe Font Metrics (AFM) tables for standard PostScript fonts
              (Helvetica, Times-Roman, Courier). Line breaks and wrapping occur accurately on word boundaries
              without any headless browser dependencies.
            </p>

            <div className="code-snippet-box">
              <div className="code-snippet-header">AFM Font Measurement Example</div>
              <pre className="code-snippet-content">
{`<Text
  x={40}
  y={150}
  width={350}
  fontSize={12}
  fontFamily="Helvetica"
  lineHeight={1.4}
  color="#334155"
>
  This text block will be automatically measured using AFM glyph widths and wrapped
  into multiple lines when it exceeds the 350pt width constraint.
</Text>`}
              </pre>
            </div>
          </section>

          {/* Flexbox */}
          <section id="flexbox" className="docs-section">
            <div className="docs-section-header">
              <h2>Flexbox Layouts (Row & Column Stacks)</h2>
              <div className="docs-header-actions-inline">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => onNavigate('flex-grid')}
                >
                  <LayoutGrid size={13} />
                  Test in Auto-Layout Tab
                </button>
              </div>
            </div>
            <p>
              Flex containers arrange child views horizontally or vertically with configurable gap spacing,
              justification, and cross-axis alignment.
            </p>

            <div className="code-snippet-box">
              <div className="code-snippet-header">Flex Container Syntax</div>
              <pre className="code-snippet-content">
{`// Declarative Columns Stack
<Columns gap={12} x={40} y={100} width={532}>
  <Column width="1fr">
    <View backgroundColor="#fafafa" padding={12} border="1px solid #e4e4e7">
      <Text fontSize={11} fontWeight="bold">Total Invoices</Text>
      <Text fontSize={18} fontWeight="bold">1,420</Text>
    </View>
  </Column>
  <Column width="1fr">
    <View backgroundColor="#fafafa" padding={12} border="1px solid #e4e4e7">
      <Text fontSize={11} fontWeight="bold">Gross Revenue</Text>
      <Text fontSize={18} fontWeight="bold">$842,500</Text>
    </View>
  </Column>
</Columns>`}
              </pre>
            </div>
          </section>

          {/* Tables & Grids */}
          <section id="tables-grid" className="docs-section">
            <div className="docs-section-header">
              <h2>Auto-Wrapping Tables & ColumnConfig</h2>
              <span className="docs-meta-tag">v0.2.0 Data Tables</span>
            </div>
            <p>
              Tables support column configurations with fractional sizing (e.g. <code>'3fr'</code>), exact numeric point widths,
              percentage widths, auto-generated headers, zebra striping, and cell alignment inheritance.
            </p>

            <div className="code-snippet-box">
              <div className="code-snippet-header">Auto-Wrapping Table Primitive</div>
              <pre className="code-snippet-content">
{`doc.addTable({
  x: 40,
  y: 200,
  width: 532,
  columns: [
    { header: 'Service Description', width: '3fr', align: 'left' },
    { header: 'Hours', width: 60, align: 'center' },
    { header: 'Rate', width: 80, align: 'right' },
    { header: 'Amount', width: 100, align: 'right' },
  ],
  rows: [
    { cells: [{ content: 'Cloud Vector Compiler Integration' }, { content: '40' }, { content: '$150.00' }, { content: '$6,000.00' }] },
    { cells: [{ content: 'Real-Time Canvas Preview Pipeline' }, { content: '20' }, { content: '$150.00' }, { content: '$3,000.00' }] },
  ],
  zebra: true,
  headerBackgroundColor: '#0f172a',
  headerTextColor: '#ffffff',
});`}
              </pre>
            </div>
          </section>

          {/* Auto-Pagination */}
          <section id="pagination-flow" className="docs-section">
            <div className="docs-section-header">
              <h2>Auto-Pagination & Printing Rules</h2>
              <div className="docs-header-actions-inline">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => onNavigate('pagination')}
                >
                  <Layers size={13} />
                  Test in Pagination Tab
                </button>
              </div>
            </div>
            <p>
              When content overflows the available page height, doc-engine automatically allocates additional
              sheets, reproduces running headers and footers, and preserves constraints like <code>keepWithNext</code>.
            </p>

            <div className="table-wrapper">
              <table className="doc-table">
                <thead>
                  <tr>
                    <th>Constraint</th>
                    <th>Type</th>
                    <th>Behavior</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>pageBreakBefore</code></td>
                    <td><code>boolean</code></td>
                    <td>Forces a fresh page break immediately prior to rendering this element.</td>
                  </tr>
                  <tr>
                    <td><code>pageBreakAfter</code></td>
                    <td><code>boolean</code></td>
                    <td>Forces the subsequent content onto the following sheet.</td>
                  </tr>
                  <tr>
                    <td><code>keepWithNext</code></td>
                    <td><code>boolean</code></td>
                    <td>Prevents orphan section headers by ensuring at least one line of trailing content follows on the same sheet.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Dynamic Headers & Footers */}
          <section id="headers-footers" className="docs-section">
            <div className="docs-section-header">
              <h2>Dynamic Headers & Footers</h2>
              <span className="docs-meta-tag">v0.2.0 Flow</span>
            </div>
            <p>
              Declare dynamic running headers and footers per page with access to the current <code>pageNumber</code> and <code>totalPages</code> count:
            </p>

            <div className="code-snippet-box">
              <div className="code-snippet-header">Dynamic Running Header / Footer</div>
              <pre className="code-snippet-content">
{`doc.setHeader((pageNumber, totalPages) => ({
  text: \`Confidential Performance Report — Page \${pageNumber} of \${totalPages}\`,
  fontSize: 8.5,
  fontFamily: 'Helvetica',
  color: '#64748b',
  align: 'right',
  margin: { top: 20, right: 40 },
}));

doc.setFooter((pageNumber, totalPages) => ({
  text: '© 2026 doc-engine • All Rights Reserved',
  fontSize: 8,
  fontFamily: 'Helvetica',
  color: '#94a3b8',
  align: 'center',
  margin: { bottom: 20 },
}));`}
              </pre>
            </div>
          </section>

          {/* Layout Constraints */}
          <section id="layout-constraints" className="docs-section">
            <div className="docs-section-header">
              <h2>Layout & Break Constraints</h2>
              <span className="docs-meta-tag">Break Rules</span>
            </div>
            <p>
              Control element splitting across page boundaries with fine-grained constraint properties:
            </p>

            <div className="table-wrapper">
              <table className="doc-table">
                <thead>
                  <tr>
                    <th>Constraint</th>
                    <th>Type</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>keepTogether</code></td>
                    <td><code>boolean</code></td>
                    <td>Prevents breaking the view or table across pages. Moves the entire block to next page if it does not fit.</td>
                  </tr>
                  <tr>
                    <td><code>pageBreakBefore</code></td>
                    <td><code>boolean</code></td>
                    <td>Forces a fresh page break immediately prior to rendering this element.</td>
                  </tr>
                  <tr>
                    <td><code>pageBreakAfter</code></td>
                    <td><code>boolean</code></td>
                    <td>Forces subsequent content onto the following sheet.</td>
                  </tr>
                  <tr>
                    <td><code>minHeight</code></td>
                    <td><code>number</code></td>
                    <td>Guarantees minimum allocated vertical height on current page before triggering overflow.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 7. React Layer */}
          <section id="react-components" className="docs-section">
            <div className="docs-section-header">
              <h2>React Layer: Component Reference</h2>
              <span className="docs-meta-tag">doc-engine/react</span>
            </div>
            <p>The React package provides declarative JSX components that wrap the underlying AST compiler:</p>

            <div className="table-wrapper">
              <table className="doc-table">
                <thead>
                  <tr>
                    <th>JSX Component</th>
                    <th>Key Props</th>
                    <th>Role in Document AST</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>&lt;Document&gt;</code></td>
                    <td><code>defaultPageSize, orientation, coordinateOrigin</code></td>
                    <td>Root document node that contains one or more pages.</td>
                  </tr>
                  <tr>
                    <td><code>&lt;Page&gt;</code></td>
                    <td><code>size, orientation, backgroundColor, margins</code></td>
                    <td>Represents a distinct sheet of paper.</td>
                  </tr>
                  <tr>
                    <td><code>&lt;View&gt;</code></td>
                    <td><code>x, y, width, height, backgroundColor, borderRadius, padding</code></td>
                    <td>Generic box container for grouping and styling layout nodes.</td>
                  </tr>
                  <tr>
                    <td><code>&lt;Text&gt;</code></td>
                    <td><code>x, y, width, fontSize, fontFamily, fontWeight, color, lineHeight</code></td>
                    <td>Measured AFM vector typography primitive with auto-wrap.</td>
                  </tr>
                  <tr>
                    <td><code>&lt;Shape&gt;</code></td>
                    <td><code>shapeType, x, y, width, height, fillColor, strokeColor</code></td>
                    <td>Vector shapes: rectangle, circle, ellipse, line.</td>
                  </tr>
                  <tr>
                    <td><code>&lt;Table&gt;</code></td>
                    <td><code>x, y, width, columns, headers, rows, zebra</code></td>
                    <td>Itemized tabular layout with column proportions.</td>
                  </tr>
                  <tr>
                    <td><code>&lt;DocumentViewer&gt;</code></td>
                    <td><code>document, initialScale, showToolbar, onElementClick</code></td>
                    <td>Interactive Canvas 2D live preview with toolbar and click inspect.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* React Hooks */}
          <section id="react-hooks" className="docs-section">
            <div className="docs-section-header">
              <h2>React Hooks: usePDF & useDocument</h2>
              <span className="docs-meta-tag">Reactivity</span>
            </div>
            <p>
              <code>usePDF(document)</code> compiles JSX trees in the background into downloadable blobs,
              while <code>useDocument(definition)</code> provides reactive undo/redo editing history.
            </p>

            <div className="code-snippet-box">
              <div className="code-snippet-header">Reactive Hooks API</div>
              <pre className="code-snippet-content">
{`import { usePDF, useDocument } from '@worklabs05/doc-engine/react';

// 1. Reactive compile & download
const { dataUrl, loading, error, download } = usePDF(myDocumentJsx);

// 2. Interactive stateful editor with undo/redo
const { document, updateElement, addElement, undo, redo, canUndo, canRedo } = useDocument(initialDocDef);`}
              </pre>
            </div>
          </section>

          {/* DocumentViewer & Canvas Text Selection */}
          <section id="react-viewer" className="docs-section">
            <div className="docs-section-header">
              <h2>DocumentViewer & Canvas Text Selection</h2>
              <span className="docs-meta-tag">v0.2.0 Interactive Canvas</span>
            </div>
            <p>
              The <code>&lt;DocumentViewer&gt;</code> renders an HTML5 Canvas preview at 60 FPS while layering a transparent vector text overlay directly above the canvas. This allows users to highlight, select, and copy text directly off the canvas preview!
            </p>

            <div className="code-snippet-box">
              <div className="code-snippet-header">DocumentViewer with Text Selection Overlay</div>
              <pre className="code-snippet-content">
{`import { DocumentViewer } from '@worklabs05/doc-engine/react';

<DocumentViewer
  document={myDocument}
  initialScale={1.0}
  showToolbar={true}
  enableTextSelection={true}
  onElementClick={(element) => console.log('Clicked element AST:', element)}
/>`}
              </pre>
            </div>
          </section>

          {/* Document Templates Gallery */}
          <section id="template-invoice" className="docs-section">
            <div className="docs-section-header">
              <h2>Document Templates Gallery</h2>
              <div className="docs-header-actions-inline">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => onNavigate('templates')}
                >
                  <Receipt size={13} />
                  Open Full Templates Workbench
                </button>
              </div>
            </div>
            <p>Pre-built production blueprints included in <code>@worklabs05/doc-engine/examples</code>:</p>

            <div className="docs-templates-grid">
              <div className="docs-template-card">
                <div className="docs-template-top">
                  <Receipt size={16} />
                  <strong>Commercial Invoice</strong>
                </div>
                <p>Features corporate header, client address block, zebra-striped itemized line items, and payment instructions.</p>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => onNavigate('templates', 'invoice')}
                >
                  Open Invoice Blueprint
                  <ArrowUpRight size={12} />
                </button>
              </div>

              <div className="docs-template-card">
                <div className="docs-template-top">
                  <Award size={16} />
                  <strong>Award Certificate</strong>
                </div>
                <p>Landscape orientation with double border styling, centered title typography, recipient callout, and gold seal.</p>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => onNavigate('templates', 'certificate')}
                >
                  Open Certificate Blueprint
                  <ArrowUpRight size={12} />
                </button>
              </div>

              <div className="docs-template-card">
                <div className="docs-template-top">
                  <BarChart3 size={16} />
                  <strong>Executive Business Report</strong>
                </div>
                <p>Multi-page executive layout with KPI summary grid cards, running headers/footers, and tabular performance metrics.</p>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => onNavigate('templates', 'report')}
                >
                  Open Report Blueprint
                  <ArrowUpRight size={12} />
                </button>
              </div>

              <div className="docs-template-card">
                <div className="docs-template-top">
                  <User size={16} />
                  <strong>Modern Tech Resume</strong>
                </div>
                <p>Two-column asymmetric design with contact sidebar, experience timeline, skills chips stack, and education history.</p>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => onNavigate('templates', 'resume')}
                >
                  Open Resume Blueprint
                  <ArrowUpRight size={12} />
                </button>
              </div>
            </div>
          </section>

          {/* Comparison Matrix */}
          <section id="comparison-matrix" className="docs-section">
            <div className="docs-section-header">
              <h2>Architecture Comparison Matrix</h2>
              <div className="docs-header-actions-inline">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => onNavigate('renderers')}
                >
                  <Gauge size={13} />
                  Run Live Benchmark Tests
                </button>
              </div>
            </div>
            <p>Comprehensive comparison across standard PDF generation architectures:</p>

            <div className="table-wrapper">
              <table className="doc-table">
                <thead>
                  <tr>
                    <th>Capability</th>
                    <th>doc-engine</th>
                    <th>@react-pdf</th>
                    <th>Puppeteer</th>
                    <th>jsPDF</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Pure TypeScript (No Node/DOM locks)</strong></td>
                    <td>Yes (Universal)</td>
                    <td>Node/Browser split</td>
                    <td>No (Node.js only)</td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td><strong>Live 60 FPS Canvas Preview</strong></td>
                    <td>Native (&lt; 4ms)</td>
                    <td>Slow Blob (~300ms)</td>
                    <td>No live preview</td>
                    <td>Canvas raster only</td>
                  </tr>
                  <tr>
                    <td><strong>Searchable Vector PDF 1.7</strong></td>
                    <td>Yes</td>
                    <td>Yes</td>
                    <td>Yes</td>
                    <td>Limited fonts</td>
                  </tr>
                  <tr>
                    <td><strong>Next.js App Router / Edge</strong></td>
                    <td>Compatible</td>
                    <td>Bundle errors</td>
                    <td>Incompatible</td>
                    <td>Compatible</td>
                  </tr>
                  <tr>
                    <td><strong>Automatic Pagination Rules</strong></td>
                    <td>Yes</td>
                    <td>Yes</td>
                    <td>CSS print rules</td>
                    <td>Manual math</td>
                  </tr>
                  <tr>
                    <td><strong>Dependencies Size</strong></td>
                    <td>Micro (~800KB)</td>
                    <td>Heavy (~8MB)</td>
                    <td>Huge (~500MB)</td>
                    <td>Small (~500KB)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Web MCP & AI Agent Section */}
          <section id="web-mcp" className="docs-section">
            <div className="docs-section-header">
              <h2>Web MCP & AI Agent Interface</h2>
              <div className="docs-header-actions-inline">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => onNavigate('mcp')}
                >
                  <Cpu size={13} />
                  Launch Interactive MCP Console
                </button>
              </div>
            </div>
            <p>
              doc-engine includes an in-browser <strong>Model Context Protocol (MCP)</strong> server allowing AI coding agents
              (Claude Desktop, Cursor, Antigravity, Windsurf, or headless automated scripts) to programmatically read documentation,
              inspect TypeScript API definitions, and generate document AST:
            </p>

            <div className="docs-features-grid">
              <div className="docs-card">
                <div className="docs-card-header">
                  <Cpu size={15} />
                  <strong>JSON-RPC 2.0 Web Protocol</strong>
                </div>
                <p>Standard Model Context Protocol over window message & browser bridge with tools, resources, and prompt templates.</p>
              </div>

              <div className="docs-card">
                <div className="docs-card-header">
                  <FileCode size={15} />
                  <strong>Direct AI Endpoints</strong>
                </div>
                <p>Access raw machine-readable context at <code>/llms.txt</code>, <code>/llms-full.txt</code>, and <code>/mcp.json</code>.</p>
              </div>

              <div className="docs-card">
                <div className="docs-card-header">
                  <Terminal size={15} />
                  <strong>JavaScript Window Bridge</strong>
                </div>
                <p>Browser agents can query <code>window.__DOC_ENGINE_MCP__.callTool('doc_engine_search_docs', &#123; query &#125;)</code> directly.</p>
              </div>
            </div>

            <div className="code-snippet-box">
              <div className="code-snippet-header">Claude Desktop & Cursor Config (mcpServers.json)</div>
              <pre className="code-snippet-content">
{`{
  "mcpServers": {
    "doc-engine": {
      "command": "npx",
      "args": ["-y", "@worklabs05/doc-engine-mcp"]
    }
  }
}`}
              </pre>
            </div>
          </section>

          {/* P0 Safe Serialization */}
          <section id="safe-serialization" className="docs-section">
            <div className="docs-section-header">
              <h2>P0 Safe Serialization (deepClone)</h2>
              <span className="docs-meta-tag">AST Integrity</span>
            </div>
            <p>
              <code>deepClone(obj)</code> safely clones arbitrary document AST trees while preserving binary <code>Uint8Array</code> buffers (such as embedded PNG/JPEG images and TTF font tables) and <code>Date</code> objects intact without JSON truncation.
            </p>

            <div className="code-snippet-box">
              <div className="code-snippet-header">Safe Cloning with Binary Buffers</div>
              <pre className="code-snippet-content">
{`import { deepClone } from '@worklabs05/doc-engine';

const clonedDoc = deepClone(originalDoc);
// Preserves Uint8Array font buffers and image data without serialization corruption!`}
              </pre>
            </div>
          </section>

          {/* Custom Font Registration */}
          <section id="custom-fonts" className="docs-section">
            <div className="docs-section-header">
              <h2>Custom Font Registration</h2>
              <span className="docs-meta-tag">TrueType & OpenType</span>
            </div>
            <p>
              Register custom TTF/OTF font buffers on-the-fly or load Google Fonts with 1 line of code:
            </p>

            <div className="code-snippet-box">
              <div className="code-snippet-header">Font Registration</div>
              <pre className="code-snippet-content">
{`import { createDocument } from '@worklabs05/doc-engine';

const doc = createDocument();
const fontBuffer = await fetch('/fonts/Inter-Regular.ttf').then(r => r.arrayBuffer());
doc.registerFont('Inter', new Uint8Array(fontBuffer));`}
              </pre>
            </div>
          </section>

          {/* Core Engine API Reference */}
          <section id="core-api-ref" className="docs-section">
            <div className="docs-section-header">
              <h2>Core Engine API Reference</h2>
              <span className="docs-meta-tag">@worklabs05/doc-engine</span>
            </div>
            <p>Exported classes and utility functions from the main core package:</p>

            <div className="table-wrapper">
              <table className="doc-table">
                <thead>
                  <tr>
                    <th>Function / Class</th>
                    <th>Signature</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>createDocument(options?)</code></td>
                    <td><code>(options?: DocumentOptions) =&gt; DocumentBuilder</code></td>
                    <td>Creates a fluent builder instance for constructing pages and vector elements.</td>
                  </tr>
                  <tr>
                    <td><code>doc.addStack(options, fn)</code></td>
                    <td><code>(options: StackOptions, fn: (stack: StackBuilder) =&gt; void) =&gt; this</code></td>
                    <td>Flow stack API for automatic vertical/horizontal stacking without manual Y coordinates.</td>
                  </tr>
                  <tr>
                    <td><code>doc.addTable(options)</code></td>
                    <td><code>(options: TableOptions) =&gt; this</code></td>
                    <td>Auto-wrapping table primitive with ColumnConfig, fractional widths ('3fr'), and zebra striping.</td>
                  </tr>
                  <tr>
                    <td><code>doc.registerFont(name, data)</code></td>
                    <td><code>(name: string, data: Uint8Array) =&gt; this</code></td>
                    <td>Registers custom TrueType or OpenType font buffer for vector PDF rendering.</td>
                  </tr>
                  <tr>
                    <td><code>deepClone(obj)</code></td>
                    <td><code>&lt;T&gt;(obj: T) =&gt; T</code></td>
                    <td>Safe deep clone preserving Uint8Array buffers and Date objects.</td>
                  </tr>
                  <tr>
                    <td><code>DocumentEngine</code></td>
                    <td><code>new DocumentEngine(def?: DocumentDefinition)</code></td>
                    <td>Stateful manager with CRUD operations and undo/redo history stack.</td>
                  </tr>
                  <tr>
                    <td><code>PdfRenderer.renderToBytes(def)</code></td>
                    <td><code>(def: DocumentDefinition) =&gt; Promise&lt;Uint8Array&gt;</code></td>
                    <td>Renders a document AST definition into raw binary vector PDF bytes.</td>
                  </tr>
                  <tr>
                    <td><code>CanvasRenderer.renderToCanvas(def, canvas)</code></td>
                    <td><code>(def: DocumentDefinition, canvas: HTMLCanvasElement) =&gt; void</code></td>
                    <td>Renders document pages directly to an HTML5 Canvas 2D context at 60 FPS.</td>
                  </tr>
                  <tr>
                    <td><code>SvgRenderer.renderToSvg(def, pageIndex?)</code></td>
                    <td><code>(def: DocumentDefinition, pageIndex?: number) =&gt; string</code></td>
                    <td>Compiles document AST into an SVG vector graphics string.</td>
                  </tr>
                  <tr>
                    <td><code>extractDocumentDefinition(jsx)</code></td>
                    <td><code>(jsx: ReactElement) =&gt; DocumentDefinition</code></td>
                    <td>Extracts a serializable Document AST from a React JSX element tree.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Community & Socials Section */}
          <section id="community-socials" className="docs-section">
            <div className="docs-section-header">
              <h2>Community & Socials</h2>
              <span className="docs-meta-tag">Open Source</span>
            </div>
            <p>
              Connect with fellow developers, explore source code, report issues, and stay updated across our official channels:
            </p>
            <div style={{ marginTop: '16px' }}>
              <SocialButtons className="docs-socials-group" />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
