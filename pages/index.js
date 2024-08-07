/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Dropzone from '../components/Dropzone';
import DrawingBoard from '../components/DrawingBoard';
import Loading from '../components/Loading';
import Btn from '../components/Button';

export default function Home() {
  const [ isLoading, setIsLoading ] = useState( false );
  const [ dropZoneHidden, setDropZoneHidden ] = useState( false );
  const [ canvasData, setCanvasData ] = useState( null );

  // onDrop function
  const onDrop = useCallback( ( acceptedFiles ) => {
    // this callback will be called after files get dropped, we will get the acceptedFiles. If you want, you can even access the rejected files too
    // Loop through accepted files
    setIsLoading( true );
    acceptedFiles.map( ( file ) => {
      // Initialize FileReader browser API
      const reader = new FileReader();
      // onload callback gets called after the reader reads the file data
      reader.onload = ( e ) => {
        // setImages((prevState) => [...prevState, { src: e.target.result }]);
        // add the image into the state. Since FileReader reading process is asynchronous, its better to get the latest snapshot state (i.e., prevState) and update it.
        setCanvasData( e.target.result );
        setDropZoneHidden( true );
        setIsLoading( false );
      };
      // Read the file as Data URL (since we accept only images)
      reader.readAsDataURL( file );
      return file;
    } );
  }, [] );

  const handleReset = ( e ) => {
    e.preventDefault();

    setCanvasData( null );
    setIsLoading( false );
    setDropZoneHidden( false );
  };

  return (
    <>
      <Head>
        <title>SVG-Whiz</title>
        <meta name='description' content='Convert SVG images with ease!' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className={styles.container}>
        <div className='status-badges'>
          <a
            href='https://github.com/cjboco/svg-whiz'
            aria-label='Link to the Github repository.'
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
          >
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
            src={
              '/tiny-people-drawing-with-pen-graphic-editor-isolated-flat-design.jpg'
            }
            width={720}
            height={500}
            priority={true}
            alt={
              'Splash graphic of tiny people working on a large computer monitor.'
            }
          />
          <h1 className={styles.title}>Welcome to SVG-Whiz.</h1>
          <Dropzone
            onDrop={onDrop}
            accept={{ 'image/svg+xml': [] }}
            isHidden={dropZoneHidden}
          />
          <DrawingBoard
            width={500}
            height={500}
            svgData={canvasData}
          />
          <Loading visible={isLoading} />
          <Btn
            handleClick={handleReset}
            isPrimary={true}
            isHidden={!dropZoneHidden}
            label={'Reset'}
          />
        </main>

        <footer className={styles.footer}>
          <div>Copyright &copy; {
            new Date().getFullYear()
          } Doug Jones.</div>
          <div>
          Built by{' '}
            <a
              href='https://cjboco.com'
              aria-label='Link to Creative Juices, Bo. Co. website'
            >
            Creative Juices, Bo. Co.
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}