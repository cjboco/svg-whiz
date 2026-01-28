'use client';

import { CopyButton } from '@/components/ui/CopyButton';
import { useSvg } from '@/context/SvgContext';
import { type ComponentOptions, generateComponent } from '@/lib/componentGenerator';
import { generateFaviconPackage } from '@/lib/faviconGenerator';
import { Highlight, themes } from 'prism-react-renderer';
import { useCallback, useEffect, useState } from 'react';
import { FiBox, FiDownload, FiPackage } from 'react-icons/fi';

type Framework = 'react' | 'vue';
type Language = 'typescript' | 'javascript';

export function GenerateTab() {
  const { svgDataUrl, editedSvg } = useSvg();
  const [isGeneratingFavicon, setIsGeneratingFavicon] = useState(false);
  const [faviconError, setFaviconError] = useState<string | null>(null);

  // Component generator state
  const [framework, setFramework] = useState<Framework>('react');
  const [language, setLanguage] = useState<Language>('typescript');
  const [componentName, setComponentName] = useState('Icon');
  const [useDefaultExport, setUseDefaultExport] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');

  // Generate component code when options change
  useEffect(() => {
    if (!editedSvg) {
      return;
    }

    const options: ComponentOptions = {
      framework,
      typescript: language === 'typescript',
      componentName,
      defaultExport: useDefaultExport,
    };

    const code = generateComponent(editedSvg, options);
    setGeneratedCode(code);
  }, [editedSvg, framework, language, componentName, useDefaultExport]);

  const handleGenerateFavicon = useCallback(async () => {
    if (!svgDataUrl) {
      return;
    }

    setIsGeneratingFavicon(true);
    setFaviconError(null);

    try {
      await generateFaviconPackage(svgDataUrl);
    } catch (err) {
      setFaviconError(err instanceof Error ? err.message : 'Failed to generate favicon package');
    } finally {
      setIsGeneratingFavicon(false);
    }
  }, [svgDataUrl]);

  const handleDownloadComponent = useCallback(() => {
    if (!generatedCode) {
      return;
    }

    const extension = framework === 'react' ? (language === 'typescript' ? 'tsx' : 'jsx') : 'vue';

    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${componentName}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [generatedCode, framework, language, componentName]);

  if (!svgDataUrl) {
    return (
      <div className='flex items-center justify-center h-64 text-zinc-500 dark:text-zinc-400'>
        No SVG loaded
      </div>
    );
  }

  const codeLanguage = framework === 'vue' ? 'html' : language === 'typescript' ? 'tsx' : 'jsx';

  return (
    <div className='space-y-8'>
      {/* Favicon Package Generator */}
      <section className='space-y-4'>
        <h2 className='text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2'>
          <FiPackage className='w-5 h-5 text-fuchsia-600' />
          Favicon Package Generator
        </h2>

        <p className='text-sm text-zinc-600 dark:text-zinc-400'>
          Generate a complete favicon package including ICO, PNG sizes, Apple Touch Icon, Android
          Chrome icons, and web manifest.
        </p>

        <div className='bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4'>
          <h3 className='font-medium text-zinc-900 dark:text-zinc-100 mb-2'>Package Contents</h3>
          <ul className='text-sm text-zinc-600 dark:text-zinc-400 space-y-1 list-disc list-inside'>
            <li>favicon.ico (16x16, 32x32, 48x48)</li>
            <li>favicon-16x16.png, favicon-32x32.png</li>
            <li>apple-touch-icon.png (180x180)</li>
            <li>android-chrome-192x192.png, android-chrome-512x512.png</li>
            <li>site.webmanifest</li>
            <li>HTML snippet for &lt;head&gt;</li>
          </ul>
        </div>

        {faviconError && (
          <div className='bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg p-4 text-red-700 dark:text-red-300 text-sm'>
            {faviconError}
          </div>
        )}

        <button
          type='button'
          onClick={handleGenerateFavicon}
          disabled={isGeneratingFavicon}
          className='flex items-center gap-2 bg-fuchsia-600 hover:bg-fuchsia-700 disabled:bg-fuchsia-400 text-white font-semibold font-[Helvetica,_Arial,_sans-serif] py-2 px-4 rounded-lg transition-colors'
        >
          <FiDownload className='w-4 h-4' />
          {isGeneratingFavicon ? 'Generating...' : 'Generate Favicon Package'}
        </button>
      </section>

      {/* Component Generator */}
      <section className='space-y-4'>
        <h2 className='text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2'>
          <FiBox className='w-5 h-5 text-fuchsia-600' />
          Component Generator
        </h2>

        <p className='text-sm text-zinc-600 dark:text-zinc-400'>
          Convert your SVG into a React or Vue component with customizable options.
        </p>

        {/* Options */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          {/* Framework */}
          <div className='space-y-2'>
            <span className='block text-sm font-medium text-zinc-700 dark:text-zinc-300'>
              Framework
            </span>
            <div className='flex gap-2'>
              <button
                type='button'
                onClick={() => setFramework('react')}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold font-[Helvetica,_Arial,_sans-serif] transition-colors ${
                  framework === 'react'
                    ? 'bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-300 ring-2 ring-fuchsia-500'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                React
              </button>
              <button
                type='button'
                onClick={() => setFramework('vue')}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold font-[Helvetica,_Arial,_sans-serif] transition-colors ${
                  framework === 'vue'
                    ? 'bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-300 ring-2 ring-fuchsia-500'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                Vue
              </button>
            </div>
          </div>

          {/* Language (React only) */}
          {framework === 'react' && (
            <div className='space-y-2'>
              <span className='block text-sm font-medium text-zinc-700 dark:text-zinc-300'>
                Language
              </span>
              <div className='flex gap-2'>
                <button
                  type='button'
                  onClick={() => setLanguage('typescript')}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold font-[Helvetica,_Arial,_sans-serif] transition-colors ${
                    language === 'typescript'
                      ? 'bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-300 ring-2 ring-fuchsia-500'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  TypeScript
                </button>
                <button
                  type='button'
                  onClick={() => setLanguage('javascript')}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold font-[Helvetica,_Arial,_sans-serif] transition-colors ${
                    language === 'javascript'
                      ? 'bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-300 ring-2 ring-fuchsia-500'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  JavaScript
                </button>
              </div>
            </div>
          )}

          {/* Component Name */}
          <div className='space-y-2'>
            <label
              htmlFor='component-name'
              className='block text-sm font-medium text-zinc-700 dark:text-zinc-300'
            >
              Component Name
            </label>
            <input
              id='component-name'
              type='text'
              value={componentName}
              onChange={(e) => setComponentName(e.target.value || 'Icon')}
              className='w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 text-sm focus:border-fuchsia-500 focus:outline-none'
              placeholder='Icon'
            />
          </div>

          {/* Export Style */}
          <div className='space-y-2'>
            <span className='block text-sm font-medium text-zinc-700 dark:text-zinc-300'>
              Export Style
            </span>
            <div className='flex gap-2'>
              <button
                type='button'
                onClick={() => setUseDefaultExport(false)}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold font-[Helvetica,_Arial,_sans-serif] transition-colors ${
                  !useDefaultExport
                    ? 'bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-300 ring-2 ring-fuchsia-500'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                Named
              </button>
              <button
                type='button'
                onClick={() => setUseDefaultExport(true)}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold font-[Helvetica,_Arial,_sans-serif] transition-colors ${
                  useDefaultExport
                    ? 'bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-300 ring-2 ring-fuchsia-500'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                Default
              </button>
            </div>
          </div>
        </div>

        {/* Generated Code Preview */}
        <div className='relative'>
          <Highlight theme={themes.nightOwl} code={generatedCode} language={codeLanguage}>
            {({ style, tokens, getLineProps, getTokenProps }) => (
              <pre
                className='overflow-auto max-h-80 rounded-lg p-4 text-sm'
                style={{ ...style, margin: 0 }}
              >
                {tokens.map((line, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: Syntax highlighting tokens require index keys
                  <div key={`line-${i}`} {...getLineProps({ line })}>
                    <span className='select-none text-zinc-500 mr-4 inline-block w-8 text-right'>
                      {i + 1}
                    </span>
                    {line.map((token, tokenIndex) => (
                      // biome-ignore lint/suspicious/noArrayIndexKey: Tokens have no unique ID
                      <span key={`token-${i}-${tokenIndex}`} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
          <div className='absolute top-2 right-2 flex gap-2'>
            <CopyButton text={generatedCode} />
          </div>
        </div>

        <button
          type='button'
          onClick={handleDownloadComponent}
          className='flex items-center gap-2 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-300 font-semibold font-[Helvetica,_Arial,_sans-serif] py-2 px-4 rounded-lg transition-colors'
        >
          <FiDownload className='w-4 h-4' />
          Download Component
        </button>
      </section>
    </div>
  );
}
