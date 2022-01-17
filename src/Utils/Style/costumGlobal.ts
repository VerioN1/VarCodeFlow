import { mode } from '@chakra-ui/theme-tools';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Dict } from '@chakra-ui/utils';

const styles = {
  global: (props: Dict<any>) => ({
    body: {
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('white', '#141214')(props),
    },
  }),
};
export default styles;
