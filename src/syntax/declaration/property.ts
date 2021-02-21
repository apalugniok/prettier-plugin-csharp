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
  printLeadingNewLine,
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

export const propertyDeclarationPrinter: Printer<PropertyDeclarationNode>['print'] = (
  path,
  _,
  print
) => {
  const { accessorList, expressionBody, initializer } = path.getValue();

  return group(
    concat([
      printLeadingNewLine(path),
      printAttributeLists(path, print),
      printModifiers(path, print),
      path.call(print, 'type'),
      ' ',
      path.call(print, 'explicitInterfaceSpecifier'),
      path.call(print, 'identifier'),
      accessorList != null
        ? concat([line, path.call(print, 'accessorList')])
        : '',
      expressionBody != null
        ? concat([' ', path.call(print, 'expressionBody')])
        : '',
      initializer != null
        ? concat([line, path.call(print, 'initializer')])
        : '',
      expressionBody != null || initializer != null
        ? path.call(print, 'semicolonToken')
        : '',
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

export const eventDeclarationPrinter: Printer<EventDeclarationNode>['print'] = (
  path,
  _,
  print
) => {
  const { accessorList } = path.getValue();

  return group(
    concat([
      printLeadingNewLine(path),
      printAttributeLists(path, print),
      printModifiers(path, print),
      path.call(print, 'eventKeyword'),
      ' ',
      path.call(print, 'type'),
      ' ',
      path.call(print, 'explicitInterfaceSpecifier'),
      path.call(print, 'identifier'),
      line,
      path.call(print, 'accessorList'),
      accessorList == null ? path.call(print, 'semicolonToken') : '',
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

export const indexerDeclarationPrinter: Printer<IndexerDeclarationNode>['print'] = (
  path,
  _,
  print
) =>
  group(
    concat([
      printLeadingNewLine(path),
      printAttributeLists(path, print),
      printModifiers(path, print),
      path.call(print, 'type'),
      ' ',
      path.call(print, 'explicitInterfaceSpecifier'),
      path.call(print, 'thisKeyword'),
      path.call(print, 'parameterList'),
      line,
      path.call(print, 'accessorList'),
      path.call(print, 'expressionBody'),
      path.call(print, 'semicolonToken'),
    ])
  );

export type AccessorListNode = {
  accessors: Array<AccessorDeclarationNode>;
  closeBraceToken: SyntaxToken;
  openBraceToken: SyntaxToken;
} & SyntaxNode;

export const accessorListPrinter: Printer<AccessorListNode>['print'] = (
  path,
  _,
  print
) => {
  const { accessors } = path.getValue();

  return accessors.length !== 0
    ? concat([
        path.call(print, 'openBraceToken'),
        indent(concat([line, join(line, path.map(print, 'accessors'))])),
        line,
        path.call(print, 'closeBraceToken'),
      ])
    : concat([
        path.call(print, 'openBraceToken'),
        ' ',
        path.call(print, 'closeBraceToken'),
      ]);
};

export type AccessorDeclarationNode = {
  attributeLists: Array<AttributeListNode>;
  body: BlockNode | null;
  expressionBody: ArrowExpressionClauseNode | null;
  keyword: SyntaxToken;
  modifiers: Array<SyntaxToken>;
  semicolonToken: SyntaxToken;
} & SyntaxNode;

export const accessorDeclarationPrinter: Printer<AccessorDeclarationNode>['print'] = (
  path,
  _,
  print
) => {
  const { body, expressionBody } = path.getValue();

  return group(
    concat([
      join(line, [...path.map(print, 'attributeLists'), '']),
      group(
        concat([
          printModifiers(path, print),
          path.call(print, 'keyword'),
          body != null ? concat([line, path.call(print, 'body')]) : '',
          expressionBody != null
            ? concat([line, path.call(print, 'expressionBody')])
            : '',
          path.call(print, 'semicolonToken'),
        ])
      ),
    ])
  );
};
