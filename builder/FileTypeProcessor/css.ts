import UglifyCSS from 'uglifycss';
import { PreMinifyFn } from './types';

export default function css(
    css: string,
    rootDirectory: string,
    preMinify: PreMinifyFn,
    minify = true,
): string {
    css = preMinify(css, rootDirectory);
    if (minify) {
        return UglifyCSS.processString(css);
    }
    return css;
}
