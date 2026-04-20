#!/usr/bin/env node

import { program } from 'commander';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format');

/* Временный обработчик для аргументов и опций. Проверка работоспособности утилиты на принятие двух аргументов.
program.action((filepath1, filepath2) => {
  const options = program.opts();
  console.log('File 1:', filepath1);
  console.log('File 2:', filepath2);
  console.log('Format:', options.format || 'default');
});
*/


program.parse();
