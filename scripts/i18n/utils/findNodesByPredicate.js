import ts from 'typescript';

/**
 * Finds all nodes in the TypeScript program.
 * @param {ts.Node} node - The Node to use as starting point.
 * @param {(node: ts.Node) => boolean} predicate - The predciate to match.
 * @returns {ts.Node[]} An array of nodes matching the specified kind.
 */
export const findNodesByPredicate = (node, predicate) => {
  const result = [];

  traverseNode(node, predicate, result);

  return result;
};

/**
 * Recursively traverses the AST starting from the given node and collects nodes of the specified kind.
 * @param {ts.Node} node - The current AST node being visited.
 * @param {(node: ts.Node) => boolean} predicate - The predciate to match.
 * @param {ts.Node[]} result - An array to store the collected nodes.
 * @returns {void}
 */
function traverseNode(node, predicate, result) {
  if (predicate(node)) {
    result.push(node);
  }

  ts.forEachChild(node, (childNode) =>
    traverseNode(childNode, predicate, result)
  );
}
