import { SyntaxToken } from '../syntaxToken';
import { ExpressionNode, SyntaxNode } from '../syntaxNode';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;

export type SizeOfExpressionNode = {
  closeParenToken: SyntaxToken;
  keyword: SyntaxToken;
  openParenToken: SyntaxToken;
  type: ExpressionNode;
} & SyntaxNode;

export const sizeOfExpressionPrinter: Printer['print'] = (path, _, print) => {
  return concat(['sizeof', '(', path.call(print, 'type'), ')']);
};
