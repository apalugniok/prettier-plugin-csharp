import { SyntaxToken } from '../syntaxToken';
import { ExpressionNode, SyntaxNode } from '../syntaxNode';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;

export type RangeExpressionNode = {
  leftOperand: ExpressionNode;
  operatorToken: SyntaxToken;
  rightOperand: ExpressionNode;
} & SyntaxNode;

export const rangeExpressionPrinter: Printer<RangeExpressionNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    path.call(print, 'leftOperand'),
    path.call(print, 'operatorToken'),
    path.call(print, 'rightOperand'),
  ]);
