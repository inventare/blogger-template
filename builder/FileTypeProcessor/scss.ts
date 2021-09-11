import sass from 'node-sass';
import UglifyCSS from 'uglifycss';

export default function scss(input: string, rootDirectory: string, minify: boolean = true): string {
    const cwd = process.cwd();
    process.chdir(rootDirectory);
    let result = sass.renderSync({ data: input }).css.toString('utf-8');
    process.chdir(cwd);
    if (minify) {
        result = UglifyCSS.processString(result);
    }
    return result;
}
