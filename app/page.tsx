'use client';

import Image from 'next/image';
import { useCallback, useState } from 'react';
import Btn from '../components/Button';
import Dropzone from '../components/Dropzone';
import Loading from '../components/Loading';
import ThemeToggle from '../components/ThemeToggle';
import { CodeTab } from '../components/tabs/CodeTab';
import { ExportTab } from '../components/tabs/ExportTab';
import { GenerateTab } from '../components/tabs/GenerateTab';
import { PreviewTab } from '../components/tabs/PreviewTab';
import { TabContainer } from '../components/tabs/TabContainer';
import { ToolsTab } from '../components/tabs/ToolsTab';
import { useSvg } from '../context/SvgContext';
import { daysOne } from '../lib/fonts';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const { svgDataUrl, loadSvg, reset } = useSvg();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setIsLoading(true);
      for (const file of acceptedFiles) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataUrl = e.target?.result as string;

          // Also read as text to get the SVG string
          const textReader = new FileReader();
          textReader.onload = (textEvent) => {
            const svgString = textEvent.target?.result as string;
            loadSvg(svgString, dataUrl);
            setIsLoading(false);
          };
          textReader.readAsText(file);
        };
        reader.readAsDataURL(file);
      }
    },
    [loadSvg]
  );

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    reset();
    setIsLoading(false);
  };

  const hasSvg = svgDataUrl !== null;

  return (
    <div className='relative min-h-screen px-8 flex flex-col justify-around items-center'>
      <ThemeToggle />
      <div className='absolute top-2.5 right-40 inline-flex flex-row items-center justify-end'>
        <a
          href='https://github.com/cjboco/svg-whiz'
          aria-label='Link to the Github repository.'
          className='inline-block ml-3 no-underline text-inherit'
        >
          <img
            alt='GitHub forks'
            src='https://img.shields.io/github/forks/cjboco/svg-whiz?style=social'
            aria-label='Github forks display badge'
          />
        </a>
        <a
          href='https://github.com/cjboco/svg-whiz'
          aria-label='Link to the Github repository.'
          className='inline-block ml-3 no-underline text-inherit'
        >
          <img
            alt='GitHub Repo stars'
            src='https://img.shields.io/github/stars/cjboco/svg-whiz?style=social'
            aria-label='Github repo stars display badge'
          />
        </a>
      </div>

      {/* GitHub Fork Ribbon - http://codepo8.github.io/css-fork-on-github-ribbon/ */}
      <span className='hidden min-[800px]:block min-[800px]:absolute min-[800px]:top-0 min-[800px]:right-0 min-[800px]:w-50 min-[800px]:h-50 min-[800px]:overflow-hidden min-[800px]:z-9999'>
        <a
          href='https://github.com/cjboco/svg-whiz'
          aria-label='Click to fork this project on Github.com'
          className="bg-zinc-900 text-white dark:bg-zinc-700 no-underline font-bold py-1.25 px-10 text-xs leading-8 relative transition-[0.2s] text-center font-sans min-[800px]:w-50 min-[800px]:absolute min-[800px]:top-8.75 min-[800px]:-right-11 min-[800px]:rotate-45 min-[800px]:shadow-[4px_4px_10px_rgba(0,0,0,0.3)] hover:bg-fuchsia-600 hover:text-white before:content-[''] before:w-full before:block before:absolute before:top-px before:left-0 before:h-px before:bg-white after:content-[''] after:w-full after:block after:absolute after:bottom-px after:left-0 after:h-px after:bg-white"
        >
          Fork me on GitHub
        </a>
      </span>

      <main className='py-16 flex flex-col justify-center items-center flex-1 w-full'>
        {!hasSvg ? (
          <>
            <Image
              src={'/svg-whiz-character.png'}
              width={720}
              height={480}
              priority={true}
              alt={'Illustration showcasing SVG to image conversion'}
            />
            <h1 className={`${daysOne.className} text-5xl text-center font-light`}>
              Welcome to SVG-Whiz.
            </h1>
            <p className='text-center max-w-125 mx-2 my-6 text-zinc-600 dark:text-zinc-400 leading-relaxed'>
              A powerful SVG toolkit. Convert to multiple formats, optimize, extract colors,
              generate favicons, and create React/Vue components. Drop an SVG below to get started.
            </p>
            <Dropzone onDrop={onDrop} accept={{ 'image/svg+xml': [] }} isHidden={false} />
          </>
        ) : (
          <>
            <h1 className={`${daysOne.className} text-3xl text-center font-light mb-6`}>
              SVG-Whiz Toolkit
            </h1>
            <TabContainer>
              {{
                preview: <PreviewTab />,
                export: <ExportTab />,
                code: <CodeTab />,
                tools: <ToolsTab />,
                generate: <GenerateTab />,
              }}
            </TabContainer>
            <div className='mt-8'>
              <Btn
                handleClick={handleReset}
                isPrimary={true}
                isHidden={false}
                label={'Upload New SVG'}
              />
            </div>
          </>
        )}
        <Loading visible={isLoading} />
      </main>

      <footer className='flex flex-col py-8 justify-center items-center text-sm'>
        <div>Copyright &copy; {new Date().getFullYear()} Doug Jones.</div>
        <div>
          Built by{' '}
          <a
            href='https://cjboco.com'
            aria-label='Link to Creative Juices, Bo. Co. website'
            className='no-underline text-inherit transition-all duration-150 hover:text-fuchsia-600 hover:underline active:text-fuchsia-600 active:underline'
          >
            Creative Juices, Bo. Co.
          </a>
        </div>
      </footer>
    </div>
  );
}
