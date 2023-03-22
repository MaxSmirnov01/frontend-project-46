import fs from 'fs';
import path from 'path';
import buildTree from './buildTree.js';
import getFormatterContent from './formatters/stylish.js';
import parse from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const file1Data = fs.readFileSync(path.resolve(process.cwd(), filepath1), 'utf-8');
  const file2Data = fs.readFileSync(path.resolve(process.cwd(), filepath2), 'utf-8');

  const format1 = path.extname(filepath1);
  const format2 = path.extname(filepath2);

  const obj1 = parse(file1Data, format1);
  const obj2 = parse(file2Data, format2);

  const diffTree = buildTree(obj1, obj2);
  const str = getFormatterContent(diffTree);

  return str;
};

export default genDiff;
