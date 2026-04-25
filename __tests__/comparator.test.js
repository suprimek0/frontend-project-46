import compare from '../src/comparator.js';
import parse from '../src/parsers.js';
import path from 'path';

const readFixture = (filename) => {
  const filepath = path.join(__dirname, '__fixtures__', filename);
  return parse(filepath);
};

describe('compare', () => {
  test('should compare two flat JSON files correctly', () => {
    const data1 = readFixture('file1.json');
    const data2 = readFixture('file2.json');

    const result = compare(data1, data2);

    expect(result).toEqual([
      { key: 'follow', type: 'removed', value: false },
      { key: 'host', type: 'unchanged', value: 'hexlet.io' },
      { key: 'proxy', type: 'removed', value: '123.234.53.22' },
      { key: 'timeout', type: 'removed', value: 50 },
      { key: 'timeout', type: 'added', value: 20 },
      { key: 'verbose', type: 'added', value: true }
    ]);
  });

  test('should handle identical files', () => {
    const data = readFixture('file1.json');
    const result = compare(data, data);

    expect(result.every(item => item.type === 'unchanged')).toBe(true);
    expect(result).toHaveLength(Object.keys(data).length);
  });

  test('should sort keys in alphabetical order', () => {
    const data1 = readFixture('file1.json');
    const data2 = readFixture('file2.json');

    const result = compare(data1, data2);
    const keys = result.map(item => item.key);
    const sortedKeys = [...keys].sort();

    expect(keys).toEqual(sortedKeys);
  });

  test('should compare two flat YAML files correctly', () => {
    const data1 = readFixture('file1.yml');
    const data2 = readFixture('file2.yml');

    const result = compare(data1, data2);

    expect(result).toEqual([
      { key: 'follow', type: 'removed', value: false },
      { key: 'host', type: 'unchanged', value: 'hexlet.io' },
      { key: 'proxy', type: 'removed', value: '123.234.53.22' },
      { key: 'timeout', type: 'removed', value: 50 },
      { key: 'timeout', type: 'added', value: 20 },
      { key: 'verbose', type: 'added', value: true }
    ]);
  });

  test('should handle identical YAML files', () => {
    const data = readFixture('file1.yml');
    const result = compare(data, data);

    expect(result.every(item => item.type === 'unchanged')).toBe(true);
    expect(result).toHaveLength(Object.keys(data).length);
  });

  test('should compare JSON and YAML files correctly', () => {
    const jsonData = readFixture('file1.json');
    const yamlData = readFixture('file1.yml');

    const result = compare(jsonData, yamlData);

    expect(result.every(item => item.type === 'unchanged')).toBe(true);
    expect(result).toHaveLength(Object.keys(jsonData).length);
  });
});