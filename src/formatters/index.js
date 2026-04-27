
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js'

const getFormatter = (formatName = 'stylish') => {
  const formatters = {
    stylish,
    plain,
    json,
  };

  if (!formatters[formatName]) {
    throw new Error(`Unsupported format: ${formatName}`);
  }

  return formatters[formatName];
};

export default getFormatter;