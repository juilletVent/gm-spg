module.exports = {
  root: true,
  extends: ["airbnb-base", "eslint-config-prettify-base"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    "no-shadow": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "@typescript-eslint/no-unused-vars": ["warn"],
  },
};
