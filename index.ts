import fs from 'fs';
import { buildFile } from './builder/regex';

const output = buildFile('./src/template.xml');
fs.writeFileSync('./dist/template.xml', output);
