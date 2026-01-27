import type { ReactNode } from 'react';

type ButtonSize = 'small' | 'medium' | 'large';
type IconPosition = 'left' | 'start' | 'right' | 'end';

interface ButtonIconProps {
  label?: string;
  icon?: ReactNode;
  iconPosition?: IconPosition;
  size?: ButtonSize;
  isPrimary?: boolean;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const sizeClasses: Record<ButtonSize, string> = {
  small: 'px-5 py-2 text-sm',
  medium: 'px-7 py-2.5 text-base',
  large: 'px-8 py-3 text-lg',
};

const ButtonIcon = ({
  label = 'Click Me',
  icon = null,
  iconPosition = 'start',
  size = 'medium',
  isPrimary = false,
  handleClick,
}: ButtonIconProps) => {
  const baseClasses =
    'inline-flex items-center appearance-none border-0 rounded-lg text-white transition-all duration-150 cursor-pointer';
  const colorClasses = isPrimary
    ? 'bg-fuchsia-600 hover:bg-fuchsia-500 active:bg-fuchsia-700'
    : 'bg-zinc-400 hover:bg-zinc-300 active:bg-zinc-500';

  const showIconStart = icon && ['left', 'start'].includes(iconPosition);
  const showIconEnd = icon && ['right', 'end'].includes(iconPosition);

  return (
    <button
      type="button"
      className={`${baseClasses} ${sizeClasses[size]} ${colorClasses}`}
      onClick={handleClick}
    >
      {showIconStart && <span className="flex items-center justify-center mr-1">{icon}</span>}
      {label}
      {showIconEnd && <span className="flex items-center justify-center ml-1">{icon}</span>}
    </button>
  );
};

export default ButtonIcon;
