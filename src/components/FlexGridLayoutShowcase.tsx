import { useState, useMemo } from 'react';
import { Document, Page, View, Text, Shape, usePDF } from '@worklabs05/doc-engine/react';
import { Download, Rows, Columns } from 'lucide-react';

export const FlexGridLayoutShowcase: React.FC = () => {
  const [direction, setDirection] = useState<'row' | 'column'>('row');
  const [gap, setGap] = useState(16);
  const [padding, setPadding] = useState(16);
  const [justifyContent, setJustifyContent] = useState<'start' | 'center' | 'end' | 'space-between'>('space-between');
  const [alignItems, setAlignItems] = useState<'start' | 'center' | 'end'>('center');

  const flexDoc = useMemo(
    () => (
      <Document defaultPageSize="letter" orientation="portrait">
        <Page backgroundColor="#f8fafc">
          {/* Header */}
          <View
            x={40}
            y={40}
            width={532}
            height={60}
            backgroundColor="#18181b"
            borderRadius={4}
            padding={16}
            layout="flex"
            flexDirection="column"
            gap={4}
          >
            <Text fontSize={18} fontWeight="bold" color="#ffffff" width={500}>
              Flexbox & Auto-Layout Engine
            </Text>
            <Text fontSize={10} color="#a1a1aa" fontWeight="bold" width={500}>
              AUTOMATIC FLOW POSITIONING WITHOUT MANUAL PIXEL COORDINATES
            </Text>
          </View>

          {/* Description */}
          <Text x={40} y={115} width={532} fontSize={11} color="#3f3f46" lineHeight={1.4}>
            The auto-layout engine computes child positions sequentially using modern flexbox rules.
            Items automatically adapt their offsets based on flex direction, gaps, container padding, and alignment.
          </Text>

          {/* Dynamic Flex Container under test */}
          <View
            x={40}
            y={155}
            width={532}
            height={direction === 'row' ? 120 : 260}
            backgroundColor="#ffffff"
            borderColor="#18181b"
            borderWidth={1}
            borderRadius={4}
            padding={padding}
            layout="flex"
            flexDirection={direction}
            gap={gap}
            justifyContent={justifyContent}
            alignItems={alignItems}
          >
            <View
              width={direction === 'row' ? 140 : 500}
              height={direction === 'row' ? 88 : 60}
              backgroundColor="#fafafa"
              borderColor="#e4e4e7"
              borderWidth={1}
              borderRadius={4}
              padding={10}
              layout="flex"
              flexDirection="column"
              gap={4}
            >
              <Text fontSize={11} fontWeight="bold" color="#18181b">Flex Item 01</Text>
              <Text fontSize={9} color="#71717a">Sequential flow box</Text>
            </View>

            <View
              width={direction === 'row' ? 140 : 500}
              height={direction === 'row' ? 88 : 60}
              backgroundColor="#fafafa"
              borderColor="#e4e4e7"
              borderWidth={1}
              borderRadius={4}
              padding={10}
              layout="flex"
              flexDirection="column"
              gap={4}
            >
              <Text fontSize={11} fontWeight="bold" color="#18181b">Flex Item 02</Text>
              <Text fontSize={9} color="#71717a">Dynamic gap offset</Text>
            </View>

            <View
              width={direction === 'row' ? 140 : 500}
              height={direction === 'row' ? 88 : 60}
              backgroundColor="#fafafa"
              borderColor="#e4e4e7"
              borderWidth={1}
              borderRadius={4}
              padding={10}
              layout="flex"
              flexDirection="column"
              gap={4}
            >
              <Text fontSize={11} fontWeight="bold" color="#18181b">Flex Item 03</Text>
              <Text fontSize={9} color="#71717a">Aligned content</Text>
            </View>
          </View>

          {/* Nested Flex Row: Avatar + Profile Info + Status Badge */}
          <View
            x={40}
            y={direction === 'row' ? 300 : 440}
            width={532}
            height={80}
            backgroundColor="#ffffff"
            borderColor="#e4e4e7"
            borderWidth={1}
            borderRadius={4}
            padding={16}
            layout="flex"
            flexDirection="row"
            gap={16}
            alignItems="center"
          >
            <Shape
              shapeType="circle"
              width={44}
              height={44}
              fillColor="#18181b"
            />
            <View layout="flex" flexDirection="column" gap={4} width={340}>
              <Text fontSize={13} fontWeight="bold" color="#18181b" width={340}>
                Dr. Marcus Vance, Ph.D.
              </Text>
              <Text fontSize={10} color="#71717a" width={340}>
                Director of Vector Systems Architecture • Apex Research Labs
              </Text>
            </View>
            <View
              width={80}
              height={26}
              backgroundColor="#fafafa"
              borderColor="#e4e4e7"
              borderWidth={1}
              borderRadius={3}
              padding={[5, 10]}
              layout="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize={9} fontWeight="bold" color="#18181b" width={60} align="center">
                ACTIVE
              </Text>
            </View>
          </View>

          {/* 3-Column 2D Grid Showcase */}
          <View
            x={40}
            y={direction === 'row' ? 405 : 545}
            width={532}
            height={130}
            backgroundColor="#ffffff"
            borderColor="#e4e4e7"
            borderWidth={1}
            borderRadius={4}
            padding={16}
            layout="flex"
            flexDirection="column"
            gap={8}
          >
            <Text fontSize={12} fontWeight="bold" color="#18181b" width={500}>
              2D Grid Auto-Layout Matrix
            </Text>
            <Text fontSize={9} color="#71717a" width={500}>
              Calculates column widths across fractional specifications (e.g. 3 columns with 12px gaps)
            </Text>

            <View
              layout="flex"
              flexDirection="row"
              gap={12}
            >
              <View
                width={158}
                height={60}
                backgroundColor="#fafafa"
                borderColor="#e4e4e7"
                borderWidth={1}
                borderRadius={4}
                padding={10}
                layout="flex"
                flexDirection="column"
                gap={4}
              >
                <Text fontSize={9} color="#71717a" fontWeight="bold">DIRECTION</Text>
                <Text fontSize={16} fontWeight="bold" color="#18181b">{direction.toUpperCase()}</Text>
              </View>

              <View
                width={158}
                height={60}
                backgroundColor="#fafafa"
                borderColor="#e4e4e7"
                borderWidth={1}
                borderRadius={4}
                padding={10}
                layout="flex"
                flexDirection="column"
                gap={4}
              >
                <Text fontSize={9} color="#71717a" fontWeight="bold">GAP SPACING</Text>
                <Text fontSize={16} fontWeight="bold" color="#18181b">{gap} pt</Text>
              </View>

              <View
                width={158}
                height={60}
                backgroundColor="#fafafa"
                borderColor="#e4e4e7"
                borderWidth={1}
                borderRadius={4}
                padding={10}
                layout="flex"
                flexDirection="column"
                gap={4}
              >
                <Text fontSize={9} color="#71717a" fontWeight="bold">CONTAINER PADDING</Text>
                <Text fontSize={16} fontWeight="bold" color="#18181b">{padding} pt</Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    ),
    [direction, gap, padding, justifyContent, alignItems]
  );

  const { dataUrl, loading, download } = usePDF(flexDoc);

  return (
    <div className="showcase-section">
      <div className="section-intro">
        <h2>Flexbox & Grid Layout Engine</h2>
        <p>
          Experience automatic document flow layout without manual pixel coordinate calculations.
          Compose flexible horizontal rows, vertical stacks, gaps, padding, and alignments.
        </p>
      </div>

      <div className="showcase-grid">
        <div className="control-panel">
          <div className="panel-header">
            <h3>Layout Properties</h3>
            <span className="status-badge-ready">Live Flow</span>
          </div>

          <div className="form-group">
            <label>Flex Direction</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                className={`switch-btn ${direction === 'row' ? 'active' : ''}`}
                onClick={() => setDirection('row')}
                style={{ flex: 1 }}
              >
                <Columns size={13} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                Row
              </button>
              <button
                type="button"
                className={`switch-btn ${direction === 'column' ? 'active' : ''}`}
                onClick={() => setDirection('column')}
                style={{ flex: 1 }}
              >
                <Rows size={13} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                Column
              </button>
            </div>

            <label>Gap Spacing: {gap}px</label>
            <input
              type="range"
              min="4"
              max="40"
              value={gap}
              onChange={(e) => setGap(Number(e.target.value))}
              style={{ width: '100%' }}
            />

            <label>Padding: {padding}px</label>
            <input
              type="range"
              min="8"
              max="32"
              value={padding}
              onChange={(e) => setPadding(Number(e.target.value))}
              style={{ width: '100%' }}
            />

            <label>Justify Content</label>
            <select
              value={justifyContent}
              onChange={(e) => setJustifyContent(e.target.value as any)}
              className="select-field"
            >
              <option value="start">start</option>
              <option value="center">center</option>
              <option value="end">end</option>
              <option value="space-between">space-between</option>
            </select>

            <label>Align Items</label>
            <select
              value={alignItems}
              onChange={(e) => setAlignItems(e.target.value as any)}
              className="select-field"
            >
              <option value="start">start</option>
              <option value="center">center</option>
              <option value="end">end</option>
            </select>
          </div>

          <div className="panel-divider"></div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => download('flexbox-layout-document.pdf')}
            disabled={loading}
          >
            <Download size={14} />
            {loading ? 'Compiling...' : 'Download PDF'}
          </button>
        </div>

        <div className="preview-container">
          <div className="preview-toolbar">
            <span style={{ fontWeight: 600, fontSize: '0.84rem' }}>Flexbox Vector Layout</span>
            {loading ? <span className="status-badge-ready">Compiling...</span> : <span className="status-badge-ready">PDF 1.7</span>}
          </div>

          <div className="preview-body">
            {dataUrl ? (
              <iframe
                title="Flexbox Preview"
                src={dataUrl}
                className="pdf-iframe"
              />
            ) : (
              <div className="loading-placeholder">Computing flex layout matrix...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
