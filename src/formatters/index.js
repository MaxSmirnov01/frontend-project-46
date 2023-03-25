import stylish from './stylish.js';
import plain from './plain.js';

const outputFormat = (diffTree, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(diffTree);
    case 'plain':
      return plain(diffTree);
    default:
      throw new Error(`${formatName} is undefined`);
  }
};

export default outputFormat;
