import { Options, Parser, SupportLanguage } from 'prettier';

import { parse } from './parse';
import { printNode } from './print';
import { SyntaxNode } from './syntax/syntaxNode';

export const languages: Array<SupportLanguage> = [
  {
    extensions: ['.cs'],
    name: 'C#',
    parsers: ['roslyn-csharp'],
  },
];

export const parsers: { [key in string]: Parser } = {
  'roslyn-csharp': {
    parse,
    astFormat: 'roslyn-csharp',
    locStart: (node: SyntaxNode) => node.start,
    locEnd: (node: SyntaxNode) => node.end,
  },
};

export const printers = {
  'roslyn-csharp': {
    print: printNode,
  },
};

export const options = {};

export const defaultOptions: Options = { tabWidth: 4, printWidth: 120 };
