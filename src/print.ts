import { Printer } from 'prettier';
import { SyntaxNode, SyntaxNodeType } from './syntax/syntaxNode';
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
import {
  anonymousObjectCreationExpressionPrinter,
  anonymousObjectMemberDeclaratorSyntax,
  objectCreationExpressionPrinter,
} from './syntax/expression/objectCreation';
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
import { castExpressionPrinter } from './syntax/expression/cast';
import { throwExpressionPrinter } from './syntax/expression/throw';
import { tupleExpressionPrinter } from './syntax/expression/tuple';
import {
  anonymousMethodExpressionPrinter,
  parenthesizedLambdaExpressionPrinter,
  simpleLambdaExpressionPrinter,
} from './syntax/expression/anonymousFunction';
import {
  fromClausePrinter,
  groupClausePrinter,
  joinClausePrinter,
  joinIntoClausePrinter,
  letClausePrinter,
  orderByClausePrinter,
  orderingPrinter,
  queryBodyPrinter,
  queryContinuationPrinter,
  queryExpressionPrinter,
  selectClausePrinter,
  whereClausePrinter,
} from './syntax/expression/query';
import { binaryExpressionPrinter } from './syntax/expression/binary';
import {
  postfixUnaryExpressionPrinter,
  prefixUnaryExpressionPrinter,
} from './syntax/expression/unary';
import {
  makeRefExpressionPrinter,
  refTypeExpressionPrinter,
  refValueExpressionPrinter,
} from './syntax/expression/ref';
import {
  arrayRankSpecifierPrinter,
  arrayTypePrinter,
  nullableTypePrinter,
  omittedArraySizeExpressionPrinter,
  omittedTypeArgumentPrinter,
  pointerTypePrinter,
  predefinedTypePrinter,
  refTypePrinter,
  tupleElementPrinter,
  tupleTypePrinter,
} from './syntax/expression/type';
import { checkedExpressionPrinter } from './syntax/expression/checked';
import { conditionalAccessExpressionPrinter } from './syntax/expression/conditionalAccess';
import { memberBindingExpressionPrinter } from './syntax/expression/memberBinding';
import { defaultExpressionPrinter } from './syntax/expression/default';
import { typeOfExpressionPrinter } from './syntax/expression/typeOf';
import { elementBindingExpressionPrinter } from './syntax/expression/elementBinding';
import { sizeOfExpressionPrinter } from './syntax/expression/sizeOf';
import {
  switchExpressionArmPrinter,
  switchExpressionPrinter,
  whenClausePrinter,
} from './syntax/expression/switch';
import {
  elementAccessExpressionPrinter,
  implicitElementAccessPrinter,
} from './syntax/expression/elementAccess';
import { rangeExpressionPrinter } from './syntax/expression/range';
import {
  arrayCreationExpressionPrinter,
  implicitArrayCreationExpressionPrinter,
} from './syntax/expression/arrayCreation';
import { conditionalExpressionPrinter } from './syntax/expression/conditional';
import { labeledStatementPrinter } from './syntax/statement/labeled';
import { unsafeStatementPrinter } from './syntax/statement/unsafe';
import { gotoStatementPrinter } from './syntax/statement/goto';
import { lockStatementPrinter } from './syntax/statement/lock';
import { breakStatementPrinter } from './syntax/statement/break';
import { continueStatementPrinter } from './syntax/statement/continue';
import { returnStatementPrinter } from './syntax/statement/return';
import {
  casePatternSwitchLabelPrinter,
  caseSwitchLabelPrinter,
  defaultSwitchLabelPrinter,
  switchSectionPrinter,
  switchStatementPrinter,
} from './syntax/statement/switch';
import { localFunctionStatementPrinter } from './syntax/statement/localFunction';
import { throwStatementPrinter } from './syntax/statement/throw';
import { yieldStatementPrinter } from './syntax/statement/yield';
import { whileStatementPrinter } from './syntax/statement/while';
import { doStatementPrinter } from './syntax/statement/do';
import { forStatementPrinter } from './syntax/statement/for';
import { SyntaxToken, tokenPrinter } from './syntax/syntaxToken';
import {
  forEachStatementPrinter,
  forEachVariableStatementPrinter,
} from './syntax/statement/foreach';
import { usingStatementPrinter } from './syntax/statement/using';
import { fixedStatementPrinter } from './syntax/statement/fixed';
import { emptyStatementPrinter } from './syntax/statement/empty';
import { checkedStatementPrinter } from './syntax/statement/checked';
import { awaitExpressionPrinter } from './syntax/expression/await';

const printersByType: {
  [key in SyntaxNodeType | 'Token']: Printer['print'];
} = {
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
  CastExpression: castExpressionPrinter,
  ThrowExpression: throwExpressionPrinter,
  TupleExpression: tupleExpressionPrinter,
  AnonymousMethodExpression: anonymousMethodExpressionPrinter,
  SimpleLambdaExpression: simpleLambdaExpressionPrinter,
  ParenthesizedLambdaExpression: parenthesizedLambdaExpressionPrinter,
  QueryExpression: queryExpressionPrinter,
  QueryBody: queryBodyPrinter,
  QueryContinuation: queryContinuationPrinter,
  FromClause: fromClausePrinter,
  LetClause: letClausePrinter,
  JoinClause: joinClausePrinter,
  JoinIntoClause: joinIntoClausePrinter,
  WhereClause: whereClausePrinter,
  OrderByClause: orderByClausePrinter,
  Ordering: orderingPrinter,
  SelectClause: selectClausePrinter,
  GroupClause: groupClausePrinter,
  BinaryExpression: binaryExpressionPrinter,
  PrefixUnaryExpression: prefixUnaryExpressionPrinter,
  PostfixUnaryExpression: postfixUnaryExpressionPrinter,
  RefTypeExpression: refTypeExpressionPrinter,
  MakeRefExpression: makeRefExpressionPrinter,
  RefValueExpression: refValueExpressionPrinter,
  PointerType: pointerTypePrinter,
  NullableType: nullableTypePrinter,
  TupleType: tupleTypePrinter,
  OmittedTypeArgument: omittedTypeArgumentPrinter,
  RefType: refTypePrinter,
  TupleElement: tupleElementPrinter,
  CheckedExpression: checkedExpressionPrinter,
  ConditionalAccessExpression: conditionalAccessExpressionPrinter,
  MemberBindingExpression: memberBindingExpressionPrinter,
  DefaultExpression: defaultExpressionPrinter,
  TypeOfExpression: typeOfExpressionPrinter,
  ElementBindingExpression: elementBindingExpressionPrinter,
  SizeOfExpression: sizeOfExpressionPrinter,
  SwitchExpression: switchExpressionPrinter,
  SwitchExpressionArm: switchExpressionArmPrinter,
  WhenClause: whenClausePrinter,
  ElementAccessExpression: elementAccessExpressionPrinter,
  RangeExpression: rangeExpressionPrinter,
  ImplicitElementAccess: implicitElementAccessPrinter,
  AnonymousObjectMemberDeclarator: anonymousObjectMemberDeclaratorSyntax,
  AnonymousObjectCreationExpression: anonymousObjectCreationExpressionPrinter,
  ArrayCreationExpression: arrayCreationExpressionPrinter,
  ImplicitArrayCreationExpression: implicitArrayCreationExpressionPrinter,
  ConditionalExpression: conditionalExpressionPrinter,
  LabeledStatement: labeledStatementPrinter,
  UnsafeStatement: unsafeStatementPrinter,
  GotoStatement: gotoStatementPrinter,
  LockStatement: lockStatementPrinter,
  BreakStatement: breakStatementPrinter,
  ContinueStatement: continueStatementPrinter,
  ReturnStatement: returnStatementPrinter,
  SwitchSection: switchSectionPrinter,
  SwitchStatement: switchStatementPrinter,
  DefaultSwitchLabel: defaultSwitchLabelPrinter,
  CaseSwitchLabel: caseSwitchLabelPrinter,
  CasePatternSwitchLabel: casePatternSwitchLabelPrinter,
  LocalFunctionStatement: localFunctionStatementPrinter,
  ThrowStatement: throwStatementPrinter,
  YieldStatement: yieldStatementPrinter,
  WhileStatement: whileStatementPrinter,
  DoStatement: doStatementPrinter,
  ForStatement: forStatementPrinter,
  Token: tokenPrinter,
  ForEachStatement: forEachStatementPrinter,
  ForEachVariableStatement: forEachVariableStatementPrinter,
  UsingStatement: usingStatementPrinter,
  FixedStatement: fixedStatementPrinter,
  EmptyStatement: emptyStatementPrinter,
  CheckedStatement: checkedStatementPrinter,
  AwaitExpression: awaitExpressionPrinter,
};

export const printNode: Printer['print'] = (path, options, print) => {
  const node: SyntaxNode | SyntaxToken | null = path.getValue();

  if (node == null) {
    return '';
  }

  console.log(node.nodeType);
  return printersByType[node.nodeType](path, options, print);
};
