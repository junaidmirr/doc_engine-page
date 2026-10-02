import { useState } from 'react';
import { useDocument, DocumentViewer } from 'doc-engine/react';
import type { DocumentDefinition } from 'doc-engine';
import { Type, Square, Circle, Trash2, Undo2, Redo2, Download, Check } from 'lucide-react';

export const StudioShowcase: React.FC = () => {
  // Initial Document AST for the studio playground
  const initialDoc: DocumentDefinition = {
    id: 'studio-doc',
    defaultPageSize: 'letter',
    orientation: 'portrait',
    pages: [
      {
        id: 'page-1',
        backgroundColor: '#ffffff',
        elements: [
          {
            id: 'el-header-banner',
            type: 'shape',
            shapeType: 'rectangle',
            x: 40,
            y: 40,
            width: 532,
            height: 70,
            fillColor: '#18181b',
            borderRadius: 4,
          },
          {
            id: 'el-title',
            type: 'text',
            text: 'Interactive Document Studio',
            x: 60,
            y: 55,
            width: 480,
            height: 25,
            fontSize: 20,
            fontWeight: 'bold',
            color: '#ffffff',
          },
          {
            id: 'el-subtitle',
            type: 'text',
            text: 'CLICK ELEMENTS ON CANVAS TO SELECT & EDIT LIVE WITH ATOMIC UNDO/REDO',
            x: 60,
            y: 82,
            width: 480,
            height: 15,
            fontSize: 9,
            fontWeight: 'bold',
            color: '#a1a1aa',
          },
          {
            id: 'el-desc',
            type: 'text',
            text: 'This visual workspace is powered by the useDocument reactive hook. You can add new elements, click on existing canvas elements to edit their text or colors, test undo/redo history stacks, and download the real vector PDF at any time.',
            x: 40,
            y: 130,
            width: 532,
            height: 40,
            fontSize: 11,
            color: '#3f3f46',
            lineHeight: 1.45,
          },
          {
            id: 'el-stat-box',
            type: 'shape',
            shapeType: 'rectangle',
            x: 40,
            y: 185,
            width: 160,
            height: 70,
            fillColor: '#fafafa',
            strokeColor: '#e4e4e7',
            strokeWidth: 1,
            borderRadius: 4,
          },
          {
            id: 'el-stat-text-1',
            type: 'text',
            text: '60 FPS Canvas',
            x: 52,
            y: 198,
            width: 140,
            height: 18,
            fontSize: 12,
            fontWeight: 'bold',
            color: '#18181b',
          },
          {
            id: 'el-stat-text-2',
            type: 'text',
            text: '< 5ms Render Latency',
            x: 52,
            y: 220,
            width: 140,
            height: 15,
            fontSize: 10,
            color: '#71717a',
          },
        ],
      },
    ],
  };

  const {
    document: doc,
    addElement,
    updateElement,
    deleteElement,
    undo,
    redo,
    downloadPdf,
  } = useDocument(initialDoc);

  const [selectedId, setSelectedId] = useState<string>('el-title');
  const [editText, setEditText] = useState('Interactive Document Studio');
  const [editColor, setEditColor] = useState('#ffffff');
  const [editFontSize, setEditFontSize] = useState(20);
  const [historyCount, setHistoryCount] = useState(0);

  // Sync edit fields when an element is selected
  const handleSelectElement = (elId: string) => {
    setSelectedId(elId);
    const page = doc.pages[0];
    const el = page.elements.find((e) => e.id === elId);
    if (el) {
      if (el.type === 'text') {
        setEditText(el.text || '');
        setEditColor(el.color || '#000000');
        setEditFontSize(el.fontSize || 12);
      } else if (el.type === 'shape') {
        setEditColor(el.fillColor || el.strokeColor || '#000000');
      }
    }
  };

  // Add sample elements
  const handleAddText = () => {
    const newId = `text-${Date.now()}`;
    const nextY = 270 + ((doc.pages[0].elements.length - 7) % 6) * 35;
    addElement({
      id: newId,
      type: 'text',
      text: 'New Dynamic Text Node',
      x: 40,
      y: nextY,
      width: 300,
      height: 25,
      fontSize: 13,
      fontWeight: 'bold',
      color: '#18181b',
    });
    handleSelectElement(newId);
    setHistoryCount((c) => c + 1);
  };

  const handleAddBadge = () => {
    const newId = `badge-${Date.now()}`;
    const nextY = 270 + ((doc.pages[0].elements.length - 7) % 6) * 35;
    addElement({
      id: newId,
      type: 'shape',
      shapeType: 'rectangle',
      x: 40,
      y: nextY,
      width: 140,
      height: 30,
      fillColor: '#fafafa',
      strokeColor: '#e4e4e7',
      strokeWidth: 1,
      borderRadius: 3,
    });
    addElement({
      id: `${newId}-txt`,
      type: 'text',
      text: 'NODE SPEC',
      x: 58,
      y: nextY + 8,
      width: 100,
      height: 15,
      fontSize: 9,
      fontWeight: 'bold',
      color: '#18181b',
    });
    handleSelectElement(newId);
    setHistoryCount((c) => c + 1);
  };

  const handleAddCircle = () => {
    const newId = `circle-${Date.now()}`;
    const nextY = 270 + ((doc.pages[0].elements.length - 7) % 6) * 35;
    addElement({
      id: newId,
      type: 'shape',
      shapeType: 'circle',
      x: 40,
      y: nextY,
      width: 32,
      height: 32,
      fillColor: '#18181b',
    });
    handleSelectElement(newId);
    setHistoryCount((c) => c + 1);
  };

  const handleApplyUpdate = () => {
    if (!selectedId) return;
    const page = doc.pages[0];
    const el = page.elements.find((e) => e.id === selectedId);
    if (!el) return;

    if (el.type === 'text') {
      updateElement(selectedId, {
        text: editText,
        color: editColor,
        fontSize: editFontSize,
      });
    } else if (el.type === 'shape') {
      updateElement(selectedId, {
        fillColor: editColor,
      });
    }
    setHistoryCount((c) => c + 1);
  };

  const handleDeleteSelected = () => {
    if (!selectedId) return;
    deleteElement(selectedId);
    setSelectedId('');
    setHistoryCount((c) => c + 1);
  };

  const handleUndo = () => {
    undo();
    setHistoryCount((c) => Math.max(0, c - 1));
  };

  const handleRedo = () => {
    redo();
    setHistoryCount((c) => c + 1);
  };

  return (
    <div className="showcase-section">
      <div className="section-intro">
        <h2>Interactive Document Studio (<code>useDocument</code>)</h2>
        <p>
          A reactive, stateful document builder with atomic Undo/Redo history, live element selection,
          drag-less precision editing, and real-time 60 FPS HTML5 Canvas updates.
        </p>
      </div>

      <div className="showcase-grid">
        {/* Left Toolbar & Inspector */}
        <div className="control-panel">
          <div className="panel-header">
            <h3>Studio Inspector</h3>
            <span className="status-badge-ready">History: {historyCount}</span>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <button type="button" className="btn btn-secondary" onClick={handleAddText}>
              <Type size={13} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
              + Text
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleAddBadge}>
              <Square size={13} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
              + Box
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleAddCircle}>
              <Circle size={13} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
              + Shape
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleDeleteSelected}
              disabled={!selectedId}
            >
              <Trash2 size={13} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
              Delete
            </button>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button type="button" className="btn btn-secondary" onClick={handleUndo} style={{ flex: 1 }}>
              <Undo2 size={13} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
              Undo
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleRedo} style={{ flex: 1 }}>
              <Redo2 size={13} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
              Redo
            </button>
          </div>

          {/* Element Inspector */}
          <div className="panel-divider"></div>

          {selectedId ? (
            <div className="form-group">
              <label>Selected ID: {selectedId}</label>
              <input
                type="text"
                value={editText}
                onChange={(e) => {
                  setEditText(e.target.value);
                  updateElement(selectedId, { text: e.target.value });
                }}
                className="input-field"
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label>Font Size</label>
                  <input
                    type="number"
                    value={editFontSize}
                    onChange={(e) => {
                      const size = Number(e.target.value) || 12;
                      setEditFontSize(size);
                      updateElement(selectedId, { fontSize: size });
                    }}
                    className="input-field"
                  />
                </div>

                <div>
                  <label>Color</label>
                  <input
                    type="color"
                    value={editColor.startsWith('#') ? editColor : '#18181b'}
                    onChange={(e) => {
                      setEditColor(e.target.value);
                      updateElement(selectedId, { color: e.target.value, fillColor: e.target.value });
                    }}
                    style={{ width: '100%', height: '34px', borderRadius: '3px', border: '1px solid var(--border)' }}
                  />
                </div>
              </div>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleApplyUpdate}
                style={{ width: '100%', marginTop: '4px' }}
              >
                <Check size={13} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                Apply Changes
              </button>
            </div>
          ) : (
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Click any element directly on the canvas to inspect and edit its properties.
            </p>
          )}

          <div className="panel-divider"></div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => downloadPdf('studio-document.pdf')}
          >
            <Download size={14} />
            Export to Vector PDF
          </button>
        </div>

        {/* Right Canvas Preview with Element Click */}
        <div className="preview-container">
          <div className="preview-toolbar">
            <span style={{ fontWeight: 600, fontSize: '0.84rem' }}>Canvas Workspace</span>
            <span className="status-badge-ready">{doc.pages[0].elements.length} Nodes</span>
          </div>

          <div className="preview-body" style={{ background: 'var(--bg-subtle)' }}>
            <DocumentViewer
              document={doc}
              initialScale={0.85}
              showToolbar={true}
              selectedElementId={selectedId}
              onElementClick={handleSelectElement}
              className="showcase-document-viewer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
