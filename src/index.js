import path from 'path'
import fs from 'fs'
import parser from './parser.js'
import buildTree from './buildTree.js'
import genFormatting from './formatters/index.js'

export default (filepath1, filepath2, format = 'stylish') => {
  const content1 = fs.readFileSync(path.resolve(filepath1), 'utf-8')
  const content2 = fs.readFileSync(path.resolve(filepath2), 'utf-8')

  const parsedData1 = parser(content1, path.extname(filepath1))
  const parsedData2 = parser(content2, path.extname(filepath2))

  const tree = buildTree(parsedData1, parsedData2)
  return genFormatting(tree, format)
}
