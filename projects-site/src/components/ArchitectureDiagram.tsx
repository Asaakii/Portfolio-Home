import { useState } from 'react';
import type { ArchNode } from '../data/projects';

interface Props {
  nodes: ArchNode[];
}

export default function ArchitectureDiagram({ nodes }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {nodes.map((node, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="rounded-lg border px-3.5 py-2.5 text-center transition-all duration-200"
              style={{
                backgroundColor: node.color,
                borderColor:
                  hovered === i ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.06)',
                transform: hovered === i ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              <div className="text-[10px] font-semibold text-gray-700">
                {node.label}
              </div>
              {node.sub && (
                <div className="mt-0.5 text-[8px] text-gray-400">
                  {node.sub}
                </div>
              )}
            </div>
            {i < nodes.length - 1 && (
              <span className="text-gray-300">&rarr;</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
