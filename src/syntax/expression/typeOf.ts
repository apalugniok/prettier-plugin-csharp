import { SyntaxToken } from '../syntaxToken';
import { ExpressionNode, SyntaxNode } from '../syntaxNode';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;

export type TypeOfExpressionNode = {
  closeParenToken: SyntaxToken;
  keyword: SyntaxToken;
  openParenToken: SyntaxToken;
  type: ExpressionNode;
} & SyntaxNode;

export const typeOfExpressionPrinter: Printer['print'] = (path, _, print) => {
  return concat(['typeof', '(', path.call(print, 'type'), ')']);
};
