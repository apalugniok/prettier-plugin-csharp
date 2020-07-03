import { Printer } from 'prettier';
import { SyntaxNode, SyntaxNodeType } from './syntax/syntaxNode';

import { predefinedTypePrinter } from './syntax/expression/predefinedType';
import { nameEqualsPrinter } from './syntax/expression/nameEquals';
import { nameColonPrinter } from './syntax/expression/nameColon';
import {
  attributeArgumentListPrinter,
  attributeArgumentPrinter,
  attributeListPrinter,
  attributePrinter,
  attributeTargetSpecifierPrinter,
} from './syntax/declaration/attribute';
import {
  baseListPrinter,
  simpleBaseTypePrinter,
} from './syntax/declaration/baseType';
import {
  aliasQualifiedNamePrinter,
  genericNamePrinter,
  identifierNamePrinter,
  qualifiedNamePrinter,
} from './syntax/expression/name';
import { namespaceDeclarationPrinter } from './syntax/declaration/namespaceDeclaration';
import { classDeclarationPrinter } from './syntax/declaration/classDeclaration';
import { compilationUnitPrinter } from './syntax/compilationUnit';
import { argumentListPrinter, typeArgumentListPrinter } from './syntax/expression/argument';
import {
  externAliasDirectivePrinter,
  usingDirectivePrinter,
} from './syntax/directive';
import {
  classOrStructConstraintPrinter,
  constructorConstraintPrinter,
  typeConstraintPrinter,
  typeParameterConstraintClausePrinter,
} from './syntax/declaration/typeParameterConstraint';
import {
  enumDeclarationPrinter,
  enumMemberDeclarationPrinter,
} from './syntax/declaration/enumDeclaration';
import {
  equalsValueClausePrinter,
  variableDeclarationPrinter,
  variableDeclaratorPrinter,
} from './syntax/declaration/variableDeclaration';
import {
  argumentPrinter,
  bracketedArgumentListPrinter,
} from './syntax/expression/argument';
import { literalExpressionPrinter } from './syntax/expression/literal';
import {
  explicitInterfaceSpecifierPrinter,
  interfaceDeclarationPrinter
} from './syntax/declaration/interfaceDeclaration';
import { eventFieldDeclarationPrinter, fieldDeclarationPrinter } from "./syntax/declaration/fieldDeclaration";
import { arrowExpressionClausePrinter } from "./syntax/expression/arrowExpressionClause";
import {
  bracketedParameterListPrinter,
  parameterListPrinter,
  parameterPrinter, typeParameterListPrinter,
  typeParameterPrinter
} from "./syntax/declaration/parameter";
import {
  accessorDeclarationPrinter, accessorListPrinter, eventDeclarationPrinter,
  indexerDeclarationPrinter,
  propertyDeclarationPrinter
} from "./syntax/declaration/propertyDeclaration";
import { blockPrinter } from "./syntax/statement/block";
import { structDeclarationPrinter } from "./syntax/declaration/structDeclaration";
import {
  constructorDeclarationPrinter, constructorInitializerPrinter,
  destructorDeclarationPrinter,
  methodDeclarationPrinter
} from "./syntax/declaration/methodDeclaration";

const printersByType: { [key in SyntaxNodeType]: Printer['print'] } = {
  CompilationUnit: compilationUnitPrinter,
  UsingDirective: usingDirectivePrinter,
  NameEquals: nameEqualsPrinter,
  AliasQualifiedName: aliasQualifiedNamePrinter,
  TypeArgumentList: typeArgumentListPrinter,
  IdentifierName: identifierNamePrinter,
  PredefinedType: predefinedTypePrinter,
  GenericName: genericNamePrinter,
  QualifiedName: qualifiedNamePrinter,
  NamespaceDeclaration: namespaceDeclarationPrinter,
  ExternAliasDirective: externAliasDirectivePrinter,
  ClassDeclaration: classDeclarationPrinter,
  AttributeArgument: attributeArgumentPrinter,
  Attribute: attributePrinter,
  AttributeArgumentList: attributeArgumentListPrinter,
  AttributeList: attributeListPrinter,
  AttributeTargetSpecifier: attributeTargetSpecifierPrinter,
  NameColon: nameColonPrinter,
  SimpleBaseType: simpleBaseTypePrinter,
  BaseList: baseListPrinter,
  TypeParameterConstraintClause: typeParameterConstraintClausePrinter,
  TypeConstraint: typeConstraintPrinter,
  ConstructorConstraint: constructorConstraintPrinter,
  ClassOrStructConstraint: classOrStructConstraintPrinter,
  EnumDeclaration: enumDeclarationPrinter,
  EnumMemberDeclaration: enumMemberDeclarationPrinter,
  VariableDeclaration: variableDeclarationPrinter,
  VariableDeclarator: variableDeclaratorPrinter,
  BracketedArgumentList: bracketedArgumentListPrinter,
  Argument: argumentPrinter,
  LiteralExpression: literalExpressionPrinter,
  EqualsValueClause: equalsValueClausePrinter,
  InterfaceDeclaration: interfaceDeclarationPrinter,
  FieldDeclaration: fieldDeclarationPrinter,
  EventFieldDeclaration: eventFieldDeclarationPrinter,
  ExplicitInterfaceSpecifier: explicitInterfaceSpecifierPrinter,
  ArrowExpressionClause: arrowExpressionClausePrinter,
  Parameter: parameterPrinter,
  ParameterList: parameterListPrinter,
  BracketedParameterList: bracketedParameterListPrinter,
  TypeParameter: typeParameterPrinter,
  TypeParameterList: typeParameterListPrinter,
  PropertyDeclaration: propertyDeclarationPrinter,
  EventDeclaration: eventDeclarationPrinter,
  IndexerDeclaration: indexerDeclarationPrinter,
  AccessorDeclaration: accessorDeclarationPrinter,
  AccessorList: accessorListPrinter,
  Block: blockPrinter,
  StructDeclaration: structDeclarationPrinter,
  ArgumentList: argumentListPrinter,
  MethodDeclaration: methodDeclarationPrinter,
  ConstructorDeclaration: constructorDeclarationPrinter,
  DestructorDeclaration: destructorDeclarationPrinter,
  ConstructorInitializer: constructorInitializerPrinter
};

export const printNode: Printer['print'] = (path, options, print) => {
  const node: SyntaxNode | null = path.getValue();
  
  if (node == null) {
    return  '';
  }

  return printersByType[node.type](path, options, print);
};
