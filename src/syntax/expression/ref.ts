import { SyntaxToken } from '../syntaxToken';
import { ExpressionNode, SyntaxNode, TypeNode } from '../syntaxNode';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;

export type MakeRefExpressionNode = {
  closeParenToken: SyntaxToken;
  expression: ExpressionNode;
  keyword: SyntaxToken;
  openParenToken: SyntaxToken;
} & SyntaxNode;

export const makeRefExpressionPrinter: Printer<MakeRefExpressionNode>['print'] = (
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

export type RefTypeExpressionNode = {
  closeParenToken: SyntaxToken;
  expression: ExpressionNode;
  keyword: SyntaxToken;
  openParenToken: SyntaxToken;
} & SyntaxNode;

export const refTypeExpressionPrinter: Printer<RefTypeExpressionNode>['print'] = (
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

export type RefValueExpressionNode = {
  closeParenToken: SyntaxToken;
  comma: SyntaxToken;
  expression: ExpressionNode;
  keyword: SyntaxToken;
  openParenToken: SyntaxToken;
  type: TypeNode;
} & SyntaxNode;

export const refValueExpressionPrinter: Printer<RefValueExpressionNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    path.call(print, 'keyword'),
    path.call(print, 'openParenToken'),
    path.call(print, 'expression'),
    path.call(print, 'comma'),
    ' ',
    path.call(print, 'type'),
    path.call(print, 'closeParenToken'),
  ]);
