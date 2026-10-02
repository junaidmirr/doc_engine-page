import { useState, useMemo } from 'react';
import {
  Document,
  Page,
  View,
  Text,
  Shape,
  Line,
  Table,
  Grid,
  usePDF,
} from '@worklabs05/doc-engine/react';
import type { PageSizeName, PageOrientation } from '@worklabs05/doc-engine';
import { Download } from 'lucide-react';

export const ReactJSXShowcase: React.FC = () => {
  const [pageSize, setPageSize] = useState<PageSizeName>('letter');
  const [orientation, setOrientation] = useState<PageOrientation>('portrait');
  const [accentColor, setAccentColor] = useState('#18181b');
  const [fontFamily, setFontFamily] = useState<'Helvetica' | 'Times-Roman' | 'Courier'>('Helvetica');
  const [enableZebra, setEnableZebra] = useState(true);
  const [headerTitle, setHeaderTitle] = useState('Vector Layout Specification');
  const [badgeText, setBadgeText] = useState('OFFICIAL VECTOR SPECIFICATION');
  const [lineHeight, setLineHeight] = useState(1.4);

  // 1. Declarative React JSX Document Tree
  const myDocument = useMemo(
    () => (
      <Document defaultPageSize={pageSize} orientation={orientation}>
        <Page backgroundColor="#ffffff">
          {/* Top Header Banner View */}
          <View
            x={40}
            y={35}
            width={532}
            height={80}
            backgroundColor="#18181b"
            borderRadius={4}
            padding={16}
            layout="flex"
            flexDirection="column"
            gap={6}
          >
            <Text
              fontSize={20}
              fontWeight="bold"
              fontFamily={fontFamily}
              color="#ffffff"
              width={500}
            >
              {headerTitle}
            </Text>
            <Text
              fontSize={10}
              fontFamily={fontFamily}
              color="#a1a1aa"
              letterSpacing={1.2}
              fontWeight="bold"
              width={500}
            >
              {badgeText}
            </Text>
          </View>

          {/* Section Heading & Geometry Primitive */}
          <View
            x={40}
            y={130}
            width={532}
            height={32}
            layout="flex"
            flexDirection="row"
            gap={12}
            alignItems="center"
          >
            <Shape
              shapeType="circle"
              width={16}
              height={16}
              fillColor={accentColor}
            />
            <Text
              width={480}
              fontSize={12}
              fontWeight="bold"
              fontFamily={fontFamily}
              color="#18181b"
            >
              Section 1.0: Declarative Layout & Primitives
            </Text>
          </View>

          {/* Divider Line Primitive */}
          <Line
            x={40}
            y={170}
            x2={572}
            y2={170}
            strokeColor="#e4e4e7"
            strokeWidth={1}
          />

          {/* Body Paragraph with Typography Controls */}
          <Text
            x={40}
            y={182}
            width={532}
            fontSize={11}
            fontFamily={fontFamily}
            lineHeight={lineHeight}
            color="#3f3f46"
            align="justify"
          >
            This document demonstrates the full suite of declarative React JSX components provided by{' '}
            <strong style={{ fontWeight: 'bold' }}>doc-engine/react</strong>. The entire document tree
            is composed using standard React primitives (&lt;Document&gt;, &lt;Page&gt;, &lt;View&gt;,
            &lt;Text&gt;, &lt;Shape&gt;, &lt;Table&gt;, and &lt;Grid&gt;). The rendering pipeline
            compiles this JSX hierarchy directly into real vector PDF streams with native fonts, vector
            polygons, and zero screenshot rasterization.
          </Text>

          {/* 2D Metric Cards Grid */}
          <Grid
            x={40}
            y={255}
            width={532}
            height={65}
            columns={3}
            gap={12}
          >
            <View
              width={168}
              height={60}
              backgroundColor="#fafafa"
              borderColor="#e4e4e7"
              borderWidth={1}
              borderRadius={4}
              padding={10}
            >
              <Text fontSize={9} color="#71717a" fontWeight="bold">VECTOR SHARPNESS</Text>
              <Text fontSize={16} fontWeight="bold" color="#18181b">1,000%</Text>
            </View>

            <View
              width={168}
              height={60}
              backgroundColor="#fafafa"
              borderColor="#e4e4e7"
              borderWidth={1}
              borderRadius={4}
              padding={10}
            >
              <Text fontSize={9} color="#71717a" fontWeight="bold">CANVAS LATENCY</Text>
              <Text fontSize={16} fontWeight="bold" color="#18181b">&lt; 5 ms</Text>
            </View>

            <View
              width={168}
              height={60}
              backgroundColor="#fafafa"
              borderColor="#e4e4e7"
              borderWidth={1}
              borderRadius={4}
              padding={10}
            >
              <Text fontSize={9} color="#71717a" fontWeight="bold">PDF FILE SIZE</Text>
              <Text fontSize={16} fontWeight="bold" color="#18181b">~4.8 KB</Text>
            </View>
          </Grid>

          {/* Itemized Table Primitive with Zebra Striping */}
          <Table
            x={40}
            y={338}
            width={532}
            columns={['2.6fr', '1.3fr', '1.1fr']}
            zebra={enableZebra}
            zebraColor="#fafafa"
            borderWidth={1}
            borderColor="#e4e4e7"
            cellPadding={8}
            header={{
              backgroundColor: '#18181b',
              cells: [
                { content: 'Component / Primitive', textColor: '#ffffff', fontWeight: 'bold', fontSize: 10 },
                { content: 'Renderer Target', textColor: '#ffffff', fontWeight: 'bold', fontSize: 10, align: 'center' },
                { content: 'Performance', textColor: '#ffffff', fontWeight: 'bold', fontSize: 10, align: 'right' },
              ],
            }}
            rows={[
              {
                cells: [
                  { content: '<Document> & <Page> Root Containers' },
                  { content: 'PDF & Canvas', align: 'center' },
                  { content: '0ms Overhead', align: 'right' },
                ],
              },
              {
                cells: [
                  { content: '<View> with Flexbox & Padding' },
                  { content: 'Auto-Layout Box', align: 'center' },
                  { content: '< 1ms Flow', align: 'right' },
                ],
              },
              {
                cells: [
                  { content: '<Table> Fractional Column Engine' },
                  { content: 'Auto-Table Matrix', align: 'center' },
                  { content: '< 2ms Layout', align: 'right' },
                ],
              },
              {
                cells: [
                  { content: '<Shape> & <Line> Native Vectors' },
                  { content: 'pdf-lib Path Operators', align: 'center' },
                  { content: 'Zero Raster', align: 'right' },
                ],
              },
            ]}
          />

          {/* Footer Note */}
          <Text
            x={40}
            y={520}
            width={532}
            fontSize={9}
            color="#a1a1aa"
            align="center"
          >
            Generated with doc-engine/react • Pure Vector Output • Zero Python • Zero Puppeteer
          </Text>
        </Page>
      </Document>
    ),
    [pageSize, orientation, accentColor, fontFamily, enableZebra, headerTitle, badgeText, lineHeight]
  );

  // Hook to automatically compile the vector PDF
  const { dataUrl, loading, download } = usePDF(myDocument);

  return (
    <div className="showcase-section">
      <div className="section-intro">
        <h2>Declarative React JSX Engine (<code>doc-engine/react</code>)</h2>
        <p>
          Write document layouts using declarative React JSX components. Every element translates
          directly into a mathematical vector representation.
        </p>
      </div>

      <div className="showcase-grid">
        {/* Controls Column */}
        <div className="control-panel">
          <div className="panel-header">
            <h3>JSX Properties</h3>
            <span className="status-badge-ready">Interactive</span>
          </div>

          <div className="form-group">
            <label>Document Title</label>
            <input
              type="text"
              value={headerTitle}
              onChange={(e) => setHeaderTitle(e.target.value)}
              className="input-field"
            />

            <label>Subheader Badge</label>
            <input
              type="text"
              value={badgeText}
              onChange={(e) => setBadgeText(e.target.value)}
              className="input-field"
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label>Page Size</label>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(e.target.value as PageSizeName)}
                  className="select-field"
                >
                  <option value="letter">Letter (8.5 × 11")</option>
                  <option value="a4">A4 (210 × 297mm)</option>
                  <option value="legal">Legal (8.5 × 14")</option>
                  <option value="a5">A5 (148 × 210mm)</option>
                </select>
              </div>

              <div>
                <label>Orientation</label>
                <select
                  value={orientation}
                  onChange={(e) => setOrientation(e.target.value as PageOrientation)}
                  className="select-field"
                >
                  <option value="portrait">Portrait</option>
                  <option value="landscape">Landscape</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label>Font Family</label>
                <select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value as any)}
                  className="select-field"
                >
                  <option value="Helvetica">Helvetica (Sans)</option>
                  <option value="Times-Roman">Times-Roman (Serif)</option>
                  <option value="Courier">Courier (Monospace)</option>
                </select>
              </div>

              <div>
                <label>Accent Color</label>
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  style={{ width: '100%', height: '34px', borderRadius: '3px', border: '1px solid var(--border)' }}
                />
              </div>
            </div>

            <label>Line Height: {lineHeight}</label>
            <input
              type="range"
              min="1.1"
              max="2.0"
              step="0.1"
              value={lineHeight}
              onChange={(e) => setLineHeight(parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />

            <div style={{ marginTop: '8px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.82rem' }}>
                <input
                  type="checkbox"
                  checked={enableZebra}
                  onChange={(e) => setEnableZebra(e.target.checked)}
                />
                Zebra Striping
              </label>
            </div>
          </div>

          <div className="panel-divider"></div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => download('declarative-jsx-document.pdf')}
            disabled={loading}
          >
            <Download size={14} />
            {loading ? 'Compiling PDF...' : 'Download PDF'}
          </button>

          {/* Code Snippet Box */}
          <div className="code-snippet-box">
            <div className="code-snippet-header">JSX AST Definition</div>
            <pre className="code-snippet-content">
{`<Document defaultPageSize="${pageSize}" orientation="${orientation}">
  <Page backgroundColor="#ffffff">
    <View x={40} y={35} width={532} height={80} backgroundColor="#18181b">
      <Text fontSize={20} fontWeight="bold">${headerTitle}</Text>
    </View>
    <Table
      columns={['3fr', '1fr', '1fr']}
      zebra={${enableZebra}}
      header={{ cells: [...] }}
      rows={[...]}
    />
  </Page>
</Document>`}
            </pre>
          </div>
        </div>

        {/* Live Preview Column */}
        <div className="preview-container">
          <div className="preview-toolbar">
            <span style={{ fontWeight: 600, fontSize: '0.84rem' }}>Vector PDF Preview</span>
            {loading ? <span className="status-badge-ready">Compiling...</span> : <span className="status-badge-ready">PDF 1.7</span>}
          </div>

          <div className="preview-body">
            {dataUrl ? (
              <iframe
                title="React JSX Preview"
                src={dataUrl}
                className="pdf-iframe"
              />
            ) : (
              <div className="loading-placeholder">Compiling document tree...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
