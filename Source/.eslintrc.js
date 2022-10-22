// Unlike the rest of the project, this file uses double quotes instead of backticks, because ESLint
// expects the former for the rules.
module.exports = {
  env: {
    // Use EMCAScript6 features.
    es6: true,
    // Use Node.js features.
    node: true,
  },
  // Use the recommended ruleset as a base.
  extends: "eslint:recommended",
  rules: {
    // These are organized by the order in which they appear in the ESLint docs.

    //
    // Best Practices

    // Warn about empty return values.
    "consistent-return": "warn",
    // Require type-safe comparisons.
    eqeqeq: "error",
    // Warn about unused expressions.
    "no-unused-expressions": "warn",

    //
    // Stylistic Issues

    // Style: Use 2 levels of indentation, throw error otherwise..
    indent: ["error", 2],
    // Consistency: Use template literals, throw error otherwise.
    quotes: ["error", "backtick"],
    // Style: Use no more than 100 lines.
    "max-len": ["error", 100],
    // Style: Use spaces only.
    "no-tabs": "error",
    // Use semicolons.
    semi: "error",

    //
    // EMCAScript 6

    // Use const when possible.
    "prefer-const": "warn",
  },
};
