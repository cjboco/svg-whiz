import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Primary, Secondary } from '../components/Colors';

const Btn = styled.button(
  ({ size, isPrimary }) => `
  display: inline-flex;
  align-items: center;
  appearance: none;
  border: 0;
  border-radius: .5rem;
  padding: ${
    size === 'small' ? '0.5rem 1.35rem' : size === 'large' ? '0.75rem 2.15rem' : '0.65rem 1.85rem'
  };
  background-color: ${isPrimary ? Primary('default') : Secondary('default')};
  color: white;
  font-size: ${size === 'small' ? '0.85rem' : size === 'large' ? '1.2rem' : '1rem'};
  transition: all 0.15s linear;

  &:hover {
    background-color: ${isPrimary ? Primary('dark') : Secondary('dark')};
  }

  &:active {
    background-color: ${isPrimary ? Primary('light') : Secondary('light')};
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

const ButtonIcon = ({
  label = 'Click Me',
  icon = null,
  iconPosition = 'start',
  size = 'medium',
  isPrimary = false,
  handleClick,
}) => {
  return (
    <Btn type='button' size={size} onClick={handleClick} isPrimary={isPrimary}>
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

ButtonIcon.PropTypes = {
  label: PropTypes.string,
  icon: PropTypes.elementType,
  iconPosition: PropTypes.oneOf(['left', 'start', 'right', 'end']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  isPrimary: PropTypes.bool,
  handleClick: PropTypes.func,
};

export default ButtonIcon;
