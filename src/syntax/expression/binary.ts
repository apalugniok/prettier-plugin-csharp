import { SyntaxToken } from '../syntaxToken';
import { ExpressionNode, SyntaxNode } from '../syntaxNode';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;

export type BinaryExpressionNode = {
  left: ExpressionNode;
  operatorToken: SyntaxToken;
  right: ExpressionNode;
} & SyntaxNode;

export const binaryExpressionPrinter: Printer<BinaryExpressionNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    path.call(print, 'left'),
    ' ',
    path.call(print, 'operatorToken'),
    ' ',
    path.call(print, 'right'),
  ]);
