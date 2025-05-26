import _ from 'lodash';

const buildTree = (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

  const diff = keys.map((key) => {
    if (!Object.hasOwn(obj1, key)) {
      return { key, value: obj2[key], status: 'added' };
    }

    if (!Object.hasOwn(obj2, key)) {
      return { key, value: obj1[key], status: 'removed' };
    }

    if (_.isEqual(obj1[key], obj2[key])) {
      return { key, value: obj1[key], status: 'unchanged' };
    }

    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      const child = buildTree(obj1[key], obj2[key]);
      return { key, value: child, status: 'nested' };
    }

    return {
      key,
      oldValue: obj1[key],
      newValue: obj2[key],
      status: 'modified',
    };
  });

  return diff;
};

export default buildTree;
