import React, { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { Primary } from '../components/Colors';

const baseStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  padding: '40px',
  borderWidth: '2px',
  borderRadius: '7px',
  borderColor: '#ddd',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#444',
  outline: 'none',
  transition: 'border 0.15s ease-in-out',
  fontSize: '1.25rem',
  textAlign: 'center',
}

const focusedStyle = {
  borderColor: `${Primary()}`
};

const acceptStyle = {
  borderColor: `${Primary()}`,
  backgroundColor: `${Primary('light', 0.1)}`,
  color: `${Primary()}`
};

const rejectStyle = {
  borderColor: '#ff1744'
};

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

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragActive ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragActive,
    isDragReject
  ]);

  return (
    <div className='container' style={isHidden ? { display: 'none' } : { display: 'block', width: '100%' }}>
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <div className='text-center'>Release to drop the files here</div>
        ) : (
          <div className='text-center'>
            Drag &apos;n&apos; drop a SVG file here, or click to select one from
            your computer.
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropzone;
