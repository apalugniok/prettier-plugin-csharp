import { SyntaxToken } from '../syntaxToken';
import { ExpressionNode, SyntaxNode } from '../syntaxNode';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;

export type PrefixUnaryExpressionNode = {
  operand: ExpressionNode;
  operatorToken: SyntaxToken;
} & SyntaxNode;

export const prefixUnaryExpressionPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  const { operatorToken }: PrefixUnaryExpressionNode = path.getValue();

  return concat([operatorToken.text, path.call(print, 'operand')]);
};

export type PostfixUnaryExpressionNode = {
  operand: ExpressionNode;
  operatorToken: SyntaxToken;
} & SyntaxNode;

export const postfixUnaryExpressionPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  const { operatorToken }: PrefixUnaryExpressionNode = path.getValue();

  return concat([path.call(print, 'operand'), operatorToken.text]);
};
