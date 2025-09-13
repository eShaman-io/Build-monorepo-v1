module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint","import","unused-imports"],
  extends: ["eslint:recommended","plugin:@typescript-eslint/recommended","prettier"],
  rules: {
    "unused-imports/no-unused-imports":"error",
    "import/order":["error",{"newlines-between":"always"}],
    "@typescript-eslint/no-explicit-any":"warn"
  }
}
