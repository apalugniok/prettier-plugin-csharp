import { doc, Printer } from 'prettier';
import { SyntaxNode, TypeNode } from '../syntaxNode';
import concat = doc.builders.concat;
import { AttributeListNode } from './attribute';
import join = doc.builders.join;
import { EqualsValueClauseNode } from './variableDeclaration';
import softline = doc.builders.softline;
import indent = doc.builders.indent;
import group = doc.builders.group;
import line = doc.builders.line;

export type BracketedParameterListNode = {
  parameters: Array<ParameterNode>;
} & SyntaxNode;

export const bracketedParameterListPrinter: Printer['print'] = (path, _, print) => {
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
      ']'
    ])
  );
};

export type ParameterListNode = {
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
      ')'
    ])
  );
};

export type ParameterNode = {
  defaultValue: EqualsValueClauseNode | null;
  parameterType: TypeNode;
  name: string;
  attributeLists: Array<AttributeListNode>;
  modifiers: Array<string>;
} & SyntaxNode;

export const parameterPrinter: Printer['print'] = (path, _, print) => {
  const { defaultValue, modifiers, name }: ParameterNode = path.getValue();

  return concat([
    join(' ', [...path.map(print, 'attributeLists'), '']),
    join(' ', [...modifiers, '']),
    path.call(print, 'parameterType'),
    ' ',
    name,
    defaultValue != null ? concat([' ', path.call(print, 'defaultValue')]) : '',
  ]);
};

export type TypeParameterListNode = {
  parameters: Array<TypeParameterNode>;
} & SyntaxNode;

export const typeParameterListPrinter: Printer['print'] = (path, _, print) =>
  concat(['<', join(', ', path.map(print, 'parameters')), '>']);

export type TypeParameterNode = {
  attributeLists: Array<AttributeListNode>;
  variance: string;
  name: string;
} & SyntaxNode;

export const typeParameterPrinter: Printer['print'] = (path, _, print) => {
  const { name, variance }: TypeParameterNode = path.getValue();
  return concat([
    join(' ', [...path.map(print, 'attributeLists'), '']),
    variance,
    variance !== '' ? ' ' : '',
    name,
  ]);
};
