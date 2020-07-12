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

export const typeParameterConstraintClausePrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  const node: TypeParameterConstraintClauseNode = path.getValue();

  console.log(node);
  return group(
    concat([
      'where',
      ' ',
      path.call(print, 'name'),
      ' ',
      ':',
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

export const constructorConstraintPrinter: Printer['print'] = (path) => 'new()';

export type ClassOrStructConstraintNode = {
  classOrStructKeyword: SyntaxToken;
  questionToken: SyntaxToken;
} & SyntaxNode;

export const classOrStructConstraintPrinter: Printer['print'] = (path) => {
  const {
    classOrStructKeyword,
    questionToken,
  }: ClassOrStructConstraintNode = path.getValue();

  return `${classOrStructKeyword.text}${questionToken.text}`;
};

export type TypeConstraintNode = {
  type: TypeNode;
} & SyntaxNode;

export const typeConstraintPrinter: Printer['print'] = (path, _, print) =>
  path.call(print, 'type');
