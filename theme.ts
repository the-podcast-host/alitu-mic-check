import { defineConfig, createSystem, defaultConfig } from '@chakra-ui/react';

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        purple: { value: '#7B2BEE' },
      },
      fonts: {
        heading: { value: 'Montserrat Variable' },
        body: { value: 'Montserrat Variable' },
      },
    },
  },
});

export default createSystem(defaultConfig, config);
