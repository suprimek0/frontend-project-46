const stylish = (differences) => {
  const lines = differences.map((diff) => {
    switch (diff.type) {
      case 'added':
        return `  + ${diff.key}: ${diff.value}`;
      case 'removed':
        return `  - ${diff.key}: ${diff.value}`;
      case 'unchanged':
        return `    ${diff.key}: ${diff.value}`;
      default:
        throw new Error(`Unknown difference type: ${diff.type}`);
    }
  });
  return `{\n${lines.join('\n')}\n}`;
};

export default stylish;