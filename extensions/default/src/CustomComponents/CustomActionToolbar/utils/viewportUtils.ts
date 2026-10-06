import { ActiveViewportInfo, HoverMetadata } from '../types';

/**
 * Retrieves the currently active Cornerstone viewport using OHIF services
 */
export function getActiveViewport(servicesManager: any): ActiveViewportInfo | null {
  try {
    const { viewportGridService, cornerstoneViewportService } = servicesManager?.services ?? {};
    const activeId = viewportGridService?.getState?.()?.activeViewportId;
    if (!activeId) return null;

    return {
      viewportId: activeId,
      viewport: cornerstoneViewportService?.getCornerstoneViewport?.(activeId),
    };
  } catch (err) {
    console.warn('Failed to get active viewport:', err);
    return null;
  }
}

/**
 * Activates an interactive tool (WindowLevel, Pan, Zoom, Length, Angle) on primary mouse button
 */
export function setInteractiveTool(commandsManager: any, toolName: string): boolean {
  try {
    commandsManager?.runCommand?.('setToolActive', { toolName });
    return true;
  } catch (err) {
    console.warn(`Failed to activate tool "${toolName}":`, err);
    return false;
  }
}

/**
 * Performs discrete zoom on the active viewport
 */
export function zoomViewport(
  servicesManager: any,
  commandsManager: any,
  direction: 'in' | 'out',
  multiplier: number
): void {
  const data = getActiveViewport(servicesManager);
  if (data?.viewport?.getZoom && data?.viewport?.setZoom) {
    try {
      const currentZoom = data.viewport.getZoom() || 1;
      data.viewport.setZoom(currentZoom * multiplier);
      data.viewport.render();
      return;
    } catch {
      // Fallback to commandsManager
    }
  }

  try {
    commandsManager?.runCommand?.('zoom', { direction });
  } catch (err) {
    console.warn(`Zoom ${direction} command failed:`, err);
  }
}

/**
 * Rotates the viewport by given degrees (default 90 clockwise)
 */
export function rotateViewport(commandsManager: any, rotation = 90): void {
  try {
    commandsManager?.runCommand?.('rotateViewportCW');
  } catch {
    try {
      commandsManager?.runCommand?.('rotateViewportBy', { rotation });
    } catch (err) {
      console.warn('Rotate command failed:', err);
    }
  }
}

/**
 * Flips the active viewport horizontally
 */
export function flipViewport(commandsManager: any): void {
  try {
    commandsManager?.runCommand?.('flipViewportHorizontal');
  } catch (err) {
    console.warn('Flip command failed:', err);
  }
}

/**
 * Inverts the active viewport color palette / LUT
 */
export function invertViewport(commandsManager: any): void {
  try {
    commandsManager?.runCommand?.('invertViewport');
  } catch (err) {
    console.warn('Invert command failed:', err);
  }
}

/**
 * Resets camera, contrast, and zoom to defaults
 */
export function resetViewport(servicesManager: any, commandsManager: any): void {
  try {
    commandsManager?.runCommand?.('resetViewport');
  } catch {
    const data = getActiveViewport(servicesManager);
    if (data?.viewport?.resetCamera) {
      data.viewport.resetCamera();
      data.viewport.render();
    }
  }
}

/**
 * Reads live slice, zoom, and VOI/WW/WC metadata from the active viewport
 */
export function inspectViewport(servicesManager: any): HoverMetadata {
  const data = getActiveViewport(servicesManager);

  if (data?.viewport) {
    const currentIdx = (data.viewport.getCurrentImageIdIndex?.() ?? 0) + 1;
    const total = data.viewport.getImageIds?.()?.length ?? 'N/A';
    const zoom = Math.round((data.viewport.getZoom?.() || 1) * 100);
    const voiRange = data.viewport.getProperties?.()?.voiRange;

    return {
      viewportId: data.viewportId,
      sliceIndex: currentIdx,
      totalSlices: total,
      zoomPercent: zoom,
      ww: voiRange ? Math.round(voiRange.upper - voiRange.lower) : 'Auto',
      wc: voiRange ? Math.round((voiRange.upper + voiRange.lower) / 2) : 'Auto',
    };
  }

  return {
    viewportId: data?.viewportId || 'Primary',
    sliceIndex: 1,
    totalSlices: 1,
    zoomPercent: 100,
    ww: 'N/A',
    wc: 'N/A',
  };
}

