import { useState, useMemo } from 'react';
import {
  createInvoiceDocument,
  createCertificateDocument,
  createBusinessReportDocument,
  createResumeDocument,
} from '@worklabs05/doc-engine/examples';
import { DocumentViewer, usePDF } from '@worklabs05/doc-engine/react';
import {
  Receipt,
  Award,
  BarChart3,
  User,
  Download,
  Eye,
  FileText,
} from 'lucide-react';

export type TemplateKey = 'invoice' | 'certificate' | 'report' | 'resume';

interface TemplatesShowcaseProps {
  initialTemplate?: TemplateKey;
}

export const TemplatesShowcase: React.FC<TemplatesShowcaseProps> = ({ initialTemplate = 'invoice' }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey>(initialTemplate);
  const [previewMode, setPreviewMode] = useState<'canvas' | 'pdf'>('canvas');

  // Interactive Form State for customization
  const [clientName, setClientName] = useState('Acme Global Enterprises');
  const [invoiceNumber, setInvoiceNumber] = useState('INV-2026-904');
  const [hourlyRate, setHourlyRate] = useState(150);

  const [recipientName, setRecipientName] = useState('Sarah Jenkins');
  const [courseTitle, setCourseTitle] = useState('Advanced Systems Architecture & PDF Engineering');

  const [companyName, setCompanyName] = useState('Apex Technologies');
  const [quarter, setQuarter] = useState('Q3');
  const [year, setYear] = useState(2026);

  const [candidateName, setCandidateName] = useState('David Miller');
  const [jobTitle, setJobTitle] = useState('Principal Software Architect');

  // Compute active Document AST based on template and state
  const activeDocument = useMemo(() => {
    switch (selectedTemplate) {
      case 'invoice':
        return createInvoiceDocument({
          invoiceNumber,
          issueDate: 'October 1, 2026',
          dueDate: 'October 20, 2026',
          sender: {
            name: 'Alex Turner',
            company: 'VectorStudio Solutions LLC',
            email: 'billing@vectorstudio.io',
            address: '100 Innovation Way, Suite 400, San Francisco, CA',
          },
          client: {
            name: clientName,
            company: clientName,
            email: 'accounts-payable@acmeglobal.com',
            address: '742 Evergreen Terrace, Floor 12, New York, NY',
          },
          items: [
            { description: 'Core PDF Engine Integration & Architecture', quantity: 35, unitPrice: hourlyRate },
            { description: 'High-Performance Auto-Pagination & Flex Layouts', quantity: 20, unitPrice: hourlyRate },
            { description: 'Client-Side Vector Export Optimization', quantity: 15, unitPrice: hourlyRate },
            { description: '60 FPS Canvas Preview Rendering Pipeline', quantity: 12, unitPrice: hourlyRate },
          ],
          taxRate: 0.0825,
          notes: 'Thank you for your business! Payment is due within 20 calendar days.',
        });

      case 'certificate':
        return createCertificateDocument({
          recipientName,
          courseTitle,
          organizationName: 'Global Institute of Software Architecture',
          date: 'October 15, 2026',
          certificateId: 'CERT-ARCH-88219',
          instructorName: 'Dr. Marcus Vance, Ph.D.',
          directorName: 'Elena Rostova, Managing Director',
        });

      case 'report':
        return createBusinessReportDocument({
          companyName,
          reportTitle: 'Executive Performance & Financial Review',
          quarter,
          year,
          preparedBy: 'Corporate Strategy & Analytics Division',
          summaryText:
            'During this fiscal quarter, our platform achieved record operational velocity. Transitioning to native vector rendering reduced PDF generation server cost by 94% while decreasing client-side preview latency to under 5ms.',
          metrics: [
            { label: 'Annual Recurring Revenue', value: '$48.6M', change: '+38.4% YoY', isPositive: true },
            { label: 'Net Dollar Retention', value: '138.2%', change: '+4.1% QoQ', isPositive: true },
            { label: 'Document Render Speed', value: '4.2 ms', change: '-82% Latency', isPositive: true },
            { label: 'Customer Churn Rate', value: '0.8%', change: '-0.3% QoQ', isPositive: true },
          ],
          highlights: [
            'Closed $14.2M in new enterprise software expansion contracts.',
            'Eliminated headless browser infrastructure dependencies across all microservices.',
            'Released zero-dependency client-side vector PDF generation in React & TypeScript.',
            'Achieved SOC-2 Type II enterprise compliance certification.',
          ],
        });

      case 'resume':
        return createResumeDocument({
          fullName: candidateName,
          title: jobTitle,
          email: 'david.miller@devmail.io',
          phone: '+1 (415) 890-2341',
          location: 'San Francisco, CA',
          summary:
            'Staff-level systems engineer and front-end architect with 10+ years specializing in document rendering engines, vector graphics pipelines, React runtime internals, and high-throughput TypeScript compilers.',
          skills: [
            'TypeScript',
            'React / JSX',
            'Vector PDF Specs',
            'Canvas 2D API',
            'Layout Algorithms',
            'Node.js & Edge Runtimes',
            'Rust / WebAssembly',
            'Font Metrics (AFM)',
          ],
          experience: [
            {
              role: 'Principal Systems Architect',
              company: 'DocScale Technologies',
              period: '2023 - Present',
              description:
                'Architected high-throughput vector PDF compiler capable of rendering 1,000+ complex documents per minute without browser engines. Designed declarative React layout primitives and dual-mode canvas previewers.',
            },
            {
              role: 'Senior Staff Frontend Engineer',
              company: 'CloudCanvas Systems',
              period: '2020 - 2023',
              description:
                'Led development of interactive canvas workspace powering enterprise document creation. Built custom text-wrapping engine with AFM metrics and binary-search token fitting.',
            },
          ],
          education: [
            {
              degree: 'B.S. in Computer Science & Applied Mathematics',
              school: 'University of California, Berkeley',
              year: '2016',
            },
          ],
        });
    }
  }, [
    selectedTemplate,
    clientName,
    invoiceNumber,
    hourlyRate,
    recipientName,
    courseTitle,
    companyName,
    quarter,
    year,
    candidateName,
    jobTitle,
  ]);

  // Vector PDF Compiler Hook
  const { dataUrl, loading, download, pdfBytes } = usePDF(activeDocument);

  const templateMetadata = {
    invoice: {
      title: 'Commercial Billing Invoice',
      tag: 'Itemized Table, Subtotals, Tax & Modern Slate Palette',
      icon: <Receipt size={14} />,
      orientation: 'Portrait (Letter)',
    },
    certificate: {
      title: 'Honor Award Certificate',
      tag: 'Landscape Geometry, Gold Double Border & Ornamental Seal',
      icon: <Award size={14} />,
      orientation: 'Landscape (Letter)',
    },
    report: {
      title: 'Executive Business Report',
      tag: 'Multi-Page Layout, KPI Metric Cards & Running Headers',
      icon: <BarChart3 size={14} />,
      orientation: 'Multi-Page Portrait',
    },
    resume: {
      title: 'Modern Tech Resume',
      tag: '2-Column Layout, Skill Chips & Career Timeline',
      icon: <User size={14} />,
      orientation: 'Portrait (Letter)',
    },
  };

  return (
    <div className="showcase-section">
      <div className="section-intro">
        <h2>Document Templates Gallery</h2>
        <p>
          Production-grade document generator templates included directly in{' '}
          <code>doc-engine/examples</code>. Each template is pure code, zero raster screenshots,
          producing 100% vector PDFs under 15 KB.
        </p>
      </div>

      {/* Template Switcher Tabs */}
      <div className="template-selector-nav">
        {(Object.keys(templateMetadata) as TemplateKey[]).map((key) => {
          const meta = templateMetadata[key];
          const isSelected = selectedTemplate === key;
          return (
            <button
              key={key}
              type="button"
              className={`template-tab-btn ${isSelected ? 'selected' : ''}`}
              onClick={() => setSelectedTemplate(key)}
            >
              <span className="tab-icon-wrapper">{meta.icon}</span>
              <span>{meta.title}</span>
              <span className="template-tab-meta">[{meta.orientation}]</span>
            </button>
          );
        })}
      </div>

      <div className="showcase-grid">
        {/* Left Column: Live Customization Panel */}
        <div className="control-panel">
          <div className="panel-header">
            <h3>Parameters</h3>
            <span className="status-badge-ready">Live AST</span>
          </div>

          <p className="panel-hint">
            Adjust document parameters to trigger instant canvas re-render:
          </p>

          {selectedTemplate === 'invoice' && (
            <div className="form-group">
              <label>Client Name / Company</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="input-field"
              />

              <label>Invoice Number</label>
              <input
                type="text"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="input-field"
              />

              <label>Hourly Billing Rate ($/hr)</label>
              <input
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value) || 0)}
                className="input-field"
              />
            </div>
          )}

          {selectedTemplate === 'certificate' && (
            <div className="form-group">
              <label>Recipient Full Name</label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="input-field"
              />

              <label>Course / Achievement Title</label>
              <input
                type="text"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                className="input-field"
              />
            </div>
          )}

          {selectedTemplate === 'report' && (
            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="input-field"
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label>Fiscal Quarter</label>
                  <input
                    type="text"
                    value={quarter}
                    onChange={(e) => setQuarter(e.target.value)}
                    className="input-field"
                  />
                </div>
                <div>
                  <label>Fiscal Year</label>
                  <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value) || 2026)}
                    className="input-field"
                  />
                </div>
              </div>
            </div>
          )}

          {selectedTemplate === 'resume' && (
            <div className="form-group">
              <label>Candidate Full Name</label>
              <input
                type="text"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                className="input-field"
              />

              <label>Target Role / Professional Title</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="input-field"
              />
            </div>
          )}

          <div className="panel-divider"></div>

          {/* Quick Actions */}
          <div className="actions-stack">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => download(`${selectedTemplate}-${Date.now()}.pdf`)}
              disabled={loading}
            >
              <Download size={14} />
              {loading ? 'Compiling PDF...' : `Download PDF (${templateMetadata[selectedTemplate].title})`}
            </button>

            <div className="file-meta-box">
              <div className="meta-row">
                <span>Output:</span>
                <strong>Vector PDF (ISO 32000-1)</strong>
              </div>
              <div className="meta-row">
                <span>Artifact Size:</span>
                <strong>{pdfBytes ? `${(pdfBytes.length / 1024).toFixed(1)} KB` : '~5 KB'}</strong>
              </div>
              <div className="meta-row">
                <span>Renderer:</span>
                <strong>pdf-lib Native Streams</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Preview Display */}
        <div className="preview-container">
          <div className="preview-toolbar">
            <div className="preview-mode-switch">
              <button
                type="button"
                className={`switch-btn ${previewMode === 'canvas' ? 'active' : ''}`}
                onClick={() => setPreviewMode('canvas')}
              >
                <Eye size={13} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                Canvas (60 FPS)
              </button>
              <button
                type="button"
                className={`switch-btn ${previewMode === 'pdf' ? 'active' : ''}`}
                onClick={() => setPreviewMode('pdf')}
              >
                <FileText size={13} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                Vector PDF
              </button>
            </div>

            <div className="preview-status">
              {loading && <span className="status-badge-ready">Compiling...</span>}
              {!loading && <span className="status-badge-ready">Ready</span>}
            </div>
          </div>

          <div className="preview-body">
            {previewMode === 'canvas' ? (
              <div className="canvas-viewer-wrapper">
                <DocumentViewer
                  document={activeDocument}
                  initialScale={0.85}
                  showToolbar={true}
                  className="showcase-document-viewer"
                />
              </div>
            ) : (
              <div className="pdf-iframe-wrapper">
                {dataUrl ? (
                  <iframe
                    title="Real Vector PDF Output"
                    src={dataUrl}
                    className="pdf-iframe"
                  />
                ) : (
                  <div className="loading-placeholder">Compiling vector PDF stream...</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
