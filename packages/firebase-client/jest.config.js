module.exports = {
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      babelConfig: {
        presets: [
          ['@babel/preset-env', {targets: {node: 'current'}}],
          '@babel/preset-typescript',
          ['@babel/preset-react', {runtime: 'automatic'}],
        ],
        plugins: [
          '@babel/plugin-transform-private-methods',
          '@babel/plugin-transform-class-properties',
        ],
      },
    }],
    '^.+\\.(js|jsx)$': ['babel-jest', {
      presets: [
        ['@babel/preset-env', {targets: {node: 'current'}}],
        ['@babel/preset-react', {runtime: 'automatic'}],
      ],
      plugins: [
        '@babel/plugin-transform-private-methods',
        '@babel/plugin-transform-class-properties',
      ],
    }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  transformIgnorePatterns: [
    '/node_modules/(?!react-native)/',
  ],
  globals: {
    __DEV__: true,
  },
  moduleNameMapper: {
    "^(.*)\\.js$": "$1",
  },
};
