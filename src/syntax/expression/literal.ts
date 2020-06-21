import { SyntaxNode } from '../syntaxNode';
import { Printer } from 'prettier';

export type LiteralExpressionNode = {
  value: string;
} & SyntaxNode;

export const literalExpressionPrinter: Printer['print'] = (path) => {
  const { value }: LiteralExpressionNode = path.getValue();

  return value;
};
