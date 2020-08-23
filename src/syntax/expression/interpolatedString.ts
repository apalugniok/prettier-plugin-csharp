import { SyntaxToken } from '../syntaxToken';
import { doc, Printer } from 'prettier';
import { ExpressionNode, SyntaxNode } from '../syntaxNode';
import concat = doc.builders.concat;

export type InterpolatedStringExpressionNode = {
  contents: Array<InterpolatedStringTextNode | InterpolationNode>;
  stringEndToken: SyntaxToken;
  stringStartToken: SyntaxToken;
} & SyntaxNode;

export const interpolatedStringExpressionPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  const {
    stringStartToken,
  }: InterpolatedStringExpressionNode = path.getValue();
  return concat([
    stringStartToken.text.includes('@') ? '$@"' : '$"',
    ...path.map(print, 'contents'),
    '"',
  ]);
};

export type InterpolatedStringTextNode = {
  textToken: SyntaxToken;
};

export const interpolatedStringTextPrinter: Printer['print'] = (path) =>
  (path.getValue() as InterpolatedStringTextNode).textToken.text;

export type InterpolationNode = {
  alignmentClause: InterpolationAlignmentClauseNode;
  closeBraceToken: SyntaxToken;
  expression: ExpressionNode;
  formatClause: InterpolationFormatClauseNode;
  openBraceToken: SyntaxToken;
} & SyntaxNode;

export const interpolationPrinter: Printer['print'] = (path, _, print) => {
  return concat([
    '{',
    path.call(print, 'expression'),
    path.call(print, 'alignmentClause'),
    path.call(print, 'formatClause'),
    '}',
  ]);
};

export type InterpolationAlignmentClauseNode = {
  commaToken: SyntaxToken;
  value: ExpressionNode;
} & SyntaxNode;

export const interpolationAlignmentClausePrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  return concat([', ', path.call(print, 'value')]);
};

export type InterpolationFormatClauseNode = {
  colonToken: SyntaxToken;
  formatStringToken: SyntaxToken;
} & SyntaxNode;

export const interpolationFormatClausePrinter: Printer['print'] = (path) => {
  const { formatStringToken }: InterpolationFormatClauseNode = path.getValue();

  return concat([':', formatStringToken.text]);
};
