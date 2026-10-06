import React from 'react';

export interface CustomActionToolbarProps {
  servicesManager?: any;
  commandsManager?: any;
}

export interface HoverMetadata {
  viewportId: string;
  sliceIndex: number | string;
  totalSlices: number | string;
  zoomPercent: number | string;
  ww?: number | string;
  wc?: number | string;
}

export interface InteractiveTool {
  id: string;
  label: string;
  title: string;
  icon: React.ReactNode;
}

export interface ActiveViewportInfo {
  viewportId: string;
  viewport: any;
}

