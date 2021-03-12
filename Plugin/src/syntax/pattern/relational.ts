import { doc, Printer } from 'prettier';
import { ExpressionNode, SyntaxNode } from '../syntaxNode';
import { SyntaxToken } from '../syntaxToken';
import concat = doc.builders.concat;

export type RelationalPatternNode = {
  operatorToken: SyntaxToken;
  expression: ExpressionNode;
} & SyntaxNode;

export const relationalPatternPrinter: Printer<RelationalPatternNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    path.call(print, 'operatorToken'),
    ' ',
    path.call(print, 'expression'),
  ]);
