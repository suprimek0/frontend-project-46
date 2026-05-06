import parse from './parsers.js'
import compare from './comparator/compare.js'
import format from './formatters/index.js'

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parse(filepath1)
  const data2 = parse(filepath2)
  const differences = compare(data1, data2)
  return format(differences, formatName)
}

export default gendiff