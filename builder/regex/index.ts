import fs from 'fs';
import path from 'path';
import process from 'process';
import scss from '../filetypes/scss';

export const REGEX_INLUCDE = /{%[ ?| ]+include[ ]+[\'|\"](.*?)[\'|\"][ ?| ]+%}/i

export function processLine(line: string, cwd: string): string {
    const match = line.match(REGEX_INLUCDE);
    if (!match || match.index == undefined) {
        return line;
    }
    const filePath = path.join(cwd, match[1]);
    return `${line.substring(0, match.index)}${buildFile(filePath)}${line.substring(match.index + match[0].length)}`;
}

export function build(doc: string, cwd: string): string {
    return doc
        .split('\n')
        .map((line) => line.trim())
        .map((line) => processLine(line, cwd))
        .join('\n');
}

export function buildFile(filePath: string): string {
    if (!fs.existsSync(filePath)) {
        throw new Error('File not found!');
    }
    const buffer = fs.readFileSync(filePath);
    const cwd = path.dirname(filePath);
    let result = build(buffer.toString('utf-8'), cwd);
    const ext = path.extname(filePath);
    if (ext === '.scss') {
        const cwd = process.cwd();
        process.chdir(path.dirname(filePath));
        result = scss(result).replace(/\n/g, '');
        process.chdir(cwd);
    } else if (ext === '.css') {
        result = result.replace(/\n/g, '');
    }
    return result;
}
