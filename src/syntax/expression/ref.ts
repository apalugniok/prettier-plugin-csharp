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

export const makeRefExpressionPrinter: Printer['print'] = (path, _, print) => {
  const { keyword }: MakeRefExpressionNode = path.getValue();

  return concat([keyword.text, '(', path.call(print, 'expression'), ')']);
};

export type RefTypeExpressionNode = {
  closeParenToken: SyntaxToken;
  expression: ExpressionNode;
  keyword: SyntaxToken;
  openParenToken: SyntaxToken;
} & SyntaxNode;

export const refTypeExpressionPrinter: Printer['print'] = (path, _, print) => {
  const { keyword }: MakeRefExpressionNode = path.getValue();

  return concat([keyword.text, '(', path.call(print, 'expression'), ')']);
};

export type RefValueExpressionNode = {
  closeParenToken: SyntaxToken;
  comma: SyntaxToken;
  expression: ExpressionNode;
  keyword: SyntaxToken;
  openParenToken: SyntaxToken;
  type: TypeNode;
} & SyntaxNode;

export const refValueExpressionPrinter: Printer['print'] = (path, _, print) => {
  const { keyword }: MakeRefExpressionNode = path.getValue();

  return concat([
    keyword.text,
    '(',
    path.call(print, 'expression'),
    ',',
    ' ',
    path.call(print, 'type'),
    ')',
  ]);
};
