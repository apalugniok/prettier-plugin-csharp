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

export const queryExpressionPrinter: Printer['print'] = (path, _, print) =>
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

export const queryBodyPrinter: Printer['print'] = (path, _, print) => {
  const { continuation }: QueryBodyNode = path.getValue();

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

export const queryContinuationPrinter: Printer['print'] = (path, _, print) => {
  const { identifier }: QueryContinuationNode = path.getValue();

  return concat([
    'into',
    ' ',
    path.call(print, 'identifier'),
    line,
    path.call(print, 'body'),
  ]);
};

export type FromClauseNode = {
  expression: ExpressionNode;
  fromKeyword: SyntaxToken;
  identifier: SyntaxToken;
  inKeyword: SyntaxToken;
  type: TypeNode | null;
} & SyntaxNode;

export const fromClausePrinter: Printer['print'] = (path, _, print) => {
  const { identifier, type }: FromClauseNode = path.getValue();

  return concat([
    'from',
    ' ',
    type !== null ? concat([path.call(print, 'type'), ' ']) : '',
    path.call(print, 'identifier'),
    ' ',
    'in',
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

export const letClausePrinter: Printer['print'] = (path, _, print) => {
  const { identifier }: LetClauseNode = path.getValue();

  return concat([
    'let',
    ' ',
    path.call(print, 'identifier'),
    ' ',
    '=',
    ' ',
    path.call(print, 'expression'),
  ]);
};

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

export const joinClausePrinter: Printer['print'] = (path, _, print) => {
  const { identifier, type }: JoinClauseNode = path.getValue();

  return concat([
    'join',
    ' ',
    type != null ? concat([path.call(print, 'type'), ' ']) : '',
    path.call(print, 'identifier'),
    ' ',
    'in',
    ' ',
    path.call(print, 'inExpression'),
    ' ',
    'on',
    ' ',
    path.call(print, 'leftExpression'),
    ' ',
    'equals',
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

export const joinIntoClausePrinter: Printer['print'] = (path, _, print) => {
  const { identifier }: JoinIntoClauseNode = path.getValue();

  return concat(['into', ' ', path.call(print, 'identifier')]);
};

export type WhereClauseNode = {
  condition: ExpressionNode;
  whereKeyword: SyntaxToken;
} & SyntaxNode;

export const whereClausePrinter: Printer['print'] = (path, _, print) => {
  return concat(['where', ' ', path.call(print, 'condition')]);
};

export type OrderByClauseNode = {
  orderByKeyword: SyntaxToken;
  orderings: Array<OrderingNode>;
} & SyntaxNode;

export const orderByClausePrinter: Printer['print'] = (path, _, print) => {
  return group(
    concat([
      'orderby',
      ifBreak('', ' '),
      indent(
        concat([
          softline,
          join(concat([',', line]), path.map(print, 'orderings')),
        ])
      ),
    ])
  );
};

export type OrderingNode = {
  ascendingOrDescendingKeyword: SyntaxToken;
  expression: ExpressionNode;
} & SyntaxNode;

export const orderingPrinter: Printer['print'] = (path, _, print) => {
  const { ascendingOrDescendingKeyword }: OrderingNode = path.getValue();

  return concat([
    path.call(print, 'expression'),
    ascendingOrDescendingKeyword.text !== ''
      ? concat([' ', ascendingOrDescendingKeyword.text])
      : '',
  ]);
};

export type SelectClauseNode = {
  expression: ExpressionNode;
  selectKeyword: SyntaxToken;
} & SyntaxNode;

export const selectClausePrinter: Printer['print'] = (path, _, print) => {
  return concat(['select', ' ', path.call(print, 'expression')]);
};

export type GroupClauseNode = {
  byExpression: ExpressionNode;
  byKeyword: SyntaxToken;
  groupExpression: ExpressionNode;
  groupKeyword: SyntaxToken;
} & SyntaxNode;

export const groupClausePrinter: Printer['print'] = (path, _, print) => {
  return concat([
    'group',
    ' ',
    path.call(print, 'groupExpression'),
    ' ',
    'by',
    ' ',
    path.call(print, 'byExpression'),
  ]);
};
