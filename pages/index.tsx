import Head from 'next/head';
import Image from 'next/legacy/image';
import { useCallback, useState } from 'react';
import Btn from '../components/Button';
import DrawingBoard from '../components/DrawingBoard';
import Dropzone from '../components/Dropzone';
import Loading from '../components/Loading';
import ThemeToggle from '../components/ThemeToggle';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [dropZoneHidden, setDropZoneHidden] = useState(false);
  const [canvasData, setCanvasData] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setIsLoading(true);
    acceptedFiles.map((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCanvasData(e.target?.result as string);
        setDropZoneHidden(true);
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setCanvasData(null);
    setIsLoading(false);
    setDropZoneHidden(false);
  };

  return (
    <>
      <Head>
        <title>SVG-Whiz</title>
        <meta name='description' content='Convert SVG images with ease!' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className={styles.container}>
        <ThemeToggle />
        <div className='status-badges'>
          <a href='https://github.com/cjboco/svg-whiz' aria-label='Link to the Github repository.'>
            <img
              alt='GitHub forks'
              src='https://img.shields.io/github/forks/cjboco/svg-whiz?style=social'
              aria-label='Github forks display badge'
            />
          </a>
          <a href='https://github.com/cjboco/svg-whiz' aria-label='Link to the Github repository.'>
            <img
              alt='GitHub Repo stars'
              src='https://img.shields.io/github/stars/cjboco/svg-whiz?style=social'
              aria-label='Github repo stars display badge'
            />
          </a>
        </div>

        {/* http://codepo8.github.io/css-fork-on-github-ribbon/ */}
        <span id='forkongithub'>
          <a
            href='https://github.com/cjboco/svg-whiz'
            aria-label='Click to fork this project on Github.com'
          >
            Fork me on GitHub
          </a>
        </span>

        <main className={styles.main}>
          <Image
            src={'/A_2D_digital_illustration_showcases_the_conversion.png'}
            width={720}
            height={480}
            priority={true}
            alt={'Illustration showcasing SVG to image conversion'}
          />
          <h1 className={styles.title}>Welcome to SVG-Whiz.</h1>
          <p className={styles.description}>
            A simple tool to convert your SVG files to PNG or GIF format. Drop an SVG below, preview
            it, and download in your preferred format.
          </p>
          <Dropzone onDrop={onDrop} accept={{ 'image/svg+xml': [] }} isHidden={dropZoneHidden} />
          <DrawingBoard width={500} height={500} svgData={canvasData} />
          <Loading visible={isLoading} />
          <Btn
            handleClick={handleReset}
            isPrimary={true}
            isHidden={!dropZoneHidden}
            label={'Reset'}
          />
        </main>

        <footer className={styles.footer}>
          <div>Copyright &copy; {new Date().getFullYear()} Doug Jones.</div>
          <div>
            Built by{' '}
            <a href='https://cjboco.com' aria-label='Link to Creative Juices, Bo. Co. website'>
              Creative Juices, Bo. Co.
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}
