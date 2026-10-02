import { useState, useEffect } from 'react';
import {
  createDocument,
  PdfRenderer,
  measureTextWidth,
  wrapText,
  toPdfCoordinates,
} from 'doc-engine';
import { Download } from 'lucide-react';

export const CoreEngineShowcase: React.FC = () => {
  const [sampleText, setSampleText] = useState(
    'A headless document layout and vector rendering engine for React and TypeScript that compiles directly to real, searchable PDFs. Zero Python backend, zero Puppeteer headless browsers, and zero blurry screenshots.'
  );
  const [containerWidth, setContainerWidth] = useState(400);
  const [fontSize, setFontSize] = useState(13);
  const [fontFamily, setFontFamily] = useState<'Helvetica' | 'Times-Roman' | 'Courier'>('Helvetica');

  // Live text wrapping calculation using core engine AFM metrics
  const wrappedLines = wrapText({
    text: sampleText,
    maxWidth: containerWidth,
    fontSize,
    fontFamily,
  });

  const singleLineWidth = measureTextWidth(sampleText, fontSize, fontFamily);

  // Demonstrate Coordinate Transform
  const screenCoord = { x: 50, y: 100, height: 40 };
  const pdfCoord = toPdfCoordinates(screenCoord.x, screenCoord.y, screenCoord.height, 792, 'top-left');

  // Fluent API Document Generation
  const [fluentPdfUrl, setFluentPdfUrl] = useState<string | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function compile() {
      setIsCompiling(true);
      try {
        const doc = createDocument({
          defaultPageSize: 'letter',
          coordinateOrigin: 'top-left',
          metadata: {
            title: 'Fluent API Architecture Spec',
            author: 'doc-engine core',
          },
        });

        // 1. Header Banner
        doc.addShape({
          shapeType: 'rectangle',
          x: 40,
          y: 40,
          width: 532,
          height: 65,
          fillColor: '#18181b',
          borderRadius: 4,
        });

        doc.addText({
          text: 'Pure TypeScript Backend Pipeline',
          x: 58,
          y: 56,
          fontSize: 18,
          fontWeight: 'bold',
          color: '#ffffff',
        });

        doc.addText({
          text: 'ZERO REACT DEPENDENCY • RUNS IN NODE.JS, NEXT.JS API ROUTES & EDGE WORKERS',
          x: 58,
          y: 82,
          fontSize: 9,
          fontWeight: 'bold',
          color: '#a1a1aa',
        });

        // 2. Wrapped text paragraph
        doc.addText({
          text: sampleText,
          x: 40,
          y: 130,
          width: containerWidth,
          fontSize,
          fontFamily,
          color: '#3f3f46',
          lineHeight: 1.4,
        });

        // 3. Table generated via fluent API
        doc.addTable({
          x: 40,
          y: 220,
          width: 532,
          columns: ['3fr', '1fr', '1fr'],
          zebra: true,
          zebraColor: '#fafafa',
          borderColor: '#e4e4e7',
          header: {
            backgroundColor: '#18181b',
            cells: [
              { content: 'Metric / Component', fontWeight: 'bold' },
              { content: 'Runtime', align: 'center', fontWeight: 'bold' },
              { content: 'Status', align: 'right', fontWeight: 'bold' },
            ],
          },
          rows: [
            {
              cells: [
                { content: 'AFM Font Metric Measurement' },
                { content: 'Pure JS', align: 'center' },
                { content: 'Active', align: 'right' },
              ],
            },
            {
              cells: [
                { content: 'Binary Search Token Fitting' },
                { content: 'O(log N)', align: 'center' },
                { content: 'Active', align: 'right' },
              ],
            },
            {
              cells: [
                { content: 'Top-Left to Bottom-Left Transform' },
                { content: 'Coordinate Math', align: 'center' },
                { content: 'Active', align: 'right' },
              ],
            },
          ],
        });

        const bytes = await PdfRenderer.renderToBytes(doc.toDefinition());
        if (cancelled) return;
        const blob = new Blob([bytes as any], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setFluentPdfUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return url;
        });
      } finally {
        if (!cancelled) setIsCompiling(false);
      }
    }

    compile();

    return () => {
      cancelled = true;
    };
  }, [sampleText, containerWidth, fontSize, fontFamily]);

  return (
    <div className="showcase-section">
      <div className="section-intro">
        <h2>Core Engine API & Typography Utilities</h2>
        <p>
          The foundation of <code>doc-engine</code> is completely decoupled from React. You can run
          pure TypeScript/Node.js scripts, perform exact AFM font measurements, wrap text with
          binary-search token fitting, and transform coordinate systems.
        </p>
      </div>

      <div className="showcase-grid">
        {/* Left Column: Interactive Utilities */}
        <div className="control-panel">
          <div className="panel-header">
            <h3>Text Measurement</h3>
            <span className="status-badge-ready">AFM Engine</span>
          </div>

          <div className="form-group">
            <label>Sample Text to Measure & Wrap</label>
            <textarea
              rows={3}
              value={sampleText}
              onChange={(e) => setSampleText(e.target.value)}
              className="input-field"
              style={{ resize: 'vertical' }}
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label>Container Width: {containerWidth}pt</label>
                <input
                  type="range"
                  min="200"
                  max="520"
                  value={containerWidth}
                  onChange={(e) => setContainerWidth(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label>Font Size: {fontSize}pt</label>
                <input
                  type="range"
                  min="10"
                  max="22"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <label>Font Family</label>
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value as any)}
              className="select-field"
            >
              <option value="Helvetica">Helvetica (Standard 14 PostScript)</option>
              <option value="Times-Roman">Times-Roman (Standard 14 PostScript)</option>
              <option value="Courier">Courier (Monospace AFM)</option>
            </select>
          </div>

          <div className="panel-divider"></div>

          {/* Real-time Math Output */}
          <div className="metrics-box">
            <div className="meta-row">
              <span>Unwrapped Width:</span>
              <strong>{singleLineWidth.toFixed(1)} pt</strong>
            </div>
            <div className="meta-row">
              <span>Width Constraint:</span>
              <strong>{containerWidth} pt</strong>
            </div>
            <div className="meta-row">
              <span>Computed Lines:</span>
              <strong>{wrappedLines.length} Lines</strong>
            </div>
            <div className="meta-row">
              <span>Origin Transform:</span>
              <strong>({pdfCoord.x}, {pdfCoord.y}) pt</strong>
            </div>
          </div>

          <div className="panel-divider"></div>

          {fluentPdfUrl && (
            <a
              href={fluentPdfUrl}
              download="fluent-engine-document.pdf"
              className="btn btn-primary"
              style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}
            >
              <Download size={14} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
              Download PDF
            </a>
          )}
        </div>

        {/* Right Column: Code Snippet & Live PDF */}
        <div className="preview-container">
          <div className="preview-toolbar">
            <span style={{ fontWeight: 600, fontSize: '0.84rem' }}>Node.js / Edge Runtime Spec</span>
            <span className="status-badge-ready">
              {isCompiling ? 'Compiling...' : 'PDF 1.7'}
            </span>
          </div>

          <div className="code-snippet-box" style={{ margin: 0, borderBottom: '1px solid var(--border)' }}>
            <pre className="code-snippet-content">
{`import { createDocument, PdfRenderer } from 'doc-engine';

const doc = createDocument({ defaultPageSize: 'letter', coordinateOrigin: 'top-left' });
doc.addShape({ shapeType: 'rectangle', x: 40, y: 40, width: 532, height: 65, fillColor: '#0f172a' });
doc.addText({ text: 'Pure TypeScript Backend Pipeline', x: 58, y: 56, fontSize: 18, color: '#ffffff' });
doc.addTable({ x: 40, y: 220, width: 532, columns: ['3fr', '1fr', '1fr'], zebra: true, ... });

const pdfBytes = await PdfRenderer.renderToBytes(doc.toDefinition());`}
            </pre>
          </div>

          <div className="preview-body" style={{ height: '480px' }}>
            {fluentPdfUrl && (
              <iframe
                title="Fluent PDF Preview"
                src={fluentPdfUrl}
                className="pdf-iframe"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
