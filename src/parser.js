// src/parser.js
import fs from 'fs';
import path from 'path';

const parse = (filePath) => {
  const absolutePath = path.resolve(process.cwd(), filePath);
  const fileContent = fs.readFileSync(absolutePath, 'utf-8');
  const extension = path.extname(absolutePath).toLowerCase();

  switch (extension) {
    case '.json':
      return JSON.parse(fileContent);
    default:
      throw new Error(`Unsupported file format: ${extension}`);
  }
};

export default parse;
