import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = ({ label = 'Button', size = 'medium', handleClick }) => {
  const Btn = styled.button(({ size }) => `
    display: block;
    appearance: none;
    border: 0;
    border-radius: .5rem;
    padding: ${size === 'small' ? '0.5rem 1.35rem' : size === 'large' ? '0.75rem 2.15rem' : '0.65rem 1.85rem'};
    background-color: #b3bcbf;
    color: white;
    font-size: ${size === 'small' ? '0.85rem' : size === 'large' ? '1.2rem' : '1rem'};
    transition: all 0.15s linear;

    &:hover {
      background-color: #c8d2d5;
    }

    &:active {
      background-color: #a8b0b3;
    }
  `);

  return <Btn size={size} onClick={handleClick}>{label}</Btn>;
}

Button.propTypes = {
  label: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  handleClick: PropTypes.func
}

export default Button;

