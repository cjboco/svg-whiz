import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Button from '../components/Button';

export default function Home() {
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
          alt={
            'Splash graphic of tiny people working on a large computer monitor.'
          }
        />
        <h1 className={styles.title}>Welcome to SVG-Whiz.</h1>
        <p>
          Drag-n-drop your SVG image onto the screen or click the button below
          to browse files from your computer.
        </p>
        <Button
          isPrimary
          label='Browse'
          size='large'
          handleClick={(e) => {
            e.preventDefault();
            alert('Coming soon!');
          }}
        />
      </main>

      <footer className={styles.footer}>
        Built by Creative Juices, Bo. Co.
      </footer>
    </div>
  );
}
