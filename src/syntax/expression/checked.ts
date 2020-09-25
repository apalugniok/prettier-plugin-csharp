import { SyntaxToken } from '../syntaxToken';
import { ExpressionNode, SyntaxNode } from '../syntaxNode';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;

export type CheckedExpressionNode = {
  closeParenToken: SyntaxToken;
  expression: ExpressionNode;
  keyword: SyntaxToken;
  openParenToken: SyntaxToken;
} & SyntaxNode;

export const checkedExpressionPrinter: Printer['print'] = (path, _, print) => {
  return concat(['checked', '(', path.call(print, 'expression'), ')']);
};
