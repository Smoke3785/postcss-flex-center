/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = () => {
  return {
    postcssPlugin: "postcss-flex-center",
    Declaration(decl) {
      if (decl.prop === "display" && decl.value === "flex-center") {
        // Replace with a standard flex display
        decl.value = "flex";

        let hasJustifyContent = false;
        let hasAlignItems = false;

        // Check if the parent rule already defines justify-content or align-items
        decl.parent.walkDecls((d) => {
          if (d.prop === "justify-content") {
            hasJustifyContent = true;
          }
          if (d.prop === "align-items") {
            hasAlignItems = true;
          }
        });

        // If not already set, add justify-content: center;
        if (!hasJustifyContent) {
          decl.parent.insertAfter(decl, {
            prop: "justify-content",
            value: "center",
          });
        }
        // If not already set, add align-items: center;
        if (!hasAlignItems) {
          decl.parent.insertAfter(decl, {
            prop: "align-items",
            value: "center",
          });
        }
      }
    },
  };
};

module.exports.postcss = true;
