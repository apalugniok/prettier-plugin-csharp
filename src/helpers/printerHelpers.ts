import { doc, FastPath } from 'prettier';
import join = doc.builders.join;
import hardline = doc.builders.hardline;
import Doc = doc.builders.Doc;
import { SyntaxToken } from '../syntax/syntaxToken';

export const printAttributeLists = (
  path: FastPath,
  print: (path: FastPath) => Doc
) => join(hardline, [...path.map(print, 'attributeLists'), '']);

export const printModifiers = (modifiers: Array<SyntaxToken>) =>
  join(' ', [...modifiers.map((token) => token.text), '']);
