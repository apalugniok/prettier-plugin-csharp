import { DeclarationNode, SyntaxNode, TypeNode } from '../syntaxNode';
import { AttributeListNode } from './attribute';
import { EqualsValueClauseNode } from './variable';
import { ArrowExpressionClauseNode } from '../expression/arrowExpressionClause';
import { BlockNode } from '../statement/block';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import line = doc.builders.line;
import join = doc.builders.join;
import group = doc.builders.group;
import indent = doc.builders.indent;
import { BracketedParameterListNode } from './parameter';
import { SyntaxToken } from '../syntaxToken';
import {
  printAttributeLists,
  printModifiers,
} from '../../helpers/printerHelpers';
import { ExplicitInterfaceSpecifierNode } from './interface';

export type PropertyDeclarationNode = {
  accessorList: AccessorListNode | null;
  attributeLists: Array<AttributeListNode>;
  explicitInterfaceSpecifier: ExplicitInterfaceSpecifierNode | null;
  expressionBody: ArrowExpressionClauseNode | null;
  identifier: SyntaxToken;
  initializer: EqualsValueClauseNode | null;
  modifiers: Array<SyntaxToken>;
  semicolonToken: SyntaxToken;
  type: TypeNode;
} & DeclarationNode;

export const propertyDeclarationPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  const {
    accessorList,
    expressionBody,
    initializer,
    modifiers,
    identifier,
  }: PropertyDeclarationNode = path.getValue();

  return group(
    concat([
      printAttributeLists(path, print),
      printModifiers(modifiers),
      path.call(print, 'type'),
      ' ',
      path.call(print, 'explicitInterfaceSpecifier'),
      identifier.text,
      accessorList != null
        ? concat([line, path.call(print, 'accessorList')])
        : '',
      expressionBody != null
        ? concat([' ', path.call(print, 'expressionBody')])
        : '',
      initializer != null
        ? concat([line, path.call(print, 'initializer')])
        : '',
      expressionBody != null || initializer != null ? ';' : '',
    ])
  );
};

export type EventDeclarationNode = {
  accessorList: AccessorListNode | null;
  attributeLists: Array<AttributeListNode>;
  eventKeyword: SyntaxToken;
  explicitInterfaceSpecifier: ExplicitInterfaceSpecifierNode | null;
  identifier: SyntaxToken;
  modifiers: Array<SyntaxToken>;
  semicolonToken: SyntaxToken;
  type: TypeNode;
} & DeclarationNode;

export const eventDeclarationPrinter: Printer['print'] = (path, _, print) => {
  const {
    accessorList,
    identifier,
    modifiers,
  }: EventDeclarationNode = path.getValue();

  return group(
    concat([
      printAttributeLists(path, print),
      printModifiers(modifiers),
      'event',
      ' ',
      path.call(print, 'type'),
      ' ',
      path.call(print, 'explicitInterfaceSpecifier'),
      identifier.text,
      line,
      path.call(print, 'accessorList'),
      accessorList == null ? ';' : '',
    ])
  );
};

export type IndexerDeclarationNode = {
  accessorList: AccessorListNode | null;
  attributeLists: Array<AttributeListNode>;
  explicitInterfaceSpecifier: ExplicitInterfaceSpecifierNode | null;
  expressionBody: ArrowExpressionClauseNode | null;
  modifiers: Array<SyntaxToken>;
  parameterList: BracketedParameterListNode;
  semicolonToken: SyntaxToken;
  thisKeyword: SyntaxToken;
  type: TypeNode;
} & DeclarationNode;

export const indexerDeclarationPrinter: Printer['print'] = (path, _, print) => {
  const { modifiers }: IndexerDeclarationNode = path.getValue();

  return group(
    concat([
      printAttributeLists(path, print),
      printModifiers(modifiers),
      path.call(print, 'type'),
      ' ',
      path.call(print, 'explicitInterfaceSpecifier'),
      'this',
      path.call(print, 'parameterList'),
      line,
      path.call(print, 'accessorList'),
      //todo arrow expression indexer
    ])
  );
};

export type AccessorListNode = {
  accessors: Array<AccessorDeclarationNode>;
  closeBraceToken: SyntaxToken;
  openBraceToken: SyntaxToken;
} & SyntaxNode;

export const accessorListPrinter: Printer['print'] = (path, _, print) => {
  const { accessors }: AccessorListNode = path.getValue();

  return accessors.length !== 0
    ? concat([
        '{',
        indent(concat([line, join(line, path.map(print, 'accessors'))])),
        line,
        '}',
      ])
    : '{ }';
};

export type AccessorDeclarationNode = {
  attributeLists: Array<AttributeListNode>;
  body: BlockNode | null;
  expressionBody: ArrowExpressionClauseNode | null;
  keyword: SyntaxToken;
  modifiers: Array<SyntaxToken>;
  semicolonToken: SyntaxToken;
} & SyntaxNode;

export const accessorDeclarationPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  const {
    body,
    expressionBody,
    modifiers,
    keyword,
    semicolonToken,
  }: AccessorDeclarationNode = path.getValue();

  return group(
    concat([
      join(line, [...path.map(print, 'attributeLists'), '']),
      group(
        concat([
          printModifiers(modifiers),
          keyword.text,
          body != null ? concat([line, path.call(print, 'body')]) : '',
          expressionBody != null
            ? concat([line, path.call(print, 'expressionBody')])
            : '',
          semicolonToken.text,
        ])
      ),
    ])
  );
};
