import {
  ExpressionNode,
  QueryClauseNode,
  SyntaxNode,
  TypeNode,
} from '../syntaxNode';
import { SyntaxToken } from '../syntaxToken';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import group = doc.builders.group;
import line = doc.builders.line;
import join = doc.builders.join;
import softline = doc.builders.softline;
import indent = doc.builders.indent;
import ifBreak = doc.builders.ifBreak;

export type QueryExpressionNode = {
  body: QueryBodyNode;
  fromClause: FromClauseNode;
} & SyntaxNode;

export const queryExpressionPrinter: Printer<QueryExpressionNode>['print'] = (
  path,
  _,
  print
) =>
  group(
    indent(
      concat([path.call(print, 'fromClause'), line, path.call(print, 'body')])
    )
  );

export type QueryBodyNode = {
  clauses: Array<QueryClauseNode>;
  continuation: QueryContinuationNode | null;
  selectOrGroup: SelectClauseNode | GroupClauseNode;
} & SyntaxNode;

export const queryBodyPrinter: Printer<QueryBodyNode>['print'] = (
  path,
  _,
  print
) => {
  const { continuation } = path.getValue();

  return concat([
    join(line, [...path.map(print, 'clauses'), '']),
    path.call(print, 'selectOrGroup'),
    continuation != null ? ' ' : '',
    path.call(print, 'continuation'),
  ]);
};

export type QueryContinuationNode = {
  body: QueryBodyNode;
  identifier: SyntaxToken;
  intoKeyword: SyntaxToken;
} & SyntaxNode;

export const queryContinuationPrinter: Printer<QueryContinuationNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    path.call(print, 'intoKeyword'),
    ' ',
    path.call(print, 'identifier'),
    line,
    path.call(print, 'body'),
  ]);

export type FromClauseNode = {
  expression: ExpressionNode;
  fromKeyword: SyntaxToken;
  identifier: SyntaxToken;
  inKeyword: SyntaxToken;
  type: TypeNode | null;
} & SyntaxNode;

export const fromClausePrinter: Printer<FromClauseNode>['print'] = (
  path,
  _,
  print
) => {
  const { type } = path.getValue();

  return concat([
    path.call(print, 'fromKeyword'),
    ' ',
    type !== null ? concat([path.call(print, 'type'), ' ']) : '',
    path.call(print, 'identifier'),
    ' ',
    path.call(print, 'inKeyword'),
    ' ',
    path.call(print, 'expression'),
  ]);
};

export type LetClauseNode = {
  equalsToken: SyntaxToken;
  expression: ExpressionNode;
  identifier: SyntaxToken;
  letKeyword: SyntaxToken;
} & SyntaxNode;

export const letClausePrinter: Printer<LetClauseNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    path.call(print, 'letKeyword'),
    ' ',
    path.call(print, 'identifier'),
    ' ',
    path.call(print, 'equalsToken'),
    ' ',
    path.call(print, 'expression'),
  ]);

export type JoinClauseNode = {
  equalsKeyword: SyntaxToken;
  identifier: SyntaxToken;
  inExpression: ExpressionNode;
  inKeyword: SyntaxToken;
  into: JoinIntoClauseNode | null;
  joinKeyword: SyntaxToken;
  leftExpression: ExpressionNode;
  onKeyword: SyntaxToken;
  rightExpression: ExpressionNode;
  type: TypeNode | null;
} & SyntaxNode;

export const joinClausePrinter: Printer<JoinClauseNode>['print'] = (
  path,
  _,
  print
) => {
  const { type } = path.getValue();

  return concat([
    path.call(print, 'joinKeyword'),
    ' ',
    type != null ? concat([path.call(print, 'type'), ' ']) : '',
    path.call(print, 'identifier'),
    ' ',
    path.call(print, 'inKeyword'),
    ' ',
    path.call(print, 'inExpression'),
    ' ',
    path.call(print, 'onKeyword'),
    ' ',
    path.call(print, 'leftExpression'),
    ' ',
    path.call(print, 'equalsKeyword'),
    ' ',
    path.call(print, 'rightExpression'),
    ' ',
    path.call(print, 'into'),
  ]);
};

export type JoinIntoClauseNode = {
  intoKeyword: SyntaxToken;
  identifier: SyntaxToken;
} & SyntaxNode;

export const joinIntoClausePrinter: Printer<JoinIntoClauseNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    path.call(print, 'intoKeyword'),
    ' ',
    path.call(print, 'identifier'),
  ]);

export type WhereClauseNode = {
  condition: ExpressionNode;
  whereKeyword: SyntaxToken;
} & SyntaxNode;

export const whereClausePrinter: Printer<WhereClauseNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    path.call(print, 'whereKeyword'),
    ' ',
    path.call(print, 'condition'),
  ]);

export type OrderByClauseNode = {
  orderByKeyword: SyntaxToken;
  orderings: Array<OrderingNode>;
} & SyntaxNode;

export const orderByClausePrinter: Printer<OrderByClauseNode>['print'] = (
  path,
  _,
  print
) =>
  group(
    concat([
      path.call(print, 'orderByKeyword'),
      ifBreak('', ' '),
      indent(
        concat([
          softline,
          join(concat([',', line]), path.map(print, 'orderings')),
        ])
      ),
    ])
  );

export type OrderingNode = {
  ascendingOrDescendingKeyword: SyntaxToken;
  expression: ExpressionNode;
} & SyntaxNode;

export const orderingPrinter: Printer<OrderingNode>['print'] = (
  path,
  _,
  print
) => {
  const { ascendingOrDescendingKeyword }: OrderingNode = path.getValue();

  return concat([
    path.call(print, 'expression'),
    ascendingOrDescendingKeyword.text !== '' ? ' ' : '',
    path.call(print, 'ascendingOrDescendingKeyword'),
  ]);
};

export type SelectClauseNode = {
  expression: ExpressionNode;
  selectKeyword: SyntaxToken;
} & SyntaxNode;

export const selectClausePrinter: Printer<SelectClauseNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    path.call(print, 'selectKeyword'),
    ' ',
    path.call(print, 'expression'),
  ]);

export type GroupClauseNode = {
  byExpression: ExpressionNode;
  byKeyword: SyntaxToken;
  groupExpression: ExpressionNode;
  groupKeyword: SyntaxToken;
} & SyntaxNode;

export const groupClausePrinter: Printer<GroupClauseNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    path.call(print, 'groupKeyword'),
    ' ',
    path.call(print, 'groupExpression'),
    ' ',
    path.call(print, 'byKeyword'),
    ' ',
    path.call(print, 'byExpression'),
  ]);
