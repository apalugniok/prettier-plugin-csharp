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

export const methodDeclarationPrinter: Printer['print'] = (path, _, print) => {
  const {
    constraintClauses,
    body,
    expressionBody,
    identifier,
    modifiers,
  }: MethodDeclarationNode = path.getValue();

  return concat([
    printAttributeLists(path, print),
    printModifiers(modifiers),
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
    printMethodBody(path, print, body, expressionBody),
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
  const {
    body,
    expressionBody,
    identifier,
    initializer,
    modifiers,
  }: ConstructorDeclarationNode = path.getValue();

  return concat([
    printAttributeLists(path, print),
    printModifiers(modifiers),
    identifier.text,
    path.call(print, 'parameterList'),
    initializer != null ? concat([' ', path.call(print, 'initializer')]) : '',
    printMethodBody(path, print, body, expressionBody),
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

export const destructorDeclarationPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  const {
    body,
    expressionBody,
    identifier,
    modifiers,
  }: DestructorDeclarationNode = path.getValue();

  return concat([
    printAttributeLists(path, print),
    printModifiers(modifiers),
    '~',
    identifier.text,
    path.call(print, 'parameterList'),
    printMethodBody(path, print, body, expressionBody),
  ]);
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
  const { thisOrBaseKeyword }: ConstructorInitializerNode = path.getValue();

  return concat([
    ': ',
    thisOrBaseKeyword.text,
    path.call(print, 'argumentList'),
  ]);
};

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

export const operatorDeclarationPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  const {
    body,
    expressionBody,
    modifiers,
    operatorKeyword,
    operatorToken,
  }: OperatorDeclarationNode = path.getValue();

  return concat([
    printAttributeLists(path, print),
    printModifiers(modifiers),
    path.call(print, 'returnType'),
    ' ',
    operatorKeyword.text,
    ' ',
    operatorToken.text,
    path.call(print, 'parameterList'),
    printMethodBody(path, print, body, expressionBody),
  ]);
};

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

export const conversionOperatorDeclarationPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  const {
    body,
    expressionBody,
    implicitOrExplicitKeyword,
    modifiers,
    operatorKeyword,
  }: ConversionOperatorDeclarationNode = path.getValue();

  return concat([
    printAttributeLists(path, print),
    printModifiers(modifiers),
    implicitOrExplicitKeyword.text,
    ' ',
    operatorKeyword.text,
    ' ',
    path.call(print, 'type'),
    path.call(print, 'parameterList'),
    printMethodBody(path, print, body, expressionBody),
  ]);
};
