import _ from 'lodash';

const formatValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  if (_.isPlainObject(value)) {
    return '[complex value]';
  }

  return value;
};

const fullPath = (path, key) => {
  if (path === '') {
    return [key].join('.');
  }
  return [path, key].join('.');
};

const genPlainFormat = (tree) => {
  const iter = (node, path = '') => {
    const statusHandlers = {
      added: (path, { key, value }) => `Property '${fullPath(path, key)}' was added with value: ${formatValue(value)}`,
      removed: (path, { key }) => `Property '${fullPath(path, key)}' was removed`,
      modified: (path, { key, oldValue, newValue }) => `Property '${fullPath(path, key)}' was updated. From ${formatValue(oldValue)} to ${formatValue(newValue)}`,
      unchanged: () => [],
      nested: (path, { key, value }, iter) => iter(value, fullPath(path, key)),
    };

    const lines = node.flatMap((item) => {
      const handler = statusHandlers[item.status];

      if (!handler) {
        throw new Error(`Status ${item.status} is not supported`);
      }
      return handler(path, item, iter);
    });

    return lines;
  };

  const resultLines = iter(tree, '');
  return resultLines.join('\n');
};
export default genPlainFormat;
