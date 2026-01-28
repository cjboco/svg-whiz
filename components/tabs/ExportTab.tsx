'use client';

import { ColorPicker } from '@/components/controls/ColorPicker';
import { DimensionInput } from '@/components/controls/DimensionInput';
import { FormatSelector } from '@/components/controls/FormatSelector';
import { QualitySlider } from '@/components/controls/QualitySlider';
import { ScaleSelector } from '@/components/controls/ScaleSelector';
import { useSvg } from '@/context/SvgContext';
import { exportToFormat } from '@/lib/exportUtils';
import { useState } from 'react';
import { FiDownload } from 'react-icons/fi';

export function ExportTab() {
  const {
    svgDataUrl,
    editedSvg,
    exportFormat,
    backgroundColor,
    quality,
    getExportDimensions,
    getFilterCssString,
  } = useSvg();

  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    if (!svgDataUrl || !editedSvg) return;

    setIsExporting(true);
    setError(null);

    try {
      const dimensions = getExportDimensions();
      const filterCss = getFilterCssString();

      await exportToFormat({
        svgDataUrl,
        svgString: editedSvg,
        format: exportFormat,
        width: dimensions.width,
        height: dimensions.height,
        backgroundColor,
        quality,
        filterCss,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Export failed');
    } finally {
      setIsExporting(false);
    }
  };

  const dimensions = getExportDimensions();

  if (!svgDataUrl) {
    return (
      <div className='flex items-center justify-center h-64 text-zinc-500 dark:text-zinc-400'>
        No SVG loaded
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Format Selection */}
      <FormatSelector />

      {/* Dimensions */}
      <DimensionInput />

      {/* Scale */}
      <ScaleSelector />

      {/* Quality (for lossy formats) */}
      <QualitySlider />

      {/* Background Color */}
      <ColorPicker />

      {/* Export Summary */}
      <div className='bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4'>
        <h3 className='font-medium text-zinc-900 dark:text-zinc-100 mb-2'>Export Summary</h3>
        <ul className='text-sm text-zinc-600 dark:text-zinc-400 space-y-1'>
          <li>
            Format: <span className='font-medium'>{exportFormat.toUpperCase()}</span>
          </li>
          <li>
            Dimensions:{' '}
            <span className='font-medium'>
              {dimensions.width} x {dimensions.height}px
            </span>
          </li>
          <li>
            Background:{' '}
            <span className='font-medium'>
              {backgroundColor === 'transparent' ? 'Transparent' : backgroundColor}
            </span>
          </li>
          {['jpeg', 'webp', 'avif'].includes(exportFormat) && (
            <li>
              Quality: <span className='font-medium'>{quality}%</span>
            </li>
          )}
        </ul>
      </div>

      {/* Error Message */}
      {error && (
        <div className='bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg p-4 text-red-700 dark:text-red-300 text-sm'>
          {error}
        </div>
      )}

      {/* Export Button */}
      <button
        type='button'
        onClick={handleExport}
        disabled={isExporting}
        className='w-full flex items-center justify-center gap-2 bg-fuchsia-600 hover:bg-fuchsia-700 disabled:bg-fuchsia-400 text-white font-medium py-3 px-6 rounded-lg transition-colors'
      >
        <FiDownload className='w-5 h-5' />
        {isExporting ? 'Exporting...' : `Export as ${exportFormat.toUpperCase()}`}
      </button>
    </div>
  );
}
