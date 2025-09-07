module.exports = {
  root: true,
  extends: ["../../configs/eslint.config.js"],
  overrides: [
    {
      files: ["*.config.js", ".eslintrc.js"],
      env: {
        node: true,
      },
    },
  ],
};
