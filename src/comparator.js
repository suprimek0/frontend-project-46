import _ from 'lodash';

const compare = (data1, data2) => {
  const allKeys = _.sortBy([...new Set([...Object.keys(data1), ...Object.keys(data2)])]);

  return allKeys.map((key) => {
    if (!(key in data1)) {
      return { key, type: 'added', value: data2[key] };
    }
    if (!(key in data2)) {
      return { key, type: 'removed', value: data1[key] };
    }
    if (data1[key] !== data2[key]) {
      return [
        { key, type: 'removed', value: data1[key] },
        { key, type: 'added', value: data2[key] }
      ];
    }
    return { key, type: 'unchanged', value: data1[key] };
  }).flat();
};

export default compare;