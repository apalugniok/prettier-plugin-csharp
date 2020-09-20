import { SyntaxToken } from '../syntaxToken';
import { ExpressionNode, SyntaxNode } from '../syntaxNode';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;

export type BinaryExpressionNode = {
  left: ExpressionNode;
  operatorToken: SyntaxToken;
  right: ExpressionNode;
} & SyntaxNode;

export const binaryExpressionPrinter: Printer['print'] = (path, _, print) => {
  const { operatorToken }: BinaryExpressionNode = path.getValue();

  return concat([
    path.call(print, 'left'),
    ' ',
    operatorToken.text,
    ' ',
    path.call(print, 'right'),
  ]);
};
