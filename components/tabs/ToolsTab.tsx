'use client';

import { ColorSwatch } from '@/components/ui/ColorSwatch';
import { useSvg } from '@/context/SvgContext';
import { extractColors } from '@/lib/svgParser';
import { useCallback, useEffect, useState } from 'react';
import { FiCheck, FiDownload, FiZap } from 'react-icons/fi';

type OptimizePreset = 'default' | 'aggressive' | 'safe';

interface OptimizeResult {
  original: number;
  optimized: number;
  svg: string;
}

export function ToolsTab() {
  const { originalSvg, editedSvg, updateEditedSvg, extractedColors, setExtractedColors } = useSvg();
  const [optimizePreset, setOptimizePreset] = useState<OptimizePreset>('default');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizeResult, setOptimizeResult] = useState<OptimizeResult | null>(null);
  const [optimizeError, setOptimizeError] = useState<string | null>(null);

  // Extract colors when SVG changes
  useEffect(() => {
    if (editedSvg) {
      const colors = extractColors(editedSvg);
      setExtractedColors(colors);
    }
  }, [editedSvg, setExtractedColors]);

  const handleOptimize = useCallback(async () => {
    if (!editedSvg) {
      return;
    }

    setIsOptimizing(true);
    setOptimizeError(null);
    setOptimizeResult(null);

    try {
      // Dynamic import browser build to reduce initial bundle size
      const svgo = await import('svgo/browser');

      // Build config based on preset
      let config: Parameters<typeof svgo.optimize>[1];

      switch (optimizePreset) {
        case 'aggressive':
          config = {
            multipass: true,
            plugins: ['preset-default', 'removeDimensions'],
          } as Parameters<typeof svgo.optimize>[1];
          break;
        case 'safe':
          config = {
            multipass: false,
          };
          break;
        default:
          config = {
            multipass: true,
          };
          break;
      }

      const result = svgo.optimize(editedSvg, config);

      const originalSize = new Blob([editedSvg]).size;
      const optimizedSize = new Blob([result.data]).size;

      setOptimizeResult({
        original: originalSize,
        optimized: optimizedSize,
        svg: result.data,
      });
    } catch (err) {
      setOptimizeError(err instanceof Error ? err.message : 'Optimization failed');
    } finally {
      setIsOptimizing(false);
    }
  }, [editedSvg, optimizePreset]);

  const handleApplyOptimized = useCallback(() => {
    if (optimizeResult) {
      updateEditedSvg(optimizeResult.svg);
      setOptimizeResult(null);
    }
  }, [optimizeResult, updateEditedSvg]);

  const handleDownloadOptimized = useCallback(() => {
    if (!optimizeResult) {
      return;
    }

    const blob = new Blob([optimizeResult.svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'optimized.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [optimizeResult]);

  if (!originalSvg) {
    return (
      <div className='flex items-center justify-center h-64 text-zinc-500 dark:text-zinc-400'>
        No SVG loaded
      </div>
    );
  }

  const savingsPercent = optimizeResult
    ? Math.round((1 - optimizeResult.optimized / optimizeResult.original) * 100)
    : 0;

  return (
    <div className='space-y-8 max-w-xl mx-auto text-center'>
      {/* SVG Optimizer */}
      <section className='space-y-4'>
        <h2 className='text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center justify-center gap-2'>
          <FiZap className='w-5 h-5 text-fuchsia-600' />
          SVG Optimizer
        </h2>

        <p className='text-sm text-zinc-600 dark:text-zinc-400'>
          Optimize your SVG using SVGO to reduce file size while maintaining quality.
        </p>

        {/* Preset selector */}
        <div className='space-y-2'>
          <label className='block text-sm font-medium text-zinc-700 dark:text-zinc-300'>
            Optimization Preset
          </label>
          <div className='flex flex-wrap justify-center gap-2'>
            {[
              {
                id: 'safe' as const,
                label: 'Safe',
                desc: 'Minimal changes, maximum compatibility',
              },
              { id: 'default' as const, label: 'Default', desc: 'Balanced optimization' },
              {
                id: 'aggressive' as const,
                label: 'Aggressive',
                desc: 'Maximum compression, may alter appearance',
              },
            ].map((preset) => (
              <button
                key={preset.id}
                type='button'
                onClick={() => setOptimizePreset(preset.id)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold font-[Helvetica,_Arial,_sans-serif] transition-colors ${
                  optimizePreset === preset.id
                    ? 'bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-300 ring-2 ring-fuchsia-500'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
                title={preset.desc}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Optimize button */}
        <button
          type='button'
          onClick={handleOptimize}
          disabled={isOptimizing}
          className='inline-flex items-center justify-center gap-2 bg-fuchsia-600 hover:bg-fuchsia-700 disabled:bg-fuchsia-400 text-white font-semibold font-[Helvetica,_Arial,_sans-serif] py-2 px-4 rounded-lg transition-colors'
        >
          <FiZap className='w-4 h-4' />
          {isOptimizing ? 'Optimizing...' : 'Optimize SVG'}
        </button>

        {/* Error display */}
        {optimizeError && (
          <div className='bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg p-4 text-red-700 dark:text-red-300 text-sm'>
            {optimizeError}
          </div>
        )}

        {/* Results */}
        {optimizeResult && (
          <div className='bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 space-y-3'>
            <div className='flex items-center gap-2 text-green-700 dark:text-green-300 font-medium'>
              <FiCheck className='w-5 h-5' />
              Optimization Complete
            </div>

            <div className='grid grid-cols-3 gap-4 text-sm'>
              <div>
                <p className='text-zinc-500 dark:text-zinc-400'>Original</p>
                <p className='font-medium text-zinc-900 dark:text-zinc-100'>
                  {(optimizeResult.original / 1024).toFixed(2)} KB
                </p>
              </div>
              <div>
                <p className='text-zinc-500 dark:text-zinc-400'>Optimized</p>
                <p className='font-medium text-zinc-900 dark:text-zinc-100'>
                  {(optimizeResult.optimized / 1024).toFixed(2)} KB
                </p>
              </div>
              <div>
                <p className='text-zinc-500 dark:text-zinc-400'>Savings</p>
                <p className='font-medium text-green-600 dark:text-green-400'>{savingsPercent}%</p>
              </div>
            </div>

            <div className='flex justify-center gap-2'>
              <button
                type='button'
                onClick={handleApplyOptimized}
                className='flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold font-[Helvetica,_Arial,_sans-serif] py-2 px-4 rounded-lg transition-colors text-sm'
              >
                <FiCheck className='w-4 h-4' />
                Apply Changes
              </button>
              <button
                type='button'
                onClick={handleDownloadOptimized}
                className='flex items-center gap-2 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-300 font-semibold font-[Helvetica,_Arial,_sans-serif] py-2 px-4 rounded-lg transition-colors text-sm'
              >
                <FiDownload className='w-4 h-4' />
                Download Optimized
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Color Palette Extractor */}
      <section className='space-y-4'>
        <h2 className='text-lg font-semibold text-zinc-900 dark:text-zinc-100'>Color Palette</h2>

        <p className='text-sm text-zinc-600 dark:text-zinc-400'>
          Colors extracted from the SVG. Click to copy.
        </p>

        {extractedColors.length > 0 ? (
          <div className='flex flex-wrap justify-center gap-3'>
            {extractedColors.map((color, index) => (
              <ColorSwatch key={`${color}-${index}`} color={color} />
            ))}
          </div>
        ) : (
          <p className='text-sm text-zinc-500 dark:text-zinc-400 italic'>
            No colors found in SVG (may use currentColor or CSS)
          </p>
        )}
      </section>
    </div>
  );
}
