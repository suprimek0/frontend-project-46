import compare from '../src/comparator.js';
import parse from '../src/parsers.js';
import path from 'path';

const readFixture = (filename) => {
  const filepath = path.join(__dirname, '__fixtures__', filename);
  return parse(filepath);
};

describe('compare', () => {
  test('should compare nested JSON structures correctly', () => {
    const data1 = readFixture('file1.json');
    const data2 = readFixture('file2.json');

    const result = compare(data1, data2);

    expect(result).toEqual(expect.arrayContaining([
      expect.objectContaining({
        key: 'common',
        type: 'nested'
      }),
      expect.objectContaining({
        key: 'group1',
        type: 'nested'
      }),
      expect.objectContaining({ key: 'group2', type: 'removed' }),
      expect.objectContaining({ key: 'group3', type: 'added' })
    ]));
  });



test('should handle identical nested files', () => {
  const data = readFixture('file1.json');
  const result = compare(data, data);

  result.forEach(item => {
    // На верхнем уровне все элементы должны быть либо unchanged, либо nested
    expect(['unchanged', 'nested']).toContain(item.type);

    // Если элемент — вложенный объект, проверяем, что его дети существуют
    if (item.type === 'nested') {
      expect(Array.isArray(item.children)).toBe(true);
      expect(item.children.length).toBeGreaterThan(0);
    }
  });
});

  test('should compare nested YAML files correctly', () => {
    const data1 = readFixture('file1.yml');
    const data2 = readFixture('file2.yml');

    const result = compare(data1, data2);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);

    const common = result.find(item => item.key === 'common');
    expect(common).toBeDefined();
    expect(common.type).toBe('nested');

    const follow = common.children.find(child => child.key === 'follow');
    expect(follow).toBeDefined();
    expect(follow.type).toBe('added');
    expect(follow.value).toBe(false);
  });

  test('should compare flat structures correctly', () => {
    const flat1 = {
      host: 'hexlet.io',
      timeout: 50,
      verbose: true
    };
    const flat2 = {
      host: 'hexlet.io',
      timeout: 20,
      port: 8080
    };

    const result = compare(flat1, flat2);

    expect(result).toEqual(expect.arrayContaining([
      { key: 'host', type: 'unchanged', value: 'hexlet.io' },
      { key: 'timeout', type: 'changed', oldValue: 50, newValue: 20 },
      { key: 'verbose', type: 'removed', value: true },
      { key: 'port', type: 'added', value: 8080 }
    ]));
  });

  test('should handle empty objects', () => {
    const empty1 = {};
    const empty2 = {};

    const result1 = compare(empty1, empty2);
    expect(result1).toEqual([]);

    const result2 = compare(empty1, { key: 'value' });
    expect(result2).toEqual([{ key: 'key', type: 'added', value: 'value' }]);
  });

  test('should handle arrays as values', () => {
    const obj1 = { arr: [1, 2, 3] };
    const obj2 = { arr: [1, 2, 4] };

    const result = compare(obj1, obj2);

    expect(result).toEqual([
      { key: 'arr', type: 'changed', oldValue: [1, 2, 3], newValue: [1, 2, 4] }
    ]);
  });
});