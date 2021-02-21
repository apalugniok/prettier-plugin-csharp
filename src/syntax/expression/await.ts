import { ExpressionNode, SyntaxNode } from '../syntaxNode';
import { SyntaxToken } from '../syntaxToken';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;

export type AwaitExpressionNode = {
  awaitKeyword: SyntaxToken;
  expression: ExpressionNode;
} & SyntaxNode;

export const awaitExpressionPrinter: Printer<AwaitExpressionNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    path.call(print, 'awaitKeyword'),
    ' ',
    path.call(print, 'expression'),
  ]);
