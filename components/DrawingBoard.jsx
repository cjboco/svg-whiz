import React, { useRef, useEffect } from 'react';
import { Primary, Secondary } from './Colors.jsx';
import styled from 'styled-components';

const px = (val) => {
  return val + 'px';
};

const drawOnCanvas = (canvasRef, hiddenImgRef, svgData) => {
  if (
    !canvasRef ||
    !canvasRef.current ||
    !hiddenImgRef ||
    !hiddenImgRef.current ||
    !svgData
  ) {
    return; // Should not happen, but do check anyway
  }

  const canvas = canvasRef.current;
  const ctx = canvasRef.current.getContext('2d');
  const myImg = hiddenImgRef.current;
  myImg.src = svgData;

  myImg.onload = (e) => {
    const width = getComputedStyle(e.target)
      .getPropertyValue('width')
      .replace(/px$/, '');
    const height = getComputedStyle(e.target)
      .getPropertyValue('height')
      .replace(/px$/, '');
    canvas.width = width;
    canvas.height = height;
    ctx.clearRect(0, 0, width, width);
    ctx.drawImage(myImg, 0, 0);
  };
};

const Canvas = styled.canvas(
  ({ width, height, data }) => `
    display: ${data?.svgData ? 'block' : 'none'}
    width: 500px;
    height: 500px;
    border: 1px solid ${Secondary('light')};
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
  border: 1px solid ${Secondary('light')};
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
  position: absolute;
  top: -15999px;
  left: -15999px;
  width: auto;
  height: auto;
`;

const DrawingBoard = ({ width, height, svgData }) => {
  const myCanvas = useRef();
  const hiddenImg = useRef();
  const btnGIF = useRef();
  const btnPNG = useRef();

  useEffect(() => {
    drawOnCanvas(myCanvas, hiddenImg, svgData);
  }, [svgData, myCanvas, hiddenImg]);

  const handleClick = (e) => {
    e.preventDefault();

    const type = e.currentTarget.getAttribute('data-type');
    const canvas = myCanvas.current;
    const anchor = document.createElement('a');

    if (type === 'GIF') {
      anchor.download = 'converted-svg.gif';
      anchor.href = canvas.toDataURL('image/gif');
    } else if (type === 'PNG') {
      anchor.download = 'converted-svg.png';
      anchor.href = canvas.toDataURL('image/png');
    }

    anchor.click();
    anchor.remove();
  };

  return (
    <>
      <HiddenImg ref={hiddenImg} />
      {svgData ? (
        <>
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
      ) : (
        ''
      )}
    </>
  );
};
export default DrawingBoard;
