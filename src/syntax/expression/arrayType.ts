import { ExpressionNode, SyntaxNode, TypeNode } from '../syntaxNode';
import { SyntaxToken } from '../syntaxToken';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import join = doc.builders.join;

export type ArrayTypeNode = {
  elementType: TypeNode;
  rankSpecifiers: Array<ArrayRankSpecifierNode>;
} & SyntaxNode;

export const arrayTypePrinter: Printer['print'] = (path, _, print) => {
  return concat([
    path.call(print, 'elementType'),
    ...path.map(print, 'rankSpecifiers'),
  ]);
};

export type ArrayRankSpecifierNode = {
  closeBracketToken: SyntaxToken;
  openBracketToken: SyntaxToken;
  rank: number;
  sizes: Array<ExpressionNode>;
} & SyntaxNode;

export const arrayRankSpecifierPrinter: Printer['print'] = (path, _, print) => {
  return concat(['[', join(', ', path.map(print, 'sizes')), ']']);
};

export type OmittedArraySizeExpressionNode = {
  omittedArraySizeExpressionToken: SyntaxToken;
} & SyntaxNode;

export const omittedArraySizeExpressionPrinter: Printer['print'] = (path) =>
  (path.getValue() as OmittedArraySizeExpressionNode)
    .omittedArraySizeExpressionToken.text;
