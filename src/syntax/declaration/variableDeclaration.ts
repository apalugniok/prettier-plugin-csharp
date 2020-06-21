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

export type VariableDeclarationNode = {
  variables: Array<VariableDeclaratorNode>;
  variableType: TypeNode;
} & DeclarationNode;

export const variableDeclarationPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  return concat([
    path.call(print, 'variableType'),
    ' ',
    join(', ', path.map(print, 'variables')),
    ';',
  ]);
};

export type VariableDeclaratorNode = {
  name: string;
  initializer: EqualsValueClauseNode | null;
  arguments: BracketedArgumentListNode | null;
} & SyntaxNode;

export const variableDeclaratorPrinter: Printer['print'] = (path, _, print) => {
  const node: VariableDeclaratorNode = path.getValue();

  return concat([
    node.name,
    node.arguments != null ? path.call(print, 'arguments') : '',
    node.initializer != null
      ? concat([' ', path.call(print, 'initializer')])
      : '',
  ]);
};

export type EqualsValueClauseNode = {
  value: ExpressionNode;
} & SyntaxNode;

export const equalsValueClausePrinter: Printer['print'] = (path, _, print) => {
  return concat(['=', ' ', path.call(print, 'value')]);
};
