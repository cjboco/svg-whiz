'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';

export type ExportFormat = 'png' | 'jpeg' | 'webp' | 'gif' | 'ico' | 'avif';

export type TabId = 'preview' | 'export' | 'code' | 'tools' | 'generate';

export interface FilterSettings {
  brightness: number; // 0-200, default 100
  contrast: number; // 0-200, default 100
  saturate: number; // 0-200, default 100
  hueRotate: number; // 0-360, default 0
  grayscale: number; // 0-100, default 0
  sepia: number; // 0-100, default 0
  blur: number; // 0-20, default 0
  invert: number; // 0-100, default 0
}

export interface DimensionPreset {
  name: string;
  width: number;
  height: number;
}

export const DIMENSION_PRESETS: DimensionPreset[] = [
  { name: 'Original', width: 0, height: 0 },
  { name: 'Favicon 32x32', width: 32, height: 32 },
  { name: 'Favicon 64x64', width: 64, height: 64 },
  { name: 'Icon 128x128', width: 128, height: 128 },
  { name: 'Icon 256x256', width: 256, height: 256 },
  { name: 'Icon 512x512', width: 512, height: 512 },
  { name: 'Open Graph 1200x630', width: 1200, height: 630 },
  { name: 'Instagram 1200x1200', width: 1200, height: 1200 },
];

export const FILTER_PRESETS: Record<string, Partial<FilterSettings>> = {
  none: {},
  grayscale: { grayscale: 100 },
  sepia: { sepia: 100 },
  highContrast: { contrast: 150, brightness: 110 },
  inverted: { invert: 100 },
  vintage: { sepia: 40, contrast: 90, brightness: 110, saturate: 80 },
};

const DEFAULT_FILTERS: FilterSettings = {
  brightness: 100,
  contrast: 100,
  saturate: 100,
  hueRotate: 0,
  grayscale: 0,
  sepia: 0,
  blur: 0,
  invert: 0,
};

interface SvgContextType {
  // SVG Data
  originalSvg: string | null;
  svgDataUrl: string | null;
  editedSvg: string | null;
  originalDimensions: { width: number; height: number };
  extractedColors: string[];

  // Active tab
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;

  // Export settings
  exportFormat: ExportFormat;
  setExportFormat: (format: ExportFormat) => void;
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  scale: number;
  setScale: (scale: number) => void;
  quality: number;
  setQuality: (quality: number) => void;
  customWidth: number | null;
  customHeight: number | null;
  setCustomDimensions: (width: number | null, height: number | null) => void;
  lockAspectRatio: boolean;
  setLockAspectRatio: (locked: boolean) => void;

  // Filters
  filters: FilterSettings;
  setFilters: (filters: FilterSettings) => void;
  applyFilterPreset: (presetName: string) => void;
  resetFilters: () => void;

  // Actions
  loadSvg: (svgString: string, dataUrl: string) => void;
  updateEditedSvg: (svgString: string) => void;
  setExtractedColors: (colors: string[]) => void;
  reset: () => void;

  // Computed
  getFilterCssString: () => string;
  getExportDimensions: () => { width: number; height: number };
}

const SvgContext = createContext<SvgContextType | undefined>(undefined);

export function SvgProvider({ children }: { children: React.ReactNode }) {
  // SVG Data
  const [originalSvg, setOriginalSvg] = useState<string | null>(null);
  const [svgDataUrl, setSvgDataUrl] = useState<string | null>(null);
  const [editedSvg, setEditedSvg] = useState<string | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [extractedColors, setExtractedColors] = useState<string[]>([]);

  // Active tab
  const [activeTab, setActiveTab] = useState<TabId>('preview');

  // Export settings
  const [exportFormat, setExportFormat] = useState<ExportFormat>('png');
  const [backgroundColor, setBackgroundColor] = useState<string>('transparent');
  const [scale, setScale] = useState<number>(1);
  const [quality, setQuality] = useState<number>(92);
  const [customWidth, setCustomWidth] = useState<number | null>(null);
  const [customHeight, setCustomHeight] = useState<number | null>(null);
  const [lockAspectRatio, setLockAspectRatio] = useState<boolean>(true);

  // Filters
  const [filters, setFilters] = useState<FilterSettings>(DEFAULT_FILTERS);

  const loadSvg = useCallback((svgString: string, dataUrl: string) => {
    setOriginalSvg(svgString);
    setSvgDataUrl(dataUrl);
    setEditedSvg(svgString);

    // Parse dimensions from SVG
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, 'image/svg+xml');
    const svgElement = doc.querySelector('svg');

    if (svgElement) {
      let width = 0;
      let height = 0;

      // Try to get dimensions from width/height attributes
      const widthAttr = svgElement.getAttribute('width');
      const heightAttr = svgElement.getAttribute('height');

      if (widthAttr && heightAttr) {
        width = Number.parseFloat(widthAttr);
        height = Number.parseFloat(heightAttr);
      }

      // Fall back to viewBox
      if ((!width || !height) && svgElement.hasAttribute('viewBox')) {
        const viewBox = svgElement.getAttribute('viewBox')?.split(/\s+|,/);
        if (viewBox && viewBox.length >= 4) {
          width = Number.parseFloat(viewBox[2]);
          height = Number.parseFloat(viewBox[3]);
        }
      }

      // Default dimensions if nothing found
      if (!width) {
        width = 300;
      }
      if (!height) {
        height = 150;
      }

      setOriginalDimensions({ width, height });
    }
  }, []);

  const updateEditedSvg = useCallback((svgString: string) => {
    setEditedSvg(svgString);
  }, []);

  const setCustomDimensions = useCallback(
    (width: number | null, height: number | null) => {
      if (lockAspectRatio && originalDimensions.width && originalDimensions.height) {
        const aspectRatio = originalDimensions.width / originalDimensions.height;

        if (width !== null && width !== customWidth) {
          setCustomWidth(width);
          setCustomHeight(Math.round(width / aspectRatio));
        } else if (height !== null && height !== customHeight) {
          setCustomHeight(height);
          setCustomWidth(Math.round(height * aspectRatio));
        } else {
          setCustomWidth(width);
          setCustomHeight(height);
        }
      } else {
        setCustomWidth(width);
        setCustomHeight(height);
      }
    },
    [lockAspectRatio, originalDimensions, customWidth, customHeight]
  );

  const applyFilterPreset = useCallback((presetName: string) => {
    const preset = FILTER_PRESETS[presetName];
    if (preset) {
      setFilters({ ...DEFAULT_FILTERS, ...preset });
    }
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const reset = useCallback(() => {
    setOriginalSvg(null);
    setSvgDataUrl(null);
    setEditedSvg(null);
    setOriginalDimensions({ width: 0, height: 0 });
    setExtractedColors([]);
    setActiveTab('preview');
    setExportFormat('png');
    setBackgroundColor('transparent');
    setScale(1);
    setQuality(92);
    setCustomWidth(null);
    setCustomHeight(null);
    setLockAspectRatio(true);
    setFilters(DEFAULT_FILTERS);
  }, []);

  const getFilterCssString = useCallback(() => {
    const parts: string[] = [];

    if (filters.brightness !== 100) {
      parts.push(`brightness(${filters.brightness}%)`);
    }
    if (filters.contrast !== 100) {
      parts.push(`contrast(${filters.contrast}%)`);
    }
    if (filters.saturate !== 100) {
      parts.push(`saturate(${filters.saturate}%)`);
    }
    if (filters.hueRotate !== 0) {
      parts.push(`hue-rotate(${filters.hueRotate}deg)`);
    }
    if (filters.grayscale !== 0) {
      parts.push(`grayscale(${filters.grayscale}%)`);
    }
    if (filters.sepia !== 0) {
      parts.push(`sepia(${filters.sepia}%)`);
    }
    if (filters.blur !== 0) {
      parts.push(`blur(${filters.blur}px)`);
    }
    if (filters.invert !== 0) {
      parts.push(`invert(${filters.invert}%)`);
    }

    return parts.length > 0 ? parts.join(' ') : 'none';
  }, [filters]);

  const getExportDimensions = useCallback(() => {
    let width = customWidth || originalDimensions.width;
    let height = customHeight || originalDimensions.height;

    // Apply scale
    width = Math.round(width * scale);
    height = Math.round(height * scale);

    return { width, height };
  }, [customWidth, customHeight, originalDimensions, scale]);

  const value = useMemo(
    () => ({
      // SVG Data
      originalSvg,
      svgDataUrl,
      editedSvg,
      originalDimensions,
      extractedColors,

      // Active tab
      activeTab,
      setActiveTab,

      // Export settings
      exportFormat,
      setExportFormat,
      backgroundColor,
      setBackgroundColor,
      scale,
      setScale,
      quality,
      setQuality,
      customWidth,
      customHeight,
      setCustomDimensions,
      lockAspectRatio,
      setLockAspectRatio,

      // Filters
      filters,
      setFilters,
      applyFilterPreset,
      resetFilters,

      // Actions
      loadSvg,
      updateEditedSvg,
      setExtractedColors,
      reset,

      // Computed
      getFilterCssString,
      getExportDimensions,
    }),
    [
      originalSvg,
      svgDataUrl,
      editedSvg,
      originalDimensions,
      extractedColors,
      activeTab,
      exportFormat,
      backgroundColor,
      scale,
      quality,
      customWidth,
      customHeight,
      setCustomDimensions,
      lockAspectRatio,
      filters,
      applyFilterPreset,
      resetFilters,
      loadSvg,
      updateEditedSvg,
      reset,
      getFilterCssString,
      getExportDimensions,
    ]
  );

  return <SvgContext.Provider value={value}>{children}</SvgContext.Provider>;
}

export function useSvg() {
  const context = useContext(SvgContext);
  if (context === undefined) {
    throw new Error('useSvg must be used within a SvgProvider');
  }
  return context;
}
