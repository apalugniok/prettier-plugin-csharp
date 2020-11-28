import {
  ExpressionNode,
  StatementNode,
  SyntaxNode,
  TypeNode,
} from '../syntaxNode';
import { AttributeListNode } from '../declaration/attribute';
import { SyntaxToken } from '../syntaxToken';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import { printAttributeLists, wrapInBlock } from '../../helpers/printerHelpers';
import hardline = doc.builders.hardline;

export type ForEachStatementNode = {
  attributeLists: Array<AttributeListNode>;
  awaitKeyword: SyntaxToken;
  closeParenToken: SyntaxToken;
  expression: ExpressionNode;
  forEachKeyword: SyntaxToken;
  identifier: SyntaxToken;
  inKeyword: SyntaxToken;
  openParenToken: SyntaxToken;
  statement: StatementNode;
  type: TypeNode;
} & SyntaxNode;

export const forEachStatementPrinter: Printer['print'] = (path, _, print) => {
  const { awaitKeyword, statement }: ForEachStatementNode = path.getValue();

  return concat([
    printAttributeLists(path, print),
    path.call(print, 'awaitKeyword'),
    awaitKeyword.text === '' ? '' : ' ',
    path.call(print, 'forEachKeyword'),
    ' ',
    path.call(print, 'openParenToken'),
    path.call(print, 'type'),
    ' ',
    path.call(print, 'identifier'),
    ' ',
    path.call(print, 'inKeyword'),
    ' ',
    path.call(print, 'expression'),
    path.call(print, 'closeParenToken'),
    hardline,
    wrapInBlock(statement, path, print),
  ]);
};

export type ForEachVariableStatementNode = {
  attributeLists: Array<AttributeListNode>;
  awaitKeyword: SyntaxToken;
  closeParenToken: SyntaxToken;
  expression: ExpressionNode;
  forEachKeyword: SyntaxToken;
  inKeyword: SyntaxToken;
  openParenToken: SyntaxToken;
  statement: StatementNode;
  variable: ExpressionNode;
} & SyntaxNode;

export const forEachVariableStatementPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  const { statement }: ForEachStatementNode = path.getValue();

  return concat([
    printAttributeLists(path, print),
    path.call(print, 'awaitKeyword'),
    ' ',
    path.call(print, 'forEachKeyword'),
    ' ',
    path.call(print, 'openParenToken'),
    path.call(print, 'variable'),
    ' ',
    path.call(print, 'inKeyword'),
    ' ',
    path.call(print, 'expression'),
    path.call(print, 'closeParenToken'),
    wrapInBlock(statement, path, print),
  ]);
};
