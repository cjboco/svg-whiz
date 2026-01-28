'use client';

import { useCallback, useState } from 'react';
import { FiCheck } from 'react-icons/fi';

interface ColorSwatchProps {
  color: string;
}

export function ColorSwatch({ color }: ColorSwatchProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(color);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = color;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [color]);

  // Determine if color is light or dark for text contrast
  const isLightColor = (hexColor: string): boolean => {
    // Handle named colors or non-hex formats
    if (!hexColor.startsWith('#')) {
      // For named colors, assume they need dark text
      const darkColors = ['black', 'navy', 'darkblue', 'darkgreen', 'maroon', 'purple', 'darkred'];
      return !darkColors.some((c) => hexColor.toLowerCase().includes(c));
    }

    const hex = hexColor.replace('#', '');
    const r = Number.parseInt(hex.substring(0, 2), 16);
    const g = Number.parseInt(hex.substring(2, 4), 16);
    const b = Number.parseInt(hex.substring(4, 6), 16);

    // Calculate relative luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5;
  };

  const textColor = isLightColor(color) ? 'text-zinc-800' : 'text-white';

  return (
    <button
      type='button'
      onClick={handleCopy}
      className='group relative flex flex-col items-center font-semibold font-[Helvetica,_Arial,_sans-serif]'
      title='Click to copy'
    >
      <div
        className='w-16 h-16 rounded-lg border border-zinc-300 dark:border-zinc-600 shadow-sm transition-transform group-hover:scale-105 flex items-center justify-center'
        style={{ backgroundColor: color }}
      >
        {copied && (
          <div className={`${textColor}`}>
            <FiCheck className='w-6 h-6' />
          </div>
        )}
      </div>
      <span className='mt-1 text-xs font-mono text-zinc-600 dark:text-zinc-400 group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400'>
        {color}
      </span>
    </button>
  );
}
