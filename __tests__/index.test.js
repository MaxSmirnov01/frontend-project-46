import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const stylishResult = readFile('expectedStylishFile.txt');
const plainResult = readFile('expectedPlainFile.txt');
const jsonResult = readFile('expectedJsonFile.txt');

const extensions = ['json', 'yml', 'yaml'];

test.each(extensions)('Difference between 2 files', (extension) => {
  const fileBefore = getFixturePath(`file1.${extension}`);
  const fileAfter = getFixturePath(`file2.${extension}`);

  expect(genDiff(fileBefore, fileAfter)).toEqual(stylishResult);
  expect(genDiff(fileBefore, fileAfter, 'stylish')).toEqual(stylishResult);
  expect(genDiff(fileBefore, fileAfter, 'plain')).toEqual(plainResult);
  expect(genDiff(fileBefore, fileAfter, 'json')).toEqual(jsonResult);
});
