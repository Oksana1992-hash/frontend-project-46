import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { expect, test } from '@jest/globals';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturesPath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);

describe('formatters', () => {
  const fileJsonPath1 = getFixturesPath('file1.json');
  const fileJsonPath2 = getFixturesPath('file2.json');
  const fileYamlPath1 = getFixturesPath('file1.yaml');
  const fileYamlPath2 = getFixturesPath('file2.yaml');
  const fileYmlPath1 = getFixturesPath('file1.yml');
  const fileYmlPath2 = getFixturesPath('file2.yml');

  const stylishDiff = fs.readFileSync(getFixturesPath('stylish.txt'), 'utf-8').trim();
  const plainDiff = fs.readFileSync(getFixturesPath('plain.txt'), 'utf-8').trim();

  test('gendiff for nested structures with output "stylish"', () => {
    expect(gendiff(fileJsonPath1, fileJsonPath2)).toEqual(stylishDiff);
    expect(gendiff(fileYmlPath1, fileYmlPath2)).toEqual(stylishDiff);
    expect(gendiff(fileYamlPath1, fileYamlPath2)).toEqual(stylishDiff);
  });

  test('gendiff for nested structures with output "plain"', () => {
    expect(gendiff(fileJsonPath1, fileJsonPath2, 'plain')).toEqual(plainDiff);
    expect(gendiff(fileYmlPath1, fileYmlPath2, 'plain')).toEqual(plainDiff);
    expect(gendiff(fileYamlPath1, fileYamlPath2, 'plain')).toEqual(plainDiff);
  });
});
