const common = require(`../common.js.js.js.js.js.js`);

module.exports = {
  meta: { fixable: `code` },
  create(context) {
    return {
      Identifier: function (node) {
        if (node.parent.type !== `VariableDeclarator`) return;

        // skip declarations of variables to arrow functions
        if (node.parent.init.type === `ArrowFunctionExpression`) return;

        const source_code = context.getSourceCode();
        const variable_name = source_code.getText(node);
        if (
          !new RegExp(
            `${common.snake_case_regex}|${common.upper_camel_case_regex}`,
            `g`
          ).test(variable_name)
        ) {
          context.report({
            node: node,
            message: `Variable '{{name}}' is not in snake case.`,
            data: { name: node.name },
            fix: function (original_fixer) {
              const new_variable_name = variable_name.replace(
                /[A-Z]/g,
                (match) => `_` + match.toLowerCase()
              );

              return common.MakeVariableNameFixers(
                original_fixer,
                source_code.getText(),
                variable_name,
                new_variable_name
              );
            },
          });
        }
      },
    };
  },
};