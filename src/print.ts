import { Printer } from 'prettier';
import { SyntaxNode, SyntaxNodeType } from './syntax/syntaxNode';
import { externAliasDirectivePrinter } from "./syntax/externAliasDirective";
import { genericNamePrinter } from "./syntax/expression/genericName";
import { namespaceDeclarationPrinter } from "./syntax/declaration/namespaceDeclaration";
import { aliasQualifiedNamePrinter } from "./syntax/expression/aliasQualifiedName";
import { classDeclarationPrinter } from "./syntax/declaration/classDeclaration";
import { identifierNamePrinter } from "./syntax/expression/identifierName";
import { compilationUnitPrinter } from "./syntax/compilationUnit";
import { usingDirectivePrinter } from "./syntax/usingDirective";
import { typeArgumentListPrinter } from "./syntax/expression/typeArgumentList";
import { qualifiedNamePrinter } from "./syntax/expression/qualifiedName";
import { predefinedTypePrinter } from "./syntax/expression/predefinedType";
import { nameEqualsPrinter } from "./syntax/expression/nameEquals";
import { attributeArgumentPrinter } from "./syntax/attribute/attributeArgument";
import { attributePrinter } from "./syntax/attribute/attribute";
import { attributeArgumentListPrinter } from "./syntax/attribute/attributeArgumentList";
import { attributeListPrinter } from "./syntax/attribute/attributeList";
import { attributeTargetSpecifierPrinter } from "./syntax/attribute/attributeTargetSpecifier";
import { typeParameterListPrinter } from "./syntax/declaration/typeParameterList";
import { typeParameterPrinter } from "./syntax/declaration/typeParameter";


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
  TypeParameterList: typeParameterListPrinter,
  TypeParameter: typeParameterPrinter,
};

export const printNode: Printer['print'] = (path, options, print) => {
  const node: SyntaxNode = path.getValue();

  return printersByType[node.type](path, options, print);
};
