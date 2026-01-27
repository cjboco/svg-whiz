import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Primary, Secondary } from '../components/Colors';

const Btn = styled.button(
  ({ size, data }) => `
  display: ${data?.isHidden ? 'none' : 'inline-block'};
  appearance: none;
  border: 0;
  border-radius: .5rem;
  padding: ${
    size === 'small' ? '0.5rem 1.35rem' : size === 'large' ? '0.75rem 2.15rem' : '0.65rem 1.85rem'
  };
  background-color: ${data?.isPrimary ? Primary('default') : Secondary('default')};
  color: white;
  font-size: ${size === 'small' ? '1rem' : size === 'large' ? '1.75rem' : '1.25rem'};
  transition: all 0.15s linear;

  &:hover {
    background-color: ${data?.isPrimary ? Primary('dark') : Secondary('dark')};
  }

  &:active {
    background-color: ${data?.isPrimary ? Primary('light') : Secondary('light')};
  }
`
);

const Button = ({
  label = 'Click Me',
  size = 'medium',
  isPrimary = false,
  isHidden = false,
  handleClick,
}) => {
  return (
    <Btn
      size={size}
      onClick={handleClick}
      data={{
        isPrimary,
        isHidden,
      }}
    >
      {label}
    </Btn>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  isPrimary: PropTypes.bool,
  isHidden: PropTypes.bool,
  handleClick: PropTypes.func,
};

export default Button;
