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

export type StructDeclarationNode = {
  attributeLists: Array<AttributeListNode>;
  leadingEmptyLine: boolean;
  modifiers: Array<string>;
  name: string;
  typeParameters: TypeParameterListNode | null;
  bases: BaseListNode | null;
  constraintClauses: Array<TypeParameterConstraintClauseNode>;
  members: Array<DeclarationNode>;
} & SyntaxNode;

export const structDeclarationPrinter: Printer['print'] = (path, _, print) => {
  const {
    bases,
    constraintClauses,
    leadingEmptyLine,
    members,
    modifiers,
    name,
    typeParameters,
  }: StructDeclarationNode = path.getValue();

  return concat([
    leadingEmptyLine ? hardline : '',
    join(hardline, [...path.map(print, 'attributeLists'), '']),
    join(' ', [...modifiers, '']),
    'struct',
    ' ',
    name,
    typeParameters != null ? path.call(print, 'typeParameters') : '',
    bases != null ? concat([' ', path.call(print, 'bases')]) : '',
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
