import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const outputFormat = (diffTree, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(diffTree);
    case 'plain':
      return plain(diffTree);
    case 'json':
      return json(diffTree);
    default:
      throw new Error(`${formatName} is undefined`);
  }
};

export default outputFormat;
