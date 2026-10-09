import { createHash } from 'node:crypto';

// Shared by the asset generator and the Astro build so stale diagrams fail closed.
export const diagramConfig = {
  startOnLoad: false,
  securityLevel: 'strict',
  htmlLabels: false,
  theme: 'base',
  themeVariables: {
    primaryColor: '#eee7fa', primaryTextColor: '#655376', primaryBorderColor: '#c1aed8',
    lineColor: '#a792ba', secondaryColor: '#edf3e8', tertiaryColor: '#faf6ed',
    fontFamily: 'Inter, PingFang SC, sans-serif', fontSize: '13px',
  },
  flowchart: { htmlLabels: false, useMaxWidth: true },
  sequence: { useMaxWidth: true },
};

export const diagramSources = source => [...source.matchAll(/```mermaid\n([\s\S]*?)```/g)].map(match => match[1].trim().replace(/[ \t]+$/gm, ''));
export const diagramSignature = sources => createHash('sha256').update(JSON.stringify({ config: diagramConfig, sources })).digest('hex');
