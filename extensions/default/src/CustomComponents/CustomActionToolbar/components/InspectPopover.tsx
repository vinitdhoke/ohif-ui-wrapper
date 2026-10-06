import React from 'react';
import { HoverMetadata } from '../types';

interface InspectPopoverProps {
  activeTool: string;
  hoverData: HoverMetadata | null;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function InspectPopover({
  activeTool,
  hoverData,
  onMouseEnter,
  onMouseLeave,
}: InspectPopoverProps) {
  return (
    <div
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        type="button"
        className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg bg-indigo-600/80 hover:bg-indigo-600 text-white transition-all shadow-sm"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="hidden md:inline">Inspect</span>
      </button>

      {hoverData && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 p-3 rounded-lg bg-neutral-900 border border-neutral-700 shadow-2xl text-xs z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-neutral-800">
            <span className="font-semibold text-indigo-300">Live Viewport Info</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-900/60 text-indigo-300 font-mono">
              {hoverData.viewportId}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-y-1 text-neutral-300">
            <span className="text-neutral-400">Slice:</span>
            <span className="font-mono text-right">
              {hoverData.sliceIndex} / {hoverData.totalSlices}
            </span>
            <span className="text-neutral-400">Zoom:</span>
            <span className="font-mono text-right">{hoverData.zoomPercent}%</span>
            <span className="text-neutral-400">Active Tool:</span>
            <span className="font-mono text-right text-emerald-400">{activeTool}</span>
            <span className="text-neutral-400">WW / WC:</span>
            <span className="font-mono text-right text-neutral-400">
              {hoverData.ww} / {hoverData.wc}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

