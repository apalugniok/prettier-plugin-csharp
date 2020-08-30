import { SyntaxToken } from '../syntaxToken';
import { ExpressionNode, SyntaxNode, TypeNode } from '../syntaxNode';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;

export type CastExpressionNode = {
  closeParenToken: SyntaxToken;
  expression: ExpressionNode;
  openParenToken: SyntaxToken;
  type: TypeNode;
} & SyntaxNode;

export const castExpressionPrinter: Printer['print'] = (path, _, print) => {
  return concat([
    '(',
    path.call(print, 'type'),
    ')',
    ' ',
    path.call(print, 'expression'),
  ]);
};
