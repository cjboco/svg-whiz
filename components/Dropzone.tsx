import { useMemo } from 'react';
import { type Accept, type FileRejection, useDropzone } from 'react-dropzone';

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

  const stateClasses = useMemo(() => {
    if (isDragReject) {
      return 'border-red-500';
    }
    if (isDragAccept || isDragActive) {
      return 'border-fuchsia-600 bg-fuchsia-600/10 text-fuchsia-600';
    }
    if (isFocused) {
      return 'border-fuchsia-600';
    }
    return '';
  }, [isFocused, isDragAccept, isDragActive, isDragReject]);

  if (isHidden) {
    return null;
  }

  return (
    <div className='block w-full'>
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center w-full p-10 border-2 border-dashed rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-300 dark:border-zinc-600 outline-none transition-all duration-150 text-xl text-center cursor-pointer ${stateClasses}`}
      >
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
