import type { ReactNode } from 'react';
import styled from 'styled-components';
import { Primary, Secondary } from './Colors';

type ButtonSize = 'small' | 'medium' | 'large';
type IconPosition = 'left' | 'start' | 'right' | 'end';

interface StyledButtonProps {
  size: ButtonSize;
  $isPrimary: boolean;
}

const Btn = styled.button<StyledButtonProps>(
  ({ size, $isPrimary }) => `
  display: inline-flex;
  align-items: center;
  appearance: none;
  border: 0;
  border-radius: .5rem;
  padding: ${
    size === 'small' ? '0.5rem 1.35rem' : size === 'large' ? '0.75rem 2.15rem' : '0.65rem 1.85rem'
  };
  background-color: ${$isPrimary ? Primary('default') : Secondary('default')};
  color: white;
  font-size: ${size === 'small' ? '0.85rem' : size === 'large' ? '1.2rem' : '1rem'};
  transition: all 0.15s linear;

  &:hover {
    background-color: ${$isPrimary ? Primary('dark') : Secondary('dark')};
  }

  &:active {
    background-color: ${$isPrimary ? Primary('light') : Secondary('light')};
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;

    &.start {
      margin-right: 0.3rem;
    }

    &.end {
      margin-left: 0.3rem;
    }
  }
`
);

interface ButtonIconProps {
  label?: string;
  icon?: ReactNode;
  iconPosition?: IconPosition;
  size?: ButtonSize;
  isPrimary?: boolean;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ButtonIcon = ({
  label = 'Click Me',
  icon = null,
  iconPosition = 'start',
  size = 'medium',
  isPrimary = false,
  handleClick,
}: ButtonIconProps) => {
  return (
    <Btn type='button' size={size} onClick={handleClick} $isPrimary={isPrimary}>
      {icon && ['left', 'start'].indexOf(iconPosition) > -1 ? (
        <span className='icon start'>{icon}</span>
      ) : (
        ''
      )}
      {label}
      {icon && ['right', 'end'].indexOf(iconPosition) > -1 ? (
        <span className='icon end'>{icon}</span>
      ) : (
        ''
      )}
    </Btn>
  );
};

export default ButtonIcon;
