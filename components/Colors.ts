// https://www.npmjs.com/package/color
import Color from 'color';

type ColorVersion = 'default' | 'dark' | 'light';

const Colors = {
  primary: '#ad1cea',
  secondary: '#b3bcbf',
  success: '#00C851',
  warning: '#ffbb33',
  danger: '#ff4444',
  info: '#33b5e5',
  dark: '#2e2e2e',
  light: '#dedede',
} as const;

const DarkenAmount = 0.15;
const LightenAmount = 0.15;

export const Primary = (version?: ColorVersion, opacity = 1.0): string => {
  const color = Color(Colors.primary);
  return version === 'dark'
    ? color.lighten(DarkenAmount).alpha(opacity).rgb().string()
    : version === 'light'
      ? color.darken(LightenAmount).alpha(opacity).rgb().string()
      : color.alpha(opacity).rgb().string();
};

export const Secondary = (version?: ColorVersion, opacity = 1.0): string => {
  const color = Color(Colors.secondary);
  return version === 'dark'
    ? color.lighten(DarkenAmount).alpha(opacity).rgb().string()
    : version === 'light'
      ? color.darken(LightenAmount).alpha(opacity).rgb().string()
      : color.alpha(opacity).rgb().string();
};

export const Success = (version?: ColorVersion, opacity = 1.0): string => {
  const color = Color(Colors.success);
  return version === 'dark'
    ? color.lighten(DarkenAmount).alpha(opacity).rgb().string()
    : version === 'light'
      ? color.darken(LightenAmount).alpha(opacity).rgb().string()
      : color.alpha(opacity).rgb().string();
};

export const Warning = (version?: ColorVersion, opacity = 1.0): string => {
  const color = Color(Colors.warning);
  return version === 'dark'
    ? color.lighten(DarkenAmount).alpha(opacity).rgb().string()
    : version === 'light'
      ? color.darken(LightenAmount).alpha(opacity).rgb().string()
      : color.alpha(opacity).rgb().string();
};

export const Danger = (version?: ColorVersion, opacity = 1.0): string => {
  const color = Color(Colors.danger);
  return version === 'dark'
    ? color.lighten(DarkenAmount).alpha(opacity).rgb().string()
    : version === 'light'
      ? color.darken(LightenAmount).alpha(opacity).rgb().string()
      : color.alpha(opacity).rgb().string();
};

export const Info = (version?: ColorVersion, opacity = 1.0): string => {
  const color = Color(Colors.info);
  return version === 'dark'
    ? color.lighten(DarkenAmount).alpha(opacity).rgb().string()
    : version === 'light'
      ? color.darken(LightenAmount).alpha(opacity).rgb().string()
      : color.alpha(opacity).rgb().string();
};

export const Dark = (version?: ColorVersion, opacity = 1.0): string => {
  const color = Color(Colors.dark);
  return version === 'dark'
    ? color.lighten(DarkenAmount).alpha(opacity).rgb().string()
    : version === 'light'
      ? color.darken(LightenAmount).alpha(opacity).rgb().string()
      : color.alpha(opacity).rgb().string();
};

export const Light = (version?: ColorVersion, opacity = 1.0): string => {
  const color = Color(Colors.light);
  return version === 'dark'
    ? color.lighten(DarkenAmount).alpha(opacity).rgb().string()
    : version === 'light'
      ? color.darken(LightenAmount).alpha(opacity).rgb().string()
      : color.alpha(opacity).rgb().string();
};

export default Secondary;
