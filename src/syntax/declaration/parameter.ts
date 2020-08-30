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

export const parameterListPrinter: Printer['print'] = (path, _, print) => {
  return group(
    concat([
      '(',
      indent(
        concat([
          softline,
          join(concat([',', line]), path.map(print, 'parameters')),
        ])
      ),
      softline,
      ')',
    ])
  );
};

export type BracketedParameterListNode = {
  closeBracketToken: SyntaxToken;
  parameters: Array<ParameterNode>;
  openBracketToken: SyntaxToken;
} & SyntaxNode;

export const bracketedParameterListPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  return group(
    concat([
      '[',
      indent(
        concat([
          softline,
          join(concat([',', line]), path.map(print, 'parameters')),
        ])
      ),
      softline,
      ']',
    ])
  );
};

export type TypeParameterListNode = {
  greaterThanToken: SyntaxToken;
  lessThanToken: SyntaxToken;
  parameters: Array<TypeParameterNode>;
} & SyntaxNode;

export const typeParameterListPrinter: Printer['print'] = (path, _, print) =>
  concat(['<', join(', ', path.map(print, 'parameters')), '>']);

export type ParameterNode = {
  attributeLists: Array<AttributeListNode>;
  default: EqualsValueClauseNode | null;
  identifier: SyntaxToken;
  modifiers: Array<SyntaxToken>;
  type: TypeNode | null;
} & SyntaxNode;

export const parameterPrinter: Printer['print'] = (path, _, print) => {
  const {
    default: defaultValue,
    modifiers,
    identifier,
    type,
  }: ParameterNode = path.getValue();

  return concat([
    join(' ', [...path.map(print, 'attributeLists'), '']),
    printModifiers(modifiers),
    type != null ? concat([path.call(print, 'type'), ' ']) : '',
    identifier.text,
    defaultValue != null ? concat([' ', path.call(print, 'default')]) : '',
  ]);
};

export type TypeParameterNode = {
  attributeLists: Array<AttributeListNode>;
  identifier: SyntaxToken;
  varianceKeyword: SyntaxToken;
} & SyntaxNode;

export const typeParameterPrinter: Printer['print'] = (path, _, print) => {
  const { identifier, varianceKeyword }: TypeParameterNode = path.getValue();
  return concat([
    join(' ', [...path.map(print, 'attributeLists'), '']),
    varianceKeyword.text,
    varianceKeyword.text !== '' ? ' ' : '',
    identifier.text,
  ]);
};
