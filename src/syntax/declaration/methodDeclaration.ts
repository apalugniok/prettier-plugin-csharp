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
import { SyntaxToken } from '../syntaxToken';

export type MethodDeclarationNode = {
  arity: number;
  attributeLists: Array<AttributeListNode>;
  body: BlockNode | null;
  constraintClauses: Array<TypeParameterConstraintClauseNode>;
  explicitInterfaceSpecifier: ExplicitInterfaceSpecifierNode | null;
  expressionBody: ArrowExpressionClauseNode | null;
  identifier: SyntaxToken;
  modifiers: Array<SyntaxToken>;
  parameterList: ParameterListNode;
  returnType: TypeNode;
  typeParameterList: TypeParameterListNode;
} & DeclarationNode;

export const methodDeclarationPrinter: Printer['print'] = (path, _, print) => {
  const {
    constraintClauses,
    body,
    expressionBody,
    identifier,
    modifiers,
  }: MethodDeclarationNode = path.getValue();

  return concat([
    join(hardline, [...path.map(print, 'attributeLists'), '']),
    join(' ', [...modifiers.map((token) => token.text), '']),
    path.call(print, 'returnType'),
    ' ',
    path.call(print, 'explicitInterfaceSpecifier'),
    identifier.text,
    path.call(print, 'typeParameterList'),
    path.call(print, 'parameterList'),
    constraintClauses.length !== 0
      ? group(
          indent(
            concat([line, join(line, path.map(print, 'constraintClauses'))])
          )
        )
      : '',
    body != null ? concat([line, path.call(print, 'body')]) : '',
    expressionBody != null
      ? concat([' ', path.call(print, 'expressionBody'), ';'])
      : '',
    body == null && expressionBody == null ? ';' : '',
  ]);
};

export type ConstructorDeclarationNode = {
  attributeLists: Array<AttributeListNode>;
  body: BlockNode | null;
  expressionBody: ArrowExpressionClauseNode | null;
  identifier: SyntaxToken;
  initializer: ConstructorInitializerNode | null;
  modifiers: Array<SyntaxToken>;
  parameterList: ParameterListNode;
  semicolonToken: SyntaxToken;
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
  body: BlockNode | null;
  expressionBody: ArrowExpressionClauseNode | null;
  identifier: SyntaxToken;
  leadingEmptyLine: boolean;
  modifiers: Array<SyntaxToken>;
  parameterList: ParameterListNode;
  semicolonToken: SyntaxToken;
  tildeToken: SyntaxToken;
} & DeclarationNode;

export const destructorDeclarationPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  return '';
};

export type ConstructorInitializerNode = {
  argumentList: ArgumentListNode;
  colonToken: SyntaxToken;
  thisOrBaseKeyword: SyntaxToken;
} & SyntaxNode;

export const constructorInitializerPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  return '';
};
