/**
 * Web MCP (Model Context Protocol) Implementation for doc-engine
 * Provides in-browser tools, resources, and JSON-RPC 2.0 communication
 * for AI agents (Cursor, Claude Desktop, Antigravity, Windsurf, headless crawlers).
 */

export interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, any>;
    required?: string[];
  };
}

export interface McpJsonRpcRequest {
  jsonrpc: '2.0';
  id?: string | number;
  method: string;
  params?: Record<string, any>;
}

export interface McpJsonRpcResponse {
  jsonrpc: '2.0';
  id?: string | number | null;
  result?: any;
  error?: {
    code: number;
    message: string;
    data?: any;
  };
}

export const MCP_TOOLS: McpToolDefinition[] = [
  {
    name: 'doc_engine_list_sections',
    description: 'List all available doc-engine v0.2.0 documentation sections, guides, and categories.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'doc_engine_get_section',
    description: 'Retrieve full markdown documentation content and code snippets for a specific section ID.',
    inputSchema: {
      type: 'object',
      properties: {
        sectionId: {
          type: 'string',
          description: 'Section ID (e.g., "flow-stack", "tables-grid", "react-viewer", "installation", "core-api-ref", "headers-footers")',
        },
      },
      required: ['sectionId'],
    },
  },
  {
    name: 'doc_engine_search_docs',
    description: 'Search across all doc-engine documentation topics, API functions, and layout primitives.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search query keyword or phrase',
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'doc_engine_get_api_ref',
    description: 'Get the complete TypeScript API reference for doc-engine classes, functions, and React components.',
    inputSchema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          description: 'Optional category filter: "core", "react", "flow-stack", "renderers"',
        },
      },
    },
  },
  {
    name: 'doc_engine_get_code_example',
    description: 'Get runnable TypeScript or React JSX code examples for specific layout patterns.',
    inputSchema: {
      type: 'object',
      properties: {
        topic: {
          type: 'string',
          description: 'Topic name: "flow-stack", "auto-table", "react-invoice", "canvas-viewer", "custom-font", "pagination"',
        },
      },
      required: ['topic'],
    },
  },
  {
    name: 'doc_engine_get_template',
    description: 'Get complete document definition AST or code for standard production templates.',
    inputSchema: {
      type: 'object',
      properties: {
        templateName: {
          type: 'string',
          description: 'Template key: "invoice", "certificate", "report", "resume"',
        },
      },
      required: ['templateName'],
    },
  },
];

export const DOCS_SECTIONS_DATA: Record<string, { title: string; category: string; content: string; code?: string }> = {
  'introduction': {
    title: 'Introduction & Core Philosophy',
    category: 'Overview',
    content: 'doc-engine is a high-performance headless document layout and vector rendering engine for React and TypeScript that compiles directly to real, searchable PDFs. Zero Python backend, zero Puppeteer headless browsers, zero screenshots.',
    code: `import { createDocument, PdfRenderer } from '@worklabs05/doc-engine';\nconst doc = createDocument({ defaultPageSize: 'letter' });\nconst pdfBytes = await PdfRenderer.renderToBytes(doc);`,
  },
  'flow-stack': {
    title: 'Flow Stack API (doc.addStack)',
    category: 'Layout & Flow Engine',
    content: 'The Flow Stack API automatically calculates running Y offsets and wrapping heights for arbitrary children, eliminating manual coordinate calculations. Ideal for invoices, dynamic summaries, and variable-length text.',
    code: `doc.addStack({ x: 40, y: 40, width: 532, gap: 16 }, (stack) => {\n  stack.addText({ text: 'INVOICE #001', fontSize: 24, fontWeight: 'bold' });\n  stack.addText({ text: 'Billed To:\\nAcme Corp\\n123 Tech Way', fontSize: 11 });\n  stack.addTable({ columns: [{ header: 'Item', width: '3fr' }, { header: 'Price', width: 80 }], rows: [...] });\n});`,
  },
  'tables-grid': {
    title: 'Auto-Wrapping Tables & ColumnConfig',
    category: 'Layout & Flow Engine',
    content: 'First-class auto-wrapping vector table primitive with fractional widths ("3fr"), exact point widths, percentage columns, cell alignment inheritance, zebra striping, and automatic headers.',
    code: `doc.addTable({\n  columns: [\n    { header: 'Description', width: '3fr', align: 'left' },\n    { header: 'Hours', width: 60, align: 'center' },\n    { header: 'Rate', width: 80, align: 'right' },\n    { header: 'Total', width: 100, align: 'right' },\n  ],\n  rows: itemsData,\n  zebra: true,\n});`,
  },
  'react-viewer': {
    title: 'DocumentViewer & Canvas Text Selection',
    category: 'React Package',
    content: '<DocumentViewer> renders 60 FPS HTML5 Canvas while layering a transparent vector text overlay above it. Users can highlight, select, and copy text directly off the canvas preview.',
    code: `<DocumentViewer document={myDocument} initialScale={1.0} showToolbar={true} enableTextSelection={true} />`,
  },
  'headers-footers': {
    title: 'Dynamic Headers & Footers',
    category: 'Layout & Flow Engine',
    content: 'Declare dynamic recurring running headers and footers per page with access to current page index and total page count.',
    code: `doc.setHeader((pageNumber, totalPages) => ({\n  text: \`Confidential - Page \${pageNumber} of \${totalPages}\`,\n  align: 'right',\n  fontSize: 9,\n}));`,
  },
  'layout-constraints': {
    title: 'Layout & Break Constraints',
    category: 'Layout & Flow Engine',
    content: 'Control page breaking behavior with keepTogether, breakBefore, and minHeight rules to prevent orphan table headers and signature blocks.',
    code: `stack.addView({ keepTogether: true, minHeight: 120 }, (view) => {\n  view.addText({ text: 'Authorized Signature' });\n});`,
  },
  'custom-fonts': {
    title: 'Custom Font Registration & AFM Metrics',
    category: 'Core Engine',
    content: 'Register custom TTF/OTF font buffers on-the-fly or load Google Fonts with 1 line of code.',
    code: `const fontData = await fetch('/fonts/Inter-Regular.ttf').then(r => r.arrayBuffer());\ndoc.registerFont('Inter', new Uint8Array(fontData));`,
  },
  'safe-serialization': {
    title: 'P0 Safe Serialization (deepClone)',
    category: 'Core Engine',
    content: 'deepClone preserves Uint8Array binary buffers, custom font data, and Date objects intact without JSON truncation.',
    code: `import { deepClone } from '@worklabs05/doc-engine';\nconst clonedDoc = deepClone(originalDoc);`,
  },
  'core-api-ref': {
    title: 'Core Engine API Reference',
    category: 'Reference',
    content: 'Full TypeScript method signatures for DocumentBuilder, StackBuilder, TableBuilder, and renderers.',
    code: `createDocument(options?: DocumentOptions): DocumentBuilder\ndoc.addStack(options: StackOptions, fn: (stack: StackBuilder) => void): this\ndoc.addTable(options: TableOptions): this\ndoc.registerFont(name: string, data: Uint8Array): this\nPdfRenderer.renderToBytes(doc: DocumentDefinition): Promise<Uint8Array>\nCanvasRenderer.renderPage(canvas: HTMLCanvasElement, page: PageDefinition, options?: RenderOptions): void`,
  },
};

export const API_REFERENCE_DATA = [
  {
    name: 'createDocument(options)',
    signature: '(options?: DocumentOptions) => DocumentBuilder',
    description: 'Initializes a new vector document definition builder.',
    category: 'core',
  },
  {
    name: 'doc.addStack(options, callback)',
    signature: '(options: StackOptions, fn: (stack: StackBuilder) => void) => this',
    description: 'Flow stack layout API for automatic vertical and horizontal stacking without manual Y coordinates.',
    category: 'flow-stack',
  },
  {
    name: 'doc.addTable(options)',
    signature: '(options: TableOptions) => this',
    description: 'Auto-wrapping table primitive with ColumnConfig, fractional ("3fr") sizing, and zebra striping.',
    category: 'flow-stack',
  },
  {
    name: 'doc.registerFont(name, data)',
    signature: '(name: string, data: Uint8Array) => this',
    description: 'Registers custom TrueType or OpenType font buffer for vector PDF text rendering.',
    category: 'core',
  },
  {
    name: 'deepClone(obj)',
    signature: '<T>(obj: T) => T',
    description: 'P0 safe deep clone preserving Uint8Array buffers and Date objects.',
    category: 'core',
  },
  {
    name: 'PdfRenderer.renderToBytes(doc)',
    signature: '(doc: DocumentDefinition) => Promise<Uint8Array>',
    description: 'Compiles AST into an ISO 32000-1 binary vector PDF byte stream.',
    category: 'renderers',
  },
  {
    name: 'CanvasRenderer.renderPage(canvas, page, options)',
    signature: '(canvas: HTMLCanvasElement, page: PageDefinition, options?: RenderOptions) => void',
    description: 'Draws vector page layout to HTML5 Canvas at 60 FPS.',
    category: 'renderers',
  },
  {
    name: '<DocumentViewer>',
    signature: 'React.FC<DocumentViewerProps>',
    description: 'Interactive React canvas preview with toolbar and transparent text selection overlay.',
    category: 'react',
  },
  {
    name: 'usePDF(document)',
    signature: '(doc: DocumentDefinition | ReactNode) => { dataUrl, pdfBytes, loading, error, download }',
    description: 'React hook for reactive PDF compilation and download management.',
    category: 'react',
  },
];

export class DocEngineWebMcpServer {
  private requestCount = 0;

  public async handleRequest(req: McpJsonRpcRequest): Promise<McpJsonRpcResponse> {
    this.requestCount++;
    const { id = null, method, params = {} } = req;

    try {
      switch (method) {
        case 'tools/list':
          return {
            jsonrpc: '2.0',
            id,
            result: { tools: MCP_TOOLS },
          };

        case 'tools/call': {
          const { name, arguments: args = {} } = params;
          const result = await this.executeTool(name, args);
          return {
            jsonrpc: '2.0',
            id,
            result: { content: [{ type: 'text', text: typeof result === 'string' ? result : JSON.stringify(result, null, 2) }] },
          };
        }

        case 'resources/list':
          return {
            jsonrpc: '2.0',
            id,
            result: {
              resources: [
                { uri: 'doc-engine://docs/llms.txt', name: 'LLM Summary Documentation', mimeType: 'text/markdown' },
                { uri: 'doc-engine://docs/llms-full.txt', name: 'Full Technical Documentation', mimeType: 'text/markdown' },
                { uri: 'doc-engine://api/reference.json', name: 'API Reference Data', mimeType: 'application/json' },
              ],
            },
          };

        case 'resources/read': {
          const { uri } = params;
          if (uri === 'doc-engine://api/reference.json') {
            return {
              jsonrpc: '2.0',
              id,
              result: { contents: [{ uri, mimeType: 'application/json', text: JSON.stringify(API_REFERENCE_DATA, null, 2) }] },
            };
          }
          return {
            jsonrpc: '2.0',
            id,
            result: { contents: [{ uri, mimeType: 'text/markdown', text: `Resource ${uri} available via /llms-full.txt` }] },
          };
        }

        case 'prompts/list':
          return {
            jsonrpc: '2.0',
            id,
            result: {
              prompts: [
                {
                  name: 'generate_invoice_ast',
                  description: 'Generate production-grade invoice document using doc.addStack() and doc.addTable()',
                },
                {
                  name: 'create_react_pdf_component',
                  description: 'Generate declarative React JSX vector document components',
                },
              ],
            },
          };

        default:
          return {
            jsonrpc: '2.0',
            id,
            error: {
              code: -32601,
              message: `Method not found: ${method}`,
            },
          };
      }
    } catch (err: any) {
      return {
        jsonrpc: '2.0',
        id,
        error: {
          code: -32603,
          message: err?.message || 'Internal MCP server error',
        },
      };
    }
  }

  public async executeTool(name: string, args: Record<string, any>): Promise<any> {
    switch (name) {
      case 'doc_engine_list_sections':
        return Object.entries(DOCS_SECTIONS_DATA).map(([id, item]) => ({
          id,
          title: item.title,
          category: item.category,
        }));

      case 'doc_engine_get_section': {
        const { sectionId } = args;
        const section = DOCS_SECTIONS_DATA[sectionId];
        if (!section) {
          throw new Error(`Section ID not found: "${sectionId}". Available sections: ${Object.keys(DOCS_SECTIONS_DATA).join(', ')}`);
        }
        return {
          id: sectionId,
          ...section,
        };
      }

      case 'doc_engine_search_docs': {
        const { query = '' } = args;
        const q = String(query).toLowerCase();
        const matches: any[] = [];

        for (const [id, section] of Object.entries(DOCS_SECTIONS_DATA)) {
          if (
            id.toLowerCase().includes(q) ||
            section.title.toLowerCase().includes(q) ||
            section.content.toLowerCase().includes(q) ||
            (section.code && section.code.toLowerCase().includes(q))
          ) {
            matches.push({
              id,
              title: section.title,
              category: section.category,
              snippet: section.content.slice(0, 160) + '...',
            });
          }
        }
        return {
          query,
          matchCount: matches.length,
          matches,
        };
      }

      case 'doc_engine_get_api_ref': {
        const { category } = args;
        if (category) {
          return API_REFERENCE_DATA.filter((item) => item.category === category);
        }
        return API_REFERENCE_DATA;
      }

      case 'doc_engine_get_code_example': {
        const { topic = 'flow-stack' } = args;
        const section = DOCS_SECTIONS_DATA[topic] || DOCS_SECTIONS_DATA['flow-stack'];
        return {
          topic,
          code: section.code || '// No specific code snippet available',
          description: section.content,
        };
      }

      case 'doc_engine_get_template': {
        const { templateName = 'invoice' } = args;
        return {
          template: templateName,
          supportedTemplates: ['invoice', 'certificate', 'report', 'resume'],
          status: 'Included in @worklabs05/doc-engine examples & chainjs showcase',
          schema: {
            orientation: templateName === 'certificate' ? 'landscape' : 'portrait',
            pageSize: 'letter',
          },
        };
      }

      default:
        throw new Error(`Unknown tool name: ${name}`);
    }
  }

  public getStats() {
    return {
      version: '0.2.0',
      totalTools: MCP_TOOLS.length,
      totalSections: Object.keys(DOCS_SECTIONS_DATA).length,
      requestCount: this.requestCount,
      protocol: 'Model Context Protocol 2024-11-05',
    };
  }
}

// Global Singleton Instance
export const mcpServer = new DocEngineWebMcpServer();

// Initialize Browser Bridge on Window
if (typeof window !== 'undefined') {
  (window as any).__DOC_ENGINE_MCP__ = {
    server: mcpServer,
    execute: (req: McpJsonRpcRequest) => mcpServer.handleRequest(req),
    callTool: (name: string, args: Record<string, any> = {}) => mcpServer.executeTool(name, args),
    listTools: () => MCP_TOOLS,
    getSections: () => Object.entries(DOCS_SECTIONS_DATA).map(([id, item]) => ({ id, ...item })),
    search: (q: string) => mcpServer.executeTool('doc_engine_search_docs', { query: q }),
    getStats: () => mcpServer.getStats(),
  };

  // Cross-frame and extension JSON-RPC listener
  window.addEventListener('message', async (event) => {
    if (event.data && typeof event.data === 'object' && event.data.jsonrpc === '2.0' && event.data.method) {
      const response = await mcpServer.handleRequest(event.data);
      if (event.source && typeof (event.source as any).postMessage === 'function') {
        (event.source as any).postMessage(response, '*');
      }
    }
  });
}
