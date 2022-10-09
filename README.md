# tp-lint
`tp-lint` is a plugin for the [ESLint](https://eslint.org/) JavaScript linting utility. It introduces rules that add more naming conventions for variables, functions, classes, and methods.

## Setup
1. Open up a terminal or command prompt in the project to lint.
2. Follow the instructions to install ESLint [here](https://eslint.org/docs/user-guide/getting-started#installation-and-usage).
3. Install `@developpement/tp-lint` with the [NPM](https://www.npmjs.com/) package manager:
```bash
npm install @developpement/tp-lint
```
4. Follow the instructions to add the plugin to your configuration file [here](https://eslint.org/docs/user-guide/configuring#configuring-plugins).
5. Follow the instructions to add the [plugin rules](#rules) to your configuration file [here](https://eslint.org/docs/user-guide/configuring#configuring-rules).

Then configure the rules you want to use under the rules section.

## Rules
All rules support fixing errors automatically.

### `snake-case-variables`
`snake-case-variables` ensures that all variables defined are in snake case, consisting of all lower case letters, with words separated by underscores (`_`s).

Good:
- `variable_name`
- `variable`
- `CONSTANT_NAME`
- `ClassName` (For when the old class syntax is used for defining a class.)

Bad:
- `variableName`

### `camel-case-functions`
`camel-case-functions` ensures that all functions, classes, and methods defined are in camel case, consisting of lower and upper case letters, with words separated by the letter changing to upper case.

Good:
- `variableName`
- `variable`

Bad:
- `variable_name`