'use client';

import { FILTER_PRESETS, useSvg } from '@/context/SvgContext';
import { FiRefreshCw } from 'react-icons/fi';

interface SliderConfig {
  key: keyof typeof defaultValues;
  label: string;
  min: number;
  max: number;
  unit: string;
}

const defaultValues = {
  brightness: 100,
  contrast: 100,
  saturate: 100,
  hueRotate: 0,
  grayscale: 0,
  sepia: 0,
  blur: 0,
  invert: 0,
};

const sliders: SliderConfig[] = [
  { key: 'brightness', label: 'Brightness', min: 0, max: 200, unit: '%' },
  { key: 'contrast', label: 'Contrast', min: 0, max: 200, unit: '%' },
  { key: 'saturate', label: 'Saturation', min: 0, max: 200, unit: '%' },
  { key: 'hueRotate', label: 'Hue Rotate', min: 0, max: 360, unit: 'deg' },
  { key: 'grayscale', label: 'Grayscale', min: 0, max: 100, unit: '%' },
  { key: 'sepia', label: 'Sepia', min: 0, max: 100, unit: '%' },
  { key: 'blur', label: 'Blur', min: 0, max: 20, unit: 'px' },
  { key: 'invert', label: 'Invert', min: 0, max: 100, unit: '%' },
];

const presets = [
  { id: 'none', label: 'None' },
  { id: 'grayscale', label: 'Grayscale' },
  { id: 'sepia', label: 'Sepia' },
  { id: 'highContrast', label: 'High Contrast' },
  { id: 'inverted', label: 'Inverted' },
  { id: 'vintage', label: 'Vintage' },
];

export function FilterControls() {
  const { filters, setFilters, applyFilterPreset, resetFilters } = useSvg();

  const handleSliderChange = (key: keyof typeof defaultValues, value: number) => {
    setFilters({ ...filters, [key]: value });
  };

  const isDefault = Object.entries(filters).every(
    ([key, value]) => value === defaultValues[key as keyof typeof defaultValues]
  );

  // Determine which preset is active (if any)
  const activePreset = presets.find((preset) => {
    if (preset.id === 'none') return isDefault;
    const presetValues = FILTER_PRESETS[preset.id];
    if (!presetValues) return false;

    return Object.entries(presetValues).every(
      ([key, value]) => filters[key as keyof typeof filters] === value
    );
  });

  return (
    <div className='bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4 space-y-4'>
      <div className='flex items-center justify-between'>
        <h3 className='font-medium text-zinc-900 dark:text-zinc-100'>CSS Filters</h3>
        <button
          type='button'
          onClick={resetFilters}
          disabled={isDefault}
          className='flex items-center gap-1 text-sm font-semibold font-[Helvetica,_Arial,_sans-serif] text-zinc-600 dark:text-zinc-400 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
        >
          <FiRefreshCw className='w-3 h-3' />
          Reset
        </button>
      </div>

      {/* Presets */}
      <div className='space-y-2'>
        <label className='block text-xs font-medium text-zinc-600 dark:text-zinc-400 uppercase tracking-wide'>
          Presets
        </label>
        <div className='flex flex-wrap gap-2'>
          {presets.map((preset) => (
            <button
              key={preset.id}
              type='button'
              onClick={() => applyFilterPreset(preset.id)}
              className={`px-3 py-1.5 rounded text-sm font-semibold font-[Helvetica,_Arial,_sans-serif] transition-colors ${
                activePreset?.id === preset.id
                  ? 'bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-300'
                  : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-300 dark:hover:bg-zinc-600'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sliders */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {sliders.map((slider) => (
          <div key={slider.key} className='space-y-1'>
            <div className='flex items-center justify-between'>
              <label className='text-sm text-zinc-700 dark:text-zinc-300'>{slider.label}</label>
              <span className='text-xs text-zinc-500 dark:text-zinc-400 font-mono'>
                {filters[slider.key]}
                {slider.unit}
              </span>
            </div>
            <input
              type='range'
              min={slider.min}
              max={slider.max}
              value={filters[slider.key]}
              onChange={(e) => handleSliderChange(slider.key, Number(e.target.value))}
              className='w-full h-2 bg-zinc-300 dark:bg-zinc-600 rounded-lg appearance-none cursor-pointer accent-fuchsia-600'
            />
          </div>
        ))}
      </div>
    </div>
  );
}
