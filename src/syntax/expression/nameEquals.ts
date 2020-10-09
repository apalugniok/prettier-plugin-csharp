import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import { SyntaxNode } from '../syntaxNode';
import { IdentifierNameNode } from './name';
import { SyntaxToken } from '../syntaxToken';

export type NameEqualsNode = {
  equalsToken: SyntaxToken;
  name: IdentifierNameNode;
} & SyntaxNode;

export const nameEqualsPrinter: Printer['print'] = (path, _, print) =>
  concat([path.call(print, 'name'), ' ', '= ']);
