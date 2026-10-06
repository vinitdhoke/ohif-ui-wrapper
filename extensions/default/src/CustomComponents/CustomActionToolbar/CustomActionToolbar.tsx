import React, { useState } from 'react';
import { CustomActionToolbarProps, HoverMetadata } from './types';
import {
  setInteractiveTool,
  zoomViewport,
  rotateViewport,
  flipViewport,
  invertViewport,
  resetViewport,
  inspectViewport,
} from './utils/viewportUtils';
import ToolButtonGroup from './components/ToolButtonGroup';
import ActionButtonGroup from './components/ActionButtonGroup';
import ResetButton from './components/ResetButton';
import InspectPopover from './components/InspectPopover';

export default function CustomActionToolbar({
  servicesManager,
  commandsManager,
}: CustomActionToolbarProps) {
  const [activeTool, setActiveTool] = useState<string>('WindowLevel');
  const [hoverData, setHoverData] = useState<HoverMetadata | null>(null);

  // --- HANDLERS ---
  const handleSelectTool = (toolName: string) => {
    if (setInteractiveTool(commandsManager, toolName)) {
      setActiveTool(toolName);
    }
  };

  const handleZoomIn = () => {
    zoomViewport(servicesManager, commandsManager, 'in', 1.25);
  };

  const handleZoomOut = () => {
    zoomViewport(servicesManager, commandsManager, 'out', 0.8);
  };

  const handleRotateCW = () => {
    rotateViewport(commandsManager, 90);
  };

  const handleFlipHorizontal = () => {
    flipViewport(commandsManager);
  };

  const handleInvert = () => {
    invertViewport(commandsManager);
  };

  const handleReset = () => {
    resetViewport(servicesManager, commandsManager);
    setActiveTool('WindowLevel');
  };

  const handleInspectMouseEnter = () => {
    setHoverData(inspectViewport(servicesManager));
  };

  const handleInspectMouseLeave = () => {
    setHoverData(null);
  };

  return (
    <div className="flex items-center gap-1.5 px-2 py-1 rounded-xl bg-neutral-900/90 border border-neutral-700/80 shadow-lg select-none text-neutral-200">
      {/* Interactive Tool Group: WW/WC, Pan, Zoom, Length, Angle */}
      <ToolButtonGroup
        activeTool={activeTool}
        onSelectTool={handleSelectTool}
      />

      {/* Quick Action Group: Zoom In/Out, Rotate, Flip, Invert */}
      <ActionButtonGroup
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onRotateCW={handleRotateCW}
        onFlipHorizontal={handleFlipHorizontal}
        onInvert={handleInvert}
      />

      {/* Reset Viewport */}
      <ResetButton onReset={handleReset} />

      {/* Live Metadata Hover Inspection Popover */}
      <InspectPopover
        activeTool={activeTool}
        hoverData={hoverData}
        onMouseEnter={handleInspectMouseEnter}
        onMouseLeave={handleInspectMouseLeave}
      />
    </div>
  );
}

