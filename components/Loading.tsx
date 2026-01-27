import { SpinnerCircular } from 'spinners-react';

interface LoadingProps {
  visible?: boolean;
}

const Loading = ({ visible = false }: LoadingProps) => {
  if (!visible) {
    return null;
  }

  return (
    <div className='fixed top-0 left-0 flex flex-col items-center justify-center w-screen h-screen bg-white/95 dark:bg-zinc-900/95 z-[1] transition-colors duration-300'>
      <SpinnerCircular
        size={70}
        thickness={180}
        speed={100}
        color='#c026d3'
        secondaryColor='rgba(192, 38, 211, 0.1)'
      />
      <h2 className='text-fuchsia-600 font-[Days_One]'>Processing</h2>
    </div>
  );
};

export default Loading;
