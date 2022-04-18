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

export const Primary = (version) => {
  const color = Color(Colors.primary);
  return version === 'dark'
    ? color.lighten(DarkenAmount).hex()
    : version === 'light'
    ? color.darken(LightenAmount).hex()
    : color.hex();
};

export const Secondary = (version) => {
  const color = Color(Colors.secondary);
  return version === 'dark'
    ? color.lighten(DarkenAmount).hex()
    : version === 'light'
    ? color.darken(LightenAmount).hex()
    : color.hex();
};

export const Success = (version) => {
  const color = Color(Colors.success);
  return version === 'dark'
    ? color.lighten(DarkenAmount).hex()
    : version === 'light'
    ? color.darken(LightenAmount).hex()
    : color.hex();
};

export const Warning = (version) => {
  const color = Color(Colors.warning);
  return version === 'dark'
    ? color.lighten(DarkenAmount).hex()
    : version === 'light'
    ? color.darken(LightenAmount).hex()
    : color.hex();
};

export const Danger = (version) => {
  const color = Color(Colors.danger);
  return version === 'dark'
    ? color.lighten(DarkenAmount).hex()
    : version === 'light'
    ? color.darken(LightenAmount).hex()
    : color.hex();
};

export const Info = (version) => {
  const color = Color(Colors.info);
  return version === 'dark'
    ? color.lighten(DarkenAmount).hex()
    : version === 'light'
    ? color.darken(LightenAmount).hex()
    : color.hex();
};

export const Dark = (version) => {
  const color = Color(Colors.dark);
  return version === 'dark'
    ? color.lighten(DarkenAmount).hex()
    : version === 'light'
    ? color.darken(LightenAmount).hex()
    : color.hex();
};

export const Light = (version) => {
  const color = Color(Colors.light);
  return version === 'dark'
    ? color.lighten(DarkenAmount).hex()
    : version === 'light'
    ? color.darken(LightenAmount).hex()
    : color.hex();
};

export default Secondary;
