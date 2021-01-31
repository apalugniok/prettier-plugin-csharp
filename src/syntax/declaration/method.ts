import { DeclarationNode, SyntaxNode, TypeNode } from '../syntaxNode';
import { AttributeListNode } from './attribute';
import { BlockNode } from '../statement/block';
import { ArrowExpressionClauseNode } from '../expression/arrowExpressionClause';
import { ParameterListNode, TypeParameterListNode } from './parameter';
import { TypeParameterConstraintClauseNode } from './typeParameterConstraint';
import { ArgumentListNode } from '../expression/argument';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import join = doc.builders.join;
import indent = doc.builders.indent;
import line = doc.builders.line;
import group = doc.builders.group;
import { SyntaxToken } from '../syntaxToken';
import {
  printAttributeLists,
  printMethodBody,
  printModifiers,
} from '../../helpers/printerHelpers';
import { ExplicitInterfaceSpecifierNode } from './interface';

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
  semicolonToken: SyntaxToken;
  typeParameterList: TypeParameterListNode;
} & DeclarationNode;

export const methodDeclarationPrinter: Printer<MethodDeclarationNode>['print'] = (
  path,
  _,
  print
) => {
  const {
    constraintClauses,
    body,
    expressionBody,
  }: MethodDeclarationNode = path.getValue();

  return concat([
    printAttributeLists(path, print),
    printModifiers(path, print),
    path.call(print, 'returnType'),
    ' ',
    path.call(print, 'explicitInterfaceSpecifier'),
    path.call(print, 'identifier'),
    path.call(print, 'typeParameterList'),
    path.call(print, 'parameterList'),
    constraintClauses.length !== 0
      ? group(
          indent(
            concat([line, join(line, path.map(print, 'constraintClauses'))])
          )
        )
      : '',
    printMethodBody(path, print),
    body == null && expressionBody == null
      ? path.call(print, 'semicolonToken')
      : '',
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

export const constructorDeclarationPrinter: Printer<ConstructorDeclarationNode>['print'] = (
  path,
  _,
  print
) => {
  const { initializer }: ConstructorDeclarationNode = path.getValue();

  return concat([
    printAttributeLists(path, print),
    printModifiers(path, print),
    path.call(print, 'identifier'),
    path.call(print, 'parameterList'),
    initializer != null ? concat([' ', path.call(print, 'initializer')]) : '',
    printMethodBody(path, print),
  ]);
};

export type DestructorDeclarationNode = {
  attributeLists: Array<AttributeListNode>;
  body: BlockNode | null;
  expressionBody: ArrowExpressionClauseNode | null;
  identifier: SyntaxToken;
  modifiers: Array<SyntaxToken>;
  parameterList: ParameterListNode;
  semicolonToken: SyntaxToken;
  tildeToken: SyntaxToken;
} & DeclarationNode;

export const destructorDeclarationPrinter: Printer<DestructorDeclarationNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    printAttributeLists(path, print),
    printModifiers(path, print),
    path.call(print, 'tildeToken'),
    path.call(print, 'identifier'),
    path.call(print, 'parameterList'),
    printMethodBody(path, print),
  ]);

export type ConstructorInitializerNode = {
  argumentList: ArgumentListNode;
  colonToken: SyntaxToken;
  thisOrBaseKeyword: SyntaxToken;
} & SyntaxNode;

export const constructorInitializerPrinter: Printer['print'] = (
  path,
  _,
  print
) =>
  concat([
    path.call(print, 'colonToken'),
    ' ',
    path.call(print, 'thisOrBaseKeyword'),
    path.call(print, 'argumentList'),
  ]);

export type OperatorDeclarationNode = {
  attributeLists: Array<AttributeListNode>;
  body: BlockNode | null;
  expressionBody: ArrowExpressionClauseNode | null;
  modifiers: Array<SyntaxToken>;
  operatorKeyword: SyntaxToken;
  operatorToken: SyntaxToken;
  parameterList: ParameterListNode;
  returnType: TypeNode;
  semicolonToken: SyntaxToken;
};

export const operatorDeclarationPrinter: Printer<OperatorDeclarationNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    printAttributeLists(path, print),
    printModifiers(path, print),
    path.call(print, 'returnType'),
    ' ',
    path.call(print, 'operatorKeyword'),
    ' ',
    path.call(print, 'operatorToken'),
    path.call(print, 'parameterList'),
    printMethodBody(path, print),
  ]);

export type ConversionOperatorDeclarationNode = {
  attributeLists: Array<AttributeListNode>;
  body: BlockNode | null;
  expressionBody: ArrowExpressionClauseNode | null;
  implicitOrExplicitKeyword: SyntaxToken;
  modifiers: Array<SyntaxToken>;
  operatorKeyword: SyntaxToken;
  parameterList: ParameterListNode;
  semicolonToken: SyntaxToken;
  type: TypeNode;
};

export const conversionOperatorDeclarationPrinter: Printer<ConversionOperatorDeclarationNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    printAttributeLists(path, print),
    printModifiers(path, print),
    path.call(print, 'implicitOrExplicitKeyword'),
    ' ',
    path.call(print, 'operatorKeyword'),
    ' ',
    path.call(print, 'type'),
    path.call(print, 'parameterList'),
    printMethodBody(path, print),
  ]);
