import fs from 'fs';
import path from 'path';
import FileTypeProcessor from './FileTypeProcessor';

export interface TemplateBuilderOptions {
    inputFilePath: string;
    outputFilePath: string;
    minifyExtensions: string[];
}

export default class TemplateBuilder {
    private REGEX_INLUCDE = /{%[ ]*include[ ]*[\'|\"](.*?)[\'|\"][ ]*%}/i;
    private REGEX_ASSIGN = /{%[ ]*assign[ ]*(.*?)[ ]*=[ ]*[\'|\"](.*?)[\'|\"][ ]*%}/i;
    private REGEX_VARIABLE = /{{[ ]*(.*?)[ ]*}}/i;

    options: TemplateBuilderOptions;
    variables: {
        [key: string]: string;
    } = {};

    constructor(options: Partial<TemplateBuilderOptions>) {
        this.options = {
            inputFilePath: './src/template.html',
            outputFilePath: './dist/template.xml',
            minifyExtensions: ['.scss', '.css', '.js'],
            ...options,
        };
    }

    build() {
        const output = this.buildFile(this.options.inputFilePath);
        fs.writeFileSync(this.options.outputFilePath, output);
    }

    private processLine(line: string, cwd: string): string {
        let match = line.match(this.REGEX_INLUCDE);
        if (match && match.index !== undefined) {
            const filePath = path.join(cwd, match[1]);
            return this.processLine(
                `${line.substring(0, match.index)}${this.buildFile(filePath)}${line.substring(match.index + match[0].length)}`,
                cwd,
            );
        };
        match = line.match(this.REGEX_ASSIGN);
        if (match && match.index !== undefined) {
            this.variables[match[1]] = match[2];
            return this.processLine(
                `${line.substring(0, match.index)}${line.substring(match.index + match[0].length)}`,
                cwd,
            );
        }
        match = line.match(this.REGEX_VARIABLE);
        if (match && match.index !== undefined) {
            const name = match[1];
            if (Object.prototype.hasOwnProperty.call(this.variables, name)) {
                return this.processLine(
                    `${line.substring(0, match.index)}${this.variables[name]}${line.substring(match.index + match[0].length)}`,
                    cwd,
                );
            } else {
                return this.processLine(
                    `${line.substring(0, match.index)}${line.substring(match.index + match[0].length)}`,
                    cwd,
                );
            }
        }
        return line;
    }

    private buildText(doc: string, cwd: string): string {
        return doc
            .split('\n')
            .map((line) => line.trim())
            .map((line) => this.processLine(line, cwd))
            .join('\n');
    }

    private buildFile(filePath: string): string {
        if (!fs.existsSync(filePath)) {
            throw new Error('File not found!');
        }
        const buffer = fs.readFileSync(filePath);
        const cwd = path.dirname(filePath);
        let result = buffer.toString('utf-8');
        const ext = path.extname(filePath).toLowerCase();
        if (Object.prototype.hasOwnProperty.call(FileTypeProcessor, ext)) {
            const minify = this.options.minifyExtensions.includes(ext);
            result = FileTypeProcessor[ext](result, cwd, minify);
        } else {
            result = this.buildText(result, cwd);
        }
        return result;
    }
}
