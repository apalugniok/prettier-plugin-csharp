import { doc, Printer } from 'prettier';
import { PatternNode, SyntaxNode, TypeNode } from '../syntaxNode';
import {
  DiscardDesignationNode,
  ParenthesizedVariableDesignationNode,
  SingleVariableDesignationNode,
} from '../other/designation';
import concat = doc.builders.concat;
import { SyntaxToken } from '../syntaxToken';
import { NameColonNode } from '../expression/nameColon';
import join = doc.builders.join;

export type RecursivePatternNode = {
  type: TypeNode | null;
  positionalPatternClause: PositionalPatternClauseNode | null;
  propertyPatternClause: PropertyPatternClauseNode | null;
  designation:
    | SingleVariableDesignationNode
    | DiscardDesignationNode
    | ParenthesizedVariableDesignationNode
    | null;
} & SyntaxNode;

export const recursivePatternPrinter: Printer<RecursivePatternNode>['print'] = (
  path,
  _,
  print
) => {
  const type = path.call(print, 'type');
  const positionalPatternClause = path.call(print, 'positionalPatternClause');
  const propertyPatternClause = path.call(print, 'propertyPatternClause');
  const designation = path.call(print, 'designation');

  return concat([
    type,
    positionalPatternClause,
    propertyPatternClause,
    designation && ' ',
    designation,
  ]);
};

export type PositionalPatternClauseNode = {
  closeParenToken: SyntaxToken;
  openParenToken: SyntaxToken;
  subpatterns: Array<SubpatternNode>;
} & SyntaxNode;

export const positionalPatternClausePrinter: Printer['print'] = (
  path,
  _,
  print
) => concat([' ', '(', join(', ', path.map(print, 'subpatterns')), ')']);

export type PropertyPatternClauseNode = {
  closeBraceToken: SyntaxToken;
  openBraceToken: SyntaxToken;
  subpatterns: Array<SubpatternNode>;
} & SyntaxNode;

export const propertyPatternClausePrinter: Printer['print'] = (
  path,
  _,
  print
) => concat([' ', '{ ', join(', ', path.map(print, 'subpatterns')), ' }']);

export type SubpatternNode = {
  nameColon: NameColonNode | null;
  pattern: PatternNode;
} & SyntaxNode;

export const subpatternPrinter: Printer['print'] = (path, _, print) => {
  const { nameColon }: SubpatternNode = path.getValue();

  return concat([path.call(print, 'nameColon'), path.call(print, 'pattern')]);
};
