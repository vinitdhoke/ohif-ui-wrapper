import React from 'react';
import { INTERACTIVE_TOOLS } from '../constants/tools';

interface ToolButtonGroupProps {
  activeTool: string;
  onSelectTool: (toolName: string) => void;
}

export default function ToolButtonGroup({
  activeTool,
  onSelectTool,
}: ToolButtonGroupProps) {
  return (
    <div className="flex items-center gap-1 pr-1.5 border-r border-neutral-700">
      {INTERACTIVE_TOOLS.map(tool => {
        const isSelected = activeTool === tool.id;
        return (
          <button
            key={tool.id}
            type="button"
            onClick={() => onSelectTool(tool.id)}
            title={tool.title}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
              isSelected
                ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-400'
                : 'bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white'
            }`}
          >
            {tool.icon}
            <span className="hidden sm:inline">{tool.label}</span>
          </button>
        );
      })}
    </div>
  );
}

