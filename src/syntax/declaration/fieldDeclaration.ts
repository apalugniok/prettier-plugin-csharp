import { DeclarationNode } from '../syntaxNode';
import { AttributeListNode } from './attribute';
import { VariableDeclarationNode } from './variableDeclaration';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import join = doc.builders.join;
import hardline = doc.builders.hardline;
import { SyntaxToken } from '../syntaxToken';

export type FieldDeclarationNode = {
  attributeLists: Array<AttributeListNode>;
  declaration: VariableDeclarationNode;
  modifiers: Array<SyntaxToken>;
  semicolonToken: SyntaxToken;
} & DeclarationNode;

export const fieldDeclarationPrinter: Printer['print'] = (path, _, print) => {
  const { modifiers }: FieldDeclarationNode = path.getValue();

  return concat([
    join(hardline, [...path.map(print, 'attributeLists'), '']),
    join(' ', [...modifiers.map((token) => token.text), '']),
    path.call(print, 'declaration'),
    ';',
  ]);
};

export type EventFieldDeclarationNode = {
  attributeLists: Array<AttributeListNode>;
  eventKeyword: SyntaxToken;
  declaration: VariableDeclarationNode;
  modifiers: Array<SyntaxToken>;
  semicolonToken: SyntaxToken;
} & DeclarationNode;

export const eventFieldDeclarationPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  const { modifiers }: EventFieldDeclarationNode = path.getValue();

  return concat([
    join(hardline, [...path.map(print, 'attributeLists'), '']),
    join(' ', [...modifiers.map((token) => token.text), '']),
    'event',
    ' ',
    path.call(print, 'declaration'),
    ';',
  ]);
};
