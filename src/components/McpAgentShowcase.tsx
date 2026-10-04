import React, { useState } from 'react';
import {
  Terminal,
  Cpu,
  Copy,
  Check,
  Play,
  FileCode,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { MCP_TOOLS, mcpServer, type McpToolDefinition } from '../mcp/docEngineMcp';

export const McpAgentShowcase: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<string>('doc_engine_search_docs');
  const [toolQuery, setToolQuery] = useState<string>('flow stack');
  const [toolSectionId, setToolSectionId] = useState<string>('flow-stack');
  const [toolTopic, setToolTopic] = useState<string>('flow-stack');
  const [toolTemplate, setToolTemplate] = useState<string>('invoice');
  const [toolCategory, setToolCategory] = useState<string>('core');
  const [toolStep, setToolStep] = useState<string>('all');
  const [toolPrimitive, setToolPrimitive] = useState<string>('all');
  const [mcpResponse, setMcpResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleRunTool = async () => {
    setLoading(true);
    let args: Record<string, any> = {};

    if (selectedTool === 'doc_engine_search_docs') {
      args = { query: toolQuery };
    } else if (selectedTool === 'doc_engine_get_section') {
      args = { sectionId: toolSectionId };
    } else if (selectedTool === 'doc_engine_get_code_example') {
      args = { topic: toolTopic };
    } else if (selectedTool === 'doc_engine_get_template') {
      args = { templateName: toolTemplate };
    } else if (selectedTool === 'doc_engine_get_api_ref') {
      args = { category: toolCategory };
    } else if (selectedTool === 'doc_engine_get_custom_doc_guide') {
      if (toolStep !== 'all') args = { step: parseInt(toolStep, 10) };
    } else if (selectedTool === 'doc_engine_get_primitive_specs') {
      if (toolPrimitive !== 'all') args = { primitive: toolPrimitive };
    }

    try {
      const response = await mcpServer.handleRequest({
        jsonrpc: '2.0',
        id: Date.now(),
        method: 'tools/call',
        params: {
          name: selectedTool,
          arguments: args,
        },
      });
      setMcpResponse(JSON.stringify(response, null, 2));
    } catch (err: any) {
      setMcpResponse(JSON.stringify({ error: err.message }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const claudeDesktopConfig = JSON.stringify(
    {
      mcpServers: {
        'doc-engine': {
          command: 'npx',
          args: ['-y', '@worklabs05/doc-engine-mcp'],
        },
      },
    },
    null,
    2
  );

  const browserAgentSnippet = `// In-Browser AI Agent Execution
const mcp = window.__DOC_ENGINE_MCP__;

// 1. Search documentation
const searchResults = await mcp.callTool('doc_engine_search_docs', { query: 'addStack' });

// 2. Fetch specific section
const section = await mcp.callTool('doc_engine_get_section', { sectionId: 'flow-stack' });

// 3. Or communicate via standard JSON-RPC 2.0 postMessage
window.postMessage({
  jsonrpc: '2.0',
  id: 1,
  method: 'tools/call',
  params: { name: 'doc_engine_get_api_ref', arguments: {} }
}, '*');`;

  return (
    <div className="showcase-section">
      <div className="section-intro">
        <h2>Web Model Context Protocol (MCP) Interface</h2>
        <p>
          Enables AI agents (Cursor, Claude, Antigravity, Windsurf, or automated web crawlers) to
          programmatically query doc-engine documentation, retrieve layout schemas, and inspect API
          contracts through the official Model Context Protocol.
        </p>
      </div>

      {/* Top Protocol Status Grid */}
      <div className="benchmark-metrics-bar">
        <div className="benchmark-stat-card">
          <span className="benchmark-stat-label">
            <Cpu size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
            MCP Protocol Version
          </span>
          <span className="benchmark-stat-value">2024-11-05</span>
          <span className="benchmark-stat-desc">Standard Model Context Protocol</span>
        </div>

        <div className="benchmark-stat-card">
          <span className="benchmark-stat-label">
            <Terminal size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
            Available Tools
          </span>
          <span className="benchmark-stat-value">{MCP_TOOLS.length} Tools</span>
          <span className="benchmark-stat-desc">Search, Read, API, AST</span>
        </div>

        <div className="benchmark-stat-card">
          <span className="benchmark-stat-label">
            <FileCode size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
            AI Raw Context
          </span>
          <span className="benchmark-stat-value">llms-full.txt</span>
          <span className="benchmark-stat-desc">Zero-overhead markdown crawl</span>
        </div>

        <div className="benchmark-stat-card">
          <span className="benchmark-stat-label">
            <Layers size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
            Window Bridge
          </span>
          <span className="benchmark-stat-value">Active</span>
          <span className="benchmark-stat-desc">window.__DOC_ENGINE_MCP__</span>
        </div>
      </div>

      {/* AI Endpoints Quick Bar */}
      <div className="docs-spec-notes" style={{ margin: '8px 0 16px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <strong>Standard AI Endpoints: </strong>
            <span>Public discoverability files for automated LLM crawlers & IDE plugins.</span>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <a href="/llms.txt" target="_blank" rel="noopener noreferrer" className="docs-meta-tag" style={{ textDecoration: 'none' }}>
              /llms.txt <ExternalLink size={10} style={{ verticalAlign: 'middle', marginLeft: '2px' }} />
            </a>
            <a href="/llms-full.txt" target="_blank" rel="noopener noreferrer" className="docs-meta-tag" style={{ textDecoration: 'none' }}>
              /llms-full.txt <ExternalLink size={10} style={{ verticalAlign: 'middle', marginLeft: '2px' }} />
            </a>
            <a href="/mcp.json" target="_blank" rel="noopener noreferrer" className="docs-meta-tag" style={{ textDecoration: 'none' }}>
              /mcp.json <ExternalLink size={10} style={{ verticalAlign: 'middle', marginLeft: '2px' }} />
            </a>
          </div>
        </div>
      </div>

      {/* 2-Column Workbench Grid: Left Tool Runner, Right JSON-RPC Output */}
      <div className="showcase-grid">
        <div className="control-panel">
          <div className="panel-header">
            <h3>Interactive MCP Tool Runner</h3>
            <span className="status-badge-ready">JSON-RPC 2.0</span>
          </div>

          <div className="form-group">
            <label>Select Tool</label>
            <select
              value={selectedTool}
              onChange={(e) => setSelectedTool(e.target.value)}
              className="select-field"
            >
              {MCP_TOOLS.map((t: McpToolDefinition) => (
                <option key={t.name} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
              {MCP_TOOLS.find((t) => t.name === selectedTool)?.description}
            </p>
          </div>

          {selectedTool === 'doc_engine_search_docs' && (
            <div className="form-group">
              <label>Search Query</label>
              <input
                type="text"
                value={toolQuery}
                onChange={(e) => setToolQuery(e.target.value)}
                placeholder="e.g. flow stack, table, canvas"
                className="input-field"
              />
            </div>
          )}

          {selectedTool === 'doc_engine_get_section' && (
            <div className="form-group">
              <label>Section ID</label>
              <select
                value={toolSectionId}
                onChange={(e) => setToolSectionId(e.target.value)}
                className="select-field"
              >
                <option value="build-your-own">build-your-own (Build Any Document Guide)</option>
                <option value="primitives-cheatsheet">primitives-cheatsheet (Primitive Element Specs)</option>
                <option value="flow-stack">flow-stack (Flow Stack API)</option>
                <option value="tables-grid">tables-grid (Auto-Wrapping Tables)</option>
                <option value="react-viewer">react-viewer (Canvas & Text Selection)</option>
                <option value="headers-footers">headers-footers (Dynamic Headers & Footers)</option>
                <option value="layout-constraints">layout-constraints (Layout Constraints)</option>
                <option value="custom-fonts">custom-fonts (Custom Font Registration)</option>
                <option value="safe-serialization">safe-serialization (deepClone)</option>
                <option value="introduction">introduction (Introduction)</option>
                <option value="core-api-ref">core-api-ref (Core API Reference)</option>
              </select>
            </div>
          )}

          {selectedTool === 'doc_engine_get_code_example' && (
            <div className="form-group">
              <label>Code Topic</label>
              <select
                value={toolTopic}
                onChange={(e) => setToolTopic(e.target.value)}
                className="select-field"
              >
                <option value="flow-stack">Flow Stack Layout</option>
                <option value="tables-grid">Auto-Wrapping Table</option>
                <option value="react-viewer">React DocumentViewer</option>
                <option value="custom-fonts">Custom Font Buffer</option>
                <option value="headers-footers">Running Header / Footer</option>
              </select>
            </div>
          )}

          {selectedTool === 'doc_engine_get_template' && (
            <div className="form-group">
              <label>Template</label>
              <select
                value={toolTemplate}
                onChange={(e) => setToolTemplate(e.target.value)}
                className="select-field"
              >
                <option value="invoice">Commercial Invoice</option>
                <option value="certificate">Award Certificate</option>
                <option value="report">Executive Business Report</option>
                <option value="resume">Modern Tech Resume</option>
              </select>
            </div>
          )}

          {selectedTool === 'doc_engine_get_api_ref' && (
            <div className="form-group">
              <label>Category Filter</label>
              <select
                value={toolCategory}
                onChange={(e) => setToolCategory(e.target.value)}
                className="select-field"
              >
                <option value="core">Core Engine (createDocument, fonts, clone)</option>
                <option value="flow-stack">Flow Stack & Tables (addStack, addTable)</option>
                <option value="react">React JSX & Hooks (usePDF, DocumentViewer)</option>
                <option value="renderers">Renderers (PdfRenderer, CanvasRenderer)</option>
              </select>
            </div>
          )}

          {selectedTool === 'doc_engine_get_custom_doc_guide' && (
            <div className="form-group">
              <label>Step Filter (Optional)</label>
              <select
                value={toolStep}
                onChange={(e) => setToolStep(e.target.value)}
                className="select-field"
              >
                <option value="all">All Steps (Complete 6-Step Blueprint)</option>
                <option value="1">Step 1: Canvas Dimensions</option>
                <option value="2">Step 2: Flow Stacks</option>
                <option value="3">Step 3: Geometry & Shapes</option>
                <option value="4">Step 4: Typography & Headers</option>
                <option value="5">Step 5: Proportional Tables</option>
                <option value="6">Step 6: PDF / Canvas Compilation</option>
              </select>
            </div>
          )}

          {selectedTool === 'doc_engine_get_primitive_specs' && (
            <div className="form-group">
              <label>Primitive Filter (Optional)</label>
              <select
                value={toolPrimitive}
                onChange={(e) => setToolPrimitive(e.target.value)}
                className="select-field"
              >
                <option value="all">All Primitives</option>
                <option value="Text">Text</option>
                <option value="Stack">Stack</option>
                <option value="Table">Table</option>
                <option value="View">View</option>
                <option value="Grid">Grid</option>
                <option value="Shape">Shape</option>
                <option value="Image">Image</option>
              </select>
            </div>
          )}

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleRunTool}
            disabled={loading}
          >
            <Play size={13} />
            {loading ? 'Executing MCP Tool...' : 'Execute Tool Call'}
          </button>

          <div className="panel-divider"></div>

          <div className="file-meta-box">
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              Agent Integration
            </span>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>
              Any AI agent script in the browser console can run:
            </p>
            <code style={{ fontSize: '0.72rem', background: 'var(--surface)', padding: '4px', borderRadius: '2px', border: '1px solid var(--border)' }}>
              {`window.__DOC_ENGINE_MCP__.callTool('${selectedTool}', { ... })`}
            </code>
          </div>
        </div>

        {/* Right Output Panel */}
        <div className="preview-container" style={{ minHeight: 'auto' }}>
          <div className="preview-toolbar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Terminal size={14} />
              <span style={{ fontSize: '0.82rem', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                MCP Response Stream
              </span>
            </div>

            {mcpResponse && (
              <button
                type="button"
                className="btn btn-secondary"
                style={{ padding: '3px 8px', fontSize: '0.72rem' }}
                onClick={() => copyText(mcpResponse, 'response')}
              >
                {copiedKey === 'response' ? <Check size={12} /> : <Copy size={12} />}
                {copiedKey === 'response' ? 'Copied' : 'Copy Response'}
              </button>
            )}
          </div>

          <div className="preview-body" style={{ background: 'var(--code-bg)', padding: '16px' }}>
            <div style={{ width: '100%', height: '100%' }}>
              <pre
                style={{
                  margin: 0,
                  color: 'var(--code-text)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  lineHeight: 1.5,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  maxHeight: '480px',
                  overflowY: 'auto',
                }}
              >
                {mcpResponse ||
                  JSON.stringify(
                    {
                      status: 'ready',
                      protocol: 'JSON-RPC 2.0',
                      server: 'doc-engine-web-mcp v0.2.0',
                      hint: 'Select a tool on the left and click "Execute Tool Call" to view live MCP JSON response payload.',
                    },
                    null,
                    2
                  )}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Configuration Code Boxes for IDE Agents */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px', marginTop: '16px' }}>
        <div className="code-snippet-box">
          <div className="code-snippet-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Claude Desktop & Cursor Config (mcpServers.json)</span>
            <button
              type="button"
              className="docs-copy-btn"
              onClick={() => copyText(claudeDesktopConfig, 'claude')}
            >
              {copiedKey === 'claude' ? <Check size={11} /> : <Copy size={11} />}
              {copiedKey === 'claude' ? 'Copied' : 'Copy'}
            </button>
          </div>
          <pre className="code-snippet-content">
            <code>{claudeDesktopConfig}</code>
          </pre>
        </div>

        <div className="code-snippet-box">
          <div className="code-snippet-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Browser AI Agent / Headless Playwright Hook</span>
            <button
              type="button"
              className="docs-copy-btn"
              onClick={() => copyText(browserAgentSnippet, 'browser')}
            >
              {copiedKey === 'browser' ? <Check size={11} /> : <Copy size={11} />}
              {copiedKey === 'browser' ? 'Copied' : 'Copy'}
            </button>
          </div>
          <pre className="code-snippet-content">
            <code>{browserAgentSnippet}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
