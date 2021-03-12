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

export const typeOfExpressionPrinter: Printer<TypeOfExpressionNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    path.call(print, 'keyword'),
    path.call(print, 'openParenToken'),
    path.call(print, 'type'),
    path.call(print, 'closeParenToken'),
  ]);
