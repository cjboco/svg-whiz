type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  label?: string;
  size?: ButtonSize;
  isPrimary?: boolean;
  isHidden?: boolean;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const sizeClasses: Record<ButtonSize, string> = {
  small: 'px-5 py-2 text-base',
  medium: 'px-7 py-2.5 text-xl',
  large: 'px-8 py-3 text-2xl',
};

const Button = ({
  label = 'Click Me',
  size = 'medium',
  isPrimary = false,
  isHidden = false,
  handleClick,
}: ButtonProps) => {
  const baseClasses =
    'appearance-none border-0 rounded-lg text-white transition-all duration-150 cursor-pointer';
  const colorClasses = isPrimary
    ? 'bg-fuchsia-600 hover:bg-fuchsia-500 active:bg-fuchsia-700'
    : 'bg-zinc-400 hover:bg-zinc-300 active:bg-zinc-500';

  return (
    <button
      type='button'
      className={`${baseClasses} ${sizeClasses[size]} ${colorClasses} ${isHidden ? 'hidden' : 'inline-block'}`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default Button;
