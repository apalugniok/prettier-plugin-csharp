import { SyntaxNode, TypeNode } from '../syntaxNode';
import { doc, Printer } from 'prettier';
import { SyntaxToken } from '../syntaxToken';
import concat = doc.builders.concat;
import join = doc.builders.join;

export type DeclarationExpressionNode = {
  type: TypeNode;
  designation:
    | SingleVariableDesignationNode
    | DiscardDesignationNode
    | ParenthesizedVariableDesignationNode;
} & SyntaxNode;

export const declarationExpressionPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  return concat([
    path.call(print, 'type'),
    ' ',
    path.call(print, 'designation'),
  ]);
};

export type SingleVariableDesignationNode = {
  identifier: SyntaxToken;
} & SyntaxNode;

export const singleVariableDesignationPrinter: Printer['print'] = (path) =>
  (path.getValue() as SingleVariableDesignationNode).identifier.text;

export type DiscardDesignationNode = {
  underscoreToken: SyntaxToken;
} & SyntaxNode;

export const discardDesignationPrinter: Printer['print'] = (path) =>
  (path.getValue() as DiscardDesignationNode).underscoreToken.text;

export type ParenthesizedVariableDesignationNode = {
  closeParenToken: SyntaxToken;
  openParenToken: SyntaxToken;
  variables: Array<
    | SingleVariableDesignationNode
    | DiscardDesignationNode
    | ParenthesizedVariableDesignationNode
  >;
} & SyntaxNode;

export const parenthesizedVariableDesignationPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  return concat(['(', join(', ', path.map(print, 'variables')), ')']);
};
