import React, { type ReactNode } from 'react';
import type {
  DocumentDefinition,
  PageDefinition,
  DocumentElement,
  TextElement,
  ShapeElement,
  ImageElement,
  ViewElement,
  TableElement,
  GridElement,
} from '@worklabs05/doc-engine';
import {
  Document,
  Page,
  View,
  Text,
  Shape,
  Line,
  Image,
  Table,
  Grid,
} from '@worklabs05/doc-engine/react';

function isType(type: unknown, target: unknown, name: string): boolean {
  if (type === target) return true;
  const t = type as { displayName?: string; name?: string } | null;
  return t?.displayName === name || t?.name === name;
}

function flattenTextChildren(children: ReactNode): string {
  if (children === null || children === undefined || typeof children === 'boolean') {
    return '';
  }
  if (typeof children === 'string' || typeof children === 'number') {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map(flattenTextChildren).join('');
  }
  if (React.isValidElement(children)) {
    return flattenTextChildren((children.props as { children?: ReactNode }).children);
  }
  return '';
}

function parseChildElement(child: ReactNode, defaultId: string): DocumentElement | null {
  if (!React.isValidElement(child)) return null;

  if (isType(child.type, Text, 'Text')) {
    const p = child.props as Record<string, unknown>;
    const textContent = flattenTextChildren(p.children as ReactNode);
    return {
      id: (p.id as string) || defaultId,
      type: 'text',
      x: (p.x as number) ?? 0,
      y: (p.y as number) ?? 0,
      width: (p.width as number) ?? 200,
      height: (p.height as number) ?? 20,
      text: textContent,
      fontSize: (p.fontSize as number) ?? 12,
      fontFamily: (p.fontFamily as string) ?? 'Helvetica',
      fontWeight: (p.fontWeight as 'normal' | 'bold') ?? 'normal',
      fontStyle: (p.fontStyle as 'normal' | 'italic') ?? 'normal',
      color: (p.color as string) ?? '#000000',
      align: (p.align as 'left' | 'center' | 'right' | 'justify') ?? 'left',
      lineHeight: (p.lineHeight as number) ?? 1.35,
      letterSpacing: (p.letterSpacing as number) ?? 0,
      underline: (p.underline as boolean) ?? false,
      strike: (p.strike as boolean) ?? false,
      wrap: (p.wrap as boolean) ?? true,
      maxLines: p.maxLines as number | undefined,
      opacity: (p.opacity as number) ?? 1,
      rotation: (p.rotation as number) ?? 0,
    } as TextElement;
  }

  if (isType(child.type, Shape, 'Shape')) {
    const p = child.props as Record<string, unknown>;
    return {
      id: (p.id as string) || defaultId,
      type: 'shape',
      shapeType: p.shapeType,
      x: (p.x as number) ?? 0,
      y: (p.y as number) ?? 0,
      width: (p.width as number) ?? 100,
      height: (p.height as number) ?? 100,
      fillColor: p.fillColor as string | undefined,
      strokeColor: p.strokeColor as string | undefined,
      strokeWidth: (p.strokeWidth as number) ?? 1,
      borderRadius: p.borderRadius as number | undefined,
      x2: p.x2 as number | undefined,
      y2: p.y2 as number | undefined,
      points: p.points as Array<{ x: number; y: number }> | undefined,
      pathData: p.pathData as string | undefined,
      opacity: (p.opacity as number) ?? 1,
      rotation: (p.rotation as number) ?? 0,
    } as ShapeElement;
  }

  if (isType(child.type, Line, 'Line')) {
    const p = child.props as Record<string, unknown>;
    return {
      id: defaultId,
      type: 'shape',
      shapeType: 'line',
      x: (p.x as number) ?? 0,
      y: (p.y as number) ?? 0,
      x2: p.x2 as number | undefined,
      y2: p.y2 as number | undefined,
      strokeColor: (p.strokeColor as string) ?? '#000000',
      strokeWidth: (p.strokeWidth as number) ?? 1,
      opacity: (p.opacity as number) ?? 1,
    } as ShapeElement;
  }

  if (isType(child.type, Image, 'Image')) {
    const p = child.props as Record<string, unknown>;
    return {
      id: (p.id as string) || defaultId,
      type: 'image',
      src: p.src as string | Uint8Array,
      x: (p.x as number) ?? 0,
      y: (p.y as number) ?? 0,
      width: (p.width as number) ?? 100,
      height: (p.height as number) ?? 100,
      fit: (p.fit as 'contain' | 'cover' | 'fill') ?? 'contain',
      maskShape: (p.maskShape as 'none' | 'circle' | 'rounded') ?? 'none',
      borderRadius: p.borderRadius as number | undefined,
      opacity: (p.opacity as number) ?? 1,
      rotation: (p.rotation as number) ?? 0,
    } as ImageElement;
  }

  if (isType(child.type, View, 'View')) {
    const p = child.props as Record<string, unknown>;
    const children: DocumentElement[] = [];
    React.Children.forEach(p.children as ReactNode, (vc, idx) => {
      const parsed = parseChildElement(vc, `${defaultId}_c${idx}`);
      if (parsed) children.push(parsed);
    });

    return {
      id: (p.id as string) || defaultId,
      type: 'view',
      x: (p.x as number) ?? 0,
      y: (p.y as number) ?? 0,
      width: (p.width as number) ?? 100,
      height: (p.height as number) ?? 100,
      backgroundColor: p.backgroundColor as string | undefined,
      borderColor: p.borderColor as string | undefined,
      borderWidth: p.borderWidth as number | undefined,
      borderRadius: p.borderRadius as number | undefined,
      padding: p.padding as number | number[] | undefined,
      layout: (p.layout as 'absolute' | 'flex') ?? 'absolute',
      flexDirection: (p.flexDirection as 'row' | 'column') ?? 'column',
      gap: (p.gap as number) ?? 0,
      justifyContent: p.justifyContent as 'start' | 'center' | 'end' | 'between' | undefined,
      alignItems: p.alignItems as 'start' | 'center' | 'end' | 'stretch' | undefined,
      children,
      opacity: (p.opacity as number) ?? 1,
      rotation: (p.rotation as number) ?? 0,
    } as ViewElement;
  }

  if (isType(child.type, Table, 'Table')) {
    const p = child.props as Record<string, unknown>;
    return {
      id: (p.id as string) || defaultId,
      type: 'table',
      x: (p.x as number) ?? 0,
      y: (p.y as number) ?? 0,
      width: (p.width as number) ?? 532,
      height: (p.height as number) ?? 100,
      columns: p.columns as Array<number | string> | undefined,
      header: p.header as TableElement['header'],
      rows: (p.rows as TableElement['rows']) || [],
      repeatHeaderOnNewPage: p.repeatHeaderOnNewPage as boolean | undefined,
      borderWidth: p.borderWidth as number | undefined,
      borderColor: p.borderColor as string | undefined,
      cellPadding: p.cellPadding as number | undefined,
      zebra: p.zebra as boolean | undefined,
      zebraColor: p.zebraColor as string | undefined,
      opacity: (p.opacity as number) ?? 1,
      rotation: (p.rotation as number) ?? 0,
    } as TableElement;
  }

  if (isType(child.type, Grid, 'Grid')) {
    const p = child.props as Record<string, unknown>;
    const children: DocumentElement[] = [];
    React.Children.forEach(p.children as ReactNode, (gc, idx) => {
      const parsed = parseChildElement(gc, `${defaultId}_g${idx}`);
      if (parsed) children.push(parsed);
    });

    return {
      id: (p.id as string) || defaultId,
      type: 'grid',
      x: (p.x as number) ?? 0,
      y: (p.y as number) ?? 0,
      width: (p.width as number) ?? 532,
      height: (p.height as number) ?? 100,
      columns: (p.columns as number) ?? 2,
      gap: (p.gap as number) ?? 8,
      children,
      opacity: (p.opacity as number) ?? 1,
      rotation: (p.rotation as number) ?? 0,
    } as GridElement;
  }

  return null;
}

export function compileReactDocument(element: React.ReactElement): DocumentDefinition {
  if (!isType(element.type, Document, 'Document')) {
    throw new Error('Root element must be a <Document>');
  }

  const props = element.props as Record<string, unknown>;
  const pages: PageDefinition[] = [];

  React.Children.forEach(props.children as ReactNode, (child, pageIdx) => {
    if (React.isValidElement(child) && isType(child.type, Page, 'Page')) {
      const pageProps = child.props as Record<string, unknown>;
      const elements: DocumentElement[] = [];

      React.Children.forEach(pageProps.children as ReactNode, (elChild, elIdx) => {
        const parsed = parseChildElement(elChild, `p${pageIdx + 1}_el${elIdx + 1}`);
        if (parsed) elements.push(parsed);
      });

      pages.push({
        id: (pageProps.id as string) || `page-${pageIdx + 1}`,
        width: pageProps.width as number | undefined,
        height: pageProps.height as number | undefined,
        backgroundColor: pageProps.backgroundColor as string | undefined,
        elements,
      });
    }
  });

  return {
    id: (props.id as string) || 'doc',
    metadata: props.metadata as DocumentDefinition['metadata'],
    defaultPageSize: (props.defaultPageSize as DocumentDefinition['defaultPageSize']) ?? 'letter',
    orientation: (props.orientation as DocumentDefinition['orientation']) ?? 'portrait',
    pages,
  };
}
