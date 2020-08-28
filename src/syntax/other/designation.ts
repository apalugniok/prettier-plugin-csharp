import { SyntaxToken } from '../syntaxToken';
import { SyntaxNode } from '../syntaxNode';
import { doc, FastPath, Printer } from 'prettier';
import concat = doc.builders.concat;
import join = doc.builders.join;

export type SingleVariableDesignationNode = {
  identifier: SyntaxToken;
} & SyntaxNode;

export const singleVariableDesignationPrinter: Printer['print'] = (
  path: FastPath<SingleVariableDesignationNode>
) => path.getValue().identifier.text;

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
