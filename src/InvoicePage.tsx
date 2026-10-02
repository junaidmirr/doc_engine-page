import React from 'react';
import { Document, Page, View, Text, Shape, usePDF } from 'doc-engine/react';

export function InvoicePage() {
  // 1. Define your document tree using JSX
  const myDocument = React.useMemo(
    () => (
      <Document defaultPageSize="letter" orientation="portrait">
        <Page backgroundColor="#ffffff">
          {/* Header Container */}
          <View x={40} y={40} width={532} height={70} backgroundColor="#0f172a" borderRadius={6} padding={16}>
            <Text fontSize={22} fontWeight="bold" color="#ffffff">
              ACME CORP
            </Text>
            <Text fontSize={12} color="#38bdf8">
              INVOICE #INV-2026-001
            </Text>
          </View>

          {/* Content */}
          <Text x={40} y={140} width={400} fontSize={12} color="#334155" lineHeight={1.5}>
            Billed to: John Doe (john@example.com)
            Due Date: October 15, 2026
          </Text>

          {/* Line divider */}
          <Shape shapeType="line" x={40} y={180} x2={572} y2={180} strokeColor="#e2e8f0" strokeWidth={1} />

          <Text x={40} y={200} fontSize={14} fontWeight="bold" color="#0f172a">
            Total Due: $1,450.00
          </Text>
        </Page>
      </Document>
    ),
    []
  );

  // 2. The usePDF hook automatically compiles the vector PDF
  const { dataUrl, loading, download } = usePDF(myDocument);

  return (
    <div style={{ padding: '24px' }}>
      <h1>My Invoice</h1>

      {/* Button to download the real vector PDF */}
      <button 
        onClick={() => download('invoice.pdf')}
        disabled={loading}
        style={{
          padding: '10px 20px',
          background: '#2563eb',
          color: '#fff',
          borderRadius: '6px',
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontWeight: 600,
        }}
      >
        {loading ? 'Preparing PDF...' : 'Download Vector PDF'}
      </button>

      {/* Live Preview */}
      {dataUrl && (
        <iframe 
          title="PDF Preview"
          src={dataUrl} 
          style={{ width: '100%', height: '700px', marginTop: '20px', border: '1px solid #ccc', borderRadius: '8px' }} 
        />
      )}
    </div>
  );
}
