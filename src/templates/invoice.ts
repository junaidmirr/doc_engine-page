import { createDocument } from '@worklabs05/doc-engine';
import type { DocumentDefinition } from '@worklabs05/doc-engine';
import type { InvoiceTemplateData } from './types';

export function createInvoiceDocument(data: InvoiceTemplateData): DocumentDefinition {
  const doc = createDocument({
    defaultPageSize: 'letter',
    coordinateOrigin: 'top-left',
    metadata: {
      title: `Invoice #${data.invoiceNumber}`,
      author: data.sender.company || data.sender.name,
      subject: `Commercial Invoice for ${data.client.company || data.client.name}`,
    },
  });

  const subtotal = data.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const taxRate = data.taxRate ?? 0.0825;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  // Header Banner Container
  doc.addShape({
    shapeType: 'rectangle',
    x: 40,
    y: 40,
    width: 532,
    height: 80,
    fillColor: '#0f172a',
    borderRadius: 4,
  });

  // Sender Details in Header Box (Left)
  doc.addText({
    text: (data.sender.company || data.sender.name).toUpperCase(),
    x: 60,
    y: 55,
    width: 280,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  });

  doc.addText({
    text: data.sender.email,
    x: 60,
    y: 84,
    width: 280,
    fontSize: 10,
    color: '#94a3b8',
  });

  // Top-Right Invoice Number in Header Box (Clean right alignment within container)
  doc.addText({
    text: 'INVOICE',
    x: 372,
    y: 54,
    width: 180,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#38bdf8',
    align: 'right',
  });

  doc.addText({
    text: `#${data.invoiceNumber}`,
    x: 372,
    y: 82,
    width: 180,
    fontSize: 11,
    fontWeight: 'bold',
    color: '#cbd5e1',
    align: 'right',
  });

  // Sender / Issued By block
  doc.addText({
    text: 'ISSUED BY',
    x: 40,
    y: 135,
    width: 250,
    fontSize: 9,
    fontWeight: 'bold',
    color: '#64748b',
  });

  doc.addText({
    text: `${data.sender.name}\n${data.sender.company}\n${data.sender.address}`,
    x: 40,
    y: 150,
    width: 250,
    fontSize: 9.5,
    lineHeight: 1.4,
    color: '#1e293b',
  });

  // Client / Billed To block
  doc.addText({
    text: 'BILLED TO',
    x: 320,
    y: 135,
    width: 240,
    fontSize: 9,
    fontWeight: 'bold',
    color: '#64748b',
  });

  doc.addText({
    text: `${data.client.name}\n${data.client.company}\n${data.client.email}\n${data.client.address}`,
    x: 320,
    y: 150,
    width: 240,
    fontSize: 9.5,
    lineHeight: 1.4,
    color: '#1e293b',
  });

  // Issue & Due Dates
  doc.addText({
    text: `Issue Date: ${data.issueDate}   |   Due Date: ${data.dueDate}`,
    x: 40,
    y: 220,
    width: 532,
    fontSize: 9.5,
    color: '#475569',
  });

  // Items Table Header
  const tableY = 245;
  doc.addShape({
    shapeType: 'rectangle',
    x: 40,
    y: tableY,
    width: 532,
    height: 26,
    fillColor: '#f1f5f9',
    borderRadius: 2,
  });

  doc.addText({
    text: 'DESCRIPTION',
    x: 52,
    y: tableY + 7,
    width: 260,
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#475569',
  });

  doc.addText({
    text: 'QTY',
    x: 320,
    y: tableY + 7,
    width: 50,
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#475569',
    align: 'center',
  });

  doc.addText({
    text: 'PRICE',
    x: 390,
    y: tableY + 7,
    width: 70,
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#475569',
    align: 'right',
  });

  doc.addText({
    text: 'TOTAL',
    x: 480,
    y: tableY + 7,
    width: 80,
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#475569',
    align: 'right',
  });

  // Items Table Rows
  let rowY = tableY + 30;

  data.items.forEach((item, index) => {
    const itemTotal = item.quantity * item.unitPrice;
    const isMultiLine = item.description.length > 34;
    const rowHeight = isMultiLine ? 36 : 22;

    if (index % 2 === 1) {
      doc.addShape({
        shapeType: 'rectangle',
        x: 40,
        y: rowY - 3,
        width: 532,
        height: rowHeight,
        fillColor: '#f8fafc',
        borderRadius: 2,
      });
    }

    doc.addText({
      text: item.description,
      x: 52,
      y: rowY,
      width: 260,
      fontSize: 9.5,
      lineHeight: 1.3,
      color: '#1e293b',
    });

    doc.addText({
      text: String(item.quantity),
      x: 320,
      y: rowY,
      width: 50,
      fontSize: 9.5,
      color: '#1e293b',
      align: 'center',
    });

    doc.addText({
      text: `$${item.unitPrice.toFixed(2)}`,
      x: 390,
      y: rowY,
      width: 70,
      fontSize: 9.5,
      color: '#1e293b',
      align: 'right',
    });

    doc.addText({
      text: `$${itemTotal.toFixed(2)}`,
      x: 480,
      y: rowY,
      width: 80,
      fontSize: 9.5,
      fontWeight: 'bold',
      color: '#0f172a',
      align: 'right',
    });

    doc.addShape({
      shapeType: 'line',
      x: 40,
      y: rowY + rowHeight - 2,
      x2: 572,
      y2: rowY + rowHeight - 2,
      strokeColor: '#e2e8f0',
      strokeWidth: 0.5,
    });

    rowY += rowHeight + 4;
  });

  // Summary Totals
  const summaryY = Math.max(rowY + 16, 480);

  doc.addText({
    text: 'Subtotal:',
    x: 360,
    y: summaryY,
    width: 100,
    fontSize: 10,
    color: '#64748b',
  });

  doc.addText({
    text: `$${subtotal.toFixed(2)}`,
    x: 460,
    y: summaryY,
    width: 100,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1e293b',
    align: 'right',
  });

  doc.addText({
    text: `Tax (${(taxRate * 100).toFixed(1)}%):`,
    x: 360,
    y: summaryY + 20,
    width: 100,
    fontSize: 10,
    color: '#64748b',
  });

  doc.addText({
    text: `$${tax.toFixed(2)}`,
    x: 460,
    y: summaryY + 20,
    width: 100,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1e293b',
    align: 'right',
  });

  // Total Due Callout Box
  doc.addShape({
    shapeType: 'rectangle',
    x: 340,
    y: summaryY + 44,
    width: 232,
    height: 42,
    fillColor: '#0284c7',
    borderRadius: 4,
  });

  doc.addText({
    text: 'AMOUNT DUE',
    x: 355,
    y: summaryY + 58,
    width: 100,
    fontSize: 11,
    fontWeight: 'bold',
    color: '#ffffff',
  });

  doc.addText({
    text: `$${total.toFixed(2)}`,
    x: 440,
    y: summaryY + 54,
    width: 120,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    align: 'right',
  });

  // Payment Notes
  if (data.notes) {
    doc.addText({
      text: 'PAYMENT TERMS & NOTES',
      x: 40,
      y: summaryY + 16,
      width: 280,
      fontSize: 9,
      fontWeight: 'bold',
      color: '#64748b',
    });

    doc.addText({
      text: data.notes,
      x: 40,
      y: summaryY + 32,
      width: 280,
      fontSize: 9,
      lineHeight: 1.4,
      color: '#64748b',
    });
  }

  // Footer Note
  doc.addText({
    text: 'Thank you for your business!',
    x: 40,
    y: 730,
    width: 532,
    fontSize: 10,
    fontStyle: 'italic',
    color: '#94a3b8',
    align: 'center',
  });

  return doc.toDefinition();
}
