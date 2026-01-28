'use client';

import { useSvg } from '@/context/SvgContext';

const scales = [
  { value: 1, label: '1x' },
  { value: 2, label: '2x' },
  { value: 3, label: '3x' },
  { value: 4, label: '4x' },
];

export function ScaleSelector() {
  const { scale, setScale, originalDimensions, customWidth, customHeight } = useSvg();

  const baseWidth = customWidth || originalDimensions.width;
  const baseHeight = customHeight || originalDimensions.height;

  return (
    <div className='space-y-3'>
      <span className='block text-sm font-medium text-zinc-700 dark:text-zinc-300'>
        Scale Factor
      </span>

      <div className='flex gap-2'>
        {scales.map((s) => (
          <button
            key={s.value}
            type='button'
            onClick={() => setScale(s.value)}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold font-[Helvetica,_Arial,_sans-serif] transition-colors ${
              scale === s.value
                ? 'bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-300 ring-2 ring-fuchsia-500'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Preview of resulting dimensions */}
      <p className='text-xs text-zinc-500 dark:text-zinc-400'>
        Output: {Math.round(baseWidth * scale)} x {Math.round(baseHeight * scale)}px
      </p>
    </div>
  );
}
