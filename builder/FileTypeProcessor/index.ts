import css from './css';
import js from './js';
import scss from './scss';

const FileTypeProcessor : {
    [key: string]: (content: string, root: string, minify?: boolean) => string;
} = {
    '.js': js,
    '.css': css,
    '.scss': scss,
};

export default FileTypeProcessor;
