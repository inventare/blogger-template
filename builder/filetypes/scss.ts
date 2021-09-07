import sass from 'node-sass';

export default function scss(input: string): string {
    return sass.renderSync({
        data: input,
    }).css.toString('utf-8');
}
