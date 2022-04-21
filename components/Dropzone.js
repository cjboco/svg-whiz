import { useDropzone } from 'react-dropzone';
import { Primary } from '../components/Colors';
import styled from 'styled-components';

const getColor = (props) => {
  if (props.isDragAccept) {
    return `${Primary()}`;
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isDragActive) {
    return `${Primary()}`;
  }
  return '#ddd';
};

const getTextColor = (props) => {
  if (props.isDragAccept || props.isDragActive) {
    return `${Primary()}`;
  }
  return '#444';
};

const getBGColor = (props) => {
  if (props.isDragAccept || props.isDragActive) {
    return `${Primary('light', 0.1)}`;
  }
  return '#fafafa';
};

const Container = styled.div`
  display: block;
  width: 100%;
  padding: 40px;
  border-width: 2px;
  border-radius: 7px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: ${(props) => getBGColor(props)};
  color: ${(props) => getTextColor(props)};
  outline: none;
  transition: border 0.15s ease-in-out;
  font-size: 1.25rem;

  div {
    width: 100%;
  }
`;

const Dropzone = ({ onDrop, accept, isHidden = false }) => {
  // Initializing useDropzone hooks with options
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept,
  });

  return (
    <div style={isHidden ? { display: 'none' } : { display: 'block' }}>
      <Container {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <div className='text-center'>Release to drop the files here</div>
        ) : (
          <div className='text-center'>
            Drag &apos;n&apos; drop a SVG file here, or click to select one from
            your computer.
          </div>
        )}
      </Container>
    </div>
  );
};

export default Dropzone;
