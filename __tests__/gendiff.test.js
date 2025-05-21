import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { expect, test } from '@jest/globals';

import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturesPath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);
const result = fs.readFileSync(getFixturesPath('result.txt'), 'utf-8').trim();

test('gendiff for flat json', () => {
  const filePath1 = getFixturesPath('file1.json');
  const filePath2 = getFixturesPath('file2.json');

  expect(gendiff(filePath1, filePath2)).toEqual(result);
});

test('gendiff for flat yaml', () => {
  const filePath1 = getFixturesPath('file1.yml');
  const filePath2 = getFixturesPath('file2.yml');

  expect(gendiff(filePath1, filePath2)).toEqual(result);
});
