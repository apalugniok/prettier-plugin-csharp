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

export const arrayRankSpecifierPrinter: Printer<ArrayRankSpecifierNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    path.call(print, 'openBracketToken'),
    join(', ', path.map(print, 'sizes')),
    path.call(print, 'closeBracketToken'),
  ]);

export type OmittedArraySizeExpressionNode = {
  omittedArraySizeExpressionToken: SyntaxToken;
} & SyntaxNode;

export const omittedArraySizeExpressionPrinter: Printer<OmittedArraySizeExpressionNode>['print'] = (
  path,
  _,
  print
) => path.call(print, 'omittedArraySizeExpressionToken');

export type PredefinedTypeNode = {
  keyword: SyntaxToken;
} & SyntaxNode;

export const predefinedTypePrinter: Printer<PredefinedTypeNode>['print'] = (
  path,
  _,
  print
) => path.call(print, 'keyword');

export type RefTypeNode = {
  readonlyKeyword: SyntaxToken;
  refKeyword: SyntaxToken;
  type: TypeNode;
} & SyntaxNode;

export const refTypePrinter: Printer<RefTypeNode>['print'] = (
  path,
  _,
  print
) => {
  const { readonlyKeyword } = path.getValue();

  return concat([
    path.call(print, 'refKeyword'),
    ' ',
    path.call(print, 'readonlyKeyword'),
    readonlyKeyword.text !== '' ? '' : ' ',
    path.call(print, 'type'),
  ]);
};

export type PointerTypeNode = {
  asteriskToken: SyntaxToken;
  elementType: TypeNode;
} & SyntaxNode;

export const pointerTypePrinter: Printer<PointerTypeNode>['print'] = (
  path,
  _,
  print
) =>
  concat([path.call(print, 'elementType'), path.call(print, 'asteriskToken')]);

export type NullableTypeNode = {
  elementType: TypeNode;
  questionToken: SyntaxToken;
} & SyntaxNode;

export const nullableTypePrinter: Printer<NullableTypeNode>['print'] = (
  path,
  _,
  print
) =>
  concat([path.call(print, 'elementType'), path.call(print, 'questionToken')]);

export type TupleTypeNode = {
  closeParenToken: SyntaxToken;
  elements: Array<TupleElementNode>;
  openParenToken: SyntaxToken;
} & SyntaxNode;

export const tupleTypePrinter: Printer<TupleTypeNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    path.call(print, 'openParenToken'),
    join(', ', path.map(print, 'elements')),
    path.call(print, 'closeParenToken'),
  ]);

export type TupleElementNode = {
  identifier: SyntaxToken;
  type: TypeNode;
} & SyntaxNode;

export const tupleElementPrinter: Printer<TupleElementNode>['print'] = (
  path,
  _,
  print
) => concat([path.call(print, 'type'), ' ', path.call(print, 'identifier')]);

export type OmittedTypeArgumentNode = {
  omittedTypeArgumentToken: SyntaxToken;
} & SyntaxNode;

export const omittedTypeArgumentPrinter: Printer<OmittedTypeArgumentNode>['print'] = (
  path,
  _,
  print
) => path.call(print, 'omittedTypeArgumentToken');
