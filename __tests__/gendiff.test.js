import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { expect, test } from '@jest/globals';

import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturesPath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);
const result = fs.readFileSync(getFixturesPath('result.txt'), 'utf-8').trim();

test('gendiff for nested structures', () => {
  const fileJsonPath1 = getFixturesPath('file1.json');
  const fileJsonPath2 = getFixturesPath('file2.json');
  const fileYamlPath1 = getFixturesPath('file1.yaml');
  const fileYamlPath2 = getFixturesPath('file2.yaml');
  const fileYmlPath1 = getFixturesPath('file1.yml');
  const fileYmlPath2 = getFixturesPath('file2.yml');

  expect(gendiff(fileJsonPath1, fileJsonPath2)).toEqual(result);
  expect(gendiff(fileYmlPath1, fileYmlPath2)).toEqual(result);
  expect(gendiff(fileYamlPath1, fileYamlPath2)).toEqual(result);
});
