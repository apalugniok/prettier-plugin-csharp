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

export type EnumDeclarationNode = {
  leadingEmptyLine: boolean;
  attributeLists: Array<AttributeListNode>;
  modifiers: Array<string>;
  name: string;
  members: Array<EnumMemberDeclarationNode>;
} & DeclarationNode;

export const enumDeclarationPrinter: Printer['print'] = (path, _, print) => {
  const {
    leadingEmptyLine,
    members,
    modifiers,
    name,
  }: EnumDeclarationNode = path.getValue();

  return concat([
    leadingEmptyLine ? hardline : '',
    join(hardline, [...path.map(print, 'attributeLists'), '']),
    join(' ', [...modifiers, '']),
    'enum',
    ' ',
    name,
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
  leadingEmptyLine: boolean;
  attributeLists: Array<AttributeListNode>;
  name: string;
  equalsValue: EqualsValueClauseNode | null;
} & DeclarationNode;

export const enumMemberDeclarationPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  const {
    equalsValue,
    leadingEmptyLine,
    name,
  }: EnumMemberDeclarationNode = path.getValue();

  return concat([
    leadingEmptyLine ? hardline : '',
    group(join(line, [...path.map(print, 'attributeLists'), ''])),
    name,
    equalsValue != null ? concat([' ', path.call(print, 'equalsValue')]) : '',
  ]);
};
