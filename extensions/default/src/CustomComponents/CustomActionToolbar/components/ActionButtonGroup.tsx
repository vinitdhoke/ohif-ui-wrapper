import React from 'react';

interface ActionButtonGroupProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onRotateCW: () => void;
  onFlipHorizontal: () => void;
  onInvert: () => void;
}

export default function ActionButtonGroup({
  onZoomIn,
  onZoomOut,
  onRotateCW,
  onFlipHorizontal,
  onInvert,
}: ActionButtonGroupProps) {
  return (
    <div className="flex items-center gap-1 pr-1.5 border-r border-neutral-700">
      {/* Zoom In */}
      <button
        type="button"
        onClick={onZoomIn}
        title="Zoom In (+25%)"
        className="p-1.5 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 hover:text-white transition-all active:scale-95"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {/* Zoom Out */}
      <button
        type="button"
        onClick={onZoomOut}
        title="Zoom Out (-20%)"
        className="p-1.5 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 hover:text-white transition-all active:scale-95"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
        </svg>
      </button>

      {/* Rotate CW */}
      <button
        type="button"
        onClick={onRotateCW}
        title="Rotate 90° Clockwise"
        className="p-1.5 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 hover:text-white transition-all active:scale-95"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </button>

      {/* Flip Horizontal */}
      <button
        type="button"
        onClick={onFlipHorizontal}
        title="Flip Horizontally"
        className="p-1.5 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 hover:text-white transition-all active:scale-95"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
      </button>

      {/* Invert LUT */}
      <button
        type="button"
        onClick={onInvert}
        title="Invert Colors / LUT"
        className="p-1.5 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 hover:text-white transition-all active:scale-95"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </button>
    </div>
  );
}

