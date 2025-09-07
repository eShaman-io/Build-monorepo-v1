import { mergeConfig } from 'vite';

/** @type {import('vite').UserConfig} */
export default {
  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          'react-native': 'react-native-web',
        },
      },
    });
  },
};
