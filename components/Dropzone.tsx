import type { CSSProperties } from 'react';
import { useMemo } from 'react';
import { type Accept, type FileRejection, useDropzone } from 'react-dropzone';
import { Primary } from './Colors';

const baseStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  padding: '40px',
  borderWidth: '2px',
  borderRadius: '7px',
  borderColor: 'var(--color-border)',
  borderStyle: 'dashed',
  backgroundColor: 'var(--color-dropzone-bg)',
  color: 'var(--color-dropzone-text)',
  outline: 'none',
  transition: 'border 0.15s ease-in-out, background-color 0.3s ease, color 0.3s ease',
  fontSize: '1.25rem',
  textAlign: 'center',
};

const focusedStyle: CSSProperties = {
  borderColor: `${Primary()}`,
};

const acceptStyle: CSSProperties = {
  borderColor: `${Primary()}`,
  backgroundColor: `${Primary('light', 0.1)}`,
  color: `${Primary()}`,
};

const rejectStyle: CSSProperties = {
  borderColor: 'var(--color-danger)',
};

interface DropzoneProps {
  onDrop: (acceptedFiles: File[], fileRejections: FileRejection[]) => void;
  accept: Accept;
  isHidden?: boolean;
}

const Dropzone = ({ onDrop, accept, isHidden = false }: DropzoneProps) => {
  const { getRootProps, getInputProps, isDragActive, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      accept,
    });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragActive ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragActive, isDragReject]
  );

  return (
    <div
      className='container'
      style={isHidden ? { display: 'none' } : { display: 'block', width: '100%' }}
    >
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <div className='text-center'>Release to drop the files here</div>
        ) : (
          <div className='text-center'>
            Drag &apos;n&apos; drop a SVG file here, or click to select one from your computer.
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropzone;
