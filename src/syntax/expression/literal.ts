import { SyntaxNode } from '../syntaxNode';
import { Printer } from 'prettier';
import { SyntaxToken } from '../syntaxToken';

export type LiteralExpressionNode = {
  token: SyntaxToken;
} & SyntaxNode;

export const literalExpressionPrinter: Printer<LiteralExpressionNode>['print'] = (
  path,
  _,
  print
) => path.call(print, 'token');
