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
import { compilationUnitPrinter } from './syntax/compilationUnit';
import {
  argumentListPrinter,
  typeArgumentListPrinter,
} from './syntax/expression/argument';
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
  equalsValueClausePrinter,
  variableDeclarationPrinter,
  variableDeclaratorPrinter,
} from './syntax/declaration/variable';
import {
  argumentPrinter,
  bracketedArgumentListPrinter,
} from './syntax/expression/argument';
import { literalExpressionPrinter } from './syntax/expression/literal';
import { arrowExpressionClausePrinter } from './syntax/expression/arrowExpressionClause';
import {
  bracketedParameterListPrinter,
  parameterListPrinter,
  parameterPrinter,
  typeParameterListPrinter,
  typeParameterPrinter,
} from './syntax/declaration/parameter';
import { blockPrinter } from './syntax/statement/block';
import {
  accessorDeclarationPrinter,
  accessorListPrinter,
  eventDeclarationPrinter,
  indexerDeclarationPrinter,
  propertyDeclarationPrinter,
} from './syntax/declaration/property';
import {
  explicitInterfaceSpecifierPrinter,
  interfaceDeclarationPrinter,
} from './syntax/declaration/interface';
import {
  eventFieldDeclarationPrinter,
  fieldDeclarationPrinter,
} from './syntax/declaration/field';
import { namespaceDeclarationPrinter } from './syntax/declaration/namespace';
import { classDeclarationPrinter } from './syntax/declaration/class';
import {
  constructorDeclarationPrinter,
  constructorInitializerPrinter,
  conversionOperatorDeclarationPrinter,
  destructorDeclarationPrinter,
  methodDeclarationPrinter,
  operatorDeclarationPrinter,
} from './syntax/declaration/method';
import {
  enumDeclarationPrinter,
  enumMemberDeclarationPrinter,
} from './syntax/declaration/enum';
import { delegateDeclarationPrinter } from './syntax/declaration/delegate';
import { structDeclarationPrinter } from './syntax/declaration/struct';
import { elseClausePrinter, ifStatementPrinter } from './syntax/statement/if';
import {
  catchClausePrinter,
  catchDeclarationPrinter,
  catchFilterClausePrinter,
  finallyClausePrinter,
  tryStatementPrinter,
} from './syntax/statement/try';
import { localDeclarationStatementPrinter } from './syntax/statement/declaration';
import { objectCreationExpressionPrinter } from './syntax/expression/objectCreation';
import { assignmentExpressionPrinter } from './syntax/expression/assignment';
import { invocationExpressionPrinter } from './syntax/expression/invocation';
import { memberAccessExpressionPrinter } from './syntax/expression/memberAccess';
import { expressionStatementPrinter } from './syntax/statement/expression';
import { initializerExpressionPrinter } from './syntax/expression/initializer';
import {
  baseExpressionPrinter,
  thisExpressionPrinter,
} from './syntax/expression/instance';
import {
  implicitStackAllocArrayCreationExpressionPrinter,
  stackAllocArrayCreationExpressionPrinter,
} from './syntax/expression/stackalloc';
import {
  interpolatedStringExpressionPrinter,
  interpolatedStringTextPrinter,
  interpolationAlignmentClausePrinter,
  interpolationFormatClausePrinter,
  interpolationPrinter,
} from './syntax/expression/interpolatedString';
import { parenthesizedExpressionPrinter } from './syntax/expression/parenthesized';
import { declarationExpressionPrinter } from './syntax/expression/declaration';
import {
  arrayRankSpecifierPrinter,
  arrayTypePrinter,
  omittedArraySizeExpressionPrinter,
} from './syntax/expression/arrayType';
import {
  discardDesignationPrinter,
  parenthesizedVariableDesignationPrinter,
  singleVariableDesignationPrinter,
} from './syntax/other/designation';
import { varPatternPrinter } from './syntax/pattern/var';
import { discardPatternPrinter } from './syntax/pattern/discard';
import { declarationPatternPrinter } from './syntax/pattern/declaration';
import { constantPatternPrinter } from './syntax/pattern/constant';
import {
  positionalPatternClausePrinter,
  propertyPatternClausePrinter,
  recursivePatternPrinter,
  subpatternPrinter,
} from './syntax/pattern/recursive';
import { isPatternExpressionPrinter } from './syntax/expression/isPattern';

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
  ConstructorInitializer: constructorInitializerPrinter,
  OperatorDeclaration: operatorDeclarationPrinter,
  ConversionOperatorDeclaration: conversionOperatorDeclarationPrinter,
  DelegateDeclaration: delegateDeclarationPrinter,
  IfStatement: ifStatementPrinter,
  ElseClause: elseClausePrinter,
  TryStatement: tryStatementPrinter,
  CatchClause: catchClausePrinter,
  CatchDeclaration: catchDeclarationPrinter,
  CatchFilterClause: catchFilterClausePrinter,
  FinallyClause: finallyClausePrinter,
  LocalDeclarationStatement: localDeclarationStatementPrinter,
  ObjectCreationExpression: objectCreationExpressionPrinter,
  InitializerExpression: initializerExpressionPrinter,
  AssignmentExpression: assignmentExpressionPrinter,
  InvocationExpression: invocationExpressionPrinter,
  MemberAccessExpression: memberAccessExpressionPrinter,
  ExpressionStatement: expressionStatementPrinter,
  ThisExpression: thisExpressionPrinter,
  BaseExpression: baseExpressionPrinter,
  ImplicitStackAllocArrayCreationExpression: implicitStackAllocArrayCreationExpressionPrinter,
  InterpolatedStringExpression: interpolatedStringExpressionPrinter,
  InterpolatedStringText: interpolatedStringTextPrinter,
  Interpolation: interpolationPrinter,
  InterpolationAlignmentClause: interpolationAlignmentClausePrinter,
  InterpolationFormatClause: interpolationFormatClausePrinter,
  ParenthesizedExpression: parenthesizedExpressionPrinter,
  StackAllocArrayCreationExpression: stackAllocArrayCreationExpressionPrinter,
  DeclarationExpression: declarationExpressionPrinter,
  SingleVariableDesignation: singleVariableDesignationPrinter,
  DiscardDesignation: discardDesignationPrinter,
  ParenthesizedVariableDesignation: parenthesizedVariableDesignationPrinter,
  ArrayType: arrayTypePrinter,
  ArrayRankSpecifier: arrayRankSpecifierPrinter,
  OmittedArraySizeExpression: omittedArraySizeExpressionPrinter,
  VarPattern: varPatternPrinter,
  DiscardPattern: discardPatternPrinter,
  DeclarationPattern: declarationPatternPrinter,
  ConstantPattern: constantPatternPrinter,
  RecursivePattern: recursivePatternPrinter,
  PositionalPatternClause: positionalPatternClausePrinter,
  PropertyPatternClause: propertyPatternClausePrinter,
  Subpattern: subpatternPrinter,
  IsPatternExpression: isPatternExpressionPrinter,
};

export const printNode: Printer['print'] = (path, options, print) => {
  const node: SyntaxNode | null = path.getValue();

  if (node == null) {
    return '';
  }
  console.log(node.nodeType);

  return printersByType[node.nodeType](path, options, print);
};
