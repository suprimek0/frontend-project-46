import _ from 'lodash';

const isObject = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);

const compare = (data1 = {}, data2 = {}) => {
  const allKeys = _.sortBy([...new Set([...Object.keys(data1), ...Object.keys(data2)])]);

  return allKeys.map((key) => {
    if (!(key in data1)) {
      return { key, type: 'added', value: data2[key] };
    }

    if (!(key in data2)) {
      return { key, type: 'removed', value: data1[key] };
    }

    const value1 = data1[key];
    const value2 = data2[key];

    if (isObject(value1) && isObject(value2)) {
      return {
        key,
        type: 'nested',
        children: compare(value1, value2)
      };
    }

    if (value1 !== value2) {
      return {
        key,
        type: 'changed',
        oldValue: value1,
        newValue: value2
      };
    }

    return { key, type: 'unchanged', value: value1 };
  });
};

export default compare;