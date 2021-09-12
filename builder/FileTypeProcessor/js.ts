import UglifyJS from 'uglify-js';
import { PreMinifyFn } from './types';

export default function js(
    js: string,
    rootDirectory: string,
    preMinify: PreMinifyFn,
    minify = true,
): string {
    const result = preMinify(js, rootDirectory);
    if (minify) {
        const minifyOutput = UglifyJS.minify(result);
        if (!minifyOutput.error) {
            return minifyOutput.code;
        }
    }
    return result;
}
