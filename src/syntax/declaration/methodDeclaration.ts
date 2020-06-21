import { DeclarationNode, TypeNode } from "../syntaxNode";
import { AttributeListNode } from "./attribute";
import { BlockNode } from "../statement/block";
import { ArrowExpressionClauseNode } from "../expression/arrowExpressionClause";
import { ParameterListNode, TypeParameterListNode } from "./parameter";
import { TypeParameterConstraintClauseNode } from "./typeParameterConstraint";
import { ExplicitInterfaceSpecifierNode } from "./interfaceDeclaration";

export type MethodDeclarationNode = {
  attributeLists: Array<AttributeListNode>;
  modifiers: Array<string>;
  name: string;
  body: BlockNode | ArrowExpressionClauseNode;
  typeParameters: TypeParameterListNode;
  constrainClauses: Array<TypeParameterConstraintClauseNode>;
  parameters: ParameterListNode;
  returnType: TypeNode;
  interfaceSpecifier: ExplicitInterfaceSpecifierNode;
} & DeclarationNode

export type ConstructorDeclarationNode = {

} & DeclarationNode

export type DestructorDeclarationNode = {

} & DeclarationNode

export type ConstructorInitializerDeclarationNode = {

} & DeclarationNode