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
  | 'ArrowExpressionClause'
  | 'ArgumentList'
  | 'ConstructorInitializer';

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
  | 'StructDeclaration'
  | 'MethodDeclaration'
  | 'ConstructorDeclaration'
  | 'DestructorDeclaration'
  | 'OperatorDeclaration'
  | 'ConversionOperatorDeclaration'
  | 'DelegateDeclaration';

export type ExpressionNodeType = TypeNodeType | 'LiteralExpression';

export type TypeNodeType = NameNodeType | 'PredefinedType';

export type StatementNodeType = 'Block';

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
  nodeType: SyntaxNodeType;
  start: number;
  end: number;
};

export type DeclarationNode = {
  nodeType: DeclarationNodeType;
} & SyntaxNode;

export type ExpressionNode = {
  nodeType: ExpressionNodeType;
} & SyntaxNode;

export type TypeNode = {
  nodeType: TypeNodeType;
} & SyntaxNode;

export type StatementNode = {
  nodeType: StatementNodeType;
} & SyntaxNode;

export type NameNode = {
  nodeType: NameNodeType;
} & TypeNodeType;
