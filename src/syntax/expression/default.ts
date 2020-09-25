import { SyntaxToken } from '../syntaxToken';
import { ExpressionNode, SyntaxNode } from '../syntaxNode';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;

export type DefaultExpressionNode = {
  closeParenToken: SyntaxToken;
  keyword: SyntaxToken;
  openParenToken: SyntaxToken;
  type: ExpressionNode;
} & SyntaxNode;

export const defaultExpressionPrinter: Printer['print'] = (path, _, print) => {
  return concat(['default', '(', path.call(print, 'type'), ')']);
};
