import gendiff from '../src/index.js';
import path from 'path';
import fs from 'fs';

const getFixturesPath = (filename) => path.resolve('__fixtures__', filename);
const result = fs.readFileSync(getFixturesPath('result.txt'), 'utf-8').trim();

test('gendiff', () => {
  expect(gendiff(
    getFixturesPath('file1.json').trim(), getFixturesPath('file2.json'))
  ).toEqual(result);
})