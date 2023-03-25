import _ from 'lodash';

const getCurrectIndentStringify = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat(depth * spacesCount);
const getCurrectIndentStylish = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat(depth * spacesCount - 2);
const getbracketIndent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat(depth * spacesCount - spacesCount);

const stringify = (value, depth) => {
  const iter = (currentValue, inDepth) => {
    if (!_.isObject(currentValue)) {
      return currentValue;
    }

    const currentIndent = getCurrectIndentStringify(inDepth);
    const bracketIndent = getbracketIndent(inDepth);
    const lines = Object.entries(currentValue).map(([key, val]) => `${currentIndent}${key}: ${iter(val, inDepth + 1)}`);

    return `{\n${lines.join('\n')}\n${bracketIndent}}`;
  };

  return iter(value, depth);
};

const stylish = (diffTree) => {
  const iter = (currentDiffTree, depth) => {
    const currentIndent = getCurrectIndentStylish(depth);
    const bracketIndent = getbracketIndent(depth);
    const result = currentDiffTree.flatMap((item) => {
      switch (item.type) {
        case 'deleted':
          return `${currentIndent}- ${item.key}: ${stringify(item.value, depth + 1)}`;
        case 'added':
          return `${currentIndent}+ ${item.key}: ${stringify(item.value, depth + 1)}`;
        case 'unchanged':
          return `${currentIndent}  ${item.key}: ${stringify(item.value, depth + 1)}`;
        case 'updated':
          return [
            `${currentIndent}- ${item.key}: ${stringify(item.value1, depth + 1)}`,
            `${currentIndent}+ ${item.key}: ${stringify(item.value2, depth + 1)}`,
          ];
        case 'nested':
          return `${currentIndent}  ${item.key}: ${iter(item.children, depth + 1)}`;
        default:
          throw new Error(`${item.type} is undefined`);
      }
    });

    return `{\n${result.join('\n')}\n${bracketIndent}}`;
  };

  return iter(diffTree, 1);
};

export default stylish;
