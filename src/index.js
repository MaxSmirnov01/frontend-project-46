import fs from 'fs';
import path from 'path';
import buildTree from './buildTree.js';
import parse from './parsers.js';
import outputFormat from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1Data = fs.readFileSync(path.resolve(process.cwd(), filepath1), 'utf-8');
  const file2Data = fs.readFileSync(path.resolve(process.cwd(), filepath2), 'utf-8');

  const extension1 = path.extname(filepath1);
  const extension2 = path.extname(filepath2);

  const obj1 = parse(file1Data, extension1);
  const obj2 = parse(file2Data, extension2);

  const diffTree = buildTree(obj1, obj2);
  const str = outputFormat(diffTree, formatName);

  return str;
};

export default genDiff;
