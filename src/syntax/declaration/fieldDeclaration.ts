import { DeclarationNode } from '../syntaxNode';
import { AttributeListNode } from './attribute';
import { VariableDeclarationNode } from './variableDeclaration';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import join = doc.builders.join;
import hardline = doc.builders.hardline;

export type FieldDeclarationNode = {
  attributeLists: Array<AttributeListNode>;
  declaration: VariableDeclarationNode;
  leadingEmptyLine: boolean;
  modifiers: Array<string>;
} & DeclarationNode;

export const fieldDeclarationPrinter: Printer['print'] = (path, _, print) => {
  const { leadingEmptyLine, modifiers }: FieldDeclarationNode = path.getValue();

  return concat([
    leadingEmptyLine ? hardline : '',
    join(hardline, [...path.map(print, 'attributeLists'), '']),
    join(' ', [...modifiers, '']),
    path.call(print, 'declaration'),
  ]);
};

export type EventFieldDeclarationNode = {
  attributeLists: Array<AttributeListNode>;
  declaration: VariableDeclarationNode;
  leadingEmptyLine: boolean;
  modifiers: Array<string>;
} & DeclarationNode;

export const eventFieldDeclarationPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  const {
    leadingEmptyLine,
    modifiers,
  }: EventFieldDeclarationNode = path.getValue();

  return concat([
    leadingEmptyLine ? hardline : '',
    join(hardline, [...path.map(print, 'attributeLists'), '']),
    join(' ', [...modifiers, '']),
    'event',
    ' ',
    path.call(print, 'declaration'),
  ]);
};
