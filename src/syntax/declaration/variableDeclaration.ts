import {
  DeclarationNode,
  ExpressionNode,
  SyntaxNode,
  TypeNode,
} from '../syntaxNode';
import { BracketedArgumentListNode } from '../expression/argument';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import join = doc.builders.join;
import { SyntaxToken } from '../syntaxToken';

export type VariableDeclarationNode = {
  type: TypeNode;
  variables: Array<VariableDeclaratorNode>;
} & DeclarationNode;

export const variableDeclarationPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  return concat([
    path.call(print, 'type'),
    ' ',
    join(', ', path.map(print, 'variables')),
  ]);
};

export type VariableDeclaratorNode = {
  identifier: SyntaxToken;
  initializer: EqualsValueClauseNode | null;
  argumentList: BracketedArgumentListNode | null;
} & SyntaxNode;

export const variableDeclaratorPrinter: Printer['print'] = (path, _, print) => {
  const {
    argumentList,
    identifier,
    initializer,
  }: VariableDeclaratorNode = path.getValue();

  return concat([
    identifier.text,
    argumentList != null ? path.call(print, 'argumentList') : '',
    initializer != null ? concat([' ', path.call(print, 'initializer')]) : '',
  ]);
};

export type EqualsValueClauseNode = {
  equalsToken: SyntaxToken;
  value: ExpressionNode;
} & SyntaxNode;

export const equalsValueClausePrinter: Printer['print'] = (path, _, print) =>
  concat(['=', ' ', path.call(print, 'value')]);
