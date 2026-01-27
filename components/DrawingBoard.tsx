'use client';

import { useEffect, useRef, useState } from 'react';

interface DrawingBoardProps {
  width: number;
  height: number;
  svgData: string | null;
}

const DrawingBoard = ({ width, height, svgData }: DrawingBoardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const myCanvas = useRef<HTMLCanvasElement>(null);
  const hiddenImg = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (isLoaded && myCanvas?.current && hiddenImg?.current) {
      const ctx = myCanvas.current.getContext('2d');
      const imgWidth = hiddenImg.current.clientWidth;
      const imgHeight = hiddenImg.current.clientHeight;
      myCanvas.current.width = imgWidth;
      myCanvas.current.height = imgHeight;
      ctx?.clearRect(0, 0, imgWidth, imgWidth);
      ctx?.drawImage(hiddenImg.current, 0, 0);
    }
  }, [isLoaded]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const type = e.currentTarget.getAttribute('data-type');
    const canvas = myCanvas.current;
    if (!canvas) {
      return;
    }

    const anchor = document.createElement('a');

    if (type === 'GIF') {
      anchor.download = 'converted-svg.gif';
      anchor.href = canvas.toDataURL('image/gif');
    } else if (type === 'PNG') {
      anchor.download = 'converted-svg.png';
      anchor.href = canvas.toDataURL('image/png');
    }

    anchor.click();
    anchor.remove();
  };

  if (!svgData) {
    return null;
  }

  return (
    <>
      <div className='absolute top-[90vw] left-[90vh] w-[1440px] h-[1440px] z-10 overflow-hidden'>
        {/* biome-ignore lint/a11y/useAltText: Hidden image for canvas processing */}
        <img
          src={svgData}
          onLoad={() => setIsLoaded(true)}
          ref={hiddenImg}
          className='w-auto h-auto object-none'
        />
      </div>
      <canvas
        ref={myCanvas}
        width={width}
        height={height}
        className='block border border-zinc-300 dark:border-zinc-600'
        style={{ width: `${width}px`, height: `${height}px` }}
      />
      <div className='flex flex-row items-center justify-center mt-4'>
        <button
          type='button'
          onClick={handleClick}
          data-type='GIF'
          className='inline-flex flex-row items-center justify-center bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-md border border-zinc-300 dark:border-zinc-600 m-1 px-3 py-2 text-xl leading-none transition-all duration-200 hover:bg-zinc-700 hover:text-white dark:hover:bg-zinc-300 dark:hover:text-zinc-900 active:bg-zinc-900 active:text-white dark:active:bg-white dark:active:text-zinc-900 cursor-pointer'
        >
          Download - GIF
        </button>
        <button
          type='button'
          onClick={handleClick}
          data-type='PNG'
          className='inline-flex flex-row items-center justify-center bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-md border border-zinc-300 dark:border-zinc-600 m-1 px-3 py-2 text-xl leading-none transition-all duration-200 hover:bg-zinc-700 hover:text-white dark:hover:bg-zinc-300 dark:hover:text-zinc-900 active:bg-zinc-900 active:text-white dark:active:bg-white dark:active:text-zinc-900 cursor-pointer'
        >
          Download - PNG
        </button>
      </div>
    </>
  );
};

export default DrawingBoard;
