import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const format = (differences, formatName = 'stylish') => {
  switch (formatName) {
    case 'stylish':
      return stylish(differences);
    case 'plain':
      return plain(differences);
    case 'json':
      return json(differences);
    default:
      throw new Error(`Unsupported format: ${formatName}`);
  }
};

export default format;