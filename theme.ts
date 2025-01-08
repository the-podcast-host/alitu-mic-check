import { defineConfig, createSystem, defaultConfig } from '@chakra-ui/react';

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        text: { value: '#455265' },
        'text-light': { value: '#505E71' },
        purple: {
          50: { value: '#F1E7FD' },
          100: { value: '#DAC5FA' },
          200: { value: '#C19EF7' },
          300: { value: '#A874F5' },
          400: { value: '#9352F2' },
          500: { value: '#7B2BEE' },
          600: { value: '#7126E7' },
          700: { value: '#601BDF' },
          800: { value: '#5012D9' },
          900: { value: '#2F00D1' },
        },
      },
      fonts: {
        heading: { value: 'Montserrat Variable' },
        body: { value: 'Montserrat Variable' },
      },
    },
  },
});

export default createSystem(defaultConfig, config);
