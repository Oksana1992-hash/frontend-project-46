import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { describe, expect, test } from '@jest/globals';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturesPath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);

const casesFormats = ['json', 'yaml', 'yml'];

describe.each(casesFormats)('main functionality for %s format', (format) => {
  const filePath1 = getFixturesPath(`file1.${format}`);
  const filePath2 = getFixturesPath(`file2.${format}`);

  const stylishDiff = fs.readFileSync(getFixturesPath('stylish.txt'), 'utf-8').trim();
  const plainDiff = fs.readFileSync(getFixturesPath('plain.txt'), 'utf-8').trim();
  const jsonDiff = fs.readFileSync(getFixturesPath('json.txt'), 'utf-8').trim();

  test('generates correct diff in default style (stylish)', () => {
    expect(gendiff(filePath1, filePath2)).toEqual(stylishDiff);
  });

  test('generates correct diff in plain format', () => {
    expect(gendiff(filePath1, filePath2, 'plain')).toEqual(plainDiff);
  });

  test('generates correct diff in json format', () => {
    expect(gendiff(filePath1, filePath2, 'json')).toEqual(jsonDiff);
  });

  const noChangesStylishResult = fs.readFileSync(getFixturesPath('noChangesStylishResult.txt'), 'utf-8').trim();
  const noChangesPlainResult = fs.readFileSync(getFixturesPath('noChangesPlainResult.txt'), 'utf-8').trim();
  const noChangesJsonResult = fs.readFileSync(getFixturesPath('noChangesJsonResult.txt'), 'utf-8').trim();

  test('no differences for identical files - stylish', () => {
    expect(gendiff(filePath1, filePath1)).toEqual(noChangesStylishResult);
  });

  test('no differences for identical files - plain', () => {
    expect(gendiff(filePath1, filePath1, 'plain')).toEqual(noChangesPlainResult);
  });

  test('no differences for identical files - json', () => {
    expect(gendiff(filePath1, filePath1, 'json')).toEqual(noChangesJsonResult);
  });
});

test('throws error if file does not exist', () => {
  expect(() => gendiff('nonexistent1.json', 'nonexistent2.json')).toThrow();
});

test('throws error for unsupported file extension', () => {
  const unsupportedFilePath = getFixturesPath('unsupported.txt');

  expect(() => gendiff(unsupportedFilePath, unsupportedFilePath)).toThrow('unknow extension');
});

test('testing "The specified format is not supported"', () => {
  expect(() => {
    gendiff(getFixturesPath('file1.json'), getFixturesPath('file2.json'), 'txt');
  }).toThrow('txt is not support');
});
