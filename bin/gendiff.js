#!/usr/bin/env node

import { Command } from 'commander';
import app from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>', 'path to the first file')
  .argument('<filepath2>', 'path to the second file')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((a, b, options) => {
    console.log(app(a, b, options));
  });

program.parse();
