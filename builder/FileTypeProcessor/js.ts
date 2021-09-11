import UglifyJS from 'uglify-js';

export default function js(js: string, rootDirectory: string, minify = true): string {
    if (minify) {
        const minifyOutput = UglifyJS.minify(js);
        if (!minifyOutput.error) {
            return minifyOutput.code;
        }
    }
    return js;
}
