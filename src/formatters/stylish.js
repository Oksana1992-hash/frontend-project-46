import _ from 'lodash';

const indent = (depth) => {
  const margin = '    ';
  return margin.repeat(depth);
};

const stringify = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return `${data}`;
  }
  const arrData = Object.entries(data);

  const lines = arrData.map(([key, value]) => {
    if (_.isPlainObject(value)) {
      const nestedStr = stringify(value, depth + 1);
      return `  ${indent(depth)}  ${key}: ${nestedStr}`;
    }
    return `  ${indent(depth)}  ${key}: ${value}`;
  });
  return `{\n${lines.join('\n')}\n${indent(depth)}}`;
};

const genStylishFormat = (tree) => {
  const iter = (node, depth) => {
    const lines = node.flatMap((item) => {
      const {
        key, value, oldValue, newValue, status,
      } = item;

      switch (status) {
        case 'added':
          return `  ${indent(depth)}+ ${key}: ${stringify(value, depth + 1)}`;
        case 'removed':
          return `  ${indent(depth)}- ${key}: ${stringify(value, depth + 1)}`;
        case 'unchanged':
          return `  ${indent(depth)}  ${key}: ${stringify(value, depth + 1)}`;
        case 'nested':
          return `  ${indent(depth)}  ${key}: ${iter(value, depth + 1)}`;
        case 'modified':
          return `  ${indent(depth)}- ${key}: ${stringify(oldValue, depth + 1)}\n  ${indent(depth)}+ ${key}: ${stringify(newValue, depth + 1)}`;

        default:
          throw new Error(`Status ${status} is not supported`);
      }
    });

    return `{\n${lines.join('\n')}\n${indent(depth)}}`;
  };

  return iter(tree, 0);
};

export default genStylishFormat;
