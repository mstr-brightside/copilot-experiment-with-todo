export default {
  "*.{ts,tsx}": [
    () => "tsc -p tsconfig.json --noEmit",
    "eslint --fix",
    "prettier --write"
  ]
};
