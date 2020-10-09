import { SyntaxToken } from '../syntaxToken';
import { ExpressionNode, SyntaxNode } from '../syntaxNode';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;

export type RangeExpressionNode = {
  leftOperand: ExpressionNode;
  operatorToken: SyntaxToken;
  rightOperand: ExpressionNode;
} & SyntaxNode;

export const rangeExpressionPrinter: Printer['print'] = (path, _, print) => {
  const { operatorToken }: RangeExpressionNode = path.getValue();

  return concat([
    path.call(print, 'leftOperand'),
    operatorToken.text,
    path.call(print, 'rightOperand'),
  ]);
};
