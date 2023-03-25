import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('Difference between 2 flat JSON', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const result = readFile('expectedStylishFile.txt');
  expect(genDiff(filepath1, filepath2)).toEqual(result);
});

test('Difference between 2 flat yaml/yml', () => {
  const filepath1 = getFixturePath('file1.yaml');
  const filepath2 = getFixturePath('file2.yml');
  const result = readFile('expectedStylishFile.txt');
  expect(genDiff(filepath1, filepath2)).toEqual(result);
});

test('Difference between 2 nested JSON/YAML files in a stylish format', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.yml');
  const result = readFile('expectedStylishFile.txt');
  expect(genDiff(filepath1, filepath2)).toEqual(result);
});

test('Difference between 2 nested JSON files in a plain format', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const result = readFile('expectedPlainFile.txt');
  expect(genDiff(filepath1, filepath2, 'plain')).toEqual(result);
});

test('Difference between 2 nested JSON/YAML files in a plain format', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.yml');
  const result = readFile('expectedPlainFile.txt');
  expect(genDiff(filepath1, filepath2, 'plain')).toEqual(result);
});

test('Difference between 2 nested JSON/YAML files in a json format', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.yml');
  const result = readFile('expectedJsonFile.txt');
  expect(genDiff(filepath1, filepath2, 'json')).toEqual(result);
});
