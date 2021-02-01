import { SyntaxToken } from '../syntaxToken';
import { doc, Printer } from 'prettier';
import { ExpressionNode, SyntaxNode } from '../syntaxNode';
import concat = doc.builders.concat;

export type InterpolatedStringExpressionNode = {
  contents: Array<InterpolatedStringTextNode | InterpolationNode>;
  stringEndToken: SyntaxToken;
  stringStartToken: SyntaxToken;
} & SyntaxNode;

export const interpolatedStringExpressionPrinter: Printer<InterpolatedStringExpressionNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    path.call(print, 'stringStartToken'),
    ...path.map(print, 'contents'),
    path.call(print, 'stringEndToken'),
  ]);

export type InterpolatedStringTextNode = {
  textToken: SyntaxToken;
};

export const interpolatedStringTextPrinter: Printer<InterpolatedStringTextNode>['print'] = (
  path,
  _,
  print
) => path.call(print, 'textToken');

export type InterpolationNode = {
  alignmentClause: InterpolationAlignmentClauseNode;
  closeBraceToken: SyntaxToken;
  expression: ExpressionNode;
  formatClause: InterpolationFormatClauseNode;
  openBraceToken: SyntaxToken;
} & SyntaxNode;

export const interpolationPrinter: Printer<InterpolationNode>['print'] = (
  path,
  _,
  print
) => {
  return concat([
    path.call(print, 'openBraceToken'),
    path.call(print, 'expression'),
    path.call(print, 'alignmentClause'),
    path.call(print, 'formatClause'),
    path.call(print, 'closeBraceToken'),
  ]);
};

export type InterpolationAlignmentClauseNode = {
  commaToken: SyntaxToken;
  value: ExpressionNode;
} & SyntaxNode;

export const interpolationAlignmentClausePrinter: Printer<InterpolationAlignmentClauseNode>['print'] = (
  path,
  _,
  print
) => {
  return concat([
    path.call(print, 'commaToken'),
    ' ',
    path.call(print, 'value'),
  ]);
};

export type InterpolationFormatClauseNode = {
  colonToken: SyntaxToken;
  formatStringToken: SyntaxToken;
} & SyntaxNode;

export const interpolationFormatClausePrinter: Printer<InterpolationFormatClauseNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    path.call(print, 'colonToken'),
    path.call(print, 'formatStringToken'),
  ]);
