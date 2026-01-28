'use client';

import { useSvg } from '@/context/SvgContext';

const presetColors = [
  { value: 'transparent', label: 'Transparent', preview: 'bg-transparent' },
  { value: '#ffffff', label: 'White', preview: 'bg-white' },
  { value: '#000000', label: 'Black', preview: 'bg-black' },
  { value: '#f5f5f5', label: 'Light Gray', preview: 'bg-zinc-100' },
  { value: '#18181b', label: 'Dark Gray', preview: 'bg-zinc-900' },
];

export function ColorPicker() {
  const { backgroundColor, setBackgroundColor, exportFormat } = useSvg();

  // Check if current format supports transparency
  const supportsTransparency = !['jpeg'].includes(exportFormat);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBackgroundColor(e.target.value);
  };

  const handlePresetClick = (color: string) => {
    if (color === 'transparent' && !supportsTransparency) {
      // Can't set transparent for JPEG, use white instead
      setBackgroundColor('#ffffff');
      return;
    }
    setBackgroundColor(color);
  };

  const displayColor = backgroundColor === 'transparent' ? '#ffffff' : backgroundColor;

  return (
    <div className='space-y-3'>
      <span className='block text-sm font-medium text-zinc-700 dark:text-zinc-300'>
        Background Color
      </span>

      {/* Presets */}
      <div className='flex flex-wrap gap-2'>
        {presetColors.map((preset) => {
          const isDisabled = preset.value === 'transparent' && !supportsTransparency;
          const isSelected = backgroundColor === preset.value;

          return (
            <button
              key={preset.value}
              type='button'
              onClick={() => handlePresetClick(preset.value)}
              disabled={isDisabled}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold font-[Helvetica,_Arial,_sans-serif] transition-colors ${
                isSelected
                  ? 'bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-300 ring-2 ring-fuchsia-500'
                  : isDisabled
                    ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
              title={isDisabled ? 'JPEG does not support transparency' : undefined}
            >
              <span
                className={`w-4 h-4 rounded border border-zinc-300 dark:border-zinc-600 ${
                  preset.value === 'transparent'
                    ? "bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGElEQVQYlWNgYGD4z0AEYBxVOKoQVoYAAKIRAyZ4qCkAAAAASUVORK5CYII=')] bg-repeat"
                    : ''
                }`}
                style={
                  preset.value !== 'transparent' ? { backgroundColor: preset.value } : undefined
                }
              />
              {preset.label}
            </button>
          );
        })}
      </div>

      {/* Custom color picker */}
      <div className='flex items-center gap-3'>
        <div className='relative'>
          <input
            type='color'
            value={displayColor}
            onChange={handleColorChange}
            className='w-10 h-10 rounded-lg cursor-pointer border border-zinc-300 dark:border-zinc-600'
          />
        </div>
        <div className='flex-1'>
          <input
            type='text'
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
            placeholder='#ffffff or transparent'
            className='w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 text-sm focus:border-fuchsia-500 focus:outline-none font-mono'
          />
        </div>
      </div>

      {!supportsTransparency && backgroundColor === 'transparent' && (
        <p className='text-xs text-amber-600 dark:text-amber-400'>
          JPEG does not support transparency. A white background will be used.
        </p>
      )}
    </div>
  );
}
