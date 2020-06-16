import { AttributeTargetSpecifierNode } from "./attribute/attributeTargetSpecifier";

export type SyntaxNodeType =
  | AttributeNodeTypes
  | TypeNodeType
  | DeclarationNodeType
  | 'CompilationUnit'
  | 'UsingDirective'
  | 'TypeArgumentList'
  | 'NameEquals'
  | 'ExternAliasDirective'
  | 'TypeParameterList'
  | 'TypeParameter';

export type DeclarationNodeType = 'NamespaceDeclaration' | 'ClassDeclaration';

export type TypeNodeType =
  | NameNodeType
  | 'PredefinedType'

export type NameNodeType =
  | 'AliasQualifiedName'
  | 'QualifiedName'
  | 'GenericName'
  | 'IdentifierName';

export type AttributeNodeTypes =
  | 'Attribute'
  | 'AttributeList'
  | 'AttributeArgumentList'
  | 'AttributeArgument'
  | 'AttributeTargetSpecifier';

export type SyntaxNode = {
  type: SyntaxNodeType;
  start: number;
  end: number;
};

export type TypeNode = {
  type: TypeNodeType;
} & SyntaxNode

export type NameNode = {
  type: NameNodeType;
} & TypeNodeType;
