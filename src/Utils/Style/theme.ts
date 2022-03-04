import { ThemeConfig, extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import styles from './costumGlobal';

const colorModeConfig: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const breakpoints = createBreakpoints({
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
});
const theme = extendTheme({
  colors: {
    brand: {
      100: '#5aa6de',
      900: '#1a202c',
    },
  },
  colorModeConfig,
  styles,
  breakpoints,
});
export default theme;
