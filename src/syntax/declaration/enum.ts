import { DeclarationNode } from '../syntaxNode';
import { AttributeListNode } from './attribute';
import { doc, Printer } from 'prettier';
import indent = doc.builders.indent;
import concat = doc.builders.concat;
import join = doc.builders.join;
import hardline = doc.builders.hardline;
import { EqualsValueClauseNode } from './variable';
import { SyntaxToken } from '../syntaxToken';
import { BaseListNode } from './baseType';
import {
  printAttributeLists,
  printLeadingNewLine,
  printModifiers,
} from '../../helpers/printerHelpers';

export type EnumDeclarationNode = {
  attributeLists: Array<AttributeListNode>;
  baseList: BaseListNode | null;
  closeBraceToken: SyntaxToken;
  enumKeyword: SyntaxToken;
  identifier: SyntaxToken;
  members: Array<EnumMemberDeclarationNode>;
  modifiers: Array<SyntaxToken>;
  openBraceToken: SyntaxToken;
  semicolonToken: SyntaxToken; // Optional trailing semicolon conventionally omitted
} & DeclarationNode;

export const enumDeclarationPrinter: Printer<EnumDeclarationNode>['print'] = (
  path,
  _,
  print
) => {
  const { baseList, members } = path.getValue();

  return concat([
    printLeadingNewLine(path),
    printAttributeLists(path, print),
    printModifiers(path, print),
    path.call(print, 'enumKeyword'),
    ' ',
    path.call(print, 'identifier'),
    baseList != null ? path.call(print, 'baseList') : '',
    hardline,
    path.call(print, 'openBraceToken'),
    members.length !== 0
      ? indent(
          concat([
            hardline,
            join(concat([',', hardline]), path.map(print, 'members')),
            ',',
          ])
        )
      : '',
    hardline,
    path.call(print, 'closeBraceToken'),
  ]);
};

export type EnumMemberDeclarationNode = {
  attributeLists: Array<AttributeListNode>;
  equalsValue: EqualsValueClauseNode | null;
  identifier: SyntaxToken;
  modifiers: Array<SyntaxToken>; // Enum members cannot have access modifiers
} & DeclarationNode;

export const enumMemberDeclarationPrinter: Printer<EnumMemberDeclarationNode>['print'] = (
  path,
  _,
  print
) => {
  const { equalsValue } = path.getValue();

  return concat([
    printAttributeLists(path, print),
    printModifiers(path, print),
    path.call(print, 'identifier'),
    equalsValue != null ? concat([' ', path.call(print, 'equalsValue')]) : '',
  ]);
};
