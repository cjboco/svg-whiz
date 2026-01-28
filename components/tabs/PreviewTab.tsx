'use client';

import { FilterControls } from '@/components/controls/FilterControls';
import { useSvg } from '@/context/SvgContext';
import { useEffect, useRef, useState } from 'react';

export function PreviewTab() {
  const { svgDataUrl, originalDimensions, getFilterCssString } = useSvg();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [previewSize, setPreviewSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!svgDataUrl || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      // Calculate preview size to fit within container while maintaining aspect ratio
      const maxWidth = 500;
      const maxHeight = 400;
      let width = originalDimensions.width || img.width;
      let height = originalDimensions.height || img.height;

      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }

      setPreviewSize({ width, height });
      canvas.width = width;
      canvas.height = height;

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
    };
    img.src = svgDataUrl;
  }, [svgDataUrl, originalDimensions]);

  if (!svgDataUrl) {
    return (
      <div className='flex items-center justify-center h-64 text-zinc-500 dark:text-zinc-400'>
        No SVG loaded
      </div>
    );
  }

  const filterStyle = getFilterCssString();

  return (
    <div className='space-y-6'>
      {/* Preview Canvas */}
      <div className='flex flex-col items-center'>
        <div className='bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4 inline-block'>
          {/* Checkerboard background for transparency */}
          <div
            className='relative'
            style={{
              backgroundImage:
                'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
            }}
          >
            <canvas
              ref={canvasRef}
              style={{
                filter: filterStyle,
                display: 'block',
              }}
            />
          </div>
        </div>

        {/* Dimensions display */}
        <p className='mt-2 text-sm text-zinc-500 dark:text-zinc-400'>
          Original: {originalDimensions.width} x {originalDimensions.height}px
          {previewSize.width !== originalDimensions.width && (
            <span className='ml-2'>
              (Preview: {Math.round(previewSize.width)} x {Math.round(previewSize.height)}px)
            </span>
          )}
        </p>
      </div>

      {/* Filter Controls */}
      <FilterControls />
    </div>
  );
}
