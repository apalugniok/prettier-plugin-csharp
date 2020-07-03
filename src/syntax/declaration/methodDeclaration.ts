import { DeclarationNode, SyntaxNode, TypeNode } from '../syntaxNode';
import { AttributeListNode } from './attribute';
import { BlockNode } from '../statement/block';
import { ArrowExpressionClauseNode } from '../expression/arrowExpressionClause';
import { ParameterListNode, TypeParameterListNode } from './parameter';
import { TypeParameterConstraintClauseNode } from './typeParameterConstraint';
import { ExplicitInterfaceSpecifierNode } from './interfaceDeclaration';
import { ArgumentListNode } from '../expression/argument';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import join = doc.builders.join;
import hardline = doc.builders.hardline;
import indent = doc.builders.indent;
import line = doc.builders.line;
import group = doc.builders.group;

export type MethodDeclarationNode = {
  attributeLists: Array<AttributeListNode>;
  leadingEmptyLine: boolean;
  modifiers: Array<string>;
  name: string;
  body: BlockNode | ArrowExpressionClauseNode | null;
  typeParameters: TypeParameterListNode;
  constraintClauses: Array<TypeParameterConstraintClauseNode>;
  parameters: ParameterListNode;
  returnType: TypeNode;
  interfaceSpecifier: ExplicitInterfaceSpecifierNode | null;
} & DeclarationNode;

export const methodDeclarationPrinter: Printer['print'] = (path, _, print) => {
  const {
    constraintClauses,
    body,
    leadingEmptyLine,
    modifiers,
    name,
  }: MethodDeclarationNode = path.getValue();

  return concat([
    leadingEmptyLine ? hardline : '',
    join(hardline, [...path.map(print, 'attributeLists'), '']),
    join(' ', [...modifiers, '']),
    path.call(print, 'returnType'),
    ' ',
    path.call(print, 'interfaceSpecifier'),
    name,
    path.call(print, 'typeParameters'),
    path.call(print, 'parameters'),
    constraintClauses.length !== 0
      ? group(
          indent(
            concat([line, join(line, path.map(print, 'constraintClauses'))])
          )
        )
      : '',
    body != null
      ? body.type === 'Block'
        ? concat([hardline, path.call(print, 'body')])
        : concat([' ', path.call(print, 'body')])
      : ';',
  ]);
};

export type ConstructorDeclarationNode = {
  attributeLists: Array<AttributeListNode>;
  leadingEmptyLine: boolean;
  modifiers: Array<string>;
  name: string;
  body: BlockNode | ArrowExpressionClauseNode | null;
  initializer: ConstructorInitializerNode | null;
} & DeclarationNode;

export const constructorDeclarationPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  return '';
};

export type DestructorDeclarationNode = {
  attributeLists: Array<AttributeListNode>;
  leadingEmptyLine: boolean;
  modifiers: Array<string>;
  name: string;
  body: BlockNode | ArrowExpressionClauseNode | null;
  parameters: ParameterListNode;
} & DeclarationNode;

export const destructorDeclarationPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  return '';
};

export type ConstructorInitializerNode = {
  arguments: ArgumentListNode;
  keyword: string;
} & SyntaxNode;

export const constructorInitializerPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  return '';
};
