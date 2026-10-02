import { createDocument } from '@worklabs05/doc-engine';
import type { DocumentDefinition } from '@worklabs05/doc-engine';
import type { BusinessReportTemplateData } from './types';

export function createBusinessReportDocument(data: BusinessReportTemplateData): DocumentDefinition {
  const doc = createDocument({
    defaultPageSize: 'letter',
    coordinateOrigin: 'top-left',
    metadata: {
      title: `${data.companyName} - ${data.reportTitle}`,
      author: data.preparedBy,
      subject: `Quarterly Business Performance ${data.quarter} ${data.year}`,
    },
  });

  // Page 1: Header Banner (height 82 accommodates multi-line titles without clipping)
  doc.addShape({
    shapeType: 'rectangle',
    x: 40,
    y: 40,
    width: 532,
    height: 82,
    fillColor: '#0f172a',
    borderRadius: 4,
  });

  doc.addText({
    text: `${data.companyName.toUpperCase()}  •  ${data.quarter} ${data.year}`,
    x: 60,
    y: 52,
    width: 492,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#38bdf8',
  });

  doc.addText({
    text: data.reportTitle,
    x: 60,
    y: 68,
    width: 492,
    fontSize: 17,
    fontWeight: 'bold',
    lineHeight: 1.25,
    color: '#ffffff',
  });

  // Executive Overview Section
  doc.addText({
    text: 'EXECUTIVE OVERVIEW',
    x: 40,
    y: 136,
    width: 532,
    fontSize: 11,
    fontWeight: 'bold',
    color: '#334155',
  });

  doc.addText({
    text: data.summaryText,
    x: 40,
    y: 154,
    width: 532,
    fontSize: 10.5,
    lineHeight: 1.5,
    color: '#475569',
  });

  // Dynamic KPI Metric Cards (Scales width based on number of items so 4 cards fit cleanly)
  const cardY = 245;
  const metricsCount = Math.max(1, data.metrics.length);
  const totalWidth = 532;
  const cardGap = metricsCount > 3 ? 12 : 16;
  const cardWidth = (totalWidth - (metricsCount - 1) * cardGap) / metricsCount;

  data.metrics.forEach((metric, idx) => {
    const cardX = 40 + idx * (cardWidth + cardGap);

    doc.addShape({
      shapeType: 'rectangle',
      x: cardX,
      y: cardY,
      width: cardWidth,
      height: 86,
      fillColor: '#f8fafc',
      strokeColor: '#e2e8f0',
      strokeWidth: 1,
      borderRadius: 4,
    });

    doc.addText({
      text: metric.label.toUpperCase(),
      x: cardX + 10,
      y: cardY + 12,
      width: cardWidth - 20,
      fontSize: metricsCount > 3 ? 8 : 9,
      fontWeight: 'bold',
      color: '#64748b',
    });

    doc.addText({
      text: metric.value,
      x: cardX + 10,
      y: cardY + 30,
      width: cardWidth - 20,
      fontSize: metricsCount > 3 ? 18 : 22,
      fontWeight: 'bold',
      color: '#0f172a',
    });

    doc.addText({
      text: metric.change,
      x: cardX + 10,
      y: cardY + 60,
      width: cardWidth - 20,
      fontSize: 9.5,
      fontWeight: 'bold',
      color: metric.isPositive ? '#16a34a' : '#dc2626',
    });
  });

  // Strategic Highlights Section
  doc.addText({
    text: 'STRATEGIC HIGHLIGHTS',
    x: 40,
    y: 355,
    width: 532,
    fontSize: 11,
    fontWeight: 'bold',
    color: '#334155',
  });

  let bulletY = 380;
  data.highlights.forEach((item) => {
    doc.addShape({
      shapeType: 'circle',
      x: 46,
      y: bulletY + 4,
      width: 5,
      height: 5,
      fillColor: '#0284c7',
    });

    doc.addText({
      text: item,
      x: 60,
      y: bulletY,
      width: 512,
      fontSize: 10,
      lineHeight: 1.4,
      color: '#334155',
    });

    bulletY += 30;
  });

  // Page 1 Footer
  doc.addText({
    text: `Prepared by ${data.preparedBy}   |   Confidential - For Internal Use Only`,
    x: 40,
    y: 725,
    width: 532,
    fontSize: 9,
    color: '#94a3b8',
    align: 'center',
  });

  // Page 2: Financial Performance Breakdown
  doc.addPage();

  doc.addText({
    text: 'FINANCIAL PERFORMANCE BREAKDOWN',
    x: 40,
    y: 45,
    width: 532,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f172a',
  });

  doc.addShape({
    shapeType: 'line',
    x: 40,
    y: 70,
    x2: 572,
    y2: 70,
    strokeColor: '#cbd5e1',
    strokeWidth: 1,
  });

  doc.addText({
    text: 'Quarterly Revenue Growth (USD Millions)',
    x: 40,
    y: 95,
    width: 532,
    fontSize: 11,
    fontWeight: 'bold',
    color: '#475569',
  });

  const chartY = 130;
  const bars = [
    { label: 'Q1', value: 3.2, max: 6 },
    { label: 'Q2', value: 4.1, max: 6 },
    { label: 'Q3', value: 4.8, max: 6 },
    { label: 'Q4', value: 5.6, max: 6 },
  ];

  bars.forEach((b, idx) => {
    const by = chartY + idx * 45;
    const barWidth = (b.value / b.max) * 360;

    doc.addText({
      text: b.label,
      x: 40,
      y: by + 6,
      width: 30,
      fontSize: 11,
      fontWeight: 'bold',
      color: '#334155',
    });

    doc.addShape({
      shapeType: 'rectangle',
      x: 75,
      y: by,
      width: 360,
      height: 24,
      fillColor: '#f1f5f9',
      borderRadius: 4,
    });

    doc.addShape({
      shapeType: 'rectangle',
      x: 75,
      y: by,
      width: barWidth,
      height: 24,
      fillColor: idx === bars.length - 1 ? '#0284c7' : '#38bdf8',
      borderRadius: 4,
    });

    doc.addText({
      text: `$${b.value}M`,
      x: 75 + barWidth + 12,
      y: by + 6,
      width: 60,
      fontSize: 10,
      fontWeight: 'bold',
      color: '#0f172a',
    });
  });

  // Page 2 Footer
  doc.addText({
    text: `Page 2 of 2   •   ${data.companyName} Strategic Report`,
    x: 40,
    y: 725,
    width: 532,
    fontSize: 9,
    color: '#94a3b8',
    align: 'center',
  });

  return doc.toDefinition();
}
