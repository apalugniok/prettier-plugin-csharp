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
import {
  printAttributeLists,
  printLeadingNewLine,
  printModifiers,
} from '../../helpers/printerHelpers';

export type ClassDeclarationNode = {
  attributeLists: Array<AttributeListNode>;
  baseList: BaseListNode | null;
  closeBraceToken: SyntaxToken;
  constraintClauses: Array<TypeParameterConstraintClauseNode>;
  identifier: SyntaxToken;
  keyword: SyntaxToken;
  modifiers: Array<SyntaxToken>;
  members: Array<DeclarationNode>;
  openBraceToken: SyntaxToken;
  semicolonToken: SyntaxToken; // Optional trailing semicolon conventionally omitted
  typeParameterList: TypeParameterListNode | null;
} & SyntaxNode;

export type RecordDeclarationNode = ClassDeclarationNode;

export const classDeclarationPrinter: Printer<ClassDeclarationNode>['print'] = (
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

export const recordDeclarationPrinter = classDeclarationPrinter;
