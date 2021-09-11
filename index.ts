import TemplateBuilder from './builder/TemplateBuilder';

const builder = new TemplateBuilder({
    inputFilePath: './src/template.xml',
    outputFilePath: './dist/template.xml',
});
builder.build();
