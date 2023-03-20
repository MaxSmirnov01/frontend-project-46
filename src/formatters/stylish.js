const getFormatterContent = (diffTree, replacer = ' ', spacesCount = 1) => {
  const indent = replacer.repeat(spacesCount);
  const result = diffTree.flatMap((item) => {
    switch (item.type) {
      case 'deleted':
        return `${indent}- ${item.key}: ${item.value}`;
      case 'added':
        return `${indent}+ ${item.key}: ${item.value}`;
      case 'unchanged':
        return `${indent}  ${item.key}: ${item.value}`;
      case 'updated':
        return [`${indent}- ${item.key}: ${item.value1}`, `${indent}+ ${item.key}: ${item.value2}`];
      default:
        throw new Error(`undefined ${item.type}`);
    }
  });
  return `{\n${result.join('\n')}\n}`;
};

export default getFormatterContent;
