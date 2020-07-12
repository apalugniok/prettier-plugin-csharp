import { SyntaxNode } from '../syntaxNode';
import { Printer } from 'prettier';
import { SyntaxToken } from '../syntaxToken';

export type LiteralExpressionNode = {
  token: SyntaxToken;
} & SyntaxNode;

export const literalExpressionPrinter: Printer['print'] = (path) => {
  const { token }: LiteralExpressionNode = path.getValue();

  return token.text;
};
