'use client';

import { type ExportFormat, useSvg } from '@/context/SvgContext';

interface FormatOption {
  id: ExportFormat;
  label: string;
  description: string;
  supportsTransparency: boolean;
  supportsQuality: boolean;
}

const formats: FormatOption[] = [
  {
    id: 'png',
    label: 'PNG',
    description: 'Lossless compression, best for icons',
    supportsTransparency: true,
    supportsQuality: false,
  },
  {
    id: 'jpeg',
    label: 'JPEG',
    description: 'Lossy compression, smaller files',
    supportsTransparency: false,
    supportsQuality: true,
  },
  {
    id: 'webp',
    label: 'WebP',
    description: 'Modern format, good compression',
    supportsTransparency: true,
    supportsQuality: true,
  },
  {
    id: 'gif',
    label: 'GIF',
    description: 'Limited colors, legacy support',
    supportsTransparency: true,
    supportsQuality: false,
  },
  {
    id: 'ico',
    label: 'ICO',
    description: 'Windows favicon format',
    supportsTransparency: true,
    supportsQuality: false,
  },
  {
    id: 'avif',
    label: 'AVIF',
    description: 'Best compression, limited support',
    supportsTransparency: true,
    supportsQuality: true,
  },
];

export function FormatSelector() {
  const { exportFormat, setExportFormat, setBackgroundColor } = useSvg();

  const handleFormatChange = (format: ExportFormat) => {
    setExportFormat(format);

    // If selecting JPEG, set a default background since it doesn't support transparency
    const formatConfig = formats.find((f) => f.id === format);
    if (formatConfig && !formatConfig.supportsTransparency) {
      setBackgroundColor('#ffffff');
    }
  };

  return (
    <div className='space-y-3'>
      <label className='block text-sm font-medium text-zinc-700 dark:text-zinc-300'>
        Export Format
      </label>

      <div className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
        {formats.map((format) => (
          <button
            key={format.id}
            type='button'
            onClick={() => handleFormatChange(format.id)}
            className={`p-3 rounded-lg text-left font-semibold font-[Helvetica,_Arial,_sans-serif] transition-all ${
              exportFormat === format.id
                ? 'bg-fuchsia-100 dark:bg-fuchsia-900/30 ring-2 ring-fuchsia-500'
                : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            <div
              className={`font-medium ${
                exportFormat === format.id
                  ? 'text-fuchsia-700 dark:text-fuchsia-300'
                  : 'text-zinc-900 dark:text-zinc-100'
              }`}
            >
              {format.label}
            </div>
            <div className='text-xs text-zinc-500 dark:text-zinc-400 mt-0.5'>
              {format.description}
            </div>
          </button>
        ))}
      </div>

      {/* Format info */}
      {(() => {
        const selected = formats.find((f) => f.id === exportFormat);
        if (!selected) return null;

        return (
          <div className='text-xs text-zinc-500 dark:text-zinc-400 space-x-3'>
            <span>
              Transparency:{' '}
              <span className={selected.supportsTransparency ? 'text-green-600' : 'text-red-500'}>
                {selected.supportsTransparency ? 'Yes' : 'No'}
              </span>
            </span>
            <span>
              Quality control:{' '}
              <span className={selected.supportsQuality ? 'text-green-600' : 'text-zinc-400'}>
                {selected.supportsQuality ? 'Yes' : 'No'}
              </span>
            </span>
          </div>
        );
      })()}
    </div>
  );
}
