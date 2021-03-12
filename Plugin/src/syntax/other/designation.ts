import { SyntaxToken } from '../syntaxToken';
import { SyntaxNode } from '../syntaxNode';
import { doc, FastPath, Printer } from 'prettier';
import concat = doc.builders.concat;
import join = doc.builders.join;

export type SingleVariableDesignationNode = {
  identifier: SyntaxToken;
} & SyntaxNode;

export const singleVariableDesignationPrinter: Printer<SingleVariableDesignationNode>['print'] = (
  path,
  _,
  print
) => path.call(print, 'identifier');

export type DiscardDesignationNode = {
  underscoreToken: SyntaxToken;
} & SyntaxNode;

export const discardDesignationPrinter: Printer<DiscardDesignationNode>['print'] = (
  path,
  _,
  print
) => path.call(print, 'underscoreToken');

export type ParenthesizedVariableDesignationNode = {
  closeParenToken: SyntaxToken;
  openParenToken: SyntaxToken;
  variables: Array<
    | SingleVariableDesignationNode
    | DiscardDesignationNode
    | ParenthesizedVariableDesignationNode
  >;
} & SyntaxNode;

export const parenthesizedVariableDesignationPrinter: Printer<ParenthesizedVariableDesignationNode>['print'] = (
  path,
  _,
  print
) => {
  return concat([
    path.call(print, 'openParenToken'),
    join(', ', path.map(print, 'variables')),
    path.call(print, 'closeParenToken'),
  ]);
};
