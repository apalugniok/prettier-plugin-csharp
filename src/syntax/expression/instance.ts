import { SyntaxToken } from '../syntaxToken';
import { Printer } from 'prettier';
import { SyntaxNode } from '../syntaxNode';

export type ThisExpressionNode = {
  token: SyntaxToken;
} & SyntaxNode;

export const thisExpressionPrinter: Printer['print'] = (path) => {
  const { token }: ThisExpressionNode = path.getValue();

  return token.text;
};

export type BaseExpressionNode = {
  token: SyntaxToken;
} & SyntaxNode;

export const baseExpressionPrinter: Printer['print'] = (path) => {
  const { token }: BaseExpressionNode = path.getValue();

  return token.text;
};
