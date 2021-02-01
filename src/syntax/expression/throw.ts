import { SyntaxToken } from '../syntaxToken';
import { ExpressionNode, SyntaxNode } from '../syntaxNode';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;

export type ThrowExpressionNode = {
  expression: ExpressionNode;
  throwKeyword: SyntaxToken;
} & SyntaxNode;

export const throwExpressionPrinter: Printer<ThrowExpressionNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    path.call(print, 'throwKeyword'),
    ' ',
    path.call(print, 'expression'),
  ]);
