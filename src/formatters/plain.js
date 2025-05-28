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
    const lines = node.flatMap((item) => {
      const {
        key, value, oldValue, newValue, status,
      } = item;

      switch (status) {
        case 'added':
          return `Property '${fullPath(path, key)}' was added with value: ${formatValue(value)}`;
        case 'removed':
          return `Property '${fullPath(path, key)}' was removed`;
        case 'modified':
          return `Property '${fullPath(path, key)}' was updated. From ${formatValue(oldValue)} to ${formatValue(newValue)}`;
        case 'unchanged':
          return [];
        case 'nested':
          return iter(value, fullPath(path, key));
        default:
          throw new Error(`Status ${status} is not supported`);
      }
    });
    return `${lines.join('\n')}`;
  };
  return iter(tree, '');
};

export default genPlainFormat;
