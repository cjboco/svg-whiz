// https://www.npmjs.com/package/color
import Color from 'color';

const Colors = {
  primary: '#ad1cea',
  secondary: '#b3bcbf',
  success: '#00C851',
  warning: '#ffbb33',
  danger: '#ff4444',
  info: '#33b5e5',
  dark: '#2e2e2e',
  light: '#dedede',
};

const DarkenAmount = 0.15;
const LightenAmount = 0.15;

export const Primary = (version, opacity = 1.0) => {
  const color = Color(Colors.primary);
  return version === 'dark'
    ? color.lighten(DarkenAmount).alpha(opacity).rgb()
    : version === 'light'
    ? color.darken(LightenAmount).alpha(opacity).rgb()
    : color.alpha(opacity).rgb();
};

export const Secondary = (version, opacity = 1.0) => {
  const color = Color(Colors.secondary);
  return version === 'dark'
    ? color.lighten(DarkenAmount).alpha(opacity).rgb()
    : version === 'light'
    ? color.darken(LightenAmount).alpha(opacity).rgb()
    : color.alpha(opacity).rgb();
};

export const Success = (version, opacity = 1.0) => {
  const color = Color(Colors.success);
  return version === 'dark'
    ? color.lighten(DarkenAmount).alpha(opacity).rgb()
    : version === 'light'
    ? color.darken(LightenAmount).alpha(opacity).rgb()
    : color.alpha(opacity).rgb();
};

export const Warning = (version, opacity = 1.0) => {
  const color = Color(Colors.warning);
  return version === 'dark'
    ? color.lighten(DarkenAmount).alpha(opacity).rgb()
    : version === 'light'
    ? color.darken(LightenAmount).alpha(opacity).rgb()
    : color.alpha(opacity).rgb();
};

export const Danger = (version, opacity = 1.0) => {
  const color = Color(Colors.danger);
  return version === 'dark'
    ? color.lighten(DarkenAmount).alpha(opacity).rgb()
    : version === 'light'
    ? color.darken(LightenAmount).alpha(opacity).rgb()
    : color.alpha(opacity).rgb();
};

export const Info = (version, opacity = 1.0) => {
  const color = Color(Colors.info);
  return version === 'dark'
    ? color.lighten(DarkenAmount).alpha(opacity).rgb()
    : version === 'light'
    ? color.darken(LightenAmount).alpha(opacity).rgb()
    : color.alpha(opacity).rgb();
};

export const Dark = (version, opacity = 1.0) => {
  const color = Color(Colors.dark);
  return version === 'dark'
    ? color.lighten(DarkenAmount).alpha(opacity).rgb()
    : version === 'light'
    ? color.darken(LightenAmount).alpha(opacity).rgb()
    : color.alpha(opacity).rgb();
};

export const Light = (version, opacity = 1.0) => {
  const color = Color(Colors.light);
  return version === 'dark'
    ? color.lighten(DarkenAmount).alpha(opacity).rgb()
    : version === 'light'
    ? color.darken(LightenAmount).alpha(opacity).rgb()
    : color.alpha(opacity).rgb();
};

export default Secondary;
