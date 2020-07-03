import { AttributeListNode } from './attribute';
import { TypeParameterListNode } from './parameter';
import { TypeParameterConstraintClauseNode } from './typeParameterConstraint';
import { doc, Printer } from 'prettier';
import indent = doc.builders.indent;
import line = doc.builders.line;
import { DeclarationNode, NameNode, SyntaxNode } from '../syntaxNode';
import concat = doc.builders.concat;
import join = doc.builders.join;
import hardline = doc.builders.hardline;
import { BaseListNode } from './baseType';
import group = doc.builders.group;

export type InterfaceDeclarationNode = {
  attributeLists: Array<AttributeListNode>;
  modifiers: Array<string>;
  name: string;
  leadingEmptyLine: boolean;
  typeParameters: TypeParameterListNode | null;
  bases: BaseListNode | null;
  constraintClauses: Array<TypeParameterConstraintClauseNode>;
  members: Array<DeclarationNode>;
} & SyntaxNode;

export const interfaceDeclarationPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  const {
    bases,
    constraintClauses,
    leadingEmptyLine,
    members,
    modifiers,
    name,
    typeParameters,
  }: InterfaceDeclarationNode = path.getValue();

  return concat([
    leadingEmptyLine ? hardline : '',
    join(hardline, [...path.map(print, 'attributeLists'), '']),
    join(' ', [...modifiers, '']),
    'interface',
    ' ',
    name,
    typeParameters != null ? path.call(print, 'typeParameters') : '',
    bases != null ? path.call(print, 'bases') : '',
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

export type ExplicitInterfaceSpecifierNode = {
  name: NameNode;
} & SyntaxNode;

export const explicitInterfaceSpecifierPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  return concat([path.call(print, 'name'), '.']);
};
