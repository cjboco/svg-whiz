'use client';

import { useSvg } from '@/context/SvgContext';

export function QualitySlider() {
  const { quality, setQuality, exportFormat } = useSvg();

  // Only show for formats that support quality
  const supportsQuality = ['jpeg', 'webp', 'avif'].includes(exportFormat);

  if (!supportsQuality) {
    return null;
  }

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <label htmlFor='quality-slider' className='text-sm font-medium text-zinc-700 dark:text-zinc-300'>Quality</label>
        <span className='text-sm text-zinc-500 dark:text-zinc-400 font-mono'>{quality}%</span>
      </div>

      <input
        id='quality-slider'
        type='range'
        min={1}
        max={100}
        value={quality}
        onChange={(e) => setQuality(Number(e.target.value))}
        className='w-full h-2 bg-zinc-300 dark:bg-zinc-600 rounded-lg appearance-none cursor-pointer accent-fuchsia-600'
      />

      <div className='flex justify-between text-xs text-zinc-500 dark:text-zinc-400'>
        <span>Smaller file</span>
        <span>Better quality</span>
      </div>
    </div>
  );
}
