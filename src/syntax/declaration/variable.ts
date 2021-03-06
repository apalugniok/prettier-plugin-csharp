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
import group = doc.builders.group;

export type VariableDeclarationNode = {
  type: TypeNode;
  variables: Array<VariableDeclaratorNode>;
} & DeclarationNode;

export const variableDeclarationPrinter: Printer<VariableDeclarationNode>['print'] = (
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

export const variableDeclaratorPrinter: Printer<VariableDeclaratorNode>['print'] = (
  path,
  _,
  print
) => {
  const { argumentList, initializer } = path.getValue();

  return group(
    concat([
      path.call(print, 'identifier'),
      argumentList != null ? path.call(print, 'argumentList') : '',
      initializer != null ? concat([' ', path.call(print, 'initializer')]) : '',
    ])
  );
};

export type EqualsValueClauseNode = {
  equalsToken: SyntaxToken;
  value: ExpressionNode;
} & SyntaxNode;

export const equalsValueClausePrinter: Printer<EqualsValueClauseNode>['print'] = (
  path,
  _,
  print
) => concat([path.call(print, 'equalsToken'), ' ', path.call(print, 'value')]);
