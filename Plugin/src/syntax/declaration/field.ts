import { DeclarationNode } from '../syntaxNode';
import { AttributeListNode } from './attribute';
import { VariableDeclarationNode } from './variable';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import { SyntaxToken } from '../syntaxToken';
import {
  printAttributeLists,
  printLeadingNewLine,
  printModifiers,
} from '../../helpers/printerHelpers';

export type FieldDeclarationNode = {
  attributeLists: Array<AttributeListNode>;
  declaration: VariableDeclarationNode;
  modifiers: Array<SyntaxToken>;
  semicolonToken: SyntaxToken;
} & DeclarationNode;

export const fieldDeclarationPrinter: Printer<FieldDeclarationNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    printLeadingNewLine(path),
    printAttributeLists(path, print),
    printModifiers(path, print),
    path.call(print, 'declaration'),
    path.call(print, 'semicolonToken'),
  ]);

export type EventFieldDeclarationNode = {
  attributeLists: Array<AttributeListNode>;
  eventKeyword: SyntaxToken;
  declaration: VariableDeclarationNode;
  modifiers: Array<SyntaxToken>;
  semicolonToken: SyntaxToken;
} & DeclarationNode;

export const eventFieldDeclarationPrinter: Printer<EventFieldDeclarationNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    printAttributeLists(path, print),
    printModifiers(path, print),
    path.call(print, 'eventKeyword'),
    ' ',
    path.call(print, 'declaration'),
    path.call(print, 'semicolonToken'),
  ]);
