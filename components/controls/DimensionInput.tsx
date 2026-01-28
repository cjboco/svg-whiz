'use client';

import { DIMENSION_PRESETS, useSvg } from '@/context/SvgContext';
import { FiLink, FiUnlock } from 'react-icons/fi';

export function DimensionInput() {
  const {
    originalDimensions,
    customWidth,
    customHeight,
    setCustomDimensions,
    lockAspectRatio,
    setLockAspectRatio,
    scale,
  } = useSvg();

  const currentWidth = customWidth || originalDimensions.width;
  const currentHeight = customHeight || originalDimensions.height;

  const handlePresetSelect = (width: number, height: number) => {
    if (width === 0 && height === 0) {
      // "Original" preset - reset to original dimensions
      setCustomDimensions(null, null);
    } else {
      setCustomDimensions(width, height);
    }
  };

  const handleWidthChange = (value: string) => {
    const width = Number.parseInt(value, 10);
    if (!Number.isNaN(width) && width > 0) {
      setCustomDimensions(width, null);
    }
  };

  const handleHeightChange = (value: string) => {
    const height = Number.parseInt(value, 10);
    if (!Number.isNaN(height) && height > 0) {
      setCustomDimensions(null, height);
    }
  };

  // Final output dimensions (with scale applied)
  const outputWidth = Math.round(currentWidth * scale);
  const outputHeight = Math.round(currentHeight * scale);

  return (
    <div className='space-y-4'>
      <span className='block text-sm font-medium text-zinc-700 dark:text-zinc-300'>
        Dimensions
      </span>

      {/* Presets */}
      <div className='space-y-2'>
        <span className='text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wide'>
          Presets
        </span>
        <div className='flex flex-wrap gap-2'>
          {DIMENSION_PRESETS.map((preset) => {
            const isSelected =
              preset.width === 0 && preset.height === 0
                ? customWidth === null && customHeight === null
                : customWidth === preset.width && customHeight === preset.height;

            return (
              <button
                key={preset.name}
                type='button'
                onClick={() => handlePresetSelect(preset.width, preset.height)}
                className={`px-3 py-1.5 rounded text-sm font-semibold font-[Helvetica,_Arial,_sans-serif] transition-colors ${
                  isSelected
                    ? 'bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-300'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                {preset.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom dimensions */}
      <div className='flex items-center gap-3'>
        <div className='flex-1'>
          <label htmlFor='width-input' className='block text-xs text-zinc-500 dark:text-zinc-400 mb-1'>Width</label>
          <input
            id='width-input'
            type='number'
            value={currentWidth}
            onChange={(e) => handleWidthChange(e.target.value)}
            min={1}
            className='w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 text-sm focus:border-fuchsia-500 focus:outline-none'
          />
        </div>

        <button
          type='button'
          onClick={() => setLockAspectRatio(!lockAspectRatio)}
          className={`mt-5 p-2 rounded-lg font-semibold font-[Helvetica,_Arial,_sans-serif] transition-colors ${
            lockAspectRatio
              ? 'bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-600 dark:text-fuchsia-400'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'
          }`}
          title={lockAspectRatio ? 'Unlock aspect ratio' : 'Lock aspect ratio'}
        >
          {lockAspectRatio ? <FiLink className='w-4 h-4' /> : <FiUnlock className='w-4 h-4' />}
        </button>

        <div className='flex-1'>
          <label htmlFor='height-input' className='block text-xs text-zinc-500 dark:text-zinc-400 mb-1'>Height</label>
          <input
            id='height-input'
            type='number'
            value={currentHeight}
            onChange={(e) => handleHeightChange(e.target.value)}
            min={1}
            className='w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 text-sm focus:border-fuchsia-500 focus:outline-none'
          />
        </div>
      </div>

      {/* Output info */}
      {scale !== 1 && (
        <p className='text-xs text-zinc-500 dark:text-zinc-400'>
          With {scale}x scale: {outputWidth} x {outputHeight}px
        </p>
      )}
    </div>
  );
}
