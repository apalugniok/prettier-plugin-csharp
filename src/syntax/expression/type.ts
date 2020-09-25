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

export type PredefinedTypeNode = {
  keyword: SyntaxToken;
} & SyntaxNode;

export const predefinedTypePrinter: Printer['print'] = (path) => {
  const { keyword }: PredefinedTypeNode = path.getValue();

  return keyword.text;
};

export type RefTypeNode = {
  readonlyKeyword: SyntaxToken;
  refKeyword: SyntaxToken;
  type: TypeNode;
} & SyntaxNode;

export const refTypePrinter: Printer['print'] = (path, _, print) => {
  const { readonlyKeyword, refKeyword }: RefTypeNode = path.getValue();

  return concat([
    refKeyword.text,
    ' ',
    readonlyKeyword.text,
    readonlyKeyword.text !== '' ? '' : ' ',
    path.call(print, 'type'),
  ]);
};

export type PointerTypeNode = {
  asteriskToken: SyntaxToken;
  elementType: TypeNode;
} & SyntaxNode;

export const pointerTypePrinter: Printer['print'] = (path, _, print) => {
  return concat([path.call(print, 'elementType'), '*']);
};

export type NullableTypeNode = {
  elementType: TypeNode;
  questionToken: SyntaxToken;
} & SyntaxNode;

export const nullableTypePrinter: Printer['print'] = (path, _, print) => {
  return concat([path.call(print, 'elementType'), '?']);
};

export type TupleTypeNode = {
  closeParenToken: SyntaxToken;
  elements: Array<TupleElementNode>;
  openParenToken: SyntaxToken;
} & SyntaxNode;

export const tupleTypePrinter: Printer['print'] = (path, _, print) => {
  return concat(['(', join(', ', path.map(print, 'elements')), ')']);
};

export type TupleElementNode = {
  identifier: SyntaxToken;
  type: TypeNode;
} & SyntaxNode;

export const tupleElementPrinter: Printer['print'] = (path, _, print) => {
  const { identifier }: TupleElementNode = path.getValue();

  return concat([path.call(print, 'type'), ' ', identifier.text]);
};

export type OmittedTypeArgumentNode = {
  omittedTypeArgumentToken: SyntaxToken;
} & SyntaxNode;

export const omittedTypeArgumentPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  const { omittedTypeArgumentToken }: OmittedTypeArgumentNode = path.getValue();

  return omittedTypeArgumentToken.text;
};
