import _ from 'lodash'

const indent = (depth, size = 4) => {
  const margin = ' '.repeat(size)
  return margin.repeat(depth)
}

const stringify = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return `${data}`
  }

  const arrData = Object.entries(data)

  const lines = arrData.map(([key, value]) => {
    if (_.isPlainObject(value)) {
      const nestedStr = stringify(value, depth + 1)
      return `  ${indent(depth)}  ${key}: ${nestedStr}`
    }
    return `  ${indent(depth)}  ${key}: ${value}`
  })

  return `{\n${lines.join('\n')}\n${indent(depth)}}`
}

const genStylishFormat = (tree) => {
  const iter = (node, depth) => {
    const statusHandlers = {
      added: ({ key, value }) => `  ${indent(depth)}+ ${key}: ${stringify(value, depth + 1)}`,
      removed: ({ key, value }) => `  ${indent(depth)}- ${key}: ${stringify(value, depth + 1)}`,
      unchanged: ({ key, value }) => `  ${indent(depth)}  ${key}: ${stringify(value, depth + 1)}`,
      nested: ({ key, value }) => `  ${indent(depth)}  ${key}: ${iter(value, depth + 1)}`,
      modified: ({ key, oldValue, newValue }) => [
        `  ${indent(depth)}- ${key}: ${stringify(oldValue, depth + 1)}`,
        `  ${indent(depth)}+ ${key}: ${stringify(newValue, depth + 1)}`
      ].join('\n'),
    }

    const lines = node.flatMap((item) => {
      const handler = statusHandlers[item.status]
      if (!handler) {
        throw new Error(`Status ${item.status} is not supported`)
      }
      return handler(item)
    })

    return `{\n${lines.join('\n')}\n${indent(depth)}}`
  }

  return iter(tree, 0)
}

export default genStylishFormat
