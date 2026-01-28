'use client';

import { CopyButton } from '@/components/ui/CopyButton';
import { useSvg } from '@/context/SvgContext';
import { Highlight, themes } from 'prism-react-renderer';
import { useCallback, useEffect, useState } from 'react';
import { FiCode, FiEdit3, FiEye, FiRefreshCw } from 'react-icons/fi';

type ViewMode = 'view' | 'edit';
type OutputMode = 'svg' | 'base64-svg' | 'base64-png' | 'css-background';

export function CodeTab() {
  const { originalSvg, editedSvg, svgDataUrl, updateEditedSvg } = useSvg();
  const [viewMode, setViewMode] = useState<ViewMode>('view');
  const [outputMode, setOutputMode] = useState<OutputMode>('svg');
  const [editValue, setEditValue] = useState('');
  const [base64Output, setBase64Output] = useState<string>('');

  useEffect(() => {
    if (editedSvg) {
      setEditValue(editedSvg);
    }
  }, [editedSvg]);

  const formatSvg = useCallback((svg: string): string => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(svg, 'image/svg+xml');
      const serializer = new XMLSerializer();
      let formatted = serializer.serializeToString(doc);

      // Simple formatting - add newlines after closing tags
      formatted = formatted.replace(/></g, '>\n<');
      formatted = formatted.replace(/>\s+</g, '>\n<');

      // Indent
      const lines = formatted.split('\n');
      let indent = 0;
      const formattedLines = lines.map((line) => {
        const trimmed = line.trim();
        if (trimmed.startsWith('</')) {
          indent = Math.max(0, indent - 1);
        }
        const indented = '  '.repeat(indent) + trimmed;
        if (trimmed.startsWith('<') && !trimmed.startsWith('</') && !trimmed.endsWith('/>')) {
          indent++;
        }
        return indented;
      });

      return formattedLines.join('\n');
    } catch {
      return svg;
    }
  }, []);

  const handleFormat = useCallback(() => {
    if (editValue) {
      setEditValue(formatSvg(editValue));
    }
  }, [editValue, formatSvg]);

  const handleApplyEdit = useCallback(() => {
    if (editValue) {
      updateEditedSvg(editValue);
    }
  }, [editValue, updateEditedSvg]);

  const handleResetEdit = useCallback(() => {
    if (originalSvg) {
      setEditValue(originalSvg);
      updateEditedSvg(originalSvg);
    }
  }, [originalSvg, updateEditedSvg]);

  useEffect(() => {
    const generateBase64 = async () => {
      if (!editedSvg && !svgDataUrl) return;

      switch (outputMode) {
        case 'svg':
          setBase64Output(editedSvg || '');
          break;
        case 'base64-svg': {
          const encoded = btoa(unescape(encodeURIComponent(editedSvg || '')));
          setBase64Output(`data:image/svg+xml;base64,${encoded}`);
          break;
        }
        case 'base64-png': {
          if (svgDataUrl) {
            // Convert SVG to PNG via canvas
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement('canvas');
              canvas.width = img.width || 300;
              canvas.height = img.height || 150;
              const ctx = canvas.getContext('2d');
              if (ctx) {
                ctx.drawImage(img, 0, 0);
                setBase64Output(canvas.toDataURL('image/png'));
              }
            };
            img.src = svgDataUrl;
          }
          break;
        }
        case 'css-background': {
          const encoded = btoa(unescape(encodeURIComponent(editedSvg || '')));
          setBase64Output(`background-image: url('data:image/svg+xml;base64,${encoded}');`);
          break;
        }
      }
    };

    generateBase64();
  }, [outputMode, editedSvg, svgDataUrl]);

  if (!originalSvg) {
    return (
      <div className='flex items-center justify-center h-64 text-zinc-500 dark:text-zinc-400'>
        No SVG loaded
      </div>
    );
  }

  const displayCode = viewMode === 'edit' ? editValue : editedSvg || '';

  return (
    <div className='space-y-6'>
      {/* View/Edit Toggle */}
      <div className='flex items-center justify-between'>
        <div className='flex gap-2'>
          <button
            type='button'
            onClick={() => setViewMode('view')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'view'
                ? 'bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-300'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            <FiEye className='w-4 h-4' />
            View
          </button>
          <button
            type='button'
            onClick={() => setViewMode('edit')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'edit'
                ? 'bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-300'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            <FiEdit3 className='w-4 h-4' />
            Edit
          </button>
        </div>

        {viewMode === 'edit' && (
          <div className='flex gap-2'>
            <button
              type='button'
              onClick={handleFormat}
              className='flex items-center gap-2 px-3 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg text-sm font-medium transition-colors'
            >
              <FiCode className='w-4 h-4' />
              Format
            </button>
            <button
              type='button'
              onClick={handleResetEdit}
              className='flex items-center gap-2 px-3 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg text-sm font-medium transition-colors'
            >
              <FiRefreshCw className='w-4 h-4' />
              Reset
            </button>
            <button
              type='button'
              onClick={handleApplyEdit}
              className='flex items-center gap-2 px-3 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded-lg text-sm font-medium transition-colors'
            >
              Apply
            </button>
          </div>
        )}
      </div>

      {/* Code Display/Editor */}
      <div className='relative'>
        {viewMode === 'edit' ? (
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className='w-full h-64 bg-zinc-900 text-zinc-100 font-mono text-sm p-4 rounded-lg border border-zinc-700 focus:border-fuchsia-500 focus:outline-none resize-y'
            spellCheck={false}
          />
        ) : (
          <div className='relative'>
            <Highlight theme={themes.nightOwl} code={displayCode} language='xml'>
              {({ style, tokens, getLineProps, getTokenProps }) => (
                <pre
                  className='overflow-auto max-h-64 rounded-lg p-4 text-sm'
                  style={{ ...style, margin: 0 }}
                >
                  {tokens.map((line, i) => (
                    <div key={`line-${i}`} {...getLineProps({ line })}>
                      <span className='select-none text-zinc-500 mr-4 inline-block w-8 text-right'>
                        {i + 1}
                      </span>
                      {line.map((token, key) => (
                        <span key={`token-${i}-${key}`} {...getTokenProps({ token })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
            <div className='absolute top-2 right-2'>
              <CopyButton text={displayCode} />
            </div>
          </div>
        )}
      </div>

      {/* Base64/Data URI Output */}
      <div className='space-y-3'>
        <h3 className='font-medium text-zinc-900 dark:text-zinc-100'>Data URI Generator</h3>

        {/* Output mode selector */}
        <div className='flex flex-wrap gap-2'>
          {[
            { id: 'svg' as const, label: 'SVG Source' },
            { id: 'base64-svg' as const, label: 'Base64 SVG' },
            { id: 'base64-png' as const, label: 'Base64 PNG' },
            { id: 'css-background' as const, label: 'CSS Background' },
          ].map((mode) => (
            <button
              key={mode.id}
              type='button'
              onClick={() => setOutputMode(mode.id)}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                outputMode === mode.id
                  ? 'bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-300'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>

        {/* Output display */}
        <div className='relative'>
          <textarea
            readOnly
            value={base64Output}
            className='w-full h-24 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono text-xs p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 resize-none'
          />
          <div className='absolute top-2 right-2'>
            <CopyButton text={base64Output} />
          </div>
        </div>
      </div>
    </div>
  );
}
