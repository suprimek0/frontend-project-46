const stylish = (differences) => {
  const iter = (diffs, depth) => {
    const lines = diffs.map((diff) => {
      switch (diff.type) {
        case 'added':
          return `${getIndent(depth)}+ ${diff.key}: ${stringifyValue(diff.value, depth + 1)}`;
        case 'removed':
          return `${getIndent(depth)}- ${diff.key}: ${stringifyValue(diff.value, depth + 1)}`;
        case 'unchanged':
          return `${getIndent(depth, false)}  ${diff.key}: ${stringifyValue(diff.value, depth + 1)}`;
        case 'changed':
          return [
            `${getIndent(depth)}- ${diff.key}: ${stringifyValue(diff.oldValue, depth + 1)}`,
            `${getIndent(depth)}+ ${diff.key}: ${stringifyValue(diff.newValue, depth + 1)}`
          ].join('\n');
        case 'nested':
          return [
            `${getIndent(depth, false)}  ${diff.key}: {`,
            iter(diff.children, depth + 1),
            `${getIndent(depth, false)}}`
          ].join('\n');
        default:
          throw new Error(`Unknown difference type: ${diff.type}`);
      }
    });
    return lines.join('\n');
  };

  return `{\n${iter(differences, 1)}\n}`;
};

const getIndent = (depth, hasMarker = true) => {
  const indentSize = 4;
  const offset = hasMarker ? 2 : 0;
  return ' '.repeat((depth * indentSize) - offset);
};

const stringifyValue = (value, depth) => {
  if (value === null) {
    return 'null';
  }

  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    const keys = Object.keys(value);
    if (keys.length === 0) return '{}';

    const innerLines = keys.map(key =>
      `${getIndent(depth, false)}  ${key}: ${stringifyValue(value[key], depth + 1)}`
    );
    return `{\n${innerLines.join('\n')}\n${getIndent(depth - 1, false)}}`;
  }

  return String(value);
};

export default stylish;