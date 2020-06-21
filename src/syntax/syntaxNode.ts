export type SyntaxNodeType =
  | AttributeNodeTypes
  | ExpressionNodeType
  | DeclarationNodeType
  | StatementNodeType
  | 'CompilationUnit'
  | 'UsingDirective'
  | 'TypeArgumentList'
  | 'NameEquals'
  | 'NameColon'
  | 'ExternAliasDirective'
  | 'TypeParameterList'
  | 'TypeParameter'
  | 'Parameter'
  | 'ParameterList'
  | 'BracketedParameterList'
  | 'BaseList'
  | 'SimpleBaseType'
  | 'TypeParameterConstraintClause'
  | 'ConstructorConstraint'
  | 'ClassOrStructConstraint'
  | 'TypeConstraint'
  | 'VariableDeclarator'
  | 'BracketedArgumentList'
  | 'Argument'
  | 'EqualsValueClause'
  | 'AccessorList'
  | 'AccessorDeclaration'
  | 'ExplicitInterfaceSpecifier'
  | 'ArrowExpressionClause';

export type DeclarationNodeType =
  | 'NamespaceDeclaration'
  | 'ClassDeclaration'
  | 'EnumDeclaration'
  | 'EnumMemberDeclaration'
  | 'VariableDeclaration'
  | 'InterfaceDeclaration'
  | 'FieldDeclaration'
  | 'EventFieldDeclaration'
  | 'PropertyDeclaration'
  | 'EventDeclaration'
  | 'IndexerDeclaration'
  | 'StructDeclaration';

export type ExpressionNodeType = TypeNodeType | 'LiteralExpression';

export type TypeNodeType = NameNodeType | 'PredefinedType';

export type StatementNodeType = | 'Block'

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

export type DeclarationNode = {
  type: DeclarationNodeType;
} & SyntaxNode;

export type ExpressionNode = {
  type: ExpressionNodeType;
} & SyntaxNode;

export type TypeNode = {
  type: TypeNodeType;
} & SyntaxNode;

export type StatementNode = {
  type: StatementNodeType
} & SyntaxNode;

export type NameNode = {
  type: NameNodeType;
} & TypeNodeType;
