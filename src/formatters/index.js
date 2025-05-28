import genStylishFormat from './stylish.js';
import genPlainFormat from './plain.js';

export default (tree, format) => {
    switch (format) {
        case 'stylish':
            return genStylishFormat(tree);
        case 'plain':
            return genPlainFormat(tree);
        default:
            throw Error(`${format} is not support`);
    }
};
