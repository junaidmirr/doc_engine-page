import { createDocument } from '@worklabs05/doc-engine';
import type { DocumentDefinition } from '@worklabs05/doc-engine';
import type { CertificateTemplateData } from './types';

export function createCertificateDocument(data: CertificateTemplateData): DocumentDefinition {
  const doc = createDocument({
    defaultPageSize: 'a4',
    orientation: 'landscape',
    coordinateOrigin: 'top-left',
    metadata: {
      title: `Certificate of Completion - ${data.recipientName}`,
      author: data.organizationName,
      subject: `Achievement in ${data.courseTitle}`,
    },
  });

  const pageWidth = 841.89;
  const pageHeight = 595.28;

  // Outer Decorative Border
  doc.addShape({
    shapeType: 'rectangle',
    x: 24,
    y: 24,
    width: pageWidth - 48,
    height: pageHeight - 48,
    fillColor: '#fdfbf7',
    strokeColor: '#0f172a',
    strokeWidth: 4,
  });

  // Inner Accent Border
  doc.addShape({
    shapeType: 'rectangle',
    x: 36,
    y: 36,
    width: pageWidth - 72,
    height: pageHeight - 72,
    fillColor: 'transparent',
    strokeColor: '#d97706',
    strokeWidth: 1.5,
  });

  // Organization Header
  doc.addText({
    text: data.organizationName.toUpperCase(),
    x: 60,
    y: 68,
    width: pageWidth - 120,
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: '#64748b',
    align: 'center',
  });

  // Certificate Heading
  doc.addText({
    text: 'CERTIFICATE OF COMPLETION',
    x: 60,
    y: 105,
    width: pageWidth - 120,
    fontSize: 30,
    fontFamily: 'Times-Roman',
    fontWeight: 'bold',
    letterSpacing: 1.5,
    color: '#0f172a',
    align: 'center',
  });

  // Subtitle
  doc.addText({
    text: 'THIS CERTIFICATE IS PROUDLY PRESENTED TO',
    x: 60,
    y: 165,
    width: pageWidth - 120,
    fontSize: 10,
    letterSpacing: 1.5,
    color: '#94a3b8',
    align: 'center',
  });

  // Recipient Name
  doc.addText({
    text: data.recipientName,
    x: 60,
    y: 198,
    width: pageWidth - 120,
    fontSize: 34,
    fontFamily: 'Times-Roman',
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#0369a1',
    align: 'center',
  });

  // Gold Divider Line
  doc.addShape({
    shapeType: 'line',
    x: 240,
    y: 250,
    x2: pageWidth - 240,
    y2: 250,
    strokeColor: '#d97706',
    strokeWidth: 2,
  });

  // Completion statement
  doc.addText({
    text: 'For successfully demonstrating mastery and completion of the advanced curriculum in',
    x: 100,
    y: 272,
    width: pageWidth - 200,
    fontSize: 11.5,
    color: '#475569',
    align: 'center',
  });

  // Course Title
  doc.addText({
    text: data.courseTitle,
    x: 100,
    y: 300,
    width: pageWidth - 200,
    fontSize: 19,
    fontWeight: 'bold',
    color: '#0f172a',
    align: 'center',
  });

  // Gold Seal Primitive
  doc.addShape({
    shapeType: 'circle',
    x: pageWidth / 2 - 30,
    y: 350,
    width: 60,
    height: 60,
    fillColor: '#fef3c7',
    strokeColor: '#d97706',
    strokeWidth: 2,
  });

  doc.addText({
    text: 'VERIFIED\nEXCELLENCE',
    x: pageWidth / 2 - 40,
    y: 368,
    width: 80,
    fontSize: 8,
    fontWeight: 'bold',
    color: '#b45309',
    align: 'center',
  });

  // Signature Block
  const sigY = 470;

  // Left Signature (Instructor)
  doc.addShape({
    shapeType: 'line',
    x: 120,
    y: sigY,
    x2: 300,
    y2: sigY,
    strokeColor: '#64748b',
    strokeWidth: 1,
  });

  doc.addText({
    text: data.instructorName,
    x: 120,
    y: sigY + 8,
    width: 180,
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1e293b',
    align: 'center',
  });

  doc.addText({
    text: 'Course Lead & Instructor',
    x: 120,
    y: sigY + 24,
    width: 180,
    fontSize: 9,
    color: '#64748b',
    align: 'center',
  });

  // Right Signature (Managing Director)
  doc.addShape({
    shapeType: 'line',
    x: pageWidth - 300,
    y: sigY,
    x2: pageWidth - 120,
    y2: sigY,
    strokeColor: '#64748b',
    strokeWidth: 1,
  });

  doc.addText({
    text: data.directorName,
    x: pageWidth - 300,
    y: sigY + 8,
    width: 180,
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1e293b',
    align: 'center',
  });

  doc.addText({
    text: 'Managing Director',
    x: pageWidth - 300,
    y: sigY + 24,
    width: 180,
    fontSize: 9,
    color: '#64748b',
    align: 'center',
  });

  // Certificate Metadata Footer
  doc.addText({
    text: `Issued on: ${data.date}   |   Certificate ID: ${data.certificateId}`,
    x: 60,
    y: 535,
    width: pageWidth - 120,
    fontSize: 8.5,
    color: '#94a3b8',
    align: 'center',
  });

  return doc.toDefinition();
}
