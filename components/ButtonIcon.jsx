import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = ({ label, icon, iconPosition, size, handleClick }) => {
  const Btn = styled.button(({ size }) => `
    display: inline-flex;
    align-items: center;
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
  `);


  return <Btn type="button" size={size} onClick={handleClick}>{icon && ['left','start'].indexOf(iconPosition) > -1 ? <span className="icon start">{icon}</span> : ''}{label}{icon && ['right','end'].indexOf(iconPosition) > -1 ? <span className="icon end">{icon}</span> : ''}</Btn>;
}

Button.PropTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  iconPosition: PropTypes.oneOf(['left','start','right','end']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  handleClick: PropTypes.func.isRequired
}

Button.defaultProps = {
  label: 'Button',
  icon: '',
  iconPosition: 'start',
  size: 'medium',
  handleClick: null
}

export default Button;

