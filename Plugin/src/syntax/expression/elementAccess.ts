import { ExpressionNode, SyntaxNode } from '../syntaxNode';
import { BracketedArgumentListNode } from './argument';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;

export type ElementAccessExpressionNode = {
  argumentList: BracketedArgumentListNode;
  expression: ExpressionNode;
} & SyntaxNode;

export const elementAccessExpressionPrinter: Printer<ElementAccessExpressionNode>['print'] = (
  path,
  _,
  print
) => concat([path.call(print, 'expression'), path.call(print, 'argumentList')]);

export type ImplicitElementAccessNode = {
  argumentList: BracketedArgumentListNode;
} & SyntaxNode;

//TODO: what is this syntax need to know for testing

export const implicitElementAccessPrinter: Printer<ImplicitElementAccessNode>['print'] = (
  path,
  _,
  print
) => path.call(print, 'argumentList');
