import { createDocument } from '@worklabs05/doc-engine';
import type { DocumentDefinition } from '@worklabs05/doc-engine';
import type { ResumeTemplateData } from './types';

export function createResumeDocument(data: ResumeTemplateData): DocumentDefinition {
  const doc = createDocument({
    defaultPageSize: 'letter',
    coordinateOrigin: 'top-left',
    metadata: {
      title: `${data.fullName} - Resume`,
      author: data.fullName,
      subject: data.title,
    },
  });

  // Left Sidebar Background
  doc.addShape({
    shapeType: 'rectangle',
    x: 0,
    y: 0,
    width: 200,
    height: 792,
    fillColor: '#0f172a',
  });

  // Candidate Name
  doc.addText({
    text: data.fullName,
    x: 24,
    y: 45,
    width: 152,
    fontSize: 19,
    fontWeight: 'bold',
    color: '#ffffff',
  });

  // Professional Title
  doc.addText({
    text: data.title.toUpperCase(),
    x: 24,
    y: 85,
    width: 152,
    fontSize: 8.5,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#38bdf8',
  });

  // Contact Info Section
  doc.addText({
    text: 'CONTACT',
    x: 24,
    y: 130,
    width: 152,
    fontSize: 9.5,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#94a3b8',
  });

  doc.addText({
    text: `${data.email}\n${data.phone}\n${data.location}`,
    x: 24,
    y: 148,
    width: 152,
    fontSize: 9,
    lineHeight: 1.5,
    color: '#cbd5e1',
  });

  // Technical Skills Section
  doc.addText({
    text: 'TECHNICAL SKILLS',
    x: 24,
    y: 228,
    width: 152,
    fontSize: 9.5,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#94a3b8',
  });

  let skillY = 248;
  data.skills.forEach((skill) => {
    doc.addShape({
      shapeType: 'rectangle',
      x: 24,
      y: skillY,
      width: 152,
      height: 22,
      fillColor: '#1e293b',
      borderRadius: 4,
    });

    doc.addText({
      text: skill,
      x: 32,
      y: skillY + 5,
      width: 136,
      fontSize: 8.5,
      fontWeight: 'bold',
      color: '#e2e8f0',
    });

    skillY += 27;
  });

  // Right Content Area: x = 230, width = 342, right edge = 572 (leaving 40pt margin)
  const rightX = 230;
  const rightWidth = 342;

  // Professional Summary
  doc.addText({
    text: 'PROFESSIONAL SUMMARY',
    x: rightX,
    y: 45,
    width: rightWidth,
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    color: '#0f172a',
  });

  doc.addShape({
    shapeType: 'line',
    x: rightX,
    y: 64,
    x2: rightX + rightWidth,
    y2: 64,
    strokeColor: '#e2e8f0',
    strokeWidth: 1,
  });

  doc.addText({
    text: data.summary,
    x: rightX,
    y: 74,
    width: rightWidth,
    fontSize: 9.5,
    lineHeight: 1.45,
    color: '#334155',
  });

  // Work Experience
  doc.addText({
    text: 'WORK EXPERIENCE',
    x: rightX,
    y: 165,
    width: rightWidth,
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    color: '#0f172a',
  });

  doc.addShape({
    shapeType: 'line',
    x: rightX,
    y: 184,
    x2: rightX + rightWidth,
    y2: 184,
    strokeColor: '#e2e8f0',
    strokeWidth: 1,
  });

  let expY = 195;
  data.experience.forEach((job) => {
    doc.addText({
      text: job.role,
      x: rightX,
      y: expY,
      width: 200,
      fontSize: 10.5,
      fontWeight: 'bold',
      color: '#0f172a',
    });

    // Right-aligned job period with explicit width to prevent cutoff
    doc.addText({
      text: job.period,
      x: rightX + 162,
      y: expY,
      width: 180,
      fontSize: 9,
      color: '#64748b',
      align: 'right',
    });

    doc.addText({
      text: job.company,
      x: rightX,
      y: expY + 16,
      width: rightWidth,
      fontSize: 9.5,
      fontWeight: 'bold',
      color: '#0284c7',
    });

    doc.addText({
      text: job.description,
      x: rightX,
      y: expY + 32,
      width: rightWidth,
      fontSize: 9,
      lineHeight: 1.4,
      color: '#475569',
    });

    expY += 86;
  });

  // Education Section
  doc.addText({
    text: 'EDUCATION',
    x: rightX,
    y: expY + 10,
    width: rightWidth,
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    color: '#0f172a',
  });

  doc.addShape({
    shapeType: 'line',
    x: rightX,
    y: expY + 29,
    x2: rightX + rightWidth,
    y2: expY + 29,
    strokeColor: '#e2e8f0',
    strokeWidth: 1,
  });

  let eduY = expY + 40;
  data.education.forEach((edu) => {
    doc.addText({
      text: edu.degree,
      x: rightX,
      y: eduY,
      width: rightWidth,
      fontSize: 9.5,
      fontWeight: 'bold',
      color: '#0f172a',
    });

    doc.addText({
      text: `${edu.school} (${edu.year})`,
      x: rightX,
      y: eduY + 14,
      width: rightWidth,
      fontSize: 9,
      color: '#64748b',
    });

    eduY += 36;
  });

  return doc.toDefinition();
}
