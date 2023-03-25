import _ from 'lodash';

const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (diffTree) => {
  const iter = (currentDiffTree, ancestry) => {
    const result = currentDiffTree.map((item) => {
      const newAncestry = ancestry === '' ? `${item.key}` : `${ancestry}.${item.key}`;
      switch (item.type) {
        case 'deleted':
          return `Property '${newAncestry}' was removed`;
        case 'added':
          return `Property '${newAncestry}' was added with value: ${getValue(item.value)}`;
        case 'unchanged':
          return null;
        case 'updated':
          return `Property '${newAncestry}' was updated. From ${getValue(item.value1)} to ${getValue(item.value2)}`;
        case 'nested':
          return `${iter(item.children, newAncestry)}`;
        default:
          throw new Error(`${item.type} is undefined`);
      }
    });
    return result.filter((item) => item !== null).join('\n');
  };
  return iter(diffTree, '');
};

export default plain;
