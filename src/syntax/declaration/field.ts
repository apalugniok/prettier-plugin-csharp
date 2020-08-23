import { DeclarationNode } from '../syntaxNode';
import { AttributeListNode } from './attribute';
import { VariableDeclarationNode } from './variable';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import { SyntaxToken } from '../syntaxToken';
import {
  printAttributeLists,
  printModifiers,
} from '../../helpers/printerHelpers';

export type FieldDeclarationNode = {
  attributeLists: Array<AttributeListNode>;
  declaration: VariableDeclarationNode;
  modifiers: Array<SyntaxToken>;
  semicolonToken: SyntaxToken;
} & DeclarationNode;

export const fieldDeclarationPrinter: Printer['print'] = (path, _, print) => {
  const { modifiers }: FieldDeclarationNode = path.getValue();

  return concat([
    printAttributeLists(path, print),
    printModifiers(modifiers),
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
    printAttributeLists(path, print),
    printModifiers(modifiers),
    'event',
    ' ',
    path.call(print, 'declaration'),
    ';',
  ]);
};
