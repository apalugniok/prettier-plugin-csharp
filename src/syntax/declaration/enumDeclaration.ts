import { DeclarationNode } from '../syntaxNode';
import { AttributeListNode } from './attribute';
import { doc, Printer } from 'prettier';
import indent = doc.builders.indent;
import concat = doc.builders.concat;
import join = doc.builders.join;
import hardline = doc.builders.hardline;
import line = doc.builders.line;
import group = doc.builders.group;
import { EqualsValueClauseNode } from './variableDeclaration';
import { SyntaxToken } from '../syntaxToken';
import { BaseListNode } from './baseType';

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

//todo add tests
export const enumDeclarationPrinter: Printer['print'] = (path, _, print) => {
  const {
    baseList,
    identifier,
    members,
    modifiers,
  }: EnumDeclarationNode = path.getValue();

  return concat([
    join(hardline, [...path.map(print, 'attributeLists'), '']),
    join(' ', [...modifiers.map((token) => token.text), '']),
    'enum',
    ' ',
    identifier.text,
    baseList != null ? path.call(print, 'baseList') : '',
    hardline,
    '{',
    members.length !== 0
      ? indent(
          concat([
            hardline,
            join(concat([',', hardline]), path.map(print, 'members')),
          ])
        )
      : '',
    hardline,
    '}',
  ]);
};

export type EnumMemberDeclarationNode = {
  attributeLists: Array<AttributeListNode>;
  equalsValue: EqualsValueClauseNode | null;
  identifier: SyntaxToken;
  modifiers: Array<SyntaxToken>; // Enum members cannot have access modifiers
} & DeclarationNode;

export const enumMemberDeclarationPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  const {
    equalsValue,
    identifier,
  }: EnumMemberDeclarationNode = path.getValue();

  return concat([
    group(join(line, [...path.map(print, 'attributeLists'), ''])),
    identifier.text,
    equalsValue != null ? concat([' ', path.call(print, 'equalsValue')]) : '',
  ]);
};
