import { doc, Printer } from 'prettier';
import { SyntaxNode, TypeNode } from '../syntaxNode';
import concat = doc.builders.concat;
import { AttributeListNode } from './attribute';
import join = doc.builders.join;
import { EqualsValueClauseNode } from './variable';
import softline = doc.builders.softline;
import indent = doc.builders.indent;
import group = doc.builders.group;
import line = doc.builders.line;
import { SyntaxToken } from '../syntaxToken';
import { printModifiers } from '../../helpers/printerHelpers';

export type ParameterListNode = {
  closeParenToken: SyntaxToken;
  openParenToken: SyntaxToken;
  parameters: Array<ParameterNode>;
} & SyntaxNode;

export const parameterListPrinter: Printer<ParameterListNode>['print'] = (
  path,
  _,
  print
) => {
  return group(
    concat([
      path.call(print, 'openParenToken'),
      indent(
        concat([
          softline,
          join(concat([',', line]), path.map(print, 'parameters')),
        ])
      ),
      softline,
      path.call(print, 'closeParenToken'),
    ])
  );
};

export type BracketedParameterListNode = {
  closeBracketToken: SyntaxToken;
  parameters: Array<ParameterNode>;
  openBracketToken: SyntaxToken;
} & SyntaxNode;

export const bracketedParameterListPrinter: Printer<BracketedParameterListNode>['print'] = (
  path,
  _,
  print
) => {
  return group(
    concat([
      path.call(print, 'openBracketToken'),
      indent(
        concat([
          softline,
          join(concat([',', line]), path.map(print, 'parameters')),
        ])
      ),
      softline,
      path.call(print, 'closeBracketToken'),
    ])
  );
};

export type TypeParameterListNode = {
  greaterThanToken: SyntaxToken;
  lessThanToken: SyntaxToken;
  parameters: Array<TypeParameterNode>;
} & SyntaxNode;

export const typeParameterListPrinter: Printer<TypeParameterListNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    path.call(print, 'lessThanToken'),
    join(', ', path.map(print, 'parameters')),
    path.call(print, 'greaterThanToken'),
  ]);

export type ParameterNode = {
  attributeLists: Array<AttributeListNode>;
  default: EqualsValueClauseNode | null;
  identifier: SyntaxToken;
  modifiers: Array<SyntaxToken>;
  type: TypeNode | null;
} & SyntaxNode;

export const parameterPrinter: Printer<ParameterNode>['print'] = (
  path,
  _,
  print
) => {
  const { default: defaultValue, type } = path.getValue();

  return concat([
    join(' ', [...path.map(print, 'attributeLists'), '']),
    printModifiers(path, print),
    type != null ? concat([path.call(print, 'type'), ' ']) : '',
    path.call(print, 'identifier'),
    defaultValue != null ? concat([' ', path.call(print, 'default')]) : '',
  ]);
};

export type TypeParameterNode = {
  attributeLists: Array<AttributeListNode>;
  identifier: SyntaxToken;
  varianceKeyword: SyntaxToken;
} & SyntaxNode;

export const typeParameterPrinter: Printer<TypeParameterNode>['print'] = (
  path,
  _,
  print
) => {
  const { varianceKeyword }: TypeParameterNode = path.getValue();
  return concat([
    join(' ', [...path.map(print, 'attributeLists'), '']),
    path.call(print, 'varianceKeyword'),
    varianceKeyword.text !== '' ? ' ' : '',
    path.call(print, 'identifier'),
  ]);
};
