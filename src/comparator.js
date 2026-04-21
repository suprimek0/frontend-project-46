const compare = (data1, data2) => {
  const keys1 = new Set(Object.keys(data1));
  const keys2 = new Set(Object.keys(data2));
  const allKeys = new Set([...keys1, ...keys2]);
  const result = [];

  for (const key of allKeys) {
    if (!(key in data1)) {
      result.push({ key, type: 'added', value: data2[key] });
    } else if (!(key in data2)) {
      result.push({ key, type: 'removed', value: data1[key] });
    } else if (data1[key] !== data2[key]) {
      result.push({
        key,
        type: 'changed',
        value1: data1[key],
        value2: data2[key]
      });
    } else {
      result.push({ key, type: 'unchanged', value: data1[key] });
    }
  }

  return result;
};

export default compare;
