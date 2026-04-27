
import plain from '../src/formatters/plain.js';
import compare from '../src/comparator.js';
import parse from '../src/parsers.js';

describe('plain formatter', () => {
  test('should format nested differences in plain format', () => {
    const data1 = parse('__tests__/__fixtures__/file1.json');
    const data2 = parse('__tests__/__fixtures__/file2.json');
    const differences = compare(data1, data2);
    const result = plain(differences);

    expect(result).toContain("Property 'common.follow' was added with value: false");
    expect(result).toContain("Property 'common.setting2' was removed");
    expect(result).toContain("Property 'common.setting3' was updated. From true to null");
    expect(result).toContain("Property 'common.setting5' was added with value: [complex value]");
    expect(result).toContain("Property 'group2' was removed");
    expect(result).toContain("Property 'group3' was added with value: [complex value]");
  });
});