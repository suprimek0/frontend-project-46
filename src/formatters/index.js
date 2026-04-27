
import stylish from './stylish.js';
import plain from './plain.js';

const getFormatter = (formatName = 'stylish') => {
  const formatters = {
    stylish,
    plain,
  };

  if (!formatters[formatName]) {
    throw new Error(`Unsupported format: ${formatName}`);
  }

  return formatters[formatName];
};

export default getFormatter;