import { DeclarationNode, SyntaxNode, TypeNode } from '../syntaxNode';
import { AttributeListNode } from './attribute';
import { EqualsValueClauseNode } from './variableDeclaration';
import { ExplicitInterfaceSpecifierNode } from './interfaceDeclaration';
import { ArrowExpressionClauseNode } from '../expression/arrowExpressionClause';
import { BlockNode } from '../statement/block';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import line = doc.builders.line;
import join = doc.builders.join;
import group = doc.builders.group;
import indent = doc.builders.indent;
import hardline = doc.builders.hardline;
import { BracketedParameterListNode } from './parameter';

export type PropertyDeclarationNode = {
  attributeLists: Array<AttributeListNode>;
  modifiers: Array<string>;
  name: string;
  propertyType: TypeNode;
  accessors: AccessorListNode | null;
  expressionBody: ArrowExpressionClauseNode | null;
  initializer: EqualsValueClauseNode | null;
  interfaceSpecifier: ExplicitInterfaceSpecifierNode | null;
} & DeclarationNode;

export const propertyDeclarationPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  const {
    accessors,
    expressionBody,
    initializer,
    modifiers,
    name,
  }: PropertyDeclarationNode = path.getValue();

  return group(
    concat([
      join(hardline, [...path.map(print, 'attributeLists'), '']),
      join(' ', [...modifiers, '']),
      path.call(print, 'propertyType'),
      ' ',
      path.call(print, 'interfaceSpecifier'),
      name,
      accessors != null ? concat([line, path.call(print, 'accessors')]) : '',
      expressionBody != null
        ? concat([line, path.call(print, 'expressionBody')])
        : '',
      initializer != null
        ? concat([line, path.call(print, 'initializer')])
        : '',
      expressionBody != null || initializer != null ? ';' : '',
    ])
  );
};

export type EventDeclarationNode = {
  attributeLists: Array<AttributeListNode>;
  modifiers: Array<string>;
  name: string;
  propertyType: TypeNode;
  accessors: AccessorListNode | null;
  interfaceSpecifier: ExplicitInterfaceSpecifierNode | null;
} & DeclarationNode;

export const eventDeclarationPrinter: Printer['print'] = (path, _, print) => {
  const { accessors, modifiers, name }: EventDeclarationNode = path.getValue();

  return group(
    concat([
      join(hardline, [...path.map(print, 'attributeLists'), '']),
      join(' ', [...modifiers, '']),
      'event',
      ' ',
      path.call(print, 'propertyType'),
      ' ',
      path.call(print, 'interfaceSpecifier'),
      name,
      line,
      path.call(print, 'accessors'),
      accessors == null ? ';' : '',
    ])
  );
};

export type IndexerDeclarationNode = {
  attributeLists: Array<AttributeListNode>;
  modifiers: Array<string>;
  parameters: BracketedParameterListNode;
  propertyType: TypeNode;
  accessors: AccessorListNode | null;
  interfaceSpecifier: ExplicitInterfaceSpecifierNode | null;
} & DeclarationNode;

export const indexerDeclarationPrinter: Printer['print'] = (path, _, print) => {
  const { modifiers }: IndexerDeclarationNode = path.getValue();

  return group(
    concat([
      join(hardline, [...path.map(print, 'attributeLists'), '']),
      join(' ', [...modifiers, '']),
      path.call(print, 'propertyType'),
      ' ',
      path.call(print, 'interfaceSpecifier'),
      'this',
      path.call(print, 'parameters'),
      line,
      path.call(print, 'accessors'),
    ])
  );
};

export type AccessorListNode = {
  accessors: Array<AccessorDeclarationNode>;
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
    : '{}';
};

export type AccessorDeclarationNode = {
  attributeLists: Array<AttributeListNode>;
  modifiers: Array<string>;
  keyword: string;
  body: BlockNode | ArrowExpressionClauseNode | null;
} & SyntaxNode;

export const accessorDeclarationPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  const { body, modifiers, keyword }: AccessorDeclarationNode = path.getValue();

  return group(
    concat([
      join(line, [...path.map(print, 'attributeLists'), '']),
      group(
        concat([
          join(' ', [...modifiers, '']),
          keyword,
          body != null ? concat([line, path.call(print, 'body')]) : '',
          body?.type !== 'Block' ? ';' : '',
        ])
      ),
    ])
  );
};
