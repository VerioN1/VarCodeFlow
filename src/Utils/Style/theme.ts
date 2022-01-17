import { ThemeConfig, extendTheme } from '@chakra-ui/react';
import styles from './costumGlobal';

const colorModeConfig: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({
  colors: {
    brand: {
      100: '#5aa6de',
      900: '#1a202c',
    },
  },
  colorModeConfig,
  styles,
});
export default theme;
