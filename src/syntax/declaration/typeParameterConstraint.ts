import { SyntaxNode, TypeNode } from '../syntaxNode';
import { doc, Printer } from 'prettier';
import indent = doc.builders.indent;
import concat = doc.builders.concat;
import line = doc.builders.line;
import join = doc.builders.join;
import group = doc.builders.group;

export type TypeParameterConstraintClauseNode = {
  name: string;
  constraints: Array<TypeParameterConstraint>;
} & SyntaxNode;

export const typeParameterConstraintClausePrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  const { name } : TypeParameterConstraintClauseNode = path.getValue();
  
  return group(
    concat([
      'where',
      ' ',
      name,
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
}

export type TypeParameterConstraint =
  | TypeConstraintNode
  | ClassOrStructConstraintNode
  | ConstructorConstraintNode;

export type ConstructorConstraintNode = {
  constraint: string;
} & SyntaxNode;

export const constructorConstraintPrinter: Printer['print'] = (path) => {
  const { constraint }: ConstructorConstraintNode = path.getValue();

  return constraint;
};

export type ClassOrStructConstraintNode = {
  constraint: string;
} & SyntaxNode;

export const classOrStructConstraintPrinter: Printer['print'] = (
  path
) => {
  const { constraint }: ClassOrStructConstraintNode = path.getValue();

  return constraint;
};

export type TypeConstraintNode = {
  constraint: TypeNode;
} & SyntaxNode;

export const typeConstraintPrinter: Printer['print'] = (path, _, print) =>
  path.call(print, 'constraint');
