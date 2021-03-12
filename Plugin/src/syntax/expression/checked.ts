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

export const checkedExpressionPrinter: Printer<CheckedExpressionNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    path.call(print, 'keyword'),
    path.call(print, 'openParenToken'),
    path.call(print, 'expression'),
    path.call(print, 'closeParenToken'),
  ]);
