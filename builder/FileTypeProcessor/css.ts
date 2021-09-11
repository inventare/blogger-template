import UglifyCSS from 'uglifycss';

export default function css(css: string, rootDirectory: string, minify = true): string {
    if (minify) {
        return UglifyCSS.processString(css);
    }
    return css;
}
