import { SyntaxToken } from '../syntaxToken';
import { ExpressionNode, SyntaxNode } from '../syntaxNode';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;

export type ParenthesizedExpressionNode = {
  closeParenToken: SyntaxToken;
  expression: ExpressionNode;
  openParenToken: SyntaxToken;
} & SyntaxNode;

export const parenthesizedExpressionPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  return concat(['(', path.call(print, 'expression'), ')']);
};
