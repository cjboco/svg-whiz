import React, { useRef, useEffect, useState } from 'react';
import { Secondary } from './Colors.jsx';
import styled from 'styled-components';

const px = ( val ) => {
  return val + 'px';
};

const Canvas = styled.canvas(
  ( { width, height, data } ) => `
    display: ${data?.svgData ? 'block' : 'none'}
    width: ${px( width )};
    height: ${px( height )};
    border: 1px solid ${Secondary( 'light' )};
    transform: scale(1);
  `
);

const BtnGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;

const Btn = styled.button`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 0.4rem;
  border: 1px solid ${Secondary( 'light' )};
  margin: 0.2rem;
  padding: 0.5rem 0.75rem;
  font-size: 1.25rem;
  line-height: 1;
  transition: all 0.2s linear;

  &:hover {
    background-color: #444;
    color: white;
  }

  &:active {
    background-color: black;
    color: white;
  }
`;

const HiddenImg = styled.img`
  width: auto !important;
  height: auto !important;
  object-fit: none;
`;

const DrawingBoard = ( { width, height, svgData } ) => {
  const [ isLoaded, setIsLoaded ] = useState( false );

  const myCanvas = useRef();
  const hiddenImg = useRef();
  const btnGIF = useRef();
  const btnPNG = useRef();

  useEffect( () => {
    if ( isLoaded && myCanvas?.current && hiddenImg?.current ) {
      const ctx = myCanvas.current.getContext( '2d' );
      const width = hiddenImg.current.clientWidth;
      const height = hiddenImg.current.clientHeight;
      myCanvas.current.width = width;
      myCanvas.current.height = height;
      ctx.clearRect( 0, 0, width, width );
      ctx.drawImage( hiddenImg.current, 0, 0 );
    }
  }, [ isLoaded, myCanvas, hiddenImg ] );

  const handleClick = ( e ) => {
    e.preventDefault();

    const type = e.currentTarget.getAttribute( 'data-type' );
    const canvas = myCanvas.current;
    const anchor = document.createElement( 'a' );

    if ( type === 'GIF' ) {
      anchor.download = 'converted-svg.gif';
      anchor.href = canvas.toDataURL( 'image/gif' );
    } else if ( type === 'PNG' ) {
      anchor.download = 'converted-svg.png';
      anchor.href = canvas.toDataURL( 'image/png' );
    }

    anchor.click();
    anchor.remove();
  };

  if ( !svgData ) {
    return null;
  }

  return (
    <>
      <div style={{
        position: 'absolute',
        top: '90vw',
        left: '90vh',
        width: '1440px',
        height: '1440px',
        zIindex: '10',
        overflow: 'hidden'
      }}>
        <HiddenImg
          src={svgData}
          onLoad={() => setIsLoaded( true )}
          ref={hiddenImg}
        />
      </div>
      <Canvas
        width={width}
        height={height}
        data={svgData}
        ref={myCanvas}
      />
      <BtnGroup>
        <Btn
          role='button'
          onClick={handleClick}
          data-type='GIF'
          ref={btnGIF}
        >
              Download - GIF
        </Btn>
        <Btn
          role='button'
          onClick={handleClick}
          data-type='PNG'
          ref={btnPNG}
        >
              Download - PNG
        </Btn>
      </BtnGroup>
    </>
  );
};
export default DrawingBoard;