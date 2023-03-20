import fs from 'fs';
import path from 'path';
import buildTree from './buildTree.js';
import getFormatterContent from './formatters/stylish.js';

const genDiff = (filepath1, filepath2) => {
  const file1Data = fs.readFileSync(path.resolve(process.cwd(), filepath1), 'utf-8');
  const file2Data = fs.readFileSync(path.resolve(process.cwd(), filepath2), 'utf-8');

  const obj1 = JSON.parse(file1Data);
  const obj2 = JSON.parse(file2Data);

  const diffTree = buildTree(obj1, obj2);
  const str = getFormatterContent(diffTree);

  return str;
};

export default genDiff;
