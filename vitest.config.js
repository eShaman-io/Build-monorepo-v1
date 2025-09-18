const { defineConfig } = require('vitest/config');

module.exports = defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    coverage: {
      provider: 'v8',
    },
    server: {
        deps: {
          inline: [
            "react-native"
          ]
        }
      }
  },
});
