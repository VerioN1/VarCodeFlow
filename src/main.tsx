import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import extendedTheme from './Utils/Style/theme';
import { store } from './Redux/store';
import AppWrapper from './AppWrapper';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ColorModeScript initialColorMode={extendedTheme.colorModeConfig.initialColorMode} />
      <ChakraProvider theme={extendedTheme}>
        <AppWrapper />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
