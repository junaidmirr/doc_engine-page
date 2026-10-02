import { useState, useMemo } from 'react';
import { Document, Page, View, Text, Line, usePDF, DocumentViewer } from '@worklabs05/doc-engine/react';
import { Download, Eye, FileText } from 'lucide-react';

export const PaginationShowcase: React.FC = () => {
  const [pageCount, setPageCount] = useState<2 | 3 | 4>(3);
  const [documentTitle, setDocumentTitle] = useState('Global Engineering Master Specification');
  const [activeViewer, setActiveViewer] = useState<'canvas' | 'pdf'>('canvas');

  // Multi-page document tree
  const multiPageDoc = useMemo(() => {
    const pages = [];
    const totalPages = pageCount;

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Page key={i} backgroundColor="#ffffff">
          {/* Running Dynamic Header */}
          <View x={40} y={25} width={532} height={25} layout="flex" flexDirection="row" justifyContent="space-between">
            <Text fontSize={9} color="#64748b" fontWeight="bold">
              {documentTitle.toUpperCase()}
            </Text>
            <Text fontSize={9} color="#94a3b8">
              CONFIDENTIAL & PROPRIETARY
            </Text>
          </View>
          <Line x={40} y={48} x2={572} y2={48} strokeColor="#e2e8f0" strokeWidth={1} />

          {/* Page-Specific Content */}
          {i === 1 && (
            <>
              <View x={40} y={70} width={532} height={80} backgroundColor="#18181b" borderRadius={4} padding={16} layout="flex" flexDirection="column" gap={6}>
                <Text fontSize={20} fontWeight="bold" color="#ffffff" width={500}>
                  Section 1: Architecture Principles
                </Text>
                <Text fontSize={10} color="#a1a1aa" fontWeight="bold" width={500}>
                  HIGH-THROUGHPUT CLIENT-SIDE DOCUMENT COMPILATION PIPELINE
                </Text>
              </View>

              <Text x={40} y={165} width={532} fontSize={11} color="#3f3f46" lineHeight={1.5} align="justify">
                This multi-page document demonstrates the auto-pagination and running header/footer capabilities
                of doc-engine. When documents span across multiple printable sheets, running headers and footers
                are bound to every page automatically. Each page calculates dynamic page number macros (Page {i} of {totalPages})
                and maintains precise margins.
              </Text>

              <View x={40} y={240} width={532} height={140} backgroundColor="#fafafa" borderColor="#e4e4e7" borderWidth={1} borderRadius={4} padding={16} layout="flex" flexDirection="column" gap={8}>
                <Text fontSize={12} fontWeight="bold" color="#18181b" width={500}>
                  Key Principles of Vector Document Design
                </Text>
                <Text fontSize={10} color="#52525b" lineHeight={1.6} width={500}>
                  • Deterministic Coordinate Systems: Screen coordinates are transformed to PDF points (1/72 inch).{'\n'}
                  • Font Metric Caching: AFM metrics determine line-break points with zero DOM measurements.{'\n'}
                  • Page-Break Isolation: Blocks decorated with keepWithNext never orphan at bottom margins.{'\n'}
                  • Instantaneous Previews: HTML5 Canvas mirrors vector PDF drawing operations in milliseconds.
                </Text>
              </View>
            </>
          )}

          {i === 2 && (
            <>
              <View x={40} y={70} width={532} height={80} backgroundColor="#18181b" borderRadius={4} padding={16} layout="flex" flexDirection="column" gap={6}>
                <Text fontSize={20} fontWeight="bold" color="#ffffff" width={500}>
                  Section 2: Layout & Flow Constraints
                </Text>
                <Text fontSize={10} color="#a1a1aa" fontWeight="bold" width={500}>
                  AUTOMATED PAGE-BREAK RULES & MARGIN ENFORCEMENT
                </Text>
              </View>

              <Text x={40} y={165} width={532} fontSize={11} color="#3f3f46" lineHeight={1.5} align="justify">
                Pagination constraints such as pageBreakBefore, pageBreakAfter, and pageBreakInside allow enterprise
                reports to avoid awkward splits. In long itemized tables, header rows automatically repeat when content
                overflows onto subsequent sheets, ensuring complete readability without manual pagination code.
              </Text>

              <View x={40} y={240} width={532} height={150} backgroundColor="#fafafa" borderColor="#e4e4e7" borderWidth={1} borderRadius={4} padding={16} layout="flex" flexDirection="column" gap={8}>
                <Text fontSize={12} fontWeight="bold" color="#18181b" width={500}>
                  Table Pagination Matrix & Rules
                </Text>
                <Text fontSize={10} color="#52525b" lineHeight={1.6} width={500}>
                  1. Header Repetition: repeatHeaderOnNewPage=true re-injects column titles on Sheet {i}.{'\n'}
                  2. Row Splitting: Individual rows are atomic bounding boxes that never fracture midway.{'\n'}
                  3. Overflow Detection: When remaining printable height &lt; rowHeight, a new Page is created.{'\n'}
                  4. Top & Bottom Margins: 40pt safe zones are strictly honored across all sheets.
                </Text>
              </View>
            </>
          )}

          {i === 3 && (
            <>
              <View x={40} y={70} width={532} height={80} backgroundColor="#18181b" borderRadius={4} padding={16} layout="flex" flexDirection="column" gap={6}>
                <Text fontSize={20} fontWeight="bold" color="#ffffff" width={500}>
                  Section 3: Verification & Sign-Off
                </Text>
                <Text fontSize={10} color="#a1a1aa" fontWeight="bold" width={500}>
                  DOCUMENT AUDIT TRAIL & METADATA VERIFICATION
                </Text>
              </View>

              <Text x={40} y={165} width={532} fontSize={11} color="#3f3f46" lineHeight={1.5} align="justify">
                All document pages have been compiled with cryptographic integrity. PDF document metadata
                (Title, Author, Creator, Subject, and Modification Dates) is embedded directly into the binary
                PDF header dictionary according to ISO 32000-1 specification.
              </Text>

              <View x={40} y={240} width={532} height={130} backgroundColor="#fafafa" borderColor="#e4e4e7" borderWidth={1} borderRadius={4} padding={16} layout="flex" flexDirection="column" gap={8}>
                <Text fontSize={12} fontWeight="bold" color="#18181b" width={500}>
                  Sign-Off Certification
                </Text>
                <Text fontSize={10} color="#52525b" lineHeight={1.6} width={500}>
                  Approved By: Chief Technology Officer • Enterprise Solutions Group{'\n'}
                  Date: October 1, 2026 • Verified Vector Integrity 100%{'\n'}
                  System Fingerprint: DOC-ENGINE-VECTOR-CORE-REV-2026
                </Text>
              </View>
            </>
          )}

          {i === 4 && (
            <>
              <View x={40} y={70} width={532} height={80} backgroundColor="#18181b" borderRadius={4} padding={16} layout="flex" flexDirection="column" gap={6}>
                <Text fontSize={20} fontWeight="bold" color="#ffffff" width={500}>
                  Section 4: Appendix & Metric Glossaries
                </Text>
                <Text fontSize={10} color="#a1a1aa" fontWeight="bold" width={500}>
                  TECHNICAL METRICS & BENCHMARK REFERENCE
                </Text>
              </View>

              <Text x={40} y={165} width={532} fontSize={11} color="#3f3f46" lineHeight={1.5}>
                Appendix containing comprehensive rendering speed benchmarks, font metrics, and
                comparison tables between doc-engine, @react-pdf, and Puppeteer headless generation.
              </Text>
            </>
          )}

          {/* Running Dynamic Footer */}
          <Line x={40} y={740} x2={572} y2={740} strokeColor="#e2e8f0" strokeWidth={1} />
          <View x={40} y={750} width={532} height={20} layout="flex" flexDirection="row" justifyContent="space-between">
            <Text fontSize={9} color="#94a3b8">
              doc-engine Multi-Page Flow Specification
            </Text>
            <Text fontSize={9} color="#64748b" fontWeight="bold">
              Page {i} of {totalPages}
            </Text>
          </View>
        </Page>
      );
    }

    return (
      <Document defaultPageSize="letter" orientation="portrait" metadata={{ title: documentTitle, author: 'doc-engine' }}>
        {pages}
      </Document>
    );
  }, [pageCount, documentTitle]);

  const { dataUrl, loading, download } = usePDF(multiPageDoc);

  return (
    <div className="showcase-section">
      <div className="section-intro">
        <h2>Multi-Page & Auto-Pagination Engine</h2>
        <p>
          Generate documents that flow seamlessly across multiple pages with running headers,
          footers, dynamic page number macros (<code>Page &#123;pageNumber&#125; of &#123;totalPages&#125;</code>), and safe margin bounds.
        </p>
      </div>

      <div className="showcase-grid">
        <div className="control-panel">
          <div className="panel-header">
            <h3>Pagination Rules</h3>
            <span className="status-badge-ready">Dynamic Flow</span>
          </div>

          <div className="form-group">
            <label>Document Title (Running Header)</label>
            <input
              type="text"
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
              className="input-field"
            />

            <label>Number of Pages</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[2, 3, 4].map((count) => (
                <button
                  key={count}
                  type="button"
                  className={`switch-btn ${pageCount === count ? 'active' : ''}`}
                  onClick={() => setPageCount(count as any)}
                  style={{ flex: 1 }}
                >
                  {count} Sheets
                </button>
              ))}
            </div>

            <div className="panel-divider"></div>

            <div className="metrics-box">
              <div className="meta-row">
                <span>Page Count:</span>
                <strong>{pageCount} Sheets</strong>
              </div>
              <div className="meta-row">
                <span>Margins:</span>
                <strong>40 pt Safe Zone</strong>
              </div>
              <div className="meta-row">
                <span>Header Flow:</span>
                <strong>Synchronized</strong>
              </div>
              <div className="meta-row">
                <span>Footer Macro:</span>
                <strong>Page [i] of [N]</strong>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => download(`${documentTitle.toLowerCase().replace(/\s+/g, '-')}.pdf`)}
            disabled={loading}
          >
            <Download size={14} />
            {loading ? 'Compiling Multi-Page...' : `Download PDF (${pageCount} Pages)`}
          </button>
        </div>

        <div className="preview-container">
          <div className="preview-toolbar">
            <div className="preview-mode-switch">
              <button
                type="button"
                className={`switch-btn ${activeViewer === 'canvas' ? 'active' : ''}`}
                onClick={() => setActiveViewer('canvas')}
              >
                <Eye size={13} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                Canvas (60 FPS)
              </button>
              <button
                type="button"
                className={`switch-btn ${activeViewer === 'pdf' ? 'active' : ''}`}
                onClick={() => setActiveViewer('pdf')}
              >
                <FileText size={13} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                Vector PDF
              </button>
            </div>

            <span className="status-badge-ready">{pageCount} Pages</span>
          </div>

          <div className="preview-body">
            {activeViewer === 'canvas' ? (
              <DocumentViewer
                document={multiPageDoc}
                initialScale={0.8}
                showToolbar={true}
                className="showcase-document-viewer"
              />
            ) : (
              <div className="pdf-iframe-wrapper">
                {dataUrl && (
                  <iframe
                    title="Multi-page PDF Preview"
                    src={dataUrl}
                    className="pdf-iframe"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
