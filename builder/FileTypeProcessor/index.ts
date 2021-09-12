import css from './css';
import js from './js';
import scss from './scss';
import { PreMinifyFn } from './types';

const FileTypeProcessor : {
    [key: string]: (content: string, root: string, preMinify: PreMinifyFn, minify?: boolean) => string;
} = {
    '.js': js,
    '.css': css,
    '.scss': scss,
};

export default FileTypeProcessor;
