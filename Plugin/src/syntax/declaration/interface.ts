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
import { SyntaxToken } from '../syntaxToken';
import {
  printAttributeLists,
  printLeadingNewLine,
  printModifiers,
} from '../../helpers/printerHelpers';

export type InterfaceDeclarationNode = {
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
} & DeclarationNode;

export const interfaceDeclarationPrinter: Printer<InterfaceDeclarationNode>['print'] = (
  path,
  _,
  print
) => {
  const {
    baseList,
    constraintClauses,
    members,
    typeParameterList,
  } = path.getValue();

  return concat([
    printLeadingNewLine(path),
    printAttributeLists(path, print),
    printModifiers(path, print),
    path.call(print, 'keyword'),
    ' ',
    path.call(print, 'identifier'),
    typeParameterList != null ? path.call(print, 'typeParameterList') : '',
    baseList != null ? path.call(print, 'baseList') : '',
    constraintClauses.length !== 0
      ? group(
          indent(
            concat([line, join(line, path.map(print, 'constraintClauses'))])
          )
        )
      : '',
    hardline,
    path.call(print, 'openBraceToken'),
    members.length !== 0
      ? indent(concat([hardline, join(hardline, path.map(print, 'members'))]))
      : '',
    hardline,
    path.call(print, 'closeBraceToken'),
  ]);
};

export type ExplicitInterfaceSpecifierNode = {
  dotToken: SyntaxToken;
  name: NameNode;
} & SyntaxNode;

export const explicitInterfaceSpecifierPrinter: Printer<ExplicitInterfaceSpecifierNode>['print'] = (
  path,
  _,
  print
) => {
  return concat([path.call(print, 'name'), path.call(print, 'dotToken')]);
};
