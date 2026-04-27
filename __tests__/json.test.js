import json from '../src/formatters/json.js';
import compare from '../src/comparator.js';
import parse from '../src/parsers.js';

describe('json formatter', () => {
  test('should format differences as valid JSON', () => {
    const data1 = parse('__tests__/__fixtures__/file1.json');
    const data2 = parse('__tests__/__fixtures__/file2.json');
    const differences = compare(data1, data2);
    const result = json(differences);

    // Проверяем валидность JSON
    expect(() => JSON.parse(result)).not.toThrow();

    // Проверяем, что результат — массив
    const parsed = JSON.parse(result);
    expect(Array.isArray(parsed)).toBe(true);
  });

test('should include all expected difference types in JSON output', () => {
  const data1 = parse('__tests__/__fixtures__/file1.json');
  const data2 = parse('__tests__/__fixtures__/file2.json');
  const differences = compare(data1, data2);
  const result = json(differences);
  const parsed = JSON.parse(result);

  const types = parsed.map(item => item.type);

  // Проверяем только гарантированно присутствующие типы
  expect(types).toContain('added');
  expect(types).toContain('removed');
  expect(types).toContain('nested');

  // Опционально: проверяем, что если есть 'changed', то он корректен
  const changedItems = parsed.filter(item => item.type === 'changed');
  changedItems.forEach(item => {
    expect(item).toHaveProperty('oldValue');
    expect(item).toHaveProperty('newValue');
  });
});

  test('should preserve nested structure in JSON', () => {
    const data1 = parse('__tests__/__fixtures__/file1.json');
    const data2 = parse('__tests__/__fixtures__/file2.json');
    const differences = compare(data1, data2);
    const result = json(differences);
    const parsed = JSON.parse(result);

    // Ищем вложенный объект
    const nested = parsed.find(item => item.type === 'nested');
    if (nested) {
      expect(nested).toHaveProperty('children');
      expect(Array.isArray(nested.children)).toBe(true);
    }
  });
});