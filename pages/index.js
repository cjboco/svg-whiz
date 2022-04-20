import Head from 'next/head';
import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Dropzone from '../components/Dropzone';
import DrawingBoard from '../components/DrawingBoard';
import Loading from '../components/Loading';
import Btn from '../components/Button';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [dropZoneHidden, setDropZoneHidden] = useState(false);
  const [canvasData, setCanvasData] = useState(null);

  // onDrop function
  const onDrop = useCallback((acceptedFiles) => {
    // this callback will be called after files get dropped, we will get the acceptedFiles. If you want, you can even access the rejected files too
    // Loop through accepted files
    setIsLoading(true);
    acceptedFiles.map((file) => {
      // Initialize FileReader browser API
      const reader = new FileReader();
      // onload callback gets called after the reader reads the file data
      reader.onload = (e) => {
        // setImages((prevState) => [...prevState, { src: e.target.result }]);
        // add the image into the state. Since FileReader reading process is asynchronous, its better to get the latest snapshot state (i.e., prevState) and update it.
        setCanvasData(e.target.result);
        setDropZoneHidden(true);
        setIsLoading(false);
      };
      // Read the file as Data URL (since we accept only images)
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  const handleReset = (e) => {
    e.preventDefault();

    setCanvasData(null);
    setIsLoading(false);
    setDropZoneHidden(false);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>SVG-Whiz</title>
        <meta name='description' content='Convert SVG images with ease!' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

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
          accept={'image/svg+xml'}
          isHidden={dropZoneHidden}
        />
        <DrawingBoard width={500} height={500} svgData={canvasData} />
        <Loading visible={isLoading} />
        <Btn
          handleClick={handleReset}
          isPrimary={true}
          isHidden={!dropZoneHidden ? true : false}
          label='Reset'
        />
      </main>

      <footer className={styles.footer}>
        Built by Creative Juices, Bo. Co.
      </footer>
    </div>
  );
}
