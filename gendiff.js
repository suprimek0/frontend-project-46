#!/usr/bin/env node

import { program } from 'commander';
import parse from './src/parser.js';
import compare from './src/comparator.js';
import stylish from './src/formatters/stylish.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format (stylish is default)', 'stylish');

program.action((filepath1, filepath2, options) => {
  try {
    const data1 = parse(filepath1);
    const data2 = parse(filepath2);
    const differences = compare(data1, data2);

    let output;
    switch (options.format) {
      case 'stylish':
        output = stylish(differences);
        break;
      case 'json':
        output = JSON.stringify(differences, null, 2);
        break;
      default:
        output = `Unsupported format: ${options.format}`;
    }

    console.log(output);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
});

program.parse();