import React from 'react';

interface ResetButtonProps {
  onReset: () => void;
}

export default function ResetButton({ onReset }: ResetButtonProps) {
  return (
    <button
      type="button"
      onClick={onReset}
      title="Reset Viewport to Default"
      className="px-2.5 py-1 text-xs font-medium rounded-lg bg-neutral-800/80 hover:bg-neutral-700 hover:text-white transition-all active:scale-95"
    >
      Reset
    </button>
  );
}

