import sass from 'node-sass';
import UglifyCSS from 'uglifycss';
import { PreMinifyFn } from './types';

export default function scss(
    input: string,
    rootDirectory: string,
    preMinify: PreMinifyFn,
    minify: boolean = true,
): string {
    const cwd = process.cwd();
    process.chdir(rootDirectory);
    let result = sass.renderSync({ data: input }).css.toString('utf-8');
    process.chdir(cwd);
    result = preMinify(result, rootDirectory);
    if (minify) {
        result = UglifyCSS.processString(result);
    }
    return result;
}
