import { SyntaxToken } from '../syntaxToken';
import { Printer } from 'prettier';
import { SyntaxNode } from '../syntaxNode';

export type ThisExpressionNode = {
  token: SyntaxToken;
} & SyntaxNode;

export const thisExpressionPrinter: Printer<ThisExpressionNode>['print'] = (
  path,
  _,
  print
) => path.call(print, 'token');

export type BaseExpressionNode = {
  token: SyntaxToken;
} & SyntaxNode;

export const baseExpressionPrinter: Printer<BaseExpressionNode>['print'] = (
  path,
  _,
  print
) => path.call(print, 'token');
