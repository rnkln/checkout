import ts from 'typescript';

/**
 * Check that a node is a CallExpression used by i18n.
 * @param {ts.Node} node - The Node to check.
 * @returns {node is ts.CallExpression}
 */
export const isI18nCallExpression = (node) =>
  ts.isCallExpression(node) &&
  ts.isIdentifier(node.expression) &&
  node.expression.text === 't';
