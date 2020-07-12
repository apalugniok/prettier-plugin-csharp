import { doc, Printer } from 'prettier';
import { DeclarationNode, SyntaxNode } from '../syntaxNode';
import { TypeParameterListNode } from './parameter';
import concat = doc.builders.concat;
import hardline = doc.builders.hardline;
import join = doc.builders.join;
import { AttributeListNode } from './attribute';
import { BaseListNode } from './baseType';
import { TypeParameterConstraintClauseNode } from './typeParameterConstraint';
import group = doc.builders.group;
import line = doc.builders.line;
import indent = doc.builders.indent;
import { SyntaxToken } from '../syntaxToken';

export type StructDeclarationNode = {
  attributeLists: Array<AttributeListNode>;
  baseList: BaseListNode | null;
  closeBraceToken: SyntaxToken;
  constraintClauses: Array<TypeParameterConstraintClauseNode>;
  identifier: SyntaxToken;
  keyword: SyntaxToken;
  members: Array<DeclarationNode>;
  modifiers: Array<SyntaxToken>;
  openBraceToken: SyntaxToken;
  semicolonToken: SyntaxToken; // Optional trailing semicolon conventionally omitted
  typeParameterList: TypeParameterListNode | null;
} & SyntaxNode;

export const structDeclarationPrinter: Printer['print'] = (path, _, print) => {
  const {
    baseList,
    constraintClauses,
    members,
    modifiers,
    identifier,
    typeParameterList,
  }: StructDeclarationNode = path.getValue();

  return concat([
    join(hardline, [...path.map(print, 'attributeLists'), '']),
    join(' ', [...modifiers.map((token) => token.text), '']),
    'struct',
    ' ',
    identifier.text,
    typeParameterList != null ? path.call(print, 'typeParameterList') : '',
    baseList != null ? concat([' ', path.call(print, 'baseList')]) : '',
    constraintClauses.length !== 0
      ? group(
          indent(
            concat([line, join(line, path.map(print, 'constraintClauses'))])
          )
        )
      : '',
    hardline,
    '{',
    members.length !== 0
      ? indent(concat([hardline, join(hardline, path.map(print, 'members'))]))
      : '',
    hardline,
    '}',
  ]);
};
