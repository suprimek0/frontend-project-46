
const plain = (differences) => {
  const lines = [];

  const iter = (diffs, path = '') => {
    diffs.forEach((diff) => {
      const currentPath = path ? `${path}.${diff.key}` : diff.key;

      switch (diff.type) {
        case 'added':
          lines.push(`Property '${currentPath}' was added with value: ${formatValue(diff.value)}`);
          break;
        case 'removed':
          lines.push(`Property '${currentPath}' was removed`);
          break;
        case 'changed':
          lines.push(`Property '${currentPath}' was updated. From ${formatValue(diff.oldValue)} to ${formatValue(diff.newValue)}`);
          break;
        case 'nested':
          iter(diff.children, currentPath);
          break;
        case 'unchanged':
          // Игнорируем неизменённые свойства в plain-формате
          break;
        default:
          throw new Error(`Unknown difference type: ${diff.type}`);
      }
    });
  };

  iter(differences);
  return lines.join('\n');
};

const formatValue = (value) => {
  if (value === null) return 'null';
  if (typeof value === 'object' && value !== null) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return String(value);
};

export default plain;