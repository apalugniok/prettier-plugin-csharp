import { SyntaxToken } from '../syntaxToken';
import { ExpressionNode, SyntaxNode } from '../syntaxNode';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;

export type PrefixUnaryExpressionNode = {
  operand: ExpressionNode;
  operatorToken: SyntaxToken;
} & SyntaxNode;

export const prefixUnaryExpressionPrinter: Printer<PrefixUnaryExpressionNode>['print'] = (
  path,
  _,
  print
) => concat([path.call(print, 'operatorToken'), path.call(print, 'operand')]);

export type PostfixUnaryExpressionNode = {
  operand: ExpressionNode;
  operatorToken: SyntaxToken;
} & SyntaxNode;

export const postfixUnaryExpressionPrinter: Printer<PostfixUnaryExpressionNode>['print'] = (
  path,
  _,
  print
) => concat([path.call(print, 'operand'), path.call(print, 'operatorToken')]);
