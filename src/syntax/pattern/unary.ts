import { doc, Printer } from 'prettier';
import { PatternNode, SyntaxNode } from '../syntaxNode';
import { SyntaxToken } from '../syntaxToken';
import concat = doc.builders.concat;

export type UnaryPatternNode = {
  operatorToken: SyntaxToken;
  pattern: PatternNode;
} & SyntaxNode;

export const unaryPatternPrinter: Printer<UnaryPatternNode>['print'] = (
  path,
  _,
  print
) =>
  concat([path.call(print, 'operatorToken'), ' ', path.call(print, 'pattern')]);
