import { SyntaxNode, TypeNode } from '../syntaxNode';
import { doc, Printer } from 'prettier';
import indent = doc.builders.indent;
import concat = doc.builders.concat;
import line = doc.builders.line;
import join = doc.builders.join;
import group = doc.builders.group;
import { SyntaxToken } from '../syntaxToken';
import { IdentifierNameNode } from '../expression/name';

export type TypeParameterConstraintClauseNode = {
  colonToken: SyntaxToken;
  constraints: Array<TypeParameterConstraint>;
  name: IdentifierNameNode;
  whereKeyword: SyntaxToken;
} & SyntaxNode;

export const typeParameterConstraintClausePrinter: Printer<TypeParameterConstraintClauseNode>['print'] = (
  path,
  _,
  print
) => {
  return group(
    concat([
      path.call(print, 'whereKeyword'),
      ' ',
      path.call(print, 'name'),
      ' ',
      path.call(print, 'colonToken'),
      indent(
        concat([
          line,
          join(concat([',', line]), path.map(print, 'constraints')),
        ])
      ),
    ])
  );
};

export type TypeParameterConstraint =
  | TypeConstraintNode
  | ClassOrStructConstraintNode
  | ConstructorConstraintNode;

export type ConstructorConstraintNode = {
  closeParenToken: SyntaxToken;
  newKeyword: SyntaxToken;
  openParenToken: SyntaxToken;
} & SyntaxNode;

export const constructorConstraintPrinter: Printer<ConstructorConstraintNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    path.call(print, 'newKeyword'),
    path.call(print, 'openParenToken'),
    path.call(print, 'closeParenToken'),
  ]);

export type ClassOrStructConstraintNode = {
  classOrStructKeyword: SyntaxToken;
  questionToken: SyntaxToken;
} & SyntaxNode;

export const classOrStructConstraintPrinter: Printer<ClassOrStructConstraintNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    path.call(print, 'classOrStructKeyword'),
    path.call(print, 'questionToken'),
  ]);

export type TypeConstraintNode = {
  type: TypeNode;
} & SyntaxNode;

export const typeConstraintPrinter: Printer<TypeConstraintNode>['print'] = (
  path,
  _,
  print
) => path.call(print, 'type');
