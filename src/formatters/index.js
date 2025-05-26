import genStylishFormat from './stylish.js';

export default (tree, format) => {
  if (format === 'stylish') {
    return genStylishFormat(tree);
  }

  throw Error(`${format} is not support`);
};
